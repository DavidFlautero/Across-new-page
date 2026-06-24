from pathlib import Path
import shutil

p = Path("src/app/cotizacion/page.tsx")

backup = p.with_suffix(p.suffix + ".bak-before-friendly-email-error-final")
if not backup.exists():
    shutil.copy2(p, backup)

s = p.read_text(encoding="utf-8", errors="ignore")

old = '''        console.error("ERROR REAL /api/cotizacion:", response.status, realError);
        setError(`Error ${response.status}: ${realError || t.error}`);
        return;'''

new = '''        console.error("ERROR REAL /api/cotizacion:", response.status, realError);

        const normalizedError = String(realError || "").toUpperCase();

        if (normalizedError.includes("BLOCKED_EMAIL") || normalizedError.includes("FIELDS.EMAIL")) {
          setError(
            locale === "en"
              ? "The email entered cannot be used. Please use a valid personal or business email."
              : locale === "zh"
                ? "输入的电子邮件无法使用。请使用有效的个人或公司邮箱。"
                : "El correo ingresado no puede ser utilizado. Por favor, use un email personal o corporativo válido."
          );
          return;
        }

        setError(t.error);
        return;'''

if old not in s:
    print("⚠️ No encontré el bloque exacto. Buscá console.error('ERROR REAL /api/cotizacion')")
else:
    s = s.replace(old, new, 1)
    p.write_text(s, encoding="utf-8")
    print("✅ Error técnico ocultado")
    print("✅ BLOCKED_EMAIL ahora muestra mensaje profesional")
    print("✅ Backup:", backup)
