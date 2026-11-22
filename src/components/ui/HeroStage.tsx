"use client";

// src/components/ui/HeroStage.tsx
// Client shell for the hero: crossfading backdrop, the server-rendered LCP
// image, the scene accent variable, and the scene switcher.

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { SceneSwitcher } from "@/components/ui/SceneSwitcher";
import type { Screenshot } from "@/content/screenshots";
import { siteConfig } from "@/config/site";

export function HeroStage({
  scenes,
  heroImage,
  children,
}: {
  scenes: Screenshot[];
  heroImage: ReactNode;
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsReady, setThumbsReady] = useState(false);
  const activeScene = scenes[activeIndex] ?? scenes[0];

  // Mount the non-hero backdrops after the first interaction or 2 s idle,
  // so they never compete with the hero LCP image.
  useEffect(() => {
    if (thumbsReady) return;
    const timer = window.setTimeout(() => setThumbsReady(true), 2000);
    return () => window.clearTimeout(timer);
  }, [thumbsReady]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setThumbsReady(true);
  }, []);

  return (
    <section
      id="play"
      className="relative min-h-screen overflow-hidden"
      style={
        {
          scrollMarginTop: siteConfig.headerHeight,
          "--scene-accent": activeScene.accent,
        } as React.CSSProperties
      }
    >
      {/* Header sentinel */}
      <div
        id="header-sentinel"
        className="absolute top-0 h-1 w-full"
        aria-hidden="true"
      />

      {/* Backdrop */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            activeIndex === 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {heroImage}
        </div>

        {thumbsReady &&
          scenes.map((scene, i) =>
            i === 0 ? null : (
              <Image
                key={scene.src}
                src={scene.src}
                alt=""
                fill
                sizes="100vw"
                loading="lazy"
                quality={75}
                className={`object-cover transition-opacity duration-500 ${
                  activeIndex === i ? "opacity-100" : "opacity-0"
                }`}
                style={{ objectPosition: scene.focal }}
              />
            )
          )}

        {/* Grade overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-dusk via-dusk/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-flamingo/5 to-tangerine/5 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-dusk-deep)_100%)]" />
      </div>

      {/* Film grain */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 md:flex-row md:items-end md:justify-between md:pb-20 lg:px-12">
        <div className="hero-entrance max-w-2xl">{children}</div>

        <div
          className="mt-8 md:mt-0 md:ml-8 md:mb-4"
          onPointerEnter={() => setThumbsReady(true)}
          onFocus={() => setThumbsReady(true)}
        >
          <SceneSwitcher
            scenes={scenes}
            activeIndex={activeIndex}
            onSelect={handleSelect}
            thumbsReady={thumbsReady}
          />
        </div>
      </div>
    </section>
  );
}
