// src/components/sections/Controls.tsx
// Controls table with keyboard, mouse and gamepad bindings.

import { controls } from "@/content/content";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Controls() {
  return (
    <section
      id="controls"
      aria-labelledby="controls-heading"
      className="py-20 md:py-28"
      style={{ scrollMarginTop: siteConfig.headerHeight }}
    >
      <Container>
        <h2
          id="controls-heading"
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-sand"
        >
          {controls.heading}
        </h2>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full max-w-2xl border-collapse">
            <caption className="sr-only">{controls.caption}</caption>
            <thead>
              <tr className="border-b border-haze/20">
                <th className="py-3 pr-6 text-left font-body text-sm font-semibold text-haze">
                  Action
                </th>
                <th className="py-3 pr-6 text-left font-body text-sm font-semibold text-haze">
                  Keyboard &amp; mouse
                </th>
                <th className="py-3 text-left font-body text-sm font-semibold text-haze">
                  Gamepad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-haze/10">
              {controls.bindings.map((binding) => (
                <tr key={binding.action}>
                  <td className="py-3 pr-6 font-body text-sm text-sand">
                    {binding.action}
                  </td>
                  <td className="py-3 pr-6 font-body text-sm text-sand/80">
                    <kbd className="rounded bg-dusk-deep/60 px-1.5 py-0.5 font-mono text-xs">
                      {binding.keyboard}
                    </kbd>
                  </td>
                  <td className="py-3 font-body text-sm text-sand/80">
                    {binding.gamepad}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
