// src/components/seo/JsonLd.tsx — Renders the JSON-LD script tag.

import { buildJsonLd } from "@/lib/seo";

export function JsonLd() {
  const json = buildJsonLd();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
