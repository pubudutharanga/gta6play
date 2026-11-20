// src/config/site.ts — Single source of truth for site-wide configuration.

/** Production origin, without a trailing slash. */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gta6play.vercel.app"
).replace(/\/+$/, "");

export const siteConfig = {
  name: "GTA VI",
  tagline: "Play in your browser",
  url: siteUrl,
  gameUrl: process.env.NEXT_PUBLIC_GAME_URL ?? "", // empty = placeholder adapter
  publisher: "Your Studio", // TODO(owner): replace with your studio name
  author: "Your Studio", // TODO(owner)
  contactEmail: "hello@example.com", // TODO(owner): replace with a real support address
  socialProfiles: [] as string[], // TODO(owner): add URLs if applicable
  language: "en" as const,
  lastUpdated: "2026-11-20", // bump when content actually changes
  price: "Free" as const,
  priceCurrency: "USD" as const,
  priceValue: "0" as const,
  players: "Single-player" as const,
  input: "Keyboard and mouse; gamepad optional" as const,
  browsers: "Current desktop Chrome, Edge, Firefox and Safari" as const,
  platform: "Web browser" as const,
  keywords: [
    "GTA 6",
    "GTA VI",
    "GTA 6 browser",
    "play GTA 6 online",
    "GTA 6 gameplay",
    "how to play GTA 6",
    "GTA 6 requirements",
  ] as const,
  genre: ["Action-adventure", "Open world"] as const, // TODO(owner)
  headerHeight: 64, // px, used for scroll-margin-top

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
    bing: process.env.BING_SITE_VERIFICATION ?? "",
  },

  allowAiTrainingBots: process.env.ALLOW_AI_TRAINING_BOTS !== "false",

  disclaimerNotice:
    'GTA VI in the browser is an independent project by {publisher}. It is not affiliated with, endorsed by or sponsored by Rockstar Games, Inc. or Take-Two Interactive Software, Inc. "Grand Theft Auto" and "GTA" are trademarks of Take-Two Interactive Software, Inc. All other trademarks belong to their respective owners.',

  privacyNotice:
    "This free demo is ad-supported. Third-party advertising partners may use cookies, local storage and similar technologies to deliver, measure and limit ads.",
} as const;

/** Resolve the disclaimer with the publisher name filled in. */
export function getDisclaimer(): string {
  return siteConfig.disclaimerNotice.replace("{publisher}", siteConfig.publisher);
}
