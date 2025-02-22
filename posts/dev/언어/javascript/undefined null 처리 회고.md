---
title: undefined null 처리 회고
excerpt: undefined null 처리 회고
categories:
  - Categories2
tags: 
permalink: /categories2/202410012125null/
toc: true
toc_sticky: true
date: "2024/10/01 00:00:00"
last_modified_at: "2024/10/01 00:00:00"
---

|| 와 ?? 을 혼용해서 사용했었는데
||의 경우 falsy한 모든값에 대해서 예외처리가 진행된다. ??을 사용해야 undefined, null 일 때만 다음 처리가 된다.