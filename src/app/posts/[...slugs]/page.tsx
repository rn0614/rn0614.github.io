import { serializeMdx } from "../../../lib/mdx";
import { POST_BASE_PATH, getAllPostsList, parsePost } from "../../../lib/posts";
import MdxRenderer from "../../../components/MdxRemoteComp";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  const posts = getAllPostsList();
  return posts.map((path) => {
    return {
      slugs: path.slug.slice(POST_BASE_PATH.length + 1).split("\\"),
    };
  });
}

// 페이지 컴포넌트
export default async function PostPage({
  params,
}: {
  params: { slugs: string[] };
}) {
  const postPath = `posts/${[...params.slugs].join("/")}`;
  console.log(postPath);
  const postInfo = parsePost(postPath);
  if (postInfo === undefined) return <div>no data</div>;
  const mdx = await serializeMdx(postInfo.content);
  if (!mdx) return <div>no data</div>;
  return (
    <div>
      <MdxRenderer mdx={mdx} />
    </div>
  );
}
