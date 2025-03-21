import {
  POST_BASE_PATH,
  getAllPostsList,
  parsePost,
} from "../../../../lib/posts";
import path from "path";
import { PostDetailType } from "@/types/types";
import { Metadata } from "next";
import MdxRenderer from "@/components/MdxRemoteComp/MdxRemoteComp";
import { Heading } from "@radix-ui/themes";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  const posts = getAllPostsList();
  return posts.map((post: any) => {
    return {
      slugs: post.slug.replace(/\.md(?!.*\.md)/, '').slice(POST_BASE_PATH.length + 1).split(path.sep), // slug는 ['dev','title1','안녕하세요.md']
    };
  });
}

// 여기에 동적 metatag 생성
export async function generateMetadata({
  params,
}: {
  params: PostDetailType;
}): Promise<Metadata> {
  const pathSlugs = (params.slugs as string[]).map((slug) =>
    decodeURIComponent(slug)
  );
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}.md`;

  const postInfo = parsePost(postPath);
  if (!postInfo) {
    return {
      title: "Post Not Found",
      description: "This post does not exist.",
    };
  }
  // title 속성이 없으면 제목이 title, title도 없다면 default 로 제목 미정
  const showTitle =
    postInfo?.title || pathSlugs[pathSlugs.length - 1].replace(".md", "") || "제목 미정";

  return {
    title: showTitle,
    description: postInfo?.excerpt || showTitle,
    keywords: postInfo?.tags,
    openGraph: {
      title: showTitle,
      description: postInfo?.excerpt || showTitle,
      url: `https://rn0614.github.io/${postPath}`,
      type: "article",
      publishedTime: postInfo?.date,
      modifiedTime: postInfo?.last_modified_at,
    },
    twitter: {
      card: "summary_large_image",
      title: showTitle,
      description: postInfo?.excerpt || showTitle,
    },
  };
}

// 페이지 컴포넌트
export default async function PostPage({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const pathSlugs = ((await params).slugs as string[]).map((slug) =>
    decodeURIComponent(slug)
  );
  // 파일 시스템 경로 생성
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}.md`;
  const postInfo = parsePost(postPath); // 이미 인코딩 상태로 path에 들어감
  if (postInfo === undefined) return <div>no data</div>;
  return (
    <main
      className="markdown-body"
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        paddingInline: "20px",
        minWidth: "0",
      }}
    >
      <Heading as="h1">
        {pathSlugs[pathSlugs.length - 1].replace(".md", "")}
      </Heading>
      <MdxRenderer source={postInfo.content} />
    </main>
  );
}
