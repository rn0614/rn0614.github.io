import { serializeMdx } from "../../../../lib/mdx";
import {
  POST_BASE_PATH,
  getAllPostsList,
  parsePost,
} from "../../../../lib/posts";
import MdxRenderer from "../../../../components/MdxRemoteComp";
import path from "path";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  const posts = getAllPostsList();
  return posts.map((post) => {
    return {
      slugs: post.slug
        .slice(POST_BASE_PATH.length + 1)
        .split(path.sep),      // slug는 ['dev','title1','안녕하세요.md']
    };
  });
}

// 페이지 컴포넌트
export default async function PostPage({
  params,
}: {
  params: { slugs: string[] }; // slugs는 [ 'dev','title1','%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94.md']
}) {
  const pathSlugs = params.slugs.map((slug) =>decodeURIComponent(slug));

  // 파일 시스템 경로 생성
  const postPath = `posts${path.sep}${pathSlugs.join(path.sep)}`;
  const postInfo = parsePost(postPath); // 이미 인코딩 상태로 path에 들어감

  if (postInfo === undefined) return <div>no data</div>;
  const mdx = await serializeMdx(postInfo.content);
  if (!mdx) return <div>no data</div>;
  return (
    <div className="markdown-body">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.css" rel="stylesheet"></link>
      <MdxRenderer mdx={mdx} />
    </div>
  );
}
