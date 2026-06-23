from pathlib import Path
import re
import shutil

css_path = Path("src/app/contacto/Contacto.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/contacto/Contacto.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-blue-panel-gold-badge")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === CONTACTO BLUE PANEL GOLD BADGE START === */"
end = "/* === CONTACTO BLUE PANEL GOLD BADGE END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Panel lateral de contacto en azul corporativo + volanta CONTACTO dorada */

.signalPanel {{
  background:
    radial-gradient(circle at 92% 0%, rgba(214, 192, 141, .14), transparent 22rem),
    linear-gradient(135deg, #07111d 0%, #0d1c2b 52%, #173247 100%) !important;
  border: 1px solid rgba(214, 192, 141, .18) !important;
  box-shadow: 0 30px 90px rgba(7, 17, 29, .22) !important;
}}

.signalPanel::before {{
  background:
    linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,.018) 1px, transparent 1px) !important;
  background-size: 72px 72px !important;
  opacity: .18 !important;
}}

.signalItem {{
  background: rgba(255, 255, 255, .055) !important;
  border: 1px solid rgba(214, 192, 141, .16) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06) !important;
}}

.signalItem strong {{
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
}}

.signalItem p {{
  color: rgba(255,255,255,.76) !important;
  -webkit-text-fill-color: rgba(255,255,255,.76) !important;
}}

/* CONTACTO arriba del título en dorado */
.contactHeroCopy span {{
  color: #d6c08d !important;
  -webkit-text-fill-color: #d6c08d !important;
  letter-spacing: .18em !important;
  font-weight: 950 !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Contacto: panel azul corporativo aplicado")
print("✅ CONTACTO dorado arriba del título")
print("✅ Backup:", backup)
