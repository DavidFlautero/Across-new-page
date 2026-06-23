from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-solutions-align-first-card")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === HOME SOLUTIONS PANEL POSITION FINAL === */"

patch = r'''
/* === HOME SOLUTIONS PANEL POSITION FINAL === */

/* Alinear cuadro derecho con la primera card izquierda: Transporte Aéreo */
@media (min-width: 901px) {
  .solutionsPanel {
    align-self: start !important;
    transform: none !important;
    margin-top: 3.75rem !important;
  }
}

/* Tablet tipo iPad: necesita un poco menos para no bajarlo demasiado */
@media (min-width: 901px) and (max-width: 1180px) {
  .solutionsPanel {
    align-self: start !important;
    transform: none !important;
    margin-top: 3.25rem !important;
  }
}

/* Desktop grande: alineado con inicio de la lista */
@media (min-width: 1281px) {
  .solutionsPanel {
    align-self: start !important;
    transform: none !important;
    margin-top: 3.85rem !important;
  }
}
'''

if marker in css:
    css = re.sub(
        r'/\* === HOME SOLUTIONS PANEL POSITION FINAL === \*/[\s\S]*?(?=\n/\* ===|\Z)',
        patch.strip(),
        css,
        flags=re.M,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Cuadro derecho alineado con Transporte Aéreo")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
