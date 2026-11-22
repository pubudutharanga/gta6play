"use client";

// src/components/sections/Screenshots.tsx
// Wide asymmetric grid of all screenshots with lightbox.

import { useState, useCallback, lazy, Suspense } from "react";
import Image from "next/image";
import { screenshotsSection } from "@/content/content";
import { galleryScreenshots } from "@/content/screenshots";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const Lightbox = lazy(() =>
  import("@/components/ui/Lightbox").then((m) => ({ default: m.Lightbox }))
);

export function Screenshots() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Create asymmetric grid pattern: alternate between span-2 and span-1
  const getSpan = (index: number, shot: (typeof galleryScreenshots)[0]) => {
    // Portrait images get span-1, landscape varies
    if (shot.height > shot.width) return "md:col-span-1 md:row-span-2";
    // Every 3rd landscape image gets span-2
    if (index % 5 === 0) return "md:col-span-2";
    return "md:col-span-1";
  };

  return (
    <section
      id="scenes"
      aria-labelledby="screenshots-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <h2
          id="screenshots-heading"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
        >
          {screenshotsSection.heading}
        </h2>

        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-sand/90">
          {screenshotsSection.intro}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryScreenshots.map((shot, i) => (
            <figure
              key={shot.src}
              className={`group relative overflow-hidden rounded-[2px] ${getSpan(i, shot)}`}
            >
              <button
                type="button"
                onClick={() => openLightbox(i)}
                className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
                aria-label={`View full size: ${shot.alt}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  style={{ objectPosition: shot.focal }}
                />
              </button>
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dusk-deep/90 to-transparent px-3 py-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="font-body text-xs text-sand/90">
                  {shot.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* Lightbox (dynamic import on first open) */}
      {lightboxIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            screenshots={galleryScreenshots}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        </Suspense>
      )}
    </section>
  );
}
