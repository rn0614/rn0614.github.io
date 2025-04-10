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
    // 경로에서 .md 확장자 제거
    const cleanSlug = post.slug.replace(/\.md$/, '');
    
    // POST_BASE_PATH 이후의 경로만 추출
    const relativePath = cleanSlug.slice(POST_BASE_PATH.length + 1);
    
    // 경로를 슬래시로 분리
    const pathParts = relativePath.split(path.sep);
    
    // 각 경로 부분을 인코딩 (이중 인코딩 방지)
    const encodedParts = pathParts.map((part: string) => {
      // 이미 인코딩된 부분이 있는지 확인
      try {
        // 디코딩 시도
        const decoded = decodeURIComponent(part);
        // 디코딩 성공 시 원본 값 사용
        return part;
      } catch (e) {
        // 디코딩 실패 시 인코딩
        return encodeURIComponent(part);
      }
    });
    
    return {
      slugs: encodedParts,
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
    openGraph: {
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
        {decodeURIComponent(pathSlugs[pathSlugs.length - 1].replace(".md", ""))}
      </Heading>
      <MdxRenderer source={postInfo!.content} />
    </main>
  );
}
