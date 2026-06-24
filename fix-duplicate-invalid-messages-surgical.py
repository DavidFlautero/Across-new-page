from pathlib import Path
import shutil
import re

p = Path("src/app/cotizacion/page.tsx")

backup = p.with_suffix(p.suffix + ".bak-before-surgical-invalid-messages")
if not backup.exists():
    shutil.copy2(p, backup)

s = p.read_text(encoding="utf-8", errors="ignore")

def remove_second_const(src: str, name: str) -> str:
    pattern = f"\n  const {name} ="
    first = src.find(pattern)
    if first == -1:
        print(f"⚠️ No encontré {name}")
        return src

    second = src.find(pattern, first + len(pattern))
    if second == -1:
        print(f"✅ {name} no está duplicado")
        return src

    # Borra solo ese const, hasta el próximo const del mismo nivel
    next_const = src.find("\n  const ", second + len(pattern))
    next_function = src.find("\n  function ", second + len(pattern))
    next_if = src.find("\n  if ", second + len(pattern))

    candidates = [x for x in [next_const, next_function, next_if] if x != -1]
    end = min(candidates) if candidates else second

    print(f"✅ Eliminando segunda definición de {name}")
    return src[:second] + "\n" + src[end:]

s = remove_second_const(s, "invalidEmailMessage")
s = remove_second_const(s, "invalidPhoneMessage")

# Limpieza general
s = re.sub(r'",\s*,', '",', s)
s = re.sub(r'\},\s*,', '},', s)
s = re.sub(r"\.{4,}form,", "...form,", s)
s = re.sub(r"\.{4,}prev,", "...prev,", s)

p.write_text(s, encoding="utf-8")

print("✅ Duplicados quirúrgicamente eliminados")
print("✅ Backup:", backup)
