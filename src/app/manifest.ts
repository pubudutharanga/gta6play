import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { seoDescription } from "@/content/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — browser edition`,
    short_name: siteConfig.name,
    description: seoDescription,
    start_url: "/",
    display: "standalone",
    orientation: "landscape",
    background_color: "#120A2B",
    theme_color: "#1A0F3D",
    lang: siteConfig.language,
    categories: ["games", "entertainment"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
