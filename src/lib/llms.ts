// src/lib/llms.ts — Generate llms.txt content from content.ts and site.ts.

import { siteConfig } from "@/config/site";

export function buildLlmsTxt(): string {
  const url = siteConfig.url;

  return `# ${siteConfig.name} (browser edition)

> Play ${siteConfig.name} in a desktop web browser with no download or install. A single-player open-world action game by ${siteConfig.publisher}. Independent project, not affiliated with Rockstar Games or Take-Two Interactive.

## Key facts
- Browser edition: ${siteConfig.browsers}
- Price: ${siteConfig.price.toLowerCase()}
- Players: ${siteConfig.players.toLowerCase()}
- Controls: ${siteConfig.input.toLowerCase()}
- Official GTA VI: launched November 19, 2026 on PlayStation 5 and Xbox Series X|S. It is a separate Rockstar Games release, not this browser edition.
- Last updated: ${siteConfig.lastUpdated}

## Sections
- [Play now](${url}/#play): start the game in your browser
- [Screenshots](${url}/#scenes): in-game images with descriptions
- [How to play GTA 6](${url}/#how-to-play): three steps
- [Controls](${url}/#controls): keyboard, mouse and gamepad bindings
- [System requirements](${url}/#requirements): browser and hardware needs
- [FAQ](${url}/#faq): price, supported devices, PS4 and Xbox availability, the official release, Lucia's actor and support
`;
}
