// src/components/play/adapters/iframeAdapter.ts
// Adapter used when NEXT_PUBLIC_GAME_URL is set. Loads the game in an iframe.

import type { GameAdapter } from "../types";

export function iframeAdapter(url: string): GameAdapter {
  let iframe: HTMLIFrameElement | null = null;
  let preconnected = false;

  return {
    preload() {
      if (preconnected) return;
      preconnected = true;
      try {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = new URL(url).origin;
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      } catch {
        // Invalid URL: leave it to mount() to surface the failure.
      }
    },

    async mount({ container, onProgress, signal }) {
      if (signal.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.allow = "fullscreen; gamepad; autoplay; xr-spatial-tracking";
      iframe.allowFullscreen = true;
      iframe.style.cssText =
        "width:100%;height:100%;border:none;background:#120A2B;";
      iframe.title = "GTA VI game";

      let loaded = false;
      const timer = window.setInterval(() => {
        if (!loaded) onProgress(-1); // indeterminate
      }, 500);

      const loadPromise = new Promise<void>((resolve, reject) => {
        const onAbort = () => {
          window.clearInterval(timer);
          reject(new DOMException("Aborted", "AbortError"));
        };
        signal.addEventListener("abort", onAbort, { once: true });

        iframe!.addEventListener(
          "load",
          () => {
            loaded = true;
            window.clearInterval(timer);
            signal.removeEventListener("abort", onAbort);
            onProgress(100);
            resolve();
          },
          { once: true }
        );
        iframe!.addEventListener(
          "error",
          () => {
            loaded = true;
            window.clearInterval(timer);
            signal.removeEventListener("abort", onAbort);
            reject(
              new Error(
                "The game didn\u2019t load. Check your connection and try again."
              )
            );
          },
          { once: true }
        );
      });

      container.appendChild(iframe);
      await loadPromise;
    },

    unmount() {
      if (iframe) {
        iframe.remove();
        iframe = null;
      }
    },
  };
}
