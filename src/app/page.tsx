import React from "react";
import path from "path";
import { getAllPostsList } from "../lib/posts";
import Link from "next/link";
//import { getSortedPostsData } from "../../lib/posts";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const posts = getAllPostsList();

  const blogPages = posts.map((post) => {
    return {
      url: `${baseUrl}/${post.slug.replace(/\\/g, "/")}`,
      latestModified: new Date(),
    };
  });
  console.log(blogPages);

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
