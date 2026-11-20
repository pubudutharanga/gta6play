// src/components/sections/Faq.tsx
// FAQ — native details/summary, no JavaScript required.

import { faq } from "@/content/content";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <div className="max-w-2xl">
          <h2
            id="faq-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
          >
            {faq.heading}
          </h2>

          <div className="mt-10 divide-y divide-haze/15">
            {faq.items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body text-base font-medium text-sand hover:text-lagoon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-haze transition-transform duration-200 group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <p className="mt-3 max-w-xl font-body text-base leading-relaxed text-sand/80">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
