from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-requirement-cards-real-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-requirement-cards-real-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

# ---------------------------------------------------------
# 1) Cambiar SOLO las cards de apilable/manipulación
# ---------------------------------------------------------
start = tsx.find('<div className={styles.requirementBlock}>')
end = tsx.find('{form.handling === "special_handling"', start)

if start == -1 or end == -1:
    raise SystemExit("❌ No encontré el bloque requirementBlock en page.tsx")

block = tsx[start:end]

block = block.replace(
    'className={styles.option}',
    'className={`${styles.option} ${styles.requirementCard}`}'
)

tsx = tsx[:start] + block + tsx[end:]

# Limpieza de sintaxis previa
tsx = re.sub(r'",\s*,', '",', tsx)
tsx = re.sub(r'\},\s*,', '},', tsx)
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

# ---------------------------------------------------------
# 2) Eliminar bloques anteriores que estaban peleando
# ---------------------------------------------------------
markers = [
    ("/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL START === */", "/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL END === */"),
    ("/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN START === */", "/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN END === */"),
    ("/* === FORCE MOBILE REQUIREMENT CARDS FINAL START === */", "/* === FORCE MOBILE REQUIREMENT CARDS FINAL END === */"),
]

for a, b in markers:
    css = re.sub(re.escape(a) + r"[\s\S]*?" + re.escape(b), "", css)

# ---------------------------------------------------------
# 3) CSS nuevo, limpio y exclusivo
# ---------------------------------------------------------
start_marker = "/* === COTIZACION REQUIREMENT CARDS REAL FINAL START === */"
end_marker = "/* === COTIZACION REQUIREMENT CARDS REAL FINAL END === */"

css = re.sub(
    re.escape(start_marker) + r"[\s\S]*?" + re.escape(end_marker),
    "",
    css
).rstrip()

patch = """
/* === COTIZACION REQUIREMENT CARDS REAL FINAL START === */

/* Bloques de requerimientos */
.requirementBlock {
  margin-top: 1.9rem !important;
}

.requirementBlock h3 {
  margin: 0 0 1rem !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1.08rem !important;
  line-height: 1.18 !important;
  font-weight: 950 !important;
  letter-spacing: -.02em !important;
  text-transform: none !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

.optionGridTwo {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(260px, 1fr)) !important;
  gap: 1rem !important;
}

/* Card exclusiva: ya no depende de la vieja .option */
.requirementCard {
  position: relative !important;
  width: 100% !important;
  min-width: 0 !important;
  min-height: 128px !important;

  display: grid !important;
  grid-template-columns: 128px minmax(0, 1fr) !important;
  grid-template-rows: auto auto !important;
  align-items: center !important;
  column-gap: 1.2rem !important;

  padding: 1.15rem 3.2rem 1.15rem 1.25rem !important;
  border-radius: 18px !important;
  border: 1px solid rgba(7,17,29,.10) !important;
  background:
    radial-gradient(circle at 95% 10%, rgba(225,19,67,.05), transparent 12rem),
    rgba(255,255,255,.90) !important;
  box-shadow:
    0 14px 38px rgba(7,17,29,.055),
    inset 0 1px 0 rgba(255,255,255,.90) !important;

  cursor: pointer !important;
  overflow: hidden !important;
  text-align: left !important;
  transform: none !important;
}

.requirementCard:hover {
  transform: none !important;
  border-color: rgba(225,19,67,.28) !important;
  box-shadow:
    0 18px 46px rgba(7,17,29,.08),
    inset 0 1px 0 rgba(255,255,255,.95) !important;
}

.requirementCard:has(input:checked) {
  border-color: rgba(225,19,67,.72) !important;
  background:
    radial-gradient(circle at 95% 10%, rgba(225,19,67,.10), transparent 12rem),
    #fff !important;
  box-shadow:
    0 18px 46px rgba(225,19,67,.10),
    inset 0 1px 0 rgba(255,255,255,.95) !important;
}

.requirementCard > input[type="radio"] {
  position: absolute !important;
  top: 14px !important;
  right: 14px !important;
  left: auto !important;
  width: 24px !important;
  height: 24px !important;
  margin: 0 !important;
  opacity: 1 !important;
  z-index: 5 !important;
  accent-color: #e11343 !important;
}

.requirementCard > img {
  grid-row: 1 / 3 !important;
  width: 104px !important;
  height: 78px !important;
  object-fit: contain !important;
  justify-self: center !important;
  align-self: center !important;
  margin: 0 !important;
  transform: none !important;
  filter: none !important;
}

.requirementCard > strong {
  display: block !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;

  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;

  font-size: 1.02rem !important;
  line-height: 1.15 !important;
  font-weight: 950 !important;
  letter-spacing: -.015em !important;
  text-align: left !important;
  text-transform: none !important;

  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

.requirementCard > small {
  display: block !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  margin-top: .28rem !important;

  color: rgba(7,17,29,.66) !important;
  -webkit-text-fill-color: rgba(7,17,29,.66) !important;

  font-size: .78rem !important;
  line-height: 1.28 !important;
  font-weight: 750 !important;
  text-align: left !important;
  text-transform: none !important;

  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

/* Opciones especiales */
.specialHandlingPanel {
  margin-top: 1.6rem !important;
  padding-top: 1.4rem !important;
  border-top: 1px solid rgba(7,17,29,.10) !important;
}

.specialHandlingPanel .optionGridFour {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(190px, 1fr)) !important;
  gap: .9rem !important;
}

.specialHandlingPanel .cargoOption {
  position: relative !important;
  min-height: 112px !important;
  display: grid !important;
  grid-template-columns: 78px minmax(0, 1fr) !important;
  align-items: center !important;
  gap: .85rem !important;
  padding: 1rem .95rem !important;
  border-radius: 18px !important;
  border: 1px solid rgba(7,17,29,.10) !important;
  background: rgba(255,255,255,.90) !important;
  box-shadow: 0 12px 32px rgba(7,17,29,.045) !important;
  overflow: hidden !important;
}

.specialHandlingPanel .cargoOption:has(input:checked) {
  border-color: rgba(225,19,67,.72) !important;
  background: #fff !important;
}

.specialHandlingPanel .cargoOption input[type="checkbox"] {
  position: absolute !important;
  top: 10px !important;
  left: 10px !important;
  width: 18px !important;
  height: 18px !important;
  opacity: 1 !important;
  z-index: 4 !important;
  accent-color: #e11343 !important;
}

.specialHandlingPanel .cargoImage {
  width: 66px !important;
  height: 70px !important;
  object-fit: contain !important;
  margin: 0 !important;
  filter: none !important;
}

.specialHandlingPanel .cargoText {
  min-width: 0 !important;
  display: block !important;
}

.specialHandlingPanel .cargoText strong {
  display: block !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: .95rem !important;
  line-height: 1.1 !important;
  font-weight: 950 !important;
  text-align: left !important;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

.specialHandlingPanel .cargoText small {
  display: block !important;
  margin-top: .25rem !important;
  color: #d00236 !important;
  -webkit-text-fill-color: #d00236 !important;
  font-size: .73rem !important;
  line-height: 1.22 !important;
  font-weight: 750 !important;
  text-align: left !important;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

/* MOBILE PERFECTO */
@media (max-width: 760px) {
  .optionGridTwo {
    grid-template-columns: 1fr !important;
    gap: .9rem !important;
  }

  .requirementCard {
    min-height: 154px !important;

    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;

    padding: 1.25rem 1rem 1.05rem !important;
    gap: .45rem !important;

    text-align: center !important;
    border-radius: 18px !important;
  }

  .requirementCard > input[type="radio"] {
    top: 12px !important;
    right: 12px !important;
    width: 24px !important;
    height: 24px !important;
  }

  .requirementCard > img {
    width: 84px !important;
    height: 62px !important;
    margin: 0 auto .25rem !important;
  }

  .requirementCard > strong {
    max-width: 270px !important;
    text-align: center !important;
    font-size: 1rem !important;
    line-height: 1.15 !important;
  }

  .requirementCard > small {
    max-width: 270px !important;
    text-align: center !important;
    font-size: .78rem !important;
    line-height: 1.3 !important;
  }

  .specialHandlingPanel .optionGridFour {
    grid-template-columns: 1fr !important;
    gap: .85rem !important;
  }

  .specialHandlingPanel .cargoOption {
    min-height: 118px !important;
    grid-template-columns: 72px minmax(0, 1fr) !important;
    gap: .85rem !important;
    padding: .95rem 1rem !important;
  }

  .specialHandlingPanel .cargoImage {
    width: 60px !important;
    height: 64px !important;
  }

  .specialHandlingPanel .cargoText strong {
    font-size: .96rem !important;
  }

  .specialHandlingPanel .cargoText small {
    font-size: .75rem !important;
  }
}

@media (max-width: 420px) {
  .requirementCard {
    min-height: 148px !important;
    padding: 1.1rem .85rem 1rem !important;
  }

  .requirementCard > img {
    width: 78px !important;
    height: 58px !important;
  }

  .requirementCard > strong,
  .requirementCard > small {
    max-width: 230px !important;
  }
}

/* === COTIZACION REQUIREMENT CARDS REAL FINAL END === */
"""

css += "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Reemplazado el pedazo que estaba haciendo el mal")
print("✅ Cards de apilable/manipulación ahora usan requirementCard")
print("✅ Se eliminaron parches viejos conflictivos")
print("✅ Mobile queda vertical, centrado y sin texto aplastado")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
