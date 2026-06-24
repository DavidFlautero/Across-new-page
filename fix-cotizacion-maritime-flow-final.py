from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-maritime-flow-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# =====================================================
# FIX spread roto
# =====================================================
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)
tsx = re.sub(r"(?<!\.)\.form,", "...form,", tsx)
tsx = re.sub(r"(?<!\.)\.prev,", "...prev,", tsx)

# =====================================================
# Agregar campos al initialForm
# =====================================================
tsx = tsx.replace(
'''  cargoType: "" as CargoType | "",
  units: "metric" as "metric" | "imperial",''',
'''  cargoMode: "" as "full" | "loose" | "",
  cargoType: "" as CargoType | "",
  units: "metric" as "metric" | "imperial",'''
)

tsx = tsx.replace(
'''  handling: "",
  comments: "",''',
'''  handling: "",
  specialHandling: [] as string[],
  specialRequirements: "",
  comments: "",'''
)

# =====================================================
# Reemplazar tipos de carga base
# =====================================================
if "const fullContainerCargoTypes" not in tsx:
    insert_after = "] as const;\n\ntype CargoType ="
    block = r'''
const fullContainerCargoTypes = [
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
      es: { title: "Otro", subtitle: "A determinar" },
      en: { title: "Other", subtitle: "To be determined" },
      zh: { title: "其他", subtitle: "待确定" },
    },
  },
] as const;

const looseCargoTypes = cargoTypes;

const specialHandlingOptions = [
  {
    id: "mercancia_peligrosa",
    image: "/images/quote/flame.png",
    labels: {
      es: { title: "Mercancía peligrosa", subtitle: "DGP, CAO, cantidades exceptuadas." },
      en: { title: "Dangerous goods", subtitle: "DGP, CAO, excepted quantities." },
      zh: { title: "危险品", subtitle: "DGP、CAO、例外数量。" },
    },
  },
  {
    id: "baterias_litio",
    image: "/images/quote/litio.png",
    labels: {
      es: { title: "Baterías de Litio", subtitle: "ION/Metal + Estatus de equipaje" },
      en: { title: "Lithium batteries", subtitle: "ION/Metal + baggage status" },
      zh: { title: "锂电池", subtitle: "离子/金属 + 行李状态" },
    },
  },
  {
    id: "temperatura_controlada",
    image: "/images/quote/temperature.png",
    labels: {
      es: { title: "Temperatura Controlada", subtitle: "Activo/Pasivo - Rango" },
      en: { title: "Temperature controlled", subtitle: "Active/Passive - Range" },
      zh: { title: "温控", subtitle: "主动/被动 - 范围" },
    },
  },
  {
    id: "articulos_restringidos",
    image: "/images/quote/alert.png",
    labels: {
      es: { title: "Artículos restringidos, otros.", subtitle: "Médico, armas, arte, etc" },
      en: { title: "Restricted items, others.", subtitle: "Medical, weapons, art, etc" },
      zh: { title: "限制物品等", subtitle: "医疗、武器、艺术品等" },
    },
  },
] as const;

'''
    tsx = tsx.replace("] as const;\n\ntype CargoType =", "] as const;\n\n" + block + "type CargoType =", 1)

# =====================================================
# Expandir CargoType
# =====================================================
tsx = tsx.replace(
'type CargoType = (typeof cargoTypes)[number]["id"];',
'type CargoType = (typeof cargoTypes)[number]["id"] | (typeof fullContainerCargoTypes)[number]["id"];'
)

# =====================================================
# Reemplazar lógica selectedCargo/showMeasureBox
# =====================================================
tsx = re.sub(
    r'''const selectedCargo\s*=\s*[\s\S]*?const weightUnit\s*=\s*form\.units\s*===\s*"metric"\s*\?\s*"kg"\s*:\s*"lb";''',
    '''const maritimeMode = serviceMode === "ocean";
  const visibleCargoTypes =
    maritimeMode && form.cargoMode === "full"
      ? fullContainerCargoTypes
      : maritimeMode && form.cargoMode === "loose"
        ? looseCargoTypes
        : !maritimeMode
          ? cargoTypes
          : [];

  const selectedCargo = visibleCargoTypes.find((item) => item.id === form.cargoType);
  const showMeasureBox = Boolean(form.cargoType);
  const cargoMeasureTitle = selectedCargo?.labels[locale].title || t.cargoTitle;

  const lengthUnit = form.units === "metric" ? "cm" : "inch";
  const weightUnit = form.units === "metric" ? "kg" : "lb";''',
    tsx,
    count=1
)

# =====================================================
# Insertar helpers de selección
# =====================================================
if "const selectCargoMode =" not in tsx:
    marker = '''  const setValue = <K extends keyof typeof initialForm>(
    key: K,
    value: (typeof initialForm)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setStepError("");
  };
'''
    helper = marker + r'''

  const selectCargoMode = (mode: "full" | "loose") => {
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
    }));
    setStepError("");
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
    tsx = tsx.replace(marker, helper, 1)

# =====================================================
# Validación cargoMode marítimo + detalle especial
# =====================================================
tsx = tsx.replace(
'''    if (step === 2) {
      if (!isFilled(form.incoterm)) return requiredMessage(t.incotermTitle);
      if (!isFilled(form.cargoType)) return requiredCargoMessage;
      if (!isFilled(form.merchandise)) return requiredMessage(t.merchandise);
      return "";
    }

    if (step === 3) {
      if (!form.privacyAccepted) return requiredPrivacyMessage;
      return "";
    }''',
'''    if (step === 2) {
      if (!isFilled(form.incoterm)) return requiredMessage(t.incotermTitle);
      if (maritimeMode && !form.cargoMode) return requiredCargoMessage;
      if (!isFilled(form.cargoType)) return requiredCargoMessage;
      if (!isFilled(form.merchandise)) return requiredMessage(t.merchandise);
      return "";
    }

    if (step === 3) {
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

      if (!form.privacyAccepted) return requiredPrivacyMessage;
      return "";
    }'''
)

# =====================================================
# Arreglar payload submit
# =====================================================
tsx = re.sub(r"\.{1,}\s*form,", "...form,", tsx)
tsx = tsx.replace(
'''          cargo: selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",''',
'''          cargoMode: form.cargoMode,
          specialHandling: form.specialHandling,
          specialRequirements: form.specialRequirements,
          cargo: selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",'''
)

# =====================================================
# Reemplazar bloque de cargoTypes.map por flujo marítimo
# =====================================================
old = '''                    <div className={styles.cargoGrid}>
                      {visibleCargoTypes.map((item) => {
                        const labels = item.labels[locale];

                        return (
                          <label key={item.id} className={styles.cargoOption}>
                            <input
                              type="radio"
                              name="cargoType"
                              checked={form.cargoType === item.id}
                              onChange={() => setValue("cargoType", item.id)}
                            />
                            <Image
                              src={item.image}
                              alt={labels.title}
                              width={160}
                              height={110}
                              className={styles.cargoImage}
                            />
                            <span className={styles.cargoText}>
                              <strong>{labels.title}</strong>
                              <small>{labels.subtitle}</small>
                            </span>
                          </label>
                        );
                      })}
                    </div>'''

new = '''                    {maritimeMode && (
                      <div className={styles.cargoModeGrid}>
                        <button
                          type="button"
                          className={styles.cargoModeOption}
                          data-active={form.cargoMode === "full"}
                          onClick={() => selectCargoMode("full")}
                        >
                          <Image src="/images/quote/cargo04.png" alt="Contenedor completo" width={180} height={120} />
                          <strong>CONTENEDOR<br />COMPLETO</strong>
                        </button>

                        <button
                          type="button"
                          className={styles.cargoModeOption}
                          data-active={form.cargoMode === "loose"}
                          onClick={() => selectCargoMode("loose")}
                        >
                          <Image src="/images/quote/cargo06.png" alt="Carga suelta" width={180} height={120} />
                          <strong>CARGA<br />SUELTA</strong>
                        </button>
                      </div>
                    )}

                    {(!maritimeMode || form.cargoMode) && (
                      <div className={styles.cargoGrid}>
                        {visibleCargoTypes.map((item) => {
                          const labels = item.labels[locale];

                          return (
                            <label key={item.id} className={styles.cargoOption}>
                              <input
                                type="radio"
                                name="cargoType"
                                checked={form.cargoType === item.id}
                                onChange={() => setValue("cargoType", item.id)}
                              />
                              <Image
                                src={item.image}
                                alt={labels.title}
                                width={160}
                                height={110}
                                className={styles.cargoImage}
                              />
                              <span className={styles.cargoText}>
                                <strong>{labels.title}</strong>
                                <small>{labels.subtitle}</small>
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    )}'''

if old in tsx:
    tsx = tsx.replace(old, new, 1)
else:
    tsx = tsx.replace("{visibleCargoTypes.map((item) => {", "{visibleCargoTypes.map((item) => {", 1)
    print("⚠️ No encontré bloque cargoGrid exacto. Puede requerir ajuste manual.")

# Título medida
tsx = tsx.replace(
'<h3>{form.cargoType === "pallets_otros" ? t.otherPalletsTitle : t.boxesTitle}</h3>',
'<h3>{cargoMeasureTitle}</h3>'
)

# =====================================================
# Insertar special handling options después de opciones de manipulación
# =====================================================
if "specialHandlingOptions.map" not in tsx:
    anchor = '''                    <div className={styles.optionGrid}>
                      <label className={styles.option}>
                        <input
                          type="radio"
                          name="handling"
                          checked={form.handling === "general"}
                          onChange={() => setValue("handling", "general")}
                        />
                        <strong>{t.generalCargo}</strong>
                        <small>{t.generalCargoText}</small>
                      </label>
                      <label className={styles.option}>
                        <input
                          type="radio"
                          name="handling"
                          checked={form.handling === "special_handling"}
                          onChange={() => setValue("handling", "special_handling")}
                        />
                        <strong>{t.specialHandling}</strong>
                        <small>{t.specialHandlingText}</small>
                      </label>
                    </div>'''
    special_block = anchor + r'''

                    {form.handling === "special_handling" && (
                      <>
                        <div className={styles.optionGridFour}>
                          {specialHandlingOptions.map((item) => {
                            const labels = item.labels[locale];

                            return (
                              <label key={item.id} className={styles.cargoOption}>
                                <input
                                  type="checkbox"
                                  name="specialHandling"
                                  checked={form.specialHandling.includes(item.id)}
                                  onChange={() => toggleSpecialHandling(item.id)}
                                />
                                <Image
                                  src={item.image}
                                  alt={labels.title}
                                  width={120}
                                  height={90}
                                  className={styles.cargoImage}
                                />
                                <span className={styles.cargoText}>
                                  <strong>{labels.title}</strong>
                                  <small>{labels.subtitle}</small>
                                </span>
                              </label>
                            );
                          })}
                        </div>

                        <label className={styles.fullWidth}>
                          Detalle al máximo los requerimientos especiales*
                          <textarea
                            value={form.specialRequirements}
                            onChange={(event) => setValue("specialRequirements", event.target.value)}
                            placeholder={t.complete}
                            rows={5}
                          />
                        </label>
                      </>
                    )}'''
    if anchor in tsx:
        tsx = tsx.replace(anchor, special_block, 1)
    else:
        print("⚠️ No encontré bloque de handling exacto para insertar especiales.")

page_path.write_text(tsx, encoding="utf-8")

print("✅ Flujo marítimo corregido:")
print("✅ 1) Contenedor completo / Carga suelta")
print("✅ 2) Opciones según selección")
print("✅ 3) Manipulación especial multi-select")
print("✅ 4) Detalle obligatorio si hay manipulación especial")
print("✅ Backup:", backup)
