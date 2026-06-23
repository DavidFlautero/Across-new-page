from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-form-black-text-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION FORM BLACK TEXT FINAL START === */"
end = "/* === COTIZACION FORM BLACK TEXT FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Fuerza todo el contenido del formulario de cotización a negro real.
   Evita textos crema/dorados heredados en Operación, Datos de origen,
   Datos de destino, Incoterm y tarjetas internas. */

.formCard,
.formCard * {{
  opacity: 1 !important;
  text-shadow: none !important;
}}

.formCard h1,
.formCard h2,
.formCard h3,
.formCard h4,
.formCard h5,
.formCard p,
.formCard label,
.formCard strong,
.formCard small,
.formCard span:not([class*="step"]):not([class*="badge"]) {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
}}

.formCard .formHeader h2,
.formCard .formHeader p,
.formCard .sectionTitle,
.formCard .fieldGroup h3,
.formCard .fieldGroup p,
.formCard [class*="incoterm"] h3,
.formCard [class*="incoterm"] p,
.formCard [class*="cargo"] h3,
.formCard [class*="cargo"] p {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  opacity: 1 !important;
}}

.formCard input,
.formCard select,
.formCard textarea,
.formCard option {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  opacity: 1 !important;
}}

.formCard input::placeholder,
.formCard textarea::placeholder {{
  color: rgba(7,17,29,.58) !important;
  -webkit-text-fill-color: rgba(7,17,29,.58) !important;
  opacity: 1 !important;
}}

.formCard label,
.formCard label *,
.formCard article,
.formCard article *,
.formCard [class*="option"],
.formCard [class*="option"] *,
.formCard [class*="card"],
.formCard [class*="card"] * {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  opacity: 1 !important;
}}

.formCard div h3,
.formCard fieldset h3,
.formCard legend {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  opacity: 1 !important;
}}

.formCard div p,
.formCard fieldset p,
.formCard label small,
.formCard article small {{
  color: rgba(7,17,29,.68) !important;
  -webkit-text-fill-color: rgba(7,17,29,.68) !important;
  opacity: 1 !important;
}}

/* Número del paso dentro del cuadro azul */
.formCard .formHeader > span:first-child {{
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  opacity: 1 !important;
}}

/* Botones del wizard */
.formCard button,
.formCard button * {{
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  opacity: 1 !important;
}}

/* Estados */
.formCard .error,
.formCard [class*="error"],
.formCard [class*="fail"] {{
  color: #b42318 !important;
  -webkit-text-fill-color: #b42318 !important;
}}

.formCard .success,
.formCard [class*="success"] {{
  color: #0a7a3b !important;
  -webkit-text-fill-color: #0a7a3b !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización: todo el texto del formulario queda negro real")
print("✅ Se mantienen botones en blanco y número del paso en blanco")
print("✅ Backup:", backup)
