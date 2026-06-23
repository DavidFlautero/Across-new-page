from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-wizard-flow-real-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-wizard-flow-real-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Cambiar texto de avanzar: Continuar -> Siguiente
tsx = re.sub(
    r'''const continueLabel\s*=\s*locale === "en" \? "Continue" : locale === "zh" \? "继续" : "Continuar";''',
    '''const continueLabel =
    locale === "en" ? "Next" : locale === "zh" ? "下一步" : "Siguiente";''',
    tsx,
    count=1
)

# 2) Texto final del submit
tsx = tsx.replace('submit: "Solicitar presupuesto",', 'submit: "Enviar solicitud",')
tsx = tsx.replace('submit: "Request quote",', 'submit: "Send request",')
tsx = tsx.replace('submit: "提交报价请求",', 'submit: "提交申请",')

# 3) Headers: el último paso no debe decir "Siguiente", debe decir enviar
tsx = tsx.replace(
    '<strong>{activeStep === 3 ? continueLabel : editLabel}</strong>',
    '<strong>{activeStep === 3 ? t.submit : editLabel}</strong>',
    1
)

# 4) El último botón interno debe ser SUBMIT, no nextStep(3)
last_action_old = '''              <div className={styles.accordionActions}>
                <button type="button" onClick={() => nextStep(3)}>
                  {continueLabel}
                </button>
              </div>'''

last_action_new = '''              <div className={styles.accordionActions}>
                <button type="submit" disabled={sending}>
                  {sending ? t.sending : t.submit}
                </button>
              </div>'''

if last_action_old in tsx:
    tsx = tsx.replace(last_action_old, last_action_new, 1)
else:
    # Si ya fue tocado antes, forzamos cualquier botón nextStep(3) del último paso
    tsx = re.sub(
        r'''<button type="button" onClick=\{\(\) => nextStep\(3\)\}>\s*\{continueLabel\}\s*</button>''',
        '''<button type="submit" disabled={sending}>
                  {sending ? t.sending : t.submit}
                </button>''',
        tsx,
        count=1
    )

# 5) Quitar el submit global de abajo: el submit vive dentro del último paso
global_submit_patterns = [
    r'''\s*<button type="submit" className=\{styles\.submit\} disabled=\{sending\}>\s*\{sending \? t\.sending : t\.submit\}\s*</button>''',
    r'''\s*\{activeStep === 3 && \(\s*<button type="submit" className=\{styles\.submit\} disabled=\{sending\}>\s*\{sending \? t\.sending : t\.submit\}\s*</button>\s*\)\}''',
]

for pattern in global_submit_patterns:
    tsx = re.sub(pattern, "", tsx, count=1, flags=re.S)

page_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

# Limpiar parches anteriores del wizard
markers = [
    ("/* === COTIZACION ONE PANEL ARIA FINAL START === */", "/* === COTIZACION ONE PANEL ARIA FINAL END === */"),
    ("/* === COTIZACION WIZARD FLOW REAL FINAL START === */", "/* === COTIZACION WIZARD FLOW REAL FINAL END === */"),
]

for start, end in markers:
    css = re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        css,
        flags=re.M
    ).rstrip()

start = "/* === COTIZACION WIZARD FLOW REAL FINAL START === */"
end = "/* === COTIZACION WIZARD FLOW REAL FINAL END === */"

patch = f"""
{start}
/* Wizard real:
   - Solo se muestra el paso activo
   - Cada paso tiene botón Siguiente visible
   - El último paso tiene Enviar solicitud
   - El submit global de abajo queda eliminado desde TSX
*/

.formCard {{
  overflow: visible !important;
}}

.accordionPanel {{
  display: none !important;
  height: 0 !important;
  max-height: 0 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  overflow: hidden !important;
  pointer-events: none !important;
  margin: 0 !important;
  padding: 0 !important;
}}

.accordionPanel.accordionOpen {{
  display: block !important;
  height: auto !important;
  max-height: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
  pointer-events: auto !important;
  margin: 0 !important;
  padding: 0 !important;
}}

.accordionPanel.accordionOpen .accordionBody {{
  display: block !important;
  height: auto !important;
  max-height: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
  pointer-events: auto !important;
}}

.divider {{
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}}

.accordionPanel.accordionOpen .formHeader h2 {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  opacity: 1 !important;
}}

.accordionPanel.accordionOpen .formHeader p {{
  color: rgba(7,17,29,.58) !important;
  -webkit-text-fill-color: rgba(7,17,29,.58) !important;
  opacity: 1 !important;
}}

.accordionPanel.accordionOpen .formHeader strong {{
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  opacity: 1 !important;
}}

.accordionActions {{
  display: flex !important;
  justify-content: flex-start !important;
  margin-top: 1.45rem !important;
}}

.accordionActions button {{
  min-height: 54px !important;
  min-width: 158px !important;
  padding: 0 1.55rem !important;
  border: 0 !important;
  border-radius: 999px !important;
  background:
    radial-gradient(circle at 18% 0%, rgba(255,255,255,.18), transparent 34%),
    linear-gradient(135deg, #07111d 0%, #0d1c2b 46%, #173247 100%) !important;
  color: #ffffff !important;
  -webkit-text-fill-color: #ffffff !important;
  font-size: .86rem !important;
  font-weight: 950 !important;
  letter-spacing: .04em !important;
  cursor: pointer !important;
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  box-shadow:
    0 20px 48px rgba(7,17,29,.25),
    inset 0 1px 0 rgba(255,255,255,.16) !important;
  transition: transform .22s ease, box-shadow .22s ease !important;
}}

.accordionActions button:hover {{
  transform: translateY(-2px) !important;
  box-shadow:
    0 28px 68px rgba(7,17,29,.32),
    inset 0 1px 0 rgba(255,255,255,.20) !important;
}}

.accordionActions button:disabled {{
  opacity: .7 !important;
  cursor: wait !important;
}}

.submit {{
  display: none !important;
}}

.error {{
  color: #b42318 !important;
  -webkit-text-fill-color: #b42318 !important;
  font-weight: 900 !important;
  opacity: 1 !important;
}}

.success {{
  color: #0a7a3b !important;
  -webkit-text-fill-color: #0a7a3b !important;
  font-weight: 900 !important;
  opacity: 1 !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización wizard real aplicado")
print("✅ Paso 1 muestra solo Datos de contacto + botón Siguiente")
print("✅ Al dar Siguiente pasa solo al Paso 2")
print("✅ Último paso muestra Enviar solicitud")
print("✅ Submit global eliminado")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
