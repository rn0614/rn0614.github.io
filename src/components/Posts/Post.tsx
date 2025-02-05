"use client";
import { useAside } from "@/hook/useAside";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
import React from "react";
import Heading from "../Heading/Heading";
import { Box, Card, Flex, Inset, Text } from "@radix-ui/themes";
import { PostMetadata } from "@/types/types";

function PostList({
  posts,
}: {
  posts: {
    slug: string;
    metadata: any;
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

function Post({ slug, metadata }: { slug: string; metadata: PostMetadata }) {
  const { close } = useAside();
  const router = useRouter();
  const movePageHandler = async () => {
    console.log(metadata);
    close();
    router.push("/" + slug);
  };

  return (
    <>
      <Card className={styles.postItemContent} onClick={movePageHandler}>
        <Inset>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${
              !!!(metadata?.thumnail)
                ? "image/no-image-found.png"
                : metadata.thumnail
            }`}
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 100,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Flex direction={"column"}>
          <Heading level={3} className={styles.title}>
            {slug}
          </Heading>
          <Text>{metadata?.date}</Text>
          <Text className={styles.body}>{slug}</Text>
        </Flex>
      </Card>
    </>
  );
}

export { PostList, Post };
