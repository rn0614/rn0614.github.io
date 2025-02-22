---
title: reactNative
excerpt: 템플렛 테스트 github action으로 자동배포환경 작성
categories:
  - Categories2
tags:
  - "#github_action"
permalink: /categories2/20240918060101reactNative/
toc: true
toc_sticky: true
date: "2024/09/17 00:00:00"
last_modified_at: "2024/09/17 00:00:00"
---
# Github Action

## 개요
> github Action이란 특정 이벤트 발생시 내가 짜둔 프로세스를 실행하도록 하는 자동화 툴이다.

## 내용
크기에 따라서 포함관계를 갖는다
Workflow > Job > Step

가장 작은 transaction 단위는 Job 단위 Step 실행 순서는 보장된다.

.github/workflow 경로에 파일이 있으면 github 측에서 자동으로 workflow 파일인지 인지한다.
