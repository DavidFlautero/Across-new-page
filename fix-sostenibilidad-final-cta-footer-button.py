from pathlib import Path
import re
import shutil

css_path = Path("src/app/globals.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/globals.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-sostenibilidad-final-cta-footer-button")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === SOSTENIBILIDAD FINAL CTA FOOTER BUTTON START === */"
end = "/* === SOSTENIBILIDAD FINAL CTA FOOTER BUTTON END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Sostenibilidad: CTA final pegado al footer y botón subido.
   Replica el ajuste aprobado por consola. */
section[data-across-final-cta="true"] {{
  margin-bottom: -1px !important;
  padding-bottom: 0 !important;
}}

section[data-across-final-cta="true"] + footer,
section[data-across-final-cta="true"] ~ footer {{
  margin-top: 0 !important;
  padding-top: 0 !important;
}}

section[data-across-final-cta="true"] [class*="finalActions"] {{
  transform: translateY(-24px) !important;
  position: relative !important;
  z-index: 20 !important;
}}

section[data-across-final-cta="true"] [class*="finalActions"] a {{
  position: relative !important;
  z-index: 21 !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Sostenibilidad CTA final pegado al footer")
print("✅ Botón subido -24px")
print("✅ Backup:", backup)
