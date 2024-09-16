useContext 를 사용한 케이스.

사실상 일정 이하 컴포넌트의 props drilling을 막음. / 실 사용시 구성단위 내 컴포넌트의 배치가 비교적 자유로움.

useContext의 사용은 전역함수 뿐만 아니라 특정 Component아래 자식 Component들에게 쉽게 Props를 전달할 수 있고 이를 통해 좀더 유연한 구조화가 가능하다.

방식은 아래와 같다.

```tsx
import React, { ReactNode, useContext } from "react";

type ToggleType={
  on:boolean;
  onToggle:any;
  children:ReactNode;
}

// 전체적인 Context
const WarapperContext = React.createContext<ToggleType | null>(null);
// 제일 상단 Component로 상태를 관리하는 끝지점이라고 생각하면 된다.
// 필요한 부분만 리렌더링하기 위해 useCallback
// 마운트 시의 사이드 이펙트 없애기 용 useEffectAfterMount 사용
function Toggle(props:ToggleType) {
  return (
    //Toggle의 자식요소는 ToggleContext.Provider가 제공하는 value에 접근이 가능하다.
    <WarapperContext.Provider value={props}>
      {props.children}
    </WarapperContext.Provider>
  );
}

// useContext를 이용하면 상위 Context에 있는
function useToggleContext() {
  const context = useContext(WarapperContext);
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    );
  }
  return context;
}


const On: React.FC<any> = ({ children }) => {
  const { on } = useToggleContext();
  return on ? children : null;
};
Toggle.On = On;


const Off: React.FC<any> = ({ children }) => {
  const { on } = useToggleContext();
  return on ? null : children;
};
Toggle.Off = Off;


const Button: React.FC<any> = (props: any) => {
  const { on, onToggle } = useToggleContext();
  return <input type="checkbox" on={on} onClick={onToggle} {...props} />;
};
Toggle.Button = Button;

export { Toggle };
```


```tsx
import { Toggle } from '@/components/ToggleButton/ToggleButton'
import React, { useCallback, useState } from 'react'

export default function ComponentTestPage() {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => setOn((oldOn) => !oldOn), []);
  // Toggle 버튼 내 Toggle.On, Toggle.Off, Toggle.Button 등의 위치가 자유로움
  // 유연한 컴포넌트 작성 가능
  return (
    <Toggle onToggle={toggle} on={on}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button/>
    </Toggle>
  )
}

```