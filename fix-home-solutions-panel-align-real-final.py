from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-align-real-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === HOME SOLUTIONS PANEL ALIGN WITH FIRST CARD REAL FINAL === */"

patch = r'''
/* === HOME SOLUTIONS PANEL ALIGN WITH FIRST CARD REAL FINAL === */

/* Alinear el cuadro derecho con el inicio de Transporte Aéreo */
@media (min-width: 901px) {
  aside[class*="solutionsPanel"],
  .solutionsPanel {
    align-self: start !important;
    transform: translateY(0) !important;
    margin-top: 5.85rem !important;
  }
}

/* iPad / tablet horizontal */
@media (min-width: 901px) and (max-width: 1180px) {
  aside[class*="solutionsPanel"],
  .solutionsPanel {
    align-self: start !important;
    transform: translateY(0) !important;
    margin-top: 5.35rem !important;
  }
}

/* Desktop grande */
@media (min-width: 1281px) {
  aside[class*="solutionsPanel"],
  .solutionsPanel {
    align-self: start !important;
    transform: translateY(0) !important;
    margin-top: 5.95rem !important;
  }
}
'''

if marker in css:
    css = re.sub(
        r'/\* === HOME SOLUTIONS PANEL ALIGN WITH FIRST CARD REAL FINAL === \*/[\s\S]*?(?=\n/\* ===|\Z)',
        patch.strip(),
        css,
        flags=re.M,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Alineación real aplicada al panel derecho")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
