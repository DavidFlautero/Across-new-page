from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-bg-semaforo-top-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-bg-semaforo-top-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Agregar helpers de estado de pasos antes del return
helper = '''
  const getVisualStepState = (index: number) => {
    const validationError = getStepValidationError(index);

    if (index < activeStep && !validationError) return "complete";
    if (index === activeStep && validationError) return "missing";
    if (index > activeStep && !canOpenStep(index)) return "locked";

    return "pending";
  };

  const getVisualStepLabel = (index: number) => {
    const state = getVisualStepState(index);

    if (state === "complete") {
      if (locale === "en") return `Step ${index + 1} complete`;
      if (locale === "zh") return `步骤 ${index + 1} 已完成`;
      return `Paso ${index + 1} completo`;
    }

    if (state === "missing") {
      if (locale === "en") return "Missing data";
      if (locale === "zh") return "缺少数据";
      return "Faltan datos";
    }

    if (state === "locked") {
      if (locale === "en") return "Locked";
      if (locale === "zh") return "已锁定";
      return "Bloqueado";
    }

    if (locale === "en") return "Pending";
    if (locale === "zh") return "待完成";
    return "Pendiente";
  };

'''

if "const getVisualStepState =" not in tsx:
    marker = "  return (\n"
    if marker not in tsx:
        raise SystemExit("❌ No encontré el return principal")
    tsx = tsx.replace(marker, helper + "\n" + marker, 1)

# 2) Agregar data-state y data-step-state a los botones del semáforo
old = '''                disabled={index > activeStep && !canOpenStep(index)}
              >'''
new = '''                disabled={index > activeStep && !canOpenStep(index)}
                data-state={getVisualStepState(index)}
                data-step-state={getVisualStepLabel(index)}
              >'''

if 'data-state={getVisualStepState(index)}' not in tsx:
    if old not in tsx:
        raise SystemExit("❌ No encontré el botón de steps para agregar data-state")
    tsx = tsx.replace(old, new, 1)

page_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

markers = [
    ("/* === COTIZACION HERO FORM BELOW FINAL START === */", "/* === COTIZACION HERO FORM BELOW FINAL END === */"),
    ("/* === COTIZACION BG SEMAFORO TOP FINAL START === */", "/* === COTIZACION BG SEMAFORO TOP FINAL END === */"),
]

for start, end in markers:
    css = re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        css,
        flags=re.M
    ).rstrip()

start = "/* === COTIZACION BG SEMAFORO TOP FINAL START === */"
end = "/* === COTIZACION BG SEMAFORO TOP FINAL END === */"

patch = f"""
{start}
/* Cotización final:
   - Hero con dimensiones originales
   - Formulario debajo del hero
   - Fondo claro detrás del formulario
   - Semáforo arriba horizontal con estados
*/

.page {{
  background:
    linear-gradient(
      180deg,
      #08090d 0%,
      #08090d 54vh,
      #f4f0ea 54vh,
      #eee8df 100%
    ) !important;
  min-height: 100vh !important;
}}

.hero {{
  min-height: 54vh !important;
  padding: 10rem 5vw 9rem !important;
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  overflow: hidden !important;
  isolation: isolate !important;
  color: #fff !important;
  background-image:
    linear-gradient(90deg, rgba(8,11,16,.74) 0%, rgba(8,11,16,.44) 46%, rgba(8,11,16,.16) 100%),
    linear-gradient(180deg, rgba(8,11,16,.08) 0%, rgba(8,11,16,.52) 100%),
    url("/images/segundaaduana.png") !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}}

.heroOverlay {{
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}}

.heroContent {{
  max-width: 780px !important;
  width: min(780px, 100%) !important;
  position: relative !important;
  z-index: 2 !important;
  color: #fff !important;
}}

.heroContent span {{
  color: #d6c08d !important;
  -webkit-text-fill-color: #d6c08d !important;
  font-size: .75rem !important;
  font-weight: 950 !important;
  letter-spacing: .22em !important;
  text-transform: uppercase !important;
}}

.heroContent h1 {{
  max-width: 760px !important;
  margin: 1rem 0 0 !important;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: clamp(3rem, 5.6vw, 6.4rem) !important;
  line-height: .96 !important;
  letter-spacing: -.075em !important;
  font-weight: 950 !important;
  text-shadow: 0 18px 46px rgba(0,0,0,.38) !important;
}}

.heroContent p {{
  max-width: 620px !important;
  margin-top: 1.35rem !important;
  color: rgba(255,255,255,.84) !important;
  -webkit-text-fill-color: rgba(255,255,255,.84) !important;
  font-size: 1.05rem !important;
  line-height: 1.75 !important;
}}

.quoteShell {{
  width: min(1280px, calc(100% - 7vw)) !important;
  margin: 3.2rem auto 6rem !important;
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 1.4rem !important;
  align-items: start !important;
  position: relative !important;
  z-index: 5 !important;
  isolation: isolate !important;
  background: transparent !important;
}}

.quoteShell::before {{
  content: "" !important;
  position: absolute !important;
  inset: -4rem -8vw -6rem -8vw !important;
  z-index: -1 !important;
  background:
    radial-gradient(circle at 12% 0%, rgba(214,192,141,.12), transparent 28rem),
    linear-gradient(180deg, #f4f0ea 0%, #eee8df 100%) !important;
  pointer-events: none !important;
}}

.steps {{
  position: relative !important;
  top: auto !important;
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  gap: .75rem !important;
  padding: .85rem !important;
  border-radius: 28px !important;
  background:
    radial-gradient(circle at 92% 0%, rgba(214, 192, 141, .14), transparent 22rem),
    linear-gradient(135deg, #07111d 0%, #0d1c2b 52%, #173247 100%) !important;
  border: 1px solid rgba(214,192,141,.18) !important;
  box-shadow: 0 26px 80px rgba(7,17,29,.24) !important;
  backdrop-filter: blur(18px) !important;
}}

.steps button {{
  min-width: 0 !important;
  min-height: 78px !important;
  padding: .85rem !important;
  display: grid !important;
  grid-template-columns: auto 1fr !important;
  gap: .75rem !important;
  align-items: center !important;
  text-align: left !important;
  border-radius: 20px !important;
  border: 1px solid rgba(255,255,255,.10) !important;
  background: rgba(255,255,255,.055) !important;
  color: rgba(255,255,255,.78) !important;
  cursor: pointer !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06) !important;
}}

.steps button:disabled {{
  cursor: not-allowed !important;
  opacity: .72 !important;
}}

.steps button b {{
  width: 42px !important;
  height: 42px !important;
  border-radius: 999px !important;
  display: grid !important;
  place-items: center !important;
  background: rgba(255,255,255,.10) !important;
  color: #d6c08d !important;
  font-size: .8rem !important;
  font-weight: 950 !important;
}}

.steps button span {{
  color: #fff !important;
  font-size: .86rem !important;
  font-weight: 900 !important;
  line-height: 1.15 !important;
}}

.steps button::after {{
  content: attr(data-step-state);
  grid-column: 2 !important;
  margin-top: -.35rem !important;
  color: rgba(255,255,255,.62) !important;
  font-size: .68rem !important;
  font-weight: 850 !important;
  letter-spacing: .03em !important;
}}

.steps button[data-state="complete"] {{
  border-color: rgba(0,196,106,.30) !important;
  background: rgba(0,196,106,.09) !important;
}}

.steps button[data-state="complete"] b {{
  background: #00c46a !important;
  color: #07111d !important;
}}

.steps button[data-state="missing"] {{
  border-color: rgba(240,180,41,.34) !important;
  background: rgba(240,180,41,.08) !important;
}}

.steps button[data-state="missing"] b {{
  background: #f0b429 !important;
  color: #07111d !important;
}}

.steps button[data-state="locked"] {{
  opacity: .52 !important;
}}

.steps button[data-state="locked"] b {{
  background: rgba(255,255,255,.08) !important;
  color: rgba(255,255,255,.52) !important;
}}

.steps button[class*="stepActive"] {{
  border-color: rgba(214,192,141,.46) !important;
  background:
    radial-gradient(circle at 18% 0%, rgba(255,255,255,.12), transparent 36%),
    linear-gradient(135deg, #0d1c2b 0%, #173247 100%) !important;
  box-shadow:
    inset 3px 0 0 rgba(214,192,141,.78),
    0 14px 34px rgba(7,17,29,.20) !important;
}}

.formCard {{
  margin-top: 0 !important;
  position: relative !important;
  z-index: 2 !important;
}}

@media (max-width: 700px) {{
  .hero {{
    min-height: 54vh !important;
    padding: 8rem 1.2rem 7rem !important;
    align-items: center !important;
  }}

  .heroContent {{
    width: min(100%, 340px) !important;
  }}

  .heroContent h1 {{
    font-size: clamp(2.15rem, 10vw, 3rem) !important;
    line-height: .96 !important;
  }}

  .heroContent p {{
    font-size: .9rem !important;
    line-height: 1.52 !important;
  }}

  .quoteShell {{
    width: calc(100% - 1.5rem) !important;
    margin: 2.2rem auto 5rem !important;
    gap: 1rem !important;
  }}

  .steps {{
    grid-template-columns: 1fr !important;
    border-radius: 24px !important;
    padding: .75rem !important;
  }}

  .steps button {{
    min-height: 64px !important;
    grid-template-columns: 38px 1fr !important;
    border-radius: 18px !important;
  }}

  .steps button b {{
    width: 38px !important;
    height: 38px !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización: fondo claro detrás del formulario")
print("✅ Semáforo arriba del formulario")
print("✅ Estados visuales: completo / faltan datos / bloqueado / pendiente")
print("✅ Hero conservado con imagen nueva")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
