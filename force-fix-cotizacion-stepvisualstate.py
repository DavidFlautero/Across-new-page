from pathlib import Path
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-force-stepvisualstate")
if not backup.exists():
    shutil.copy2(page_path, backup)

src = page_path.read_text(encoding="utf-8", errors="ignore")

needle = "const getQuoteStepVisualState = (index: number) => {"
start = src.find(needle)

if start == -1:
    raise SystemExit("❌ No encontré getQuoteStepVisualState. Pasame sed -n '1015,1045p' src/app/cotizacion/page.tsx")

brace_start = src.find("{", start)
if brace_start == -1:
    raise SystemExit("❌ No encontré llave inicial de getQuoteStepVisualState")

depth = 0
end = None

for i in range(brace_start, len(src)):
    if src[i] == "{":
        depth += 1
    elif src[i] == "}":
        depth -= 1
        if depth == 0:
            # avanzar hasta el ; de cierre
            semi = src.find(";", i)
            if semi == -1:
                end = i + 1
            else:
                end = semi + 1
            break

if end is None:
    raise SystemExit("❌ No pude encontrar el cierre de getQuoteStepVisualState")

replacement = '''const getQuoteStepVisualState = (index: number) => {
    const stepValidationError = getStepValidationError(index);

    if (index < activeStep && !stepValidationError) return "complete";
    if (index === activeStep && stepValidationError) return "missing";
    if (index === activeStep) return "active";
    if (index > activeStep && !canOpenStep(index)) return "locked";

    return "pending";
  };'''

src = src[:start] + replacement + src[end:]

page_path.write_text(src, encoding="utf-8")

print("✅ Reemplazado getQuoteStepVisualState completo")
print("✅ stepValidationError ahora queda declarado dentro de la función")
print("✅ Backup:", backup)
