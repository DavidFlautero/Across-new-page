from pathlib import Path
import re
import shutil

TITLE = "Operaciones logísticas con visión sostenible"
SECTOR_ROOT = Path("src/app/sectores")
HOME = Path("src/app/page.tsx")
SHARED_COMPONENT = Path("src/components/sections/HomeOperatorShared.tsx")

BAD_TOKENS = [
    "styles.darkBand",
    "styles.finalCta",
    "t.bandTitle",
    "t.finalTitle",
    "data-sector-final-cta",
    "HomeOperatorBlock",
    "HomeOperatorShared",
    "Coordinemos su próxima operación internacional",
    "HomeCorporateFinal",
]

def remove_section_containing(text: str, token: str) -> str:
    while token in text:
        pos = text.find(token)
        start = text.rfind("<section", 0, pos)
        end = text.find("</section>", pos)

        if start == -1 or end == -1:
            text = text.replace("<HomeOperatorBlock />", "")
            text = text.replace("<HomeOperatorShared />", "")
            text = text.replace(token, "")
            break

        end += len("</section>")
        text = text[:start].rstrip() + "\n\n" + text[end:].lstrip()

    return text

def find_section_containing(text: str, needle: str):
    pos = text.find(needle)
    if pos == -1:
        return ""

    start = text.rfind("<section", 0, pos)
    if start == -1:
        return ""

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
                return text[start:i]

        i += 1

    return ""

def insert_import(text: str, line: str) -> str:
    if line.strip() in text:
        return text

    imports = list(re.finditer(r'^import .+?;\s*$', text, re.M))
    if imports:
        pos = imports[-1].end()
        return text[:pos] + "\n" + line + "\n" + text[pos:]

    return line + "\n" + text

def extract_imports_used_by_block(source_text: str, block: str):
    imports = []

    for m in re.finditer(r'^import .+?;\s*$', source_text, re.M):
        line = m.group(0)
        # Agarra imports que el bloque usa: Image, Link, styles, etc.
        names = re.findall(r'import\s+([A-Za-z_$][\w$]*)\s+from', line)
        named = re.findall(r'import\s+\{([^}]+)\}\s+from', line)

        used = False

        for n in names:
            if re.search(rf'\b{re.escape(n)}\b', block):
                used = True

        for group in named:
            for n in group.split(","):
                n = n.strip().split(" as ")[-1].strip()
                if n and re.search(rf'\b{re.escape(n)}\b', block):
                    used = True

        if used:
            imports.append(line)

    # Seguridad por si usa Image/Link y no los detectó
    if "<Image" in block and not any('next/image' in x for x in imports):
        imports.append('import Image from "next/image";')

    if "<Link" in block and not any('next/link' in x for x in imports):
        imports.append('import Link from "next/link";')

    return imports

def find_component_file_with_title():
    candidates = []

    for p in Path("src").rglob("*.tsx"):
        if ".bak" in p.name:
            continue

        text = p.read_text(encoding="utf-8", errors="ignore")
        if TITLE in text:
            candidates.append(p)

    return candidates

def default_export_name(text: str, path: Path):
    m = re.search(r'export\s+default\s+function\s+([A-Za-z_$][\w$]*)', text)
    if m:
        return m.group(1)

    m = re.search(r'export\s+default\s+([A-Za-z_$][\w$]*)', text)
    if m:
        return m.group(1)

    return path.stem

def alias_path(path: Path):
    rel = path.relative_to(Path("src")).with_suffix("")
    return "@/" + rel.as_posix()

matches = find_component_file_with_title()

print("Encontré el texto correcto en:")
for m in matches:
    print(" -", m)

component_file = None
component_name = None
component_import_path = None

# Caso ideal: ya existe como componente real fuera de HOME
for p in matches:
    if p != HOME and "components" in p.as_posix():
        txt = p.read_text(encoding="utf-8", errors="ignore")
        component_file = p
        component_name = default_export_name(txt, p)
        component_import_path = alias_path(p)
        break

# Si no existe como componente, extraemos el bloque exacto de HOME
if not component_file:
    if not HOME.exists():
        raise SystemExit("❌ No existe src/app/page.tsx")

    home_text = HOME.read_text(encoding="utf-8", errors="ignore")
    block = find_section_containing(home_text, TITLE)

    if not block:
        raise SystemExit("❌ No encontré el bloque exacto en HOME. Corré: grep -R \"Operaciones logísticas con visión sostenible\" -n src")

    imports = extract_imports_used_by_block(home_text, block)

    SHARED_COMPONENT.parent.mkdir(parents=True, exist_ok=True)

    if SHARED_COMPONENT.exists():
        shutil.copy2(SHARED_COMPONENT, SHARED_COMPONENT.with_suffix(SHARED_COMPONENT.suffix + ".bak"))

    code = '"use client";\n\n'
    code += "\n".join(imports) + "\n\n"
    code += "export default function HomeOperatorShared() {\n"
    code += "  return (\n"
    code += block + "\n"
    code += "  );\n"
    code += "}\n"

    SHARED_COMPONENT.write_text(code, encoding="utf-8")

    component_file = SHARED_COMPONENT
    component_name = "HomeOperatorShared"
    component_import_path = "@/components/sections/HomeOperatorShared"

    print("✅ Bloque exacto de HOME extraído como componente compartido.")

else:
    print("✅ Componente real existente detectado:", component_file)

import_line = f'import {component_name} from "{component_import_path}";'
component_call = f"<{component_name} />"

updated = []

for page in sorted(SECTOR_ROOT.glob("*/page.tsx")):
    text = page.read_text(encoding="utf-8", errors="ignore")
    original = text

    backup = page.with_suffix(page.suffix + ".bak-before-real-operator-call")
    if not backup.exists():
        shutil.copy2(page, backup)

    # Borrar toda basura anterior
    for token in BAD_TOKENS:
        text = remove_section_containing(text, token)

    text = re.sub(r'\n\s*<HomeOperatorBlock\s*/>\s*', "\n", text)
    text = re.sub(r'\n\s*<HomeOperatorShared\s*/>\s*', "\n", text)

    # Borrar imports viejos
    text = re.sub(r'^import HomeOperatorBlock .+?;\s*$', '', text, flags=re.M)
    text = re.sub(r'^import HomeOperatorShared .+?;\s*$', '', text, flags=re.M)

    text = insert_import(text, import_line)

    close = text.rfind("</main>")
    if close == -1:
        print("❌ No encontré </main> en", page)
        continue

    text = text[:close].rstrip() + f"\n\n        {component_call}\n\n" + text[close:]

    if text != original:
        page.write_text(text, encoding="utf-8")
        updated.append(str(page))

print("✅ Sectores actualizados:")
for u in updated:
    print(" -", u)

print("\n✅ Componente usado:", component_name)
print("✅ Import usado:", import_line)
