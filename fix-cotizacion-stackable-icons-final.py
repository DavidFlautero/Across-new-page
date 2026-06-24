from pathlib import Path
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-stackable-icons-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

tsx = tsx.replace(
    'src="/images/quote/apilable.png"',
    'src="/images/quote/apilable-across.svg"'
)

tsx = tsx.replace(
    'src="/images/quote/not-apilable.png"',
    'src="/images/quote/no-apilable-across.svg"'
)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Icono Apilable colocado")
print("✅ Icono No apilable colocado")
print("✅ Backup:", backup)
