// src/components/play/types.ts — The game adapter interface (the "seam").

export type LaunchStatus = "idle" | "loading" | "running" | "error";

export interface GameAdapter {
  /** Optional. Warm caches on user intent. Must be idempotent. */
  preload?: () => void;

  /** Load and start the game inside `container`. Resolve when it is playable. */
  mount(args: {
    container: HTMLElement;
    onProgress: (percent: number) => void; // 0 to 100
    signal: AbortSignal; // aborted on Cancel or Exit
  }): Promise<void>;

  /** Release everything: audio, pointer lock, listeners, workers, object URLs. */
  unmount(): void | Promise<void>;
}
