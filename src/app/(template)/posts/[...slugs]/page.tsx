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
    console.log(
      post.slug
        .slice(POST_BASE_PATH.length + 1)
        .split(path.sep)
        .map((item) => (item))
    );
    return {
      slugs: post.slug
        .slice(POST_BASE_PATH.length + 1)
        .split(path.sep)
        .map((item) => (item)),
    };
  });
}

// 페이지 컴포넌트
export default async function PostPage({
  params,
}: {
  params: { slugs: string[] }; // slugs는 [ 'dev','title1','%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94.md']
}) {
  console.log('params',params)

  const decodedSlugs = params.slugs.map((slug) =>
    decodeURIComponent(slug)
  );

  // 파일 시스템 경로 생성
  const postPath = `posts${path.sep}${decodedSlugs.join(path.sep)}`;
  console.log("Decoded Post Path:", decodedSlugs);

  const postInfo = parsePost((postPath));

  console.log(postInfo,postInfo)
  if (postInfo === undefined) return <div>no data</div>;
  const mdx = await serializeMdx(postInfo.content);
  if (!mdx) return <div>no data</div>;
  return (
    <div>
      <MdxRenderer mdx={mdx} />
    </div>
  );
}
