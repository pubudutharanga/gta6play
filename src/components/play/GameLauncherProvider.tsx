"use client";

// src/components/play/GameLauncherProvider.tsx
// Provides the game launcher state and controls to descendant components.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { GameAdapter, LaunchStatus } from "./types";
import { placeholderAdapter } from "./adapters/placeholderAdapter";
import { iframeAdapter } from "./adapters/iframeAdapter";
import { track } from "@/lib/analytics";
import { checkCapabilities } from "@/lib/webgl";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */

type LauncherState = {
  status: LaunchStatus;
  progress: number; // 0 to 100 or -1 for indeterminate
  error: string | null;
};

type LauncherAction =
  | { type: "START" }
  | { type: "PROGRESS"; percent: number }
  | { type: "RUNNING" }
  | { type: "ERROR"; message: string }
  | { type: "RESET" };

function reducer(state: LauncherState, action: LauncherAction): LauncherState {
  switch (action.type) {
    case "START":
      return { status: "loading", progress: 0, error: null };
    case "PROGRESS":
      return { ...state, progress: action.percent };
    case "RUNNING":
      return { status: "running", progress: 100, error: null };
    case "ERROR":
      return { status: "error", progress: 0, error: action.message };
    case "RESET":
      return { status: "idle", progress: 0, error: null };
    default:
      return state;
  }
}

const initialState: LauncherState = {
  status: "idle",
  progress: 0,
  error: null,
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

type LauncherContextValue = {
  state: LauncherState;
  launch: (location: string) => void;
  retry: () => void;
  cancel: () => void;
  exit: () => void;
  /** Called by GameStage once its persistent container is in the DOM. */
  startLoad: () => void;
  containerRef: RefObject<HTMLElement | null>;
  preloadHinted: RefObject<boolean>;
  adapter: GameAdapter;
};

const LauncherContext = createContext<LauncherContextValue | null>(null);

export function useGameLauncher() {
  const ctx = useContext(LauncherContext);
  if (!ctx)
    throw new Error("useGameLauncher must be used inside GameLauncherProvider");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Adapter selection                                                  */
/* ------------------------------------------------------------------ */

function getAdapter(): GameAdapter {
  const gameUrl = process.env.NEXT_PUBLIC_GAME_URL ?? "";
  if (gameUrl) return iframeAdapter(gameUrl);
  return placeholderAdapter;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function GameLauncherProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [adapter] = useState<GameAdapter>(getAdapter);

  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const preloadHinted = useRef(false);
  const startedRef = useRef(false);
  const locationRef = useRef("hero");

  /** Tear down the current game session without changing the overlay. */
  const release = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    startedRef.current = false;
    void adapter.unmount();
    if (containerRef.current) containerRef.current.replaceChildren();
  }, [adapter]);

  /**
   * Start the adapter. GameStage calls this only after its container exists,
   * which keeps the click handler free of heavy work and avoids mounting the
   * game before the overlay is on screen.
   */
  const startLoad = useCallback(() => {
    if (startedRef.current) return;

    const container = containerRef.current;
    if (!container) return;

    startedRef.current = true;
    container.replaceChildren();

    const controller = new AbortController();
    abortRef.current = controller;

    adapter
      .mount({
        container,
        onProgress: (percent) => dispatch({ type: "PROGRESS", percent }),
        signal: controller.signal,
      })
      .then(() => {
        if (controller.signal.aborted) return;
        dispatch({ type: "RUNNING" });
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        dispatch({
          type: "ERROR",
          message:
            err instanceof Error
              ? err.message
              : "The game didn\u2019t load. Check your connection and try again.",
        });
      });
  }, [adapter]);

  const launch = useCallback(
    (location: string) => {
      locationRef.current = location;

      if (state.status === "loading" || state.status === "running") return;

      track("play_now_click", { location });

      // Capability check before loading anything.
      const cap = checkCapabilities();
      if (!cap.ok) {
        dispatch({ type: "ERROR", message: cap.reason });
        return;
      }

      startedRef.current = false;
      dispatch({ type: "START" });
    },
    [state.status]
  );

  const retry = useCallback(() => {
    launch(locationRef.current);
  }, [launch]);

  const cancel = useCallback(() => {
    release();
    dispatch({ type: "RESET" });
  }, [release]);

  const exit = useCallback(() => {
    release();
    dispatch({ type: "RESET" });
  }, [release]);

  // Release the adapter if the provider ever unmounts.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      void adapter.unmount();
    };
  }, [adapter]);

  return (
    <LauncherContext.Provider
      value={{
        state,
        launch,
        retry,
        cancel,
        exit,
        startLoad,
        containerRef,
        preloadHinted,
        adapter,
      }}
    >
      {children}
    </LauncherContext.Provider>
  );
}
