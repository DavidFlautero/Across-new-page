from pathlib import Path
import re
import shutil

HOME = Path("src/app/page.tsx")
COMPONENT = Path("src/components/sections/HomeOperatorBlock.tsx")
SECTOR_ROOT = Path("src/app/sectores")
NEEDLE = "Operaciones logísticas con visión sostenible"

def find_section_containing(text: str, needle: str) -> str:
    pos = text.find(needle)
    if pos == -1:
        raise SystemExit(f"❌ No encontré en HOME el bloque con: {needle}")

    start = text.rfind("<section", 0, pos)
    if start == -1:
        raise SystemExit("❌ No encontré <section> antes del bloque en HOME")

    i = start
    depth = 0

    while i < len(text):
        open_pos = text.find("<section", i)
        close_pos = text.find("</section>", i)

        if close_pos == -1:
            raise SystemExit("❌ No encontré cierre </section>")

        if open_pos != -1 and open_pos < close_pos:
            depth += 1
            i = open_pos + len("<section")
        else:
            depth -= 1
            i = close_pos + len("</section>")
            if depth == 0:
                return text[start:i]

    raise SystemExit("❌ No pude extraer el bloque HOME")

def insert_import(text: str, line: str) -> str:
    if line.strip() in text:
        return text

    imports = list(re.finditer(r'^import .+?;\s*$', text, re.M))
    if imports:
        pos = imports[-1].end()
        return text[:pos] + "\n" + line + "\n" + text[pos:]

    if text.startswith('"use client";'):
        pos = text.find("\n") + 1
        return text[:pos] + line + "\n" + text[pos:]

    return line + "\n" + text

def remove_section_containing(text: str, token: str) -> str:
    while token in text:
        pos = text.find(token)
        start = text.rfind("<section", 0, pos)
        end = text.find("</section>", pos)

        if start == -1 or end == -1:
            break

        end += len("</section>")
        text = text[:start].rstrip() + "\n\n" + text[end:].lstrip()

    return text

def module_imports(text: str):
    out = {}
    pattern = re.compile(r'import\s+([A-Za-z_$][\w$]*)\s+from\s+["\'](.+?\.module\.css)["\'];')
    for alias, path in pattern.findall(text):
        out[alias] = path
    return out

def css_path_to_alias(path: str) -> str:
    if path.startswith("@/"):
        return path

    # HOME vive en src/app/page.tsx
    resolved = (Path("src/app") / path).resolve()
    cwd = Path.cwd().resolve()

    try:
        rel = resolved.relative_to(cwd / "src")
        return "@/" + rel.as_posix()
    except Exception:
        return "@/app/page.module.css"

def extract_const(text: str, name: str) -> str | None:
    m = re.search(rf'\bconst\s+{re.escape(name)}\b', text)
    if not m:
        return None

    i = m.start()
    depth = 0
    quote = None
    escape = False

    while i < len(text):
        ch = text[i]

        if quote:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
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

    return None

home_text = HOME.read_text(encoding="utf-8")
home_block = find_section_containing(home_text, NEEDLE)

# Detectar imports CSS usados por el bloque HOME.
css_imports = module_imports(home_text)
used_css_aliases = sorted({a for a in re.findall(r'\b([A-Za-z_$][\w$]*)\.', home_block) if a in css_imports})

component_imports = ['"use client";', ""]

if "<Image" in home_block:
    component_imports.append('import Image from "next/image";')

if "<Link" in home_block:
    component_imports.append('import Link from "next/link";')

if "CSSProperties" in home_block:
    component_imports.append('import type { CSSProperties } from "react";')

for alias in used_css_aliases:
    component_imports.append(f'import {alias} from "{css_path_to_alias(css_imports[alias])}";')

# Detectar consts usados por .map dentro del bloque.
used_vars = sorted(set(re.findall(r'\{?\s*([A-Za-z_$][\w$]*)\.map\s*\(', home_block)))
consts = []

for name in used_vars:
    c = extract_const(home_text, name)
    if c and c not in consts:
        consts.append(c)

COMPONENT.parent.mkdir(parents=True, exist_ok=True)

component_code = "\n".join(component_imports).rstrip() + "\n\n"
if consts:
    component_code += "\n\n".join(consts) + "\n\n"

component_code += f'''export default function HomeOperatorBlock() {{
  return (
{home_block}
  );
}}
'''

if COMPONENT.exists():
    shutil.copy2(COMPONENT, COMPONENT.with_suffix(COMPONENT.suffix + ".bak-home-operator"))

COMPONENT.write_text(component_code, encoding="utf-8")
print("✅ Componente creado con el bloque exacto de HOME:", COMPONENT)

# Reemplazar en HOME el bloque por el componente compartido.
home_backup = HOME.with_suffix(HOME.suffix + ".bak-before-home-operator-component")
if not home_backup.exists():
    shutil.copy2(HOME, home_backup)

home_text = HOME.read_text(encoding="utf-8")
home_section = find_section_containing(home_text, NEEDLE)

home_text = home_text.replace(home_section, "<HomeOperatorBlock />", 1)
home_text = insert_import(home_text, 'import HomeOperatorBlock from "@/components/sections/HomeOperatorBlock";')
HOME.write_text(home_text, encoding="utf-8")
print("✅ HOME ahora usa el mismo componente compartido.")

# Poner el mismo componente en todos los sectores y borrar bloques malos.
updated = []

for page in sorted(SECTOR_ROOT.glob("*/page.tsx")):
    text = page.read_text(encoding="utf-8", errors="ignore")
    original = text

    backup = page.with_suffix(page.suffix + ".bak-before-shared-home-operator")
    if not backup.exists():
        shutil.copy2(page, backup)

    # Borrar bloques incorrectos/inventados.
    for token in [
        "styles.darkBand",
        "styles.finalCta",
        "data-sector-final-cta",
        "t.bandTitle",
        "t.finalTitle",
        NEEDLE,
        "<HomeOperatorBlock />",
    ]:
        text = remove_section_containing(text, token)

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

print("✅ Sectores actualizados con el MISMO bloque compartido:")
for p in updated:
    print(" -", p)

print("\nListo: ya no hay recreación. HOME y sectores usan el mismo componente.")
