"use client";

// src/components/ads/AdScripts.tsx
// Social bar ad tag, plus a delayed preload of the popunder tag. Preloading
// keeps the popunder tag ready for the Play button, which primes it on intent.
// The URL the tag builds on that click is held by src/lib/ads.ts and opened
// only after the fake game finishes loading.

import Script from "next/script";
import { useEffect } from "react";
import { primePopunder } from "@/lib/ads";

const SOCIAL_BAR_SRC =
  "https://biomanos.org/14/2a37078fb0857d6ee249a138d7bc0a76";

/** Delay before the popunder tag is preloaded, in milliseconds. */
const POPUNDER_PRELOAD_DELAY_MS = 3000;

export function AdScripts() {
  useEffect(() => {
    const timer = window.setTimeout(primePopunder, POPUNDER_PRELOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Script
      id="social-bar"
      src={SOCIAL_BAR_SRC}
      strategy="afterInteractive"
      data-cfasync="false"
    />
  );
}
