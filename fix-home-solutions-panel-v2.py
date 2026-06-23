from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-solutions-panel-v2")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === HOME SOLUTIONS PANEL REAL FINAL === */"

patch = r'''
/* === HOME SOLUTIONS PANEL REAL FINAL === */
@media (min-width: 901px) {
  .solutionsPanel {
    display: flex !important;
    flex-direction: column !important;
    min-height: 475px !important;
    padding: 38px 34px 30px !important;
    overflow: hidden !important;
  }

  .solutionsPanel h2,
  .solutionsPanel h3 {
    max-width: 420px !important;
    margin-bottom: 1.15rem !important;
    line-height: .98 !important;
    letter-spacing: -.045em !important;
    text-shadow: 0 5px 22px rgba(0, 0, 0, .72) !important;
  }

  .panelStats {
    display: grid !important;
    gap: .78rem !important;
    margin: 0 0 .9rem !important;
    padding: 0 !important;
  }

  .panelStats > div {
    position: relative !important;
    display: grid !important;
    grid-template-columns: 34px minmax(0, 1fr) !important;
    column-gap: .85rem !important;
    align-items: center !important;
    padding: .72rem .86rem !important;
    border-radius: 16px !important;
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, .18),
        rgba(255, 255, 255, .075)
      ) !important;
    border: 1px solid rgba(255, 255, 255, .20) !important;
    box-shadow:
      0 14px 34px rgba(0, 0, 0, .20),
      inset 0 1px 0 rgba(255, 255, 255, .16) !important;
    backdrop-filter: blur(8px) saturate(130%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(130%) !important;
  }

  .panelStats > div::before {
    content: "" !important;
    grid-column: 1 !important;
    grid-row: 1 / span 2 !important;
    width: 26px !important;
    height: 26px !important;
    border-radius: 999px !important;
    background: rgba(5, 31, 55, .88) !important;
    border: 1px solid rgba(210, 164, 92, .82) !important;
    box-shadow:
      0 8px 22px rgba(0, 0, 0, .34),
      inset 0 1px 0 rgba(255, 255, 255, .14) !important;
  }

  .panelStats > div::after {
    content: "" !important;
    position: absolute !important;
    left: calc(.86rem + 9px) !important;
    top: calc(50% - 3.5px) !important;
    width: 7px !important;
    height: 7px !important;
    border-radius: 999px !important;
    background: #d2a45c !important;
    box-shadow: 0 0 16px rgba(210, 164, 92, .9) !important;
  }

  .panelStats strong {
    grid-column: 2 !important;
    display: block !important;
    margin: 0 0 .18rem !important;
    color: #fff !important;
    font-size: 1rem !important;
    line-height: 1.08 !important;
    text-shadow: 0 4px 18px rgba(0, 0, 0, .72) !important;
  }

  .panelStats small {
    grid-column: 2 !important;
    display: block !important;
    color: rgba(255, 255, 255, .90) !important;
    font-size: .72rem !important;
    line-height: 1.25 !important;
    text-shadow: 0 3px 14px rgba(0, 0, 0, .64) !important;
  }

  .solutionsPanel a[href] {
    align-self: flex-start !important;
    margin-top: .45rem !important;
    min-height: 44px !important;
    padding: 0 1.45rem !important;
    border-radius: 999px !important;
    background: rgba(5, 31, 55, .92) !important;
    border: 1px solid rgba(210, 164, 92, .76) !important;
    color: #fff !important;
    box-shadow:
      0 14px 32px rgba(0, 0, 0, .30),
      inset 0 1px 0 rgba(255, 255, 255, .14) !important;
    text-shadow: none !important;
    white-space: nowrap !important;
  }
}

@media (min-width: 1181px) {
  .solutionsPanel {
    min-height: 455px !important;
    padding-top: 36px !important;
    padding-bottom: 28px !important;
  }

  .panelStats {
    gap: .72rem !important;
    margin-bottom: .75rem !important;
  }

  .panelStats > div {
    padding-top: .66rem !important;
    padding-bottom: .66rem !important;
  }

  .solutionsPanel a[href] {
    margin-top: .3rem !important;
  }
}
'''

if marker in css:
    css = re.sub(
        r'/\* === HOME SOLUTIONS PANEL REAL FINAL === \*/[\s\S]*?(?=\n/\* ===|\Z)',
        patch.strip(),
        css,
        flags=re.M,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Panel azul HOME corregido v2")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
