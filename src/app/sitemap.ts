import { getAllPostsList } from "@/lib/posts";
import dayjs from "dayjs";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const posts = getAllPostsList();

  const blogPages = posts.map((post:any) => {
    return {
      url: encodeURI(`${baseUrl}/${post.slug.replace(/\\/g, "/").replace(/\.md$/, "")}`),
      lastModified: dayjs(
        post.metadata?.last_modified_at || "2025/01/01 00:00:00",
        "YYYY/MM/DD HH:mm:ss"
      ).toDate(),
      changeFrequency: "weekly" as "weekly",
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: dayjs().format("YYYY-MM-DD"),
      changeFrequency: "weekly",
      priority: 1
    },
    ...blogPages,
  ];
}
