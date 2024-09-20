---
title: github Action
excerpt: github action 학습
categories:
  - Categories2
tags:
  - "#github_action"
permalink: /categories2/20240920github/
toc: true
toc_sticky: true
date: 2024-09-17
last_modified_at: 2024-09-17
---
# Github Action
> 실전! GithubAction으로  CI/CD 강의를 학습한 내용입니다.

## 개요
> github Action이란 특정 이벤트 발생시 내가 짜둔 프로세스를 실행하도록 하는 자동화 툴이다.
> 깃허브 이벤트에 따라 workflow 실행

## 내용
크기에 따라서 포함관계를 갖는다
Workflow > Job > Step

가장 작은 transaction 단위는 Job 단위 Step 실행 순서는 보장된다.

.github/workflow 경로에 파일이 있으면 github 측에서 자동으로 workflow 파일인지 인지한다.
