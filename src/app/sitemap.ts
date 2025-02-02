import { getAllPostsList } from "@/lib/posts";
import dayjs from "dayjs";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const posts = getAllPostsList();

  const blogPages = posts.map((post) => {
    return {
      url: `${baseUrl + "/" + post.slug}`,
      lastModified: dayjs(post.metadata?.last_modified_at,'YYYY/MM/DD HH:mm:ss').format('YYYY-MM-DD'),
      changeFrequency: 'monthly',
      priority:0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...blogPages,
  ];
}
