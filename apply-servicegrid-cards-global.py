from pathlib import Path
import shutil
import re

candidates = [
    Path("src/app/globals.css"),
    Path("src/styles/globals.css"),
    Path("src/app/global.css"),
]

css_path = None
for p in candidates:
    if p.exists():
        css_path = p
        break

if css_path is None:
    css_path = Path("src/app/globals.css")
    css_path.parent.mkdir(parents=True, exist_ok=True)
    css_path.write_text("", encoding="utf-8")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-servicegrid-visible-global")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

marker = "/* === GLOBAL SERVICEGRID CARDS VISIBLE FINAL === */"

patch = r'''
/* === GLOBAL SERVICEGRID CARDS VISIBLE FINAL === */
[class*="serviceGrid"] article {
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

[class*="serviceGrid"] article:hover {
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.30),
      rgba(255, 255, 255, 0.18)
    ) !important;
  border-color: rgba(255, 255, 255, 0.58) !important;
  transform: translateY(-3px) !important;
}

[class*="serviceGrid"] article h3 {
  color: #ffffff !important;
  text-shadow: 0 3px 14px rgba(0, 0, 0, 0.75) !important;
}

[class*="serviceGrid"] article p {
  color: rgba(255, 255, 255, 0.96) !important;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.75) !important;
}

[class*="serviceGrid"] article i {
  background: rgba(5, 31, 55, 0.82) !important;
  border: 1px solid rgba(210, 164, 92, 0.55) !important;
  color: #d2a45c !important;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35) !important;
}
'''

if marker in css:
    css = re.sub(
        r'/\* === GLOBAL SERVICEGRID CARDS VISIBLE FINAL === \*/[\s\S]*?(?=\n/\* ===|\Z)',
        patch.strip(),
        css,
        flags=re.M,
    )
else:
    css = css.rstrip() + "\n\n" + patch.strip() + "\n"

css_path.write_text(css, encoding="utf-8")

print("✅ Override global aplicado en:", css_path)
print("✅ Backup:", backup)
