from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-solutions-premium-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

# Limpiar intentos anteriores de este mismo bloque para que no se pisen
old_markers = [
    "/* === HOME SOLUTIONS PANEL REAL FINAL === */",
    "/* === HOME SOLUTIONS PANEL WHITE GLASS TUNING === */",
    "/* === HOME SOLUTIONS PANEL READABLE CARDS FINAL === */",
    "/* === HOME SOLUTIONS PANEL PREMIUM FINAL === */",
]

for marker in old_markers:
    css = re.sub(
        re.escape(marker) + r'[\s\S]*?(?=\n/\* ===|\Z)',
        "",
        css,
        flags=re.M,
    )

patch = r'''
/* === HOME SOLUTIONS PANEL PREMIUM FINAL === */
@media (min-width: 901px) {
  .solutionsPanel {
    position: relative !important;
    display: flex !important;
    flex-direction: column !important;
    min-height: 455px !important;
    padding: 36px 34px 28px !important;
    overflow: hidden !important;
    border-radius: 14px !important;
    border: 1px solid rgba(255, 255, 255, .14) !important;
    box-shadow:
      0 30px 80px rgba(0, 0, 0, .22),
      inset 0 1px 0 rgba(255, 255, 255, .10) !important;
  }

  .solutionsPanel h2,
  .solutionsPanel h3 {
    max-width: 420px !important;
    margin-bottom: 1.2rem !important;
    color: #fff !important;
    line-height: .98 !important;
    letter-spacing: -.045em !important;
    text-shadow: 0 5px 22px rgba(0, 0, 0, .72) !important;
  }

  .panelStats {
    display: grid !important;
    gap: .72rem !important;
    margin: 0 0 .9rem !important;
    padding: 0 !important;
  }

  .panelStats > div {
    position: relative !important;
    display: grid !important;
    grid-template-columns: 34px minmax(0, 1fr) !important;
    column-gap: .82rem !important;
    align-items: center !important;
    padding: .72rem .86rem !important;
    border-radius: 14px !important;

    background:
      linear-gradient(
        180deg,
        rgba(5, 31, 55, .74),
        rgba(5, 20, 34, .58)
      ) !important;

    border: 1px solid rgba(210, 164, 92, .26) !important;

    box-shadow:
      0 14px 32px rgba(0, 0, 0, .24),
      inset 0 1px 0 rgba(255, 255, 255, .10) !important;

    backdrop-filter: blur(10px) saturate(135%) !important;
    -webkit-backdrop-filter: blur(10px) saturate(135%) !important;
  }

  .panelStats > div::before {
    grid-column: 1 !important;
    grid-row: 1 / span 2 !important;
    width: 28px !important;
    height: 28px !important;
    display: grid !important;
    place-items: center !important;
    border-radius: 999px !important;
    background: rgba(2, 9, 16, .92) !important;
    border: 1px solid rgba(210, 164, 92, .72) !important;
    color: #d2a45c !important;
    font-size: .82rem !important;
    font-weight: 950 !important;
    line-height: 1 !important;
    box-shadow:
      0 8px 20px rgba(0, 0, 0, .32),
      inset 0 1px 0 rgba(255, 255, 255, .10) !important;
  }

  .panelStats > div:nth-child(1)::before {
    content: "⇄" !important;
  }

  .panelStats > div:nth-child(2)::before {
    content: "✓" !important;
  }

  .panelStats > div:nth-child(3)::before {
    content: "⌖" !important;
  }

  .panelStats > div::after {
    display: none !important;
    content: none !important;
  }

  .panelStats strong {
    grid-column: 2 !important;
    display: block !important;
    margin: 0 0 .16rem !important;
    color: #ffffff !important;
    font-size: .98rem !important;
    line-height: 1.08 !important;
    text-shadow: 0 3px 14px rgba(0, 0, 0, .66) !important;
  }

  .panelStats small {
    grid-column: 2 !important;
    display: block !important;
    color: rgba(255, 255, 255, .84) !important;
    font-size: .71rem !important;
    line-height: 1.25 !important;
    font-weight: 800 !important;
    text-shadow: 0 3px 12px rgba(0, 0, 0, .58) !important;
  }

  .solutionsPanel a[href] {
    align-self: flex-start !important;
    margin-top: .35rem !important;
    min-height: 44px !important;
    padding: 0 1.45rem !important;
    border-radius: 999px !important;
    background: rgba(5, 31, 55, .94) !important;
    border: 1px solid rgba(210, 164, 92, .76) !important;
    color: #fff !important;
    box-shadow:
      0 14px 32px rgba(0, 0, 0, .30),
      inset 0 1px 0 rgba(255, 255, 255, .14) !important;
    text-shadow: none !important;
    white-space: nowrap !important;
  }

  .solutionsPanel a[href]:hover {
    background: rgba(8, 40, 66, .98) !important;
    border-color: rgba(210, 164, 92, .96) !important;
    transform: translateY(-1px) !important;
  }
}

@media (min-width: 1181px) {
  .solutionsPanel {
    min-height: 445px !important;
    padding-top: 34px !important;
    padding-bottom: 26px !important;
  }

  .panelStats {
    gap: .68rem !important;
    margin-bottom: .78rem !important;
  }

  .panelStats > div {
    padding-top: .64rem !important;
    padding-bottom: .64rem !important;
  }

  .solutionsPanel a[href] {
    margin-top: .2rem !important;
  }
}
'''

css = css.rstrip() + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Panel HOME corregido premium final")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
