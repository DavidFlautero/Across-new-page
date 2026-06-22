from pathlib import Path
import re
import shutil

ROOT = Path("src/app/sectores")
IMPORT_LINE = 'import HomeOperatorOnly from "@/components/sections/HomeOperatorOnly";'
CALL = "<HomeOperatorOnly />"

def find_section_end(text: str, start: int) -> int:
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

def remove_section_containing(text: str, token: str) -> str:
    while token in text:
        pos = text.find(token)
        start = text.rfind("<section", 0, pos)
        if start == -1:
            break

        end = find_section_end(text, start)
        if end == -1:
            break

        text = text[:start].rstrip() + "\n\n" + text[end:].lstrip()

    return text

def insert_import(text: str) -> str:
    text = re.sub(r'^import HomeOperatorOnly .+?;\s*$', "", text, flags=re.M)

    imports = list(re.finditer(r'^import .+?;\s*$', text, re.M))
    if not imports:
        return IMPORT_LINE + "\n" + text

    pos = imports[-1].end()
    return text[:pos] + "\n" + IMPORT_LINE + "\n" + text[pos:]

def insert_after_process(text: str) -> str:
    text = text.replace("<HomeOperatorOnly />", "")
    text = text.replace("<HomeCorporateFinal />", "")
    text = text.replace("<HomeOperatorBlock />", "")
    text = text.replace("<HomeOperatorShared />", "")

    process_pos = text.find("className={styles.process}")
    if process_pos != -1:
        section_start = text.rfind("<section", 0, process_pos)
        section_end = find_section_end(text, section_start)

        if section_start != -1 and section_end != -1:
            return (
                text[:section_end].rstrip()
                + f"\n\n        {CALL}\n\n"
                + text[section_end:].lstrip()
            )

    close_main = text.rfind("</main>")
    if close_main == -1:
        raise RuntimeError("No encontré process ni </main>")

    return text[:close_main].rstrip() + f"\n\n        {CALL}\n\n" + text[close_main:]

updated = []

for page in sorted(ROOT.glob("*/page.tsx")):
    text = page.read_text(encoding="utf-8", errors="ignore")
    original = text

    backup = page.with_suffix(page.suffix + ".bak-before-real-home-block-all")
    if not backup.exists():
        shutil.copy2(page, backup)

    text = re.sub(r'^import HomeCorporateFinal .+?;\s*$', "", text, flags=re.M)
    text = re.sub(r'^import HomeOperatorBlock .+?;\s*$', "", text, flags=re.M)
    text = re.sub(r'^import HomeOperatorShared .+?;\s*$', "", text, flags=re.M)
    text = re.sub(r'^import HomeOperatorOnly .+?;\s*$', "", text, flags=re.M)

    # Sacamos las secciones viejas que estaban reemplazando mal al bloque HOME.
    text = remove_section_containing(text, "styles.darkBand")
    text = remove_section_containing(text, "styles.finalCta")
    text = remove_section_containing(text, "data-sector-final-cta")

    text = insert_import(text)
    text = insert_after_process(text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    if text != original:
        page.write_text(text, encoding="utf-8")
        updated.append(str(page))

print("✅ Bloque REAL de HOME colocado en sectores:")
for p in updated:
    print(" -", p)
