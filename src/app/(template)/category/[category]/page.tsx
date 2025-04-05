import React from "react";
import { getAllPostsList } from "@/lib/posts";
import { PostList } from "@/components/Posts/Post";
import { Heading } from "@radix-ui/themes";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  return ["100 Resources","100%20Resources",'dev',"한글카테고리테스트"].map((item) => ({ category: item }));
}

export default async function Category1Page(
  props: {
    params: Promise<{ category: string }>;
  }
) {
  const params = await props.params;
  const posts = getAllPostsList(decodeURIComponent(params.category));
  return (
    <main style={{paddingInline:"20px"}}>
      <Heading as="h1">{decodeURIComponent(params.category)}</Heading>
      <PostList posts={posts} />
    </main>
  );
}
