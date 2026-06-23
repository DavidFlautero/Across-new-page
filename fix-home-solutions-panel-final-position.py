from pathlib import Path
import re
import shutil

css_path = Path("src/app/globals.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/globals.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-home-solutions-final-position")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker_start = "/* === HOME SOLUTIONS PANEL FINAL POSITION START === */"
marker_end = "/* === HOME SOLUTIONS PANEL FINAL POSITION END === */"

# Borra versiones anteriores de este mismo parche si existen
pattern = re.compile(
    re.escape(marker_start) + r"[\s\S]*?" + re.escape(marker_end),
    re.M
)
css = pattern.sub("", css).rstrip()

patch = f"""
{marker_start}
@media (min-width: 901px) {{
  html body main section:has(aside[class*="solutionsPanel"]) aside[class*="solutionsPanel"] {{
    margin-top: 0px !important;
    transform: translateY(-78px) !important;
    align-self: flex-start !important;
    will-change: transform !important;
  }}
}}
{marker_end}
"""

css = css + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Posición final aplicada al panel derecho HOME")
print("✅ margin-top: 0px")
print("✅ transform: translateY(-78px)")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
