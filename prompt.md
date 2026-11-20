# GTA VI in the Browser: Landing Page Build Prompt

Next.js 16, App Router, one page. Built for classic SEO, Google's AI features, AI assistants and browsing agents.

> **Owner quick start**
> 1. Open an empty folder in your AI coding agent (Claude Code, Cursor, Windsurf or similar).
> 2. Copy your screenshots into `public/screenshots/` first. Any file names; JPG, PNG or WebP.
> 3. Paste everything below the divider. The agent should not stop to ask questions; it records its assumptions and lists them at the end.
> 4. Connect the game later by following the `INTEGRATION.md` the agent generates.

---

## 1. Mission

You are one person with three jobs: senior Next.js engineer, art director and technical SEO specialist. Build a complete, production-ready, **single-page** website for a browser game called **GTA VI** that I built.

The page must:

1. Look cinematic and specific to this game. My screenshots are the visual foundation. No stock art, no generic game-landing template.
2. Have one dominant job: get visitors to press **Play now**. That button starts the game's loading flow. I will integrate the game myself, so build the button, the launch flow and a clean seam where the game plugs in. Nothing beyond that.
3. Rank in classic search, be eligible for Google's AI Overviews and AI Mode, and be easy for AI assistants and browsing agents to crawl, read, cite and operate.
4. Be fast, accessible and secure.

Do not ask me questions unless you are truly blocked. Make sensible assumptions, label every fact you had to invent `TODO(owner)` in the code, and list them all in your final report.

When rules in this file conflict, the priority is: a working Play now button, accessibility, performance, SEO, then visual flourish.

## 2. Inputs and defaults

Keep every value below in `src/config/site.ts` so I can change it in one place.

| Item | Default |
|---|---|
| Game and site name | GTA VI |
| Production URL | `https://example.com`, read from `NEXT_PUBLIC_SITE_URL` |
| Publisher and author | "Your Studio" (`TODO(owner)`). Never Rockstar Games or Take-Two |
| Price | Free |
| Players | Single-player |
| Input | Keyboard and mouse; gamepad optional |
| Browsers | Current desktop Chrome, Edge, Firefox and Safari |
| Language | English (`en`) |
| Contact email | `hello@example.com` (`TODO(owner)`) |
| Social profiles | None. Omit `sameAs` when empty |
| Last updated | A hardcoded ISO date constant that I bump when content really changes |
| Screenshots | Everything in `public/screenshots/` |

## 3. Ground rules

1. **Server-rendered and static.** Every heading, paragraph, link and image must be present in the initial HTML. Many AI crawlers fetch raw HTML and never run JavaScript. Use client components only for interaction: the launcher, the hero scene switcher, the lightbox and the mobile menu.
2. **The game never loads early.** No game code, assets or iframes until the visitor activates Play now. You may warm caches on hover, focus or touchstart of the button, nothing earlier.
3. **No invented proof.** No fake ratings, reviews, player counts, awards, press quotes or "as seen on" logos, in the UI or in structured data. Facts I haven't supplied are placeholders marked `TODO(owner)`.
4. **No Rockstar or Take-Two assets.** No official logos, wordmarks or key art. Build a text-and-CSS wordmark. Metadata and structured data name me as publisher. Include the non-affiliation notice from section 12.
5. **Budgets.** Lighthouse mobile: Performance 95 or more, Accessibility 100, Best Practices 95 or more, SEO 100. LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less (aim for 0). First-load JavaScript 150 kB gzipped or less.
6. **Zero axe violations.** Lighthouse's Agentic Browsing accessibility-tree audit scores 0 on a single violation. Target WCAG 2.2 AA.
7. **No time or randomness while server-rendering.** Don't call `new Date()`, `Date.now()` or `Math.random()` in server code. Use constants. It breaks prerendering under Cache Components, and "fresh" dates that change on every build are a trust problem.
8. **Stay light.** No UI kit, no carousel library, no icon pack beyond a handful of inline SVGs. Compress oversized screenshots (section 7).
9. **Docs over memory.** Next.js changed quickly through 16.x. When unsure about an API, read the docs for the installed version at nextjs.org/docs.

## 4. Stack and setup

- **Next.js:** latest stable 16.x (16.4 as of October 2026; confirm with `npm view next version`). If a stable 17 is listed on nextjs.org when you run this, follow its upgrade guide. Ignore third-party articles that announce a release nextjs.org doesn't list.
- **Scaffold:** `npx create-next-app@latest` with TypeScript, App Router, `src/` directory, Tailwind CSS, ESLint, Turbopack and the `@/*` alias. Node 20.9 or newer.
- **Language and lint:** TypeScript `strict`, ESLint and Prettier. npm scripts: `dev`, `build`, `start`, `lint`, `typecheck`.
- **Styling:** Tailwind with design tokens declared in CSS (`@theme`). No component library.
- **Fonts:** `next/font/google`, self-hosted, `display: "swap"`, Latin subset.
- **Images:** `next/image` only. On Next 16 use `preload` (not the deprecated `priority`) on the single LCP image, render that image from a Server Component, and list any custom `quality` values in `images.qualities`. Serve AVIF and WebP.
- **Motion:** CSS first. If a library is truly needed, use Motion (`motion/react`), imported only in the client components that use it.
- **Static guarantee:** `/`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and `llms.txt` must all be prerendered at build time. When Cache Components is enabled (the default for new apps from 16.4), add `export const ensureStatic = "navigation"` to the root layout so the build fails if anything dynamic sneaks in. Otherwise confirm the static marker for `/` in the build output.
- **Hosting:** Vercel-ready, with nothing that only works on Vercel.

## 5. Project structure

```
public/
  screenshots/              my screenshots; source of truth for every image on the page
  icons/                    favicon.ico, apple-icon.png, icon-192.png, icon-512.png
src/
  app/
    layout.tsx              fonts, tokens, metadata, JSON-LD, launcher provider
    page.tsx                composes the sections (server component)
    globals.css             Tailwind, @theme tokens, keyframes, reduced-motion rules
    not-found.tsx
    icon.svg
    opengraph-image.*       or a static 1200x630 file, plus the Twitter equivalent
    manifest.ts
    robots.ts
    sitemap.ts
    llms.txt/route.ts
  components/
    sections/               Header, Hero, QuickAnswer, Features, Screenshots, HowToPlay,
                            Controls, Requirements, Faq, FinalCta, Footer
    play/                   PlayButton, GameLauncherProvider, useGameLauncher, GameStage, types.ts
      adapters/             placeholderAdapter.ts, iframeAdapter.ts
    ui/                     SceneSwitcher, Lightbox, Container, SkipLink, VisuallyHidden
    seo/JsonLd.tsx
  config/site.ts            name, url, publisher, contact, lastUpdated, flags
  content/
    content.ts              ALL copy; single source of truth
    screenshots.ts          typed screenshot metadata
  lib/                      seo.ts (buildJsonLd), llms.ts (buildLlmsTxt), webgl.ts, analytics.ts
docs/design-plan.md
next.config.ts
.env.example
README.md
INTEGRATION.md
```

The visible FAQ, the quick facts, the metadata, the JSON-LD and `llms.txt` are all generated from `content.ts` and `site.ts`, so they can never disagree with each other.

## 6. Design brief

### 6.1 Subject, audience and job

- **Subject:** an open-world crime-action game set in a sun-bleached, neon-lit tropical city, playable in a desktop browser.
- **Audience:** gamers arriving from search and social, many of them on phones, most about to play on a desktop.
- **Job of the page:** get a first-time visitor to press Play now within seconds, and give search engines and AI systems the facts to describe the game correctly.

### 6.2 Study first, then write a design plan

Before writing any code:

1. Open every screenshot. Note dominant colors, time of day, recurring objects (vehicles, signage, skyline, water) and which frames have a clear focal subject. If you can't view images, work from file names and dimensions, use `sharp` to extract dominant colors, write neutral alt text and mark each one `TODO(owner)`.
2. Write a short design plan and save it as `docs/design-plan.md`: a palette of 4 to 6 named hex values sampled from the screenshots, type roles, a layout concept with an ASCII wireframe, and three guiding principles.
3. Review the plan against 6.5. If any part looks like what you would produce for any game page, change it, and note what you changed and why.

### 6.3 Starting tokens

Use these unless the screenshots argue otherwise (for example, a daylight-blue set). Keep the token names.

| Token | Hex | Use |
|---|---|---|
| `dusk` | `#1A0F3D` | Page background (deep violet, not neutral black). `dusk-deep` `#120A2B` for the footer and overlays |
| `flamingo` | `#FF4F9A` | Primary accent; start of the Play now gradient |
| `tangerine` | `#FF8F3F` | End of the Play now gradient; sunset highlights |
| `lagoon` | `#2DD4C0` | Focus rings, links, success states. Never decorative |
| `sand` | `#FFEBCB` | Headings and body text on dark |
| `haze` | `#B9A7E8` | Secondary text |

Check contrast: body text 4.5:1 or more, large text and UI 3:1 or more. The Play now label is `dusk` on the flamingo-to-tangerine gradient.

**Type** (two families, clearly different from each other):

- **Display:** Big Shoulders Display, weight 800 to 900, set tall and tight for the hero and section titles (billboard feel). Uppercase only for the giant hero title and the Play now label.
- **Body and UI:** Instrument Sans, 400 to 600, line length under 70 characters, sentence case.
- Do not use Inter, Roboto, Arial, Poppins, Space Grotesk or system defaults. If either font is unavailable, choose a comparable pair deliberately and say why in the design plan.
- Fluid scale with `clamp()`. Hero title around `clamp(5rem, 19vw, 17rem)` at line-height 0.85.

**Shape and surface**

- Screenshots are sharp-edged, full-bleed or near full-bleed, like film frames (0 to 2 px radius).
- Controls use a 6 px radius; the Play now button is a skewed slab (section 8). Don't give everything the same radius or the same shadow.
- Decorative layers (film grain at about 4% opacity, a vignette) are `aria-hidden` and `pointer-events: none`, so they never block a click or confuse an agent.

### 6.4 Layout concept

Edge-to-edge screenshots, type that behaves like a billboard, and copy in narrow, left-aligned columns on a 12-column grid (max width 1280 px). Left alignment throughout; center only the final call to action.

Hero, desktop:

```
+----------------------------------------------------------------+
| GTA VI                       Scenes  How to play  Controls  FAQ |   header: transparent, then solid
+----------------------------------------------------------------+
|                                                                |
|   full-bleed screenshot, sunset-graded                         |
|                                                     +--------+ |
|                                                     | thumb  | |   scene switcher
|                                                     +--------+ |
|   GTA VI                                            | thumb  | |
|   Play in your browser                              +--------+ |
|   One-sentence definition of the game.              | thumb  | |
|   [ PLAY NOW ]   Free. No download.                 +--------+ |
+----------------------------------------------------------------+
```

Page rhythm: hero (dark, loud), quick answer (quiet, text), features (image-led rows), screenshots (wide), how to play, controls and requirements (compact reference), FAQ, final call to action (sunset band), footer. Alternate loud and quiet. Spend the boldness in the hero and the launch sequence; keep everything else disciplined.

### 6.5 Anti-template rules

These are the tells of a generated page. Avoid them:

- Identical rounded cards in a grid, all with the same soft grey shadow.
- Gradient washes as decoration. The sunset gradient is allowed only in the hero grade, the Play now button and the final call-to-action band.
- A tracked-out uppercase eyebrow label above every heading.
- Numbered markers (01, 02, 03) on anything that isn't a true sequence. Only "How to start playing" gets numbers.
- One word of a headline in a different color or in italic.
- Middle-dot meta strings ("A · B · C"), arrows appended to button text, "WORD, fragment" labels, monospace small-caps data labels.
- A fade-and-slide-up entrance on every section, or a hover lift on every card.
- Near-black plus a single acid accent color.
- Filler copy ("Experience the ultimate...", "Unleash..."). Write plainly and specifically.

### 6.6 Motion

Motion that nobody triggered is rare; motion that answers a person's action is welcome. Only these:

1. **One page-load sequence in the hero**, under 1.2 s: the sunset grade rises from the bottom, the title slides up with a short stagger, and the Play now button gives a single glow pulse. Nothing else on the page animates on load or on scroll, and nothing loops.
2. **Scene switcher crossfade** (user-triggered), 400 to 500 ms.
3. **Launch transition** when Play now is activated (section 8).
4. **Lightbox open and close**, button press feedback, and a single light sweep across the Play now button on hover or focus.

Animate `transform` and `opacity` only. Under `prefers-reduced-motion: reduce`, show final states instantly: no pulse, no sweep, no slide.

## 7. Sections (top to bottom)

Write all copy in plain, specific, sentence-case language. Keep it all in `src/content/content.ts` and mark unverified claims `TODO(owner)`. Anchor targets get `scroll-margin-top` equal to the header height.

**Screenshot handling.** For every file in `public/screenshots/`: view it; record its pixel size; write specific alt text that says what is visible (place, time of day, vehicle, action), never "screenshot 1"; write a one-sentence caption; pick a focal point; sample a vivid accent color. Store the result in `src/content/screenshots.ts`:

```ts
export type Screenshot = {
  src: string;        // "/screenshots/example.jpg"
  width: number;
  height: number;
  alt: string;
  caption: string;
  focal: string;      // CSS object-position, e.g. "62% 40%"
  accent: string;     // sampled hex; drives --scene-accent
  hero?: boolean;     // exactly one; this is the LCP image
  scene?: number;     // order in the hero scene switcher, 5 at most
};
```

If a source file is over 1 MB, write a 2560 px wide WebP or AVIF master (quality about 80) into `public/screenshots/` and keep the original out of the repo. If there are no screenshots yet, render dark gradient placeholders with the same dimensions so the build never breaks, and tell me where to drop the files. Every screenshot appears at least once. Never crop out the focal subject.

1. **Header** (`<header>`, sticky). Skip link first in the DOM. Text wordmark at left; anchor links (Scenes, How to play, Controls, FAQ) in sentence case. A compact Play now button joins the header only after the hero's button leaves the viewport (IntersectionObserver; toggle `visibility` and `inert`, never `display`, so nothing shifts). The header turns solid via an observed sentinel, not a scroll listener. Mobile: wordmark, compact Play now and a menu disclosure with `aria-expanded`.

2. **Hero** (`<section id="play">`). Wireframe in 6.4. One `<h1>`: "GTA VI" in huge display type plus a smaller second line, "Play in your browser", inside the same `<h1>` (add a visually hidden colon so it reads "GTA VI: Play in your browser"). Below it, a one-sentence plain definition, then the Play now button, then one line of microcopy such as "Free. No download. Works in current desktop browsers." The backdrop is the `hero` screenshot as the LCP image: server-rendered, `fill`, `sizes="100vw"`, `preload`, `fetchPriority="high"`, `object-position` from `focal`. Grade it with a bottom-up `dusk` gradient, a faint flamingo-to-tangerine tint (`mix-blend-mode: soft-light`) and a light vignette.
   **Scene switcher:** up to five thumbnails (about 96 px wide), real `<button>`s in a labeled group with `aria-pressed`. Selecting one crossfades the backdrop and updates `--scene-accent`, which tints the Play now glow and the grade. Mount the non-hero backdrops only after the first pointer or focus interaction with the switcher, or after the page has been idle for 2 s, so they never compete with the LCP image. On mobile the switcher is a horizontal strip under the button, built as a labeled, keyboard-focusable scroll region.

3. **Quick answer** (`<h2>` "What is GTA VI in the browser?"). Two or three sentences stating what it is, how you play it, what it costs and what you need. Under that, a `<dl>` with hairline separators: Platform, Price, Install, Players, Controls, Last updated. This is the passage people and AI systems will quote, so keep it exact and consistent with the FAQ and the structured data.

4. **What you can do** (`<h2>`). Four or five alternating rows, each with an `<h3>`, two plain sentences and one screenshot (a different crop per row). No cards. Ground every feature in what the screenshots show or what I confirm; mark the rest `TODO(owner)`.

5. **Screenshots** (`<h2>`). A wide, asymmetric grid (mixed spans, original aspect ratios) of every screenshot as `<figure>` with `<figcaption>`. Click or Enter opens an accessible lightbox: native `<dialog>`, arrow keys, Escape, swipe, focus returns to the trigger, loaded by dynamic import on first open. Below-the-fold images are lazy with explicit dimensions.

6. **How to start playing** (`<h2>`, `<ol>`). Three real steps, numbered: press Play now; wait for the first load (set the expectation with a `TODO(owner)` size and time); play with keyboard and mouse or a gamepad.

7. **Controls** (`<h2>`). A real `<table>` with a `<caption>` and the columns Action, Keyboard and mouse, Gamepad. Placeholder bindings marked `TODO(owner)`.

8. **System requirements** (`<h2>`). Minimum and recommended as two `<dl>`s: browser, graphics API (WebGL 2 or WebGPU), memory, connection speed, screen. Placeholders marked `TODO(owner)`.

9. **FAQ** (`<h2>`). Eight to ten native `<details>`/`<summary>` items, so the answers are in the HTML without JavaScript. Cover: is it free; do I need to download anything; which browsers and devices work; does it work on phones; is progress saved; why is the first load slow; which controllers work; is this an official Rockstar Games release (answer: no, it is an independent project, see the notice); how do I report a bug. Answers are two or three plain sentences and must match the FAQ structured data word for word.

10. **Final call to action** (`<h2>` "Play GTA VI now"). A sunset-gradient band, centered, one sentence and the same Play now button.

11. **Footer** (`<footer>`). Text wordmark, anchor links, contact email, social links if any, the non-affiliation notice (section 12), "Last updated" from config, and a copyright line.

12. **404** (`not-found.tsx`). A short message, a link home, the same visual language.

## 8. Play now: the button and the launch flow

This is the core feature. All of it must work without the game.

**Component:** `PlayButton` (client) with the variants `hero`, `header` and `cta`. Every variant calls the same launcher through `GameLauncherProvider` and `useGameLauncher()`.

- A real `<button type="button">` whose visible text is "Play now". Never an icon alone. `data-testid="play-now"`. It is server-rendered, so it exists in the HTML before hydration.
- **Look:** a skewed slab (`transform: skewX(-10deg)` with the label counter-skewed so the text stays upright), flamingo-to-tangerine gradient, `dusk` label in the display font, a small play glyph, at least 56 px tall (72 px for the hero variant) with generous touch padding. A soft glow uses `--scene-accent`. Press feedback: scale 0.97 for 80 ms. Use `outline`, never `clip-path`, so the focus ring (lagoon, 3 px, 3 px offset) is never clipped.
- **States:** idle ("Play now"), loading ("Loading the game", spinner, `aria-busy="true"`) and error ("Try again"). The button never changes width between states (reserve the widest label), so nothing shifts.
- **Intent preload:** on the first `pointerenter`, `focus` or `touchstart`, call `adapter.preload?.()` once.
- **No heavy work in the click handler.** Open the overlay on the next frame, then start loading, to keep INP low.
- **Deep link:** `/#play` scrolls to the hero and focuses the button. It does not auto-launch.
- **No JavaScript:** a `<noscript>` line, "Turn on JavaScript to play GTA VI in your browser."
- **Analytics hook:** `track("play_now_click", { location })` from `lib/analytics.ts`, a no-op unless Plausible, GA or Vercel Analytics is already present. Add no third-party script.

**Launcher states:** `idle`, `loading`, `running`, `error`, held in a small reducer inside `useGameLauncher`.

**Overlay** (`GameStage`, loaded with `next/dynamic` and `ssr: false` from inside a client component, and only after the first activation). Prefer a native `<dialog>` opened with `showModal()` (top layer, focus trap, inert background) with `aria-labelledby`. Lock body scroll while it is open and restore it on close.

1. **Launch transition (about 600 ms):** the hero backdrop dims and scales to 1.04, two sunset panels close from left and right, and the loading screen appears.
2. **Loading screen:** the current scene's screenshot, darkened, full-bleed. A large progress number in the display font at bottom left, a thin gradient progress bar along the bottom edge, rotating tips at bottom right (every 4 s, copy in `content.ts`), and a Cancel button at top right. Use `role="progressbar"` with `aria-valuenow`, and announce only 25, 50, 75 and 100% in a polite live region.
3. **Running:** the loading screen fades out over 300 ms and reveals the game container. Chrome stays minimal: a small Exit button and a Fullscreen toggle in a corner that doesn't overlap the game by default.
4. **Keyboard:** while loading, Escape cancels. While running, never hijack Escape or game keys (browsers use Escape to release pointer lock); exit only through the Exit button, with a confirm step.
5. **Errors:** say what happened and what to do, with no apology. Unsupported browser: "This browser can't run the game. Update Chrome, Edge, Firefox or Safari, or open the page on a desktop computer." Load failure: "The game didn't load. Check your connection and try again." Buttons: Try again, Exit.
6. **Capability check before loading** (`lib/webgl.ts`): WebGL 2 or WebGPU available, viewport not tiny. On phones, show a non-blocking note that the game plays best with keyboard and mouse.

**The seam** (`components/play/types.ts`):

```ts
export type LaunchStatus = "idle" | "loading" | "running" | "error";

export interface GameAdapter {
  /** Optional. Warm caches on user intent. Must be idempotent. */
  preload?: () => void;

  /** Load and start the game inside `container`. Resolve when it is playable. */
  mount(args: {
    container: HTMLElement;
    onProgress: (percent: number) => void; // 0 to 100
    signal: AbortSignal;                    // aborted on Cancel or Exit
  }): Promise<void>;

  /** Release everything: audio, pointer lock, listeners, workers, object URLs. */
  unmount(): void | Promise<void>;
}
```

Ship two adapters in `components/play/adapters/`:

- `placeholderAdapter` (the default): simulates progress for about 3 s with easing, then shows inside the container: "The game build isn't connected yet. See INTEGRATION.md."
- `iframeAdapter(url)`: used automatically when `NEXT_PUBLIC_GAME_URL` is set. Creates an iframe with `allow="fullscreen; gamepad; autoplay"` and `allowfullscreen`, reports indeterminate progress until `load`, and removes the iframe on `unmount`.

Everything else about the game (engine, assets, saves, networking) is my job. Don't build it.

## 9. Classic SEO

Google's May 2026 guidance on generative AI features says they rely on the same indexing and ranking systems as Search, and the only technical requirement it names is that the page is indexed and eligible to show a snippet. So get the fundamentals exactly right.

- **Metadata** (Next.js Metadata API in `layout.tsx` and `page.tsx`):
  - `metadataBase`; title of 60 characters or fewer, for example "GTA VI: Play in Your Browser, No Download"; description of 140 to 155 characters that states what it is, how you play and what it costs.
  - `alternates.canonical: "/"`.
  - Open Graph (`website`, site name, locale, a 1200x630 image with alt text) and Twitter `summary_large_image`.
  - `robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }`.
  - `viewport` with `themeColor` and `colorScheme: "dark"`.
  - Verification tags from env (`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`). Skip the meta keywords tag.
- **Never** use `nosnippet`, `max-snippet: 0` or `data-nosnippet` on content that matters. Snippet eligibility is what lets Google use a page in its AI features.
- **Share image:** 1200x630 with the wordmark and the best screenshot, as a static file or `opengraph-image.tsx`, with alt text. Same for Twitter.
- **Icons and manifest:** `app/icon.svg`, `apple-icon.png` (180 px), a favicon, and `manifest.ts` (name, short name, theme and background color, 192 px and 512 px icons).
- **`sitemap.ts`:** one URL with `lastModified` from config (never `new Date()`) and an `images` array listing every screenshot as an absolute URL, so image search can find them.
- **`robots.ts`:** crawler policy in section 10.
- **Semantic HTML:** one `<h1>`; ordered `<h2>` and `<h3>`; `<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`; `<figure>` and `<figcaption>`; `<ol>` for steps; `<table>` for controls; `lang="en"`.
- **Images:** descriptive alt text, explicit dimensions, correct `sizes`, no text baked into images, file names that describe the content.
- **Structured data (JSON-LD):** one `<script type="application/ld+json">` holding an `@graph`, generated from `content.ts` and `site.ts` so it cannot drift from the visible page. Serialize with `JSON.stringify(data).replace(/</g, "\\u003c")`. Include `Organization` (publisher is me; `logo`; `sameAs` only if I supplied profiles), `WebSite`, `WebPage` (with `dateModified` from config), `VideoGame` (shape below) and `FAQPage` identical to the visible FAQ. Google shows FAQ rich results only for a few site types, so its value here is mostly machine readability. Never add `aggregateRating`, `review` or `offers` that aren't real. Validate with the Schema Markup Validator and the Rich Results Test.

Shape of the `VideoGame` node (illustrative, not final code):

```ts
{
  "@type": "VideoGame",
  "@id": `${url}/#game`,
  name, description, url,
  image: [absoluteHeroImage],
  screenshot: screenshots.map((s) => ({
    "@type": "ImageObject",
    contentUrl: abs(s.src),
    caption: s.caption,
  })),
  genre: ["Action-adventure", "Open world"],          // TODO(owner)
  gamePlatform: "Web browser",
  operatingSystem: "Any",
  applicationCategory: "GameApplication",
  playMode: "https://schema.org/SinglePlayer",        // TODO(owner)
  inLanguage: "en",
  author: { "@id": `${url}/#org` },
  publisher: { "@id": `${url}/#org` },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },  // TODO(owner): only if truly free
  potentialAction: {
    "@type": "PlayGameAction",
    target: { "@type": "EntryPoint", urlTemplate: `${url}/#play` },
  },
}
```

## 10. AI search and agent readiness

What actually matters, in order:

1. Unique, specific, useful content written for people. No artificial chunking, no "write for AI" voice, no keyword stuffing; Google's guidance says none of that is needed.
2. Crawlable, indexable, snippet-eligible HTML (sections 3 and 9).
3. Letting AI search and answer crawlers in (below).
4. Structured data and the same facts everywhere: name, description, price, platform, date.
5. A page an agent can read and operate: labeled controls and a stable layout.

**Crawler policy (`app/robots.ts`).** Allow everything by default. Search and user-fetch bots are always allowed. Training bots are allowed unless `ALLOW_AI_TRAINING_BOTS=false`. A bot with no rule is allowed anyway, but explicit rules document intent. Verify these tokens against each vendor's current docs before shipping (accurate as of November 2026):

```ts
const SEARCH_AND_USER_BOTS = [
  "Googlebot", "Bingbot", "Applebot", "DuckAssistBot",
  "OAI-SearchBot", "ChatGPT-User",
  "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "meta-webindexer", "meta-externalfetcher",
];

const TRAINING_BOTS = [
  "GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended",
  "meta-externalagent", "CCBot", "Bytespider",
];
```

Blocking a training bot does not remove a site from AI search results, and some user-initiated fetchers may ignore robots.txt anyway. Add a comment in `robots.ts` saying so.

**`/llms.txt`** (route handler, prerendered, `text/plain; charset=utf-8`), generated from `content.ts`. Be honest about its value: Google says Search and its AI features don't use it, and studies show AI search crawlers rarely request it. It costs almost nothing, and Lighthouse's Agentic Browsing audit checks its format, so ship it correctly or not at all. It needs a Markdown H1, at least one `[text](url)` link and more than 50 characters; a malformed file scores worse than no file. Skip `llms-full.txt`.

```md
# GTA VI (browser edition)

> Play GTA VI in a desktop web browser with no download or install. A single-player open-world action game by {publisher}. Independent project, not affiliated with Rockstar Games or Take-Two Interactive.

## Key facts
- Platform: current desktop Chrome, Edge, Firefox and Safari
- Price: free
- Players: single-player
- Controls: keyboard and mouse; gamepad supported
- Last updated: {YYYY-MM-DD}

## Sections
- [Play now]({url}/#play): start the game in your browser
- [Screenshots]({url}/#scenes): in-game images with descriptions
- [How to start playing]({url}/#how-to-play): three steps
- [Controls]({url}/#controls): keyboard, mouse and gamepad bindings
- [System requirements]({url}/#requirements): browser and hardware needs
- [FAQ]({url}/#faq): price, browsers, saving and support
```

**Agent readiness.** Lighthouse 13.3 and newer (Chrome 150 and newer) has an experimental Agentic Browsing category. It reports a pass ratio, not a score, but everything it checks is worth fixing anyway:

- **Accessibility tree:** every control is a native element with an accessible name; no clickable `<div>`; no icon-only button without `aria-label`; no `aria-hidden` on a focusable element; no positive `tabindex`; every horizontally scrolling region is keyboard-focusable and labeled.
- **Stability:** CLS near 0. Reserve dimensions for every image and for the header, and inject nothing late above existing content.
- **No transparent overlay** may sit on top of a control.
- **Play now** has a visible text label, appears early in the DOM and is the page's only primary action.
- **`llms.txt`** passes the format check above.
- Don't add WebMCP. It was an experimental origin trial and may change. Mention it in the README as a later option.

**Entity clarity.** One name, one description and one set of facts across the title, H1, JSON-LD, FAQ and `llms.txt`. State plainly in the footer who made the game (a real name or studio) and give a contact address.

**Optional:** IndexNow (a key file in `public/` and a small `scripts/indexnow.ts` that pings Bing and partner engines after each deploy).

**After launch (put this checklist in the README):** verify the domain in Google Search Console and Bing Webmaster Tools; submit the sitemap; watch the Generative AI performance report in Search Console; check server logs for the crawlers above; a few weeks after indexing, ask ChatGPT, Gemini, Claude and Perplexity about the site and see what they say.

## 11. Performance, accessibility, security

**Performance**

- The LCP image is the first scene: server-rendered, `preload`, correct `sizes`, quality 75 (or a value listed in `images.qualities`). Everything below the fold is lazy.
- Reserve space for everything (explicit dimensions or `aspect-ratio`) so CLS stays near 0. Use `next/font` fallbacks so font swaps don't move the layout.
- Load only the font weights you use, in two families at most.
- Ship very little client JavaScript: the launcher, the switcher, the lightbox, the menu. Dynamic-import the lightbox and the stage. Use CSS for anything CSS can do.
- Film grain as a tiny inline SVG or a CSS gradient, never a large PNG overlay. Use `backdrop-filter` sparingly (header only).
- No third-party scripts, tag managers or chat widgets.

**Accessibility**

- Every interaction works with a keyboard. Visible focus everywhere (the lagoon ring), a logical order, a skip link, and no keyboard traps except the modal stage, which traps focus correctly.
- Landmarks, labeled sections, meaningful alt text; `aria-live` only for loading milestones and errors.
- Respect `prefers-reduced-motion`. The site is dark by design, so set `color-scheme: dark`.
- Touch targets of 44 px or more. Text zooms to 200% without loss.
- Run axe (CLI or Lighthouse) and fix everything it reports.

**Security headers** (`next.config.ts`, `headers()`): `X-Content-Type-Options: nosniff`; `Referrer-Policy: strict-origin-when-cross-origin`; `Permissions-Policy` (disable camera, microphone and geolocation; keep `fullscreen` and `gamepad` for self); `X-Frame-Options: DENY` or `frame-ancestors 'none'`; HSTS in production. Add a Content-Security-Policy in Report-Only mode, with a comment on how to tighten it. Don't use a nonce-based CSP if it forces dynamic rendering; the page must stay static. Leave cross-origin isolation headers (COOP and COEP) out for now and document them in `INTEGRATION.md`, because a game that uses SharedArrayBuffer may need them.

## 12. Legal and trademark

Put this notice in the footer, with the text configurable in `site.ts`:

> GTA VI in the browser is an independent project by {publisher}. It is not affiliated with, endorsed by or sponsored by Rockstar Games, Inc. or Take-Two Interactive Software, Inc. "Grand Theft Auto" and "GTA" are trademarks of Take-Two Interactive Software, Inc. All other trademarks belong to their respective owners.

Also: no cookies and no trackers by default, with a one-line privacy note saying so (update it if analytics is ever added), and a contact address for support and takedown requests.

## 13. Deliverables and working method

**Deliverables**

1. A Next.js project where `npm run build` finishes with zero errors and zero warnings.
2. `README.md`: setup, scripts, environment variables, how to edit copy and screenshots, deployment, and the post-launch checklist.
3. `INTEGRATION.md`: how to connect the game, with three recipes. First, an iframe through `NEXT_PUBLIC_GAME_URL`. Second, a client module that mounts a canvas through `GameAdapter`. Third, an engine loader script (Unity, Godot or Emscripten). Cover headers (CORS, caching, Brotli, COOP and COEP for SharedArrayBuffer), fullscreen, pointer lock, gamepad, unlocking audio on the first gesture, cleanup in `unmount`, and how to keep the page static and indexable.
4. `docs/design-plan.md`.
5. `.env.example` with every variable: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GAME_URL`, `ALLOW_AI_TRAINING_BOTS`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`.
6. A final report: what you built, every assumption, every `TODO(owner)`, measured Lighthouse results, and anything you couldn't do.

**Order of work**

1. Study the screenshots and write the design plan (6.2).
2. Scaffold the project; add `site.ts`, `content.ts` and `screenshots.ts`.
3. Root layout: fonts, tokens, metadata, JSON-LD, skip link.
4. Hero, header, Play now button, launcher and placeholder adapter (the core), then the remaining sections.
5. SEO routes: sitemap, robots, manifest, `llms.txt`, share image, icons.
6. Harden: accessibility, performance, security headers, reduced motion.
7. Verify (below), fix, verify again.
8. Write the README, `INTEGRATION.md` and the final report.

**Verify**

```bash
npm run build && npm run start

# Content exists without JavaScript
curl -s http://localhost:3000 | grep -o "<h1[^>]*>.*</h1>"
curl -s -A "OAI-SearchBot" http://localhost:3000 | grep -ci "play now"

# SEO routes
curl -s http://localhost:3000/robots.txt
curl -s http://localhost:3000/sitemap.xml
curl -s http://localhost:3000/llms.txt

# Lighthouse (13.3 or newer, Chrome 150 or newer)
npx lighthouse@latest http://localhost:3000 \
  --only-categories=performance,accessibility,best-practices,seo,agentic-browsing \
  --chrome-flags="--headless" --output=json --output-path=./lighthouse.json
```

After deploying, run the Rich Results Test and the Schema Markup Validator on the live URL.

## 14. Acceptance checklist

Don't finish until every item is true, and say so in the final report.

**Play now**

- [ ] A native `<button>` reading "Play now" appears in the hero, in the header (after scrolling) and in the final call-to-action band.
- [ ] Activating it runs the launch transition and the loading screen; progress, Cancel, error and retry states all work.
- [ ] No game code or iframe is requested before activation (check the Network panel).
- [ ] `GameAdapter` is documented, and setting `NEXT_PUBLIC_GAME_URL` swaps in the iframe adapter.

**Design**

- [ ] Every screenshot is used; none is stretched or badly cropped.
- [ ] Palette and type follow the design plan; none of the tells in 6.5 appear.
- [ ] The hero load sequence, the scene switcher and the launch transition are the only notable motion, and reduced motion is respected.
- [ ] It looks right at 360, 768, 1280 and 1920 px wide.

**SEO and AI**

- [ ] Title, description, canonical, Open Graph and Twitter tags are correct; the share image is 1200x630.
- [ ] JSON-LD validates; the FAQ markup matches the visible FAQ; there are no fabricated ratings or offers.
- [ ] `robots.txt`, `sitemap.xml` (with images), the manifest and `llms.txt` all return 200, and `llms.txt` passes the format rules.
- [ ] `curl` shows the H1, the Play now text, the FAQ and the quick facts in the raw HTML.
- [ ] No `noindex`, `nosnippet` or `data-nosnippet` anywhere.

**Quality**

- [ ] Lighthouse mobile meets the budgets in section 3, and every applicable Agentic Browsing audit passes.
- [ ] Zero axe violations; a keyboard-only run-through works.
- [ ] Security headers are present and the page is still statically prerendered.
- [ ] The non-affiliation notice and a contact address are in the footer.
- [ ] README, `INTEGRATION.md`, the design plan and `.env.example` are delivered.

## 15. Out of scope

The game itself, backend, accounts, payments, CMS, database, extra pages, translations, analytics scripts, ads and WebMCP.
