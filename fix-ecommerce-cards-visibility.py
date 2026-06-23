from pathlib import Path
import re
import shutil

candidates = [
    Path("src/app/servicios/ecommerce/ECommerce.module.css"),
    Path("src/app/servicios/e-commerce/ECommerce.module.css"),
]

css_path = None

for p in candidates:
    if p.exists():
        css_path = p
        break

if css_path is None:
    matches = list(Path("src").rglob("ECommerce.module.css"))
    if matches:
        css_path = matches[0]

if css_path is None:
    raise SystemExit("❌ No encontré ECommerce.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-card-visibility")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === ECOMMERCE CARDS VISIBILITY FINAL === */"

patch = r'''
/* === ECOMMERCE CARDS VISIBILITY FINAL === */
.serviceGrid article {
  background:
    linear-gradient(180deg, rgba(8, 17, 28, .88), rgba(5, 11, 19, .82)) !important;
  border: 1px solid rgba(255, 255, 255, .22) !important;
  box-shadow:
    0 24px 70px rgba(0, 0, 0, .42),
    inset 0 1px 0 rgba(255, 255, 255, .10) !important;
  backdrop-filter: blur(14px) saturate(130%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(130%) !important;
}

.serviceGrid article:hover {
  background:
    linear-gradient(180deg, rgba(10, 23, 38, .94), rgba(6, 14, 24, .88)) !important;
  border-color: rgba(210, 164, 92, .48) !important;
  transform: translateY(-4px);
}

.serviceGrid article i {
  color: #d2a45c !important;
  background: rgba(10, 35, 58, .70) !important;
  border: 1px solid rgba(210, 164, 92, .28) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .28) !important;
}

.serviceGrid article h3 {
  color: #fff !important;
  text-shadow: 0 2px 18px rgba(0, 0, 0, .55) !important;
}

.serviceGrid article p {
  color: rgba(255, 255, 255, .88) !important;
  text-shadow: 0 2px 16px rgba(0, 0, 0, .45) !important;
}

@media (max-width: 900px) {
  .serviceGrid article {
    background:
      linear-gradient(180deg, rgba(8, 17, 28, .93), rgba(5, 11, 19, .88)) !important;
  }
}
'''

if marker in css:
    css = re.sub(
        r'/\* === ECOMMERCE CARDS VISIBILITY FINAL === \*/[\s\S]*$',
        patch.strip() + "\n",
        css,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Cards e-commerce más visibles")
print("CSS:", css_path)
print("Backup:", backup)
