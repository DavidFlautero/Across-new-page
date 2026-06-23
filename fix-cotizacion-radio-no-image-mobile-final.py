from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-radio-no-image-mobile-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION RADIO NO IMAGE MOBILE FINAL START === */"
end = "/* === COTIZACION RADIO NO IMAGE MOBILE FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Mobile: radios sin imagen.
   Corrige opciones tipo Apilable / No apilable / Carga general
   para que no se partan en una columna angosta. */

@media (max-width: 700px) {{
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) {{
    width: 100% !important;
    min-height: 82px !important;
    display: grid !important;
    grid-template-columns: minmax(0, 1fr) 34px !important;
    grid-template-rows: auto auto !important;
    gap: .25rem .8rem !important;
    align-items: center !important;
    padding: .9rem 1rem !important;
    border-radius: 20px !important;
    background: rgba(255,255,255,.94) !important;
    border: 1px solid rgba(7,17,29,.10) !important;
    box-shadow: 0 14px 36px rgba(7,17,29,.08) !important;
    overflow: hidden !important;
    position: relative !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) input[type="radio"] {{
    grid-column: 2 !important;
    grid-row: 1 / span 2 !important;
    width: 26px !important;
    height: 26px !important;
    min-width: 26px !important;
    min-height: 26px !important;
    max-width: 26px !important;
    max-height: 26px !important;
    margin: 0 !important;
    justify-self: center !important;
    align-self: center !important;
    position: static !important;
    transform: none !important;
    accent-color: #e11343 !important;
    opacity: 1 !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) > *:not(input) {{
    grid-column: 1 !important;
    min-width: 0 !important;
    max-width: 100% !important;
    position: static !important;
    transform: none !important;
    text-align: left !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) strong,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) h3,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) span {{
    grid-column: 1 !important;
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    color: #07111d !important;
    -webkit-text-fill-color: #07111d !important;
    font-size: .98rem !important;
    line-height: 1.12 !important;
    font-weight: 950 !important;
    letter-spacing: -.025em !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    text-align: left !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) p,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) small {{
    grid-column: 1 !important;
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    margin-top: .22rem !important;
    color: rgba(7,17,29,.62) !important;
    -webkit-text-fill-color: rgba(7,17,29,.62) !important;
    font-size: .76rem !important;
    line-height: 1.32 !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    text-align: left !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)):has(input[type="radio"]:checked) {{
    border-color: rgba(225, 19, 67, .55) !important;
    background:
      radial-gradient(circle at 92% 0%, rgba(225,19,67,.08), transparent 10rem),
      rgba(255,255,255,.97) !important;
    box-shadow: 0 18px 42px rgba(225,19,67,.10) !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg))::before,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg))::after {{
    content: none !important;
    display: none !important;
  }}
}}

@media (max-width: 390px) {{
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) {{
    grid-template-columns: minmax(0, 1fr) 30px !important;
    min-height: 78px !important;
    padding: .8rem .85rem !important;
    border-radius: 18px !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) input[type="radio"] {{
    width: 24px !important;
    height: 24px !important;
    min-width: 24px !important;
    min-height: 24px !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) strong,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) h3,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) span {{
    font-size: .9rem !important;
    line-height: 1.12 !important;
  }}

  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) p,
  .formCard label:has(input[type="radio"]):not(:has(img)):not(:has(svg)) small {{
    font-size: .7rem !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización mobile: corregidos radios sin imagen")
print("✅ Apilable / No apilable / Carga general ya no se parten")
print("✅ Radio queda a la derecha")
print("✅ Backup:", backup)
