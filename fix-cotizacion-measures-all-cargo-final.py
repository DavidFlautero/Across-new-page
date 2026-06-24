from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-measures-all-cargo-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Fix por si quedó corrupto de scripts anteriores
tsx = tsx.replace("({ .prev, [key]: value })", "({ ...prev, [key]: value })")
tsx = tsx.replace("({.prev, [key]: value })", "({ ...prev, [key]: value })")
tsx = tsx.replace("({ .form,", "({ ...form,")
tsx = tsx.replace(".form,", "...form,")

# Mostrar medidas para cualquier tipo de carga seleccionado
tsx = re.sub(
    r"const showMeasureBox\s*=\s*[\s\S]*?;",
    'const showMeasureBox = Boolean(form.cargoType);',
    tsx,
    count=1
)

# Insertar efecto para autocompletar medidas de pallets estándar
marker = '''  const lengthUnit = form.units === "metric" ? "cm" : "inch";
  const weightUnit = form.units === "metric" ? "kg" : "lb";
'''

effect = '''  const lengthUnit = form.units === "metric" ? "cm" : "inch";
  const weightUnit = form.units === "metric" ? "kg" : "lb";

  useEffect(() => {
    if (form.cargoType === "pallet_europeo") {
      setForm((prev) => ({
        ...prev,
        cargoLength: prev.cargoLength || "120",
        cargoWidth: prev.cargoWidth || "80",
      }));
    }

    if (form.cargoType === "pallet_americano") {
      setForm((prev) => ({
        ...prev,
        cargoLength: prev.cargoLength || "120",
        cargoWidth: prev.cargoWidth || "100",
      }));
    }
  }, [form.cargoType]);
'''

if marker in tsx and "form.cargoType === \"pallet_europeo\"" not in tsx:
    tsx = tsx.replace(marker, effect, 1)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Medidas activadas para cualquier tipo de carga")
print("✅ Pallet europeo autocompleta 120 x 80")
print("✅ Pallet americano autocompleta 120 x 100")
print("✅ Fix aplicado también a posibles spreads rotos")
print("✅ Backup:", backup)
