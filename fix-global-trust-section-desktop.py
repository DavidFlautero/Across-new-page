from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-global-trust-section-fix")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === GLOBAL TRUST SECTION DESKTOP FIX START === */"
end = "/* === GLOBAL TRUST SECTION DESKTOP FIX END === */"

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
    width: min(100%, 1180px) !important;
    max-width: 1180px !important;
    font-size: clamp(4.2rem, 5.2vw, 6.1rem) !important;
    line-height: .94 !important;
    letter-spacing: -.065em !important;
  }}

  .globalCards {{
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 16px !important;
    width: min(100%, 1080px) !important;
    max-width: 1080px !important;
    margin-top: 28px !important;
  }}

  .globalCards > div {{
    width: auto !important;
    max-width: none !important;
    min-width: 0 !important;
    min-height: 118px !important;
    padding: 22px 24px !important;
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

@media (min-width: 769px) and (max-width: 1100px) {{
  .globalContent h2 {{
    font-size: clamp(3.4rem, 5.4vw, 4.8rem) !important;
    max-width: 980px !important;
  }}

  .globalCards {{
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 12px !important;
    max-width: 980px !important;
  }}

  .globalCards > div {{
    padding: 18px 18px !important;
    min-height: 122px !important;
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

print("✅ Arreglado globalOverlay/globalContent/globalCards")
print("✅ Título con ancho real")
print("✅ Cards en fila desktop/tablet")
print("✅ Backup:", backup)
