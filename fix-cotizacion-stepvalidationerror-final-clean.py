from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-stepvalidationerror-final-clean")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

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
    raise SystemExit("❌ No encontré getQuoteStepVisualState. Pasame: sed -n '1015,1045p' src/app/cotizacion/page.tsx")

tsx = re.sub(pattern, replacement, tsx, count=1)

page_path.write_text(tsx, encoding="utf-8")

print("✅ getQuoteStepVisualState reparado completo")
print("✅ stepValidationError ahora está definido")
print("✅ Backup:", backup)
