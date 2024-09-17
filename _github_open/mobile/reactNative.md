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

## 내용

```shell
# download
npx create-expo-app@latest

# reset 작업
npm run reset-project

```



### expo 어플 배포
```shell
npm install -g eas-cli

eas login

eas build --platform android  

```



### VS 확장 프로그램
-  Expo Tools



-- emulator 실행관련
https://velog.io/@bi-sz/ReactNative-Expo-Android-Studio-%EC%97%90%EB%AE%AC%EB%A0%88%EC%9D%B4%ED%84%B0-%EC%97%B0%EA%B2%B0


-- expo 통한 배포 관련
https://docs.expo.dev/get-started/start-developing/


npm install -g eas-cli



```

eas build --platform android

```


-- 어플주소
https://expo.dev/artifacts/eas/32YqvChEKPMeZD8Vecbkh3.aab



### Expo Doc
- 파일베이스 라우팅( react랑 동일)
- layout 파일 적용시`_layout` 



```tsx
//stack 구조로 

export defualt function RootLayout(){
  return (
    <Stack>
    
    </Stack>
  )
}


```