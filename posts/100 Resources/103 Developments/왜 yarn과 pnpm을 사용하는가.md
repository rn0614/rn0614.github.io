---
title: 왜 yarn과 pnpm을 사용하는가
CMDS:
  - "[[posts/900 Settings/901 Main/103 Developments]]"
excerpt: 기본세팅 npm의 무엇이 부족해서 yarn, pnpm으로 갔는가
thumnail: 
tags:
  - Front
  - build_package
date: 2025/04/06 18:50:10
last_modified_at: 2025/04/06 18:50:10
---

## 왜 기본 npm 대신 Yarn과 pnpm을 선택하는가?

npm은 Node.js와 함께 기본 제공되는 패키지 매니저입니다. 그러나 많은 개발자들이 Yarn이나 pnpm을 선택하는 이유는 성능, 의존성 관리, 캐싱 및 워크스페이스 지원 등의 측면에서 몇 가지 강점을 제공하기 때문입니다.

## 1. 설치 속도

- **npm:**
  - 초기 버전은 패키지를 순차적으로 설치하여 느렸으나, 최신 버전에서는 병렬 설치 기능이 도입되어 개선됨.
  - 여전히 프로젝트별로 `node_modules`에 설치하므로, 동일 패키지가 여러 프로젝트에서 중복될 수 있음.
- **Yarn:**
  - 패키지들을 병렬로 설치하여 전체 설치 시간이 빠름.
  - 강력한 글로벌 캐싱 메커니즘으로 이미 다운로드된 패키지를 빠르게 재사용함.
- **pnpm:**
  - 콘텐츠 기반 저장소(Content-addressable storage)를 사용해, 동일한 패키지를 전역 캐시에 저장 후, 프로젝트별 `node_modules`에 심볼릭 링크 방식으로 연결.
  - 이 방식은 설치 속도를 극대화하고 디스크 공간도 절약함.

## 2. 캐싱 매커니즘

- **npm:**
  - 한 번 다운로드된 패키지는 글로벌 캐시(보통 `~/.npm`)에 저장되어 동일 버전의 패키지를 재설치할 때 재사용됨.
  - 하지만, 최종적으로는 각 프로젝트 내의 `node_modules` 폴더에 설치됩니다.
  
- **Yarn:**
  - 전역 캐시(예: `~/.cache/yarn`)에 패키지를 저장하고, 콘텐츠 기반 해싱을 통해 같은 패키지 버전을 여러 프로젝트에서 공유합니다.
  - 이를 통해 네트워크 요청을 줄이고 설치 속도를 높일 수 있습니다.
  
- **pnpm:**
  - 전역 저장소에 패키지를 저장한 후, 프로젝트의 `node_modules`에는 해당 패키지에 대한 심볼릭 링크를 생성합니다.
  - 이 방식은 디스크 공간을 효율적으로 사용하면서, 동일 패키지를 여러 번 다운로드하지 않아 빠른 설치가 가능합니다.

## 3. 의존성 관리 및 워크스페이스 지원

- **npm:**
  - `package-lock.json` 파일을 사용하여 의존성 버전을 고정합니다.
  - npm v7부터 워크스페이스 기능을 지원하여 모노레포 관리가 가능해졌습니다.
  
- **Yarn:**
  - `yarn.lock` 파일을 사용해 결정론적(Deterministic) 의존성 관리를 제공, 모든 환경에서 동일한 설치 결과를 보장합니다.
  - 초기부터 워크스페이스를 지원하여, 여러 패키지를 포함한 대규모 프로젝트에서 인기가 높습니다.
  
- **pnpm:**
  - pnpm 또한 lock 파일과 강력한 워크스페이스 지원을 제공하며, 중복 설치 없이 패키지를 공유함으로써 효율적인 프로젝트 관리를 돕습니다.

## 4. 비교 표

| **요소**        | **npm**                          | **Yarn**                              | **pnpm**                            |
| ------------- | -------------------------------- | ------------------------------------- | ----------------------------------- |
| **설치 속도**     | 최신 버전에서 개선되었지만, 여전히 프로젝트별 설치     | 병렬 설치와 강력한 캐싱으로 매우 빠름                 | 글로벌 캐시와 심볼릭 링크로 빠르며 디스크 공간 절약       |
| **캐싱 메커니즘**   | 글로벌 캐시(`~/.npm`) 존재, 프로젝트별 설치 필수 | 글로벌 캐시(`~/.cache/yarn`)와 콘텐츠 기반 해싱 사용 | 글로벌 저장소를 활용해 중복 다운로드 방지 및 심볼릭 링크 사용 |
| **의존성 관리**    | `package-lock.json`으로 관리         | `yarn.lock` 파일로 결정론적 관리               | Lock 파일과 링크 기법으로 효율적 관리             |
| **워크스페이스 지원** | npm v7부터 지원                      | 초기부터 강력한 워크스페이스 지원                    | 워크스페이스 지원을 통한 효율적 관리                |
| **CLI 경험**    | 익숙하지만 경우에 따라 느릴 수 있음             | 빠르고 직관적인 명령어 제공                       | npm과 유사한 인터페이스로 높은 성능 제공            |

### 파일시스템 구성여부

| 파일 이름            | npm                    | Yarn           | pnpm                               |
| ---------------- | ---------------------- | -------------- | ---------------------------------- |
| **package.json** | 존재 (공통)                | 존재 (공통)        | 존재 (공통)                            |
| **Lock 파일**      | package-lock.json (사용) | yarn.lock (사용) | pnpm-lock.yaml (사용)                |
| **node_modules** | 각 프로젝트에 생성             | 각 프로젝트에 생성     | 각 프로젝트에 생성 (글로벌 캐시 + 심볼릭 링크 방식 사용) |


## 5. 결론

- **빠른 설치와 효율성:**  
  Yarn과 pnpm은 병렬 설치와 강력한 글로벌 캐시 메커니즘 덕분에 npm보다 훨씬 빠르게 의존성을 설치할 수 있습니다.
  
- **일관된 의존성 관리:**  
  결정론적인 lock 파일(`yarn.lock` 또는 pnpm의 lock 파일)을 사용하여, 협업 환경에서 모든 개발자가 동일한 패키지 트리를 사용할 수 있습니다.
  
- **워크스페이스와 모노레포 지원:**  
  특히 Yarn과 pnpm은 대규모 프로젝트나 모노레포에서 효율적인 의존성 관리와 디스크 공간 절약 측면에서 강점을 보입니다.
  
이러한 요소들 때문에 많은 개발자들이 기본 npm 대신 Yarn이나 pnpm을 선택하여 더 빠르고 일관된 개발 환경을 구축하고 있습니다.
