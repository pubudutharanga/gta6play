import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { screenshots } from "@/content/screenshots";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: siteConfig.lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
      images: screenshots.map((shot) => `${siteConfig.url}${shot.src}`),
    },
  ];
}
