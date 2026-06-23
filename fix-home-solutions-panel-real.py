from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-solutions-panel-real")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === HOME SOLUTIONS PANEL REAL FINAL === */"

patch = r'''
/* === HOME SOLUTIONS PANEL REAL FINAL === */
@media (min-width: 901px) {
  .solutionsPanel {
    display: grid !important;
    grid-template-rows: auto auto auto !important;
    align-content: start !important;
    min-height: 475px !important;
    padding: 40px 34px 32px !important;
    overflow: hidden !important;
  }

  .solutionsPanel h2,
  .solutionsPanel h3 {
    max-width: 420px !important;
    margin-bottom: 1.35rem !important;
    line-height: .98 !important;
    letter-spacing: -.045em !important;
  }

  .panelStats {
    display: grid !important;
    gap: 1.05rem !important;
    margin: 0 0 1.25rem !important;
    padding: 0 !important;
  }

  .panelStats > div {
    position: relative !important;
    display: grid !important;
    grid-template-columns: 30px minmax(0, 1fr) !important;
    column-gap: .85rem !important;
    align-items: start !important;
    padding: 0 !important;
  }

  .panelStats > div::before {
    content: "" !important;
    grid-column: 1 !important;
    grid-row: 1 / span 2 !important;
    width: 24px !important;
    height: 24px !important;
    margin-top: .05rem !important;
    border-radius: 999px !important;
    background: rgba(5, 31, 55, .82) !important;
    border: 1px solid rgba(210, 164, 92, .78) !important;
    box-shadow:
      0 8px 22px rgba(0, 0, 0, .34),
      inset 0 1px 0 rgba(255, 255, 255, .14) !important;
  }

  .panelStats > div::after {
    content: "" !important;
    position: absolute !important;
    left: 8px !important;
    top: 9px !important;
    width: 7px !important;
    height: 7px !important;
    border-radius: 999px !important;
    background: #d2a45c !important;
    box-shadow: 0 0 16px rgba(210, 164, 92, .9) !important;
  }

  .panelStats strong {
    grid-column: 2 !important;
    display: block !important;
    margin: 0 0 .22rem !important;
    color: #fff !important;
    font-size: 1.04rem !important;
    line-height: 1.08 !important;
    text-shadow: 0 4px 18px rgba(0, 0, 0, .72) !important;
  }

  .panelStats small {
    grid-column: 2 !important;
    display: block !important;
    color: rgba(255, 255, 255, .88) !important;
    font-size: .73rem !important;
    line-height: 1.25 !important;
    text-shadow: 0 3px 14px rgba(0, 0, 0, .64) !important;
  }

  .solutionsPanel a[href] {
    align-self: start !important;
    justify-self: start !important;
    margin-top: .25rem !important;
    min-height: 46px !important;
    padding: 0 1.45rem !important;
    border-radius: 999px !important;
    background: rgba(5, 31, 55, .88) !important;
    border: 1px solid rgba(210, 164, 92, .72) !important;
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
    padding-top: 38px !important;
    padding-bottom: 30px !important;
  }

  .panelStats {
    gap: .95rem !important;
    margin-bottom: 1.05rem !important;
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

print("✅ Cambio aplicado SOLO en:", css_path)
print("✅ Backup:", backup)
