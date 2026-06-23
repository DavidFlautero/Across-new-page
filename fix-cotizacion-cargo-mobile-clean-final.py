from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-cargo-mobile-clean-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION CARGO MOBILE CLEAN FINAL START === */"
end = "/* === COTIZACION CARGO MOBILE CLEAN FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Mobile: limpiar cards de Tipo de carga.
   Imagen izquierda, texto centro, radio derecha. */

@media (max-width: 700px) {{
  .formCard [class*="cargo"],
  .formCard [class*="load"],
  .formCard [class*="option"],
  .formCard [class*="card"] {{
    min-width: 0 !important;
  }}

  .formCard label:has(input[type="radio"]) {{
    width: 100% !important;
    min-height: 94px !important;
    display: grid !important;
    grid-template-columns: 58px minmax(0, 1fr) 34px !important;
    gap: .75rem !important;
    align-items: center !important;
    padding: .85rem .9rem !important;
    border-radius: 20px !important;
    background: rgba(255,255,255,.94) !important;
    border: 1px solid rgba(7,17,29,.10) !important;
    box-shadow: 0 14px 36px rgba(7,17,29,.08) !important;
    overflow: hidden !important;
    position: relative !important;
  }}

  .formCard label:has(input[type="radio"]:checked) {{
    border-color: rgba(225, 19, 67, .55) !important;
    background:
      radial-gradient(circle at 92% 0%, rgba(225,19,67,.08), transparent 10rem),
      rgba(255,255,255,.97) !important;
    box-shadow: 0 18px 42px rgba(225,19,67,.10) !important;
  }}

  .formCard label:has(input[type="radio"]) img,
  .formCard label:has(input[type="radio"]) svg {{
    grid-column: 1 !important;
    width: 48px !important;
    height: 48px !important;
    object-fit: contain !important;
    opacity: .9 !important;
    align-self: center !important;
    justify-self: center !important;
    position: static !important;
    transform: none !important;
  }}

  .formCard label:has(input[type="radio"]) > div {{
    grid-column: 2 !important;
    min-width: 0 !important;
    width: 100% !important;
    position: static !important;
    transform: none !important;
  }}

  .formCard label:has(input[type="radio"]) strong,
  .formCard label:has(input[type="radio"]) h3,
  .formCard label:has(input[type="radio"]) span {{
    display: block !important;
    max-width: 100% !important;
    color: #07111d !important;
    -webkit-text-fill-color: #07111d !important;
    font-size: .98rem !important;
    line-height: 1.12 !important;
    font-weight: 950 !important;
    letter-spacing: -.025em !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
    word-break: normal !important;
    text-align: left !important;
    position: static !important;
    transform: none !important;
  }}

  .formCard label:has(input[type="radio"]) p,
  .formCard label:has(input[type="radio"]) small {{
    display: block !important;
    margin-top: .28rem !important;
    max-width: 100% !important;
    color: rgba(7,17,29,.62) !important;
    -webkit-text-fill-color: rgba(7,17,29,.62) !important;
    font-size: .76rem !important;
    line-height: 1.32 !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
    text-align: left !important;
    position: static !important;
    transform: none !important;
  }}

  .formCard label:has(input[type="radio"]) input[type="radio"] {{
    grid-column: 3 !important;
    width: 26px !important;
    height: 26px !important;
    min-width: 26px !important;
    min-height: 26px !important;
    max-width: 26px !important;
    max-height: 26px !important;
    margin: 0 !important;
    padding: 0 !important;
    justify-self: center !important;
    align-self: center !important;
    position: static !important;
    transform: none !important;
    accent-color: #e11343 !important;
    opacity: 1 !important;
  }}

  .formCard label:has(input[type="radio"])::before,
  .formCard label:has(input[type="radio"])::after {{
    content: none !important;
    display: none !important;
  }}
}}

@media (max-width: 390px) {{
  .formCard label:has(input[type="radio"]) {{
    grid-template-columns: 50px minmax(0, 1fr) 30px !important;
    gap: .6rem !important;
    padding: .75rem !important;
    min-height: 88px !important;
    border-radius: 18px !important;
  }}

  .formCard label:has(input[type="radio"]) img,
  .formCard label:has(input[type="radio"]) svg {{
    width: 42px !important;
    height: 42px !important;
  }}

  .formCard label:has(input[type="radio"]) input[type="radio"] {{
    width: 24px !important;
    height: 24px !important;
    min-width: 24px !important;
    min-height: 24px !important;
  }}

  .formCard label:has(input[type="radio"]) strong,
  .formCard label:has(input[type="radio"]) h3,
  .formCard label:has(input[type="radio"]) span {{
    font-size: .9rem !important;
  }}

  .formCard label:has(input[type="radio"]) p,
  .formCard label:has(input[type="radio"]) small {{
    font-size: .7rem !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización mobile: Tipo de carga limpio")
print("✅ Imagen izquierda, texto centro, radio derecha")
print("✅ Backup:", backup)
