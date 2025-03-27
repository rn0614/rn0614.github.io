"use client";
import { useAside } from "@/hooks/useAside";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { Card, Flex, Inset, Text, Heading } from "@radix-ui/themes";
import { PostMetadata } from "@/types/types";
import Pagination from "../Pagination/Pagination";
import Link from "next/link";

function PostList({
  posts,
}: {
  posts: {
    slug: string;
    metadata: any;
  }[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState<number>(10);
  const filteredPost = posts.filter((_, idx) => {
    return (
      idx >= (currentPage - 1) * limitPage && idx < currentPage * limitPage
    );
  });
  const totalPages = Math.ceil(posts.length / limitPage);

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
        limitPage={limitPage}
        setLimitPage={setLimitPage}
      />
    </div>
  );
}

function Post({ slug, metadata }: { slug: string; metadata: PostMetadata }) {
  const filename = slug.replace(/\.md$/, "").split(/[\\/]/).pop();

  return (
    <Card className={styles.postItemContent}>
      <Link href={"/" + encodeURIComponent(slug.replace(/\.md$/, ""))}>
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
      </Link>
      <Link href={"/" + encodeURIComponent(slug.replace(/\.md$/, ""))} className={styles.flexDetailLink}>
        <Flex direction={"column"} className={styles.cardDescription}>
          <Heading as={"h3"} className={styles.title}>
            {filename ?? metadata?.title ?? "제목없음"}
          </Heading>
          <Text>{metadata?.last_modified_at}</Text>
          <Text className={styles.body}>{metadata.excerpt}</Text>
        </Flex>
      </Link>
    </Card>
  );
}

export { PostList, Post };
