import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots{
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/post"],
      disallow:[]
    },
    sitemap:`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap`
  }
}