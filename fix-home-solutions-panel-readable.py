from pathlib import Path
import re
import shutil

css_path = Path("src/components/sections/HomeCorporateFinal.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-solutions-readable-cards")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === HOME SOLUTIONS PANEL READABLE CARDS FINAL === */"

patch = r'''
/* === HOME SOLUTIONS PANEL READABLE CARDS FINAL === */
@media (min-width: 901px) {
  .panelStats {
    display: grid !important;
    gap: .78rem !important;
    margin: 0 0 .8rem !important;
    padding: 0 !important;
  }

  .panelStats > div {
    position: relative !important;
    display: grid !important;
    grid-template-columns: 38px minmax(0, 1fr) !important;
    column-gap: .85rem !important;
    align-items: center !important;
    padding: .72rem .9rem !important;
    border-radius: 16px !important;
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, .86),
        rgba(255, 255, 255, .66)
      ) !important;
    border: 1px solid rgba(255, 255, 255, .72) !important;
    box-shadow:
      0 16px 38px rgba(0, 0, 0, .22),
      inset 0 1px 0 rgba(255, 255, 255, .72) !important;
    backdrop-filter: blur(14px) saturate(150%) !important;
    -webkit-backdrop-filter: blur(14px) saturate(150%) !important;
  }

  .panelStats > div::before {
    grid-column: 1 !important;
    grid-row: 1 / span 2 !important;
    width: 30px !important;
    height: 30px !important;
    display: grid !important;
    place-items: center !important;
    border-radius: 999px !important;
    background: #173247 !important;
    border: 1px solid rgba(210, 164, 92, .80) !important;
    color: #d2a45c !important;
    font-size: .9rem !important;
    font-weight: 950 !important;
    line-height: 1 !important;
    box-shadow:
      0 8px 22px rgba(0, 0, 0, .26),
      inset 0 1px 0 rgba(255, 255, 255, .14) !important;
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
    color: #07101a !important;
    font-size: 1rem !important;
    line-height: 1.08 !important;
    text-shadow: none !important;
  }

  .panelStats small {
    grid-column: 2 !important;
    display: block !important;
    color: rgba(7, 16, 26, .82) !important;
    font-size: .72rem !important;
    line-height: 1.25 !important;
    font-weight: 800 !important;
    text-shadow: none !important;
  }

  .solutionsPanel a[href] {
    margin-top: .25rem !important;
    min-height: 44px !important;
    padding: 0 1.45rem !important;
    border-radius: 999px !important;
    background: rgba(5, 31, 55, .94) !important;
    border: 1px solid rgba(210, 164, 92, .82) !important;
    color: #fff !important;
    box-shadow:
      0 14px 32px rgba(0, 0, 0, .30),
      inset 0 1px 0 rgba(255, 255, 255, .14) !important;
    text-shadow: none !important;
    white-space: nowrap !important;
  }
}

@media (min-width: 1181px) {
  .panelStats {
    gap: .7rem !important;
    margin-bottom: .7rem !important;
  }

  .panelStats > div {
    padding-top: .62rem !important;
    padding-bottom: .62rem !important;
  }

  .solutionsPanel a[href] {
    margin-top: .2rem !important;
  }
}
'''

if marker in css:
    css = re.sub(
        r'/\* === HOME SOLUTIONS PANEL READABLE CARDS FINAL === \*/[\s\S]*?(?=\n/\* ===|\Z)',
        patch.strip(),
        css,
        flags=re.M,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Tarjetas internas del panel HOME ahora son blancas, legibles y con iconos reales")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
