from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-stepvalidationerror-runtime-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

before = tsx

# Corrige referencias viejas que quedaron dentro del helper visual.
tsx = tsx.replace("stepValidationError", "validationError")

# Por si quedó doble nombre raro de algún intento anterior.
tsx = tsx.replace("const validationError = index === activeStep ? validationError : null;", "")

# Repara la función getQuoteStepVisualState completa si existe.
pattern = r"const getQuoteStepVisualState\s*=\s*\(index:\s*number\)\s*=>\s*\{[\s\S]*?\n\s*\};"

replacement = '''const getQuoteStepVisualState = (index: number) => {
    if (index < activeStep && !validationError) return "complete";
    if (index === activeStep && validationError) return "missing";
    if (index > activeStep && !canOpenStep(index)) return "locked";

    return "pending";
  };'''

if re.search(pattern, tsx):
    tsx = re.sub(pattern, replacement, tsx, count=1)
else:
    print("⚠️ No encontré getQuoteStepVisualState para reemplazar completo. Solo hice reemplazo de variable.")

page_path.write_text(tsx, encoding="utf-8")

if before == tsx:
    print("⚠️ No hubo cambios. Revisá manualmente page.tsx líneas 980-1000.")
else:
    print("✅ Corregido runtime error: stepValidationError -> validationError")
    print("✅ getQuoteStepVisualState reparado")

print("✅ Backup:", backup)
