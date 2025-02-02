---
title: MERGE를 통한 배포
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202411102027통한/
toc: true
toc_sticky: true
date: 2024/11/10 00:00:00
last_modified_at: 2024/11/10 00:00:00
---
# 문제상황
1. MERGE를 통해서만 GITHUB에 배포할 수 있도록 해야함.
2. CI TEST가 실패할 경우 MERGE 불가능하게 세팅

# CHAT GPT
`main` 브랜치를 직접 수정하지 않고 PR(Pull Request)을 통해서만 수정할 수 있도록 하려면 GitHub에서 **Branch Protection Rule**을 설정하면 됩니다. 다음과 같이 설정할 수 있습니다:

1. **GitHub 리포지토리**로 이동합니다.
2. 상단의 **Settings** 탭을 클릭합니다.
3. 왼쪽 메뉴에서 **Branches**를 선택합니다.
4. **Branch protection rules** 섹션에서 **Add rule** 버튼을 클릭합니다.
5. **Branch name pattern**에 `main`을 입력하여 `main` 브랜치에 대한 보호 규칙을 설정합니다.
6. 필요한 설정을 선택합니다:
    - **Require a pull request before merging**: 이 옵션을 선택하면 `main` 브랜치에 직접 푸시할 수 없고, PR을 통해서만 수정이 가능합니다.
    - **Require status checks to pass before merging** (옵션): 특정 CI 검사(예: 테스트)가 성공해야만 PR을 병합할 수 있도록 설정할 수 있습니다.
    - **Include administrators** (옵션): 관리자도 직접 푸시하지 못하도록 설정할 수 있습니다.


![](_md파일/Pasted%20image%2020241110202917.png)