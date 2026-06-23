from pathlib import Path
import re
import shutil

api_path = Path("src/app/api/cotizacion/route.ts")

if not api_path.exists():
    raise SystemExit("❌ No existe src/app/api/cotizacion/route.ts")

backup = api_path.with_suffix(api_path.suffix + ".bak-before-lastname-final")
if not backup.exists():
    shutil.copy2(api_path, backup)

txt = api_path.read_text(encoding="utf-8", errors="ignore")

before = txt

# Igualar comportamiento con contacto:
# Si el usuario escribe solo nombre, lastname no puede quedar vacío.
txt = txt.replace(
    'const lastname = lastnameParts.join(" ");',
    'const lastname = lastnameParts.join(" ").trim() || "-";'
)

# Por si tiene otra variante con comillas simples
txt = txt.replace(
    "const lastname = lastnameParts.join(' ');",
    'const lastname = lastnameParts.join(" ").trim() || "-";'
)

api_path.write_text(txt, encoding="utf-8")

if before == txt:
    print("⚠️ No encontré la línea exacta de lastname para reemplazar.")
    print("Revisá manualmente src/app/api/cotizacion/route.ts")
else:
    print("✅ Cotización API corregida: lastname ahora usa fallback '-'")
    print("✅ Si escriben solo un nombre, HubSpot ya no rechaza por lastname vacío")

print("✅ Backup:", backup)
