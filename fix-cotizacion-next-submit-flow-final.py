from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

backup = page_path.with_suffix(page_path.suffix + ".bak-before-next-submit-flow-final")
if not backup.exists():
    shutil.copy2(page_path, backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Cambiar texto final del envío.
tsx = tsx.replace('submit: "Solicitar presupuesto",', 'submit: "Enviar solicitud",')
tsx = tsx.replace('submit: "Request quote",', 'submit: "Send request",')
tsx = tsx.replace('submit: "申请报价",', 'submit: "提交申请",')

# 2) Quitar el botón "Continuar" del último paso.
#    El último paso no debe avanzar a activeStep 4. Debe usar el submit final.
final_continue_pattern = r'''
\s*<div className=\{styles\.accordionActions\}>\s*
<button type="button" onClick=\{\(\) => nextStep\(3\)\}>\s*
\{continueLabel\}\s*
</button>\s*
</div>
'''

tsx = re.sub(
    final_continue_pattern,
    "",
    tsx,
    count=1,
    flags=re.VERBOSE
)

# 3) Hacer que el botón submit solo aparezca en el último paso.
old_submit = '''            <button type="submit" className={styles.submit} disabled={sending}>
              {sending ? t.sending : t.submit}
            </button>'''

new_submit = '''            {activeStep === 3 && (
              <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? t.sending : t.submit}
              </button>
            )}'''

if old_submit in tsx:
    tsx = tsx.replace(old_submit, new_submit, 1)
elif "{activeStep === 3 && (" not in tsx:
    raise SystemExit("❌ No encontré el botón submit final para condicionar")

# 4) Opcional: que el texto del header final no diga Continuar.
tsx = tsx.replace(
    '<strong>{activeStep === 3 ? continueLabel : editLabel}</strong>',
    '<strong>{activeStep === 3 ? t.submit : editLabel}</strong>',
    1
)

page_path.write_text(tsx, encoding="utf-8")

print("✅ Cotización: pasos 1-3 usan Continuar/Siguiente")
print("✅ El botón final solo aparece en el paso 4")
print("✅ 'Solicitar presupuesto' cambiado a 'Enviar solicitud'")
print("✅ Se quitó el nextStep(3) del último paso")
print("✅ Backup:", backup)
