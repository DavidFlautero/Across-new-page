from pathlib import Path
import re
import shutil

PAGE = Path("src/app/servicios/transporte-maritimo/page.tsx")

if not PAGE.exists():
    raise SystemExit("❌ No existe src/app/servicios/transporte-maritimo/page.tsx")

page_text = PAGE.read_text(encoding="utf-8", errors="ignore")

m = re.search(r'import\s+styles\s+from\s+[\'"](.+?\.module\.css)[\'"]', page_text)
if not m:
    raise SystemExit("❌ No encontré import styles from ...module.css en transporte-maritimo/page.tsx")

css_rel = m.group(1)
CSS = (PAGE.parent / css_rel).resolve()

if not CSS.exists():
    raise SystemExit(f"❌ No existe el CSS detectado: {CSS}")

backup = CSS.with_suffix(CSS.suffix + ".bak-before-maritime-hero-width")
if not backup.exists():
    shutil.copy2(CSS, backup)

css = CSS.read_text(encoding="utf-8", errors="ignore")

marker = "/* === FIX MARITIME HERO WIDTH FINAL === */"

patch = r'''

/* === FIX MARITIME HERO WIDTH FINAL === */
@media (min-width: 901px) {
  .heroInner {
    width: min(1500px, calc(100% - 120px)) !important;
  }

  .heroContent {
    max-width: 980px !important;
    width: min(980px, 64vw) !important;
  }

  .title {
    max-width: 980px !important;
    font-size: clamp(4.6rem, 5.8vw, 7.4rem) !important;
    line-height: .92 !important;
    letter-spacing: -0.075em !important;
    text-wrap: balance !important;
  }

  .subtitle {
    max-width: 690px !important;
  }

  .actions {
    max-width: 760px !important;
  }
}

@media (min-width: 1200px) {
  .title {
    max-width: 1050px !important;
  }

  .heroContent {
    max-width: 1050px !important;
    width: min(1050px, 66vw) !important;
  }
}
'''

if marker in css:
    css = re.sub(
        r'/\* === FIX MARITIME HERO WIDTH FINAL === \*/[\s\S]*$',
        patch.strip() + "\n",
        css
    )
else:
    css = css.rstrip() + "\n" + patch

CSS.write_text(css, encoding="utf-8")

print("✅ CSS corregido:", CSS)
print("✅ Backup:", backup)
print("✅ Hero marítimo ahora queda más ancho y no partido en tantas líneas.")
