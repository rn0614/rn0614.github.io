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

function getAllMarkdownFiles(dirPath) {
  let results = [];

  // readdirSync 시, 폴더 내 파일·디렉토리 목록을 가져옴
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // 하위 폴더라면 재귀적으로 들어가서 .md 파일 수집
      results = results.concat(getAllMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // .md 파일이라면 결과에 추가
      results.push(fullPath);
    }
  }

  return results;
}

// Markdown 파일들이 들어있는 폴더 경로
const POSTS_DIR = path.join(__dirname, '..', 'posts'); 

// 1. /post 폴더 내 모든 .md 파일 찾기
const allPostFiles = getAllMarkdownFiles(POSTS_DIR);

allPostFiles.forEach((fileName) => {
  const filePath = path.join(POSTS_DIR, fileName);
  
  // 2. 해당 파일의 마지막 커밋 시점 가져오기
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
 * 해당 파일의 마지막 커밋 날짜 한국시간으로 변경
 * ex) 2025/02/22 00:00:00
*/
function getLastCommitDateKST(targetPath) {
  try {
    // 1) Git 명령어로 마지막 커밋 date (ISO-8601) 가져오기
    const isoDateString = childProcess
      .execSync(`git log -1 --format="%cd" --date=iso-strict ${targetPath}`)
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
    console.error("Error getting last commit date:", error);
    return null;
  }
}
