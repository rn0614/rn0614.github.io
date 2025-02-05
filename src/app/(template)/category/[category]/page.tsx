import React from "react";
import { getAllPostsList } from "@/lib/posts";
import { PostList } from "@/components/Posts/Post";

// 동적 경로를 사전 정의
export async function generateStaticParams() {
  return ["dev", "etc"].map((item) => ({ category: item }));
}

export default function Category1Page({
  params,
}: {
  params: { category: string };
}) {
  const posts = getAllPostsList(params.category);
  return <PostList posts={posts} />;
}
