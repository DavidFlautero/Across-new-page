from pathlib import Path
import re
import shutil
import json

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")
route_path = Path("src/app/api/cotizacion/route.ts")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-cargo-flow-original-plus-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-cargo-flow-original-plus-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

page = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

def web_image(folder, candidates):
    base = Path("public") / "images" / folder
    exts = ["", ".png", ".jpg", ".jpeg", ".webp", ".svg"]

    for name in candidates:
        for ext in exts:
            path = base / f"{name}{ext}"
            if path.exists():
                return "/images/" + folder + "/" + path.name

    return "/images/" + folder + "/" + candidates[0] + ".png"

img_contenedor_completo = web_image("contenedores", ["contenedor-completo"])
img_contenedor_20 = web_image("contenedores", ["contenedor-20"])
img_contenedor_40 = web_image("contenedores", ["contenedor-40"])
img_highcube = web_image("contenedores", ["contenedor-highcube40", "contenedor-higcube40", "contenedor-high-cube40", "contenedor-higcubbe40"])
img_reefer_20 = web_image("contenedores", ["contenedor-reefer-20", "contenedor-refer-20", "contenedor-reefer20"])
img_reefer_40 = web_image("contenedores", ["contenedor-reefer-40", "contenedor-refer-40", "contenedor-reefer40"])
img_otro = web_image("contenedores", ["otro"])

img_pallet_eu = web_image("pallets", ["European_pallet", "european_pallet"])
img_pallet_us = web_image("pallets", ["American_pallet", "american_pallet"])
img_pallet_otro = web_image("pallets", ["otros_pallets", "otros-palets"])
img_cajas = web_image("pallets", ["cajas"])

def q(value):
    return json.dumps(value, ensure_ascii=False)

# =====================================================
# 1) LIMPIAR DEFINICIONES DUPLICADAS Y DEJAR UNA SOLA FUENTE
# =====================================================

start = page.find("const cargoTypes = [")
end = page.find("const copy = {", start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar bloque de cargoTypes/copy para limpiar.")

cargo_defs = f'''const cargoModeOptions = [
  {{
    id: "full",
    image: {q(img_contenedor_completo)},
    labels: {{
      es: {{ title: "CONTENEDOR COMPLETO", subtitle: "FCL" }},
      en: {{ title: "FULL CONTAINER", subtitle: "FCL" }},
      zh: {{ title: "整箱货", subtitle: "FCL" }},
    }},
  }},
  {{
    id: "loose",
    image: {q(img_cajas)},
    labels: {{
      es: {{ title: "CARGA SUELTA", subtitle: "LCL / Pallets / Cajas" }},
      en: {{ title: "LOOSE CARGO", subtitle: "LCL / Pallets / Boxes" }},
      zh: {{ title: "散货", subtitle: "LCL / 托盘 / 箱件" }},
    }},
  }},
] as const;

const fullContainerCargoTypes = [
  {{
    id: "contenedor_20",
    mode: "full",
    image: {q(img_contenedor_20)},
    nameCargo: "Contenedor Estandar de 20'",
    rowKind: "container",
    labels: {{
      es: {{ title: "Contenedor estándar de 20'", subtitle: "20'" }},
      en: {{ title: "20' standard container", subtitle: "20'" }},
      zh: {{ title: "20英尺标准集装箱", subtitle: "20'" }},
    }},
  }},
  {{
    id: "contenedor_40",
    mode: "full",
    image: {q(img_contenedor_40)},
    nameCargo: "Contenedor Estandar de 40'",
    rowKind: "container",
    labels: {{
      es: {{ title: "Contenedor estándar de 40'", subtitle: "40'" }},
      en: {{ title: "40' standard container", subtitle: "40'" }},
      zh: {{ title: "40英尺标准集装箱", subtitle: "40'" }},
    }},
  }},
  {{
    id: "contenedor_high_cube_40",
    mode: "full",
    image: {q(img_highcube)},
    nameCargo: "Contenedor high cube de 40'",
    rowKind: "container",
    labels: {{
      es: {{ title: "Contenedor high cube de 40'", subtitle: "High cube 40'" }},
      en: {{ title: "40' high cube container", subtitle: "High cube 40'" }},
      zh: {{ title: "40英尺高箱", subtitle: "High cube 40'" }},
    }},
  }},
  {{
    id: "contenedor_reefer_20",
    mode: "full",
    image: {q(img_reefer_20)},
    nameCargo: "Contenedor refeer de 20'",
    rowKind: "container",
    labels: {{
      es: {{ title: "Contenedor reefer de 20'", subtitle: "Reefer 20'" }},
      en: {{ title: "20' reefer container", subtitle: "Reefer 20'" }},
      zh: {{ title: "20英尺冷藏箱", subtitle: "Reefer 20'" }},
    }},
  }},
  {{
    id: "contenedor_reefer_40",
    mode: "full",
    image: {q(img_reefer_40)},
    nameCargo: "Contenedor refeer de 40'",
    rowKind: "container",
    labels: {{
      es: {{ title: "Contenedor reefer de 40'", subtitle: "Reefer 40'" }},
      en: {{ title: "40' reefer container", subtitle: "Reefer 40'" }},
      zh: {{ title: "40英尺冷藏箱", subtitle: "Reefer 40'" }},
    }},
  }},
  {{
    id: "contenedor_otro",
    mode: "full",
    image: {q(img_otro)},
    nameCargo: "Otro contenedor",
    rowKind: "other",
    labels: {{
      es: {{ title: "Otro", subtitle: "A determinar" }},
      en: {{ title: "Other", subtitle: "To be determined" }},
      zh: {{ title: "其他", subtitle: "待确定" }},
    }},
  }},
] as const;

const looseCargoTypes = [
  {{
    id: "pallet_europeo",
    mode: "loose",
    image: {q(img_pallet_eu)},
    nameCargo: "Palet Europeo",
    rowKind: "pallet",
    defaults: {{ longCargo: "120", anchCargo: "80" }},
    labels: {{
      es: {{ title: "Pallet Europeo", subtitle: "120 × 80" }},
      en: {{ title: "European Pallet", subtitle: "120 × 80" }},
      zh: {{ title: "欧洲托盘", subtitle: "120 × 80" }},
    }},
  }},
  {{
    id: "pallet_americano",
    mode: "loose",
    image: {q(img_pallet_us)},
    nameCargo: "Palet Americano",
    rowKind: "pallet",
    defaults: {{ longCargo: "120", anchCargo: "100" }},
    labels: {{
      es: {{ title: "Pallet Americano", subtitle: "120 × 100" }},
      en: {{ title: "American Pallet", subtitle: "120 × 100" }},
      zh: {{ title: "美式托盘", subtitle: "120 × 100" }},
    }},
  }},
  {{
    id: "pallets_otros",
    mode: "loose",
    image: {q(img_pallet_otro)},
    nameCargo: "Pallets otros a determinar",
    rowKind: "pallet",
    labels: {{
      es: {{ title: "Pallets Otros", subtitle: "A determinar" }},
      en: {{ title: "Other Pallets", subtitle: "To be determined" }},
      zh: {{ title: "其他托盘", subtitle: "待确定" }},
    }},
  }},
  {{
    id: "cajas_bultos",
    mode: "loose",
    image: {q(img_cajas)},
    nameCargo: "Cajas o bultos sueltos",
    rowKind: "box",
    labels: {{
      es: {{ title: "Cajas o bultos", subtitle: "Sueltos" }},
      en: {{ title: "Boxes or packages", subtitle: "Loose" }},
      zh: {{ title: "箱件或散件", subtitle: "散货" }},
    }},
  }},
] as const;

const cargoTypes = looseCargoTypes;

const specialHandlingOptions = [
  {{
    id: "mercancia_peligrosa",
    value: "Mercancía peligrosa",
    image: "/images/quote/flame.png",
    labels: {{
      es: {{ title: "Mercancía peligrosa", subtitle: "DGP, CAO, cantidades exceptuadas." }},
      en: {{ title: "Dangerous goods", subtitle: "DGP, CAO, excepted quantities." }},
      zh: {{ title: "危险品", subtitle: "DGP、CAO、例外数量。" }},
    }},
  }},
  {{
    id: "baterias_litio",
    value: "Baterías de litio",
    image: "/images/quote/litio.png",
    labels: {{
      es: {{ title: "Baterías de Litio", subtitle: "ION/Metal + Estatus de equipaje" }},
      en: {{ title: "Lithium batteries", subtitle: "ION/Metal + baggage status" }},
      zh: {{ title: "锂电池", subtitle: "离子/金属 + 行李状态" }},
    }},
  }},
  {{
    id: "temperatura_controlada",
    value: "Temperatura controlada",
    image: "/images/quote/temperature.png",
    labels: {{
      es: {{ title: "Temperatura Controlada", subtitle: "Activo/Pasivo - Rango" }},
      en: {{ title: "Temperature controlled", subtitle: "Active/Passive - Range" }},
      zh: {{ title: "温控", subtitle: "主动/被动 - 范围" }},
    }},
  }},
  {{
    id: "articulos_restringidos",
    value: "Artículos restringidos, otros.",
    image: "/images/quote/alert.png",
    labels: {{
      es: {{ title: "Artículos restringidos, otros.", subtitle: "Médico, armas, arte, etc" }},
      en: {{ title: "Restricted items, others.", subtitle: "Medical, weapons, art, etc" }},
      zh: {{ title: "限制物品等", subtitle: "医疗、武器、艺术品等" }},
    }},
  }},
] as const;

type CargoMode = (typeof cargoModeOptions)[number]["id"];
type FullCargoOption = (typeof fullContainerCargoTypes)[number];
type LooseCargoOption = (typeof looseCargoTypes)[number];
type CargoOption = FullCargoOption | LooseCargoOption;
type CargoType = CargoOption["id"];

type CargoRow = {{
  uid: string;
  cargoType: CargoType;
  cargoMode: CargoMode;
  rowKind: string;
  nameCargo: string;
  image: string;
  qtyCargo: string;
  longCargo: string;
  anchCargo: string;
  altCargo: string;
  volCargo: string;
  infoCargo: string;
  otherCargo: string;
}};

function createCargoRow(option: CargoOption, mode: CargoMode): CargoRow {{
  const defaults = "defaults" in option ? option.defaults || {{}} : {{}};

  return {{
    uid: `${{option.id}}-${{Date.now()}}-${{Math.random().toString(16).slice(2)}}`,
    cargoType: option.id,
    cargoMode: mode,
    rowKind: option.rowKind,
    nameCargo: option.nameCargo,
    image: option.image,
    qtyCargo: "1",
    longCargo: String(defaults.longCargo || ""),
    anchCargo: String(defaults.anchCargo || ""),
    altCargo: "",
    volCargo: "",
    infoCargo: "",
    otherCargo: "",
  }};
}}

'''

page = page[:start] + cargo_defs + "\n" + page[end:]

# =====================================================
# 2) RECREAR initialForm CON cargoRows
# =====================================================

start = page.find("const initialForm = {")
end = page.find("function getInitialLocale", start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar initialForm.")

initial_form = '''const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  contractDate: "",

  operation: "",
  service: "",
  originCountry: "",
  originAddress: "",
  originAirport: "",
  originAirportOther: "",
  destinationCountry: "",
  destinationAddress: "",
  destinationAirport: "",
  destinationAirportOther: "",

  incoterm: "",
  cargoMode: "" as CargoMode | "",
  cargoType: "" as CargoType | "",
  units: "metric" as "metric" | "imperial",
  cargoQty: "",
  cargoLength: "",
  cargoWidth: "",
  cargoHeight: "",
  cargoWeight: "",
  cargoInfo: "",
  cargoRows: [] as CargoRow[],

  merchandise: "",
  stackable: "",
  handling: "",
  specialHandling: [] as string[],
  specialRequirements: "",
  comments: "",
  privacyAccepted: false,
  marketingAccepted: false,
};

'''

page = page[:start] + initial_form + page[end:]

# =====================================================
# 3) LIMPIAR LÓGICA DUPLICADA DE CARGA
# =====================================================

start = page.find('const maritimeMode = serviceMode === "ocean";')
end = page.find('  useEffect(() => {\n    if (serviceMode === "air")', start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar lógica maritimeMode/visibleCargoTypes.")

cargo_logic = '''  const maritimeMode = serviceMode === "ocean";
  const visibleCargoTypes =
    maritimeMode && form.cargoMode === "full"
      ? fullContainerCargoTypes
      : maritimeMode && form.cargoMode === "loose"
        ? looseCargoTypes
        : !maritimeMode
          ? cargoTypes
          : [];

  const selectedCargo = visibleCargoTypes.find((item) => item.id === form.cargoType);
  const showMeasureBox = form.cargoRows.length > 0;
  const cargoMeasureTitle = selectedCargo?.labels[locale].title || t.cargoTitle;

  const lengthUnit = form.units === "metric" ? "cm" : "inch";
  const weightUnit = form.units === "metric" ? "kg" : "lb";

'''

page = page[:start] + cargo_logic + page[end:]

# =====================================================
# 4) RECREAR HELPERS DE CARGA
# =====================================================

start = page.find("  const setValue = <K extends keyof typeof initialForm>(")
end = page.find("  const continueLabel =", start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar setValue/helpers.")

helpers = '''  const setValue = <K extends keyof typeof initialForm>(
    key: K,
    value: (typeof initialForm)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  };

  const syncFirstCargoRow = (rows: CargoRow[]) => {
    const first = rows[0];

    return {
      cargoType: first?.cargoType || "",
      cargoQty: first?.qtyCargo || "",
      cargoLength: first?.longCargo || "",
      cargoWidth: first?.anchCargo || "",
      cargoHeight: first?.altCargo || "",
      cargoWeight: first?.volCargo || "",
      cargoInfo: first?.infoCargo || first?.otherCargo || "",
    };
  };

  const selectCargoMode = (mode: CargoMode) => {
    setForm((prev) => ({
      ...prev,
      cargoMode: mode,
      cargoType: "",
      cargoQty: "",
      cargoLength: "",
      cargoWidth: "",
      cargoHeight: "",
      cargoWeight: "",
      cargoInfo: "",
      cargoRows: [],
    }));
    setStepError("");
  };

  const addCargoRow = (option: CargoOption) => {
    setForm((prev) => {
      const mode = (maritimeMode ? prev.cargoMode || option.mode : "loose") as CargoMode;
      const nextRows = [...prev.cargoRows, createCargoRow(option, mode)];
      const first = syncFirstCargoRow(nextRows);

      return {
        ...prev,
        ...first,
        cargoMode: maritimeMode ? mode : "loose",
        cargoRows: nextRows,
      };
    });

    setStepError("");
  };

  const updateCargoRow = <K extends keyof CargoRow>(
    uid: string,
    key: K,
    value: CargoRow[K]
  ) => {
    setForm((prev) => {
      const nextRows = prev.cargoRows.map((row) =>
        row.uid === uid ? { ...row, [key]: value } : row
      );
      const first = syncFirstCargoRow(nextRows);

      return {
        ...prev,
        ...first,
        cargoRows: nextRows,
      };
    });

    setStepError("");
  };

  const cloneCargoRow = (uid: string) => {
    setForm((prev) => {
      const row = prev.cargoRows.find((item) => item.uid === uid);
      if (!row) return prev;

      const nextRows = [
        ...prev.cargoRows,
        {
          ...row,
          uid: `${row.cargoType}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        },
      ];

      return {
        ...prev,
        cargoRows: nextRows,
      };
    });
  };

  const removeCargoRow = (uid: string) => {
    setForm((prev) => {
      const nextRows = prev.cargoRows.filter((row) => row.uid !== uid);
      const first = syncFirstCargoRow(nextRows);

      return {
        ...prev,
        ...first,
        cargoRows: nextRows,
      };
    });
  };

  const toggleSpecialHandling = (id: string) => {
    setForm((prev) => {
      const current = Array.isArray(prev.specialHandling) ? prev.specialHandling : [];
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      return {
        ...prev,
        specialHandling: next,
      };
    });

    setStepError("");
  };

'''

page = page[:start] + helpers + page[end:]

# =====================================================
# 5) VALIDACIÓN PASO 03
# =====================================================

start = page.find("    if (step === 2) {")
end = page.find("    return \"\";\n  };", start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar validación step 2.")

validation = '''    if (step === 2) {
      if (maritimeMode && !form.cargoMode) return requiredCargoMessage;
      if (form.cargoRows.length === 0) return requiredCargoMessage;

      for (const row of form.cargoRows) {
        if (!isFilled(row.qtyCargo)) return requiredMessage(t.qty);

        if (row.rowKind === "pallet" || row.rowKind === "box") {
          if (!isFilled(row.longCargo)) return requiredMessage(t.length);
          if (!isFilled(row.anchCargo)) return requiredMessage(t.width);
          if (!isFilled(row.altCargo)) return requiredMessage(t.height);
          if (!isFilled(row.volCargo)) return requiredMessage(t.weight);
        }

        if (row.rowKind === "container" && !isFilled(row.volCargo)) {
          return requiredMessage(t.weight);
        }

        if (row.rowKind === "other" && !isFilled(row.otherCargo)) {
          return requiredMessage(t.cargoInfo);
        }
      }

      if (!isFilled(form.merchandise)) return requiredMessage(t.merchandise);
      if (!isFilled(form.stackable)) return requiredMessage(t.stackable);
      if (!isFilled(form.handling)) return requiredMessage(t.specialHandling);

      if (form.handling === "special_handling" && form.specialHandling.length === 0) {
        return locale === "en"
          ? "Select at least one special handling requirement."
          : locale === "zh"
            ? "请选择至少一个特殊操作要求。"
            : "Seleccione al menos un requerimiento especial.";
      }

      if (form.handling === "special_handling" && !isFilled(form.specialRequirements)) {
        return locale === "en"
          ? "Please detail the special handling requirements."
          : locale === "zh"
            ? "请详细说明特殊操作要求。"
            : "Detalle al máximo los requerimientos especiales.";
      }

      return "";
    }

    if (step === 3) {
      if (!form.privacyAccepted) return requiredPrivacyMessage;
      return "";
    }

'''

page = page[:start] + validation + page[end:]

# =====================================================
# 6) REEMPLAZAR UI DE TIPO DE CARGA + FILAS DINÁMICAS
# =====================================================

section_pos = page.find('activeStep === 2')
start = page.find('            <div className={styles.cargoGrid}>', section_pos)
end = page.find('            <div className={styles.block}>', start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar bloque cargoGrid/measureBox.")

cargo_ui = '''            {maritimeMode && (
              <div className={styles.cargoModeGrid}>
                {cargoModeOptions.map((item) => {
                  const label = item.labels[locale];

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.cargoModeOption}
                      data-active={form.cargoMode === item.id}
                      onClick={() => selectCargoMode(item.id)}
                    >
                      <Image src={item.image} alt={label.title} width={180} height={120} />
                      <span>
                        <strong>{label.title}</strong>
                        <small>{label.subtitle}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {(!maritimeMode || form.cargoMode) && (
              <div className={styles.cargoGrid}>
                {visibleCargoTypes.map((item) => {
                  const label = item.labels[locale];

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`${styles.cargoOption} ${styles.cargoButton}`}
                      data-active={form.cargoType === item.id}
                      onClick={() => addCargoRow(item)}
                    >
                      <Image src={item.image} alt={label.title} width={160} height={110} className={styles.cargoImage} />
                      <span className={styles.cargoText}>
                        <strong>{label.title}</strong>
                        <small>{label.subtitle}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {showMeasureBox && (
              <div className={styles.cargoRowsBox}>
                <div className={styles.measureHead}>
                  <h3>{cargoMeasureTitle}</h3>

                  <div className={styles.unitToggle}>
                    <label>
                      <input type="radio" name="units" checked={form.units === "metric"} onChange={() => setValue("units", "metric")} />
                      Kg / Cm
                    </label>

                    <label>
                      <input type="radio" name="units" checked={form.units === "imperial"} onChange={() => setValue("units", "imperial")} />
                      Lb / Inch
                    </label>
                  </div>
                </div>

                <div className={styles.cargoRowsList}>
                  {form.cargoRows.map((row) => (
                    <div key={row.uid} className={styles.cargoRow}>
                      {row.rowKind === "other" ? (
                        <>
                          <label className={styles.fullWidth}>
                            Otro tipo de carga
                            <textarea
                              value={row.otherCargo}
                              onChange={(event) => updateCargoRow(row.uid, "otherCargo", event.target.value)}
                              placeholder={t.cargoInfoPlaceholder}
                              rows={5}
                            />
                          </label>
                        </>
                      ) : (
                        <>
                          <div className={styles.cargoRowTitle}>
                            <Image src={row.image} alt={row.nameCargo} width={120} height={78} />
                            <strong>{row.nameCargo}</strong>
                          </div>

                          <div className={styles.cargoRowFields}>
                            <label className={styles.cargoRowField}>
                              <span>{t.qty}</span>
                              <input
                                type="number"
                                min="1"
                                value={row.qtyCargo}
                                onChange={(event) => updateCargoRow(row.uid, "qtyCargo", event.target.value)}
                              />
                            </label>

                            {row.rowKind !== "container" && (
                              <>
                                <label className={styles.cargoRowField}>
                                  <span>{t.length}</span>
                                  <input
                                    type="number"
                                    value={row.longCargo}
                                    readOnly={row.cargoType === "pallet_europeo" || row.cargoType === "pallet_americano"}
                                    onChange={(event) => updateCargoRow(row.uid, "longCargo", event.target.value)}
                                  />
                                  <b>{lengthUnit}</b>
                                </label>

                                <label className={styles.cargoRowField}>
                                  <span>{t.width}</span>
                                  <input
                                    type="number"
                                    value={row.anchCargo}
                                    readOnly={row.cargoType === "pallet_europeo" || row.cargoType === "pallet_americano"}
                                    onChange={(event) => updateCargoRow(row.uid, "anchCargo", event.target.value)}
                                  />
                                  <b>{lengthUnit}</b>
                                </label>

                                <label className={styles.cargoRowField}>
                                  <span>{t.height}</span>
                                  <input
                                    type="number"
                                    value={row.altCargo}
                                    onChange={(event) => updateCargoRow(row.uid, "altCargo", event.target.value)}
                                  />
                                  <b>{lengthUnit}</b>
                                </label>
                              </>
                            )}

                            <label className={styles.cargoRowField}>
                              <span>{t.weight}</span>
                              <input
                                type="number"
                                value={row.volCargo}
                                onChange={(event) => updateCargoRow(row.uid, "volCargo", event.target.value)}
                              />
                              <b>{weightUnit}</b>
                            </label>

                            <label className={styles.cargoRowField}>
                              <span>{t.cargoInfo}</span>
                              <input
                                type="text"
                                value={row.infoCargo}
                                onChange={(event) => updateCargoRow(row.uid, "infoCargo", event.target.value)}
                                placeholder={t.complete}
                              />
                            </label>
                          </div>
                        </>
                      )}

                      <div className={styles.cargoRowActions}>
                        <button type="button" onClick={() => cloneCargoRow(row.uid)} aria-label="Clonar carga">
                          ⧉
                        </button>
                        <button type="button" onClick={() => removeCargoRow(row.uid)} aria-label="Eliminar carga">
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

'''

page = page[:start] + cargo_ui + page[end:]

# =====================================================
# 7) REEMPLAZAR APILABLE / MANIPULACIÓN ESPECIAL
# =====================================================

start = page.find('              <div className={styles.optionGridFour}>', page.find('value={form.merchandise}'))
end = page.find('              <div className={styles.accordionActions}>', start)

if start == -1 or end == -1:
    raise SystemExit("❌ No pude ubicar bloque optionGridFour de apilable/manipulación.")

handling_ui = '''              <div className={styles.requirementBlock}>
                <h3>Es su carga apilable?</h3>

                <div className={styles.optionGridTwo}>
                  <label className={styles.option}>
                    <input type="radio" name="stackable" value="yes" checked={form.stackable === "yes"} onChange={(e) => setValue("stackable", e.target.value)} />
                    <Image src="/images/quote/apilable.png" alt={t.stackable} width={120} height={80} />
                    <strong>{t.stackable}</strong>
                    <small>{t.stackableText}</small>
                  </label>

                  <label className={styles.option}>
                    <input type="radio" name="stackable" value="no" checked={form.stackable === "no"} onChange={(e) => setValue("stackable", e.target.value)} />
                    <Image src="/images/quote/not-apilable.png" alt={t.notStackable} width={120} height={80} />
                    <strong>{t.notStackable}</strong>
                    <small>{t.notStackableText}</small>
                  </label>
                </div>
              </div>

              <div className={styles.requirementBlock}>
                <h3>Tiene requerimientos especiales de manipulación?</h3>

                <div className={styles.optionGridTwo}>
                  <label className={styles.option}>
                    <input type="radio" name="handling" value="general_handling" checked={form.handling === "general_handling"} onChange={(e) => setValue("handling", e.target.value)} />
                    <Image src="/images/quote/car-general.png" alt={t.generalCargo} width={120} height={80} />
                    <strong>{t.generalCargo}</strong>
                    <small>{t.generalCargoText}</small>
                  </label>

                  <label className={styles.option}>
                    <input type="radio" name="handling" value="special_handling" checked={form.handling === "special_handling"} onChange={(e) => setValue("handling", e.target.value)} />
                    <Image src="/images/quote/car-especial.png" alt={t.specialHandling} width={120} height={80} />
                    <strong>{t.specialHandling}</strong>
                    <small>{t.specialHandlingText}</small>
                  </label>
                </div>
              </div>

              {form.handling === "special_handling" && (
                <div className={styles.specialHandlingPanel}>
                  <div className={styles.optionGridFour}>
                    {specialHandlingOptions.map((item) => {
                      const label = item.labels[locale];

                      return (
                        <label key={item.id} className={styles.cargoOption}>
                          <input
                            type="checkbox"
                            name="specialHandling"
                            checked={form.specialHandling.includes(item.value)}
                            onChange={() => toggleSpecialHandling(item.value)}
                          />
                          <Image src={item.image} alt={label.title} width={120} height={90} className={styles.cargoImage} />
                          <span className={styles.cargoText}>
                            <strong>{label.title}</strong>
                            <small>{label.subtitle}</small>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <label className={styles.fullWidth}>
                    Detalle al máximo los requerimientos especiales*
                    <textarea
                      placeholder={t.complete}
                      value={form.specialRequirements}
                      onChange={(event) => setValue("specialRequirements", event.target.value)}
                      rows={5}
                    />
                  </label>
                </div>
              )}
            </div>

'''

page = page[:start] + handling_ui + page[end:]

# =====================================================
# 8) SUBMIT: ENVIAR FILAS COMPLETAS
# =====================================================

page = page.replace(
'''    const selectedCargoLabel = selectedCargo?.labels[locale];

    try {''',
'''    const selectedCargoLabel = selectedCargo?.labels[locale];
    const cargoRowsSummary = form.cargoRows
      .map((row, index) => {
        const base = [
          `${index + 1}. ${row.nameCargo}`,
          `Cantidad: ${row.qtyCargo || "-"}`,
          row.rowKind !== "container" ? `Largo: ${row.longCargo || "-"} ${lengthUnit}` : "",
          row.rowKind !== "container" ? `Ancho: ${row.anchCargo || "-"} ${lengthUnit}` : "",
          row.rowKind !== "container" ? `Altura: ${row.altCargo || "-"} ${lengthUnit}` : "",
          `Peso: ${row.volCargo || "-"} ${weightUnit}`,
          row.infoCargo ? `Info: ${row.infoCargo}` : "",
          row.otherCargo ? `Otro: ${row.otherCargo}` : "",
        ];

        return base.filter(Boolean).join(" | ");
      })
      .join("\\n");

    try {'''
)

page = page.replace(
'''          cargoMode: form.cargoMode,
          specialHandling: form.specialHandling,
          specialRequirements: form.specialRequirements,
          cargo: selectedCargoLabel''',
'''          cargoMode: form.cargoMode,
          cargoRows: form.cargoRows,
          cargoRowsSummary,
          specialHandling: form.specialHandling,
          specialRequirements: form.specialRequirements,
          cargo: cargoRowsSummary || selectedCargoLabel'''
)

page = page.replace(
'''            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",''',
'''            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",'''
)

# Limpieza final spreads rotos
page = re.sub(r"\.{4,}form,", "...form,", page)
page = re.sub(r"\.{4,}prev,", "...prev,", page)
page = page.replace("const maritimeMode", "  const maritimeMode")

page_path.write_text(page, encoding="utf-8")

# =====================================================
# 9) PATCH API PARA QUE HUBSPOT RECIBA TODO EN MESSAGE
# =====================================================

if route_path.exists():
    route_backup = route_path.with_suffix(route_path.suffix + ".bak-before-cargo-rows-message-final")
    if not route_backup.exists():
        shutil.copy2(route_path, route_backup)

    route = route_path.read_text(encoding="utf-8", errors="ignore")

    if "body.cargoRowsSummary" not in route:
        route = route.replace(
'''      "CARGA",
      `Tipo de carga: ${cargoName}`,''',
'''      "CARGA",
      body.cargoRowsSummary ? `Detalle de cargas:\\n${body.cargoRowsSummary}` : "",
      `Tipo de carga: ${cargoName}`,'''
        )

    if "body.specialRequirements" not in route:
        route = route.replace(
'''      body.condition ? `Condición especial: ${body.condition}` : "",
      body.comments ? `Comentarios finales: ${body.comments}` : "",''',
'''      body.condition ? `Condición especial: ${body.condition}` : "",
      Array.isArray(body.specialHandling) && body.specialHandling.length
        ? `Manipulación especial: ${body.specialHandling.join(", ")}`
        : "",
      body.specialRequirements ? `Detalle requerimientos especiales: ${body.specialRequirements}` : "",
      body.comments ? `Comentarios finales: ${body.comments}` : "",'''
        )

    route_path.write_text(route, encoding="utf-8")

# =====================================================
# 10) CSS FINAL
# =====================================================

start_marker = "/* === COTIZACION ORIGINAL CARGO FLOW FINAL START === */"
end_marker = "/* === COTIZACION ORIGINAL CARGO FLOW FINAL END === */"

css = re.sub(
    re.escape(start_marker) + r"[\s\S]*?" + re.escape(end_marker),
    "",
    css
).rstrip()

css_patch = f'''
{start_marker}

.cargoModeGrid {{
  display: grid !important;
  grid-template-columns: repeat(2, minmax(260px, 1fr)) !important;
  gap: clamp(1.2rem, 4vw, 4rem) !important;
  margin: 1.3rem 0 2.4rem !important;
}}

.cargoModeOption {{
  min-height: 154px !important;
  display: grid !important;
  grid-template-columns: 132px 1fr !important;
  gap: 1.2rem !important;
  align-items: center !important;
  padding: 1.05rem 1.25rem !important;
  border: 1px solid rgba(7,17,29,.10) !important;
  border-radius: 0 !important;
  background: rgba(255,255,255,.92) !important;
  cursor: pointer !important;
  text-align: left !important;
  position: relative !important;
}}

.cargoModeOption img {{
  width: 118px !important;
  height: 92px !important;
  object-fit: contain !important;
  background: #fff !important;
}}

.cargoModeOption strong {{
  display: block !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: clamp(1.1rem, 2vw, 1.65rem) !important;
  line-height: 1.16 !important;
  font-weight: 950 !important;
  letter-spacing: -.035em !important;
  text-transform: uppercase !important;
}}

.cargoModeOption small {{
  display: block !important;
  margin-top: .35rem !important;
  color: rgba(7,17,29,.52) !important;
  font-weight: 800 !important;
}}

.cargoModeOption::after {{
  content: "" !important;
  position: absolute !important;
  left: calc(132px + 2.45rem) !important;
  bottom: 1.25rem !important;
  width: 150px !important;
  height: 4px !important;
  background: rgba(7,17,29,.13) !important;
}}

.cargoModeOption[data-active="true"]::after {{
  background: #e11343 !important;
}}

.cargoModeOption[data-active="true"] {{
  border-color: rgba(225,19,67,.55) !important;
  background: #fff !important;
}}

.cargoButton {{
  appearance: none !important;
  border-radius: 0 !important;
  text-align: left !important;
}}

.cargoButton[data-active="true"] {{
  border-color: rgba(225,19,67,.65) !important;
}}

.cargoRowsBox {{
  margin-top: 1.7rem !important;
  padding: 1.2rem !important;
  border-radius: 28px !important;
  border: 1px solid rgba(7,17,29,.09) !important;
  background: rgba(255,255,255,.58) !important;
}}

.cargoRowsList {{
  display: grid !important;
  gap: .9rem !important;
}}

.cargoRow {{
  position: relative !important;
  display: grid !important;
  grid-template-columns: minmax(220px, 1.1fr) minmax(0, 2.3fr) auto !important;
  gap: .85rem !important;
  align-items: stretch !important;
  padding: .9rem !important;
  border-radius: 20px !important;
  background: rgba(255,255,255,.92) !important;
  border: 1px solid rgba(7,17,29,.08) !important;
  box-shadow: 0 12px 34px rgba(7,17,29,.06) !important;
}}

.cargoRowTitle {{
  display: grid !important;
  grid-template-columns: 92px 1fr !important;
  gap: .8rem !important;
  align-items: center !important;
  min-width: 0 !important;
}}

.cargoRowTitle img {{
  width: 88px !important;
  height: 58px !important;
  object-fit: contain !important;
}}

.cargoRowTitle strong {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-weight: 950 !important;
  font-size: .94rem !important;
  line-height: 1.18 !important;
  text-transform: uppercase !important;
}}

.cargoRowFields {{
  display: grid !important;
  grid-template-columns: repeat(5, minmax(92px, 1fr)) !important;
  gap: .65rem !important;
  align-items: stretch !important;
}}

.cargoRowField {{
  min-height: 58px !important;
  display: grid !important;
  grid-template-columns: 1fr auto !important;
  grid-template-rows: auto 1fr !important;
  gap: .1rem .35rem !important;
  padding: .55rem .7rem !important;
  border-left: 4px solid rgba(7,17,29,.72) !important;
  background: rgba(244,240,234,.88) !important;
  border-radius: 0 !important;
}}

.cargoRowField span {{
  grid-column: 1 / -1 !important;
  color: rgba(7,17,29,.70) !important;
  -webkit-text-fill-color: rgba(7,17,29,.70) !important;
  font-size: .68rem !important;
  font-weight: 950 !important;
  text-transform: uppercase !important;
  letter-spacing: .04em !important;
}}

.cargoRowField input {{
  width: 100% !important;
  min-height: 28px !important;
  border: 0 !important;
  background: transparent !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1rem !important;
  font-weight: 900 !important;
  outline: none !important;
  padding: 0 !important;
}}

.cargoRowField b {{
  align-self: center !important;
  color: rgba(7,17,29,.54) !important;
  font-size: .72rem !important;
  font-weight: 900 !important;
}}

.cargoRowActions {{
  display: grid !important;
  gap: .45rem !important;
  align-content: center !important;
}}

.cargoRowActions button {{
  width: 36px !important;
  height: 36px !important;
  border: 0 !important;
  border-radius: 12px !important;
  background: rgba(225,19,67,.10) !important;
  color: #e11343 !important;
  -webkit-text-fill-color: #e11343 !important;
  cursor: pointer !important;
  font-size: 1.2rem !important;
  font-weight: 950 !important;
}}

.requirementBlock {{
  margin-top: 1.35rem !important;
}}

.requirementBlock h3 {{
  margin: 0 0 .85rem !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1rem !important;
  font-weight: 950 !important;
}}

.optionGridTwo {{
  display: grid !important;
  grid-template-columns: repeat(2, minmax(220px, 1fr)) !important;
  gap: .9rem !important;
}}

.option img {{
  width: 76px !important;
  height: 54px !important;
  object-fit: contain !important;
  margin-bottom: .45rem !important;
}}

.specialHandlingPanel {{
  margin-top: 1.4rem !important;
  padding-top: 1.4rem !important;
  border-top: 1px solid rgba(7,17,29,.10) !important;
}}

@media (max-width: 900px) {{
  .cargoRow {{
    grid-template-columns: 1fr !important;
  }}

  .cargoRowFields {{
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }}

  .cargoRowActions {{
    grid-template-columns: repeat(2, 40px) !important;
    justify-content: end !important;
  }}
}}

@media (max-width: 700px) {{
  .cargoModeGrid,
  .optionGridTwo {{
    grid-template-columns: 1fr !important;
  }}

  .cargoModeOption {{
    min-height: 98px !important;
    grid-template-columns: 76px 1fr !important;
    gap: .85rem !important;
    padding: .85rem !important;
  }}

  .cargoModeOption img {{
    width: 68px !important;
    height: 58px !important;
  }}

  .cargoModeOption strong {{
    font-size: 1rem !important;
  }}

  .cargoModeOption::after {{
    left: calc(76px + 1.7rem) !important;
    bottom: .75rem !important;
    width: 110px !important;
    height: 3px !important;
  }}

  .cargoRowFields {{
    grid-template-columns: 1fr !important;
  }}

  .cargoRowsBox {{
    padding: .85rem !important;
    border-radius: 22px !important;
  }}
}}
{end_marker}
'''

css += "\n\n" + css_patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización reconstruida con flujo original + diseño semáforo")
print("✅ Marítimo: Contenedor completo / Carga suelta")
print("✅ Contenedores dinámicos: cantidad, peso, info, clonar, eliminar")
print("✅ Pallets/cajas dinámicos: largo, ancho, alto, peso, info, clonar, eliminar")
print("✅ Manipulación especial múltiple + detalle obligatorio")
print("✅ API preparada para mandar detalle completo a HubSpot")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
