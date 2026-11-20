"use client";

// src/components/play/LauncherRoot.tsx
// Mounts the launcher provider around the app and lazy-loads the stage
// only after the first Play now activation.

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { GameLauncherProvider, useGameLauncher } from "./GameLauncherProvider";

const GameStage = dynamic(() => import("./GameStage"), { ssr: false });

function StageGate() {
  const { state } = useGameLauncher();
  if (state.status === "idle") return null;
  return <GameStage />;
}

export function LauncherRoot({ children }: { children: ReactNode }) {
  return (
    <GameLauncherProvider>
      {children}
      <StageGate />
    </GameLauncherProvider>
  );
}
