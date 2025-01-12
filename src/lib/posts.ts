import { sync } from 'glob';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post, PostMatter } from '../types/types';
import dayjs from 'dayjs';
import readingTime from 'reading-time';


export const POST_BASE_PATH = 'posts';
const POSTS_PATH = path.join(process.cwd(), POST_BASE_PATH);

// 포스트 위치 찾기 
// return [ { slug: 'posts\\dev\\title1\\content.md' } ]
export const getAllPostsList = () => {
  console.log(POSTS_PATH)
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);
  return postPaths.map((path) => {
    return {
      slug: path.slice(path.indexOf(POST_BASE_PATH)),
    };
  });
};

export const getAllPosts = () => {
  const postPaths: string[] = sync(`${POSTS_PATH}/**/*.md`);
  return postPaths.reduce<Post[]>((acc, curPath) => {
    const post = parsePost(curPath);
    if (!post) return acc;
    return [...acc, post];
  }, []);
};

export const parsePost = (postPath: string): Post | undefined => {
  try {
    const file = fs.readFileSync(postPath, { encoding: "utf8" });
    const { content, data } = matter(file);
    const grayMatter = data as PostMatter;

    if (grayMatter.draft) {
      return;
    }

    return {
      ...grayMatter,
      tags: ['test'],//grayMatter.tags.filter(Boolean),
      date: dayjs(grayMatter.date).format("YYYY-MM-DD"),
      content,
      slug: postPath
        .slice(postPath.indexOf(POST_BASE_PATH))
        .replace(".mdx", ""),
      readingMinutes: Math.ceil(readingTime(content).minutes),
      wordCount: content.split(/\s+/gu).length,
    };
  } catch (e) {
    console.error(e);
  }
};
