---
title: Console 관련 | PRODUCT 에서 로그제거 | 디버그로 감싸기
CMDS:
  - "[[103 Developments]]"
excerpt: 브라우저에서 적절한 console을 통해 개발시 개발자의 편의성을 증대시킬 수 있다. 적절한 콘솔에 대해서 알아보자 | 프론트엔드 환경에서 콘솔을 찍고 확인할 수 있다. | HOC 로 디버그할 데이터를 감싸기
thumnail: /image/Pasted%20image%2020250205214550.png
tags:
  - Debugging
  - Front/React
  - log
date: 2025/02/05 01:43:15
last_modified_at: 2025/02/06 00:09:29
---
## 용도에 맞는 콘솔사용
```ts
console.log();
console.error();
console.warn();
```
#### =>결과
![](public/image/Pasted%20image%2020250205214550.png)


## 실행 경로 추정
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

## 걸린시간 측정1
```ts
console.time("인덱스1");

console.timeLog("인덱스1"); // console.time으로부터 시간 ms기준

console.timeEnd("인덱스1"); // console.time으로부터 시간/ 더이상 집계 안함
```

#### =>결과
![](public/image/Pasted%20image%2020250205214627.png)


## 의도치 않은 경우만 출력
```ts
console.assert( true!=false, "출력 true")
console.assert( true==false, "출력 false")
```
#### =>결과
![](public/image/Pasted%20image%2020250205214643.png)


## 정리된 테이블로 리스트 index확인
> 여러 배열을 담은 값을 출력할 때 유용
```ts
console.table([{key:1,value:"예시값1"},{key:2,value:"예시값2"},{key:3,value:"예시값3"}])
```
#### =>결과
![](public/image/Pasted%20image%2020250205214658.png)


## 특정로그 시각적 강조

%c 삽입 및 두번째 인자 스타일 지정으로 시각적으로 로그를 강조할 수 있다.
```js
// %c
console.log("%c원래콘솔로그", "color:yellow;")

```
#### =>결과
![](public/image/Pasted%20image%2020250205214717.png)


## 그룹핑
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

## 객체나 배열을 뽑을 때 좀더 깔끔하게 보이는 방식
> 요새는 chrome에서는 log나 dir
```ts
console.dir({key:1, value:"예시값1"})

```
#### =>결과
![](public/image/Pasted%20image%2020250205214805.png)



## 이런 콘솔로그를 꼭 지워야만하는 것일까?
[PRODUCT에서 로그제거](private/100%20Resources/103%20Developments/PRODUCT에서%20로그제거.md)
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

[디버그로 감싸기](private/100%20Resources/103%20Developments/디버그로%20감싸기.md),## 프론트의 console.log
> 개발을 위해서는 우리는 로거를 찍거나 debugger로 디버깅을 한다.
> 이전에 같은 부분을 분석했다면 같은 로그가 찍혀있는 부분까지만 확인하면 좋다.
> 하지만 운영단계에서 해당부분에서 logging이 남아있으면 보안에 취약하기도 하고 사용자에게 개발자의 소스가 노출될 수 있다.
> 이부분은 설정에서 날려야한다.

실제 사용할 때마다 console.log를 주석으로 바꿀 필요없이 nextjs 에서는 간단한 설정으로 compiler에서 console.log를 바꿀 수 있다.
 
 문제는 이렇게 찍어놓은 log는 실제로 운영환경에서는 보안, 과한정보를 사용자에게 제공할 뿐더러 해킹하는 사람에게 내부 소스까지 공개하는 역할을 한다. 따라서 빌드시점에서는 없애야한다.

Nextjs에서는 config 설정으로 이걸 없앨 수 있다.
실제 prod 환경에서는 error와 warn을 제외한 나머지 console을 날려버리자
```js
/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export",
  compiler: {
    removeConsole:
      process.env.API_DOC_ENV === "prod"
        ? { exclude: ["error", "warn"] }
        : null,
  },
};

module.exports = nextConfig;


```
,## 개요
>중요함수에서 dev에서는 log를 찍고 prod 환경에서는 로그를 안찍을 수 있게하는 function 이후 해당 결과를 주기적으로 js객체에 저장해 주기적으로 서버를 보내면 front 단의 log도 서버에서 수집 가능하다.

HOC 로 로그를 출력하는 부분을 밖으로 뺀다 .
작성이후에는 꼭 PRODUCT 레벨에서는 콘솔을 찍지 않도록 해야한다. [PRODUCT에서 로그제거](private/100%20Resources/103%20Developments/PRODUCT에서%20로그제거.md)
## 코드
```ts
export const wrapWithDebug = <T extends (...args: any[]) => any>(
  fn: T,
  functionName?: string,
  enableLogging: boolean = process.env.API_DOC_ENV !== "prod" //실제 운영환경에서는 result.finally 필요없음
): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const name = functionName || fn.name || "anonymousFunction";
    console.debug(`${name} start`);

    const result = fn(...args);

    if (result instanceof Promise && enableLogging) {
      return result.finally(() => console.debug(`${name} end`)) as ReturnType<T>;
    }

    console.debug(`${name} end`);
    return result;
  }) as T;
};
```



resource :[브라우저 Console 로그 관련한 내용](private/100%20Resources/103%20Developments/브라우저%20Console%20로그%20관련한%20내용.md), [PRODUCT에서 로그제거](private/100%20Resources/103%20Developments/PRODUCT에서%20로그제거.md), [[디버그로 감싸기](private/100%20Resources/103%20Developments/디버그로%20감싸기.md)]