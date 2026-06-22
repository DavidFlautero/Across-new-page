from pathlib import Path
import re
import shutil

SOURCE = Path("src/components/sections/HomeCorporateFinal.tsx")
TARGET = Path("src/components/sections/HomeOperatorOnly.tsx")

def find_matching_brace(text: str, start: int) -> int:
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

        if ch == "{":
            depth += 1
        elif ch == "}":
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

if not SOURCE.exists():
    raise SystemExit("❌ No existe src/components/sections/HomeCorporateFinal.tsx")

source = SOURCE.read_text(encoding="utf-8", errors="ignore")

m = re.search(r'export\s+default\s+function\s+HomeCorporateFinal\s*\([^)]*\)\s*\{', source)
if not m:
    raise SystemExit("❌ No encontré export default function HomeCorporateFinal")

func_start = m.start()
brace_start = source.find("{", m.start())
brace_end = find_matching_brace(source, brace_start)

if brace_end == -1:
    raise SystemExit("❌ No pude cerrar la función HomeCorporateFinal")

func_body = source[brace_start + 1:brace_end]

returns = list(re.finditer(r'\breturn\s*\(', func_body))
if not returns:
    raise SystemExit("❌ No encontré return ( dentro de HomeCorporateFinal")

# El return real del JSX principal suele ser el último.
return_match = returns[-1]
body_before_return = func_body[:return_match.start()].rstrip()

jsx_start_global = brace_start + 1 + return_match.start()

token_pos = source.find("t.ctaTitle", jsx_start_global)
if token_pos == -1:
    print("❌ No encontré t.ctaTitle dentro del JSX.")
    print("Mostrame esto:")
    print('grep -n "t.cta\\|ctaTitle\\|ctaText\\|ctaButton\\|section" src/components/sections/HomeCorporateFinal.tsx')
    raise SystemExit(1)

section_start = source.rfind("<section", jsx_start_global, token_pos)
if section_start == -1:
    raise SystemExit("❌ Encontré t.ctaTitle pero no encontré <section antes.")

section_end = find_section_end(source, section_start)
if section_end == -1:
    raise SystemExit("❌ No pude cerrar el </section> del CTA real.")

section = source[section_start:section_end]

before_func = source[:func_start].rstrip()

new_code = before_func + "\n\n"
new_code += "export default function HomeOperatorOnly() {\n"
new_code += body_before_return + "\n\n"
new_code += "  return (\n"
new_code += section + "\n"
new_code += "  );\n"
new_code += "}\n"

TARGET.parent.mkdir(parents=True, exist_ok=True)

if TARGET.exists():
    shutil.copy2(TARGET, TARGET.with_suffix(TARGET.suffix + ".bak-before-real-home-block"))

TARGET.write_text(new_code, encoding="utf-8")

print("✅ Creado bloque REAL:", TARGET)
print("✅ Extraído desde HomeCorporateFinal.tsx usando t.ctaTitle")
print("✅ Usa las MISMAS clases/CSS/imagen del bloque HOME")
