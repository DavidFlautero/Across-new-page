from pathlib import Path
import re
import shutil

page_path = Path("src/app/empresa/quienes-somos/page.tsx")
css_path = Path("src/app/empresa/quienes-somos/QuienesSomos.module.css")
globals_path = Path("src/app/globals.css")
empresa_css_path = Path("src/app/empresa/Empresa.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/quienes-somos/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/quienes-somos/QuienesSomos.module.css")

# Backups
for path in [page_path, css_path, globals_path, empresa_css_path]:
    if path.exists():
        backup = path.with_suffix(path.suffix + ".bak-before-quienes-desktop-left-data-final")
        if not backup.exists():
            shutil.copy2(path, backup)

# 1) Agregar data attr al contenedor real del hero
tsx = page_path.read_text(encoding="utf-8", errors="ignore")

old = '<div className={empresaHeroStyles.heroContent}>'
new = '<div className={empresaHeroStyles.heroContent} data-quienes-hero-content="true">'

if new not in tsx:
    if old not in tsx:
        raise SystemExit("❌ No encontré el div empresaHeroStyles.heroContent")
    tsx = tsx.replace(old, new, 1)
    print("✅ Agregado data-quienes-hero-content al heroContent")
else:
    print("ℹ️ data-quienes-hero-content ya existía")

page_path.write_text(tsx, encoding="utf-8")

# 2) Limpiar intentos anteriores en globals y Empresa.module.css
markers = [
    ("/* === QUIENES HERO DESKTOP LEFT FINAL START === */", "/* === QUIENES HERO DESKTOP LEFT FINAL END === */"),
    ("/* === QUIENES DESKTOP LEFT GLOBAL REAL START === */", "/* === QUIENES DESKTOP LEFT GLOBAL REAL END === */"),
    ("/* === QUIENES DESKTOP LEFT DATA FINAL START === */", "/* === QUIENES DESKTOP LEFT DATA FINAL END === */"),
]

for path in [globals_path, empresa_css_path, css_path]:
    if not path.exists():
        continue

    css = path.read_text(encoding="utf-8", errors="ignore")
    original = css

    for start, end in markers:
        css = re.sub(
            re.escape(start) + r"[\s\S]*?" + re.escape(end),
            "",
            css,
            flags=re.M
        ).rstrip()

    if css != original:
        path.write_text(css + "\n", encoding="utf-8")
        print(f"✅ Limpié intentos anteriores en {path}")

# 3) Agregar regla final en QuienesSomos.module.css
css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === QUIENES DESKTOP LEFT DATA FINAL START === */"
end = "/* === QUIENES DESKTOP LEFT DATA FINAL END === */"

patch = f"""
{start}
/* Desktop Quiénes Somos:
   mueve el bloque real del hero a la izquierda usando data attr propio.
   No toca mobile/tablet. */
@media (min-width: 901px) {{
  :global(section[data-quienes-hero="true"] [data-quienes-hero-content="true"]) {{
    transform: translateX(-65px) !important;
    position: relative !important;
    z-index: 25 !important;
    margin-left: 0 !important;
    margin-right: auto !important;
    text-align: left !important;
    align-items: flex-start !important;
  }}

  :global(section[data-quienes-hero="true"] [data-quienes-hero-content="true"] h1),
  :global(section[data-quienes-hero="true"] [data-quienes-hero-content="true"] p) {{
    text-align: left !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }}

  :global(section[data-quienes-hero="true"] [data-quienes-hero-content="true"] [class*="actions"]) {{
    justify-content: flex-start !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }}
}}
{end}
"""

css = css.rstrip() + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Fix final aplicado")
print("✅ Desktop: heroContent translateX(-65px)")
print("✅ Mobile/tablet no tocados")
