// src/lib/seo.ts — Build JSON-LD @graph for the page.

import { siteConfig, getDisclaimer } from "@/config/site";
import { hero, faq, seoTitle, seoDescription } from "@/content/content";
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
    alternateName: ["GTA 6", "GTA 6 Browser", "GTA VI Browser"],
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
    },
    keywords: [...siteConfig.keywords],
    dateModified: siteConfig.lastUpdated,
    inLanguage: siteConfig.language,
  };

  const videoGame = {
    "@type": "VideoGame",
    "@id": `${url}/#game`,
    name: siteConfig.name,
    alternateName: ["GTA 6", "GTA 6 Browser", "GTA VI Browser"],
    description: hero.description,
    keywords: [...siteConfig.keywords],
    url,
    image: [abs(heroScreenshot.src)],
    screenshot: screenshots.map((s) => ({
      "@type": "ImageObject",
      contentUrl: abs(s.src),
      caption: s.caption,
      width: s.width,
      height: s.height,
    })),
    genre: [...siteConfig.genre],
    gamePlatform: siteConfig.platform,
    operatingSystem: "Any",
    applicationCategory: "GameApplication",
    playMode: "https://schema.org/SinglePlayer", // TODO(owner)
    inLanguage: siteConfig.language,
    isAccessibleForFree: true,
    mainEntityOfPage: { "@id": `${url}/#webpage` },
    author: { "@id": `${url}/#org` },
    publisher: { "@id": `${url}/#org` },
    offers: {
      "@type": "Offer",
      price: siteConfig.priceValue,
      priceCurrency: siteConfig.priceCurrency,
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
    name: "GTA 6 frequently asked questions",
    isPartOf: { "@id": `${url}/#webpage` },
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [org, webSite, webPage, videoGame, faqPage],
  };

  // Escape < to prevent script injection
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
