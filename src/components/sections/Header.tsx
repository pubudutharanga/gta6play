"use client";

// src/components/sections/Header.tsx — Sticky header with wordmark, nav links, and compact Play now.

import { useEffect, useState, useCallback } from "react";
import { PlayButton } from "@/components/play/PlayButton";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Scenes", href: "#scenes" },
  { label: "How to play", href: "#how-to-play" },
  { label: "Controls", href: "#controls" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [showPlayBtn, setShowPlayBtn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Sentinel observer for solid background
  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Observer for the hero Play button (not the header/CTA copies).
  useEffect(() => {
    const heroBtn = document.querySelector(
      '#play [data-play-location="hero"]'
    );
    if (!heroBtn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowPlayBtn(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(heroBtn);
    return () => observer.disconnect();
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        solid
          ? "bg-dusk-deep/95 backdrop-blur-md shadow-lg shadow-dusk-deep/30"
          : "bg-transparent"
      }`}
      style={{ height: siteConfig.headerHeight }}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Wordmark */}
        <a
          href="#play"
          className="font-display text-xl font-extrabold tracking-tight text-sand"
          aria-label={`${siteConfig.name} — back to top`}
        >
          {siteConfig.name}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-haze transition-colors hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lagoon"
            >
              {link.label}
            </a>
          ))}
          <div
            className={`transition-opacity duration-200 ${
              showPlayBtn
                ? "visible opacity-100"
                : "invisible opacity-0"
            }`}
            aria-hidden={!showPlayBtn}
            inert={!showPlayBtn}
          >
            <PlayButton variant="header" />
          </div>
        </div>

        {/* Mobile: compact play + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <div
            className={`transition-opacity duration-200 ${
              showPlayBtn
                ? "visible opacity-100"
                : "invisible opacity-0"
            }`}
            aria-hidden={!showPlayBtn}
            inert={!showPlayBtn}
          >
            <PlayButton variant="header" />
          </div>
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-md p-2 text-sand hover:bg-dusk/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-haze/10 bg-dusk-deep/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-1 px-5 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2.5 font-body text-base text-haze transition-colors hover:bg-dusk/50 hover:text-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-lagoon"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
