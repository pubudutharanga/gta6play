// src/components/sections/Footer.tsx
// Footer with wordmark, links, notice, and contact.

import { siteConfig, getDisclaimer } from "@/config/site";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  { label: "Play", href: "#play" },
  { label: "Screenshots", href: "#scenes" },
  { label: "How to play", href: "#how-to-play" },
  { label: "Controls", href: "#controls" },
  { label: "Requirements", href: "#requirements" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="bg-dusk-deep py-12 md:py-16">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Wordmark and links */}
          <div>
            <span className="font-display text-xl font-extrabold tracking-tight text-sand">
              {siteConfig.name}
            </span>
            <nav aria-label="Footer navigation" className="mt-4">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-haze transition-colors hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div className="text-right">
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-body text-sm text-lagoon hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
            >
              {siteConfig.contactEmail}
            </a>
            {siteConfig.socialProfiles.length > 0 && (
              <div className="mt-2 flex justify-end gap-3">
                {siteConfig.socialProfiles.map((url) => (
                  <a
                    key={url}
                    href={url}
                    className="font-body text-sm text-haze hover:text-sand"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {new URL(url).hostname}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-10 max-w-3xl font-body text-xs leading-relaxed text-haze/70">
          {getDisclaimer()}
        </p>

        {/* Privacy */}
        <p className="mt-3 font-body text-xs text-haze/70">
          {siteConfig.privacyNotice}
        </p>

        {/* Meta line */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-haze/10 pt-6">
          <span className="font-body text-xs text-haze/70">
            Last updated: {siteConfig.lastUpdated}
          </span>
          <span className="font-body text-xs text-haze/70">
            &copy; {siteConfig.publisher}. All rights reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
}
