from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-container-original-look-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-container-original-look-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

# -----------------------------------------------------
# 1) Arreglos de seguridad por parches anteriores
# -----------------------------------------------------
tsx = re.sub(r"\{\s*\.prev,", "{ ...prev,", tsx)
tsx = re.sub(r"\{\s*\.form,", "{ ...form,", tsx)
tsx = re.sub(r"\.{4,}prev,", "...prev,", tsx)
tsx = re.sub(r"\.{4,}form,", "...form,", tsx)

tsx = tsx.replace(
'''          cargo: cargoRowsSummary || selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",''',
'''          cargo: cargoRowsSummary || (selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : ""),'''
)

tsx = tsx.replace(
'''          cargo: selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",''',
'''          cargo: selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",'''
)

# -----------------------------------------------------
# 2) Imágenes: usar tus assets reales
# -----------------------------------------------------
image_map = {
    "/images/quote/cargo04.png": "/images/contenedores/contenedor-20.png",
    "/images/quote/cargo02.png": "/images/contenedores/contenedor-higcube40.png",
    "/images/quote/cargo03.png": "/images/contenedores/contenedor-reefer-20.png",
    "/images/quote/cargo01.png": "/images/contenedores/otro.png",
}

# No reemplazamos todos los cargo04 globalmente porque 20 y 40 usan archivos distintos.
# Lo hacemos por bloques de id.
replacements = [
    (
        'id: "contenedor_20",',
        'image: "/images/contenedores/contenedor-20.png",',
        'es: { title: "Contenedor estándar de", subtitle: "20\'" },',
        'nameCargo: "Contenedor Estandar de 20\'",',
    ),
    (
        'id: "contenedor_40",',
        'image: "/images/contenedores/contenedor-40.png",',
        'es: { title: "Contenedor estándar de", subtitle: "40\'" },',
        'nameCargo: "Contenedor Estandar de 40\'",',
    ),
    (
        'id: "contenedor_high_cube_40",',
        'image: "/images/contenedores/contenedor-higcube40.png",',
        'es: { title: "Contenedor", subtitle: "high cube de 40\'" },',
        'nameCargo: "Contenedor high cube de 40\'",',
    ),
    (
        'id: "contenedor_reefer_20",',
        'image: "/images/contenedores/contenedor-reefer-20.png",',
        'es: { title: "Contenedor", subtitle: "reefer de 20\'" },',
        'nameCargo: "Contenedor refeer de 20\'",',
    ),
    (
        'id: "contenedor_reefer_40",',
        'image: "/images/contenedores/contenedor-reefer-40.png",',
        'es: { title: "Contenedor", subtitle: "reefer de 40\'" },',
        'nameCargo: "Contenedor refeer de 40\'",',
    ),
    (
        'id: "contenedor_otro",',
        'image: "/images/contenedores/otro.png",',
        'es: { title: "Otro", subtitle: "" },',
        'nameCargo: "Otro contenedor",',
    ),
]

for marker, new_image, new_es_label, new_name in replacements:
    pos = tsx.find(marker)
    if pos == -1:
        continue

    next_pos = tsx.find('  {', pos + 10)
    block_end = next_pos if next_pos != -1 else tsx.find('] as const', pos)
    if block_end == -1:
        continue

    block = tsx[pos:block_end]

    block = re.sub(r'image:\s*"[^"]+"', new_image, block, count=1)

    if 'nameCargo:' in block:
        block = re.sub(r'nameCargo:\s*"[^"]+"', new_name.rstrip(","), block, count=1)

    block = re.sub(
        r'es:\s*\{\s*title:\s*"[^"]*",\s*subtitle:\s*"[^"]*"\s*\}',
        new_es_label.rstrip(","),
        block,
        count=1,
        flags=re.S
    )

    tsx = tsx[:pos] + block + tsx[block_end:]

# Pallets y cajas: nombres como original
pallet_labels = {
    'id: "pallet_europeo",': ('image: "/images/pallets/European_pallet.png",', 'es: { title: "Pallet", subtitle: "Europeo 120x80" }', 'nameCargo: "Palet Europeo"'),
    'id: "pallet_americano",': ('image: "/images/pallets/American_pallet.png",', 'es: { title: "Pallet", subtitle: "Americano 120x100" }', 'nameCargo: "Palet Americano"'),
    'id: "pallets_otros",': ('image: "/images/pallets/otros_pallets.png",', 'es: { title: "Pallets", subtitle: "Otros a determinar" }', 'nameCargo: "Pallets otros a determinar"'),
    'id: "cajas_bultos",': ('image: "/images/pallets/cajas.png",', 'es: { title: "Cajas o bultos", subtitle: "sueltos" }', 'nameCargo: "Cajas o bultos sueltos"'),
}

for marker, (new_image, new_es_label, new_name) in pallet_labels.items():
    pos = tsx.find(marker)
    while pos != -1:
        next_pos = tsx.find('  {', pos + 10)
        block_end = next_pos if next_pos != -1 else tsx.find('] as const', pos)
        if block_end == -1:
            break

        block = tsx[pos:block_end]
        block = re.sub(r'image:\s*"[^"]+"', new_image, block, count=1)

        if 'nameCargo:' in block:
            block = re.sub(r'nameCargo:\s*"[^"]+"', new_name, block, count=1)

        block = re.sub(
            r'es:\s*\{\s*title:\s*"[^"]*",\s*subtitle:\s*"[^"]*"\s*\}',
            new_es_label,
            block,
            count=1,
            flags=re.S
        )

        tsx = tsx[:pos] + block + tsx[block_end:]
        pos = tsx.find(marker, pos + len(block))

# -----------------------------------------------------
# 3) JSX: agregar data-cargo-id para poder dibujar línea por tipo
# -----------------------------------------------------
tsx = tsx.replace(
'''                      className={`${styles.cargoOption} ${styles.cargoButton}`}
                      data-active={form.cargoType === item.id}''',
'''                      className={`${styles.cargoOption} ${styles.cargoButton}`}
                      data-cargo-id={item.id}
                      data-active={form.cargoType === item.id}'''
)

tsx = tsx.replace(
'''                      className={styles.cargoOption}
                      data-active={form.cargoType === item.id}''',
'''                      className={`${styles.cargoOption} ${styles.cargoButton}`}
                      data-cargo-id={item.id}
                      data-active={form.cargoType === item.id}'''
)

# -----------------------------------------------------
# 4) Si el archivo usa cargoRowsSummary, asegurar que cargo no rompa TS
# -----------------------------------------------------
tsx = tsx.replace(
'''          cargo: cargoRowsSummary || selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : "",''',
'''          cargo: cargoRowsSummary || (selectedCargoLabel
            ? `${selectedCargoLabel.title} - ${selectedCargoLabel.subtitle}`
            : ""),'''
)

page_path.write_text(tsx, encoding="utf-8")

# -----------------------------------------------------
# 5) CSS: look original para contenedores/pallets dentro del semáforo
# -----------------------------------------------------
start_marker = "/* === COTIZACION CONTAINER ORIGINAL LOOK START === */"
end_marker = "/* === COTIZACION CONTAINER ORIGINAL LOOK END === */"

css = re.sub(
    re.escape(start_marker) + r"[\s\S]*?" + re.escape(end_marker),
    "",
    css
).rstrip()

css_patch = f'''
{start_marker}

/* Cards tipo formulario original Across, integradas al formulario semáforo */
.cargoGrid {{
  display: grid !important;
  grid-template-columns: repeat(3, minmax(260px, 1fr)) !important;
  gap: 3.8rem 2.8rem !important;
  margin-top: 1.3rem !important;
  margin-bottom: 1.6rem !important;
}}

.cargoButton,
.cargoGrid .cargoOption {{
  position: relative !important;
  min-height: 96px !important;
  display: grid !important;
  grid-template-columns: 120px 1fr !important;
  align-items: center !important;
  gap: 1.1rem !important;
  padding: .85rem 1.25rem !important;
  border-radius: 0 !important;
  border: 3px solid rgba(255,255,255,.95) !important;
  background: rgba(247,247,247,.94) !important;
  box-shadow: none !important;
  cursor: pointer !important;
  text-align: left !important;
  overflow: visible !important;
}}

.cargoButton:hover,
.cargoGrid .cargoOption:hover {{
  transform: none !important;
  border-color: rgba(255,255,255,1) !important;
  box-shadow: 0 8px 22px rgba(7,17,29,.08) !important;
}}

.cargoButton[data-active="true"],
.cargoGrid .cargoOption[data-active="true"] {{
  border-color: #ffffff !important;
  outline: 2px solid rgba(225,19,67,.34) !important;
  background: #fff !important;
}}

.cargoButton input,
.cargoGrid .cargoOption input {{
  position: absolute !important;
  opacity: 0 !important;
  pointer-events: none !important;
}}

.cargoButton .cargoImage,
.cargoGrid .cargoOption .cargoImage {{
  width: 108px !important;
  height: 68px !important;
  object-fit: contain !important;
  object-position: center !important;
  filter: grayscale(1) contrast(1.08) !important;
  transform: translateY(-2px) !important;
}}

.cargoButton .cargoText,
.cargoGrid .cargoOption .cargoText {{
  display: block !important;
  min-width: 0 !important;
  color: #000 !important;
}}

.cargoButton .cargoText strong,
.cargoGrid .cargoOption .cargoText strong {{
  display: inline !important;
  color: #000 !important;
  -webkit-text-fill-color: #000 !important;
  font-size: clamp(1rem, 1.35vw, 1.25rem) !important;
  font-weight: 500 !important;
  line-height: 1.18 !important;
  letter-spacing: -.02em !important;
  text-transform: none !important;
}}

.cargoButton .cargoText small,
.cargoGrid .cargoOption .cargoText small {{
  display: inline !important;
  margin-left: .24rem !important;
  color: #d00236 !important;
  -webkit-text-fill-color: #d00236 !important;
  font-size: clamp(1rem, 1.35vw, 1.25rem) !important;
  font-weight: 500 !important;
  line-height: 1.18 !important;
  text-transform: none !important;
}}

.cargoButton[data-cargo-id="contenedor_high_cube_40"] .cargoText small,
.cargoButton[data-cargo-id="contenedor_reefer_20"] .cargoText small,
.cargoButton[data-cargo-id="contenedor_reefer_40"] .cargoText small {{
  display: block !important;
  margin-left: 0 !important;
}}

.cargoButton[data-cargo-id="contenedor_otro"] .cargoText small {{
  display: none !important;
}}

/* Línea roja de medición debajo de la imagen, como el original */
.cargoButton::before,
.cargoGrid .cargoOption::before {{
  content: "" !important;
  position: absolute !important;
  left: 24px !important;
  bottom: 18px !important;
  width: 72px !important;
  height: 2px !important;
  background: #d00236 !important;
  transform: rotate(12deg) !important;
  transform-origin: left center !important;
  z-index: 3 !important;
}}

.cargoButton::after,
.cargoGrid .cargoOption::after {{
  content: "" !important;
  position: absolute !important;
  left: 24px !important;
  bottom: 18px !important;
  width: 2px !important;
  height: 13px !important;
  background: #d00236 !important;
  z-index: 3 !important;
}}

.cargoButton[data-cargo-id="contenedor_20"]::before {{
  width: 72px !important;
}}

.cargoButton[data-cargo-id="contenedor_40"]::before {{
  width: 86px !important;
}}

.cargoButton[data-cargo-id="contenedor_high_cube_40"]::before {{
  width: 76px !important;
}}

.cargoButton[data-cargo-id="contenedor_high_cube_40"]::after {{
  left: 112px !important;
  bottom: 54px !important;
  height: 34px !important;
}}

.cargoButton[data-cargo-id="contenedor_reefer_20"]::before {{
  width: 74px !important;
}}

.cargoButton[data-cargo-id="contenedor_reefer_40"]::before {{
  width: 90px !important;
}}

.cargoButton[data-cargo-id="contenedor_otro"]::before,
.cargoButton[data-cargo-id="contenedor_otro"]::after {{
  display: none !important;
}}

/* Modo superior: Contenedor completo / Carga suelta */
.cargoModeGrid {{
  display: grid !important;
  grid-template-columns: repeat(2, minmax(280px, 1fr)) !important;
  gap: clamp(1.6rem, 6vw, 6rem) !important;
  margin: 1.4rem 0 2.5rem !important;
}}

.cargoModeOption {{
  min-height: 142px !important;
  display: grid !important;
  grid-template-columns: 155px 1fr !important;
  align-items: center !important;
  gap: 1.35rem !important;
  padding: 1rem 1.35rem !important;
  border: 0 !important;
  border-radius: 0 !important;
  background: #fff !important;
  box-shadow: none !important;
  cursor: pointer !important;
  text-align: left !important;
  position: relative !important;
}}

.cargoModeOption img {{
  width: 138px !important;
  height: 92px !important;
  object-fit: contain !important;
  filter: grayscale(1) contrast(1.08) !important;
}}

.cargoModeOption strong {{
  color: #28313a !important;
  -webkit-text-fill-color: #28313a !important;
  font-size: clamp(1.35rem, 2.2vw, 1.9rem) !important;
  line-height: 1.18 !important;
  font-weight: 650 !important;
  text-transform: uppercase !important;
  letter-spacing: -.035em !important;
}}

.cargoModeOption small {{
  display: none !important;
}}

.cargoModeOption::after {{
  content: "" !important;
  position: absolute !important;
  left: calc(155px + 1.35rem) !important;
  bottom: 28px !important;
  width: 178px !important;
  height: 7px !important;
  background: #d8d8d8 !important;
}}

.cargoModeOption[data-active="true"]::after {{
  background: #c90032 !important;
}}

.cargoModeOption[data-active="true"] {{
  outline: 0 !important;
  background: #fff !important;
}}

@media (max-width: 1100px) {{
  .cargoGrid {{
    grid-template-columns: repeat(2, minmax(260px, 1fr)) !important;
    gap: 2rem 1.5rem !important;
  }}
}}

@media (max-width: 760px) {{
  .cargoGrid,
  .cargoModeGrid {{
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }}

  .cargoButton,
  .cargoGrid .cargoOption {{
    grid-template-columns: 100px 1fr !important;
    min-height: 92px !important;
    padding: .8rem 1rem !important;
  }}

  .cargoButton .cargoImage,
  .cargoGrid .cargoOption .cargoImage {{
    width: 92px !important;
    height: 58px !important;
  }}

  .cargoButton::before,
  .cargoGrid .cargoOption::before {{
    left: 18px !important;
    bottom: 15px !important;
    width: 60px !important;
  }}

  .cargoButton::after,
  .cargoGrid .cargoOption::after {{
    left: 18px !important;
    bottom: 15px !important;
  }}

  .cargoModeOption {{
    grid-template-columns: 112px 1fr !important;
    min-height: 112px !important;
  }}

  .cargoModeOption img {{
    width: 100px !important;
    height: 72px !important;
  }}

  .cargoModeOption::after {{
    left: calc(112px + 1.35rem) !important;
    bottom: 18px !important;
    width: 120px !important;
    height: 5px !important;
  }}
}}

{end_marker}
'''

css += "\n\n" + css_patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cambios aplicados:")
print("✅ Cards de contenedor estilo original")
print("✅ Línea roja debajo de imagen")
print("✅ Textos originales con parte roja")
print("✅ Imágenes desde /images/contenedores y /images/pallets")
print("✅ Fix spreads .prev/.form si estaban rotos")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
