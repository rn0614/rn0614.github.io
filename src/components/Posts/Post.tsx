"use client";
import { useAside } from "@/hook/useAside";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import React from "react";
import Heading from "../Heading/Heading"

function PostList({
  posts,
}: {
  posts: {
    slug: string;
    metadata:any;
  }[];
}) {
  return (
    <ul className={styles.postList}>
      {posts.map((post, i) => {
        return (
          <li key={i} className={styles.Li}>
            <Post slug={post.slug} metadata={post.metadata} />
          </li>
        );
      })}
    </ul>
  );
}

function Post({ slug, metadata }: { slug: string, metadata:any }) {
  const { close } = useAside();
  const router = useRouter();
  const movePageHandler = async () => {
    console.log(metadata)
    close();
    router.push('/'+slug);
  };

  return (
    <div className={styles.postItemContent} onClick={movePageHandler}>
      <Heading level={3} className={styles.title}>
        {slug}
      </Heading>
      <div>{metadata?.date}</div>
      <div className={styles.body}>{slug}</div>
    </div>
  );
}

export { PostList, Post };
