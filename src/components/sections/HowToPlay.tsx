// src/components/sections/HowToPlay.tsx
// "How to start playing" — 3 numbered steps.

import { howToPlay } from "@/content/content";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function HowToPlay() {
  return (
    <section
      id="how-to-play"
      aria-labelledby="how-to-play-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="how-to-play-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
          >
            {howToPlay.heading}
          </h2>

          <ol className="mt-10 space-y-8 counter-reset-steps">
            {howToPlay.steps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-haze/20 font-display text-lg font-extrabold text-flamingo"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-sand">
                    {step.title}
                  </h3>
                  <p className="mt-2 font-body text-base leading-relaxed text-sand/85">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
