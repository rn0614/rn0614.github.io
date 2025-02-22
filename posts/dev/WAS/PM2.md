---
title: PM2
excerpt: PM2로 서버 인스턴스 없이도 실행하기
categories:
  - Categories2
tags:
  - WAS/LIBRARY
permalink: /categories2/202409220253undefined/
toc: true
toc_sticky: true
date: "2024/09/22 00:00:00"
last_modified_at: "2024/09/22 00:00:00"
---
# PM2

## 개요
> node.js 기반 어플리케이션 프로세스 관리자이다. 백그라운드 실행 및 무중단서비스, 모니터링 3개로 보통 사용한다.


node 기반으로 js 를 실행하는데 보통 ecosystem.js 와 같이 사용한다.
## 코드

## ecosystem 에서 어떤 스크립트를 실행할지 세팅
```js
// ecosystem.config.js 에서 cluster mode를 사용하기 위해서 아래 설정 사용
module.exports ={
  apps:[{
    script  :"app.js",
    instances: "max",
    exec_mode :"cluster"
  }]
}
```


```js
// pm2에서 node.js로 명령어 실행시키는 방법
pm2 start app.js
```


```js
// ecosystem으로 application 구성을 조정하는 방법
// ecosystem.config.js

module.exports = {
  apps : [{
    name: 'myapp',
    script: '/home/user/myapp/app.js',
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
```


스크립트를 지정하여 실행하는 방법 즉 pm2는 단순 nodejs 기반으로 js를 실행시켜주고 상태를 관리한다. 실행시키는 js 로 ecosystem이 내부에 exports 모듈에서 실행할 명령어에 대한 정보를 갖고 있음,

```js
// ./front 에서 npm start NextApp 을 하는 방법  -- NODE_ENV 는 node 사용환경에서만 영향
// 아래 명령어를 실행하면 현재 위치에서 다음과 같은 명령어를 실행함
// cd ./front
// npm start NextApp
// cd ./spring-back
// java -jar spring-back-0.0.1-SNAPSHOT.jar
module.exports = {
  apps : [
    {
      name: 'NextApp',
      script: 'npm',
      args: 'start',
      cwd: './front',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'SpringBootApp',
      script: 'java',
      args: '-jar spring-back/target/spring-back-0.0.1-SNAPSHOT.jar',
      cwd: './spring-back',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
```


## Maven 명령어를 실행하기 위해서는
```shell
# pm2는 직접적으로 빌드 프로세스 명령어를 실행 불가 예를들어 mvn clean install 이 불가능함.

#따라서 실행파일 (~.sh) 를 만들어서 실행하도록 명령해야함
#또 해당 과정에서 해당 스크립트가 권한을 가지고 있도록 하기 위해서는 권한 부여 필요
chmod +x spring-back/~.sh
#이후에 해당 스크립트를 싱행하도록 ecosystem.config.js 설정

#~.sh 파일
#!/bin/bash
# navigate to the spring-back directory
cd "$(dirname "$0")"

# Run maven clean and install
mvn clean install

# Navigate to target directory and run the jar file with production profile
cd target
java -jar -Dspring.profiles.active=prod spring-back-0.0.1-SNAPSHOT.jar

```

```js
// ecosystem.config.js
module.exports = {
  apps : [
    {
      name: 'SpringBootApp',
      script: './spring-back/run-spring.sh',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
```