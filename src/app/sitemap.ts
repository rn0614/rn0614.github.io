import { getAllPostsList } from "@/lib/posts";
import dayjs from "dayjs";
import { MetadataRoute } from "next";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rn0614.github.io';

  const posts = getAllPostsList();

  const createUrl = (slug: string) => {
    // 경로에서 .md 확장자 제거
    const cleanSlug = slug.replace(/\.md$/, '');
    
    // POST_BASE_PATH 이후의 경로만 추출
    const relativePath = cleanSlug.slice("posts".length + 1);
    
    // 경로를 슬래시로 분리
    const pathParts = relativePath.split(path.sep);
    
    // 인코딩된 부분들을 슬래시로 연결
    return pathParts.join("/");
  };

  const blogPages = posts.map((post:any) => {
    return {
      url: `${baseUrl}/${createUrl(post.slug)}`,
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
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    ...blogPages,
  ];
}
