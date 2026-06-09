"use client";

import { useEffect } from "react";

export default function HeaderScrollClass() {
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const getHeroBottom = () => {
      const hero =
        document.querySelector('[class*="Hero_hero"]') ||
        document.querySelector("main section:first-child") ||
        document.querySelector("section");

      if (!hero) return window.innerHeight;

      const rect = hero.getBoundingClientRect();
      return rect.bottom + window.scrollY;
    };

    const updateHeaderState = () => {
      const currentY = window.scrollY;
      const heroBottom = getHeroBottom();

      const isPastHero = currentY >= heroBottom - 8;
      const isScrollingDown = currentY > lastY + 6;
      const isScrollingUp = currentY < lastY - 6;

      document.body.classList.toggle("across-header-solid", isPastHero);

      /*
        Mobile/pro behavior:
        - En hero: visible.
        - Pasado el hero y bajando: se oculta.
        - Subiendo: aparece.
      */
      if (isPastHero && isScrollingDown && currentY > heroBottom + 80) {
        document.body.classList.add("across-header-hidden");
      }

      if (!isPastHero || isScrollingUp) {
        document.body.classList.remove("across-header-hidden");
      }

      lastY = Math.max(currentY, 0);
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderState);
        ticking = true;
      }
    };

    updateHeaderState();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("orientationchange", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("orientationchange", requestUpdate);
      document.body.classList.remove("across-header-solid");
      document.body.classList.remove("across-header-hidden");
    };
  }, []);

  return null;
}
