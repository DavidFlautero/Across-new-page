from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-selected-cargo-label-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

broken = '''          cargo: cargoRowsSummary || selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",'''

fixed = '''          cargo: cargoRowsSummary || (selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : ""),'''

if broken in tsx:
    tsx = tsx.replace(broken, fixed, 1)
else:
    # fallback por si hay espacios distintos
    tsx = re.sub(
        r'''cargo:\s*cargoRowsSummary\s*\|\|\s*selectedCargoLabel\s*\?\s*`\$\{selectedCargoLabel\.title\}\s*-\s*\$\{selectedCargoLabel\.subtitle\}`\s*:\s*"",''',
        '''cargo: cargoRowsSummary || (selectedCargoLabel ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}` : ""),''',
        tsx,
        count=1
    )

page_path.write_text(tsx, encoding="utf-8")

print("✅ Arreglado selectedCargoLabel possibly undefined")
print("✅ cargo ahora usa paréntesis correctos")
print("✅ Backup:", backup)
