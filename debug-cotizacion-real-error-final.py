from pathlib import Path
import shutil

p = Path("src/app/cotizacion/page.tsx")
backup = p.with_suffix(p.suffix + ".bak-before-debug-real-error-final")
if not backup.exists():
    shutil.copy2(p, backup)

s = p.read_text(encoding="utf-8", errors="ignore")

old = '''      if (!response.ok) {
        setError(t.error);
        return;
      }'''

new = '''      const responseText = await response.text();

      if (!response.ok) {
        let realError = responseText;

        try {
          const parsed = JSON.parse(responseText);
          realError =
            parsed.error ||
            parsed.message ||
            parsed.status ||
            responseText;
        } catch {}

        console.error("ERROR REAL /api/cotizacion:", response.status, realError);
        setError(`Error ${response.status}: ${realError || t.error}`);
        return;
      }'''

if old not in s:
    print("⚠️ No encontré el bloque exacto. Buscá manualmente: if (!response.ok)")
else:
    s = s.replace(old, new, 1)
    p.write_text(s, encoding="utf-8")
    print("✅ Ahora el formulario mostrará el error real del backend")
    print("✅ Backup:", backup)
