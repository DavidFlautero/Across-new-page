from pathlib import Path
import re
import shutil

global_css = Path("src/app/globals.css")

if not global_css.exists():
    raise SystemExit("❌ No existe src/app/globals.css")

backup = global_css.with_suffix(global_css.suffix + ".bak-before-oficinas-mobile-button-final")
if not backup.exists():
    shutil.copy2(global_css, backup)

css = global_css.read_text(encoding="utf-8", errors="ignore")

markers = [
    ("/* === OFICINAS MOBILE BUTTON FINAL START === */", "/* === OFICINAS MOBILE BUTTON FINAL END === */"),
    ("/* === OFICINAS HERO MOBILE FLOW FINAL START === */", "/* === OFICINAS HERO MOBILE FLOW FINAL END === */"),
    ("/* === OFICINAS MOBILE FLOW FINAL START === */", "/* === OFICINAS MOBILE FLOW FINAL END === */"),
]

for start, end in markers:
    css = re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        css,
        flags=re.M
    ).rstrip()

start = "/* === OFICINAS MOBILE BUTTON FINAL START === */"
end = "/* === OFICINAS MOBILE BUTTON FINAL END === */"

patch = f"""
{start}
/* Oficinas mobile chico:
   replica el ajuste aprobado por consola.
   Subimos volanta/título/texto y el botón un poco más,
   sin tocar Certificaciones. */
@media (max-width: 430px) and (min-height: 600px) {{
  section[data-oficinas-hero="true"] {{
    padding-bottom: 7.4rem !important;
    overflow: visible !important;
  }}

  section[data-oficinas-hero="true"] [class*="eyebrow"],
  section[data-oficinas-hero="true"] h1,
  section[data-oficinas-hero="true"] h1 + p {{
    transform: translateY(-42px) !important;
    position: relative !important;
    z-index: 30 !important;
  }}

  section[data-oficinas-hero="true"] [class*="eyebrow"] {{
    display: inline-block !important;
    z-index: 31 !important;
    margin-bottom: .72rem !important;
  }}

  section[data-oficinas-hero="true"] h1 {{
    margin-bottom: .95rem !important;
  }}

  section[data-oficinas-hero="true"] h1 + p {{
    margin-bottom: 2.35rem !important;
  }}

  section[data-oficinas-hero="true"] [class*="actions"] {{
    transform: translateY(-78px) !important;
    position: relative !important;
    z-index: 80 !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
  }}

  section[data-oficinas-hero="true"] [class*="actions"] a {{
    display: inline-flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: relative !important;
    z-index: 90 !important;
  }}

  section[data-oficinas-hero="true"] + section {{
    position: relative !important;
    z-index: 5 !important;
  }}
}}
{end}
"""

global_css.write_text(css + "\n\n" + patch.strip() + "\n", encoding="utf-8")

print("✅ Fix aplicado en globals.css")
print("✅ Oficinas mobile: botón subido sin tocar certificaciones")
print("✅ Backup:", backup)
