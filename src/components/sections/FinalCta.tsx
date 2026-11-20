"use client";

// src/components/sections/FinalCta.tsx
// Final call-to-action band — sunset gradient, centered.

import { finalCta } from "@/content/content";
import { PlayButton } from "@/components/play/PlayButton";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Sunset gradient background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-flamingo/15 via-tangerine/10 to-flamingo/15"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-dusk-deep via-transparent to-dusk-deep"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 text-center sm:px-8 lg:px-12">
        <h2
          id="final-cta-heading"
          className="font-display text-[clamp(2.5rem,7vw,5rem)] font-extrabold leading-[0.9] text-sand"
        >
          {finalCta.heading}
        </h2>

        <p className="mx-auto mt-5 max-w-md font-body text-lg text-sand/85">
          {finalCta.body}
        </p>

        <div className="mt-10">
          <PlayButton variant="cta" />
        </div>
      </div>
    </section>
  );
}
