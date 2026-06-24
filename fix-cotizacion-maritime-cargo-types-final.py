from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-maritime-cargo-types-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# =====================================================
# 1) FIX spreads rotos por scripts anteriores
# =====================================================
tsx = re.sub(r"\(\{\s*\.{1,}\s*prev,", "({ ...prev,", tsx)
tsx = re.sub(r"\(\{\s*\.{1,}\s*form,", "({ ...form,", tsx)
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)
tsx = tsx.replace("({ .prev, [key]: value })", "({ ...prev, [key]: value })")
tsx = tsx.replace("({.prev, [key]: value })", "({ ...prev, [key]: value })")
tsx = tsx.replace(".....form,", "...form,")
tsx = tsx.replace("....form,", "...form,")

# =====================================================
# 2) Agregar tipos marítimos si no existen
# =====================================================
if "const maritimeCargoTypes" not in tsx:
    type_line = 'type CargoType = (typeof cargoTypes)[number]["id"];'

    maritime_block = r'''
const maritimeCargoTypes = [
  {
    id: "contenedor_20",
    image: "/images/quote/cargo04.png",
    labels: {
      es: { title: "Contenedor estándar de 20'", subtitle: "Contenedor completo" },
      en: { title: "20' standard container", subtitle: "Full container load" },
      zh: { title: "20英尺标准集装箱", subtitle: "整箱货" },
    },
  },
  {
    id: "contenedor_40",
    image: "/images/quote/cargo04.png",
    labels: {
      es: { title: "Contenedor estándar de 40'", subtitle: "Contenedor completo" },
      en: { title: "40' standard container", subtitle: "Full container load" },
      zh: { title: "40英尺标准集装箱", subtitle: "整箱货" },
    },
  },
  {
    id: "contenedor_high_cube_40",
    image: "/images/quote/cargo02.png",
    labels: {
      es: { title: "Contenedor high cube de 40'", subtitle: "Mayor capacidad" },
      en: { title: "40' high cube container", subtitle: "Higher capacity" },
      zh: { title: "40英尺高箱", subtitle: "更大容量" },
    },
  },
  {
    id: "contenedor_reefer_20",
    image: "/images/quote/cargo03.png",
    labels: {
      es: { title: "Contenedor reefer de 20'", subtitle: "Temperatura controlada" },
      en: { title: "20' reefer container", subtitle: "Temperature controlled" },
      zh: { title: "20英尺冷藏箱", subtitle: "温控运输" },
    },
  },
  {
    id: "contenedor_reefer_40",
    image: "/images/quote/cargo03.png",
    labels: {
      es: { title: "Contenedor reefer de 40'", subtitle: "Temperatura controlada" },
      en: { title: "40' reefer container", subtitle: "Temperature controlled" },
      zh: { title: "40英尺冷藏箱", subtitle: "温控运输" },
    },
  },
  {
    id: "contenedor_otro",
    image: "/images/quote/cargo01.png",
    labels: {
      es: { title: "Otro contenedor", subtitle: "A determinar" },
      en: { title: "Other container", subtitle: "To be determined" },
      zh: { title: "其他集装箱", subtitle: "待确定" },
    },
  },
  {
    id: "pallet_europeo",
    image: "/images/pallets/European_pallet.png",
    labels: {
      es: { title: "Pallet Europeo", subtitle: "Carga suelta · 120 × 80 cm" },
      en: { title: "European Pallet", subtitle: "Loose cargo · 120 × 80 cm" },
      zh: { title: "欧洲托盘", subtitle: "散货 · 120 × 80 cm" },
    },
  },
  {
    id: "pallet_americano",
    image: "/images/pallets/American_pallet.png",
    labels: {
      es: { title: "Pallet Americano", subtitle: "Carga suelta · 120 × 100 cm" },
      en: { title: "American Pallet", subtitle: "Loose cargo · 120 × 100 cm" },
      zh: { title: "美式托盘", subtitle: "散货 · 120 × 100 cm" },
    },
  },
  {
    id: "pallets_otros",
    image: "/images/pallets/otros_pallets.png",
    labels: {
      es: { title: "Pallets Otros", subtitle: "Carga suelta · a determinar" },
      en: { title: "Other Pallets", subtitle: "Loose cargo · to be determined" },
      zh: { title: "其他托盘", subtitle: "散货 · 待确定" },
    },
  },
  {
    id: "cajas_bultos",
    image: "/images/pallets/cajas.png",
    labels: {
      es: { title: "Cajas o bultos", subtitle: "Carga suelta" },
      en: { title: "Boxes or packages", subtitle: "Loose cargo" },
      zh: { title: "箱件或散件", subtitle: "散货" },
    },
  },
] as const;

type CargoType =
  | (typeof cargoTypes)[number]["id"]
  | (typeof maritimeCargoTypes)[number]["id"];
'''

    if type_line not in tsx:
        raise SystemExit("❌ No encontré la línea type CargoType para insertar marítimo.")

    tsx = tsx.replace(type_line, maritime_block, 1)

# =====================================================
# 3) Usar tipos marítimos solo cuando serviceMode === ocean
# =====================================================
tsx = re.sub(
    r'const selectedCargo\s*=\s*cargoTypes\.find\(\(item\)\s*=>\s*item\.id\s*===\s*form\.cargoType\);\s*const showMeasureBox\s*=[\s\S]*?;',
    '''const visibleCargoTypes = serviceMode === "ocean" ? maritimeCargoTypes : cargoTypes;
  const selectedCargo = visibleCargoTypes.find((item) => item.id === form.cargoType);
  const showMeasureBox = Boolean(form.cargoType);
  const cargoMeasureTitle = selectedCargo?.labels[locale].title || t.cargoTitle;''',
    tsx,
    count=1
)

# Si el script anterior ya había cambiado showMeasureBox, igual aseguramos visibleCargoTypes
if "const visibleCargoTypes = serviceMode === \"ocean\" ? maritimeCargoTypes : cargoTypes;" not in tsx:
    tsx = tsx.replace(
        "const selectedCargo = cargoTypes.find((item) => item.id === form.cargoType);",
        '''const visibleCargoTypes = serviceMode === "ocean" ? maritimeCargoTypes : cargoTypes;
  const selectedCargo = visibleCargoTypes.find((item) => item.id === form.cargoType);''',
        1
    )

tsx = tsx.replace("{cargoTypes.map((item) => {", "{visibleCargoTypes.map((item) => {")

tsx = tsx.replace(
    '<h3>{form.cargoType === "pallets_otros" ? t.otherPalletsTitle : t.boxesTitle}</h3>',
    "<h3>{cargoMeasureTitle}</h3>"
)

# =====================================================
# 4) Autocompletar medidas base según tipo de carga
# =====================================================
if "contenedor_high_cube_40" in tsx and "cargoTypeDefaults" not in tsx:
    marker = '''  const lengthUnit = form.units === "metric" ? "cm" : "inch";
  const weightUnit = form.units === "metric" ? "kg" : "lb";
'''

    effect = '''  const lengthUnit = form.units === "metric" ? "cm" : "inch";
  const weightUnit = form.units === "metric" ? "kg" : "lb";

  useEffect(() => {
    const cargoTypeDefaults: Partial<Record<CargoType, Partial<typeof initialForm>>> = {
      pallet_europeo: { cargoQty: "1", cargoLength: "120", cargoWidth: "80" },
      pallet_americano: { cargoQty: "1", cargoLength: "120", cargoWidth: "100" },
      contenedor_20: { cargoQty: "1" },
      contenedor_40: { cargoQty: "1" },
      contenedor_high_cube_40: { cargoQty: "1" },
      contenedor_reefer_20: { cargoQty: "1" },
      contenedor_reefer_40: { cargoQty: "1" },
      contenedor_otro: { cargoQty: "1" },
    };

    const defaults = cargoTypeDefaults[form.cargoType as CargoType];

    if (!defaults) return;

    setForm((prev) => ({
      ...prev,
      cargoQty: prev.cargoQty || String(defaults.cargoQty || ""),
      cargoLength: prev.cargoLength || String(defaults.cargoLength || ""),
      cargoWidth: prev.cargoWidth || String(defaults.cargoWidth || ""),
      cargoHeight: prev.cargoHeight || String(defaults.cargoHeight || ""),
      cargoWeight: prev.cargoWeight || String(defaults.cargoWeight || ""),
    }));
  }, [form.cargoType]);
'''

    if marker in tsx:
        tsx = tsx.replace(marker, effect, 1)
    else:
        print("⚠️ No encontré marker de lengthUnit/weightUnit para insertar defaults.")

page_path.write_text(tsx, encoding="utf-8")

print("✅ Marítimo ahora muestra contenedores + carga suelta")
print("✅ Aéreo/otros mantienen pallets/cajas")
print("✅ Medidas activas para el tipo seleccionado")
print("✅ Spreads rotos corregidos")
print("✅ Backup:", backup)
