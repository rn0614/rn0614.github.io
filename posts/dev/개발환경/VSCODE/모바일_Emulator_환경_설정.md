---
title: 모바일 에뮬레이터 설정관련
excerpt: react-native Webview 작성을 위한 에뮬레이터 가동
categories:
  - Categories2
tags:
  - 환경설정
  - "#모바일/react-native"
  - "#문제해결"
permalink: /categories2/2024091710000설정관련/
toc: true
toc_sticky: true
date: 2024-09-17
last_modified_at: 2024-09-17
---
# 어떤 문제를 해결했나?
## 1. 디버깅 환경내에서 직접적으로 실행
> 편리한 사용을 위한 컴퓨터 환경에서 가상 emulator 세팅 과정
1. android 스튜디오 설치
2. device manager에서 원하는 기기의 emulator 설치
3. react-native에서 webview 실행해보기

## 2. emulator 에서 일부 CSS 미지원 현상
> 문제 상황 : emulator 내부의 일부 화면이 이상 감지. inline-block 등의 css 가 미동작 되는 현상
> 원인 : chrome default 버전이 너무 낮아서 일부 css 미지원으로 발생
1. 에뮬레이터 자체 chrome 버전 상승



# 한계점
window 기기에서는 android 밖에 지원을 안하므로 ios emulator는 따로 구비 필요.


# 기본설정

