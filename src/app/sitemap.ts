import { getAllPostsList } from "@/lib/posts";
import dayjs from "dayjs";

export default async function sitemap() {
  const baseUrl = "https://rn0614.github.io";

  const posts = getAllPostsList();

  const blogPages = posts.map((post) => {
    return {
      url: `${baseUrl + "/" + post.slug}`,
      lastModified: dayjs(post.metadata?.last_modified_at,'YYYY/MM/DD HH:mm:ss'),
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
