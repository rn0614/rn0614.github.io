---
title: git 배포 관련 명령어
excerpt: git---
thumnail: 
categories: posts/dev/CICD
tags: 
date: '2025/02/05 01:23:31'
last_modified_at: '2025/02/02 16:03:29'
---
> Set a goal, make a plan and just do it.


git을 사용하다보면 하는 루틴에 따라서 몇가지 동작을 한다.

1. 남이 한거 땡기기
2. 내가 개발한건 올리기
3. 남이 개발한 건에 대해서 충돌나는 지점 확인후 수정하기
4. 내가 개발한 건 롤백하기
5. 


# 1. 남이한거 땡기기
> 바로 pull하는 건 지금 내 환경의 변경사항과 동일한 위치에 변경이 있을 경우 충돌이 발생할 수 있다. 따라서 아래와 같이 스테이징을 먼저 하고 한다.

아니면 git pull 옵션중 --rebase

1. 내가 한거를 먼저 임시저장
2. 가장 최근 소스를 가져오기
3. 임시저장한 내 소스 가져오기

```bash
git stash         # 변경 사항을 임시 저장
git pull          # 최신 변경 사항 가져오기
git stash pop     # 내 변경 사항을 다시 적용 , merege 충돌이 나는 것 정리

git pull --rebase  # 
```


# git 로그 확인
```bash
git log --oneline --graph --decorate
```