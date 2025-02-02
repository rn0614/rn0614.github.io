---
title: Ubuntu 환경 자바 설치
excerpt: Ubuntu 환경 자바 설치
categories:
  - Categories2
tags:
  - WAS/AWS/EC2
  - "#LINUX"
permalink: /categories2/202406172342환경/
toc: true
toc_sticky: true
date: 2024-09-22 00:00:00
last_modified_at: 2024-09-22 00:00:00
---
# Ubuntu 환경 자바 설치
## 어떤 문제를 해결했나?
> EC2에 java를 설치하고 maven으로 빌드하고 배포하는 명령어를 짜야함.

## java/maven 세팅과정
```shell
# 우분투 체계에서는 apt가 기본으로 세팅되어 있음
# 패키지 목록 업데이트
sudo apt update 

# 자바, 메이븐 설치
sudo apt install openjdk-17-jdk
sudo apt install maven -y

# node js 설치 / 옛버전 설치, update
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - # node 설치
sudo apt install -y nodejs

curl -L https://www.npmjs.com/install.sh | sudo bash -         
sudo apt update

# git 설치
sudo apt install git -y


# git repo에서 불러오기
git clone ~

# backend project로 이동
cd backend-project

# maven 빌드
mvn clean install

# pm2 설치
sudo npm install -g pm2

# nginx
sudo apt install nginx

```



