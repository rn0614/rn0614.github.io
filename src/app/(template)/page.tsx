import React from "react";
import { getAllPostsList } from "../../lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPostsList();
  return (
    <div>
      <h1>Home Page 입니다</h1>
      <div>
        {posts.map((post, i) => {
          return (
            <li key={i}>
              <Link href={post.slug}>{post.slug}</Link>
            </li>
          );
        })}
      </div>
    </div>
  );
}
