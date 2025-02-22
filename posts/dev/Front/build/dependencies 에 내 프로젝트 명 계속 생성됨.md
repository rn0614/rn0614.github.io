---
title: dependencies 에 내 프로젝트 명 계속 생성됨
excerpt: dependencies 에 내 프로젝트 명 계속 생성됨
categories:
  - Categories2
tags:
  - "#문제해결"
  - Front/React/Library
permalink: /categories2/202408120012에/
toc: true
toc_sticky: true
date: "2024/09/22 00:00:00"
last_modified_at: "2024/09/22 00:00:00"
---
# dependencies 에 내 프로젝트 명 계속 생성됨

## 무엇을 해결했나?
> dependencies 부분에 내 프로젝트 명으로 file: 경로로 프로젝트 경로로 참조하고 있었다.
> 결과는 아래와 같이 에러 npx expo-doctor를 통해 확인해보니 의존성 부분에 문제가 있다고 하는데 확인해보니 아래와 같이 dependencies에 내 프로젝트가 직접적으로 포함되고 있다.


## 원인 및 해결
> 내 실수다 패키지 링크한걸 까먹어서 링크된 채로 계속 빌드돼서 발생한 문제였다

1. script실행
```shell
npm link # 이 명령어 때문에 내가 정한 하나의 프로젝트가 갑자기 모든 프로젝트롸 링크했다....

npm ls --link --depth=0 #  이 명령어로 전체 링크된 패키기지를 확인하고

npm unlink -g <패키지명>  # 해당명령어로 링크를 해제해주면 된다.

```
2. 이후에는 package-lock.json, node_modules 삭제 및 package.json dependencies에서 제거 후 npm install 하면 정상적으로 실행됐다.


## 오류 메세지 기록

![[react-native-build-error.PNG]]


expo로 react-native를 배포할 때는 
'npx expo-docter' 로 검사시에는 오류로 잡혔다.


![[dependency 이상.PNG]]


단순히 package-lock.json, node_modules 삭제 및 package.json dependencies에서 제거를 해보았지만 자동생성되면서 동일한 현상이 발생했다.

신규 프로젝트를 생성시에도 동일하게 문제가 발생 및 기존의 문제 없던 프로젝트도 package.json만 들어가면 해당 의존성을 만들었다.
