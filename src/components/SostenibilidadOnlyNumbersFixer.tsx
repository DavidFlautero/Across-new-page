"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SostenibilidadOnlyNumbersFixer() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("/empresa/sostenibilidad")) return;

    const apply = () => {
      const roots = [...document.querySelectorAll("section, main, div")].filter((el) => {
        const text = el.textContent || "";
        return (
          text.includes("Medimos") &&
          text.includes("Análisis") &&
          text.includes("Optimización")
        );
      });

      const root = roots.sort((a, b) => {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        return ar.width * ar.height - br.width * br.height;
      })[0];

      if (!root) return;

      const numbers = [...root.querySelectorAll<HTMLElement>("span, i, b, strong, div")].filter(
        (el) => {
          const txt = (el.textContent || "").trim();
          const r = el.getBoundingClientRect();

          return /^[1-6]$/.test(txt) && r.width > 10 && r.height > 10;
        }
      );

      numbers.forEach((el) => {
        el.style.setProperty("background", "transparent", "important");
        el.style.setProperty("border", "0", "important");
        el.style.setProperty("box-shadow", "none", "important");
        el.style.setProperty("width", "auto", "important");
        el.style.setProperty("height", "auto", "important");
        el.style.setProperty("min-width", "0", "important");
        el.style.setProperty("min-height", "0", "important");
        el.style.setProperty("border-radius", "0", "important");
        el.style.setProperty("padding", "0", "important");
        el.style.setProperty("color", "#173247", "important");
        el.style.setProperty("font-weight", "950", "important");
        el.style.setProperty("font-size", "1rem", "important");
        el.style.setProperty("line-height", "1", "important");
      });
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
  }, [pathname]);

  return null;
}
