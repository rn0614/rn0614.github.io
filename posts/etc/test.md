---
title: test
excerpt: test
categories:
  - Categories2
tags: null
permalink: /categories2/202501220113undefined/
toc: true
toc_sticky: true
date: '2025/01/22 01:13:44'
last_modified_at: '2025/02/22 16:29:10'
---
> Set a goal, make a plan and just do it.
> Set a goal, make a plan and just do it.
weqwewq
wqeqw
test

테이블 스타일 테스트

| `<script>` 위치 | `<script>` 속성 | 다운로드        | 실행 시점             | HTML 파싱 중단 여부 |
| ------------- | ------------- | ----------- | ----------------- | ------------- |
| `<head>`      | 없음            | 🚨 직렬(파싱중단) | 🚨 `<head>`에서 실행됨 | ✅ 파싱 중단       |
| `<head>`      | `async`       | ✅ 병렬        | ❌ 다운로드 완료 즉시 실행   | ✅ 파싱 중단       |
| `<head>`      | `defer`       | ✅ 병렬        | ✅ HTML 파싱 후 실행    | ❌ 파싱 중단 없음    |
| `<body>`      | 없음            | ✅ 병렬        | ✅ HTML 파싱 후 실행    | ❌ 파싱 중단 없음    |
| `<body>`      | `async`       | ✅ 병렬        | ❌ 다운로드 완료 즉시 실행   | ✅ 파싱 중단       |
| `<body>`      | `defer`       | ✅ 병렬        | ✅ HTML 파싱 후 실행    | ❌ 파싱 중단 없음    |


## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
