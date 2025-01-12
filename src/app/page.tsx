import React from "react";
import path from "path";
import { getAllPostsList } from "../lib/posts";
import Link from "next/link";
//import { getSortedPostsData } from "../../lib/posts";

export default function Home() {
  const posts = getAllPostsList();

  //const posts = getSortedPostsData();
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
