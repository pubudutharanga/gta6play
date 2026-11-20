// src/components/ui/SkipLink.tsx — Skip to main content link.

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-lagoon focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:font-semibold focus:text-dusk focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
