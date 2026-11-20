// src/components/sections/Requirements.tsx
// System requirements — minimum and recommended as two dl columns.

import { requirements } from "@/content/content";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

function SpecList({
  label,
  specs,
}: {
  label: string;
  specs: readonly { term: string; detail: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-extrabold text-sand">
        {label}
      </h3>
      <dl className="mt-4 divide-y divide-haze/10">
        {specs.map((spec) => (
          <div
            key={spec.term}
            className="flex items-baseline justify-between gap-4 py-2.5"
          >
            <dt className="font-body text-sm text-haze">{spec.term}</dt>
            <dd className="font-body text-sm text-sand text-right">
              {spec.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Requirements() {
  return (
    <section
      id="requirements"
      aria-labelledby="requirements-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <h2
          id="requirements-heading"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
        >
          {requirements.heading}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16 max-w-3xl">
          <SpecList
            label={requirements.minimum.label}
            specs={requirements.minimum.specs}
          />
          <SpecList
            label={requirements.recommended.label}
            specs={requirements.recommended.specs}
          />
        </div>
      </Container>
    </section>
  );
}
