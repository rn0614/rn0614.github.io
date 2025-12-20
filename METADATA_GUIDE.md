# Blog Metadata 관리 가이드

## 현재 지원되는 Frontmatter 필드

Obsidian 파일의 frontmatter에서 다음 필드들을 사용할 수 있습니다:

### 1. Title (제목)
```yaml
---
title: "실제 표시할 제목"
---
```
- **기본값**: 파일명 (확장자 제외)
- **설정**: `Settings.titleProperty` (기본값: `"title"`)
- **대체**: `banner_header` 필드도 지원 (Banner 플러그인 호환)

### 2. Description (설명)
```yaml
---
description: "페이지에 대한 간단한 설명"
summary: "설명 (description의 대체 필드)"
---
```
- **기본값**: 없으면 콘텐츠에서 자동 생성
- **사용처**: 
  - `<meta name="description">`
  - `<meta property="og:description">`
  - RSS 피드

### 3. Author (작성자)
```yaml
---
author: "작성자 이름"
---
```
- **기본값**: RSS 설정의 `authorName` 또는 빈 값
- **사용처**: `<meta name="author">`

### 4. Tags (태그)
```yaml
---
tags:
  - 태그1
  - 태그2
tags: ["태그1", "태그2"]  # 배열 형식도 가능
tags: "태그1"  # 단일 태그도 가능
---
```
- **사용처**: 검색 인덱스, 태그 페이지

### 5. Aliases (별칭)
```yaml
---
aliases:
  - 별칭1
  - 별칭2
aliases: ["별칭1", "별칭2"]  # 배열 형식도 가능
---
```
- **사용처**: 검색 인덱스, 링크 해석

### 6. Cover Image (커버 이미지)
```yaml
---
cover: "이미지 경로"
coverImage: "이미지 경로"
---
```
- **현재 동작**: 문서의 첫 번째 이미지를 자동으로 사용
- **개선 필요**: frontmatter에서 명시적으로 지정 가능하도록 개선 필요

## 현재 HTML Header에 생성되는 Metadata

```html
<title>{title}</title>
<meta name="pathname" content="{파일 경로}">
<meta name="description" content="{description 또는 자동 생성}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:type" content="website">
<meta property="og:url" content="{파일 URL}">
<meta property="og:image" content="{coverImageURL 또는 undefined}">
<meta name="author" content="{author}">  <!-- author가 있을 때만 -->
```

## 문제점 및 개선 방안

### 1. og:image가 "undefined"로 표시됨
**원인**: `coverImageURL`이 없을 때 처리되지 않음

**해결 방법**:
- Obsidian 파일에 이미지를 추가하거나
- frontmatter에 `cover` 또는 `coverImage` 필드 추가 (코드 개선 필요)

### 2. 추가 Metadata 필드 부족
현재 지원되지 않지만 유용한 필드들:

- `keywords`: SEO 키워드
- `published`: 발행일
- `updated`: 수정일
- `category`: 카테고리
- `excerpt`: 짧은 요약 (description과 별도)

## 권장 Frontmatter 템플릿

```yaml
---
title: "실제 표시할 제목"
description: "페이지에 대한 간단한 설명 (SEO 및 소셜 미디어 공유용)"
author: "작성자 이름"
tags:
  - 태그1
  - 태그2
aliases:
  - 별칭1
  - 별칭2
cover: "이미지 경로"  # 향후 지원 예정
published: "2025-01-01"  # 향후 지원 예정
---
```

## 코드 개선 제안

다음 필드들을 추가로 지원하도록 개선할 수 있습니다:

1. **coverImageURL**: frontmatter의 `cover` 또는 `coverImage` 필드 지원
2. **keywords**: `<meta name="keywords">` 추가
3. **published/updated**: `<meta property="article:published_time">` 등 추가
4. **og:image 기본값**: undefined 대신 기본 이미지 또는 제거

