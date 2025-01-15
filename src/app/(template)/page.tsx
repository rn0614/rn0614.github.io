import React from "react";
import { getAllPostsList } from "../../lib/posts";
import Link from "next/link";
import Heading from "@/components/Heading/Heading";

export default function Home() {
  const posts = getAllPostsList();
  return (
    <>
      <Heading level={1}>글 목록 리스트</Heading>
      <div>
        <ul>
          {posts.map((post, i) => {
            return (
              <li key={i}>
                <Link href={post.slug}>{post.slug}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
