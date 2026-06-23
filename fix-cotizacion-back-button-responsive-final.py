from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-back-button-responsive-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-back-button-responsive-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Reparar bloque JSX vacío si quedó de parches anteriores
tsx = re.sub(
    r"\s*\{\s*activeStep\s*===\s*3\s*&&\s*\(\s*\)\s*\}",
    "",
    tsx,
    flags=re.S
)

# 2) Textos: Siguiente / Atrás / Enviar solicitud
tsx = re.sub(
    r'''const continueLabel\s*=\s*locale === "en" \? "Continue" : locale === "zh" \? "继续" : "Continuar";''',
    '''const continueLabel =
    locale === "en" ? "Next" : locale === "zh" ? "下一步" : "Siguiente";''',
    tsx,
    count=1
)

tsx = tsx.replace('submit: "Solicitar presupuesto",', 'submit: "Enviar solicitud",')
tsx = tsx.replace('submit: "Request quote",', 'submit: "Send request",')
tsx = tsx.replace('submit: "提交报价请求",', 'submit: "提交申请",')

# 3) Agregar backLabel y previousStep dentro del componente
if "const backLabel =" not in tsx:
    marker = "  const editLabel"
    helper = '''  const backLabel =
    locale === "en" ? "Back" : locale === "zh" ? "返回" : "Atrás";

  const previousStep = () => {
    setActiveStep((current) => Math.max(0, current - 1));
    setStepError("");
  };

'''
    if marker not in tsx:
        raise SystemExit("❌ No encontré const editLabel para insertar backLabel")
    tsx = tsx.replace(marker, helper + marker, 1)

# 4) Header final: no debe mostrar Siguiente, debe mostrar Enviar solicitud en desktop
tsx = tsx.replace(
    '<strong>{activeStep === 3 ? continueLabel : editLabel}</strong>',
    '<strong>{activeStep === 3 ? t.submit : editLabel}</strong>',
    1
)

# 5) Agregar botón Atrás en pasos 2 y 3 visibles por nextStep(1) y nextStep(2)
def add_back_before_next(source: str, step: int) -> str:
    target = f'''              <div className={{styles.accordionActions}}>
                <button type="button" onClick={{() => nextStep({step})}}>'''
    replacement = f'''              <div className={{styles.accordionActions}}>
                <button type="button" className={{styles.backButton}} onClick={{previousStep}}>
                  {{backLabel}}
                </button>
                <button type="button" onClick={{() => nextStep({step})}}>'''
    if target in source and f"nextStep({step})" in source:
        # evita duplicar si ya tiene backButton inmediatamente antes
        around = source[source.find(target):source.find(target)+420]
        if "styles.backButton" not in around:
            source = source.replace(target, replacement, 1)
    return source

tsx = add_back_before_next(tsx, 1)
tsx = add_back_before_next(tsx, 2)

# 6) Último paso: debe tener Atrás + submit real, no nextStep(3)
final_old = '''              <div className={styles.accordionActions}>
                <button type="button" onClick={() => nextStep(3)}>
                  {continueLabel}
                </button>
              </div>'''

final_new = '''              <div className={styles.accordionActions}>
                <button type="button" className={styles.backButton} onClick={previousStep}>
                  {backLabel}
                </button>
                <button type="submit" disabled={sending}>
                  {sending ? t.sending : t.submit}
                </button>
              </div>'''

if final_old in tsx:
    tsx = tsx.replace(final_old, final_new, 1)
else:
    # si el botón final ya fue tocado, aseguramos que cualquier nextStep(3) sea submit
    tsx = re.sub(
        r'''<div className=\{styles\.accordionActions\}>\s*
\s*<button type="button" onClick=\{\(\) => nextStep\(3\)\}>\s*
\s*\{continueLabel\}\s*
\s*</button>\s*
\s*</div>''',
        final_new,
        tsx,
        count=1,
        flags=re.S
    )

# 7) Si hay submit global fuera de los pasos, eliminarlo para que solo viva en el último paso
tsx = re.sub(
    r'''\s*<button type="submit" className=\{styles\.submit\} disabled=\{sending\}>\s*
\s*\{sending \? t\.sending : t\.submit\}\s*
\s*</button>''',
    "",
    tsx,
    count=1,
    flags=re.S
)

tsx = re.sub(
    r'''\s*\{activeStep === 3 && \(\s*
\s*<button type="submit" className=\{styles\.submit\} disabled=\{sending\}>\s*
\s*\{sending \? t\.sending : t\.submit\}\s*
\s*</button>\s*
\s*\)\}''',
    "",
    tsx,
    count=1,
    flags=re.S
)

page_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION BACK BUTTON RESPONSIVE FINAL START === */"
end = "/* === COTIZACION BACK BUTTON RESPONSIVE FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Wizard responsive final:
   - Mobile responsive como prueba aprobada.
   - Header limpio en mobile.
   - Botón Atrás + Siguiente / Enviar solicitud.
   - Semáforo oculto en mobile.
*/

@media (max-width: 700px) {{
  .quoteShell {{
    width: calc(100% - 1rem) !important;
    margin: 2rem auto 5rem !important;
    display: block !important;
    grid-template-columns: 1fr !important;
    background: transparent !important;
    isolation: auto !important;
  }}

  .steps {{
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    height: 0 !important;
    min-height: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
    border: 0 !important;
    pointer-events: none !important;
  }}

  .formCard {{
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
    padding: 1rem !important;
    border-radius: 24px !important;
    margin: 0 auto !important;
    background: rgba(255,255,255,.97) !important;
    box-shadow: 0 22px 62px rgba(7,17,29,.14) !important;
  }}

  .formHeader {{
    display: grid !important;
    grid-template-columns: 42px minmax(0, 1fr) !important;
    gap: .8rem !important;
    align-items: start !important;
  }}

  .formHeader > span:first-child {{
    width: 42px !important;
    height: 42px !important;
    min-width: 42px !important;
    border-radius: 12px !important;
  }}

  .formHeader h2 {{
    font-size: clamp(1.9rem, 9vw, 2.45rem) !important;
    line-height: .95 !important;
    letter-spacing: -.055em !important;
    max-width: 100% !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
    color: #07111d !important;
    -webkit-text-fill-color: #07111d !important;
  }}

  .formHeader p {{
    font-size: .88rem !important;
    line-height: 1.45 !important;
    max-width: 100% !important;
    color: rgba(7,17,29,.64) !important;
    -webkit-text-fill-color: rgba(7,17,29,.64) !important;
  }}

  /* Ocultar texto lateral del header: Siguiente / Editar / Enviar solicitud */
  .formHeader strong {{
    display: none !important;
  }}

  .formGrid,
  .twoCols,
  .grid,
  .locationGrid {{
    grid-template-columns: 1fr !important;
    gap: .85rem !important;
    min-width: 0 !important;
  }}

  .formCard input,
  .formCard select,
  .formCard textarea {{
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    min-height: 48px !important;
    box-sizing: border-box !important;
    border-radius: 15px !important;
    padding: .85rem .9rem !important;
    font-size: .82rem !important;
  }}

  .formCard textarea {{
    min-height: 130px !important;
  }}

  .accordionActions {{
    display: flex !important;
    justify-content: flex-start !important;
    align-items: center !important;
    gap: .65rem !important;
    flex-wrap: wrap !important;
    margin-top: 1.2rem !important;
  }}

  .accordionActions button,
  .formCard button[type="submit"] {{
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 48px !important;
    min-width: 150px !important;
    padding: 0 1.25rem !important;
    border-radius: 999px !important;
    border: 0 !important;
    background: linear-gradient(135deg, #07111d 0%, #173247 100%) !important;
    color: #fff !important;
    -webkit-text-fill-color: #fff !important;
    font-weight: 950 !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    box-shadow: 0 18px 44px rgba(7,17,29,.20) !important;
  }}

  .accordionActions .backButton {{
    min-width: 112px !important;
    background: rgba(7,17,29,.06) !important;
    color: #07111d !important;
    -webkit-text-fill-color: #07111d !important;
    border: 1px solid rgba(7,17,29,.16) !important;
    box-shadow: none !important;
  }}
}}

@media (min-width: 701px) {{
  .accordionActions {{
    display: flex !important;
    align-items: center !important;
    gap: .75rem !important;
    flex-wrap: wrap !important;
  }}

  .accordionActions button {{
    min-height: 54px !important;
    min-width: 158px !important;
    padding: 0 1.55rem !important;
    border-radius: 999px !important;
    border: 0 !important;
    background:
      radial-gradient(circle at 18% 0%, rgba(255,255,255,.18), transparent 34%),
      linear-gradient(135deg, #07111d 0%, #0d1c2b 46%, #173247 100%) !important;
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    font-weight: 950 !important;
    cursor: pointer !important;
    box-shadow:
      0 20px 48px rgba(7,17,29,.25),
      inset 0 1px 0 rgba(255,255,255,.16) !important;
  }}

  .accordionActions .backButton {{
    min-width: 126px !important;
    background: rgba(7,17,29,.06) !important;
    color: #07111d !important;
    -webkit-text-fill-color: #07111d !important;
    border: 1px solid rgba(7,17,29,.16) !important;
    box-shadow: none !important;
  }}
}}

@media (max-width: 390px) {{
  .quoteShell {{
    width: calc(100% - .8rem) !important;
  }}

  .formCard {{
    padding: .85rem !important;
    border-radius: 22px !important;
  }}

  .formHeader h2 {{
    font-size: clamp(1.65rem, 9.5vw, 2.15rem) !important;
  }}

  .accordionActions button,
  .formCard button[type="submit"] {{
    width: 100% !important;
    min-width: 0 !important;
  }}

  .accordionActions .backButton {{
    width: 100% !important;
    min-width: 0 !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Cotización: agregado botón Atrás")
print("✅ Mobile responsive aplicado como prueba aprobada")
print("✅ Botones: Atrás + Siguiente / Enviar solicitud")
print("✅ Semáforo oculto en mobile")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
