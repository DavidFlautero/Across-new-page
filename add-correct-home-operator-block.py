from pathlib import Path
import re
import shutil

TITLE = "Operaciones logísticas con visión sostenible"

# Buscamos el bloque correcto en HOME y backups reales.
SOURCES = [
    Path("src/app/page.tsx"),
    Path("src/app/page.tsx.bak-before-home-operator-component"),
    Path("src/app/page.tsx.bak-hero-final"),
    Path("src/app/page.tsx.bak-remove-contact-hero-final"),
    *Path("src/app").glob("page.tsx.bak*"),
    *Path("backups").rglob("page.tsx") if Path("backups").exists() else [],
]

COMPONENT = Path("src/components/sections/HomeOperatorBlock.tsx")
SECTOR_ROOT = Path("src/app/sectores")

def find_section(text: str, needle: str):
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
            continue

        i += 1

    return ""

def get_css_imports(text: str):
    pattern = re.compile(r'import\s+([A-Za-z_$][\w$]*)\s+from\s+["\'](.+?\.module\.css)["\'];')
    return dict(pattern.findall(text))

def resolve_import_path(source_file: Path, import_path: str):
    if import_path.startswith("@/"):
        return import_path

    resolved = (source_file.parent / import_path).resolve()
    cwd = Path.cwd().resolve()

    try:
        rel = resolved.relative_to(cwd / "src")
        return "@/" + rel.as_posix()
    except Exception:
        return "@/app/page.module.css"

def extract_const(text: str, name: str):
    m = re.search(rf'\bconst\s+{re.escape(name)}\b', text)
    if not m:
        return ""

    i = m.start()
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
        else:
            if ch in ("'", '"', "`"):
                quote = ch
            elif ch in "([{":
                depth += 1
            elif ch in ")]}":
                depth -= 1
            elif ch == ";" and depth == 0:
                return text[m.start():i + 1]

        i += 1

    return ""

def insert_import(text: str, import_line: str):
    if import_line.strip() in text:
        return text

    imports = list(re.finditer(r'^import .+?;\s*$', text, re.M))
    if imports:
        pos = imports[-1].end()
        return text[:pos] + "\n" + import_line + "\n" + text[pos:]

    return import_line + "\n" + text

def remove_home_operator_component(text: str):
    text = re.sub(r'\n\s*<HomeOperatorBlock\s*/>\s*\n', "\n", text)
    return text

# 1) Extraer bloque correcto exacto.
source_file = None
source_text = ""
block = ""

seen = set()
for src in SOURCES:
    if not src or not Path(src).exists():
        continue

    src = Path(src)
    if src in seen:
        continue
    seen.add(src)

    txt = src.read_text(encoding="utf-8", errors="ignore")
    candidate = find_section(txt, TITLE)

    if candidate:
        source_file = src
        source_text = txt
        block = candidate
        break

if not block:
    raise SystemExit("❌ No encontré el bloque exacto con 'Operaciones logísticas con visión sostenible'. Corré: grep -R \"Operaciones logísticas con visión sostenible\" -n src backups")

print("✅ Bloque correcto encontrado en:", source_file)

# 2) Crear componente compartido con el bloque exacto.
css_imports = get_css_imports(source_text)
used_css_aliases = sorted({
    alias for alias in re.findall(r'\b([A-Za-z_$][\w$]*)\.', block)
    if alias in css_imports
})

imports = ['"use client";', ""]

if "<Image" in block:
    imports.append('import Image from "next/image";')

if "<Link" in block:
    imports.append('import Link from "next/link";')

if "CSSProperties" in block:
    imports.append('import type { CSSProperties } from "react";')

for alias in used_css_aliases:
    imports.append(f'import {alias} from "{resolve_import_path(source_file, css_imports[alias])}";')

# Copiar constantes usadas en maps, si existen.
used_vars = sorted(set(re.findall(r'\b([A-Za-z_$][\w$]*)\.map\s*\(', block)))
consts = []

for var in used_vars:
    c = extract_const(source_text, var)
    if c and c not in consts:
        consts.append(c)

component_code = "\n".join(imports).rstrip() + "\n\n"

if consts:
    component_code += "\n\n".join(consts) + "\n\n"

component_code += f'''export default function HomeOperatorBlock() {{
  return (
{block}
  );
}}
'''

COMPONENT.parent.mkdir(parents=True, exist_ok=True)

if COMPONENT.exists():
    shutil.copy2(COMPONENT, COMPONENT.with_suffix(COMPONENT.suffix + ".bak-before-correct-operator"))

COMPONENT.write_text(component_code, encoding="utf-8")
print("✅ Componente correcto creado:", COMPONENT)

# 3) Agregar el componente en todos los sectores antes de cerrar main.
updated = []

for page in sorted(SECTOR_ROOT.glob("*/page.tsx")):
    text = page.read_text(encoding="utf-8", errors="ignore")
    original = text

    backup = page.with_suffix(page.suffix + ".bak-before-add-correct-home-operator")
    if not backup.exists():
        shutil.copy2(page, backup)

    # Quitar cualquier intento previo.
    text = remove_home_operator_component(text)

    text = insert_import(text, 'import HomeOperatorBlock from "@/components/sections/HomeOperatorBlock";')

    close_main = text.rfind("</main>")
    if close_main == -1:
        print("❌ No encontré </main> en:", page)
        continue

    text = text[:close_main].rstrip() + "\n\n        <HomeOperatorBlock />\n\n" + text[close_main:]

    if text != original:
        page.write_text(text, encoding="utf-8")
        updated.append(str(page))

print("✅ Bloque correcto agregado en sectores:")
for p in updated:
    print(" -", p)

print("\\n✅ HOME no fue tocada.")
