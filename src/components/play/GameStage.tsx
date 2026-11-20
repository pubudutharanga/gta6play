"use client";

// src/components/play/GameStage.tsx
// The game overlay — launch transition, loading screen, game surface and
// error states. Loaded with next/dynamic (ssr: false) after activation.

import { useCallback, useEffect, useRef, useState } from "react";
import { useGameLauncher } from "./GameLauncherProvider";
import { loadingTips } from "@/content/content";
import { heroScreenshot } from "@/content/screenshots";

const MILESTONES = [25, 50, 75, 100] as const;

export default function GameStage() {
  const { state, cancel, exit, retry, startLoad, containerRef } =
    useGameLauncher();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [currentTip, setCurrentTip] = useState(0);

  const isRunning = state.status === "running";
  const isLoading = state.status === "loading";
  const isError = state.status === "error";
  const milestone = isLoading
    ? [...MILESTONES].reverse().find((m) => state.progress >= m)
    : undefined;
  const announcement = milestone
    ? `Loading: ${milestone} percent complete`
    : "";

  // Attach the persistent game container and kick off loading once it exists.
  useEffect(() => {
    const node = gameContainerRef.current;
    if (!node) return;
    containerRef.current = node;

    if (state.status === "loading") startLoad();

    return () => {
      if (containerRef.current === node) containerRef.current = null;
    };
  }, [state.status, startLoad, containerRef]);

  // Open the modal whenever the stage is mounted; close on unmount.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // Rotate tips every 4 seconds while loading.
  useEffect(() => {
    if (!isLoading) return;
    const interval = window.setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % loadingTips.length);
    }, 4000);
    return () => window.clearInterval(interval);
  }, [isLoading]);

  const handleCancel = useCallback(
    (event: React.SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault();
      if (isLoading) cancel();
    },
    [isLoading, cancel]
  );

  const toggleFullscreen = useCallback(() => {
    const target = dialogRef.current;
    if (!target) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void target.requestFullscreen?.();
    }
  }, []);

  const handleExit = useCallback(() => {
    if (window.confirm("Exit the game? Unsaved progress may be lost.")) {
      exit();
    }
  }, [exit]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="game-stage-title"
      onCancel={handleCancel}
      className="fixed inset-0 z-50 m-0 h-full max-h-full w-full max-w-full overflow-hidden bg-dusk-deep p-0 text-sand backdrop:bg-black/80"
    >
      <h2 id="game-stage-title" className="sr-only">
        GTA VI game
      </h2>

      {/* Persistent game surface: hidden while loading, visible when running.
          It stays mounted so the mounted game is never thrown away. */}
      <div
        ref={gameContainerRef}
        className={`absolute inset-0 ${
          isRunning ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!isRunning}
      />

      {/* Loading screen */}
      {isLoading && (
        <div
          className="absolute inset-0 z-10 flex flex-col"
          style={{
            backgroundImage: `url(${heroScreenshot.src})`,
            backgroundSize: "cover",
            backgroundPosition: heroScreenshot.focal,
          }}
        >
          <div className="absolute inset-0 bg-dusk-deep/85" aria-hidden="true" />

          {/* Launch transition: two sunset panels close, then fade. */}
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="launch-panel-left absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-flamingo/30 to-dusk-deep" />
            <div className="launch-panel-right absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-tangerine/30 to-dusk-deep" />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-4 p-4 md:p-6">
            <p className="max-w-xs font-body text-xs leading-relaxed text-tangerine md:hidden">
              The game plays best with a keyboard and mouse.
            </p>
            <span className="hidden md:block" aria-hidden="true" />
            <button
              type="button"
              onClick={cancel}
              className="rounded-md bg-dusk/80 px-4 py-2 font-body text-sm text-sand hover:bg-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
            >
              Cancel
            </button>
          </div>

          <div className="relative z-10 mt-auto p-6 md:p-10">
            <div className="flex items-end justify-between gap-6">
              <span className="font-display text-6xl font-extrabold text-sand md:text-8xl">
                {state.progress >= 0 ? `${state.progress}%` : "Loading"}
              </span>
              <span className="mb-2 max-w-xs text-right font-body text-sm text-haze md:text-base">
                {loadingTips[currentTip]}
              </span>
            </div>

            <div
              className="mt-4 h-1 w-full overflow-hidden rounded-full bg-dusk/60"
              role="progressbar"
              aria-valuenow={state.progress >= 0 ? state.progress : undefined}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Game loading progress"
            >
              <div
                className="h-full bg-gradient-to-r from-flamingo to-tangerine transition-[width] duration-300 ease-out"
                style={{
                  width: state.progress >= 0 ? `${state.progress}%` : "30%",
                  ...(state.progress < 0
                    ? { animation: "indeterminate 1.5s infinite" }
                    : {}),
                }}
              />
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announcement}
          </div>
        </div>
      )}

      {/* Running chrome */}
      {isRunning && (
        <div className="absolute right-4 top-4 z-20 flex gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="rounded-md bg-dusk/80 px-3 py-1.5 font-body text-xs text-sand hover:bg-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
            aria-label="Toggle fullscreen"
          >
            Fullscreen
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="rounded-md bg-dusk/80 px-3 py-1.5 font-body text-xs text-sand hover:bg-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
          >
            Exit
          </button>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-dusk-deep p-8 text-center">
          <p className="max-w-md font-body text-lg leading-relaxed text-sand">
            {state.error}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={retry}
              className="rounded-md bg-gradient-to-r from-flamingo to-tangerine px-5 py-2.5 font-display font-extrabold uppercase text-dusk focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={exit}
              className="rounded-md bg-dusk px-5 py-2.5 font-body text-sm text-sand hover:bg-dusk/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
            >
              Exit
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
