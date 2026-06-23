from pathlib import Path
import re
import shutil

css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-remove-floating-bg-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION REMOVE FLOATING BG FINAL START === */"
end = "/* === COTIZACION REMOVE FLOATING BG FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Quita la placa clara gigante detrás del formulario.
   La página maneja el fondo general.
   quoteShell queda transparente.
   formCard queda como tarjeta blanca real. */

.page {{
  background:
    linear-gradient(
      180deg,
      #08090d 0%,
      #08090d 54vh,
      #f4f0ea 54vh,
      #eee8df 100%
    ) !important;
  overflow-x: hidden !important;
}}

.quoteShell {{
  background: transparent !important;
  isolation: auto !important;
  position: relative !important;
  z-index: 5 !important;
  margin-top: 3.2rem !important;
}}

.quoteShell::before,
.quoteShell::after {{
  content: none !important;
  display: none !important;
  background: transparent !important;
  box-shadow: none !important;
  border: 0 !important;
}}

.formCard {{
  background:
    radial-gradient(circle at 88% 0%, rgba(214,192,141,.10), transparent 24rem),
    rgba(255,255,255,.96) !important;
  position: relative !important;
  z-index: 6 !important;
  box-shadow: 0 28px 80px rgba(7,17,29,.16) !important;
}}

@media (max-width: 700px) {{
  .page {{
    background:
      linear-gradient(
        180deg,
        #08090d 0%,
        #08090d 54vh,
        #f4f0ea 54vh,
        #eee8df 100%
      ) !important;
  }}

  .quoteShell {{
    width: calc(100% - 1rem) !important;
    margin: 2rem auto 5rem !important;
    background: transparent !important;
    isolation: auto !important;
  }}

  .quoteShell::before,
  .quoteShell::after {{
    content: none !important;
    display: none !important;
    background: transparent !important;
    box-shadow: none !important;
    border: 0 !important;
  }}

  .formCard {{
    background: rgba(255,255,255,.97) !important;
    box-shadow: 0 22px 62px rgba(7,17,29,.14) !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización: eliminada placa/fondo flotante del quoteShell")
print("✅ quoteShell queda transparente")
print("✅ formCard queda como tarjeta blanca limpia")
print("✅ Backup:", backup)
