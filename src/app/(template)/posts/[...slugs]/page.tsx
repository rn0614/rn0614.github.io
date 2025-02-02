import { serializeMdx } from "../../../../lib/mdx";
import {
  POST_BASE_PATH,
  getAllPostsList,
  parsePost,
} from "../../../../lib/posts";
import MdxRenderer from "../../../../components/MdxRemoteComp/MdxRemoteComp";
import path from "path";
import Heading from "@/components/Heading/Heading";
import { PostDetailType } from "@/types/types";
import { Metadata } from "next";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  const posts = getAllPostsList();
  return posts.map((post) => {
    return {
      slugs: post.slug.slice(POST_BASE_PATH.length + 1).split(path.sep), // slug는 ['dev','title1','안녕하세요.md']
    };
  });
}

// 여기에 동적 metatag 생성
export async function generateMetadata({
  params,
}: {
  params: PostDetailType;
}): Promise<Metadata> {
  const pathSlugs = params.slugs.map((slug) => decodeURIComponent(slug));
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}`;

  const postInfo = parsePost(postPath);
  if (!postInfo) {
    return {
      title: "Post Not Found",
      description: "This post does not exist.",
    };
  }

  return {
    title: postInfo?.title,
    description: postInfo?.excerpt,
    keywords: postInfo?.tags,
    openGraph: {
      title: postInfo?.title,
      description: postInfo?.excerpt,
      type: "article",
      publishedTime: postInfo?.date,
      modifiedTime: postInfo?.last_modified_at?.toISOString(),
    },
  };
}

// 페이지 컴포넌트
export default async function PostPage({ params }: { params: PostDetailType }) {
  const pathSlugs = params.slugs.map((slug) => decodeURIComponent(slug));

  // 파일 시스템 경로 생성
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}`;
  const postInfo = parsePost(postPath); // 이미 인코딩 상태로 path에 들어감

  if (postInfo === undefined) return <div>no data</div>;
  const mdx = await serializeMdx(postInfo.content);
  if (!mdx) return <div>no data</div>;
  return (
    <div
      className="markdown-body"
      style={{ flex: "1", display: "flex", flexDirection: "column" }}
    >
      <Heading level={1}>
        {pathSlugs[pathSlugs.length - 1].replace(".md", "")}
      </Heading>
      <MdxRenderer mdx={mdx} />
    </div>
  );
}
