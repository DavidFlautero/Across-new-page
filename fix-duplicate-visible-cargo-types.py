from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-duplicate-visible-cargo-types")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Borra la versión vieja:
# const visibleCargoTypes = serviceMode === "ocean" ? maritimeCargoTypes : cargoTypes;
tsx = re.sub(
    r'\n\s*const visibleCargoTypes\s*=\s*serviceMode\s*===\s*"ocean"\s*\?\s*maritimeCargoTypes\s*:\s*cargoTypes;\s*',
    "\n",
    tsx,
    count=1
)

# Por si quedó una variante con saltos raros
tsx = re.sub(
    r'\n\s*const visibleCargoTypes\s*=\s*serviceMode\s*===\s*"ocean"\s*\?\s*maritimeCargoTypes\s*:\s*cargoTypes\s*;\s*',
    "\n",
    tsx,
    count=1
)

# Asegura spreads sanos
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Eliminado visibleCargoTypes duplicado")
print("✅ Queda solo la lógica nueva marítimo: full / loose")
print("✅ Backup:", backup)
