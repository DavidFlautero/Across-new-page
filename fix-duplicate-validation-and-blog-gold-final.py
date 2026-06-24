from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
globals_path = Path("src/app/globals.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-remove-duplicate-validators-final")
if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# ---------------------------------------------------------
# 1) Quitar duplicados de validadores en Cotización
# Conserva la primera aparición y borra las repetidas.
# ---------------------------------------------------------
helper_names = [
    "invalidEmailMessage",
    "blockedEmailMessage",
    "invalidPhoneMessage",
    "sanitizePhoneValue",
    "isValidPhoneValue",
    "isValidEmailValue",
    "isBlockedEmailValue",
]

for name in helper_names:
    matches = list(re.finditer(rf"\n\s*const\s+{name}\s*=", tsx))
    if len(matches) <= 1:
        continue

    # borrar desde la segunda aparición hasta antes del siguiente helper o getStepValidationError
    for match in reversed(matches[1:]):
        start = match.start()

        next_candidates = []
        for n in helper_names:
            m = re.search(rf"\n\s*const\s+{n}\s*=", tsx[start + 1:])
            if m:
                next_candidates.append(start + 1 + m.start())

        m_get = re.search(r"\n\s*const\s+getStepValidationError\s*=", tsx[start + 1:])
        if m_get:
            next_candidates.append(start + 1 + m_get.start())

        end = min(next_candidates) if next_candidates else start
        if end > start:
            tsx = tsx[:start] + "\n" + tsx[end:]

# Limpieza general
tsx = re.sub(r'",\s*,', '",', tsx)
tsx = re.sub(r'\},\s*,', '},', tsx)
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

# ---------------------------------------------------------
# 2) Quitar línea / acento dorado del blog globalmente
# ---------------------------------------------------------
if not globals_path.exists():
    globals_path.write_text("", encoding="utf-8")

globals_backup = globals_path.with_suffix(globals_path.suffix + ".bak-before-remove-blog-gold-final")
if not globals_backup.exists():
    shutil.copy2(globals_path, globals_backup)

css = globals_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === BLOG REMOVE GOLD ACCENTS FINAL START === */"
end = "/* === BLOG REMOVE GOLD ACCENTS FINAL END === */"

css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css).rstrip()

patch = """
/* === BLOG REMOVE GOLD ACCENTS FINAL START === */

/* Quita el acento/línea dorada que aparece pegado a títulos del blog */
body:has([href="/blog"]),
body:has(main) {
  --blog-gold-accent: transparent;
}

/* Casos comunes: pseudo-elementos dorados junto a H1/H2/títulos */
main h1::after,
main h2::after,
main [class*="title"]::after,
main [class*="Title"]::after,
main [class*="heading"]::after,
main [class*="Heading"]::after {
  background: transparent !important;
  color: transparent !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

/* Si el acento es texto/palito suelto dorado */
main h1 span:empty,
main h2 span:empty,
main [class*="title"] span:empty,
main [class*="Title"] span:empty {
  display: none !important;
}

/* Si viene como border-left / border-right dorado */
main h1,
main h2,
main [class*="title"],
main [class*="Title"],
main [class*="heading"],
main [class*="Heading"] {
  border-left-color: transparent !important;
  border-right-color: transparent !important;
}

/* === BLOG REMOVE GOLD ACCENTS FINAL END === */
"""

css += "\n\n" + patch.strip() + "\n"
globals_path.write_text(css, encoding="utf-8")

print("✅ Duplicados de validadores eliminados en cotizacion/page.tsx")
print("✅ Acento dorado del blog ocultado desde globals.css")
print("✅ Backup cotizacion:", page_backup)
print("✅ Backup globals:", globals_backup)
