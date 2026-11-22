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
- [What is GTA 6 in the browser?](${url}/#about): quick answer and key facts
- [GTA 6 gameplay](${url}/#features): what you can do in the game
- [World and locations](${url}/#locations): Vice City, the Leonida Keys, Grassrivers, Mount Kalaga, Port Gellhorn and Ambrosia
- [GTA 6 screenshots](${url}/#scenes): in-game images with descriptions
- [How to play GTA 6](${url}/#how-to-play): three steps
- [Controls](${url}/#controls): keyboard, mouse and gamepad bindings
- [System requirements](${url}/#requirements): browser and hardware needs
- [FAQ](${url}/#faq): price, supported devices, PC and Mac, PS4 and Xbox, the official release, Jason and Lucia, Leonida, Steam, single-player, accounts and support

## Optional
- [Full page text](${url}/llms-full.txt): every section, control, requirement and FAQ answer in one file
`;
}
