from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-visual-state-validation-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

before = tsx

pattern = r"const getQuoteStepVisualState\s*=\s*\(index:\s*number\)\s*=>\s*\{[\s\S]*?\n\s*\};"

replacement = '''const getQuoteStepVisualState = (index: number) => {
    const stepValidationError = getStepValidationError(index);

    if (index < activeStep && !stepValidationError) return "complete";
    if (index === activeStep && stepValidationError) return "missing";
    if (index === activeStep) return "active";
    if (index > activeStep && !canOpenStep(index)) return "locked";

    return "pending";
  };'''

if not re.search(pattern, tsx):
    raise SystemExit("❌ No encontré getQuoteStepVisualState. Pasame sed -n '980,1010p' src/app/cotizacion/page.tsx")

tsx = re.sub(pattern, replacement, tsx, count=1)

# Limpieza por si quedaron restos raros
tsx = tsx.replace("!validationError", "!stepValidationError")
tsx = tsx.replace(" validationError)", " stepValidationError)")
tsx = tsx.replace("&& validationError", "&& stepValidationError")

page_path.write_text(tsx, encoding="utf-8")

print("✅ Corregido getQuoteStepVisualState")
print("✅ Ya no usa validationError inexistente")
print("✅ Ahora usa getStepValidationError(index)")
print("✅ Backup:", backup)
