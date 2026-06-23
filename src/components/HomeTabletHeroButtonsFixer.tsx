"use client";

import { useEffect } from "react";

export default function HomeTabletHeroButtonsFixer() {
  useEffect(() => {
    const STYLE_ID = "home-tablet-hero-buttons-fix";

    document.getElementById(STYLE_ID)?.remove();

    document
      .querySelectorAll("[data-home-hero-buttons-fix]")
      .forEach((el) => el.removeAttribute("data-home-hero-buttons-fix"));

    const headings = [...document.querySelectorAll("h1")];

    const heroTitle = headings.find((el) =>
      (el.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .includes("Su operación logística")
    );

    const heroSection = heroTitle?.closest("section");

    if (heroSection) {
      heroSection.setAttribute("data-home-hero-buttons-fix", "true");
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;

    style.textContent = `
      /* SOLO TABLET: botones del HERO HOME sin tocarse */
      @media (min-width: 761px) and (max-width: 1180px) {
        [data-home-hero-buttons-fix="true"] [class*="actions"],
        [data-home-hero-buttons-fix="true"] [class*="Actions"] {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: stretch !important;
          justify-content: flex-start !important;
          gap: 1rem !important;
          width: min(100%, 560px) !important;
          max-width: 560px !important;
        }

        [data-home-hero-buttons-fix="true"] [class*="actions"] a,
        [data-home-hero-buttons-fix="true"] [class*="Actions"] a,
        [data-home-hero-buttons-fix="true"] [class*="actions"] button,
        [data-home-hero-buttons-fix="true"] [class*="Actions"] button {
          flex: 1 1 0 !important;
          min-width: 0 !important;
          width: auto !important;
          max-width: none !important;
          margin: 0 !important;
          padding-left: .95rem !important;
          padding-right: .95rem !important;
          white-space: normal !important;
          text-align: center !important;
          line-height: 1.08 !important;
          font-size: clamp(.62rem, .95vw, .76rem) !important;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.getElementById(STYLE_ID)?.remove();

      document
        .querySelectorAll("[data-home-hero-buttons-fix]")
        .forEach((el) => el.removeAttribute("data-home-hero-buttons-fix"));
    };
  }, []);

  return null;
}
