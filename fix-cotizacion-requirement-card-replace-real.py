from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-requirement-card-replace-real")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-requirement-card-replace-real")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

# 1) Reemplazar SOLO las 4 cards de apilable/manipulación.
start = tsx.find('<div className={styles.requirementBlock}>')
end = tsx.find('{form.handling === "special_handling"', start)

if start == -1 or end == -1:
    raise SystemExit("❌ No encontré el bloque de requerimientos en page.tsx")

block = tsx[start:end]
old_count = block.count('className={styles.option}')
block = block.replace('className={styles.option}', 'className={styles.requirementCard}')

tsx = tsx[:start] + block + tsx[end:]

# Limpieza sintaxis
tsx = re.sub(r'",\s*,', '",', tsx)
tsx = re.sub(r'\},\s*,', '},', tsx)
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

# 2) Eliminar todos los parches viejos conflictivos de requirement cards.
markers = [
    ("/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL START === */", "/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL END === */"),
    ("/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN START === */", "/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN END === */"),
    ("/* === FORCE MOBILE REQUIREMENT CARDS FINAL START === */", "/* === FORCE MOBILE REQUIREMENT CARDS FINAL END === */"),
    ("/* === COTIZACION REQUIREMENT CARDS REAL FINAL START === */", "/* === COTIZACION REQUIREMENT CARDS REAL FINAL END === */"),
]

for a, b in markers:
    css = re.sub(re.escape(a) + r"[\s\S]*?" + re.escape(b), "", css)

# 3) CSS limpio exclusivo.
start_marker = "/* === COTIZACION REQUIREMENT CARD CLEAN REAL START === */"
end_marker = "/* === COTIZACION REQUIREMENT CARD CLEAN REAL END === */"

css = re.sub(re.escape(start_marker) + r"[\s\S]*?" + re.escape(end_marker), "", css).rstrip()

patch = """
/* === COTIZACION REQUIREMENT CARD CLEAN REAL START === */

.requirementBlock {
  margin-top: 1.8rem !important;
}

.requirementBlock h3 {
  margin: 0 0 1rem !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1.08rem !important;
  line-height: 1.18 !important;
  font-weight: 950 !important;
  letter-spacing: -.02em !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

.optionGridTwo {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(260px, 1fr)) !important;
  gap: 1rem !important;
}

/* Nueva card limpia. Ya NO usa .option. */
.requirementCard {
  position: relative !important;
  width: 100% !important;
  min-width: 0 !important;
  min-height: 128px !important;
  display: grid !important;
  grid-template-columns: 120px minmax(0, 1fr) !important;
  grid-template-rows: auto auto !important;
  align-items: center !important;
  column-gap: 1.15rem !important;
  padding: 1.15rem 3.2rem 1.15rem 1.25rem !important;
  border-radius: 18px !important;
  border: 1px solid rgba(7,17,29,.10) !important;
  background: rgba(255,255,255,.92) !important;
  box-shadow: 0 14px 38px rgba(7,17,29,.055) !important;
  cursor: pointer !important;
  overflow: hidden !important;
  text-align: left !important;
}

.requirementCard:has(input:checked) {
  border-color: rgba(225,19,67,.75) !important;
  background: #fff !important;
  box-shadow: 0 18px 46px rgba(225,19,67,.10) !important;
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
  width: 94px !important;
  height: 72px !important;
  object-fit: contain !important;
  justify-self: center !important;
  align-self: center !important;
  margin: 0 !important;
}

.requirementCard > strong {
  display: block !important;
  width: 100% !important;
  min-width: 0 !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1.02rem !important;
  line-height: 1.15 !important;
  font-weight: 950 !important;
  text-align: left !important;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

.requirementCard > small {
  display: block !important;
  width: 100% !important;
  min-width: 0 !important;
  margin-top: .28rem !important;
  color: rgba(7,17,29,.68) !important;
  -webkit-text-fill-color: rgba(7,17,29,.68) !important;
  font-size: .78rem !important;
  line-height: 1.28 !important;
  font-weight: 750 !important;
  text-align: left !important;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

/* Mobile: icono arriba, título abajo, texto debajo del título. */
@media (max-width: 760px) {
  .optionGridTwo {
    grid-template-columns: 1fr !important;
    gap: .95rem !important;
  }

  .requirementCard {
    min-height: 158px !important;
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
    width: 82px !important;
    height: 60px !important;
    margin: 0 auto .25rem !important;
  }

  .requirementCard > strong {
    max-width: 260px !important;
    text-align: center !important;
    font-size: 1rem !important;
    line-height: 1.15 !important;
  }

  .requirementCard > small {
    max-width: 260px !important;
    text-align: center !important;
    font-size: .78rem !important;
    line-height: 1.3 !important;
  }
}

@media (max-width: 420px) {
  .requirementCard {
    min-height: 150px !important;
    padding: 1.1rem .85rem 1rem !important;
  }

  .requirementCard > img {
    width: 76px !important;
    height: 56px !important;
  }

  .requirementCard > strong,
  .requirementCard > small {
    max-width: 230px !important;
  }
}

/* === COTIZACION REQUIREMENT CARD CLEAN REAL END === */
"""

css += "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cards reemplazadas:", old_count)
print("✅ Ya no usan styles.option en apilable/manipulación")
print("✅ Parches viejos conflictivos eliminados")
print("✅ Texto queda debajo del título en mobile")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
