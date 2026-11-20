// src/lib/ads.ts — Popunder tag loader and URL capture.
//
// The popunder tag opens its ad by calling window.open() from a document-level
// click listener. That listener also stops the click before React sees it, so
// PlayButton launches the fake game from a window-level capture listener.
//
// We do not want the ad to cover the loading screen, so the tag's popunder URL
// is captured instead of opened. openCapturedPopunder() releases it once the
// fake game reaches its "running" state.

export const POPUNDER_SRC =
  "https://benchform.org/1/cd3c47b518f01cb1383c2606ec3e3ba9";

/** Placement key, used to tell this tag's popunder apart from other ads. */
const POPUNDER_KEY = POPUNDER_SRC.slice(POPUNDER_SRC.lastIndexOf("/") + 1);

let primed = false;
let armed = false;
let capturedAdUrl: string | null = null;

type AdWindow = Window & { __gta6PopunderCapture?: boolean };

/**
 * Hold popunder URLs instead of opening them. Other window.open() calls (for
 * example the social-bar ad) pass through untouched. The tag ignores the
 * return value of window.open(), so returning null is enough to delay it.
 */
function installPopunderCapture(): void {
  if (typeof window === "undefined") return;

  const adWindow = window as AdWindow;
  if (adWindow.__gta6PopunderCapture) return;
  adWindow.__gta6PopunderCapture = true;

  const open = window.open.bind(window);

  window.open = function (
    url?: string | URL,
    target?: string,
    features?: string
  ): Window | null {
    const href =
      typeof url === "string" ? url : url instanceof URL ? url.href : "";

    const isPopunderCall =
      (armed && /^https?:\/\//i.test(href)) || href.includes(POPUNDER_KEY);

    if (isPopunderCall) {
      armed = false;
      if (!capturedAdUrl) capturedAdUrl = href;
      return null;
    }

    return open(url, target, features);
  } as typeof window.open;
}

/**
 * Arm capture for the next popunder, e.g. when the Play button is clicked.
 * The ad tag only calls window.open() during a real user click, so arming
 * there lets us hold the URL before the game finishes loading.
 */
export function armPopunderCapture(): void {
  armed = true;
}

/** Inject the popunder tag once and start holding its popunder URL. */
export function primePopunder(): void {
  if (typeof document === "undefined") return;

  installPopunderCapture();

  if (primed) return;

  if (document.querySelector(`script[src="${POPUNDER_SRC}"]`)) {
    primed = true;
    return;
  }

  primed = true;

  const script = document.createElement("script");
  script.src = POPUNDER_SRC;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  document.body.appendChild(script);
}

/**
 * Open the popunder captured from the last Play click in a new tab. Returns
 * true when a held URL was released. Called when the fake game finishes
 * loading.
 */
export function openCapturedPopunder(): boolean {
  // Nothing is held for the next round unless it is re-armed.
  armed = false;
  if (typeof document === "undefined" || !capturedAdUrl) return false;

  const url = capturedAdUrl;
  capturedAdUrl = null;

  // A programmatic anchor click opens a new tab reliably, even without a
  // fresh user gesture at the end of the fake load.
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();

  return true;
}
