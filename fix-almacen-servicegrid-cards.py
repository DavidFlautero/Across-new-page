from pathlib import Path
import re
import shutil

targets = [
    Path("src/app/servicios/almacen-distribucion/AlmacenDistribucion.module.css"),
    Path("src/app/servicios/almacen/AlmacenDistribucion.module.css"),
    Path("src/app/servicios/almacen-y-distribucion/AlmacenDistribucion.module.css"),
]

css_path = None

for p in targets:
    if p.exists():
        css_path = p
        break

if css_path is None:
    matches = list(Path("src").rglob("AlmacenDistribucion.module.css"))
    if matches:
        css_path = matches[0]

if css_path is None:
    raise SystemExit("❌ No encontré AlmacenDistribucion.module.css en src/")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-local-servicegrid-visible")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === ALMACEN SERVICEGRID CARDS VISIBLE LOCAL FINAL === */"

patch = r'''
/* === ALMACEN SERVICEGRID CARDS VISIBLE LOCAL FINAL === */
.services .serviceGrid article {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.22),
      rgba(255, 255, 255, 0.12)
    ) !important;
  border: 1px solid rgba(255, 255, 255, 0.42) !important;
  box-shadow:
    0 22px 55px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.28) !important;
  backdrop-filter: blur(10px) saturate(135%) !important;
  -webkit-backdrop-filter: blur(10px) saturate(135%) !important;
}

.services .serviceGrid article:hover {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.30),
      rgba(255, 255, 255, 0.18)
    ) !important;
  border-color: rgba(255, 255, 255, 0.58) !important;
  transform: translateY(-3px) !important;
}

.services .serviceGrid article h3 {
  color: #ffffff !important;
  text-shadow: 0 3px 14px rgba(0, 0, 0, 0.75) !important;
}

.services .serviceGrid article p {
  color: rgba(255, 255, 255, 0.96) !important;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.75) !important;
}

.services .serviceGrid article i {
  background: rgba(5, 31, 55, 0.82) !important;
  border: 1px solid rgba(210, 164, 92, 0.55) !important;
  color: #d2a45c !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35) !important;
}
'''

if marker in css:
    css = re.sub(
        r'/\* === ALMACEN SERVICEGRID CARDS VISIBLE LOCAL FINAL === \*/[\s\S]*?(?=\n/\* ===|\Z)',
        patch.strip(),
        css,
        flags=re.M,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Cambio aplicado SOLO en:", css_path)
print("✅ Backup:", backup)
