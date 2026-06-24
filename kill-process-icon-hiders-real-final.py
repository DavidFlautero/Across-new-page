from pathlib import Path
import re
import shutil

targets = [
    Path("src/app/servicios/[slug]/Servicio.module.css"),
    Path("src/app/servicios/aduanas/Aduanas.module.css"),
    Path("src/app/servicios/almacen-distribucion/AlmacenDistribucion.module.css"),
    Path("src/app/servicios/cargas-especiales/CargasEspeciales.module.css"),
]

targets = [p for p in targets if p.exists()]

if not targets:
    raise SystemExit("❌ No encontré CSS de servicios")

for p in targets:
    backup = p.with_suffix(p.suffix + ".bak-before-kill-process-icon-hiders-real-final")
    if not backup.exists():
        shutil.copy2(p, backup)

    css = p.read_text(encoding="utf-8", errors="ignore")

    # 1) Borra bloques completos marcados como solo números / only numbers
    block_markers = [
        ("/* === FINAL OVERRIDE PROCESS ONLY NUMBERS START === */", "/* === FINAL OVERRIDE PROCESS ONLY NUMBERS END === */"),
        ("/* === ACROSS PROCESS SOLO NUMEROS GLOBAL FINAL START === */", "/* === ACROSS PROCESS SOLO NUMEROS GLOBAL FINAL END === */"),
    ]

    for start, end in block_markers:
        css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css)

    # 2) Borra cualquier regla CSS que mencione processGrid i y tenga display:none / visibility:hidden / opacity:0 / width:0
    rule_pattern = re.compile(r"[^{}]*processGrid[^{}]*\bi\b[^{}]*\{[^{}]*\}", re.S)

    def keep_or_drop(match):
        rule = match.group(0)
        bad = (
            "display: none" in rule or
            "visibility: hidden" in rule or
            "opacity: 0" in rule or
            "width: 0" in rule or
            "height: 0" in rule or
            "min-width: 0" in rule or
            "min-height: 0" in rule
        )
        return "" if bad else rule

    css = rule_pattern.sub(keep_or_drop, css)

    # 3) Borra media-query internos puntuales que oculten i dentro de min/max-width.
    css = re.sub(
        r"\.processGrid\s+i,\s*\.processGrid\s+article\s+i,\s*\.processGrid\s+article::after,\s*\.processGrid\s+article:not\(:last-child\)::after\s*\{\s*display:\s*none\s*!important;\s*content:\s*none\s*!important;\s*\}",
        "",
        css,
        flags=re.S
    )

    # 4) Agrega bloque final limpio y ganador.
    start_final = "/* === PROCESS ICONS ACTUALLY VISIBLE FINAL START === */"
    end_final = "/* === PROCESS ICONS ACTUALLY VISIBLE FINAL END === */"

    css = re.sub(re.escape(start_final) + r"[\s\S]*?" + re.escape(end_final), "", css).rstrip()

    final_patch = f"""
{start_final}

/* Proceso con número + icono + texto, igual a Sectores */
.page .processGrid,
.processGrid {{
  display: grid !important;
}}

.page .processGrid article,
.processGrid article {{
  display: grid !important;
  grid-template-columns: 44px 28px minmax(0, 1fr) !important;
  grid-template-areas:
    "num icon title"
    "num . text" !important;
  column-gap: .68rem !important;
  align-items: start !important;
  overflow: visible !important;
}}

.page .processGrid article strong,
.processGrid article strong {{
  grid-area: num !important;
  display: block !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1rem !important;
  line-height: 1 !important;
  font-weight: 950 !important;
}}

.page .processGrid article i,
.processGrid article i {{
  grid-area: icon !important;
  display: inline-flex !important;
  opacity: 1 !important;
  visibility: visible !important;
  width: 22px !important;
  height: 22px !important;
  min-width: 22px !important;
  min-height: 22px !important;
  margin: -.08rem 0 0 !important;
  padding: 0 !important;
  align-items: center !important;
  justify-content: center !important;
  color: #123f59 !important;
  -webkit-text-fill-color: #123f59 !important;
  background: rgba(18, 63, 89, .045) !important;
  border: 1px solid rgba(18, 63, 89, .22) !important;
  border-radius: 999px !important;
  pointer-events: none !important;
}}

.page .processGrid article i svg,
.processGrid article i svg,
.page .processGrid article svg,
.processGrid article svg {{
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  width: 13px !important;
  height: 13px !important;
  min-width: 13px !important;
  min-height: 13px !important;
  stroke: #123f59 !important;
  color: #123f59 !important;
  stroke-width: 2 !important;
}}

.page .processGrid article h3,
.processGrid article h3 {{
  grid-area: title !important;
  margin: 0 !important;
  align-self: start !important;
}}

.page .processGrid article p,
.processGrid article p {{
  grid-area: text !important;
  margin-top: .45rem !important;
}}

@media (max-width: 900px) {{
  .page .processGrid,
  .processGrid {{
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }}

  .page .processGrid article,
  .processGrid article {{
    display: grid !important;
    grid-template-columns: 42px 28px minmax(0, 1fr) !important;
    grid-template-areas:
      "num icon title"
      "num . text" !important;
    padding: 1.05rem 0 !important;
    border-bottom: 1px solid rgba(8, 11, 16, .10) !important;
  }}
}}

{end_final}
"""

    css += "\n\n" + final_patch.strip() + "\n"
    p.write_text(css, encoding="utf-8")
    print("✅ Limpiado y reactivado:", p)

print("✅ Listo")
