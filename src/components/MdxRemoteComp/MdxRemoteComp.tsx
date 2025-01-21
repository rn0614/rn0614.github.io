"use client";
import styles from "./style.module.scss";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

const components = {
  img: (props: any) => <img {...props} src={props.src.replace("public", "")} />, //public 주소만 제외
};

export default function MdxRenderer({
  mdx,
}: {
  mdx: MDXRemoteSerializeResult;
}) {
  if (mdx === undefined) return <div>no</div>;
  return (
    <div className={styles.mdxWrapper}>
      <MDXRemote {...mdx} components={components} />
    </div>
  );
}
