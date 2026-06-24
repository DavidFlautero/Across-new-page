from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-requirement-premium-icons-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-requirement-premium-icons-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

tsx = re.sub(r'",\s*,', '",', tsx)
tsx = re.sub(r'\},\s*,', '},', tsx)

replaces = {
    "/images/quote/apilable-across.svg": "/images/quote/apilable-across-pro.svg",
    "/images/quote/no-apilable-across.svg": "/images/quote/no-apilable-across-pro.svg",
    "/images/quote/carga-general-across.svg": "/images/quote/carga-general-across-pro.svg",
    "/images/quote/manipulacion-especial-across.svg": "/images/quote/manipulacion-especial-across-pro.svg",
    "/images/quote/mercancia-peligrosa-across.svg": "/images/quote/mercancia-peligrosa-across-pro.svg",
    "/images/quote/bateria-litio-across.svg": "/images/quote/bateria-litio-across-pro.svg",
    "/images/quote/temperatura-controlada-across.svg": "/images/quote/temperatura-controlada-across-pro.svg",
    "/images/quote/articulos-restringidos-across.svg": "/images/quote/articulos-restringidos-across-pro.svg",

    "/images/quote/apilable.png": "/images/quote/apilable-across-pro.svg",
    "/images/quote/not-apilable.png": "/images/quote/no-apilable-across-pro.svg",
    "/images/quote/car-general.png": "/images/quote/carga-general-across-pro.svg",
    "/images/quote/car-especial.png": "/images/quote/manipulacion-especial-across-pro.svg",
    "/images/quote/flame.png": "/images/quote/mercancia-peligrosa-across-pro.svg",
    "/images/quote/litio.png": "/images/quote/bateria-litio-across-pro.svg",
    "/images/quote/temperature.png": "/images/quote/temperatura-controlada-across-pro.svg",
    "/images/quote/alert.png": "/images/quote/articulos-restringidos-across-pro.svg",
}

for old, new in replaces.items():
    tsx = tsx.replace(old, new)

page_path.write_text(tsx, encoding="utf-8")

start = "/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL START === */"
end = "/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL END === */"

css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css).rstrip()

patch = """
/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL START === */

/* El bloque de apilable/manipulación deja de verse como card gigante premium */
.requirementBlock {
  margin-top: 1.9rem !important;
}

.requirementBlock h3 {
  margin: 0 0 1rem !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1.05rem !important;
  font-weight: 950 !important;
  letter-spacing: -.02em !important;
}

/* Cards principales: Apilable / No apilable / Carga general / Manipulación especial */
.requirementBlock .optionGridTwo {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(280px, 1fr)) !important;
  gap: 1.7rem !important;
}

.requirementBlock .option {
  min-height: 112px !important;
  display: grid !important;
  grid-template-columns: 140px 1fr !important;
  grid-template-rows: auto auto !important;
  align-items: center !important;
  column-gap: 1.25rem !important;
  padding: 1rem 1.3rem !important;
  border-radius: 0 !important;
  border: 3px solid rgba(255,255,255,.95) !important;
  background: rgba(247,247,247,.94) !important;
  box-shadow: none !important;
  cursor: pointer !important;
  position: relative !important;
}

.requirementBlock .option:hover {
  transform: none !important;
  box-shadow: 0 8px 22px rgba(7,17,29,.08) !important;
}

.requirementBlock .option:has(input:checked) {
  border-color: #d00236 !important;
  outline: none !important;
  background: #fff !important;
}

.requirementBlock .option input {
  position: absolute !important;
  top: 12px !important;
  right: 12px !important;
  left: auto !important;
  opacity: 1 !important;
  width: 16px !important;
  height: 16px !important;
  accent-color: #d00236 !important;
}

.requirementBlock .option img {
  grid-row: 1 / 3 !important;
  width: 120px !important;
  height: 78px !important;
  object-fit: contain !important;
  margin: 0 !important;
  justify-self: center !important;
  filter: none !important;
}

.requirementBlock .option strong {
  display: block !important;
  align-self: end !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1rem !important;
  font-weight: 950 !important;
  line-height: 1.15 !important;
  text-transform: none !important;
}

.requirementBlock .option small {
  display: block !important;
  align-self: start !important;
  margin-top: .25rem !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: .78rem !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  text-transform: none !important;
}

/* Panel de opciones especiales */
.specialHandlingPanel {
  margin-top: 1.8rem !important;
  padding-top: 1.8rem !important;
  border-top: 2px solid rgba(7,17,29,.10) !important;
}

.specialHandlingPanel .optionGridFour {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(190px, 1fr)) !important;
  gap: 1rem !important;
}

.specialHandlingPanel .cargoOption {
  min-height: 112px !important;
  display: grid !important;
  grid-template-columns: 88px 1fr !important;
  align-items: center !important;
  gap: .95rem !important;
  padding: .9rem 1rem !important;
  border-radius: 0 !important;
  border: 3px solid rgba(255,255,255,.95) !important;
  background: rgba(247,247,247,.94) !important;
  box-shadow: none !important;
}

.specialHandlingPanel .cargoOption:has(input:checked) {
  border-color: #d00236 !important;
  background: #fff !important;
  outline: none !important;
}

.specialHandlingPanel .cargoOption input {
  position: absolute !important;
  top: 10px !important;
  left: 10px !important;
  opacity: 1 !important;
  width: 15px !important;
  height: 15px !important;
  accent-color: #d00236 !important;
}

.specialHandlingPanel .cargoImage {
  width: 72px !important;
  height: 76px !important;
  object-fit: contain !important;
  filter: none !important;
  margin-left: .25rem !important;
}

.specialHandlingPanel .cargoText strong {
  display: block !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: .98rem !important;
  font-weight: 950 !important;
  line-height: 1.05 !important;
  text-transform: none !important;
}

.specialHandlingPanel .cargoText small {
  display: block !important;
  margin-top: .25rem !important;
  color: #d00236 !important;
  -webkit-text-fill-color: #d00236 !important;
  font-size: .75rem !important;
  font-weight: 700 !important;
  line-height: 1.18 !important;
}

/* Textarea especial más limpio */
.specialHandlingPanel label.fullWidth,
.specialHandlingPanel .fullWidth {
  margin-top: 1rem !important;
  display: grid !important;
  gap: .55rem !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: .8rem !important;
  font-weight: 950 !important;
  letter-spacing: .04em !important;
  text-transform: uppercase !important;
}

/* Responsive */
@media (max-width: 1100px) {
  .specialHandlingPanel .optionGridFour {
    grid-template-columns: repeat(2, minmax(220px, 1fr)) !important;
  }
}

@media (max-width: 760px) {
  .requirementBlock .optionGridTwo,
  .specialHandlingPanel .optionGridFour {
    grid-template-columns: 1fr !important;
    gap: .9rem !important;
  }

  .requirementBlock .option {
    grid-template-columns: 100px 1fr !important;
    min-height: 96px !important;
    padding: .85rem 1rem !important;
  }

  .requirementBlock .option img {
    width: 90px !important;
    height: 62px !important;
  }

  .specialHandlingPanel .cargoOption {
    grid-template-columns: 82px 1fr !important;
  }
}

/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL END === */
"""

css += "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Imágenes premium creadas y conectadas")
print("✅ Cards apilable/manipulación pasadas a estilo original limpio")
print("✅ Especiales ajustadas: más grandes, ordenadas y legibles")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
