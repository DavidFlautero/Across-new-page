from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-mobile-requirement-cards-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN START === */"
end = "/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN END === */"

css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css).rstrip()

patch = """
/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN START === */

@media (max-width: 760px) {
  .requirementBlock {
    margin-top: 1.5rem !important;
  }

  .requirementBlock h3 {
    font-size: 1.05rem !important;
    line-height: 1.18 !important;
    margin-bottom: .9rem !important;
    text-align: left !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  .requirementBlock .optionGridTwo {
    grid-template-columns: 1fr !important;
    gap: .9rem !important;
  }

  .requirementBlock .option {
    min-height: 148px !important;
    width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr !important;
    grid-template-rows: auto auto auto !important;
    justify-items: center !important;
    align-items: center !important;
    gap: .45rem !important;
    padding: 1.05rem 1rem !important;
    border-radius: 18px !important;
    text-align: center !important;
    overflow: hidden !important;
  }

  .requirementBlock .option input {
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    left: auto !important;
    width: 22px !important;
    height: 22px !important;
    opacity: 1 !important;
    z-index: 3 !important;
  }

  .requirementBlock .option img {
    grid-row: auto !important;
    width: 82px !important;
    height: 62px !important;
    object-fit: contain !important;
    justify-self: center !important;
    margin: 0 auto .2rem !important;
    display: block !important;
  }

  .requirementBlock .option strong {
    display: block !important;
    width: 100% !important;
    max-width: 260px !important;
    text-align: center !important;
    font-size: 1rem !important;
    line-height: 1.18 !important;
    font-weight: 950 !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  .requirementBlock .option small {
    display: block !important;
    width: 100% !important;
    max-width: 260px !important;
    text-align: center !important;
    font-size: .78rem !important;
    line-height: 1.3 !important;
    font-weight: 750 !important;
    color: rgba(7,17,29,.70) !important;
    -webkit-text-fill-color: rgba(7,17,29,.70) !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  .specialHandlingPanel {
    margin-top: 1.2rem !important;
    padding-top: 1.2rem !important;
  }

  .specialHandlingPanel .optionGridFour {
    grid-template-columns: 1fr !important;
    gap: .85rem !important;
  }

  .specialHandlingPanel .cargoOption {
    min-height: 122px !important;
    display: grid !important;
    grid-template-columns: 76px 1fr !important;
    gap: .85rem !important;
    align-items: center !important;
    padding: .95rem 1rem !important;
    border-radius: 18px !important;
    text-align: left !important;
    overflow: hidden !important;
  }

  .specialHandlingPanel .cargoOption input {
    top: 10px !important;
    left: 10px !important;
    width: 18px !important;
    height: 18px !important;
  }

  .specialHandlingPanel .cargoImage {
    width: 62px !important;
    height: 68px !important;
    object-fit: contain !important;
    margin: 0 !important;
  }

  .specialHandlingPanel .cargoText strong {
    display: block !important;
    font-size: .98rem !important;
    line-height: 1.12 !important;
    text-align: left !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  .specialHandlingPanel .cargoText small {
    display: block !important;
    margin-top: .25rem !important;
    font-size: .76rem !important;
    line-height: 1.25 !important;
    text-align: left !important;
    white-space: normal !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  .accordionActions {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: .8rem !important;
  }

  .accordionActions button {
    width: 100% !important;
  }
}

@media (max-width: 420px) {
  .requirementBlock .option {
    min-height: 140px !important;
    padding: .95rem .85rem !important;
  }

  .requirementBlock .option img {
    width: 74px !important;
    height: 56px !important;
  }

  .requirementBlock .option strong,
  .requirementBlock .option small {
    max-width: 220px !important;
  }

  .specialHandlingPanel .cargoOption {
    grid-template-columns: 68px 1fr !important;
  }

  .specialHandlingPanel .cargoImage {
    width: 56px !important;
    height: 62px !important;
  }
}

/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN END === */
"""

css += "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Mobile arreglado para apilable/manipulación")
print("✅ Texto ya no se parte letra por letra")
print("✅ Cards limpias y centradas en mobile")
print("✅ Backup:", backup)
