import React from "react";
import { getAllPostsList } from "../../lib/posts";
import Heading from "@/components/Heading/Heading";
import { PostList } from "@/components/Posts/Post";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./page.module.scss";

export default function Home() {
  const posts = getAllPostsList();
  return (
    <main>
      <Heading level={1}>글 목록 리스트\</Heading>
      <PostList posts={posts} />
      <div className={styles.paginationWrapper}>
        <Pagination currentPage={1} totalPages={2} />
      </div>
    </main>
  );
}
