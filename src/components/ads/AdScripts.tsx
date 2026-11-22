import Script from "next/script";
import { POPUNDER_SRC, SOCIAL_BAR_SRC } from "@/lib/ads";

export function AdScripts() {
  return (
    <>
      <Script
        id="popunder-ad"
        src={POPUNDER_SRC}
        strategy="afterInteractive"
        data-cfasync="false"
      />
      <Script
        id="social-bar"
        src={SOCIAL_BAR_SRC}
        strategy="afterInteractive"
        data-cfasync="false"
      />
    </>
  );
}
