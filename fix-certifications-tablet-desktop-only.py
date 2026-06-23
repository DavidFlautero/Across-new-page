from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-certifications-tablet-desktop-only")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

markers = [
    ("/* === GLOBAL TRUST CERTIFICATIONS REAL FIX START === */", "/* === GLOBAL TRUST CERTIFICATIONS REAL FIX END === */"),
    ("/* === CERTIFICATIONS ROW CONTAINER FINAL START === */", "/* === CERTIFICATIONS ROW CONTAINER FINAL END === */"),
    ("/* === CERTIFICATIONS ONLY FINAL START === */", "/* === CERTIFICATIONS ONLY FINAL END === */"),
    ("/* === CERTIFICATIONS TABLET DESKTOP ONLY START === */", "/* === CERTIFICATIONS TABLET DESKTOP ONLY END === */"),
]

for start, end in markers:
    css = re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        css,
        flags=re.M
    )

start = "/* === CERTIFICATIONS TABLET DESKTOP ONLY START === */"
end = "/* === CERTIFICATIONS TABLET DESKTOP ONLY END === */"

patch = f"""
{start}
/* SOLO TABLET + DESKTOP.
   Mobile queda intacto porque empieza en 769px. */
@media (min-width: 769px) {{
  .mobileCertifications {{
    position: relative !important;
    z-index: 3 !important;

    display: block !important;
    width: 100% !important;
    max-width: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    background: #f7f4ee !important;
    overflow: visible !important;
    transform: none !important;
  }}

  .certificationsImage {{
    position: relative !important;
    display: block !important;

    width: min(100% - 48px, 1180px) !important;
    max-width: 1180px !important;
    height: 94px !important;

    margin-left: auto !important;
    margin-right: auto !important;

    padding: 0 !important;
    overflow: hidden !important;

    border-radius: 0 !important;
    background: #f7f4ee !important;
    box-shadow: none !important;
    filter: none !important;
  }}

  .certificationsImage img {{
    width: 100% !important;
    height: 100% !important;

    object-fit: contain !important;
    object-position: center center !important;

    display: block !important;
    filter: none !important;
  }}
}}

@media (min-width: 1181px) {{
  .certificationsImage {{
    width: min(100% - 80px, 1180px) !important;
    height: 98px !important;
  }}
}}

@media (min-width: 769px) and (max-width: 1020px) {{
  .certificationsImage {{
    width: min(100% - 40px, 960px) !important;
    height: 86px !important;
  }}
}}
{end}
"""

css = css.rstrip() + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Certificaciones ajustadas SOLO tablet/desktop")
print("✅ Mobile intacto: no hay reglas debajo de 769px")
print("✅ Backup:", backup)
