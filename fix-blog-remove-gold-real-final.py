from pathlib import Path
import re
import shutil

paths = list(Path("src/app").glob("**/Blog.module.css"))

if not paths:
    raise SystemExit("❌ No encontré Blog.module.css en src/app")

for p in paths:
    backup = p.with_suffix(p.suffix + ".bak-before-remove-gold-real-final")
    if not backup.exists():
        shutil.copy2(p, backup)

    css = p.read_text(encoding="utf-8", errors="ignore")

    # 1) Reemplazo real de dorado/champagne en el módulo del blog
    css = css.replace("#d6c08d", "#173247")
    css = css.replace("#D6C08D", "#173247")

    # rgba(214,192,141,.xx) -> azul corporativo suave
    css = re.sub(
        r"rgba\(\s*214\s*,\s*192\s*,\s*141\s*,\s*([^)]+)\)",
        r"rgba(23,50,71,\1)",
        css
    )

    # 2) Quitar el punto decorativo del hero y del título "Nuestras Novedades"
    final_start = "/* === BLOG NO GOLD NO DOT REAL FINAL START === */"
    final_end = "/* === BLOG NO GOLD NO DOT REAL FINAL END === */"

    css = re.sub(re.escape(final_start) + r"[\s\S]*?" + re.escape(final_end), "", css).rstrip()

    patch = """
/* === BLOG NO GOLD NO DOT REAL FINAL START === */

/* Quita el punto/acento decorativo */
.heroContent h1::after,
.titleBlock h2::after {
  content: none !important;
  display: none !important;
  color: transparent !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

/* Quita líneas doradas debajo de títulos */
.titleBlock div {
  background: linear-gradient(90deg, rgba(23,50,71,.32), rgba(8,11,16,.12), transparent) !important;
}

/* Ningún texto dorado en blog */
.heroContent span,
.heroContent > span,
.titleBlock span,
.postBody time,
.postBody span,
.postBody small,
.postCard small {
  color: #173247 !important;
  -webkit-text-fill-color: #173247 !important;
}

/* En hero oscuro, el eyebrow queda blanco/gris, no dorado */
.hero .heroContent span,
.hero .heroContent > span {
  color: rgba(255,255,255,.78) !important;
  -webkit-text-fill-color: rgba(255,255,255,.78) !important;
}

/* Botón + info sin dorado */
.postBody span {
  background: transparent !important;
  background-color: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

/* Hover y sidebar sin dorado */
.postCard:hover {
  border-color: rgba(23,50,71,.30) !important;
  box-shadow: 0 28px 70px rgba(7,17,29,.15) !important;
}

.sidebar button:hover,
.sidebar .active,
.sidebar button.active {
  border-color: rgba(23,50,71,.36) !important;
}

/* Quita cualquier pseudo-elemento dorado remanente */
.heroContent span::before,
.heroContent span::after,
.titleBlock span::before,
.titleBlock span::after,
.postBody span::before,
.postBody span::after,
.sidebar button::before,
.sidebar button::after,
.sidebar .active::before,
.sidebar .active::after {
  content: none !important;
  display: none !important;
  background: transparent !important;
  border: 0 !important;
  box-shadow: none !important;
}

/* === BLOG NO GOLD NO DOT REAL FINAL END === */
"""

    css += "\n\n" + patch.strip() + "\n"
    p.write_text(css, encoding="utf-8")

    print("✅ Dorado eliminado en:", p)
    print("✅ Backup:", backup)

print("----- BUSCAR DORADO RESTANTE EN BLOG -----")
for p in paths:
    css = p.read_text(encoding="utf-8", errors="ignore")
    for term in ["d6c08d", "214,192,141", "214, 192, 141", 'content: "."']:
        if term in css:
            print("⚠️ Todavía aparece", term, "en", p)
