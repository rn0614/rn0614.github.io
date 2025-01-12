import { getAllPostsList } from "@/lib/posts";
import path from "path";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const posts = getAllPostsList();

  const blogPages = posts.map((post) => {
    return {
      url: `${baseUrl + "/" + post.slug}`,
      latestModified: new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...blogPages,
  ];
}
