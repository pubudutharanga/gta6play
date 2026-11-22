import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Search and user-initiated fetchers are always allowed.
 * Training bots are allowed unless ALLOW_AI_TRAINING_BOTS=false.
 *
 * Blocking a training bot does not remove the site from AI search results,
 * and some user-initiated fetchers may ignore robots.txt anyway. A bot with
 * no matching rule is allowed by default; these explicit rules document intent.
 */
const SEARCH_AND_USER_BOTS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckAssistBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "meta-webindexer",
  "meta-externalfetcher",
];

const TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: SEARCH_AND_USER_BOTS,
        allow: "/",
      },
      {
        userAgent: TRAINING_BOTS,
        ...(siteConfig.allowAiTrainingBots
          ? { allow: "/" }
          : { disallow: "/" }),
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: new URL(siteConfig.url).host,
  };
}
