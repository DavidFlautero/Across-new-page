from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-special-icons-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Limpieza de errores anteriores
tsx = re.sub(r'",\s*,', '",', tsx)
tsx = re.sub(r'\},\s*,', '},', tsx)

replaces = {
    "/images/quote/car-general.png": "/images/quote/carga-general-across.svg",
    "/images/quote/car-especial.png": "/images/quote/manipulacion-especial-across.svg",
    "/images/quote/flame.png": "/images/quote/mercancia-peligrosa-across.svg",
    "/images/quote/litio.png": "/images/quote/bateria-litio-across.svg",
    "/images/quote/temperature.png": "/images/quote/temperatura-controlada-across.svg",
    "/images/quote/alert.png": "/images/quote/articulos-restringidos-across.svg",
}

for old, new in replaces.items():
    tsx = tsx.replace(old, new)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Iconos de manipulación creados y colocados")
print("✅ Backup:", backup)
