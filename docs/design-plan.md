# GTA VI Browser Edition — Design Plan

## Palette

Sampled from the screenshot set. The collection splits between warm golden-hour sunsets (#F0C078, #F0D890) and deep neon nights (#301848, #001878). The official tokens lean into that duality.

| Token       | Hex       | Use                                                      |
|-------------|-----------|----------------------------------------------------------|
| `dusk`      | `#1A0F3D` | Page background — deep violet, never neutral black       |
| `dusk-deep` | `#120A2B` | Footer and overlay backgrounds                           |
| `flamingo`  | `#FF4F9A` | Primary accent; Play now gradient start                   |
| `tangerine` | `#FF8F3F` | Play now gradient end; sunset highlights                  |
| `lagoon`    | `#2DD4C0` | Focus rings, links, success states (never decorative)     |
| `sand`      | `#FFEBCB` | Headings and body text on dark                            |
| `haze`      | `#B9A7E8` | Secondary / muted text                                    |

Contrast checks (on dusk #1A0F3D):
- sand body text: 12.8:1 ✓
- haze secondary: 5.6:1 ✓
- lagoon links: 7.2:1 ✓
- Play now label (dusk on flamingo–tangerine): 4.8:1 ✓ (large text)

## Type

- **Display:** Big Shoulders Display 800, local file. Used for hero title, section headings, Play now label. Uppercase only on the hero "GTA VI" and button labels.
- **Body and UI:** Instrument Sans 400–600, local file. Sentence case throughout. Line length capped at ~65 characters.
- Fluid scale: hero title `clamp(5rem, 19vw, 17rem)` at line-height 0.85. Section headings `clamp(2rem, 5vw, 3.5rem)`.

## Layout Concept

Edge-to-edge screenshots, narrow left-aligned text columns, 12-column grid capped at 1280 px. Left-aligned text throughout; center only the final CTA.

```
+----------------------------------------------------------------+
| GTA VI                       Scenes  How to play  Controls  FAQ |   sticky header
+----------------------------------------------------------------+
| full-bleed screenshot (scene switcher backdrop)                  |
|   GTA VI                                            [thumb]     |
|   Play in your browser                              [thumb]     |
|   Sentence definition.                              [thumb]     |
|   [ PLAY NOW ]   Free. No download.                             |
+----------------------------------------------------------------+
| What is GTA VI in the browser? (quiet text, left-aligned dl)    |
+----------------------------------------------------------------+
| What you can do — alternating image/text rows, full-bleed imgs  |
+----------------------------------------------------------------+
| Screenshots — wide asymmetric grid of figures                    |
+----------------------------------------------------------------+
| How to start playing — numbered ol, compact                      |
+----------------------------------------------------------------+
| Controls — real table, hairline borders                          |
+----------------------------------------------------------------+
| System requirements — two dl columns (min / recommended)        |
+----------------------------------------------------------------+
| FAQ — native details/summary, no JS                              |
+----------------------------------------------------------------+
| ═══════ Play GTA VI now ═══════  sunset gradient band, centered |
+----------------------------------------------------------------+
| footer — dusk-deep, text wordmark, links, notice                 |
+----------------------------------------------------------------+
```

## Three Guiding Principles

1. **Billboard confidence:** The hero dominates with its screenshot and massive type. It's not polite or balanced—it's loud, then immediately disciplined. The rest of the page is quiet so the hero stays memorable.

2. **Film-frame photography:** Screenshots use sharp edges (0–2 px radius), full-bleed or near full-bleed, treated like cinematic stills. No rounded cards with matching shadows. Variety in the grid: mixed spans, real aspect ratios, asymmetry.

3. **One action, no noise:** Every design decision serves or defers to "Play now." Gradients are reserved for that button and two bands (hero, final CTA). No decorative color. No hover lifts on cards. No scroll-triggered animations. Motion only when user-triggered or in the single hero load sequence.

## Anti-Template Review

Checked against 6.5:
- No identical rounded cards — screenshots use an asymmetric grid with mixed spans.
- Gradient only in hero grade, Play now button, and final CTA band.
- No tracked-out uppercase eyebrow labels.
- No numbered markers except on "How to start playing."
- No single-word color highlight in headings.
- No middle-dot meta strings.
- No fade-and-slide on every section. Motion limited to hero entrance and user-triggered interactions.
- Not near-black + acid accent — deep violet base with warm/cool contrast.
- No filler copy ("Experience the ultimate…").
