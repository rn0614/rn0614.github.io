---
title: RESTFUL 하게 API를 짠다는 건
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202412032036하게/
toc: true
toc_sticky: true
date: "2024/12/03 00:00:00"
last_modified_at: "2024/12/03 00:00:00"
---
> Set a goal, make a plan and just do it.

RestFul API는 알기쉬운 front, back 간의 약속을 의미한다.

보통 frontend는 back으로 요청을 보낼때 api 형태를 띄는데 이때 명명규칙을 back이 알아듣기 쉽게 만드는 것이다.
일반적으로 db를 CRUD하는 것이 기본적인 동작이기 때문에 http method의 GET, POST, PUT, DELETE, PATCH를 사용하여 DB에 정확히 어떤 동작을 시킬 것인지 명시한다.

즉, 하고자 하는 대상은 URL, 하고자 하는 동작은 METHOD에 담아낸다. 하지만 USER의 정보를 UPDATE할 때는 단순히 유저명을 바꿀수도 있고, 프로필, 비밀번호 등등 소규모로도 바꿀 수 있다. 이럴 경우 