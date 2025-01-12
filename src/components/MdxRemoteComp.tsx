"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

export default function MdxRenderer({ mdx }: { mdx: MDXRemoteSerializeResult }) {
  if(mdx===undefined) return <div>no</div>
  return <MDXRemote {...mdx} />;
}