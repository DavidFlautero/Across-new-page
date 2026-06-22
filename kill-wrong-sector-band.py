from pathlib import Path
import shutil
import re

ROOT = Path("src/app/sectores")

BAD_CLASS_PATTERNS = [
    "styles.darkBand",
    "styles.finalCta",
]

BAD_TEXTS = [
    "Logística sanitaria diseñada",
    "Logística renovable diseñada",
    "Logística alimentaria diseñada",
    "Logística automotriz diseñada",
    "productos que no pueden perder control",
    "proyectos de alta exigencia",
    "Coordinemos su próxima operación internacional",
]

def find_matching_section(text: str, start: int):
    """
    start debe estar parado en '<section'.
    Devuelve índice final después del </section> correspondiente.
    """
    i = start
    depth = 0
    quote = None
    esc = False

    while i < len(text):
        if quote:
            ch = text[i]
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == quote:
                quote = None
            i += 1
            continue

        ch = text[i]

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

def remove_sections_containing(text: str, token: str):
    removed = 0

    while token in text:
        pos = text.find(token)
        start = text.rfind("<section", 0, pos)

        if start == -1:
            # Si no era section, solo quitamos líneas/componentes sueltos.
            text = text.replace("<HomeOperatorBlock />", "")
            break

        end = find_matching_section(text, start)

        if end == -1:
            raise RuntimeError(f"No pude cerrar section para token: {token}")

        text = text[:start].rstrip() + "\n\n" + text[end:].lstrip()
        removed += 1

    return text, removed

changed = []

for page in sorted(ROOT.glob("*/page.tsx")):
    text = page.read_text(encoding="utf-8", errors="ignore")
    original = text
    removed_total = 0

    backup = page.with_suffix(page.suffix + ".bak-kill-wrong-darkband")
    if not backup.exists():
        shutil.copy2(page, backup)

    for token in BAD_CLASS_PATTERNS + BAD_TEXTS:
        text, removed = remove_sections_containing(text, token)
        removed_total += removed

    # Limpia componentes mal puestos si quedaron sueltos.
    text = re.sub(r"\n\s*<HomeOperatorBlock\s*/>\s*\n", "\n", text)

    # Si el import quedó sin uso, lo quitamos.
    if "HomeOperatorBlock" not in text.replace('import HomeOperatorBlock from "@/components/sections/HomeOperatorBlock";', ""):
        text = text.replace('import HomeOperatorBlock from "@/components/sections/HomeOperatorBlock";\n', "")
        text = text.replace('import HomeOperatorBlock from "@/components/sections/HomeOperatorBlock";\r\n', "")

    if text != original:
        page.write_text(text, encoding="utf-8")
        changed.append((str(page), removed_total))

print("✅ Bloques incorrectos eliminados:")
for file, count in changed:
    print(f" - {file}: {count} section(s) borradas")

print("\nVerificación inmediata:")
