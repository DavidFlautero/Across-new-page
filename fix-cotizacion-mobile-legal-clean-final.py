from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-mobile-legal-clean-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION MOBILE LEGAL CLEAN FINAL START === */"
end = "/* === COTIZACION MOBILE LEGAL CLEAN FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Mobile paso final:
   legal + checkboxes limpios,
   texto legible,
   botón Enviar solicitud ancho completo. */

@media (max-width: 700px) {{
  .formCard [class*="legal"],
  .formCard [class*="privacy"],
  .formCard [class*="consent"],
  .formCard [class*="authorization"],
  .formCard fieldset:has(input[type="checkbox"]),
  .formCard div:has(> label input[type="checkbox"]) {{
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: .85rem !important;
    padding: 1rem !important;
    border-radius: 22px !important;
    background: rgba(7,17,29,.035) !important;
    border: 1px solid rgba(7,17,29,.10) !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }}

  .formCard p {{
    max-width: 100% !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
  }}

  .formCard label:has(input[type="checkbox"]) {{
    width: 100% !important;
    max-width: 100% !important;
    min-height: auto !important;
    display: grid !important;
    grid-template-columns: 26px minmax(0, 1fr) !important;
    gap: .75rem !important;
    align-items: start !important;
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    overflow: visible !important;
  }}

  .formCard label:has(input[type="checkbox"]) input[type="checkbox"] {{
    grid-column: 1 !important;
    width: 22px !important;
    height: 22px !important;
    min-width: 22px !important;
    min-height: 22px !important;
    max-width: 22px !important;
    max-height: 22px !important;
    margin: .05rem 0 0 !important;
    padding: 0 !important;
    position: static !important;
    transform: none !important;
    justify-self: start !important;
    align-self: start !important;
    accent-color: #07111d !important;
  }}

  .formCard label:has(input[type="checkbox"]) span,
  .formCard label:has(input[type="checkbox"]) strong {{
    grid-column: 2 !important;
    width: 100% !important;
    max-width: 100% !important;
    color: #07111d !important;
    -webkit-text-fill-color: #07111d !important;
    font-size: .88rem !important;
    line-height: 1.25 !important;
    font-weight: 850 !important;
    text-align: left !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    position: static !important;
    transform: none !important;
  }}

  .formCard button[type="submit"] {{
    width: 100% !important;
    min-height: 50px !important;
    margin-top: 1rem !important;
    border-radius: 999px !important;
  }}

  .formCard {{
    margin-bottom: 0 !important;
  }}
}}

@media (max-width: 390px) {{
  .formCard [class*="legal"],
  .formCard [class*="privacy"],
  .formCard [class*="consent"],
  .formCard [class*="authorization"],
  .formCard fieldset:has(input[type="checkbox"]),
  .formCard div:has(> label input[type="checkbox"]) {{
    padding: .9rem !important;
    border-radius: 20px !important;
  }}

  .formCard label:has(input[type="checkbox"]) {{
    grid-template-columns: 24px minmax(0, 1fr) !important;
    gap: .65rem !important;
  }}

  .formCard label:has(input[type="checkbox"]) input[type="checkbox"] {{
    width: 20px !important;
    height: 20px !important;
    min-width: 20px !important;
    min-height: 20px !important;
  }}

  .formCard label:has(input[type="checkbox"]) span,
  .formCard label:has(input[type="checkbox"]) strong {{
    font-size: .82rem !important;
    line-height: 1.22 !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización mobile paso final: legal/checks limpio")
print("✅ Checkboxes alineados")
print("✅ Botón Enviar solicitud full width")
print("✅ Backup:", backup)
