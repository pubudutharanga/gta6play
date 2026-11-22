import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { seoDescription } from "@/content/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${siteConfig.name} — browser edition`,
    short_name: siteConfig.name,
    description: seoDescription,
    start_url: "/",
    scope: "/",
    dir: "ltr",
    display: "standalone",
    display_override: ["standalone", "minimal-ui", "browser"],
    launch_handler: { client_mode: "navigate-existing" },
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
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Play now",
        short_name: "Play",
        description: "Start playing GTA 6 in your browser",
        url: "/#play",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    ],
    screenshots: [
      {
        src: "/screenshots/vice-city-golden-hour.webp",
        sizes: "2560x1440",
        type: "image/webp",
        form_factor: "wide",
        platform: "windows",
        label: "Vice City skyline at golden hour",
      },
    ],
  };
}
