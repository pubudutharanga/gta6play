// src/components/play/adapters/placeholderAdapter.ts
// Default adapter that simulates loading for ~3 seconds, then shows a message.

import type { GameAdapter } from "../types";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

let placeholderNode: HTMLElement | null = null;

export const placeholderAdapter: GameAdapter = {
  async mount({ container, onProgress, signal }) {
    const duration = 3000;
    const start = performance.now();

    await new Promise<void>((resolve, reject) => {
      function tick() {
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        const elapsed = performance.now() - start;
        const t = Math.min(elapsed / duration, 1);
        onProgress(Math.round(easeOutCubic(t) * 100));
        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(tick);
    });

    if (signal.aborted) return;

    const msg = document.createElement("div");
    msg.style.cssText =
      "display:flex;align-items:center;justify-content:center;height:100%;width:100%;color:#FFEBCB;font-size:1.25rem;text-align:center;padding:2rem;font-family:var(--font-body),sans-serif;";
    msg.textContent =
      "The game build isn't connected yet. See INTEGRATION.md.";
    container.appendChild(msg);
    placeholderNode = msg;
  },

  unmount() {
    placeholderNode?.remove();
    placeholderNode = null;
  },
};
