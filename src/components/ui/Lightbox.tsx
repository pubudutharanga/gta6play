"use client";

// src/components/ui/Lightbox.tsx
// Accessible lightbox for screenshots — native <dialog>, arrow keys, Escape, focus return.

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Screenshot } from "@/content/screenshots";

export function Lightbox({
  screenshots,
  initialIndex,
  onClose,
}: {
  screenshots: Screenshot[];
  initialIndex: number;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const current = screenshots[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : screenshots.length - 1));
  }, [screenshots.length]);

  const next = useCallback(() => {
    setIndex((i) => (i < screenshots.length - 1 ? i + 1 : 0));
  }, [screenshots.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, onClose]);

  // Swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(diff) > 50) {
        if (diff > 0) prev();
        else next();
      }
    },
    [prev, next]
  );

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Screenshot: ${current.alt}`}
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-h-full max-w-full items-center justify-center bg-dusk-deep/95 p-4 backdrop:bg-transparent"
      onClose={onClose}
    >
      <div
        className="relative flex h-full w-full items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-md bg-dusk/80 p-2 text-sand hover:bg-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
          aria-label="Close lightbox"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Previous */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-dusk/80 p-2 text-sand hover:bg-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
          aria-label="Previous screenshot"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <figure className="flex max-h-[85vh] max-w-[90vw] flex-col items-center">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            className="max-h-[80vh] w-auto rounded-[2px] object-contain"
            sizes="90vw"
            quality={80}
          />
          <figcaption className="mt-3 text-center font-body text-sm text-haze">
            {current.caption}
            <span className="ml-2 text-xs text-haze/60">
              {index + 1} / {screenshots.length}
            </span>
          </figcaption>
        </figure>

        {/* Next */}
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-dusk/80 p-2 text-sand hover:bg-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
          aria-label="Next screenshot"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </dialog>
  );
}
