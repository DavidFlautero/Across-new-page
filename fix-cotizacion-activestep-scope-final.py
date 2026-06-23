from pathlib import Path
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-activestep-scope-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")


def remove_const_arrow_function(src: str, name: str) -> str:
    needle = f"const {name} ="
    out = src

    while True:
        idx = out.find(needle)
        if idx == -1:
            break

        # Solo borramos helpers que quedaron arriba del componente.
        component_idx = out.find("export default")
        if component_idx != -1 and idx > component_idx:
            break

        start = idx
        line_start = out.rfind("\n", 0, start)
        if line_start != -1:
            start = line_start + 1

        brace_start = out.find("{", idx)
        if brace_start == -1:
            break

        depth = 0
        end = None

        for i in range(brace_start, len(out)):
            ch = out[i]
            if ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    # Avanzar hasta ; final si existe
                    semi = out.find(";", i)
                    if semi != -1:
                        end = semi + 1
                    else:
                        end = i + 1
                    break

        if end is None:
            break

        out = out[:start] + out[end:].lstrip("\n")

    return out


# Quita helpers mal ubicados arriba del componente.
tsx = remove_const_arrow_function(tsx, "getVisualStepState")
tsx = remove_const_arrow_function(tsx, "getVisualStepLabel")

helper = '''
  const getVisualStepState = (index: number) => {
    const stepValidationError = index === activeStep ? validationError : null;

    if (index < activeStep && !stepValidationError) return "complete";
    if (index === activeStep && stepValidationError) return "missing";
    if (index === activeStep) return "active";

    return "pending";
  };

  const getVisualStepLabel = (index: number) => {
    const state = getVisualStepState(index);

    if (state === "complete") return "Completo";
    if (state === "missing") return "Falta información";
    if (state === "active") return "En curso";

    return "Pendiente";
  };

'''

# Si no existe dentro del componente, lo insertamos antes de submit.
if "const getVisualStepState = (index: number) => {" not in tsx:
    marker = "  const submit = async"
    if marker not in tsx:
        marker = "  async function submit"
    if marker not in tsx:
        raise SystemExit("❌ No encontré dónde insertar helpers antes de submit.")

    tsx = tsx.replace(marker, helper + marker, 1)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Corregido scope de activeStep")
print("✅ getVisualStepState/getVisualStepLabel ahora quedan dentro del componente")
print("✅ Backup:", backup)
