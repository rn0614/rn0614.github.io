---
title: Console을 효율적으로 사용하기
excerpt: 설명란
categories:
  - Categories2
tags:
  - Front/React
  - javascript
permalink: /categories2/202409291441관련/
toc: true
toc_sticky: true
date: 2024-09-29 00:00:00
last_modified_at: 2025-02-05 00:00:00
---
# 브라우저의 콘솔을 이용해보자


# 용도에 맞는 콘솔사용
```ts
console.log();
console.error();
console.warn();
```
#### =>결과
![[public/image/Pasted image 20250205013803.png]]

# 실행 경로 추정
```ts
function outerFn(){
  function innerFn(){
    console.trace()
  }
  innerFn();
}
outerFn();
```

#### =>결과
![[public/image/Pasted image 20250205013755.png]]

# 걸린시간 측정1
```ts
console.time("인덱스1");

console.timeLog("인덱스1"); // console.time으로부터 시간 ms기준

console.timeEnd("인덱스1"); // console.time으로부터 시간/ 더이상 집계 안함
```

#### =>결과
![[public/image/Pasted image 20250205013746.png]]


# 의도치 않은 경우만 출력
```ts
console.assert( true==false, "출력 true")
console.assert( true==false, "출력 false")
```
#### =>결과
![[public/image/Pasted image 20250205014019.png]]


# 정리된 테이블로 리스트 index확인
> 여러 배열을 담은 값을 출력할 때 유용
```ts
console.table([{key:1,value:"예시값1"},{key:2,value:"예시값2"},{key:3,value:"예시값3"}])
```
#### =>결과
![[public/image/Pasted image 20250205013917.png]]


# 특정로그 시각적 강조

%c 삽입 및 두번째 인자 스타일 지정으로 시각적으로 로그를 강조할 수 있다.
```js
// %c
console.log("%c원래콘솔로그", "color:yellow;")

```
#### =>결과
![[public/image/Pasted image 20250205013858.png]]


# 그룹핑
```js
console.group("그룹명칭")

console.group("Inner Group1")
console.log("그룹내 아이템")
console.log("그룹내 아이템")
console.log("그룹내 아이템")
console.groupEnd();

console.groupEnd();

```
![[public/image/Pasted image 20250205013835.png]]
#### =>결과

# 객체나 배열을 뽑을 때 좀더 깔끔하게 보이는 방식
```ts
console.dir({key:1, value:"예시값1"})

```
#### =>결과
![[public/image/Pasted image 20250205013845.png]]



# 이런 콘솔로그를 꼭 지워야만하는 것일까?
[[posts/dev/Front/Nextjs 로그남기기|Nextjs 로그남기기]]
```js
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  compiler: {
    removeConsole:
      process.env.API_DOC_ENV === "prod"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};
```

[[posts/dev/Front/Nextjs/디버그로 감싸기|디버그로 감싸기]]