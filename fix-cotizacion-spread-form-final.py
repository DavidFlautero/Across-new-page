from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-spread-form-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Corrige cualquier cantidad incorrecta de puntos antes de form:
# .form, / ....form, / .....form, -> ...form,
tsx = re.sub(r"\.{1,}\s*form,", "...form,", tsx)

# Corrige también prev si algún script lo tocó
tsx = re.sub(r"\.{1,}\s*prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Corregido spread roto: .....form -> ...form")
print("✅ Corregido también cualquier .....prev -> ...prev")
print("✅ Backup:", backup)
