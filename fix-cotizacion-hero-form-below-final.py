from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-hero-form-below-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

# Limpiar intentos anteriores del hero cotización
markers = [
    ("/* === COTIZACION HERO CONTACT STYLE FINAL START === */", "/* === COTIZACION HERO CONTACT STYLE FINAL END === */"),
    ("/* === COTIZACION HERO FORM BELOW FINAL START === */", "/* === COTIZACION HERO FORM BELOW FINAL END === */"),
]

for start, end in markers:
    css = re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        css,
        flags=re.M
    ).rstrip()

start = "/* === COTIZACION HERO FORM BELOW FINAL START === */"
end = "/* === COTIZACION HERO FORM BELOW FINAL END === */"

patch = f"""
{start}
/* Cotización: hero con dimensiones originales, imagen de contacto y formulario debajo */

.hero {{
  min-height: 54vh !important;
  padding: 10rem 5vw 9rem !important;
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  overflow: hidden !important;
  isolation: isolate !important;
  color: #fff !important;
  background-image:
    linear-gradient(90deg, rgba(8,11,16,.74) 0%, rgba(8,11,16,.44) 46%, rgba(8,11,16,.16) 100%),
    linear-gradient(180deg, rgba(8,11,16,.08) 0%, rgba(8,11,16,.52) 100%),
    url("/images/segundaaduana.png") !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}}

.heroOverlay {{
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}}

.heroContent {{
  max-width: 780px !important;
  width: min(780px, 100%) !important;
  position: relative !important;
  z-index: 2 !important;
  color: #fff !important;
}}

.heroContent span {{
  color: #d6c08d !important;
  -webkit-text-fill-color: #d6c08d !important;
  font-size: .75rem !important;
  font-weight: 950 !important;
  letter-spacing: .22em !important;
  text-transform: uppercase !important;
}}

.heroContent h1 {{
  max-width: 760px !important;
  margin: 1rem 0 0 !important;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: clamp(3rem, 5.6vw, 6.4rem) !important;
  line-height: .96 !important;
  letter-spacing: -.075em !important;
  font-weight: 950 !important;
  text-shadow: 0 18px 46px rgba(0,0,0,.38) !important;
}}

.heroContent p {{
  max-width: 620px !important;
  margin-top: 1.35rem !important;
  color: rgba(255,255,255,.84) !important;
  -webkit-text-fill-color: rgba(255,255,255,.84) !important;
  font-size: 1.05rem !important;
  line-height: 1.75 !important;
}}

/* Formulario fuera del hero: sin montarse encima */
.quoteShell {{
  margin: 3.2rem auto 6rem !important;
  position: relative !important;
  z-index: 5 !important;
}}

.formCard {{
  margin-top: 0 !important;
}}

@media (max-width: 700px) {{
  .hero {{
    min-height: 54vh !important;
    padding: 8rem 1.2rem 7rem !important;
    align-items: center !important;
  }}

  .heroContent {{
    width: min(100%, 340px) !important;
  }}

  .heroContent h1 {{
    font-size: clamp(2.15rem, 10vw, 3rem) !important;
    line-height: .96 !important;
  }}

  .heroContent p {{
    font-size: .9rem !important;
    line-height: 1.52 !important;
  }}

  .quoteShell {{
    margin: 2.2rem auto 5rem !important;
    width: calc(100% - 1.5rem) !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización: hero con dimensiones originales")
print("✅ Imagen: /images/segundaaduana.png")
print("✅ Formulario bajado fuera del hero")
print("✅ Backup:", backup)
