import { sync } from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "../types/types";
import dayjs from "dayjs";
import { wrapWithDebug } from "./util/wrapWithDebug";

export const POST_BASE_PATH = "posts";
const POSTS_PATH = path.join(process.cwd(), POST_BASE_PATH);

// 캐시 객체를 선언합니다.
const postsCache: any = {};

// 포스트 위치 찾기
// return [ { slug: 'posts\\dev\\title1\\content.md', metadata: {...} } ]
export const getAllPostsList = wrapWithDebug((category?: string) => {
  // 캐시 키 생성 (카테고리가 없으면 'all' 사용)
  const cacheKey = category || "all";

  // 이미 캐싱된 결과가 있다면 바로 반환
  if (postsCache[cacheKey]) {
    return postsCache[cacheKey];
  }
  const categoryPattern = category ? category : "100 Resources";
  // 모든 경로를 path.join으로 구성하여 glob 패턴 생성
  const globPattern = path.join(POSTS_PATH, categoryPattern, "**", "*.md");
  // 운영체제에 따라 다르게 생성된 경로 구분자를 forward slash로 변환
  const normalizedPattern = globPattern.split(path.sep).join("/");

  const ignorePatterns = ["**/private_*", "**/101 Temp/**"];

  const postPaths: string[] = sync(normalizedPattern, {
    ignore: ignorePatterns,
  });

  const posts = postPaths
    .map((path) => path)
    .map((path) => {
      return {
        slug: path.slice(path.indexOf(POST_BASE_PATH)),
        metadata: parsePost(path),
      };
    })
    .sort(
      (a, b) =>
        dayjs(b.metadata?.last_modified_at || "2020/01/01 00:00:00").valueOf() -
        dayjs(a.metadata?.last_modified_at || "2020/01/01 00:00:00").valueOf()
    );

  // 캐시에 결과 저장
  postsCache[cacheKey] = posts;

  return posts;
}, "getAllPostsList");

export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);
  return postPaths.reduce<PostMetadata[]>((acc, curPath) => {
    const post = parsePost(curPath);
    if (!post) return acc;
    return [...acc, post];
  }, []);
};

export const parsePost = (postPath: string): PostMetadata | undefined => {
  try {
    const file = fs.readFileSync(postPath, { encoding: "utf-8" });
    const { content, data } = matter(file);
    const grayMatter = data as PostMetadata;

    if (grayMatter.draft) {
      return;
    }
    return {
      ...grayMatter,
      tags: ["test"], //grayMatter.tags.filter(Boolean),
      content,
    };
  } catch (e) {
    console.error(e);
  }
};
