---
title: Console 관련
excerpt: console-
thumnail: /image/Pasted%20image%2020250205214550.png
categories: posts/dev/언어/javascript
tags: 
date: 2025/02/05 01:23:31
last_modified_at: 2025/02/06 00:09:29
---
> Set a goal, make a plan and just do it.



# 브라우저의 콘솔을 이용해보자


# 용도에 맞는 콘솔사용
```ts
console.log();
console.error();
console.warn();
```
#### =>결과
![](public/image/Pasted%20image%2020250205214550.png)


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
![](public/image/Pasted%20image%2020250205214614.png)

# 걸린시간 측정1
```ts
console.time("인덱스1");

console.timeLog("인덱스1"); // console.time으로부터 시간 ms기준

console.timeEnd("인덱스1"); // console.time으로부터 시간/ 더이상 집계 안함
```

#### =>결과
![](public/image/Pasted%20image%2020250205214627.png)


# 의도치 않은 경우만 출력
```ts
console.assert( true!=false, "출력 true")
console.assert( true==false, "출력 false")
```
#### =>결과
![](public/image/Pasted%20image%2020250205214643.png)


# 정리된 테이블로 리스트 index확인
> 여러 배열을 담은 값을 출력할 때 유용
```ts
console.table([{key:1,value:"예시값1"},{key:2,value:"예시값2"},{key:3,value:"예시값3"}])
```
#### =>결과
![](public/image/Pasted%20image%2020250205214658.png)


# 특정로그 시각적 강조

%c 삽입 및 두번째 인자 스타일 지정으로 시각적으로 로그를 강조할 수 있다.
```js
// %c
console.log("%c원래콘솔로그", "color:yellow;")

```
#### =>결과
![](public/image/Pasted%20image%2020250205214717.png)


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
#### =>결과
![](public/image/Pasted%20image%2020250205214749.png)

# 객체나 배열을 뽑을 때 좀더 깔끔하게 보이는 방식
> 요새는 chrome에서는 log나 dir
```ts
console.dir({key:1, value:"예시값1"})

```
#### =>결과
![](public/image/Pasted%20image%2020250205214805.png)



# 이런 콘솔로그를 꼭 지워야만하는 것일까?
[Nextjs 로그남기기](posts/dev/Front/Nextjs%20로그남기기.md)
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

[디버그로 감싸기](posts/dev/Front/Nextjs/디버그로%20감싸기.md)