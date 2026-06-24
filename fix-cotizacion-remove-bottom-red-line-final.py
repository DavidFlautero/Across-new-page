from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-remove-bottom-red-line-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

patch = """
/* === COTIZACION REMOVE BOTTOM RED LINE FINAL START === */

/* Quita la línea roja inferior debajo del contenedor */
.cargoButton::before,
.cargoGrid .cargoOption::before {
  display: none !important;
  content: none !important;
}

/* Por defecto tampoco mostramos línea extra */
.cargoButton::after,
.cargoGrid .cargoOption::after {
  display: none !important;
  content: none !important;
}

/* Solo high cube conserva línea vertical derecha, como referencia visual */
.cargoButton[data-cargo-id="contenedor_high_cube_40"]::after,
.cargoGrid .cargoOption[data-cargo-id="contenedor_high_cube_40"]::after {
  content: "" !important;
  display: block !important;
  position: absolute !important;
  left: 132px !important;
  bottom: 42px !important;
  width: 2px !important;
  height: 42px !important;
  background: #d00236 !important;
  z-index: 3 !important;
}

/* === COTIZACION REMOVE BOTTOM RED LINE FINAL END === */
"""

start = "/* === COTIZACION REMOVE BOTTOM RED LINE FINAL START === */"
end = "/* === COTIZACION REMOVE BOTTOM RED LINE FINAL END === */"

css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css).rstrip()
css += "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Línea roja inferior eliminada")
print("✅ Solo high cube conserva línea derecha")
print("✅ Backup:", backup)
