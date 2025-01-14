---
title: 설계
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202501051640undefined/
toc: true
toc_sticky: true
date: 2025-01-05
last_modified_at: 2025-01-05
---
> Set a goal, make a plan and just do it.

> 참고 : https://yeongunheo.tistory.com/entry/DB-%EC%84%A4%EA%B3%84%ED%95%98%EB%8A%94-%EB%B2%95-feat-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%AA%A8%EB%8D%B8%EB%A7%81

# 개요
> 기능이 정해지면 가장먼저 해야하는게 DB 설계이다. 어떤 시스템이든 내부의 DB가 달라지고 해당 DB데이터에 따라 실행동작이 달라지는 것이다. 요구사항에서 시스템적으로 DB설계를 할 수 있어야한다.

# 0. 기획서 요구사항 확인
> 기본적인 CRUD 설계에 대한 내용이 필요하며 관심사 분리를 및 코드화를 통해 DB 관리가 필요하다.

- 포스터를 생성/조회/수정/삭제기능
  - 포스터는 생성자, 관리자만 수정삭제 가능
  - 하나의 포스터는 여러 사진과 
