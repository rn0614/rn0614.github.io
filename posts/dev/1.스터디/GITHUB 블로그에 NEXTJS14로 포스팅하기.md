---
title: GITHUB 블로그에 NEXTJS14로 포스팅하기
excerpt: 설명란
categories:
  - Categories2
tags: 
permalink: /categories2/202501130047블로그에/
toc: true
toc_sticky: true
date: 2025-01-13
last_modified_at: 2025-01-13
---
> Set a goal, make a plan and just do it.

# 1. 프로젝트 생성하기

> 어떤 REPOSITORY로든 만들 수 있지만 ROOT 파일에 별다른 설정없이 GITHUB블로그를 만들기 위해서는 repository 명칭을 `<githubId>.github.io` 이름으로 repository를 만들면 root 폴더에 자동으로 만들 수 있다.

nextjs 프로젝트를 준비 및 사용할 라이브러리를 다운받는다.

```bash
npx create-next-app --typscript
npm i @types/glob dayjs gray-matter next-mdx-remote remark-html glob @mdx-js/mdx
```


# 2. 폴더구조 잡기

posts 는 md 파일을 저장하는 공간

src 밑의 (template) 부분이 내 블로그
category는 따로 만들어서 카테고리별로 볼 수 있도록 처리하였다.

![](_md파일/Pasted%20image%2020250113005907.png)


# 3. 라이브러리 코드

```tsx
// mdx.ts
import { serialize } from 'next-mdx-remote/serialize';

export const serializeMdx = (source: string) => {
  return serialize(source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      format: 'md',
    },
  });
};
```


```tsx
// posts.ts
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


```