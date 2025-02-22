---
title: GITHUB 블로그에 NEXTJS14로 포스팅하기
excerpt: github블로그에 nextjs로 포스팅하면서 겪은 일, MDX, SEO 등의 적용 문제에 대해서 개선점을 찾아보자
categories: 
tags: 
permalink: /categories2/202501130047블로그에/
toc: true
toc_sticky: true
date: "2025/01/13 00:00:00"
last_modified_at: "2025/01/13 00:00:00"
---
> Set a goal, make a plan and just do it.

# 0. 목적
> 나는 내 지식정리를 obsidian으로 한다. 그렇다보니 동기화 문제 및 외부로 지식을 공유할 때문제가 생긴다. 동기화는 구글 클라우드를 통해 하는데 지식공유는 md 파일을 notion혹은 velog나 tistory를 통해 공유를 하게되면서 불편한 과정을 거쳐야했다. 이부분을 내 깃 블로그를 통해 commit을 하면 자동 배포가 될 수 있도록 개선이 필요했다.

github블로그 필요사양
1. github 블로그에 내 obsidian md파일을 올릴 수 있어야한다.
	1. obsidian 은 hyperlink처럼 적용되어 있는데 이 기능도 쓸 수 있도록 동적으로 설정 
	2. 외부에 공개되지 않을 파일들을 따로 정리 필요
2. 공유차원이므로 seo 적용이 필요.
	1. 상세글에 적용해야하므로 nextjs로 동적으로 생성할 수 있도록 함.

# 1. 프로젝트 생성하기

> github 블로그는 어떤 REPOSITORY명칭으로든 만들 수 있지만 별도의 설정없이 github 주소의 root에 GITHUB블로그를 만들기 위해서는 repository 명칭을 `<githubId>.github.io`으로 repository를 만들면 따로 설정없이 root주소로 만들 수 있다.(나는 rn0614.github.io)

nextjs 프로젝트를 준비 및 사용할 라이브러리를 다운받는다.

```bash
npx create-next-app --typscript
npm i @types/glob dayjs gray-matter next-mdx-remote remark-html glob @mdx-js/mdx
```


# 2. 폴더구조 잡기
> 프로젝트 workspace와 obsidian의 workspace를 겹쳐서 놓는다. 이를 통해 이 프로젝트는 obsidian에서 수정하면 project에서 github에 올릴 준비가 완료된다.

### 2-0)  전체 폴더구조
![](public/image/Pasted%20image%2020250128171421.png)

1. posts 는 md 파일을 저장하는 공간
	1. 아직 글이 많지도 않고 어차피 obsidian 기능으로 연관 글을 찾기 쉬우므로 개발적인 내용은 dev에 다 넣고 나머지 글은 etc에 저장
2. private 는 올리지 않을 개인적인 공간(.ignore로 repository에 안올라가도록 하자)
3. obsidian 설정으로 글에 이미지를 붙여넣으면 image에 저장하도록 한다.
4. Template 부분에 블로그 글에 쓸 properties 에 대한 template 를 저장해서 자동으로 쓴 날짜, 제목등을 설정하도록함.

### 2-1 프로젝트 폴더구조
![](public/image/Pasted%20image%2020250128172844.png)

1. 가장 중요하게 생각한 부분이 내가 md 파일을 올렸을 때 그 md파일이 별도의 설정 없이 웹에 그대로 올라가는 부분이다. 이를 위해서 동적으로 화면을 구성하였다. posts 뒷부분을 폴더구조에서 그대로 들고와서 md 파일을 mdx파일로 여는 방식을 택했다.
2. 폴더 구조는 블로그 자체는 크게 바꾸지 않으려고 components 로 ui 적 구성, hooks 부분으로 내부 로직을 구성했으며 나중에 프로젝트가 커지면 나눠서 구성하려고 진행중.



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