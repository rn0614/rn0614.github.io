import React from "react";

// ✅ 모든 이벤트 타입을 처리할 수 있도록 제네릭 타입 확장
function combineHandlers<E extends React.SyntheticEvent>(
  ...handlers: Array<((event: E) => void) | undefined>
) {
  return (event: E) => {
    handlers.forEach((handler) => {
      if (handler) handler(event);
    });
  };
}

// 버튼 컴포넌트의 Props 타입 정의
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// 원본 버튼 컴포넌트
export const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

// 첫 번째 HOC (onClick 확장)
export function withWrapped1<T extends ButtonProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return function EnhancedComponent(props: T) {
    const handleClick1 = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("withWrapped1:", e.currentTarget.value);
    };

    return (
      <WrappedComponent
        {...props}
        onClick={combineHandlers(handleClick1, props.onClick)}
      />
    );
  };
}

// 두 번째 HOC (onClick 확장)
export function withWrapped2<T extends ButtonProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return function EnhancedComponent(props: T) {
    const handleClick2 = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("withWrapped2:", e.currentTarget.name);
    };

    return (
      <WrappedComponent
        {...props}
        onClick={combineHandlers(handleClick2, props.onClick)}
      />
    );
  };
}
