// src/lib/webgl.ts — Capability check before loading the game.

export type CapabilityResult =
  | { ok: true; api: "webgpu" | "webgl2" }
  | { ok: false; reason: string };

export function checkCapabilities(): CapabilityResult {
  // Check WebGPU first (preferred)
  if (typeof navigator !== "undefined" && "gpu" in navigator) {
    return { ok: true, api: "webgpu" };
  }

  // Check WebGL 2
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (gl) {
      return { ok: true, api: "webgl2" };
    }
  } catch {
    // fall through
  }

  return {
    ok: false,
    reason:
      "This browser can\u2019t run the game. Update Chrome, Edge, Firefox or Safari, or open the page on a desktop computer.",
  };
}

/** Returns true if the viewport is probably a phone (too small for the game). */
export function isSmallViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768 || window.innerHeight < 500;
}
