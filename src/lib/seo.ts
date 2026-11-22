// src/lib/seo.ts — Build JSON-LD @graph for the page.

import { siteConfig, getDisclaimer } from "@/config/site";
import { hero, faq, howToPlay, seoTitle, seoDescription } from "@/content/content";
import { screenshots, heroScreenshot } from "@/content/screenshots";

function abs(path: string): string {
  return `${siteConfig.url}${path}`;
}

export function buildJsonLd(): string {
  const url = siteConfig.url;

  const org = {
    "@type": "Organization",
    "@id": `${url}/#org`,
    name: siteConfig.publisher,
    url,
    description: `Independent browser-game studio behind ${siteConfig.name}.`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contactEmail,
      availableLanguage: "English",
    },
    logo: {
      "@type": "ImageObject",
      url: abs("/icons/icon-512.png"),
      width: 512,
      height: 512,
    },
    ...(siteConfig.socialProfiles.length > 0
      ? { sameAs: siteConfig.socialProfiles }
      : {}),
  };

  const webSite = {
    "@type": "WebSite",
    "@id": `${url}/#website`,
    url,
    name: siteConfig.name,
    alternateName: [
      "GTA 6",
      "GTA 6 Browser",
      "GTA VI Browser",
      "GTA 6 Online",
      "GTA 6 Web",
    ],
    description: seoDescription,
    publisher: { "@id": `${url}/#org` },
    inLanguage: siteConfig.language,
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: seoTitle,
    description: seoDescription,
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#game` },
    mainEntity: { "@id": `${url}/#game` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: abs(heroScreenshot.src),
      caption: heroScreenshot.caption,
      width: heroScreenshot.width,
      height: heroScreenshot.height,
    },
    keywords: [...siteConfig.keywords],
    dateModified: siteConfig.lastUpdated,
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    author: { "@id": `${url}/#org` },
    hasPart: [
      { "@id": `${url}/#how-to-play` },
      { "@id": `${url}/#faq` },
    ],
    copyrightHolder: { "@id": `${url}/#org` },
    copyrightYear: new Date(siteConfig.lastUpdated).getFullYear(),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#quick-answer-heading", "#about p", "#faq-heading"],
    },
  };

  const videoGame = {
    "@type": "VideoGame",
    "@id": `${url}/#game`,
    name: siteConfig.name,
    alternateName: [
      "GTA 6",
      "GTA 6 Browser",
      "GTA VI Browser",
      "GTA 6 Online",
      "GTA 6 Web",
    ],
    description: hero.description,
    keywords: [...siteConfig.keywords],
    url,
    image: [
      {
        "@type": "ImageObject",
        url: abs(heroScreenshot.src),
        caption: heroScreenshot.caption,
        width: heroScreenshot.width,
        height: heroScreenshot.height,
      },
    ],
    screenshot: screenshots.map((s) => ({
      "@type": "ImageObject",
      contentUrl: abs(s.src),
      caption: s.caption,
      width: s.width,
      height: s.height,
    })),
    genre: [...siteConfig.genre],
    character: [
      { "@type": "Person", name: "Jason" },
      { "@type": "Person", name: "Lucia Caminos" },
    ],
    gameLocation: { "@type": "Place", name: "Leonida" },
    gamePlatform: siteConfig.platform,
    operatingSystem: "Windows, macOS, Linux, ChromeOS",
    softwareRequirements: "WebGL 2 or WebGPU; 4 GB RAM; current desktop browser",
    applicationCategory: "GameApplication",
    playMode: "https://schema.org/SinglePlayer", // TODO(owner)
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    dateModified: siteConfig.lastUpdated,
    copyrightHolder: { "@id": `${url}/#org` },
    mainEntityOfPage: { "@id": `${url}/#webpage` },
    author: { "@id": `${url}/#org` },
    publisher: { "@id": `${url}/#org` },
    offers: {
      "@type": "Offer",
      price: siteConfig.priceValue,
      priceCurrency: siteConfig.priceCurrency,
      availability: "https://schema.org/InStock",
      url,
    }, // TODO(owner): only if truly free
    potentialAction: {
      "@type": "PlayGameAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/#play`,
      },
    },
    disambiguatingDescription: getDisclaimer(),
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${url}/#faq`,
    name: faq.heading,
    isPartOf: { "@id": `${url}/#webpage` },
    about: { "@id": `${url}/#game` },
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const howTo = {
    "@type": "HowTo",
    "@id": `${url}/#how-to-play`,
    name: howToPlay.heading,
    description:
      "Start playing GTA 6 in your browser in three steps: press Play now, wait for the first load, then play with keyboard, mouse or a gamepad.",
    isPartOf: { "@id": `${url}/#webpage` },
    about: { "@id": `${url}/#game` },
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: siteConfig.priceCurrency,
      value: 0,
    },
    tool: [
      {
        "@type": "HowToTool",
        name: "Desktop or laptop with a current browser",
      },
      {
        "@type": "HowToTool",
        name: "Keyboard and mouse (gamepad optional)",
      },
    ],
    step: howToPlay.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      itemListElement: [
        {
          "@type": "HowToDirection",
          text: step.body,
        },
      ],
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, webSite, webPage, videoGame, howTo, faqPage],
  };

  // Escape < to prevent script injection
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
