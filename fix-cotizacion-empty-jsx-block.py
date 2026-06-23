from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-empty-jsx-fix")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Borra bloques JSX vacíos tipo:
# {activeStep === 3 && (
# )}
tsx = re.sub(
    r"\s*\{\s*activeStep\s*===\s*3\s*&&\s*\(\s*\)\s*\}",
    "",
    tsx,
    flags=re.S
)

# Borra cualquier conditional vacío similar que haya quedado por el submit global
tsx = re.sub(
    r"\s*\{\s*activeStep\s*===\s*3\s*&&\s*\(\s*\n\s*\)\s*\}",
    "",
    tsx,
    flags=re.S
)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Eliminado bloque JSX vacío que rompía el build")
print("✅ Backup:", backup)
