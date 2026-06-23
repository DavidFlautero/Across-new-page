from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-globaltrust-before-bg-tablet")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === GLOBAL TRUST BEFORE BG TABLET FINAL START === */"
end = "/* === GLOBAL TRUST BEFORE BG TABLET FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Solo tablet/iPad: el mapa/logos viven en .globalTrust::before */
@media (min-width: 769px) and (max-width: 1180px) {{
  .globalTrust::before {{
    background-position: 0 0, center center !important;
    background-size: auto, 108% auto !important;
    background-repeat: repeat, no-repeat !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Fix tablet aplicado sobre .globalTrust::before")
print("✅ background-position: 0 0, center center")
print("✅ background-size: auto, 108% auto")
print("✅ Mobile y desktop grande intactos")
print("✅ Backup:", backup)
