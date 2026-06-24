from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-double-comma-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Arregla comas dobles generadas por el patch anterior
tsx = re.sub(r'",\s*,', '",', tsx)

# Arregla también posibles labels con doble coma
tsx = re.sub(r'\},\s*,', '},', tsx)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Comas dobles eliminadas")
print("✅ Backup:", backup)
