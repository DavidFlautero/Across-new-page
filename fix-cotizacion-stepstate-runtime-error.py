from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-stepstate-runtime-fix")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Reemplazar las llamadas rotas por nombres nuevos y únicos
tsx = tsx.replace("getVisualStepState(index)", "getQuoteStepVisualState(index)")
tsx = tsx.replace("getVisualStepLabel(index)", "getQuoteStepVisualLabel(index)")

# 2) Si quedó alguna definición vieja suelta, no la tocamos.
#    Agregamos funciones nuevas justo antes de submit(), dentro del componente.
helper = '''
  const getQuoteStepVisualState = (index: number) => {
    const validationError = getStepValidationError(index);

    if (index < activeStep && !validationError) return "complete";
    if (index === activeStep && validationError) return "missing";
    if (index > activeStep && !canOpenStep(index)) return "locked";

    return "pending";
  };

  const getQuoteStepVisualLabel = (index: number) => {
    const state = getQuoteStepVisualState(index);

    if (state === "complete") {
      if (locale === "en") return `Step ${index + 1} complete`;
      if (locale === "zh") return `步骤 ${index + 1} 已完成`;
      return `Paso ${index + 1} completo`;
    }

    if (state === "missing") {
      if (locale === "en") return "Missing data";
      if (locale === "zh") return "缺少数据";
      return "Faltan datos";
    }

    if (state === "locked") {
      if (locale === "en") return "Locked";
      if (locale === "zh") return "已锁定";
      return "Bloqueado";
    }

    if (locale === "en") return "Pending";
    if (locale === "zh") return "待完成";
    return "Pendiente";
  };

'''

if "const getQuoteStepVisualState =" not in tsx:
    marker = "  async function submit(event: FormEvent<HTMLFormElement>) {"
    if marker not in tsx:
        raise SystemExit("❌ No encontré async function submit para insertar helpers")
    tsx = tsx.replace(marker, helper + marker, 1)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Arreglado getVisualStepState undefined")
print("✅ Helpers agregados dentro del componente CotizacionPage")
print("✅ Backup:", backup)
