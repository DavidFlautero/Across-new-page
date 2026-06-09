"use client";

import { useEffect } from "react";

export default function HeaderScrollClass() {
  useEffect(() => {
    const updateHeaderState = () => {
      const hero =
        document.querySelector('[class*="Hero_hero"]') ||
        document.querySelector("main section:first-child") ||
        document.querySelector("section");

      if (!hero) {
        document.body.classList.toggle("across-header-solid", window.scrollY > window.innerHeight);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const heroBottom = rect.bottom + window.scrollY;

      // Cambia justo cuando termina el hero.
      const shouldBeSolid = window.scrollY >= heroBottom - 8;

      document.body.classList.toggle("across-header-solid", shouldBeSolid);
    };

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);
    window.addEventListener("orientationchange", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      window.removeEventListener("orientationchange", updateHeaderState);
      document.body.classList.remove("across-header-solid");
    };
  }, []);

  return null;
}
