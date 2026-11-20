# Connecting the game

The page is finished. The game is not. This document is the seam between them.

There are two supported ways to plug a build in. Both go through the same
`GameAdapter` interface in `src/components/play/types.ts`:

```ts
export type LaunchStatus = "idle" | "loading" | "running" | "error";

export interface GameAdapter {
  preload?: () => void; // warm caches on hover/focus/touch; must be idempotent
  mount(args: {
    container: HTMLElement;
    onProgress: (percent: number) => void; // 0 to 100, or -1 while indeterminate
    signal: AbortSignal; // aborted on Cancel or Exit
  }): Promise<void>;
  unmount(): void | Promise<void>;
}
```

The overlay, loading screen, Cancel/Exit handling, progress announcements and
focus trap are already built. An adapter only owns the game surface.

---

## Recipe 1 — iframe (fastest, zero code)

1. Host the game build on an HTTPS origin.
2. Set `NEXT_PUBLIC_GAME_URL=https://game.example.com` in `.env.local`.
3. Rebuild and redeploy.

`src/components/play/adapters/iframeAdapter.ts` is selected automatically when
the variable is non-empty. It:

- creates the iframe only after Play now is activated,
- sets `allow="fullscreen; gamepad; autoplay"` and `allowfullscreen`,
- reports indeterminate progress until the iframe `load` event,
- removes the iframe on Cancel or Exit.

The game origin must allow embedding:

```http
Content-Security-Policy: frame-ancestors 'self' https://gta6play.vercel.app
```

If the game needs a microphone, camera or other permission, add it to the
`allow` attribute and to `Permissions-Policy` in `next.config.ts`. Keep the
policy tight: the default disables camera, microphone and geolocation.

---

## Recipe 2 — client module + canvas (recommended for engines)

Create `src/components/play/adapters/engineAdapter.ts`:

```ts
import type { GameAdapter } from "../types";

export function engineAdapter(): GameAdapter {
  let canvas: HTMLCanvasElement | null = null;
  let cleanup: (() => void) | null = null;

  return {
    preload() {
      // Optional: fetch the wasm binary or warm the asset CDN with HEAD requests.
    },

    async mount({ container, onProgress, signal }) {
      canvas = document.createElement("canvas");
      canvas.style.cssText = "width:100%;height:100%;display:block;";
      container.appendChild(canvas);

      const { startGame } = await import("@/game/bootstrap");
      const handle = await startGame({
        canvas,
        onProgress,
        signal,
        assetBase: "/game/",
      });

      if (signal.aborted) {
        handle.dispose();
        return;
      }

      cleanup = () => handle.dispose();
    },

    unmount() {
      cleanup?.();
      cleanup = null;
      canvas?.remove();
      canvas = null;
    },
  };
}
```

Then select it in `src/components/play/GameLauncherProvider.tsx`:

```ts
import { engineAdapter } from "./adapters/engineAdapter";

function getAdapter(): GameAdapter {
  const gameUrl = process.env.NEXT_PUBLIC_GAME_URL ?? "";
  if (gameUrl) return iframeAdapter(gameUrl);
  return engineAdapter();
}
```

Keep the dynamic `import()` inside `mount()`. That is what guarantees no game
JavaScript is downloaded before the visitor presses Play now.

### The `startGame` contract

- Create the WebGL 2 or WebGPU context on the supplied canvas.
- Call `onProgress(n)` while loading, where `n` is 0–100. The overlay announces
  25, 50, 75 and 100 to screen readers, so do not spam milestones.
- Abort promptly when `signal` aborts: stop fetches, cancel `requestAnimationFrame`,
  close workers and release the context.
- Resolve `mount()` only when the game is interactive. The loading screen stays
  up until then.
- `handle.dispose()` must stop audio, end pointer lock, remove listeners, close
  workers, terminate WASM instances and revoke object URLs.

The provider keeps one persistent container mounted while the overlay is open,
so the game is never re-parented between loading and running states.

---

## Recipe 3 — engine loader script (Unity, Godot, Emscripten)

### Unity WebGL

Unity's loader is a script, not an ES module, so load it from `mount()`:

```ts
async mount({ container, onProgress, signal }) {
  const unityCanvas = document.createElement("canvas");
  unityCanvas.id = "unity-canvas";
  container.appendChild(unityCanvas);

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/game/Build/Build.loader.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("The game didn't load. Check your connection and try again."));
    document.body.appendChild(script);
  });

  const createUnityInstance = (window as any).createUnityInstance;
  const instance = await createUnityInstance(unityCanvas, {
    dataUrl: "/game/Build/Build.data.br",
    frameworkUrl: "/game/Build/Build.framework.js.br",
    codeUrl: "/game/Build/Build.wasm.br",
    streamingAssetsUrl: "/game/StreamingAssets",
    companyName: "Your Studio",
    productName: "GTA VI",
    productVersion: "1.0",
    showBanner: (msg: string, type: string) => {
      if (type === "error" || type === "warning") console.warn(msg);
    },
  }, (progress: number) => onProgress(Math.round(progress * 100)));

  signal.addEventListener("abort", () => instance.Quit(), { once: true });
},
```

### Godot 4 (Web export)

The export ships `index.html`, `*.js`, `*.wasm` and `*.pck`. Embed the play page
in an iframe (Recipe 1) or import the generated JS module and call
`Engine.startGame()` with the canvas and progress callback.

### Emscripten

```ts
const module = await import("/game/app.js");
const instance = await module.default({
  canvas,
  print: () => {},
  locateFile: (file: string) => `/game/${file}`,
  onRuntimeInitialized: () => resolvePlayable(),
  setStatus: (text: string) => parseProgress(text, onProgress),
});
```

---

## Hosting headers

Serve the game build and the page from the same site when possible.

```http
# Immutable assets (hashed filenames)
Cache-Control: public, max-age=31536000, immutable

# Wasm, data, pck
Content-Type: application/wasm
Content-Encoding: br   # only when the file is actually Brotli-compressed

# CORS, required when the game is on another origin
Access-Control-Allow-Origin: https://gta6play.vercel.app
Cross-Origin-Resource-Policy: cross-origin
```

Use Brotli for `.wasm`, `.js` and `.data`; most CDNs do this automatically.
Do not enable `Content-Encoding` on files that are not compressed.

### SharedArrayBuffer (COOP/COEP)

Some engines use threads and need cross-origin isolation. Enabling it app-wide
breaks third-party embeds, so do it only for a dedicated game origin:

```http
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: cross-origin
```

If the whole site must be isolated, add the same headers to `next.config.ts`
and add `crossorigin` to every external asset. The current site deliberately
omits COOP/COEP so nothing else breaks.

---

## Browser APIs the overlay already handles

- **Fullscreen:** the Fullscreen button requests fullscreen on the dialog.
- **Pointer lock:** the game requests it; Escape is left to the browser while
  running (the dialog does not close on Escape in the running state).
- **Gamepad:** the iframe `allow` list includes `gamepad`; direct adapters can
  use the Gamepad API without extra setup.
- **Audio unlock:** the first Play now activation is a user gesture, so call
  `audioContext.resume()` inside `mount()`.
- **Progress:** call `onProgress(-1)` only when progress is truly unknown.
  Use 0–100 otherwise.

## Keeping the page static and indexable

- Never import game code at module scope in a Server Component.
- Keep dynamic imports inside `mount()` or inside the client overlay.
- Do not fetch game data during server rendering.
- Do not add a nonce-based CSP just for the game; it would force dynamic
  rendering. Prefer a separate game origin.
- After changing anything, run `npm run build` and confirm the route table
  still marks `/`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` and
  `/llms.txt` as static. `ensureStatic = "navigation"` in the root layout
  fails the build if request-time work sneaks in.
