// src/content/content.ts — ALL copy. Single source of truth.
// Every visible FAQ, quick fact, metadata string, JSON-LD and llms.txt
// is generated from this file and site.ts so they can never disagree.

import { siteConfig } from "@/config/site";

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  title: "GTA VI",
  subtitle: "Play GTA 6 free in your browser",
  description:
    "GTA 6 gameplay set in the sun-bleached streets and neon-lit nights of Vice City — running in your desktop browser, with no download required.",
  microcopy: `${siteConfig.price}. No download. Works in current desktop browsers.`,
};

/* ------------------------------------------------------------------ */
/*  Quick answer                                                       */
/* ------------------------------------------------------------------ */

export const quickAnswer = {
  heading: "What is GTA 6 in the browser?",
  body: `GTA 6 in the browser is a free, single-player, open-world action game that runs entirely in your desktop browser. Drive, explore and cause chaos across Vice City and Leonida in Chrome, Edge, Firefox or Safari, with nothing to install. It is a separate project from Rockstar's official GTA VI, which launched on PlayStation 5 and Xbox Series X|S on November 19, 2026.`, // TODO(owner): verify official release details
  facts: [
    { term: "Platform", detail: siteConfig.browsers },
    { term: "Price", detail: siteConfig.price },
    { term: "Install", detail: "None — plays in your browser" },
    { term: "Players", detail: siteConfig.players },
    { term: "Controls", detail: siteConfig.input },
    { term: "Last updated", detail: siteConfig.lastUpdated },
  ] as const,
};

/* ------------------------------------------------------------------ */
/*  Features ("What you can do")                                       */
/* ------------------------------------------------------------------ */

export const features = {
  heading: "GTA 6 gameplay: what you can do",
  items: [
    {
      title: "Drive across Vice City and beyond",
      body: "Take any vehicle on the road — cars, bikes, boats — and cover ground from downtown Vice City to the swamps of Grassrivers. Each neighborhood has its own look and feel.", // TODO(owner): confirm gameplay scope
      screenshotName: "jason-lucia-convertible",
    },
    {
      title: "Explore an open world from coast to mountains",
      body: "Fly over the Leonida Keys, hike Mount Kalaga, or walk the Vice City boardwalk. The map is open from the start, with no loading screens between districts.", // TODO(owner): confirm open-world structure
      screenshotName: "leonida-keys-aerial",
    },
    {
      title: "Play through a story of risk and loyalty",
      body: "Follow Jason and Lucia as they work their way through Vice City's criminal underworld. Missions blend driving, action and choices that shape how the story plays out.", // TODO(owner): confirm story details
      screenshotName: "jason-lucia-sunset",
    },
    {
      title: "Experience a city that lives and breathes",
      body: "Vice City's streets fill with traffic, pedestrians and weather changes. Neon signs flicker on at dusk, rain slicks the roads, and the city sounds different at 2 AM than at noon.", // TODO(owner): confirm dynamic world features
      screenshotName: "vice-city-neon-skyline",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  How to play                                                        */
/* ------------------------------------------------------------------ */

export const howToPlay = {
  heading: "How to play GTA 6 in your browser",
  steps: [
    {
      title: "Press Play now",
      body: "Click the button on this page. The game loads right here in your browser.",
    },
    {
      title: "Wait for the first load",
      body: "The initial download is about 50 MB. After that, most assets are cached for next time.", // TODO(owner): confirm actual download size
    },
    {
      title: "Play with keyboard and mouse or a gamepad",
      body: "WASD to move, mouse to look around. Plug in an Xbox or PlayStation controller and it works automatically.", // TODO(owner): confirm controls
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Controls                                                           */
/* ------------------------------------------------------------------ */

export const controls = {
  heading: "Controls",
  caption: "Default keyboard, mouse and gamepad controls",
  bindings: [
    { action: "Move", keyboard: "W A S D", gamepad: "Left stick" }, // TODO(owner)
    { action: "Look around", keyboard: "Mouse", gamepad: "Right stick" }, // TODO(owner)
    { action: "Sprint", keyboard: "Left Shift", gamepad: "Left stick click" }, // TODO(owner)
    { action: "Jump", keyboard: "Space", gamepad: "A / ✕" }, // TODO(owner)
    { action: "Enter / exit vehicle", keyboard: "F", gamepad: "Y / △" }, // TODO(owner)
    { action: "Accelerate", keyboard: "W", gamepad: "Right trigger" }, // TODO(owner)
    { action: "Brake / reverse", keyboard: "S", gamepad: "Left trigger" }, // TODO(owner)
    { action: "Shoot", keyboard: "Left click", gamepad: "Right trigger" }, // TODO(owner)
    { action: "Aim", keyboard: "Right click", gamepad: "Left trigger" }, // TODO(owner)
    { action: "Reload", keyboard: "R", gamepad: "X / □" }, // TODO(owner)
    { action: "Pause menu", keyboard: "Escape", gamepad: "Start / Options" }, // TODO(owner)
  ],
};

/* ------------------------------------------------------------------ */
/*  System requirements                                                */
/* ------------------------------------------------------------------ */

export const requirements = {
  heading: "System requirements",
  minimum: {
    label: "Minimum",
    specs: [
      { term: "Browser", detail: "Chrome 110, Edge 110, Firefox 115 or Safari 17" }, // TODO(owner)
      { term: "Graphics API", detail: "WebGL 2" },
      { term: "Memory", detail: "4 GB RAM" }, // TODO(owner)
      { term: "Connection", detail: "10 Mbps" }, // TODO(owner)
      { term: "Screen", detail: "1280 × 720 px" }, // TODO(owner)
    ],
  },
  recommended: {
    label: "Recommended",
    specs: [
      { term: "Browser", detail: "Chrome 120+, Edge 120+, Firefox 125+ or Safari 18+" }, // TODO(owner)
      { term: "Graphics API", detail: "WebGPU" },
      { term: "Memory", detail: "8 GB RAM" }, // TODO(owner)
      { term: "Connection", detail: "25 Mbps" }, // TODO(owner)
      { term: "Screen", detail: "1920 × 1080 px" }, // TODO(owner)
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

export const faq = {
  heading: "Frequently asked questions",
  items: [
    {
      question: "Is GTA VI free to play?",
      answer:
        "Yes. GTA VI in the browser is completely free. There are no purchases, subscriptions or hidden fees.",
    },
    {
      question: "Do I need to download or install anything?",
      answer:
        "No. The game runs in your web browser. Press Play now and it loads directly on this page. Nothing is installed on your computer.",
    },
    {
      question: "What can you play GTA 6 on?",
      answer:
        "For this browser edition, use a desktop or laptop in current Chrome, Edge, Firefox or Safari. It requires WebGL 2 or WebGPU. The official GTA VI is a separate release for PlayStation 5 and Xbox Series X|S. If you do not have a console, the browser edition is the easiest way to play on PC or Mac.",
    },
    {
      question: "Is GTA 6 out now, or can you still pre-order it?",
      answer:
        "GTA VI is out now. The official game launched on November 19, 2026 for PlayStation 5 and Xbox Series X|S, so pre-orders have ended. This browser edition is separate, free and playable immediately.", // TODO(owner): verify official release details
    },
    {
      question: "Can you play GTA 6 on PS4?",
      answer:
        "No. The official GTA VI is a PlayStation 5 and Xbox Series X|S release and is not available on PS4. This browser edition does not run on PlayStation consoles either — it runs in a desktop browser.",
    },
    {
      question: "Can you play GTA 6 on Xbox Series S?",
      answer:
        "Yes. The official GTA VI runs on Xbox Series X and Xbox Series S. This browser edition is separate and runs on desktop browsers, not on Xbox consoles.",
    },
    {
      question: "Who plays Lucia in GTA 6?",
      answer:
        "Manni L. Perez plays Lucia Caminos in the official GTA VI.", // TODO(owner): verify cast credit
    },
    {
      question: "How do I play GTA 6 in my browser?",
      answer:
        "Press Play now on this page. GTA 6 loads in the same tab; use WASD and the mouse, or connect a gamepad. No download or install is required.",
    },
    {
      question: "Does it work on phones or tablets?",
      answer:
        "The game is designed for desktop browsers with a keyboard and mouse. It may load on a tablet with a connected keyboard, but phones are not supported.",
    },
    {
      question: "Is my progress saved?",
      answer:
        "Yes. Progress is saved in your browser's local storage. Clearing your browser data will erase your save. A cloud-save option may be added later.", // TODO(owner): confirm save mechanism
    },
    {
      question: "Why is the first load slow?",
      answer:
        "The game downloads about 50 MB of assets on the first visit. After that, most files are cached, so return visits load much faster.", // TODO(owner): confirm download size
    },
    {
      question: "Which controllers work?",
      answer:
        "Any Xbox or PlayStation controller connected through USB or Bluetooth should work. The browser's Gamepad API detects it automatically.", // TODO(owner): confirm gamepad support
    },
    {
      question: "Is this an official Rockstar Games release?",
      answer:
        `No. GTA VI in the browser is an independent project by ${siteConfig.publisher}. It is not affiliated with, endorsed by or sponsored by Rockstar Games, Inc. or Take-Two Interactive Software, Inc.`,
    },
    {
      question: "How do I report a bug or request a feature?",
      answer:
        `Send an email to ${siteConfig.contactEmail} with a description of the issue, the browser you are using and a screenshot if possible.`, // TODO(owner): confirm support channel
    },
    {
      question: "Can I play fullscreen?",
      answer:
        "Yes. After the game starts, click the fullscreen button in the game overlay or press F11 in your browser.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Final CTA                                                          */
/* ------------------------------------------------------------------ */

export const finalCta = {
  heading: "Play GTA VI now",
  body: "Free, instant, no download. Jump into Vice City right from your browser.",
};

/* ------------------------------------------------------------------ */
/*  Loading tips (shown in the game stage)                             */
/* ------------------------------------------------------------------ */

export const loadingTips = [
  "Tip: Use the map to find mission markers and points of interest.",
  "Tip: Vehicles handle differently on wet roads.",
  "Tip: Hold the sprint key while driving to look behind your vehicle.",
  "Tip: Visit the weapon shop to gear up before a mission.",
  "Tip: Some missions unlock new areas of the map.",
  "Tip: Plug in a gamepad for a console-like experience.",
]; // TODO(owner): replace with real gameplay tips

/* ------------------------------------------------------------------ */
/*  Metadata (derived from above for consistency)                      */
/* ------------------------------------------------------------------ */

export const seoTitle = "GTA 6 Browser: Play GTA VI Free Online, No Download";
export const seoDescription =
  "Play GTA 6 free in your browser and explore Vice City. Learn how to play, controls and requirements. No download. Works in modern desktop browsers.";
