---
title: SpringBoot react 디버깅 설정
excerpt: SpringBoot랑 react를 하나의 ide에서 사용하기 위한 세팅
categories:
  - Categories2
tags: 
permalink: /categories2/post-name-here-2/
toc: true
toc_sticky: true
date: 2024-09-17
last_modified_at: 2024-09-17
---

> 어떤 문제를 해결했나?
> 1. SpringBoot + Nextjs 환경에서의 하나의 IDE에서 복수개의 프로젝트를 실행
> 2. Next.js 에서 서버측 렌더링에 대한 디버깅 진행


#### 사용 배경지식
1. Vscode 관련해서 디버깅 모드의 관리는 root dir의 .vscode/launch.json 파일에서 관리한다.
2. 해당폴더 내 configuration 에서는 각각 실행환경을 정의한다.


### lanch.json 파일 수정
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    // backend debugging 설정(Spring boot)
    {
      "type": "java",
      "name": "SpringBackApplication",
      "request": "launch",
      "mainClass": "com.backproject.springback.SpringBackApplication",
      "projectName": "spring-back",
      "cwd":"${workspaceFolder}/spring-back"     // 백엔드 위치선언
    },
    // frontend debugging 설정(Next.js)
   {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "cwd": "${workspaceFolder}/front",          // 전체 root위치 선언(node.js)
      "serverReadyAction": {
        "pattern": "- Local:.+(https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome",
        "webRoot": "${workspaceFolder}/front"     // 클라이언트 위치선언(웹 리소스)
      }
    }
  ]
}
```


### 개인의견
디버깅은 하나의 사수이다. 내가 틀렸을 때 올바른 위치를 잡아주고 에러를 뱉기 때문에 혼자 독학으로 코딩한다면 초기 설정으로 내 시간을 획기적으로 줄여줄 수 있다.

