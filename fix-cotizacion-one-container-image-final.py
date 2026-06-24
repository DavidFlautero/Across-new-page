from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-one-container-image-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Limpiar comas dobles previas
tsx = re.sub(r'",\s*,', '",', tsx)
tsx = re.sub(r'\},\s*,', '},', tsx)

# Todos los contenedores usan la misma imagen base
container_img = '/images/contenedores/contenedor-20.png'

container_ids = [
    "contenedor_20",
    "contenedor_40",
    "contenedor_high_cube_40",
    "contenedor_reefer_20",
    "contenedor_reefer_40",
    "contenedor_otro",
]

for cid in container_ids:
    pattern = rf'(id:\s*"{cid}",[\s\S]*?image:\s*)"[^"]+"'
    tsx = re.sub(pattern, rf'\1"{container_img}"', tsx, count=1)

# Si querés que "Otro" mantenga imagen propia, comentá esta línea de arriba y usá /images/contenedores/otro.png.
# Pero ahora queda todo contenedor igual visualmente.

page_path.write_text(tsx, encoding="utf-8")

print("✅ Todos los contenedores usan la misma imagen:", container_img)
print("✅ Comas dobles limpiadas")
print("✅ Backup:", backup)
