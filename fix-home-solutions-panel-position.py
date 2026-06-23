from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-solutions-panel-position")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === HOME SOLUTIONS PANEL POSITION FINAL === */"

patch = r'''
/* === HOME SOLUTIONS PANEL POSITION FINAL === */

/* Desktop/tablet horizontal: subir el cuadro azul para alinearlo con la lista izquierda */
@media (min-width: 901px) {
  .solutionsPanel {
    align-self: center !important;
    transform: translateY(-2.25rem) !important;
  }
}

/* Pantallas grandes: un poco menos para no pasarlo arriba */
@media (min-width: 1281px) {
  .solutionsPanel {
    transform: translateY(-1.65rem) !important;
  }
}

/* Tablet tipo iPad: subirlo más porque queda demasiado bajo */
@media (min-width: 901px) and (max-width: 1180px) {
  .solutionsPanel {
    transform: translateY(-3rem) !important;
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

print("✅ Cuadro derecho del HOME subido y alineado")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
