from pathlib import Path
import re
import shutil

css_path = Path("src/app/empresa/Empresa.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/Empresa.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-quienes-desktop-left-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === QUIENES HERO DESKTOP LEFT FINAL START === */"
end = "/* === QUIENES HERO DESKTOP LEFT FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Desktop: mueve todo el bloque del hero hacia la izquierda.
   No toca mobile/tablet. */
@media (min-width: 901px) {{
  .heroContent {{
    transform: translateX(-65px) !important;
    position: relative !important;
    z-index: 25 !important;
    margin-left: 0 !important;
    margin-right: auto !important;
    text-align: left !important;
    align-items: flex-start !important;
  }}

  .heroContent h1,
  .heroContent p {{
    text-align: left !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }}

  .actions {{
    justify-content: flex-start !important;
    margin-left: 0 !important;
    margin-right: auto !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Desktop Quiénes somos movido a la izquierda: -65px")
print("✅ Mobile/tablet no tocados")
print("✅ Backup:", backup)
