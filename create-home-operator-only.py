from pathlib import Path
import re
import shutil

SOURCE = Path("src/components/sections/HomeCorporateFinal.tsx")
TARGET = Path("src/components/sections/HomeOperatorOnly.tsx")

NEEDLES = [
    "Coordinemos su próxima operación internacional",
    "Hable con un especialista",
    "reciba una solución logística adaptada",
]

def section_end(text, start):
    i = start
    depth = 0
    quote = None
    esc = False

    while i < len(text):
        ch = text[i]

        if quote:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == quote:
                quote = None
            i += 1
            continue

        if ch in ("'", '"', "`"):
            quote = ch
            i += 1
            continue

        if text.startswith("<section", i):
            depth += 1
            i += len("<section")
            continue

        if text.startswith("</section>", i):
            depth -= 1
            i += len("</section>")
            if depth == 0:
                return i
            continue

        i += 1

    return -1

def extract_section(text):
    found = None

    for needle in NEEDLES:
        pos = text.find(needle)
        if pos != -1:
            found = (needle, pos)
            break

    if not found:
        print("❌ No encontré ninguno de estos textos dentro de HomeCorporateFinal:")
        for n in NEEDLES:
            print(" -", n)

        print("\n🔎 Textos importantes encontrados:")
        for m in re.finditer(r'<h[12][^>]*>([\s\S]*?)</h[12]>', text):
            raw = re.sub(r"<[^>]+>", "", m.group(1))
            raw = re.sub(r"\s+", " ", raw).strip()
            print(" -", raw)

        raise SystemExit("\nPegame ese output y te digo el needle exacto.")

    needle, pos = found
    start = text.rfind("<section", 0, pos)
    if start == -1:
        raise SystemExit(f"❌ Encontré '{needle}', pero no encontré <section> antes.")

    end = section_end(text, start)
    if end == -1:
        raise SystemExit("❌ No pude cerrar el </section>.")

    print("✅ Sección encontrada usando:", needle)
    return text[start:end]

def get_imports(source_text, section):
    imports = []

    for m in re.finditer(r'^import .+?;\s*$', source_text, re.M):
        line = m.group(0)
        names = []

        d = re.search(r'import\s+([A-Za-z_$][\w$]*)\s+from', line)
        if d:
            names.append(d.group(1))

        named = re.search(r'import\s+\{([^}]+)\}\s+from', line)
        if named:
            for raw in named.group(1).split(","):
                name = raw.strip().split(" as ")[-1].strip()
                if name:
                    names.append(name)

        if any(re.search(rf'\b{re.escape(name)}\b', section) for name in names):
            imports.append(line)

    if "<Image" in section and not any("next/image" in x for x in imports):
        imports.append('import Image from "next/image";')

    if "<Link" in section and not any("next/link" in x for x in imports):
        imports.append('import Link from "next/link";')

    return imports

if not SOURCE.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.tsx")

source_text = SOURCE.read_text(encoding="utf-8", errors="ignore")
section = extract_section(source_text)
imports = get_imports(source_text, section)

TARGET.parent.mkdir(parents=True, exist_ok=True)

if TARGET.exists():
    shutil.copy2(TARGET, TARGET.with_suffix(TARGET.suffix + ".bak"))

code = '"use client";\n\n'
code += "\n".join(imports).rstrip() + "\n\n"
code += "export default function HomeOperatorOnly() {\n"
code += "  return (\n"
code += section + "\n"
code += "  );\n"
code += "}\n"

TARGET.write_text(code, encoding="utf-8")

print("✅ Creado:", TARGET)
