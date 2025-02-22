/**
 * scripts/update-frontmatter.js
 *
 * 1. /post 폴더 내 모든 .md 파일을 순회
 * 2. 각 파일에 대해:
 *    - Git 마지막 커밋 날짜 추출
 *    - Front Matter `updated` 필드를 해당 날짜로 갱신
 *
 * 실행 방법: node scripts/update-frontmatter.js
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const matter = require('gray-matter'); // npm install gray-matter
const dayjs = require('dayjs');

const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Day.js에 플러그인 등록
dayjs.extend(utc);
dayjs.extend(timezone);



// 0. root에서 posts 파일로 접근
const POSTS_DIR = path.join(__dirname, '..', 'posts'); 

// 1. /post 폴더의 파일경로 찾기
const allPostFiles = getChangedMdFiles(POSTS_DIR);

allPostFiles.forEach((filePath) => {
  
  // 1.해당 파일의 모든 commit 시점가져오기
  const lastCommitDate = getLastCommitDateKST(filePath); // 아래 함수 참고
  if (!lastCommitDate) {
    console.warn(`No last commit date found for ${filePath}`);
    return;
  }

  // 3. 기존 Front Matter 파싱
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(fileContent);

  // 4. `updated` 필드 갱신
  //    (없다면 추가, 있다면 업데이트)
  parsed.data.last_modified_at = lastCommitDate; // ISO 문자열로 넣을 수도 있고, 원하는 포맷으로 변환 가능

  // 5. 다시 문자열 형태로 serialize
  const updatedContent = matter.stringify(parsed.content, parsed.data);

  // 6. 파일에 덮어쓰기
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  console.log(`[update-frontmatter] Updated: ${filePath} -> updated: ${lastCommitDate}`);
});


/**
 *  posts 폴더 내부의 모든 markdown 폴더 경로 수집
 */
function getChangedMdFiles() {
  try {
    // 1) 최근 1개의 커밋 범위에서 변경된 파일 목록
    //    (상황에 따라 HEAD~1이 아니라 HEAD~n 등으로 바꿀 수 있음)
    const diffOutput = childProcess.execSync(
      'git -c core.quotepath=false diff --name-only HEAD~1 HEAD',
      { encoding: 'utf8' }
    );

    // 2) 개행 기준으로 나누어 배열화
    const changedPaths = diffOutput
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean); // 빈 줄 제거

    // 3) .md 파일 & posts/ 아래 파일만 필터링
    const changedMd = changedPaths.filter((relPath) => {
      // 주의: relPath가 'posts/...' 형태인지, 혹은 다른 경로인지 확인
      return relPath.endsWith('.md') && relPath.startsWith('posts/');
    });


    // 4) 절대 경로로 변환
    const changedMdAbsolute = changedMd.map((relPath) =>
      path.join(process.cwd(), relPath)
    );

    console.log('changedMdAbsolute',changedMdAbsolute)

    return changedMdAbsolute;
  } catch (error) {
    console.error("Failed to get changed MD files:", error);
    return [];
  }
}

/** 
 * 해당 파일의 마지막 커밋 날짜 한국시간으로 변경
 * ex)"2025/02/22 00:00:00"
*/
function getLastCommitDateKST(targetPath) {
  try {
    // 1) Git 명령어로 마지막 커밋 date (ISO-8601) 가져오기
    const isoDateString = childProcess
      .execSync(`git log -1 --format="%cd" --date=iso-strict -- "${targetPath}"`)
      .toString()
      .trim();
      

    if (!isoDateString) {
      return null;
    }

    // 2) Day.js로 파싱 후, 한국시간(Asia/Seoul)으로 변환
    const dateKST = dayjs(isoDateString)
      .tz("Asia/Seoul")                     // 타임존 설정
      .format("YYYY/MM/DD HH:mm:ss");       // 원하는 포맷

    return dateKST;
  } catch (error) {
    console.error("Error getting last commit date: ", error);
    return null;
  }
}
