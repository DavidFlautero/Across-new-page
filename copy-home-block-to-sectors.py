from pathlib import Path
import shutil

HOME = Path("src/app/page.tsx")
SECTORS = [
    Path("src/app/sectores/automocion/page.tsx"),
    Path("src/app/sectores/energias-renovables/page.tsx"),
    Path("src/app/sectores/alimentacion-bebidas/page.tsx"),
]

TITLE = "Operaciones logísticas con visión sostenible"

def find_section_containing(text: str, needle: str):
    pos = text.find(needle)
    if pos == -1:
        raise SystemExit(f"No encontré el texto en HOME: {needle}")

    start = text.rfind("<section", 0, pos)
    if start == -1:
        raise SystemExit("No encontré apertura <section> antes del bloque HOME")

    i = start
    depth = 0

    while i < len(text):
        next_open = text.find("<section", i)
        next_close = text.find("</section>", i)

        if next_close == -1:
            raise SystemExit("No encontré cierre </section> del bloque HOME")

        if next_open != -1 and next_open < next_close:
            depth += 1
            i = next_open + len("<section")
        else:
            depth -= 1
            i = next_close + len("</section>")
            if depth == 0:
                return text[start:i]

    raise SystemExit("No pude extraer el bloque HOME")

def remove_section_by_class(text: str, class_token: str):
    while class_token in text:
        pos = text.find(class_token)
        start = text.rfind("<section", 0, pos)
        end = text.find("</section>", pos)

        if start == -1 or end == -1:
            break

        end += len("</section>")
        text = text[:start].rstrip() + "\n\n" + text[end:].lstrip()

    return text

home_text = HOME.read_text(encoding="utf-8")
home_block = find_section_containing(home_text, TITLE)

print("✅ Bloque HOME extraído:")
print(home_block[:300].replace("\n", " ") + "...")

for page in SECTORS:
    if not page.exists():
        print("⚠️ No existe:", page)
        continue

    text = page.read_text(encoding="utf-8")
    original = text

    backup = page.with_suffix(page.suffix + ".bak-before-copy-home-block")
    if not backup.exists():
        shutil.copy2(page, backup)

    # Sacar el bloque genérico malo que insertamos.
    text = remove_section_by_class(text, "styles.darkBand")
    text = remove_section_by_class(text, "styles.finalCta")

    # Evitar duplicar el bloque HOME si ya quedó.
    if TITLE in text:
        print("ℹ️ Ya tiene bloque HOME:", page)
        page.write_text(text, encoding="utf-8")
        continue

    # Insertar el bloque exacto antes del cierre del main.
    close_main = text.rfind("</main>")
    if close_main == -1:
        print("❌ No encontré </main> en:", page)
        continue

    text = text[:close_main].rstrip() + "\n\n" + home_block + "\n\n" + text[close_main:]

    page.write_text(text, encoding="utf-8")
    print("✅ Bloque HOME copiado en:", page)

print("\nListo. HOME no fue tocada.")
