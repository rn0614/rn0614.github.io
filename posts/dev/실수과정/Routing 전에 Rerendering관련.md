---
title: Routing 전에 Rerendering관련
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202410140021전에/
toc: true
toc_sticky: true
date: 2024-10-14 00:00:00
last_modified_at: 2024-10-14 00:00:00
---
# 개요
> 모바일 Tab화면에서 Stack화면으로 이동시 화면이 전환되게 되는데 이때 Menu를 통해서 이동하게 되면 Stack이 쌓이고 전 화면에서는 그대로 Sidebar가 살아있는 문제가 있었다.
> 이를 해결하기 위해 다음과 같이 코드를 작성해서 Sidebar부분을 닫았으나 웹에서 화면전환 시 sidebarOpen 부분이 변경되면서 다시 리렌더링됐다. (이상하게 sidebarOpen이 false -> false에서도 리렌더링된다....)


```tsx
const Sidebar = ({ isOpen, setSidebarOpen }: SidebarProps) => {

  //문제부분
  const webviewClickhandler = (href: any) => {
    setSidebarOpen(false);
    stackRouterPush(router, href);
  };

  return (...)
  
};
export default React.memo(Sidebar);
```


# 해결과정
> Next가 어떻게 판단하는지는 몰라도 우선 상태관련 + page 이동이 한곳에 있다보니 둘다 처리하고 있는 상황이다.
> 내가 원하는 처리 방식은 다음과 같다

- Mobile : 둘다 처리 (tab화면에서는 Sidebar를 닫고 href로 Stack화면 열기)
- Web : router만 처리 (어차피 화면이 이동할거고 이동만 처리하고 , path이동시 useEffect 처리하는게 좋음)