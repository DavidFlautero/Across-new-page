from pathlib import Path
import re
import shutil

page_path = Path("src/app/empresa/oficinas/page.tsx")
global_css = Path("src/app/globals.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/oficinas/page.tsx")

if not global_css.exists():
    raise SystemExit("❌ No existe src/app/globals.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-oficinas-surface-short-title")
css_backup = global_css.with_suffix(global_css.suffix + ".bak-before-oficinas-surface-short-title")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(global_css, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Ampliar media query del título corto:
# mobile chico + Surface Duo/tablet angosta
old_query = 'const query = "(max-width: 430px) and (min-height: 600px)";'
new_query = 'const query = "(max-width: 430px) and (min-height: 600px), (min-width: 500px) and (max-width: 760px) and (min-height: 650px)";'

if old_query in tsx:
    tsx = tsx.replace(old_query, new_query, 1)
    print("✅ Media query ampliado: mobile chico + Surface/tablet angosta")
elif new_query in tsx:
    print("ℹ️ Media query ya estaba ampliado")
else:
    raise SystemExit("❌ No encontré el media query del título corto en page.tsx")

# 2) Asegurar texto corto correcto
tsx = re.sub(
    r'locale === "es"\s*\?\s*"[^"]*"\s*:\s*locale === "en"',
    'locale === "es"\n      ? "Presencia internacional en mercados estratégicos."\n      : locale === "en"',
    tsx,
    count=1
)

page_path.write_text(tsx, encoding="utf-8")

# 3) CSS real: mobile chico + Surface Duo/tablet angosta
css = global_css.read_text(encoding="utf-8", errors="ignore")

start = "/* === OFICINAS RESPONSIVE SHORT TITLE FINAL START === */"
end = "/* === OFICINAS RESPONSIVE SHORT TITLE FINAL END === */"

# Limpia bloque nuevo si ya existía
css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

# Limpia bloque viejo solo de título mobile, para evitar pelea
css = re.sub(
    r"/\* === OFICINAS MOBILE SHORT TITLE FINAL START === \*/[\s\S]*?/\* === OFICINAS MOBILE SHORT TITLE FINAL END === \*/",
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Oficinas: título corto aprobado por consola.
   Desktop mantiene el título largo. */

@media (max-width: 430px) and (min-height: 600px) {{
  section[data-oficinas-hero="true"] h1 {{
    max-width: 315px !important;
    font-size: clamp(2.55rem, 10.6vw, 3.05rem) !important;
    line-height: .94 !important;
    letter-spacing: -.058em !important;
    margin-bottom: 1rem !important;
  }}
}}

@media (min-width: 500px) and (max-width: 760px) and (min-height: 650px) {{
  section[data-oficinas-hero="true"] h1 {{
    max-width: 440px !important;
    font-size: clamp(3.2rem, 8vw, 3.85rem) !important;
    line-height: .94 !important;
    letter-spacing: -.058em !important;
    margin-bottom: 1rem !important;
  }}
}}
{end}
"""

global_css.write_text(css + "\n\n" + patch.strip() + "\n", encoding="utf-8")

print("✅ Oficinas Surface/tablet: título corto aplicado")
print("✅ Oficinas mobile chico: título corto conservado")
print("✅ Desktop: título largo intacto")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
