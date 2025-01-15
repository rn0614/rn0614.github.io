"use client";
import styles from './style.module.scss'
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function MdxRenderer({
  mdx,
}: {
  mdx: MDXRemoteSerializeResult;
}) {
  if (mdx === undefined) return <div>no</div>;
  return (
    <div className={styles.mdxWrapper}>
      <MDXRemote {...mdx} />
    </div>
  );
}
