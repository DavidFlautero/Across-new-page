from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-global-trust-container-margin")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === GLOBAL TRUST CONTAINER MARGIN FINAL START === */"
end = "/* === GLOBAL TRUST CONTAINER MARGIN FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
@media (min-width: 769px) {{
  .globalOverlay {{
    width: min(100% - 48px, 1180px) !important;
    max-width: 1180px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    overflow: visible !important;
  }}

  .globalContent {{
    width: 100% !important;
    max-width: 1180px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    overflow: visible !important;
  }}

  .globalCards {{
    width: 100% !important;
    max-width: 1080px !important;
  }}
}}

@media (min-width: 1181px) {{
  .globalOverlay {{
    width: min(100% - 80px, 1180px) !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Margen lateral aplicado a la sección global")
print("✅ Contenido centrado como el resto de la página")
print("✅ Backup:", backup)
