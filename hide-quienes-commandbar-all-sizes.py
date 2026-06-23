from pathlib import Path
import re
import shutil

css_path = Path("src/app/empresa/Empresa.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/Empresa.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-hide-quienes-commandbar")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === HIDE QUIENES HERO COMMANDBAR START === */"
end = "/* === HIDE QUIENES HERO COMMANDBAR END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Oculta la barra de confianza del hero SOLO en Quiénes somos.
   No toca otras páginas ni Certifications. */
section[data-quienes-hero="true"] [data-aereo-trust="true"] {{
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ CommandBar oculto en todos los tamaños para Quiénes somos")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
