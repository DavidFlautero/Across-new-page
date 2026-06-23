from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-hide-semaforo-mobile-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION HIDE SEMAFORO MOBILE FINAL START === */"
end = "/* === COTIZACION HIDE SEMAFORO MOBILE FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Mobile: ocultar semáforo y dejar formulario ancho completo */

@media (max-width: 700px) {{
  .quoteShell {{
    width: calc(100% - 1.5rem) !important;
    margin: 2.2rem auto 5rem !important;
    display: block !important;
    grid-template-columns: 1fr !important;
  }}

  .steps {{
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    height: 0 !important;
    min-height: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    pointer-events: none !important;
  }}

  .formCard {{
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    margin: 0 auto !important;
    order: initial !important;
  }}
}}

@media (max-width: 390px) {{
  .quoteShell {{
    width: calc(100% - 1rem) !important;
    display: block !important;
    grid-template-columns: 1fr !important;
  }}

  .formCard {{
    width: 100% !important;
    padding: .9rem !important;
  }}
}}

@media (max-width: 340px) {{
  .quoteShell {{
    width: calc(100% - .7rem) !important;
  }}

  .formCard {{
    padding: .75rem !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización mobile: semáforo oculto")
print("✅ Formulario mobile: ancho completo")
print("✅ Backup:", backup)
