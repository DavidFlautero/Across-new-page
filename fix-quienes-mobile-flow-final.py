from pathlib import Path
import re
import shutil

css_path = Path("src/app/empresa/Empresa.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/Empresa.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-quienes-mobile-flow-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

# Limpiar reglas anteriores que podían estar peleando con esta
markers_to_remove = [
    ("/* === QUIENES HERO MOBILE FLOW FINAL START === */", "/* === QUIENES HERO MOBILE FLOW FINAL END === */"),
    ("/* === QUIENES HERO BUTTON SAFE BOTTOM START === */", "/* === QUIENES HERO BUTTON SAFE BOTTOM END === */"),
    ("/* === QUIENES HERO RESPONSIVE TITLE FINAL START === */", "/* === QUIENES HERO RESPONSIVE TITLE FINAL END === */"),
]

for start, end in markers_to_remove:
    css = re.sub(
        re.escape(start) + r"[\s\S]*?" + re.escape(end),
        "",
        css,
        flags=re.M
    ).rstrip()

start = "/* === QUIENES HERO MOBILE FLOW FINAL START === */"
end = "/* === QUIENES HERO MOBILE FLOW FINAL END === */"

patch = f"""
{start}
/* Mobile chico: sube volanta, título, texto y botón juntos.
   Mantiene el orden visual y evita que el botón toque certificaciones. */
@media (max-width: 430px) and (min-height: 600px) {{
  :global(section[data-quienes-hero="true"]) {{
    padding-bottom: 6.9rem !important;
  }}

  :global(section[data-quienes-hero="true"] [class*="eyebrow"]),
  :global(section[data-quienes-hero="true"] h1),
  :global(section[data-quienes-hero="true"] h1 + p),
  :global(section[data-quienes-hero="true"] [class*="actions"]) {{
    transform: translateY(-38px) !important;
    position: relative !important;
  }}

  :global(section[data-quienes-hero="true"] [class*="eyebrow"]) {{
    display: inline-block !important;
    z-index: 31 !important;
    margin-bottom: .75rem !important;
  }}

  :global(section[data-quienes-hero="true"] h1) {{
    z-index: 30 !important;
    margin-bottom: 1rem !important;
  }}

  :global(section[data-quienes-hero="true"] h1 + p) {{
    z-index: 30 !important;
    margin-bottom: 1.45rem !important;
  }}

  :global(section[data-quienes-hero="true"] [class*="actions"]) {{
    z-index: 32 !important;
    margin-top: 0 !important;
    margin-bottom: 3.6rem !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Fix real aplicado: Quiénes somos mobile flow final")
print("✅ Volanta + título + texto + botón suben juntos")
print("✅ Backup:", backup)
