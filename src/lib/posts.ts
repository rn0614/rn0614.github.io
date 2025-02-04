import { sync } from "glob";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "../types/types";
import dayjs from "dayjs";
import readingTime from "reading-time";
import { wrapWithDebug } from "./util/wrapWithDebug";

export const POST_BASE_PATH = "posts";
const POSTS_PATH = path.join(process.cwd(), POST_BASE_PATH);

// 포스트 위치 찾기
// return [ { slug: 'posts\\dev\\title1\\content.md' } ]
export const getAllPostsList = wrapWithDebug((category?: string) => {
  const postPaths: string[] = sync(
    `${POSTS_PATH}/${category ? category : "**"}/**/*.md`
  );
  return postPaths
    .map((path) => {
      return {
        slug: path.slice(path.indexOf(POST_BASE_PATH)),
        metadata: parsePost(path),
      };
    })
    .sort(
      (a, b) =>
        dayjs(b.metadata?.last_modified_at).valueOf() -
        dayjs(a.metadata?.last_modified_at).valueOf()
    );
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
      date: dayjs(grayMatter.date).format("YYYY/MM/DD HH:mm:ss"),
      content,
    };
  } catch (e) {
    console.error(e);
  }
};
