from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-defaults-type-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

tsx = tsx.replace(
    '  const defaults = "defaults" in option ? option.defaults || {} : {};',
    '  const defaults: Partial<{ longCargo: string; anchCargo: string }> = "defaults" in option ? option.defaults || {} : {};'
)

# Por si quedó con formato distinto
tsx = re.sub(
    r'const defaults\s*=\s*"defaults"\s+in\s+option\s*\?\s*option\.defaults\s*\|\|\s*\{\}\s*:\s*\{\}\s*;',
    'const defaults: Partial<{ longCargo: string; anchCargo: string }> = "defaults" in option ? option.defaults || {} : {};',
    tsx
)

page_path.write_text(tsx, encoding="utf-8")

print("✅ TypeScript arreglado: defaults ahora tiene tipo longCargo / anchCargo")
print("✅ Backup:", backup)
