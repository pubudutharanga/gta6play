"use client";

// src/components/play/PlayButton.tsx
// The Play now button — the page's single primary action.

import { useCallback, useEffect, useRef } from "react";
import { useGameLauncher } from "./GameLauncherProvider";
import { armPopunderCapture, primePopunder } from "@/lib/ads";

type Variant = "hero" | "header" | "cta";

const variantStyles: Record<Variant, string> = {
  // Width is reserved for the widest label so state changes never shift layout.
  hero: "h-[72px] w-[248px] text-xl px-8",
  header: "h-[44px] w-[172px] text-sm px-4",
  cta: "h-[72px] w-[248px] text-xl px-8",
};

export function PlayButton({ variant }: { variant: Variant }) {
  const { state, launch, adapter } = useGameLauncher();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const intentRef = useRef(false);
  const launchGuardRef = useRef(false);

  const handleIntent = useCallback(() => {
    // Prime the popunder before the click so its click listener is ready.
    primePopunder();

    if (!intentRef.current) {
      intentRef.current = true;
      adapter.preload?.();
    }
  }, [adapter]);

  const startGame = useCallback(() => {
    if (launchGuardRef.current) return;
    if (state.status !== "idle" && state.status !== "error") return;

    // Hold the popunder the click produces before launching the fake game.
    armPopunderCapture();
    launchGuardRef.current = true;
    launch(variant);
  }, [state.status, launch, variant]);

  // Keep the latest launcher available to the native capture listener.
  const startGameRef = useRef(startGame);
  useEffect(() => {
    startGameRef.current = startGame;
  }, [startGame]);

  // Allow a retry after a reset or a failed capability check.
  useEffect(() => {
    if (state.status === "idle" || state.status === "error") {
      launchGuardRef.current = false;
    }
  }, [state.status]);

  useEffect(() => {
    // The popunder tag installs a document-level capture click listener and
    // stops the event before React's onClick runs. Window capture fires first,
    // so the fake game still starts on the same click the ad tag uses to build
    // its popunder URL.
    const handleClickCapture = (event: MouseEvent) => {
      if (event.button !== 0) return;

      const button = buttonRef.current;
      const target = event.target;
      if (!button || !(target instanceof Node) || !button.contains(target)) {
        return;
      }

      startGameRef.current();
    };

    window.addEventListener("click", handleClickCapture, true);
    return () =>
      window.removeEventListener("click", handleClickCapture, true);
  }, []);

  const handleClick = useCallback(() => {
    // Covers programmatic clicks and primes the tag for the next real click.
    primePopunder();
    startGame();
  }, [startGame]);

  const isLoading = state.status === "loading";
  const isError = state.status === "error";

  const label = isLoading
    ? "Loading the game"
    : isError
      ? "Try again"
      : "Play now";

  return (
    <button
      ref={buttonRef}
      type="button"
      data-testid="play-now"
      data-play-location={variant}
      onClick={handleClick}
      onPointerEnter={handleIntent}
      onPointerDown={handleIntent}
      onFocus={handleIntent}
      onTouchStart={handleIntent}
      aria-busy={isLoading || undefined}
      className={`
        group relative inline-flex items-center justify-center gap-2.5
        transform skew-x-[-10deg] overflow-hidden rounded-[6px]
        bg-gradient-to-r from-flamingo to-tangerine
        font-display font-extrabold uppercase tracking-wide text-dusk
        shadow-[0_0_26px_color-mix(in_srgb,var(--scene-accent)_55%,transparent)]
        transition-transform duration-100 ease-out
        hover:shadow-[0_0_36px_color-mix(in_srgb,var(--scene-accent)_75%,transparent)]
        focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-lagoon
        active:scale-[0.97]
        disabled:cursor-not-allowed disabled:opacity-80
        ${variant === "hero" ? "play-glow-pulse" : ""}
        ${variantStyles[variant]}
      `}
      disabled={state.status === "loading" || state.status === "running"}
    >
      {/* Light sweep on hover/focus only */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 bg-white/30 blur-sm group-hover:animate-[light-sweep_900ms_ease-out] group-focus-visible:animate-[light-sweep_900ms_ease-out]"
      />
      <span className="relative inline-flex skew-x-[10deg] items-center gap-2 whitespace-nowrap">
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {label}
      </span>
    </button>
  );
}
