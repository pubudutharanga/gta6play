// src/lib/analytics.ts — Analytics hook. No-op unless a provider is present.

export function track(event: string, data?: Record<string, unknown>): void {
  // Plausible
  if (typeof window !== "undefined" && "plausible" in window) {
    (window as unknown as { plausible: (e: string, o: { props: Record<string, unknown> }) => void }).plausible(event, { props: data ?? {} });
    return;
  }
  // GA4
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", event, data);
    return;
  }
  // No-op in development or when no provider is configured
}
