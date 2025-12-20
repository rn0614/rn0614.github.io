# Blog 배포 가이드

이 폴더는 GitHub Pages로 배포되는 정적 웹사이트입니다.

## 배포 방법

### 1. GitHub 저장소 준비

1. GitHub에 새 저장소를 생성하거나 기존 저장소를 사용합니다.
2. 저장소 이름이 `username.github.io` 형식이면 루트 도메인에 배포됩니다.
   - 예: `yourusername.github.io`
3. 다른 이름의 저장소라면 `https://yourusername.github.io/repository-name` 형식으로 배포됩니다.

### 2. GitHub Pages 설정

1. GitHub 저장소로 이동합니다.
2. **Settings** → **Pages** 메뉴로 이동합니다.
3. **Source** 섹션에서:
   - **Deploy from a branch** 선택
   - **Branch**: `gh-pages` 선택 (또는 GitHub Actions 사용 시 자동)
   - **Folder**: `/ (root)` 선택
4. **Save** 클릭

### 3. GitHub Actions를 통한 자동 배포 (권장)

`.github/workflows/deploy-blog.yml` 파일이 이미 생성되어 있습니다.

1. 이 파일을 GitHub 저장소에 푸시합니다.
2. `blog` 폴더의 내용이 변경되면 자동으로 배포됩니다.
3. **Actions** 탭에서 배포 상태를 확인할 수 있습니다.

### 4. 수동 배포 (선택사항)

GitHub Actions 대신 수동으로 배포하려면:

```bash
# gh-pages 브랜치 생성 및 체크아웃
git checkout --orphan gh-pages
git rm -rf .

# blog 폴더의 내용을 루트로 복사
cp -r blog/* .

# 커밋 및 푸시
git add .
git commit -m "Deploy blog to GitHub Pages"
git push origin gh-pages
```

## 로컬에서 테스트

로컬에서 정적 서버로 테스트하려면:

```bash
# Python 3 사용
cd blog
python -m http.server 8000

# 또는 Node.js 사용
npx serve blog
```

그 후 브라우저에서 `http://localhost:8000` 접속

## 주의사항

- `.nojekyll` 파일이 포함되어 있어 Jekyll 처리가 비활성화됩니다.
- 모든 경로는 상대 경로로 작성되어 있어 GitHub Pages에서 정상 작동합니다.
- `base href="."` 설정이 있어 하위 경로에서도 정상 작동합니다.


