"use client";

import { useEffect } from "react";

export default function GlobalCtaStyleFixer() {
  useEffect(() => {
    const norm = (s: string | null | undefined) =>
      (s || "").trim().replace(/\s+/g, " ").toLowerCase();

    const ctaTexts = [
      "solicite su presupuesto ahora",
      "solicitar presupuesto ahora",
      "hablar con un especialista",
      "solicitar una llamada",
    ];

    const applyCtaStyle = () => {
      const buttons = [...document.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>("a, button")]
        .filter((el) => {
          const txt = norm(el.textContent);
          const rect = el.getBoundingClientRect();

          return (
            rect.width > 80 &&
            rect.height > 20 &&
            ctaTexts.some((t) => txt.includes(t))
          );
        });

      buttons.forEach((btn) => {
        btn.style.setProperty(
          "background",
          "radial-gradient(circle at 18% 0, rgba(255,255,255,.16), transparent 34%), linear-gradient(135deg, #07111d 0%, #0d1c2b 48%, #14344a 100%)",
          "important"
        );

        btn.style.setProperty("background-color", "#07111d", "important");
        btn.style.setProperty(
          "background-image",
          "radial-gradient(circle at 18% 0, rgba(255,255,255,.16), transparent 34%), linear-gradient(135deg, #07111d 0%, #0d1c2b 48%, #14344a 100%)",
          "important"
        );

        btn.style.setProperty("color", "#f4efe4", "important");
        btn.style.setProperty("-webkit-text-fill-color", "#f4efe4", "important");

        btn.style.setProperty("border", "1px solid rgba(214,192,141,.62)", "important");
        btn.style.setProperty("border-radius", "999px", "important");

        btn.style.setProperty(
          "box-shadow",
          "0 16px 34px rgba(0,0,0,.34), 0 0 20px rgba(214,192,141,.12), inset 0 1px 0 rgba(255,255,255,.16)",
          "important"
        );

        btn.style.setProperty("opacity", "1", "important");
        btn.style.setProperty("filter", "none", "important");
        btn.style.setProperty("mix-blend-mode", "normal", "important");

        btn.style.setProperty("font-weight", "950", "important");
        btn.style.setProperty("letter-spacing", ".075em", "important");
        btn.style.setProperty("text-transform", "uppercase", "important");
        btn.style.setProperty("text-shadow", "none", "important");
        btn.style.setProperty("text-decoration", "none", "important");

        btn.querySelectorAll<HTMLElement>("*").forEach((child) => {
          child.style.setProperty("color", "#f4efe4", "important");
          child.style.setProperty("-webkit-text-fill-color", "#f4efe4", "important");
        });
      });
    };

    applyCtaStyle();

    const timeouts = [120, 400, 900].map((ms) =>
      window.setTimeout(applyCtaStyle, ms)
    );

    const observer = new MutationObserver(() => {
      applyCtaStyle();
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
