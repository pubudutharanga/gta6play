// src/components/sections/Locations.tsx
// "Where you can play" — the named districts of the open world.

import { locations } from "@/content/content";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Locations() {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="locations-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
          >
            {locations.heading}
          </h2>
          <p className="mt-6 font-body text-lg leading-relaxed text-sand/90">
            {locations.intro}
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.items.map((location) => (
            <li
              key={location.name}
              className="rounded-[2px] border border-haze/10 bg-dusk-deep/40 p-5"
            >
              <h3 className="font-display text-lg font-extrabold text-sand">
                {location.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-sand/80">
                {location.detail}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
