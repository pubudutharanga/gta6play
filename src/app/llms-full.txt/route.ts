import { buildLlmsFullTxt } from "@/lib/llms-full";

// Prerendered at build time because it reads only build-time constants.
export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
