// src/components/sections/Features.tsx
// "What you can do" — alternating image/text rows.

import Image from "next/image";
import { features } from "@/content/content";
import { screenshots } from "@/content/screenshots";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

function getScreenshot(name: string) {
  return screenshots.find(
    (s) => s.src === `/screenshots/${name}.webp`
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <h2
          id="features-heading"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
        >
          {features.heading}
        </h2>

        <div className="mt-14 space-y-20 md:space-y-28">
          {features.items.map((item, i) => {
            const shot = getScreenshot(item.screenshotName);
            const imageFirst = i % 2 === 0;

            return (
              <div
                key={item.title}
                className={`flex flex-col gap-8 md:gap-12 ${
                  imageFirst ? "md:flex-row" : "md:flex-row-reverse"
                } md:items-center`}
              >
                {/* Image */}
                {shot && (
                  <div className="md:w-3/5 flex-shrink-0">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      className="w-full rounded-[2px]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      loading="lazy"
                      style={{ objectPosition: shot.focal }}
                    />
                  </div>
                )}

                {/* Text */}
                <div className="md:w-2/5">
                  <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-snug text-sand">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-body text-base leading-relaxed text-sand/85 md:text-lg">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
