from pathlib import Path
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-direct-stepvalidation-line")
if not backup.exists():
    shutil.copy2(page_path, backup)

src = page_path.read_text(encoding="utf-8", errors="ignore")

target = '''  const getQuoteStepVisualState = (index: number) => {
    

    if (index < activeStep && !stepValidationError) return "complete";'''

replacement = '''  const getQuoteStepVisualState = (index: number) => {
    const stepValidationError = getStepValidationError(index);

    if (index < activeStep && !stepValidationError) return "complete";'''

if target in src:
    src = src.replace(target, replacement, 1)
else:
    # Fallback más amplio: insertar justo antes del primer if dentro de la función
    needle = "  const getQuoteStepVisualState = (index: number) => {"
    pos = src.find(needle)
    if pos == -1:
        raise SystemExit("❌ No encontré getQuoteStepVisualState")

    first_if = src.find("    if (index < activeStep && !stepValidationError)", pos)
    if first_if == -1:
        raise SystemExit("❌ No encontré el if roto con stepValidationError")

    already = src.rfind("const stepValidationError = getStepValidationError(index);", pos, first_if)
    if already == -1:
        src = src[:first_if] + "    const stepValidationError = getStepValidationError(index);\n\n" + src[first_if:]

page_path.write_text(src, encoding="utf-8")

print("✅ Insertada declaración de stepValidationError antes del if roto")
print("✅ Backup:", backup)
