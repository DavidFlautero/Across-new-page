from pathlib import Path
import re
import shutil

tsx_path = Path("src/components/sections/HomeCorporateFinal.tsx")
css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not tsx_path.exists():
    raise SystemExit("❌ No existe HomeCorporateFinal.tsx")
if not css_path.exists():
    raise SystemExit("❌ No existe HomeCorporateFinal.module.css")

# Backups
tsx_backup = tsx_path.with_suffix(tsx_path.suffix + ".bak-before-trust-title-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-trust-title-final")

if not tsx_backup.exists():
    shutil.copy2(tsx_path, tsx_backup)
if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = tsx_path.read_text(encoding="utf-8", errors="ignore")

old_variants = [
    "Experiencia, certificaciones y una red global para cuidar su operación..",
    "Experiencia, certificaciones y una red global para cuidar su operación.",
    "Experiencia, certificaciones y una red global para cuidar su operación",
]

new_title = "Experiencia certificada y red global para cuidar cada operación."

changed = False
for old in old_variants:
    if old in tsx:
        tsx = tsx.replace(old, new_title)
        changed = True

if not changed:
    print("⚠️ No encontré el título exacto, busco por regex...")
    tsx2 = re.sub(
        r"Experiencia,\s*certificaciones\s*y\s*una\s*red\s*global\s*para\s*cuidar\s*su\s*operación\.{0,2}",
        new_title,
        tsx,
        flags=re.I
    )
    changed = tsx2 != tsx
    tsx = tsx2

tsx_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === TRUST SECTION TITLE FINAL START === */"
end = "/* === TRUST SECTION TITLE FINAL END === */"

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
    width: min(100%, 1180px) !important;
    max-width: 1180px !important;
    overflow: visible !important;
  }}

  .globalContent {{
    width: min(100%, 1180px) !important;
    max-width: 1180px !important;
    overflow: visible !important;
  }}

  .globalContent h2 {{
    width: min(100%, 1080px) !important;
    max-width: 1080px !important;
    font-size: clamp(3.8rem, 4.35vw, 5.35rem) !important;
    line-height: .92 !important;
    letter-spacing: -.065em !important;
    text-wrap: balance !important;
    margin-bottom: 2.15rem !important;
  }}

  .globalCards {{
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 16px !important;
    width: min(100%, 1080px) !important;
    max-width: 1080px !important;
    margin-top: 0 !important;
  }}

  .globalCards > div {{
    padding: 22px 24px !important;
    min-height: 112px !important;
    box-sizing: border-box !important;
  }}

  .globalCards > div strong {{
    display: block !important;
    margin: 0 0 8px !important;
    line-height: 1.1 !important;
  }}

  .globalCards > div p {{
    margin: 0 !important;
    line-height: 1.42 !important;
  }}
}}

@media (min-width: 769px) and (max-width: 1180px) {{
  .globalContent h2 {{
    width: min(100%, 940px) !important;
    max-width: 940px !important;
    font-size: clamp(3.25rem, 5vw, 4.55rem) !important;
    line-height: .94 !important;
  }}

  .globalCards {{
    width: min(100%, 960px) !important;
    max-width: 960px !important;
    gap: 12px !important;
  }}

  .globalCards > div {{
    padding: 18px 18px !important;
    min-height: 118px !important;
  }}

  .globalCards > div p {{
    font-size: .78rem !important;
    line-height: 1.35 !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Título profesional aplicado")
print("✅ Nuevo título:", new_title)
print("✅ Cards en fila con padding final")
print("✅ Backup TSX:", tsx_backup)
print("✅ Backup CSS:", css_backup)
