import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { QuickAnswer } from "@/components/sections/QuickAnswer";
import { Features } from "@/components/sections/Features";
import { Screenshots } from "@/components/sections/Screenshots";
import { HowToPlay } from "@/components/sections/HowToPlay";
import { Controls } from "@/components/sections/Controls";
import { Requirements } from "@/components/sections/Requirements";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <QuickAnswer />
        <Features />
        <Screenshots />
        <HowToPlay />
        <Controls />
        <Requirements />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
