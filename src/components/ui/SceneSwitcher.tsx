"use client";

// src/components/ui/SceneSwitcher.tsx
// Controlled hero scene switcher — up to 5 thumbnail buttons.

import Image from "next/image";
import type { Screenshot } from "@/content/screenshots";

export function SceneSwitcher({
  scenes,
  activeIndex,
  onSelect,
  thumbsReady,
}: {
  scenes: Screenshot[];
  activeIndex: number;
  onSelect: (index: number) => void;
  thumbsReady: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Scene switcher"
      className="scrollbar-none flex gap-2 overflow-x-auto md:flex-col md:overflow-x-visible"
      tabIndex={0}
    >
      {scenes.map((scene, i) => (
        <button
          key={scene.src}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={i === activeIndex}
          className={`
            group relative h-[54px] w-24 flex-shrink-0 overflow-hidden rounded-[2px]
            ring-2 transition-all duration-200
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon
            ${
              i === activeIndex
                ? "brightness-100 ring-sand/80"
                : "ring-transparent brightness-50 hover:brightness-75"
            }
          `}
          aria-label={`Scene ${i + 1}: ${scene.alt}`}
          style={{ backgroundColor: scene.accent }}
        >
          {(i === 0 || thumbsReady) && (
            <Image
              src={scene.src}
              alt=""
              width={96}
              height={54}
              className="h-full w-full object-cover"
              sizes="96px"
              style={{ objectPosition: scene.focal }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
