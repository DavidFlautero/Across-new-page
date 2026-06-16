"use client";

import { useEffect } from "react";

export default function MobileTrustSectionCutFixer() {
  useEffect(() => {
    const TOP_CUT = 105;
    const BOTTOM_CUT = 150;

    const norm = (s: string | null | undefined) =>
      (s || "").trim().replace(/\s+/g, " ").toLowerCase();

    const applyCut = () => {
      const title = [...document.querySelectorAll<HTMLElement>("h1,h2,h3")].find((el) => {
        const t = norm(el.textContent);
        return (
          t.includes("experiencia") &&
          t.includes("certificaciones") &&
          t.includes("red global")
        );
      });

      if (!title) return;

      const section =
        title.closest("section") ||
        title.closest('[class*="cert"]') ||
        title.closest('[class*="trust"]') ||
        title.parentElement;

      if (!section) return;

      section.setAttribute("data-mobile-trust-cut-section", "true");

      let style = document.querySelector<HTMLStyleElement>("#mobile-trust-section-cut-style");

      if (!style) {
        style = document.createElement("style");
        style.id = "mobile-trust-section-cut-style";
        document.head.appendChild(style);
      }

      style.textContent = `
        @media (max-width: 768px) {
          [data-mobile-trust-cut-section="true"] {
            clip-path: inset(${TOP_CUT}px 0 ${BOTTOM_CUT}px 0) !important;

            margin-top: -${TOP_CUT}px !important;
            margin-bottom: -${BOTTOM_CUT}px !important;

            overflow: hidden !important;
            position: relative !important;
          }
        }
      `;
    };

    applyCut();

    const timeouts = [120, 400, 900].map((ms) =>
      window.setTimeout(applyCut, ms)
    );

    const observer = new MutationObserver(() => {
      applyCut();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      timeouts.forEach(window.clearTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
