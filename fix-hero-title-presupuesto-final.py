from pathlib import Path
import shutil

files = list(Path("src").rglob("*.tsx")) + list(Path("src").rglob("*.ts"))

old_texts = [
    "Coordinemos su próxima operación logística.",
    "Coordinemos su proxima operación logística.",
    "Coordinemos su próxima operación logistica.",
    "Coordinemos su proxima operacion logistica.",
]

new_text = "Solicite su presupuesto logístico ahora."

changed = []

for p in files:
    s = p.read_text(encoding="utf-8", errors="ignore")
    original = s

    for old in old_texts:
        s = s.replace(old, new_text)

    if s != original:
        backup = p.with_suffix(p.suffix + ".bak-before-presupuesto-title")
        if not backup.exists():
            shutil.copy2(p, backup)

        p.write_text(s, encoding="utf-8")
        changed.append(str(p))

print("✅ Título cambiado por:", new_text)
print("✅ Archivos modificados:")
for item in changed:
    print(" -", item)

if not changed:
    print("⚠️ No encontré el texto exacto. Corré grep para ubicarlo.")
