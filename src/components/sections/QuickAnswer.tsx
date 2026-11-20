// src/components/sections/QuickAnswer.tsx
// "What is GTA VI in the browser?" — the passage people and AI will quote.

import { quickAnswer } from "@/content/content";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function QuickAnswer() {
  return (
    <section
      id="about"
      aria-labelledby="quick-answer-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="quick-answer-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
          >
            {quickAnswer.heading}
          </h2>

          <p className="mt-6 font-body text-lg leading-relaxed text-sand/90">
            {quickAnswer.body}
          </p>

          <dl className="mt-10 divide-y divide-haze/15">
            {quickAnswer.facts.map((fact) => (
              <div
                key={fact.term}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="font-body text-sm font-medium text-haze">
                  {fact.term}
                </dt>
                <dd className="font-body text-sm text-sand text-right">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
