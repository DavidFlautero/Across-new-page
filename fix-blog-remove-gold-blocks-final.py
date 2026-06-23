from pathlib import Path
import re
import shutil

css_path = Path("src/app/blog/Blog.module.css")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/blog/Blog.module.css")

backup = css_path.with_suffix(css_path.suffix + ".bak-before-remove-gold-blocks-final")
if not backup.exists():
    shutil.copy2(css_path, backup)

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === BLOG REMOVE GOLD BLOCKS FINAL START === */"
end = "/* === BLOG REMOVE GOLD BLOCKS FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Quita overlays/bloques dorados que tapaban imágenes, posts y sidebar. */

.postCard::before,
.postCard::after,
.postBody::before,
.postBody::after,
.imageBox::before,
.sidebar::before,
.sidebar::after,
.titleBlock::before,
.titleBlock::after {{
  content: none !important;
  display: none !important;
  background: transparent !important;
  background-color: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}}

/* Mantiene solo overlay oscuro normal sobre imágenes */
.imageBox::after {{
  content: "" !important;
  display: block !important;
  position: absolute !important;
  inset: 0 !important;
  pointer-events: none !important;
  background: linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.30)) !important;
  border: 0 !important;
  box-shadow: none !important;
}}

/* Quita bloque dorado de CATEGORÍAS */
.sidebar h3 {{
  background: transparent !important;
  background-color: transparent !important;
  color: #07111d !important;
  box-shadow: none !important;
  border: 0 !important;
  padding-left: 0 !important;
}}

.sidebar h3::before,
.sidebar h3::after {{
  content: none !important;
  display: none !important;
  background: transparent !important;
}}

/* Quita bloque dorado del + INFO */
.postBody span {{
  background: transparent !important;
  background-color: transparent !important;
  color: #173247 !important;
  border: 0 !important;
  box-shadow: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}}

.postBody span::before,
.postBody span::after {{
  background: transparent !important;
  background-color: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}}

/* Botones de categorías limpios */
.sidebar button::before,
.sidebar button::after,
.sidebar .active::before,
.sidebar .active::after {{
  content: none !important;
  display: none !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Blog limpio: quitados bloques dorados de imágenes, categorías y posts")
print("✅ Archivo:", css_path)
print("✅ Backup:", backup)
