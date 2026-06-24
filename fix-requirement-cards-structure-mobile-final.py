from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-req-card-structure-mobile-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-req-card-structure-mobile-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

start = tsx.find('              <div className={styles.requirementBlock}>')
end = tsx.find('              {form.handling === "special_handling"', start)

if start == -1 or end == -1:
    raise SystemExit("❌ No encontré el bloque de apilable/manipulación")

new_block = '''              <div className={styles.requirementBlock}>
                <h3>Es su carga apilable?</h3>

                <div className={styles.reqCardsGrid}>
                  <label className={styles.reqCard}>
                    <input type="radio" name="stackable" value="yes" checked={form.stackable === "yes"} onChange={(e) => setValue("stackable", e.target.value)} />
                    <Image src="/images/quote/apilable-across-pro.svg" alt={t.stackable} width={120} height={80} />
                    <span className={styles.reqCardCopy}>
                      <strong>{t.stackable}</strong>
                      <small>{t.stackableText}</small>
                    </span>
                  </label>

                  <label className={styles.reqCard}>
                    <input type="radio" name="stackable" value="no" checked={form.stackable === "no"} onChange={(e) => setValue("stackable", e.target.value)} />
                    <Image src="/images/quote/no-apilable-across-pro.svg" alt={t.notStackable} width={120} height={80} />
                    <span className={styles.reqCardCopy}>
                      <strong>{t.notStackable}</strong>
                      <small>{t.notStackableText}</small>
                    </span>
                  </label>
                </div>
              </div>

              <div className={styles.requirementBlock}>
                <h3>Tiene requerimientos especiales de manipulación?</h3>

                <div className={styles.reqCardsGrid}>
                  <label className={styles.reqCard}>
                    <input type="radio" name="handling" value="general_handling" checked={form.handling === "general_handling"} onChange={(e) => setValue("handling", e.target.value)} />
                    <Image src="/images/quote/carga-general-across-pro.svg" alt={t.generalCargo} width={120} height={80} />
                    <span className={styles.reqCardCopy}>
                      <strong>{t.generalCargo}</strong>
                      <small>{t.generalCargoText}</small>
                    </span>
                  </label>

                  <label className={styles.reqCard}>
                    <input type="radio" name="handling" value="special_handling" checked={form.handling === "special_handling"} onChange={(e) => setValue("handling", e.target.value)} />
                    <Image src="/images/quote/manipulacion-especial-across-pro.svg" alt={t.specialHandling} width={120} height={80} />
                    <span className={styles.reqCardCopy}>
                      <strong>{t.specialHandling}</strong>
                      <small>{t.specialHandlingText}</small>
                    </span>
                  </label>
                </div>
              </div>

'''

tsx = tsx[:start] + new_block + tsx[end:]

tsx = re.sub(r'",\\s*,', '",', tsx)
tsx = re.sub(r'\\},\\s*,', '},', tsx)
tsx = re.sub(r"\\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\\.{4,}prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

# Limpia parches anteriores que pelean
markers = [
    ("/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL START === */", "/* === COTIZACION REQUIREMENT ORIGINAL CARDS FINAL END === */"),
    ("/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN START === */", "/* === COTIZACION MOBILE REQUIREMENT CARDS CLEAN END === */"),
    ("/* === FORCE MOBILE REQUIREMENT CARDS FINAL START === */", "/* === FORCE MOBILE REQUIREMENT CARDS FINAL END === */"),
    ("/* === COTIZACION REQUIREMENT CARDS REAL FINAL START === */", "/* === COTIZACION REQUIREMENT CARDS REAL FINAL END === */"),
    ("/* === COTIZACION REQUIREMENT CARD CLEAN REAL START === */", "/* === COTIZACION REQUIREMENT CARD CLEAN REAL END === */"),
]

for a, b in markers:
    css = re.sub(re.escape(a) + r"[\\s\\S]*?" + re.escape(b), "", css)

start_marker = "/* === REQ CARDS STRUCTURE MOBILE FINAL START === */"
end_marker = "/* === REQ CARDS STRUCTURE MOBILE FINAL END === */"

css = re.sub(re.escape(start_marker) + r"[\\s\\S]*?" + re.escape(end_marker), "", css).rstrip()

patch = '''
/* === REQ CARDS STRUCTURE MOBILE FINAL START === */

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

.reqCardsGrid {
  display: grid !important;
  grid-template-columns: repeat(2, minmax(260px, 1fr)) !important;
  gap: 1rem !important;
}

.reqCard {
  position: relative !important;
  width: 100% !important;
  min-height: 128px !important;
  display: grid !important;
  grid-template-columns: 120px minmax(0, 1fr) !important;
  align-items: center !important;
  gap: 1.15rem !important;
  padding: 1.15rem 3.2rem 1.15rem 1.25rem !important;
  border-radius: 18px !important;
  border: 1px solid rgba(7,17,29,.10) !important;
  background: rgba(255,255,255,.92) !important;
  box-shadow: 0 14px 38px rgba(7,17,29,.055) !important;
  cursor: pointer !important;
  overflow: hidden !important;
}

.reqCard:has(input:checked) {
  border-color: rgba(225,19,67,.75) !important;
  background: #fff !important;
  box-shadow: 0 18px 46px rgba(225,19,67,.10) !important;
}

.reqCard input[type="radio"] {
  position: absolute !important;
  top: 14px !important;
  right: 14px !important;
  left: auto !important;
  width: 24px !important;
  height: 24px !important;
  opacity: 1 !important;
  z-index: 5 !important;
  accent-color: #e11343 !important;
}

.reqCard img {
  width: 94px !important;
  height: 72px !important;
  object-fit: contain !important;
  justify-self: center !important;
  margin: 0 !important;
}

.reqCardCopy {
  display: block !important;
  width: 100% !important;
  min-width: 0 !important;
  max-width: 100% !important;
}

.reqCardCopy strong {
  display: block !important;
  width: 100% !important;
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

.reqCardCopy small {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  margin-top: .35rem !important;
  color: rgba(7,17,29,.68) !important;
  -webkit-text-fill-color: rgba(7,17,29,.68) !important;
  font-size: .78rem !important;
  line-height: 1.32 !important;
  font-weight: 750 !important;
  text-align: left !important;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

@media (max-width: 760px) {
  .reqCardsGrid {
    grid-template-columns: 1fr !important;
    gap: .95rem !important;
  }

  .reqCard {
    min-height: 158px !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 1.25rem 1rem 1.05rem !important;
    gap: .45rem !important;
    text-align: center !important;
  }

  .reqCard input[type="radio"] {
    top: 12px !important;
    right: 12px !important;
  }

  .reqCard img {
    width: 82px !important;
    height: 60px !important;
    margin: 0 auto .25rem !important;
  }

  .reqCardCopy {
    width: 100% !important;
    max-width: 270px !important;
    text-align: center !important;
  }

  .reqCardCopy strong,
  .reqCardCopy small {
    text-align: center !important;
    max-width: 270px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

/* === REQ CARDS STRUCTURE MOBILE FINAL END === */
'''

css += "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ JSX reemplazado: el small ahora va dentro de reqCardCopy")
print("✅ El texto ya no puede quedar en columna de 30px")
print("✅ CSS viejo conflictivo eliminado")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
