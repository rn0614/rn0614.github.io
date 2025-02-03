"use client"
import combineHandlers from "@/lib/util/combineEventHandler";
import React, { useState, useRef, useEffect, ChangeEventHandler } from "react";

function withUndoRedo<P extends React.InputHTMLAttributes<HTMLInputElement>>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithUndoRedo(props: P) {
    const [value, setValue] = useState("");
    const [tempValue, setTempValue] = useState<string | null>(null); // 임시 상태
    const historyRef = useRef<string[]>([]); // undo 기록
    const redoRef = useRef<string[]>([]); // redo 기록
    const indexRef = useRef(-1); // 현재 입력 위치
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); // debounce timeout
    const MAX_HISTORY = 20; // 최대 history 개수 제한

    function saveToHistory() {
      historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
      historyRef.current.push(value);
      indexRef.current = historyRef.current.length - 1;

      // 새 입력이 발생하면 redo 스택 초기화
      redoRef.current = [];

      // history 갯수를 제한
      if (historyRef.current.length > MAX_HISTORY) {
        historyRef.current.shift(); // 가장 오래된 기록 삭제
        indexRef.current -= 1;
      }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const newValue = e.target.value;
      setValue(newValue);
      setTempValue(newValue); // 임시 상태로 저장

      // debounce: 0.8초 동안 추가 입력이 없을 때만 기록 저장
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setTempValue(null); // 임시 상태 초기화
        saveToHistory(); // 최종 기록에 반영
      }, 800);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        if (tempValue !== null) {
          // 현재 tempValue를 history에 저장 후 되돌리기
          historyRef.current = historyRef.current.slice(
            0,
            indexRef.current + 1
          );
          historyRef.current.push(tempValue); // tempValue를 기록에 추가
          redoRef.current.push(tempValue); // redo 스택에도 저장
          setValue(historyRef.current[indexRef.current] || "");
          setTempValue(null); // 임시 상태 초기화
        } else if (indexRef.current > 0) {
          redoRef.current.push(historyRef.current[indexRef.current]); // 현재 상태 저장
          indexRef.current -= 1;
          setValue(historyRef.current[indexRef.current]);
        }
      }

      if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        if (redoRef.current.length > 0) {
          const nextValue = redoRef.current.pop();
          if (nextValue !== undefined) {
            indexRef.current += 1;
            setValue(nextValue);
            historyRef.current[indexRef.current] = nextValue; // redo에서 가져온 값 저장
          }
        }
      }
    }

    useEffect(() => {
      historyRef.current.push(value);
      indexRef.current = historyRef.current.length - 1;

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <WrappedComponent
        {...(props as P)}
        value={value}
        onChange={combineHandlers(handleChange, props.onChange)}
        onKeyDown={handleKeyDown}
      />
    );
  };
}

function withValidation<P extends React.InputHTMLAttributes<HTMLInputElement>>(
  WrappedComponent: React.ComponentType<P>,
  validationFn: (value: string) => boolean,
  errorMessage: string = "유효하지 않은 값입니다."
) {
  return function WithValidation(props: P) {
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const newValue = e.target.value; // 이벤트에서 값 가져오기

      if (validationFn(newValue)) {
        setIsValid(true);
        setError("");
      } else {
        setIsValid(false);
        setError(errorMessage);
      }

      // 기존 onChange 실행
      if (props.onChange) {
        props.onChange(e); // 변경된 event 객체 전달
      }
    }

    return (
      <div>
        <WrappedComponent
          {...props}
          onChange={combineHandlers(handleChange, props.onChange)}
        />
        {!isValid && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      </div>
    );
  };
}

const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <input type="text" {...props} />;
};

export { withUndoRedo, withValidation, TextInput };
