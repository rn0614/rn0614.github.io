"use client";
import { useAside } from "@/hook/useAside";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import Heading from "../Heading/Heading";
import {  Card, Flex, Inset, Text } from "@radix-ui/themes";
import { PostMetadata } from "@/types/types";
import Pagination from "../Pagination/Pagination";

function PostList({
  posts,
}: {
  posts: {
    slug: string;
    metadata: any;
  }[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const filteredPost = posts.filter((_, idx) => {
    return idx >= (currentPage-1) * 10 && idx < currentPage * 10;
  });
  const totalPages = Math.ceil(posts.length / 10);

  const goPage = (num: number) => {
    setCurrentPage(num);
  };

  return (
    <div>
      <ul className={styles.postList}>
        {filteredPost.map((post, i) => {
          return (
            <li key={i} className={styles.Li}>
              <Post slug={post.slug} metadata={post.metadata} />
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goPage={goPage}
      />
    </div>
  );
}

function Post({ slug, metadata }: { slug: string; metadata: PostMetadata }) {
  const { close } = useAside();
  const router = useRouter();
  const filename = slug.replace(/\.md$/, "").split(/[\\/]/).pop();

  const movePageHandler = async () => {
    console.log(metadata);
    close();
    router.push("/" + slug);
  };

  return (
    <>
      <Card className={styles.postItemContent} onClick={movePageHandler}>
        <Inset clip="padding-box" className={styles.cardInset}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${
              !!!metadata?.thumnail
                ? "image/no-image-found.png"
                : metadata.thumnail
            }`}
            alt="Bold typography"
            className={styles.insetImage}
          />
        </Inset>
        <Flex direction={"column"} className={styles.cardDescription}>
          <Heading level={3} className={styles.title}>
            {filename ?? metadata?.title ??'제목없음'}
          </Heading>
          <Text>{metadata?.date}</Text>
          <Text className={styles.body}>{metadata.excerpt}</Text>
        </Flex>
      </Card>
    </>
  );
}

export { PostList, Post };
