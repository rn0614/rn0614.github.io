---
title: 제목
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202410112152리렌더링/
toc: true
toc_sticky: true
date: 2024-10-11
last_modified_at: 2024-10-11
---
# 실수 코드
> 아래와 같은 코드로 해당 화면이 리액트 네이티브인지 확인했다 무엇이 문제였을까?
```tsx
const [isMobile, setIsMobile] = useState(false);
useEffect(() => { 
  if (typeof window !== "undefined") { 
    setIsMobile(!!window?.ReactNativeWebView); 
  } 
}, []);

```


# 원인
첫 값을 useState에 false로 지정해놓고 useEffect에서 새로운 값을 세팅했다. set안에도 false인 경우는 리렌더링을 리액트에서 자동으로 방지하지만 true일경우는 state값이 바뀌니까 다시 리렌더링되는 것이다.

이게 모바일 환경에서 개발했을 때는 처음에 false나오고 이후에도 false가 나와 리렌더링이 안됐었는데 웹으로 와서보니 잘못된 코드였다. 그래서 아래와 같이 아예 useEffect를 쓰지 않고 useRef를 통해 현재 window 값을 구했다.

```tsx
const isMobileRef = useRef(typeof window !== "undefined" && !!window.ReactNativeWebView);


return (
  <>
    {isMobileRef.current && (<div>div</div>)}
  </>
)
```