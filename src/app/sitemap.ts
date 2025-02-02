import { getAllPostsList } from "@/lib/posts";

export default async function sitemap() {
  const baseUrl = "https://rn0614.github.io";

  const posts = getAllPostsList();

  const blogPages = posts.map((post) => {
    return {
      url: `${baseUrl + "/" + post.slug}`,
      lastModified: new Date(),
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
