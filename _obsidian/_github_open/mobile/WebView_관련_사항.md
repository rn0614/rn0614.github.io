---
title: Webview 관련사항
excerpt: webview설정관련
categories:
  - Categories2
tags: 
permalink: /categories2/post-name-here-2/
toc: true
toc_sticky: true
date: 2024-09-17
last_modified_at: 2024-09-17
---

- 모바일 앱에서 웹뷰로 접근을 위해서는 SSL이 필수라 HTTPS를 적용해야한다.



### 웹엔진 종류
- webKit
- Chromium
source ->  
javascriptCore
WebCore
Webkit
WebProcess
GPUProcess
NetworkProcess
UIProcess


네비게이션 
- 화면 중첩과 보호
네이티브 기기와 통신
- 권한 획득

웹에서는 앵커 태그로 url이 히스토리에 스택으로 푸시됨

네비게이션은 정의한 화면을 렌더링하는 방법을 결정하는 리액트 컴포넌트
앱이 화면을 전환하고 탐색기록을 관리할 수 있는 방법

차이점은 스택이 변경될 때 제스처와 애니메이션 제공


네비게이션 구성하는 방법
네비게이션 컨테이너
- 탐색트리를 관리하고 상태를 포함하는 루트컴포넌트
- 모든 네비게이터 구조는 여기에 래핑된다.
화면을 구성하기 위한 스크린 컴포넌트를 자식으로 포함.


