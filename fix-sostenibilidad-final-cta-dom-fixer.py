from pathlib import Path
import re
import shutil

page_path = Path("src/app/empresa/sostenibilidad/page.tsx")
fixer_path = Path("src/components/SostenibilidadFinalCtaFixer.tsx")
globals_path = Path("src/app/globals.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/sostenibilidad/page.tsx")

# Backups
page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-final-cta-dom-fixer")
if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if globals_path.exists():
    globals_backup = globals_path.with_suffix(globals_path.suffix + ".bak-before-clean-final-cta-css")
    if not globals_backup.exists():
        shutil.copy2(globals_path, globals_backup)

# 1) Limpiar el CSS anterior que NO pegó
if globals_path.exists():
    css = globals_path.read_text(encoding="utf-8", errors="ignore")

    markers = [
        ("/* === SOSTENIBILIDAD FINAL CTA FOOTER BUTTON START === */", "/* === SOSTENIBILIDAD FINAL CTA FOOTER BUTTON END === */"),
    ]

    for start, end in markers:
        css = re.sub(
            re.escape(start) + r"[\s\S]*?" + re.escape(end),
            "",
            css,
            flags=re.M
        ).rstrip()

    globals_path.write_text(css + "\n", encoding="utf-8")
    print("✅ Limpié CSS anterior que no aplicó")

# 2) Crear fixer exacto igual al DevTools aprobado
fixer_code = r'''"use client";

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
'''

fixer_path.write_text(fixer_code, encoding="utf-8")
print("✅ Fixer creado:", fixer_path)

# 3) Importar fixer en la página de sostenibilidad
tsx = page_path.read_text(encoding="utf-8", errors="ignore")

import_line = 'import SostenibilidadFinalCtaFixer from "@/components/SostenibilidadFinalCtaFixer";\n'

if import_line not in tsx:
    imports = list(re.finditer(r'^import .*?;\s*$', tsx, flags=re.M))
    if not imports:
        raise SystemExit("❌ No encontré imports en page.tsx")
    last = imports[-1]
    tsx = tsx[:last.end()] + "\n" + import_line + tsx[last.end():]
    print("✅ Import agregado")

if "<SostenibilidadFinalCtaFixer />" not in tsx:
    if "<Header />" in tsx:
        tsx = tsx.replace("<Header />", "<Header />\n      <SostenibilidadFinalCtaFixer />", 1)
    else:
        tsx = re.sub(
            r'(<div[^>]*>)',
            r'\1\n      <SostenibilidadFinalCtaFixer />',
            tsx,
            count=1
        )
    print("✅ Fixer insertado en la página")

page_path.write_text(tsx, encoding="utf-8")

print("✅ Cambio real aplicado con la misma lógica del DevTools")
print("✅ Backup page:", page_backup)
