from pathlib import Path
import re
import shutil

# =====================================================
# 1) FIX BUILD: quitar duplicados de validadores cotización
# =====================================================

cotizacion = Path("src/app/cotizacion/page.tsx")

if cotizacion.exists():
    backup = cotizacion.with_suffix(cotizacion.suffix + ".bak-before-final-validator-dedupe")
    if not backup.exists():
        shutil.copy2(cotizacion, backup)

    s = cotizacion.read_text(encoding="utf-8", errors="ignore")

    # Hay dos invalidEmailMessage / invalidPhoneMessage.
    # Dejamos el bloque completo que tiene blockedEmail + sanitizePhone,
    # y eliminamos el bloque simple anterior.
    first_email = s.find("\n  const invalidEmailMessage =")
    second_email = s.find("\n  const invalidEmailMessage =", first_email + 1) if first_email != -1 else -1

    if first_email != -1 and second_email != -1:
        # borrar desde el primer invalidEmailMessage hasta justo antes del segundo invalidEmailMessage
        s = s[:first_email] + "\n" + s[second_email:]

    # Si igual quedaran duplicados exactos, elimina los repetidos conservando el primero
    def keep_first_const(src: str, name: str) -> str:
        pat = f"\n  const {name} ="
        first = src.find(pat)
        if first == -1:
            return src

        while True:
            second = src.find(pat, first + len(pat))
            if second == -1:
                return src

            next_const = src.find("\n  const ", second + len(pat))
            next_if = src.find("\n  if ", second + len(pat))
            candidates = [x for x in [next_const, next_if] if x != -1]
            end = min(candidates) if candidates else len(src)
            src = src[:second] + "\n" + src[end:]

    for name in ["invalidEmailMessage", "invalidPhoneMessage"]:
        s = keep_first_const(s, name)

    s = re.sub(r'",\s*,', '",', s)
    s = re.sub(r'\},\s*,', '},', s)
    s = re.sub(r"\.{4,}form,", "...form,", s)
    s = re.sub(r"\.{4,}prev,", "...prev,", s)

    cotizacion.write_text(s, encoding="utf-8")
    print("✅ Cotización: validadores duplicados limpiados")

# =====================================================
# 2) Agregar iconos a procesos de páginas de servicios
# =====================================================

service_css_files = []

for pattern in [
    "src/app/servicios/**/*.module.css",
    "src/app/**/Aduanas.module.css",
    "src/app/**/AlmacenDistribucion*.css",
    "src/app/**/CargasEspeciales*.css",
    "src/app/**/Sector.module.css",
]:
    service_css_files.extend(Path(".").glob(pattern))

# Evitar duplicados
service_css_files = sorted(set(service_css_files))

service_patch_start = "/* === SERVICE PROCESS ICONS LIKE SECTORES FINAL START === */"
service_patch_end = "/* === SERVICE PROCESS ICONS LIKE SECTORES FINAL END === */"

service_patch = f"""
{service_patch_start}

/* Iconos para procesos de servicios, estilo Sectores */
.processGrid > article,
.process article {{
  position: relative !important;
}}

.processGrid > article h3,
.process article h3 {{
  display: flex !important;
  align-items: center !important;
  gap: .55rem !important;
  min-width: 0 !important;
}}

.processGrid > article h3::before,
.process article h3::before {{
  content: "" !important;
  width: 22px !important;
  height: 22px !important;
  flex: 0 0 22px !important;
  border-radius: 999px !important;
  border: 1px solid rgba(18,63,89,.28) !important;
  background:
    rgba(18,63,89,.06)
    center / 13px 13px
    no-repeat !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.85) !important;
}}

/* 1 búsqueda/análisis */
.processGrid > article:nth-child(1) h3::before,
.process article:nth-child(1) h3::before {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23123f59' stroke-width='2'%3E%3Ccircle cx='10' cy='10' r='6'/%3E%3Cpath d='M15 15l5 5'/%3E%3C/svg%3E") !important;
}}

/* 2 ruta/diseño */
.processGrid > article:nth-child(2) h3::before,
.process article:nth-child(2) h3::before {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23123f59' stroke-width='2'%3E%3Cpath d='M7 7h6a4 4 0 010 8H6'/%3E%3Cpath d='M9 4L6 7l3 3'/%3E%3C/svg%3E") !important;
}}

/* 3 documentación */
.processGrid > article:nth-child(3) h3::before,
.process article:nth-child(3) h3::before {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23123f59' stroke-width='2'%3E%3Cpath d='M7 3h7l4 4v14H7z'/%3E%3Cpath d='M14 3v5h5'/%3E%3Cpath d='M9 13h6M9 17h6'/%3E%3C/svg%3E") !important;
}}

/* 4 ejecución */
.processGrid > article:nth-child(4) h3::before,
.process article:nth-child(4) h3::before {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23123f59' stroke-width='2'%3E%3Cpath d='M4 16l5-5 4 4 7-7'/%3E%3Cpath d='M14 8h6v6'/%3E%3C/svg%3E") !important;
}}

/* 5 seguimiento */
.processGrid > article:nth-child(5) h3::before,
.process article:nth-child(5) h3::before {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23123f59' stroke-width='2'%3E%3Cpath d='M12 21s7-4 7-10a7 7 0 10-14 0c0 6 7 10 7 10z'/%3E%3Ccircle cx='12' cy='11' r='2'/%3E%3C/svg%3E") !important;
}}

/* 6 entrega final */
.processGrid > article:nth-child(6) h3::before,
.process article:nth-child(6) h3::before {{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23123f59' stroke-width='2'%3E%3Cpath d='M3 7h12v10H3z'/%3E%3Cpath d='M15 11h3l3 3v3h-6z'/%3E%3Ccircle cx='7' cy='18' r='1.5'/%3E%3Ccircle cx='18' cy='18' r='1.5'/%3E%3C/svg%3E") !important;
}}

@media (max-width: 760px) {{
  .processGrid > article h3,
  .process article h3 {{
    display: flex !important;
    align-items: center !important;
    gap: .52rem !important;
  }}

  .processGrid > article h3::before,
  .process article h3::before {{
    width: 21px !important;
    height: 21px !important;
    flex-basis: 21px !important;
    background-size: 12px 12px !important;
  }}
}}

{service_patch_end}
"""

for css_file in service_css_files:
    css = css_file.read_text(encoding="utf-8", errors="ignore")

    if ".process" not in css and "processGrid" not in css:
        continue

    backup = css_file.with_suffix(css_file.suffix + ".bak-before-service-process-icons-final")
    if not backup.exists():
        shutil.copy2(css_file, backup)

    css = re.sub(
        re.escape(service_patch_start) + r"[\s\S]*?" + re.escape(service_patch_end),
        "",
        css
    ).rstrip()

    css += "\n\n" + service_patch.strip() + "\n"
    css_file.write_text(css, encoding="utf-8")
    print("✅ Iconos proceso aplicados:", css_file)

# =====================================================
# 3) Quitar punto/acento dorado de títulos
# =====================================================

global_css = Path("src/app/globals.css")
if global_css.exists():
    backup = global_css.with_suffix(global_css.suffix + ".bak-before-remove-gold-dot-real-final")
    if not backup.exists():
        shutil.copy2(global_css, backup)

    css = global_css.read_text(encoding="utf-8", errors="ignore")

    start = "/* === REMOVE GOLD TITLE DOT REAL FINAL START === */"
    end = "/* === REMOVE GOLD TITLE DOT REAL FINAL END === */"

    css = re.sub(re.escape(start) + r"[\s\S]*?" + re.escape(end), "", css).rstrip()

    patch = f"""
{start}

/* Quita el punto/acento dorado pegado a títulos */
main h1::after,
main h2::after,
main h3::after,
main [class*="title"]::after,
main [class*="Title"]::after,
main [class*="heading"]::after,
main [class*="Heading"]::after {{
  content: none !important;
  display: none !important;
  color: transparent !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}}

/* Si el punto viene como span/b/strong decorativo champagne */
main h1 > span:last-child,
main h2 > span:last-child,
main h3 > span:last-child,
main h1 > b:last-child,
main h2 > b:last-child,
main h3 > b:last-child,
main h1 > strong:last-child,
main h2 > strong:last-child,
main h3 > strong:last-child {{
  color: inherit !important;
  -webkit-text-fill-color: inherit !important;
}}

{end}
"""
    css += "\n\n" + patch.strip() + "\n"
    global_css.write_text(css, encoding="utf-8")
    print("✅ Punto/acento dorado eliminado desde globals.css")

print("✅ Patch completo terminado")
