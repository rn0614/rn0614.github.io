https://react-hook-form.com/get-started (공식 문서)

> 어떤 문제를 해결했나?
> 1. form 전송 및 에러처리 간편화
> 2. Next.js 에서 서버측 렌더링에 대한 디버깅 진행


> 최신 뉴스(2024)
> 1. react 자체적으로 신규 hook 이 실험중이다 / https://react.dev/reference/react-dom/hooks/useFormStatus
> 2. 각각의 데이터를 검증하는 로직은 따로 없어서 계속 react-hook-form의 강세 예상
```jsx
  const { pending, data, method, action } = useFormStatus();
```


> history
> 1. react초창기에는 input 값을 object 형식으로 관리하는게 최선이었다.
> 2. 사용자
> 3. 측면에서는 입력하는 내내 동적으로 본인의 입력값에 대한 validation Check가 일어나는게 가장 효율적
> 4. 이런 validation Check와 동시에 리소스 절약을 위해 개별 렌더링하는 작업이 실제로 구현하면 생산성이 떨어지는 문제 발생
> 5. 미리 해주는 library 탄생


### 사용법
아래는 공식 문서인데 크게 3가지만 상기하면 된다.
1. useForm 의 Hook에서는 register, handleSubmit, watch로 나뉘는데 register은 input들 handleSubmit은 form, watch는 실시간 감시목적
2. submitHandler는 react-hook-form 의 handleSubmit의 callback 형식으로 넣어준다. / 타입도 아래와 같이 고려
3. 사용하는 input에는 {...register()} 삽입

```tsx
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export default function App() {
  const {
    register,     // input에 주입하는 부분
    handleSubmit, // form에 주입하는 부분
    watch,        // 실시간성으로 내보내기 위한 방법
    formState: { errors },  // errors 에러가 떨어지면 반환하는 부분
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("example")} />
      <input {...register("exampleRequired", { required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
      <input type="submit" />
    </form>
  )
}

```


### 내코드
보통 실사용에서는 form 부분과 input 부분을 나눠서 사용한다. / 프로젝트 spring-next-mysql
```tsx
//signUpForm
import { MAIN_PATH } from "@/constants";
import { signUpRequest } from "@/hooks/useUser";
import Button from "@/ui/atom/Button/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CheckBox from "../CheckBox/CheckBox";
import InputBox from "../InputBox";
import style from "./style.module.scss";

type inputDataType = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  telNumber: string;
  address: string;
  addressDetail: string;
  agreedPersonal: boolean;
};

export default function SignUpCard({ setIsSigned }: any) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<inputDataType>();

  const submitHandler: SubmitHandler<inputDataType> = async (data) => {
    console.log("회원가입 버튼 클릭");
    await signUpRequest(data);
    router.push(MAIN_PATH());
  };

  const [page, setPage] = useState<number>(1);

  const [viewPassword, setViewPassword] = useState<"password" | "text">(
    "password"
  );
  const [passwordIcon, setPasswordIcon] =
    useState<string>("eye-light-off-icon");

  const onNextStepButtonClickHandler = () => {
    setPage(2);
  };

  const onPrevStepButtonClickHandler = () => {
    setPage(1);
  };

  const onSignInLinkClickHandler = () => {
    setIsSigned(true);
  };

  const onPasswordButtonClickHandler = () => {
    if (viewPassword === "text") {
      setViewPassword("password");
      setPasswordIcon("eye-light-off-icon");
    } else {
      setViewPassword("text");
      setPasswordIcon("eye-light-on-icon");
    }
  };

  return (
    <form
      className={style["auth-card-box"]}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className={style["auth-card-top"]}>
        <div className={style["auth-card-title-box"]}>
          <div className={style["auth-card-title"]}>{"회원가입"}</div>
          <div className={style["auth-card-page"]}>{`${page}/2`}</div>
        </div>
        <div className={page === 1 ? style["form-box"] : style["check-done"]}>
          <InputBox
            id="email"
            label="이메일"
            type="text"
            placeholder="example@naver.com"
            error={errors.email}
            register={register}
            required={true}
            pattern={{
              value: /^\S+@\S+\.\S+$/,
              message: "유효한 이메일 형식이 아닙니다",
            }}
          />

          <InputBox
            id="password"
            label="비밀번호"
            type={viewPassword}
            placeholder="***********"
            error={errors.password}
            register={register}
            required={true}
            minLength={{
              value: 5,
              message: "비밀번호는 최소 5자리 이상이어야 합니다.",
            }}
            icon={passwordIcon}
            onButtonClick={onPasswordButtonClickHandler}
          />

          <InputBox
            id="passwordCheck"
            label="비밀번호 확인"
            type={viewPassword}
            placeholder="***********"
            error={errors.passwordCheck}
            register={register}
            required={true}
            minLength={{
              value: 5,
              message: "비밀번호 확인은 최소 5자리 이상이어야 합니다.",
            }}
            icon={passwordIcon}
            onButtonClick={onPasswordButtonClickHandler}
          />
        </div>

        {page === 2 && (
          <div className={style["form-box"]}>
            <InputBox
              id="nickname"
              name="nickname"
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickname}
              register={register}
              required={true}
            />

            <InputBox
              id="telNumber"
              label="핸드폰번호"
              type="text"
              placeholder="핸드폰번호를 입력해주세요"
              error={errors.telNumber}
              register={register}
              required={true}
            />

            <InputBox
              id="address"
              label="주소"
              type="text"
              placeholder="주소를 입력해주세요"
              error={errors.address}
              register={register}
            />

            <InputBox
              id="addressDetail"
              label="상세주소"
              type="text"
              placeholder="상세주소를 입력해주세요"
              error={errors.addressDetail}
              register={register}
            />

            <CheckBox
              name="agreedPersonal"
              id="agreedPersonal"
              label="개인정보 수집 동의"
              error={errors.agreedPersonal}
              checked={watch("agreedPersonal")}
              register={register}
            />
          </div>
        )}
      </div>

      <div className={style["auth-card-bottom"]}>
        {page === 1 && (
          <Button color="black" onClick={onNextStepButtonClickHandler}>
            다음단계
          </Button>
        )}
        {page === 2 && (
          <>
            <Button color="black" onClick={onPrevStepButtonClickHandler}>
              이전단계
            </Button>
            <Button color="black" type="submit" disabled={isSubmitting}>
              제출
            </Button>
          </>
        )}
        <div className={style["auth-description-box"]}>
          <div className={style["auth-description"]}>
            {"이미 계정이 있으신가요?"}
            <span
              className={style["auth-description-link"]}
              onClick={onSignInLinkClickHandler}
            >
              {"로그인"}
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}



//Input.tsx
import React, { forwardRef } from "react";
import styles from "./style.module.scss";
import { FieldError, UseFormRegister } from "react-hook-form";
import { IconButton } from "@/ui/atom/Icon/Icon";

type Props = {
  id: string;
  label: string;
  placeholder: string;
  error: FieldError | undefined;
  register: UseFormRegister<any>; // register 함수 타입
  required?: boolean | string;
  pattern?: { value: RegExp; message: string };
  minLength?: { value: number; message: string }; // react-hook-form에서만 처리
  icon?: string;
  onButtonClick?: () => void;
} & Omit<
  React.ComponentPropsWithoutRef<"input">,
  "minLength" | "pattern" | "required"
>; // minLength 속성 제외

const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const {
    id,
    label,
    type,
    error,
    placeholder,
    register,
    required,
    pattern,
    minLength,
    icon,
    onButtonClick,
    ...rest
  } = props;

  const validationRules = {
    required: required ? `${id} 입력은 필수입니다` : undefined,
    pattern: pattern ? pattern : undefined,
    minLength: minLength ? minLength : undefined,
  };
  return (
    <div className={styles["inputbox"]}>
      <label htmlFor={id} className={styles["inputbox-label"]}>
        {label}
      </label>
      <div
        className={`${styles["inputbox-container"]} ${
          error ? styles["inputbox-error"] : ""
        }`}
      >
        <input
          className={styles["input"]}
          type={type}
          placeholder={placeholder}
          {...register(id, validationRules)} // react-hook-form 유효성 검사 처리
        />
        {icon && <IconButton onButtonClick={onButtonClick} icon={icon} />}
      </div>
      {error && (
        <div className={styles["inputbox-message"]}>{error.message}</div>
      )}
    </div>
  );
});

InputBox.displayName = "InputBox";

export default InputBox;

```