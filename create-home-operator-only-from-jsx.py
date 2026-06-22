from pathlib import Path
import re
import shutil

SOURCE = Path("src/components/sections/HomeCorporateFinal.tsx")
TARGET = Path("src/components/sections/HomeOperatorOnly.tsx")

JSX_TOKENS = [
    "t.ctaTitle",
    "t.ctaText",
    "t.ctaButton",
]

def find_matching(text: str, start: int, open_char: str, close_char: str) -> int:
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

        if ch == open_char:
            depth += 1
        elif ch == close_char:
            depth -= 1
            if depth == 0:
                return i

        i += 1

    return -1

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

def extract_section_from_return(text: str) -> str:
    return_pos = text.find("return (")
    if return_pos == -1:
        raise SystemExit("❌ No encontré return ( en HomeCorporateFinal.tsx")

    token_pos = -1
    used = ""

    for token in JSX_TOKENS:
        pos = text.find(token, return_pos)
        if pos != -1:
            token_pos = pos
            used = token
            break

    if token_pos == -1:
        print("❌ No encontré t.ctaTitle / t.ctaText / t.ctaButton dentro del JSX.")
        print("Corré esto y pegámelo:")
        print("grep -n \"ctaTitle\\|ctaText\\|ctaButton\" src/components/sections/HomeCorporateFinal.tsx")
        raise SystemExit(1)

    start = text.rfind("<section", 0, token_pos)
    if start == -1:
        raise SystemExit(f"❌ Encontré {used}, pero no encontré <section antes.")

    end = find_section_end(text, start)
    if end == -1:
        raise SystemExit("❌ No pude cerrar el </section> del bloque CTA.")

    print("✅ Sección JSX encontrada usando:", used)
    return text[start:end]

def find_function_bounds(text: str):
    m = re.search(r'export\s+default\s+function\s+HomeCorporateFinal\s*\([^)]*\)\s*\{', text)
    if not m:
        raise SystemExit("❌ No encontré export default function HomeCorporateFinal()")

    body_start = text.find("{", m.start())
    body_end = find_matching(text, body_start, "{", "}")

    if body_end == -1:
        raise SystemExit("❌ No pude cerrar la función HomeCorporateFinal.")

    return m.start(), body_start, body_end

if not SOURCE.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.tsx")

source = SOURCE.read_text(encoding="utf-8", errors="ignore")

section = extract_section_from_return(source)
func_start, body_start, body_end = find_function_bounds(source)

before_func = source[:func_start]
func_header = source[func_start:body_start + 1].replace(
    "HomeCorporateFinal",
    "HomeOperatorOnly",
    1,
)

body = source[body_start + 1:body_end]
return_pos = body.find("return (")

if return_pos == -1:
    raise SystemExit("❌ No encontré return dentro de la función.")

body_before_return = body[:return_pos].rstrip()

new_code = before_func.rstrip() + "\n\n"
new_code += func_header + "\n"
new_code += body_before_return + "\n\n"
new_code += "  return (\n"
new_code += section + "\n"
new_code += "  );\n"
new_code += "}\n"

# Evitar que el componente nuevo tenga nombre viejo en comentarios raros
new_code = new_code.replace("export default function HomeCorporateFinal", "export default function HomeOperatorOnly")

TARGET.parent.mkdir(parents=True, exist_ok=True)

if TARGET.exists():
    shutil.copy2(TARGET, TARGET.with_suffix(TARGET.suffix + ".bak-before-jsx-extract"))

TARGET.write_text(new_code, encoding="utf-8")

print("✅ Creado:", TARGET)
print("✅ Este componente usa el JSX real de HomeCorporateFinal, pero devuelve solo la sección CTA.")
