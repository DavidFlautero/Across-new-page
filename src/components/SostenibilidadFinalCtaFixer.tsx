"use client";

import { useEffect } from "react";

export default function SostenibilidadFinalCtaFixer() {
  useEffect(() => {
    const apply = () => {
      const cta = [...document.querySelectorAll("section")].find((section) =>
        (section.textContent || "").includes("Avancemos hacia operaciones")
      ) as HTMLElement | undefined;

      if (!cta) return;

      const button = [...cta.querySelectorAll("a")].find((a) =>
        (a.textContent || "").toUpperCase().includes("HABLAR")
      ) as HTMLElement | undefined;

      const actions = button?.parentElement as HTMLElement | null;

      if (!button || !actions) return;

      // Mantener CTA pegado al footer
      cta.style.setProperty("margin-bottom", "-1px", "important");
      cta.style.setProperty("padding-bottom", "0", "important");

      const footer = document.querySelector("footer") as HTMLElement | null;
      footer?.style.setProperty("margin-top", "0", "important");

      // Subir botón un poco
      actions.style.setProperty("transform", "translateY(-24px)", "important");
      actions.style.setProperty("position", "relative", "important");
      actions.style.setProperty("z-index", "20", "important");

      button.style.setProperty("position", "relative", "important");
      button.style.setProperty("z-index", "21", "important");
    };

    apply();

    const observer = new MutationObserver(() => apply());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", apply);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, []);

  return null;
}
