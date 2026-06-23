from pathlib import Path
import re
import shutil

page_path = Path("src/app/empresa/sostenibilidad/page.tsx")
fixer_path = Path("src/components/SostenibilidadOnlyNumbersFixer.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/sostenibilidad/page.tsx")

# Backups
page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-sostenibilidad-only-numbers")
if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

fixer_path.parent.mkdir(parents=True, exist_ok=True)

fixer_code = r'''"use client";

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
'''

fixer_path.write_text(fixer_code, encoding="utf-8")

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

import_line = 'import SostenibilidadOnlyNumbersFixer from "@/components/SostenibilidadOnlyNumbersFixer";\n'

if import_line not in tsx:
    # meter import después del último import
    matches = list(re.finditer(r'^import .*?;\s*$', tsx, flags=re.M))
    if not matches:
        raise SystemExit("❌ No encontré imports en page.tsx")
    last = matches[-1]
    tsx = tsx[:last.end()] + "\n" + import_line + tsx[last.end():]

if "<SostenibilidadOnlyNumbersFixer />" not in tsx:
    # meterlo después de <Header /> si existe
    if "<Header />" in tsx:
        tsx = tsx.replace("<Header />", "<Header />\n      <SostenibilidadOnlyNumbersFixer />", 1)
    else:
        # fallback: apenas dentro del primer return div
        tsx = re.sub(
            r'(<div[^>]*>)',
            r'\1\n      <SostenibilidadOnlyNumbersFixer />',
            tsx,
            count=1
        )

page_path.write_text(tsx, encoding="utf-8")

print("✅ Fixer creado:", fixer_path)
print("✅ Importado en:", page_path)
print("✅ Solo afecta /empresa/sostenibilidad")
print("✅ Backup:", page_backup)
