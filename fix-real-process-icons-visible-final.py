from pathlib import Path
import re
import shutil

css_files = [
    Path("src/app/servicios/[slug]/Servicio.module.css"),
    Path("src/app/servicios/aduanas/Aduanas.module.css"),
    Path("src/app/servicios/almacen-distribucion/AlmacenDistribucion.module.css"),
    Path("src/app/servicios/cargas-especiales/CargasEspeciales.module.css"),
]

existing = [p for p in css_files if p.exists()]

if not existing:
    existing = list(Path("src/app").glob("**/*Servicio*.module.css")) + list(Path("src/app").glob("**/*Aduanas*.css")) + list(Path("src/app").glob("**/*Almacen*.css")) + list(Path("src/app").glob("**/*Cargas*.css"))

existing = sorted(set(existing))

kill_markers = [
    ("/* === FINAL OVERRIDE PROCESS ONLY NUMBERS START === */", "/* === FINAL OVERRIDE PROCESS ONLY NUMBERS END === */"),
    ("/* === ACROSS PROCESS SOLO NUMEROS GLOBAL FINAL START === */", "/* === ACROSS PROCESS SOLO NUMEROS GLOBAL FINAL END === */"),
]

final_start = "/* === PROCESS ICONS VISIBLE REAL FINAL START === */"
final_end = "/* === PROCESS ICONS VISIBLE REAL FINAL END === */"

final_patch = f"""
{final_start}

/* Reactiva los iconos reales del JSX: <i><Icon /></i> */
.processGrid i,
.processGrid article i,
.page .processGrid i,
.page .processGrid article i {{
  display: inline-grid !important;
  opacity: 1 !important;
  visibility: visible !important;
  width: 22px !important;
  height: 22px !important;
  min-width: 22px !important;
  min-height: 22px !important;
  margin: 0 !important;
  padding: 0 !important;
  pointer-events: none !important;
  place-items: center !important;
  color: #173247 !important;
  background: rgba(23, 50, 71, .06) !important;
  border: 1px solid rgba(23, 50, 71, .26) !important;
  border-radius: 999px !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.80) !important;
}}

.processGrid i svg,
.processGrid article i svg,
.page .processGrid i svg,
.page .processGrid article i svg {{
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  width: 12px !important;
  height: 12px !important;
  min-width: 12px !important;
  min-height: 12px !important;
  margin: 0 !important;
  padding: 0 !important;
  stroke: currentColor !important;
}}

/* Número simple + icono + contenido, como sectores */
.processGrid article,
.page .processGrid article {{
  display: grid !important;
  grid-template-columns: 42px 24px minmax(0, 1fr) !important;
  column-gap: .75rem !important;
  align-items: start !important;
}}

.processGrid strong,
.processGrid article strong,
.page .processGrid strong,
.page .processGrid article strong {{
  grid-column: 1 !important;
  grid-row: 1 / span 2 !important;
  display: block !important;
  width: auto !important;
  height: auto !important;
  min-width: 0 !important;
  min-height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  color: #07101a !important;
  -webkit-text-fill-color: #07101a !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  font-size: 1rem !important;
  line-height: 1 !important;
  font-weight: 950 !important;
}}

.processGrid h3,
.page .processGrid h3 {{
  grid-column: 3 !important;
  margin: 0 !important;
}}

.processGrid p,
.page .processGrid p {{
  grid-column: 3 !important;
  margin-top: .55rem !important;
}}

@media (max-width: 900px) {{
  .processGrid,
  .page .processGrid {{
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }}

  .processGrid article,
  .page .processGrid article {{
    display: grid !important;
    grid-template-columns: 42px 24px minmax(0, 1fr) !important;
    column-gap: .72rem !important;
    padding: 1.05rem 0 !important;
    border-bottom: 1px solid rgba(8, 11, 16, .10) !important;
  }}

  .processGrid i,
  .processGrid article i,
  .page .processGrid i,
  .page .processGrid article i {{
    grid-column: 2 !important;
    grid-row: 1 !important;
    width: 22px !important;
    height: 22px !important;
    min-width: 22px !important;
    min-height: 22px !important;
  }}

  .processGrid strong,
  .processGrid article strong,
  .page .processGrid strong,
  .page .processGrid article strong {{
    grid-column: 1 !important;
    grid-row: 1 / span 2 !important;
  }}

  .processGrid h3,
  .page .processGrid h3 {{
    grid-column: 3 !important;
    grid-row: 1 !important;
  }}

  .processGrid p,
  .page .processGrid p {{
    grid-column: 3 !important;
    grid-row: 2 !important;
  }}
}}

{final_end}
"""

changed = 0

for p in existing:
    css = p.read_text(encoding="utf-8", errors="ignore")

    if "processGrid" not in css:
        continue

    backup = p.with_suffix(p.suffix + ".bak-before-real-process-icons-visible")
    if not backup.exists():
        shutil.copy2(p, backup)

    for start, end in kill_markers:
        css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css)

    # Borra reglas sueltas que esconden iconos aunque estén fuera de marcador
    css = re.sub(
        r"\.processGrid\s+i,\s*\.processGrid\s+article\s+i,\s*\.processGrid\s+i\s+svg,\s*\.processGrid\s+article\s+i\s+svg,\s*\.page\s+\.processGrid\s+i,\s*\.page\s+\.processGrid\s+article\s+i,\s*\.page\s+\.processGrid\s+i\s+svg,\s*\.page\s+\.processGrid\s+article\s+i\s+svg\s*\{[\s\S]*?\}",
        "",
        css
    )

    css = re.sub(
        r"\.processGrid\s+i,\s*\.processGrid\s+article\s+i,\s*\.page\s+\.processGrid\s+i,\s*\.page\s+\.processGrid\s+article\s+i\s*\{[\s\S]*?display:\s*none\s*!important[\s\S]*?\}",
        "",
        css
    )

    css = re.sub(re.escape(final_start) + r"[\s\S]*?" + re.escape(final_end), "", css).rstrip()
    css += "\n\n" + final_patch.strip() + "\n"

    p.write_text(css, encoding="utf-8")
    changed += 1
    print("✅ Iconos reactivados en:", p)

print("✅ Archivos modificados:", changed)
