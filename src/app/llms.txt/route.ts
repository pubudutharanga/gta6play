import { buildLlmsTxt } from "@/lib/llms";

// Prerendered at build time because it reads only build-time constants.
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
