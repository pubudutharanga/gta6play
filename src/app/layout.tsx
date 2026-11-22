import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { seoTitle, seoDescription } from "@/content/content";
import { SkipLink } from "@/components/ui/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { LauncherRoot } from "@/components/play/LauncherRoot";
import { AdScripts } from "@/components/ads/AdScripts";

/* ------------------------------------------------------------------ */
/*  Fonts (local, self-hosted, display: swap, latin subset)            */
/* ------------------------------------------------------------------ */

const bigShoulders = localFont({
  src: "../assets/BigShoulders.ttf",
  variable: "--font-big-shoulders",
  display: "swap",
  weight: "800",
});

const instrumentSans = localFont({
  src: "../assets/InstrumentSans.ttf",
  variable: "--font-instrument-sans",
  display: "swap",
  weight: "400 600",
});

/* ------------------------------------------------------------------ */
/*  Verification tags (only emitted when env vars are set)             */
/* ------------------------------------------------------------------ */

const verification: Metadata["verification"] = {
  ...(siteConfig.verification.google
    ? { google: siteConfig.verification.google }
    : {}),
  ...(siteConfig.verification.bing
    ? { other: { "msvalidate.01": siteConfig.verification.bing } }
    : {}),
};

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: seoTitle,
  description: seoDescription,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.publisher,
  category: "games",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    title: seoTitle,
    description: seoDescription,
    url: siteConfig.url,
    images: [
      {
        url: "/og-background.jpg",
        secureUrl: `${siteConfig.url}/og-background.jpg`,
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — open-world action game playable in a desktop browser`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoTitle,
    description: seoDescription,
    images: [
      {
        url: "/og-background.jpg",
        alt: `${siteConfig.name} — open-world action game playable in a desktop browser`,
      },
    ],
  },
  ...(Object.keys(verification ?? {}).length > 0 ? { verification } : {}),
};

export const viewport: Viewport = {
  themeColor: "#1A0F3D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/* ------------------------------------------------------------------ */
/*  Static guarantee (Cache Components)                                */
/* ------------------------------------------------------------------ */

export const ensureStatic = "navigation";

/* ------------------------------------------------------------------ */
/*  Root Layout                                                        */
/* ------------------------------------------------------------------ */

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      className={`${bigShoulders.variable} ${instrumentSans.variable} h-full`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <LauncherRoot>{children}</LauncherRoot>
        <AdScripts />
      </body>
    </html>
  );
}
