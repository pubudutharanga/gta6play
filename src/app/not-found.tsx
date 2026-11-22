import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for isn't here. Head back to GTA VI and press Play now.",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen flex-col items-center justify-center px-5 text-center"
    >
      <p className="font-display text-[clamp(4rem,16vw,10rem)] font-extrabold leading-none text-flamingo">
        404
      </p>
      <h1 className="mt-4 font-display text-[clamp(1.75rem,5vw,3rem)] font-extrabold text-sand">
        This street doesn&rsquo;t exist
      </h1>
      <p className="mt-4 max-w-md font-body text-base leading-relaxed text-haze">
        The page you were looking for isn&rsquo;t here. Head back to {siteConfig.name}{" "}
        and press Play now.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-[6px] bg-gradient-to-r from-flamingo to-tangerine px-8 font-display font-extrabold uppercase tracking-wide text-dusk focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-lagoon"
      >
        Back to the game
      </Link>
    </main>
  );
}
