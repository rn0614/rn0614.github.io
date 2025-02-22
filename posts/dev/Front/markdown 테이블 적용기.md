---
title: markdown 테이블 적용기
excerpt: nextjs, MDXRemote, remarkGfm
thumnail: /image/Pasted%20image%2020250209025453.png
categories: posts/dev/Front
tags: 
date: "2025/02/09 02:48:16"
last_modified_at: "2025/02/09 03:12:20"
---
> Set a goal, make a plan and just do it.



# Next.js에서
> react 내부에서 보통 markdown 을 적용하기 위해서는 next-mdx-remote를 사용하여 코드 Markdown 형식을 고친다.


blog를 만든지도 꽤 됐고 app router를 쓰는 회사도 점차 늘어감에 따라 14.1.x버전으로 만들었던 이 블로그를 14 마지막 버전으로 마이그레이션 하기로 했다.

문제는 마이그레이션 이후에 MDX 파일에서 오류가 걸렸다.

확인해보니 MDXRemote 컴포넌트의 사용방법이 바뀌어서 호환이 안됐다.


Nextjs 공식 블로그에서는 app router 밑에 파일을 둬서 `@/posts/ ... /*.md` 형식으로 파일을 직접적으로 가져왔는데 내 폴더 구조는 다음과 같이 src 밖에 있다. 

![](public/image/Pasted%20image%2020250209025453.png)

그래서 `import { MDXRemote } from "next-mdx-remote/rsc";` 를 사용해서 외부에서 가져와서 사용해야하는데 문제는 해당 MDXRemote 코드가 md 파일을 string 형태로 바꿔서 이전에는 serialize를 해서 그 serialize를 하는걸 가져와서 props로 쓰는 방식이었는데 .md 파일을 string 형태로 component에 집어넣는 방식으로 바뀌었다.

### 이전소스
```tsx
export default function MdxRenderer({
  mdx,
}: {
  mdx: MDXRemoteSerializeResult;  // component 밖에서 serialize를 해서 가져옴
}) {
  if (mdx === undefined) return <div>no</div>;
  return (
    <div className={styles.mdxWrapper}>
      <MDXRemote {...mdx} components={components} />   // 가져온 코드를 props로 펼치기
    </div>
  );
}


```



### 공식문서  제공소스
> `https://nextjs.org/docs/app/building-your-application/configuring/mdx`

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
 
export default async function RemoteMdxPage() {
  // MDX text - can be from a database, CMS, fetch, anywhere...
  const res = await fetch('https://...')
  const markdown = await res.text()
  return <MDXRemote source={markdown} />  // source에 직접적으로 투입
}
```



일단 MDXRemote 의 props로 넣는거를 뒤져봤고 components, options를 추가로 받는걸 확인
내부로 들어가서 type들을 비교한 결과 options 타입안에 다음과 같은 타입 확인



## 타입구조 확인
CompileOptions > CoreProcessorOptions > ProcessorOption  > `[remarkPlugin]` 을 명시하는걸 찾았다.

```ts
export interface SerializeOptions {
    /**
     * Pass-through variables for use in the MDX content
     */
    scope?: Record<string, unknown>;
    /**
     * These options are passed to the MDX compiler.
     * See [the MDX docs.](https://github.com/mdx-js/mdx/blob/master/packages/mdx/index.js).
     */
    mdxOptions?: Omit<CompileOptions, 'outputFormat' | 'providerImportSource'> & {
        useDynamicImport?: boolean;
    };
    /**
     * Indicate whether or not frontmatter should be parsed out of the MDX. Defaults to false
     */
    parseFrontmatter?: boolean;
}


@typedef {CoreProcessorOptions & ExtraOptions} CompileOptions


@typedef {Omit<ProcessorOptions, 'format'>} CoreProcessorOptions


@property {PluggableList | null | undefined} [remarkPlugins]
```

![](public/image/Pasted%20image%2020250209030633.png)




### 내 수정 소스
> 오래걸린거 치고 그냥 options 안에 mdxOptions 를 찾아서 할 순 있겠지만 나름 타입 찾아가면서 구조를 살피는 것도 재밌었다. 나는 별로 쓸일 없었던 .d.ts안을 확인하는것도 좋았다.

```tsx
import styles from "./style.module.scss";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from 'remark-gfm'
const components = {
  img: (props: any) => <img {...props} src={props.src.replace("public", "")} />, //public 주소만 제외
  a:(props:any) => <a {...props} href={`/${props.href}`}/>
};

export default function MdxRenderer({
  source,
}: {
  source: string|undefined;
}) {
  if (source === undefined) return <div>no</div>;
  return (
    <div className={styles.mdxWrapper}>
      <MDXRemote source={source} components={components} options={{mdxOptions:{remarkPlugins:[remarkGfm]}}}/>
    </div>
  );
}

```


## 적용한 화면과 소스

![](public/image/Pasted%20image%2020250209031139.png)
```tsx

테이블 스타일 테스트

| `<script>` 위치 | `<script>` 속성 | 다운로드        | 실행 시점             | HTML 파싱 중단 여부 |
| ------------- | ------------- | ----------- | ----------------- | ------------- |
| `<head>`      | 없음            | 🚨 직렬(파싱중단) | 🚨 `<head>`에서 실행됨 | ✅ 파싱 중단       |
| `<head>`      | `async`       | ✅ 병렬        | ❌ 다운로드 완료 즉시 실행   | ✅ 파싱 중단       |
| `<head>`      | `defer`       | ✅ 병렬        | ✅ HTML 파싱 후 실행    | ❌ 파싱 중단 없음    |
| `<body>`      | 없음            | ✅ 병렬        | ✅ HTML 파싱 후 실행    | ❌ 파싱 중단 없음    |
| `<body>`      | `async`       | ✅ 병렬        | ❌ 다운로드 완료 즉시 실행   | ✅ 파싱 중단       |
| `<body>`      | `defer`       | ✅ 병렬        | ✅ HTML 파싱 후 실행    | ❌ 파싱 중단 없음    |


## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

```