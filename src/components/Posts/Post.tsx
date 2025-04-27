"use client";
import { useAside } from "@/hooks/useAside";
import { useRouter,useSearchParams } from "next/navigation";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { Card, Flex, Inset, Text, Heading } from "@radix-ui/themes";
import { PostMetadata } from "@/types/types";
import Pagination from "../Pagination/Pagination";
import Link from "next/link";

function PostList({
  posts,
  category,
}: {
  posts: {
    slug: string;
    metadata: any;
  }[];
  category?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const [limitPage, setLimitPage] = useState<number>(10);
  const filteredPost = posts.filter((_, idx) => {
    return (
      idx >= (pageParam - 1) * limitPage && idx < pageParam * limitPage
    );
  });
  const totalPages = Math.ceil(posts.length / limitPage);

  const goPage = (num: number) => {
    console.log('here')
    router.push(`/category/${encodeURIComponent(category ?? "")}?page=${num}`);
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
        currentPage={pageParam||1}
        totalPages={totalPages}
        goPage={goPage}
        limitPage={limitPage}
        setLimitPage={setLimitPage}
      />
    </div>
  );
}

function Post({ slug, metadata }: { slug: string; metadata: PostMetadata }) {
  const { close } = useAside();
  const filename = slug.replace(/\.md$/, "").split(/[\\/]/).pop();

  const createUrl = (path: string) => {
    const cleanPath = path.replace(/\.md$/, "");
    const pathParts = cleanPath.split(/[\\/]/);

    const encodedParts = pathParts.map((part: string) => {
      try {
        const decoded = decodeURIComponent(part);
        return part;
      } catch (e) {
        return encodeURIComponent(part);
      }
    });

    return "/" + encodedParts.join("/");
  };

  return (
    <Card className={styles.postItemContent}>
      <Link href={createUrl(slug)} onClick={close}>
        <Inset clip="padding-box" className={styles.cardInset}>
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${!!!metadata?.thumnail
                ? "image/no-image-found.png"
                : metadata.thumnail
              }`}
            alt="Bold typography"
            className={styles.insetImage}
          />
        </Inset>
      </Link>
      <Link href={createUrl(slug)} className={styles.flexDetailLink} onClick={close}>
        <Flex direction={"column"} className={styles.cardDescription}>
          <Heading as={"h3"} className={styles.title}>
            {decodeURIComponent(filename ?? metadata?.title ?? "제목없음")}
          </Heading>
          <Text>{metadata?.last_modified_at}</Text>
          <Text className={styles.body}>{metadata.excerpt}</Text>
        </Flex>
      </Link>
    </Card>
  );
}

export { PostList, Post };
