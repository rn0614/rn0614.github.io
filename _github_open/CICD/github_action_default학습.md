---
title: reactNative
excerpt: 템플렛 테스트 github action으로 자동배포환경 작성
categories:
  - Categories2
tags: 
permalink: /categories2/post-name-here-2/
toc: true
toc_sticky: true
date: 2024-09-17
last_modified_at: 2024-09-17
---

> 어떤 문제를 해결했나?
> 1. 단순 공부 목적(배포자동화 위주)


### 사용
- githib의 자동화 도구 : 소프트웨어 개발 워크 플로우를 자동화 한다.


다양한 github Event 기반 구성 , 이벤트 발생으로 인한 자동화
> 즉 .yml 에 어떤 이벤트시 -> 어떤 행동을 자동화 하고 git에 주기적으로 어떤 이벤트를 보내면 나머지는 알아서 동작함.


자동화 프로세스는 workflow
.github/workflow 경로에 파일이 있어야 실행함.


job 은 러너에서 실행되는 step의 집합

