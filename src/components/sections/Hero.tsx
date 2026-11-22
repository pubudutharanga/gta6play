import Image from "next/image";
import { hero } from "@/content/content";
import { heroScreenshot, sceneScreenshots } from "@/content/screenshots";
import { PlayButton } from "@/components/play/PlayButton";
import { HeroStage } from "@/components/ui/HeroStage";

// The hero is a Server Component so the LCP image is rendered on the server
// and preloaded from the document head. Only the scene switcher is client-side.
export function Hero() {
  return (
    <HeroStage
      scenes={sceneScreenshots}
      heroImage={
        <Image
          src={heroScreenshot.src}
          alt={heroScreenshot.alt}
          fill
          sizes="100vw"
          preload
          fetchPriority="high"
          className="object-cover"
          style={{ objectPosition: heroScreenshot.focal }}
          quality={75}
        />
      }
    >
      <h1 className="font-display font-extrabold leading-[0.85] tracking-tight text-sand">
        <span className="block text-[clamp(5rem,19vw,17rem)] uppercase">
          {hero.title}
        </span>
        <span className="sr-only">: </span>
        <span className="mt-2 block text-[clamp(1.5rem,4vw,3rem)] normal-case">
          {hero.subtitle}
        </span>
      </h1>

      <p className="mt-5 max-w-lg font-body text-lg leading-relaxed text-sand/90 md:text-xl">
        {hero.description}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <PlayButton variant="hero" />
        <span className="font-body text-sm text-haze">{hero.microcopy}</span>
      </div>

      <noscript>
        <p className="mt-4 font-body text-sm text-tangerine">
          Turn on JavaScript to play GTA VI in your browser.
        </p>
      </noscript>
    </HeroStage>
  );
}
