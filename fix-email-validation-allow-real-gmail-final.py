from pathlib import Path
import re
import shutil

p = Path("src/app/cotizacion/page.tsx")

backup = p.with_suffix(p.suffix + ".bak-before-allow-real-gmail-final")
if not backup.exists():
    shutil.copy2(p, backup)

s = p.read_text(encoding="utf-8", errors="ignore")

# Reemplaza isBlockedEmailValue por una versión menos agresiva.
pattern = r'''  const isBlockedEmailValue = \(value: string\) => \{[\s\S]*?\n  \};'''

replacement = '''  const isBlockedEmailValue = (value: string) => {
    const email = value.trim().toLowerCase();
    const [local = "", domain = ""] = email.split("@");

    if (!email || !local || !domain) return true;

    // Solo bloqueamos correos claramente falsos o temporales.
    const blockedExactEmails = new Set([
      "test@test.com",
      "test@example.com",
      "prueba@prueba.com",
      "demo@demo.com",
      "fake@fake.com",
      "correo@correo.com",
      "email@email.com",
      "a@a.com",
    ]);

    const blockedTempDomains = [
      "mailinator.",
      "yopmail.",
      "10minutemail.",
      "guerrillamail.",
      "tempmail.",
      "temp-mail.",
      "trashmail.",
    ];

    if (blockedExactEmails.has(email)) return true;
    if (blockedTempDomains.some((blocked) => domain.includes(blocked))) return true;

    return false;
  };'''

s2, count = re.subn(pattern, replacement, s, count=1)

if count == 0:
    raise SystemExit("❌ No encontré isBlockedEmailValue para reemplazar.")

# Asegura que el email acepte caracteres válidos reales: letras, números, puntos, guiones, guion bajo, +.
s2 = s2.replace(
    'return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email);',
    'return /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$/i.test(email);'
)

# Si el input de email estaba haciendo trim en cada tecla y molestaba, lo dejamos solo lower/trim al validar.
# Pero mantenemos limpieza básica si ya estaba.
s2 = s2.replace(
    'onChange={(e) => setValue("email", e.target.value.trim().toLowerCase())}',
    'onChange={(e) => setValue("email", e.target.value.toLowerCase())}'
)

s2 = s2.replace(
    'onChange={(event) => setValue("email", event.target.value.trim().toLowerCase())}',
    'onChange={(event) => setValue("email", event.target.value.toLowerCase())}'
)

# Limpieza general
s2 = re.sub(r'",\s*,', '",', s2)
s2 = re.sub(r'\},\s*,', '},', s2)
s2 = re.sub(r"\.{4,}form,", "...form,", s2)
s2 = re.sub(r"\.{4,}prev,", "...prev,", s2)

p.write_text(s2, encoding="utf-8")

print("✅ Validación de email corregida")
print("✅ Gmail reales con letras/números/puntos/+ ahora pasan")
print("✅ Solo bloquea emails falsos exactos y dominios temporales")
print("✅ Backup:", backup)
