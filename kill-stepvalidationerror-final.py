from pathlib import Path
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-kill-stepvalidationerror-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

src = page_path.read_text(encoding="utf-8", errors="ignore")

src = src.replace(
    "if (index < activeStep && !stepValidationError) return \"complete\";",
    "if (index < activeStep && !getStepValidationError(index)) return \"complete\";"
)

src = src.replace(
    "if (index === activeStep && stepValidationError) return \"missing\";",
    "if (index === activeStep && getStepValidationError(index)) return \"missing\";"
)

# Limpia cualquier declaración rota/vacía si quedó de scripts anteriores
src = src.replace(
    "const stepValidationError = getStepValidationError(index);\n\n    if (index < activeStep && !getStepValidationError(index))",
    "if (index < activeStep && !getStepValidationError(index))"
)

page_path.write_text(src, encoding="utf-8")

print("✅ Eliminado uso de stepValidationError")
print("✅ Ahora usa getStepValidationError(index) directo")
print("✅ Backup:", backup)
