# GTA VI — browser edition

A single-page Next.js 16 landing page for a browser game. The page's one job is
to get a visitor to press **Play now**. The game itself is connected separately
through a documented adapter seam — see [INTEGRATION.md](INTEGRATION.md).

- Production: <https://gta6play.vercel.app>
- Design plan: [docs/design-plan.md](docs/design-plan.md)
- Integration guide: [INTEGRATION.md](INTEGRATION.md)

## Stack

- Next.js 16.4 (App Router, Cache Components, Partial Prefetching, Turbopack)
- React 19, TypeScript strict, Tailwind CSS 4
- Local fonts: Big Shoulders Display 800 and Instrument Sans 400–600
- No UI kit, no icon pack, no third-party scripts

## Scripts

```bash
npm run dev        # development server on http://localhost:3000
npm run build      # production build; fails if the page becomes dynamic
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Node 20.9 or newer.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical origin. Defaults to `https://gta6play.vercel.app`. No trailing slash. |
| `NEXT_PUBLIC_GAME_URL` | Optional | If set, the iframe adapter loads this URL. Empty uses the placeholder adapter. |
| `ALLOW_AI_TRAINING_BOTS` | Optional | `false` blocks known AI training crawlers in `robots.txt`. Search and user-fetch bots stay allowed. |
| `GOOGLE_SITE_VERIFICATION` | Optional | Adds the Google Search Console meta tag. |
| `BING_SITE_VERIFICATION` | Optional | Adds the Bing Webmaster `msvalidate.01` meta tag. |

## Editing copy

All visible text — hero, quick answer, features, steps, controls, requirements,
FAQ, final CTA, loading tips, title and description — lives in
[`src/content/content.ts`](src/content/content.ts). Site-wide facts (URL,
publisher, contact, last-updated date, price, browsers) live in
[`src/config/site.ts`](src/config/site.ts).

The FAQ, quick facts, metadata, JSON-LD, `sitemap.xml` and `llms.txt` are all
generated from those two files, so they cannot drift apart. Edit copy there,
not in components.

Anything invented or unconfirmed is marked `TODO(owner)` in code. Replace those
before launch:

- Publisher and author (`Your Studio`)
- Contact/support address (`hello@example.com`)
- Gameplay claims in features, save mechanism, download size, controls,
  gamepad support and system requirements
- Genre and play mode in structured data

When content genuinely changes, bump `lastUpdated` in `site.ts`. It feeds the
visible footer, JSON-LD `dateModified` and `sitemap.xml` lastmod.

## Editing screenshots

Source files live in `public/screenshots/`. Metadata lives in
[`src/content/screenshots.ts`](src/content/screenshots.ts): dimensions, alt text,
caption, focal point, sampled accent color, plus the single `hero` and the five
`scene` entries.

To add or replace an image:

1. Drop the file in `public/screenshots/`.
2. Run `node scripts/build-images.mjs` to produce ≤2560 px WebP masters and a
   manifest with dimensions and dominant colors.
3. Add or update its entry in `screenshots.ts`. Keep `alt` specific (place, time
   of day, vehicle, action), and set `focal` so the subject survives cropping.
4. Keep exactly one `hero: true` and at most five `scene` entries.
5. Every screenshot in the array appears in the gallery and the image sitemap.

Brand icons and the 1200×630 share image are generated with:

```bash
node scripts/build-brand-assets.mjs
```

## SEO and AI readiness

Generated routes, all statically prerendered:

- `/robots.txt` — search and user bots allowed; training bots configurable
- `/sitemap.xml` — one URL with `lastModified` and every screenshot as an image
- `/manifest.webmanifest` — name, colors, 192/512 icons
- `/llms.txt` — generated from `site.ts`; passes the llms.txt format checks
- `/` — canonical, Open Graph, Twitter card, JSON-LD `@graph`

The JSON-LD graph contains `Organization`, `WebSite`, `WebPage`, `VideoGame`
and `FAQPage`. It is generated from the same content as the visible page. There
are no ratings, reviews, player counts or offers beyond the free price.

`export const ensureStatic = "navigation"` in the root layout makes the build
fail if request-time work is added. Keep the page server-rendered: client code
is limited to the launcher, scene switcher, lightbox and mobile menu.

### After launch

1. Add the domain to Google Search Console and Bing Webmaster Tools.
2. Submit `https://gta6play.vercel.app/sitemap.xml`.
3. Run the Rich Results Test and the Schema Markup Validator on the live URL.
4. Watch the Generative AI performance report in Search Console.
5. Check server logs for `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`,
   `PerplexityBot` and friends.
6. A few weeks after indexing, ask ChatGPT, Gemini, Claude and Perplexity about
   the site and correct any wrong facts at the source.
7. Re-run Lighthouse (`--only-categories=performance,accessibility,best-practices,seo`)
   after any content or asset change.

## Deploying

The project is Vercel-ready and has no Vercel-only code.

1. Import the repository in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL=https://gta6play.vercel.app`.
3. Deploy. Add the custom domain later if you want; update the env var and
   redeploy so canonical, OG and sitemap URLs follow.
4. Optionally set `NEXT_PUBLIC_GAME_URL` when the game host is ready.

Security headers are configured in `next.config.ts`: `nosniff`,
`strict-origin-when-cross-origin`, a tight `Permissions-Policy`,
`X-Frame-Options: DENY`, HSTS in production and a Report-Only CSP. Rename the
CSP header to enforce it once the game origin is final.

## Deliberately not included

- The game itself, accounts, payments, saves, backend, database, CMS
- Analytics scripts (the `track()` hook is a no-op until a provider exists)
- Cookie banners (the site sets no cookies)
- WebMCP — experimental and not worth shipping today; revisit later
- COOP/COEP — some engines need them for `SharedArrayBuffer`;
  see INTEGRATION.md before enabling them site-wide
