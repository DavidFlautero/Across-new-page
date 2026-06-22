from pathlib import Path
import re
import shutil

TITLE_OK = "Operaciones logísticas con visión sostenible"

SOURCES = [
    Path("src/app/page.tsx"),
    Path("src/app/page.tsx.bak-before-home-operator-component"),
    Path("src/app/page.tsx.bak-hero-final"),
    Path("src/app/page.tsx.bak-remove-contact-hero-final"),
]

COMPONENT = Path("src/components/sections/HomeOperatorBlock.tsx")
SECTOR_ROOT = Path("src/app/sectores")

BAD_TOKENS = [
    "Coordinemos su próxima operación internacional",
    "HomeCorporateFinal",
    "homeFinal",
    "finalCta",
    "styles.darkBand",
    "styles.finalCta",
    "t.bandTitle",
    "t.finalTitle",
    "data-sector-final-cta",
]

def find_section(text: str, needle: str) -> str:
    pos = text.find(needle)
    if pos == -1:
        return ""

    start = text.rfind("<section", 0, pos)
    if start == -1:
        return ""

    i = start
    depth = 0

    while i < len(text):
        open_pos = text.find("<section", i)
        close_pos = text.find("</section>", i)

        if close_pos == -1:
            return ""

        if open_pos != -1 and open_pos < close_pos:
            depth += 1
            i = open_pos + len("<section")
        else:
            depth -= 1
            i = close_pos + len("</section>")
            if depth == 0:
                return text[start:i]

    return ""

def remove_section_containing(text: str, token: str) -> str:
    while token in text:
        pos = text.find(token)
        start = text.rfind("<section", 0, pos)
        end = text.find("</section>", pos)

        if start == -1 or end == -1:
            # Si quedó un componente suelto.
            text = text.replace("<HomeOperatorBlock />", "")
            break

        end += len("</section>")
        text = text[:start].rstrip() + "\n\n" + text[end:].lstrip()

    return text

def module_imports(text: str):
    pattern = re.compile(r'import\s+([A-Za-z_$][\w$]*)\s+from\s+["\'](.+?\.module\.css)["\'];')
    return dict(pattern.findall(text))

def resolve_css_path(source_file: Path, import_path: str) -> str:
    if import_path.startswith("@/"):
        return import_path

    resolved = (source_file.parent / import_path).resolve()
    cwd = Path.cwd().resolve()

    try:
        rel = resolved.relative_to(cwd / "src")
        return "@/" + rel.as_posix()
    except Exception:
        return "@/app/page.module.css"

def insert_import(text: str, import_line: str) -> str:
    if import_line.strip() in text:
        return text

    imports = list(re.finditer(r'^import .+?;\s*$', text, re.M))
    if imports:
        pos = imports[-1].end()
        return text[:pos] + "\n" + import_line + "\n" + text[pos:]

    if text.startswith('"use client";'):
        pos = text.find("\n") + 1
        return text[:pos] + import_line + "\n" + text[pos:]

    return import_line + "\n" + text

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

source_file = None
source_text = ""
home_block = ""

for src in SOURCES:
    if not src.exists():
        continue

    txt = src.read_text(encoding="utf-8", errors="ignore")
    block = find_section(txt, TITLE_OK)

    if block:
        source_file = src
        source_text = txt
        home_block = block
        break

if not home_block:
    raise SystemExit("❌ No encontré el bloque exacto con 'Operaciones logísticas con visión sostenible' en HOME ni backups.")

print("✅ Bloque correcto encontrado en:", source_file)

css_imports = module_imports(source_text)
used_css_aliases = sorted({
    alias for alias in re.findall(r'\b([A-Za-z_$][\w$]*)\.', home_block)
    if alias in css_imports
})

imports = ['"use client";', ""]

if "<Image" in home_block:
    imports.append('import Image from "next/image";')

if "<Link" in home_block:
    imports.append('import Link from "next/link";')

if "CSSProperties" in home_block:
    imports.append('import type { CSSProperties } from "react";')

for alias in used_css_aliases:
    imports.append(f'import {alias} from "{resolve_css_path(source_file, css_imports[alias])}";')

used_vars = sorted(set(re.findall(r'\b([A-Za-z_$][\w$]*)\.map\s*\(', home_block)))
consts = []

for name in used_vars:
    c = extract_const(source_text, name)
    if c:
        consts.append(c)

component_code = "\n".join(imports).rstrip() + "\n\n"

if consts:
    component_code += "\n\n".join(consts) + "\n\n"

component_code += f'''export default function HomeOperatorBlock() {{
  return (
{home_block}
  );
}}
'''

COMPONENT.parent.mkdir(parents=True, exist_ok=True)

if COMPONENT.exists():
    shutil.copy2(COMPONENT, COMPONENT.with_suffix(COMPONENT.suffix + ".bak-wrong-final-block"))

COMPONENT.write_text(component_code, encoding="utf-8")
print("✅ HomeOperatorBlock sobrescrito con el bloque correcto.")

updated = []

for page in sorted(SECTOR_ROOT.glob("*/page.tsx")):
    text = page.read_text(encoding="utf-8", errors="ignore")
    original = text

    backup = page.with_suffix(page.suffix + ".bak-before-real-home-operator-only")
    if not backup.exists():
        shutil.copy2(page, backup)

    # Borrar todos los bloques incorrectos.
    for token in BAD_TOKENS:
        text = remove_section_containing(text, token)

    # Borrar cualquier bloque viejo correcto para no duplicar.
    text = remove_section_containing(text, TITLE_OK)
    text = text.replace("<HomeOperatorBlock />", "")

    text = insert_import(text, 'import HomeOperatorBlock from "@/components/sections/HomeOperatorBlock";')

    close_main = text.rfind("</main>")
    if close_main == -1:
        print("❌ No encontré </main> en:", page)
        continue

    text = text[:close_main].rstrip() + "\n\n        <HomeOperatorBlock />\n\n" + text[close_main:]

    if text != original:
        page.write_text(text, encoding="utf-8")
        updated.append(str(page))

print("✅ Sectores corregidos:")
for p in updated:
    print(" -", p)

print("\n✅ Ya no debería quedar HomeCorporateFinal en sectores.")
print("✅ HOME no fue tocada.")
