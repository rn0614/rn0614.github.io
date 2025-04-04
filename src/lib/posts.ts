import { sync } from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "../types/types";
import dayjs from "dayjs";
import { wrapWithDebug } from "./util/wrapWithDebug";

// Constants
export const POST_BASE_PATH = "posts";
const POSTS_PATH = path.join(process.cwd(), POST_BASE_PATH);
const DEFAULT_CATEGORY = "100 Resources";
const DEFAULT_DATE = "2020/01/01 00:00:00";
const IGNORE_PATTERNS = ["**/private_*", "**/101 Temp/**"];

// Cache interface and initialization
interface PostsCache {
  [key: string]: Array<{
    slug: string;
    metadata: PostMetadata | undefined;
  }>;
}

const postsCache: PostsCache = {};

/**
 * Retrieves all posts for a given category
 * @param category - Optional category filter
 * @returns Array of posts with their slugs and metadata
 */
export const getAllPostsList = wrapWithDebug((category?: string) => {
  const cacheKey = category || "all";

  if (postsCache[cacheKey]) {
    return postsCache[cacheKey];
  }

  const categoryPattern = category || DEFAULT_CATEGORY;
  const globPattern = path.join(POSTS_PATH, categoryPattern, "**", "*.md");
  const normalizedPattern = globPattern.split(path.sep).join("/");

  const postPaths: string[] = sync(normalizedPattern, {
    ignore: IGNORE_PATTERNS,
  });

  const posts = postPaths
    .map((filePath) => {
      // 파일 시스템 경로에서 상대 경로 추출
      const relativePath = filePath.slice(filePath.indexOf(POST_BASE_PATH));
      
      // 상대 경로를 인코딩하여 URL용 경로 생성
      const encodedPath = relativePath.split(path.sep).map(part => encodeURIComponent(part)).join(path.sep);
      
      return {
        slug: encodedPath,
        metadata: parsePost(filePath),
      };
    })
    .sort((a, b) => {
      const dateA = dayjs(a.metadata?.last_modified_at || DEFAULT_DATE);
      const dateB = dayjs(b.metadata?.last_modified_at || DEFAULT_DATE);
      return dateB.valueOf() - dateA.valueOf();
    });

  postsCache[cacheKey] = posts;
  return posts;
}, "getAllPostsList");

/**
 * Retrieves all posts without category filtering
 * @returns Array of post metadata
 */
export const getAllPosts = (): PostMetadata[] => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);
  return postPaths.reduce<PostMetadata[]>((acc, curPath) => {
    const post = parsePost(curPath);
    if (!post) return acc;
    return [...acc, post];
  }, []);
};

/**
 * Parses a markdown post file and extracts its metadata
 * @param postPath - Path to the markdown file
 * @returns Post metadata or undefined if parsing fails
 */
export const parsePost = (postPath: string): PostMetadata | undefined => {
  try {
    // 경로를 디코딩하여 파일 시스템에 접근
    const decodedPath = postPath.split(path.sep).map(part => decodeURIComponent(part)).join(path.sep);
    
    const file = fs.readFileSync(decodedPath, { encoding: "utf-8" });
    const { content, data } = matter(file);
    const metadata = data as PostMetadata;

    if (metadata.draft) {
      return undefined;
    }

    return {
      ...metadata,
      tags: metadata.tags?.filter(Boolean) || [],
      content,
    };
  } catch (error) {
    console.error(`Error parsing post at ${postPath}:`, error);
    return undefined;
  }
};
