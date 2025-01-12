import { getAllPostsList } from "@/lib/posts";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_P_BASE_URL;

  const posts = getAllPostsList();

  const blogPages = posts.map((post) => {
    return {
      url: `${baseUrl}/${post.slug.replace(/\\/g, "/")}`,
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
