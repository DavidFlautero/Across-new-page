from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-one-panel-aria-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION ONE PANEL ARIA FINAL START === */"
end = "/* === COTIZACION ONE PANEL ARIA FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Cotización: mostrar solo el panel cuyo header tiene aria-expanded=true.
   Replica el comportamiento aprobado por consola. */

.formCard > .accordionPanel:has(.formHeader[aria-expanded="false"]) {{
  display: none !important;
  height: 0 !important;
  max-height: 0 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  overflow: hidden !important;
  pointer-events: none !important;
  margin: 0 !important;
  padding: 0 !important;
}}

.formCard > .accordionPanel:has(.formHeader[aria-expanded="true"]) {{
  display: block !important;
  height: auto !important;
  max-height: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
  pointer-events: auto !important;
  margin: 0 !important;
  padding: 0 !important;
}}

.formCard > .accordionPanel:has(.formHeader[aria-expanded="true"]) .accordionBody {{
  display: block !important;
  height: auto !important;
  max-height: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
  pointer-events: auto !important;
}}

.formCard > .divider {{
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}}

.formCard {{
  overflow: visible !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización: ahora el formulario muestra solo el paso activo")
print("✅ Usa aria-expanded=true/false como en DevTools")
print("✅ Backup:", backup)
