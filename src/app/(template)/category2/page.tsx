import React from "react";
import { getAllPostsList } from "@/lib/posts";
import Link from "next/link";

export default function Category1Page() {
  const posts = getAllPostsList("etc");
  return (
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
  );
}
