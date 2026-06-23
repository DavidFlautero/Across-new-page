from pathlib import Path
import re
import shutil

page_path = Path("src/app/contacto/page.tsx")
css_path = Path("src/app/contacto/Contacto.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/contacto/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/contacto/Contacto.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-contact-hero-copy")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-contact-hero-copy")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Agregar textos del hero al copy por idioma si no existen
if "heroTitle:" not in tsx:
    tsx = tsx.replace(
'''    badge: "CONTACTO",
    formTitle: "Formulario de contacto",''',
'''    badge: "CONTACTO",
    heroTitle: "Coordinemos su próxima operación logística.",
    heroText: "Nuestro equipo le ayudará a identificar la solución adecuada para su carga, ruta o necesidad operativa.",
    formTitle: "Formulario de contacto",''',
        1
    )

    tsx = tsx.replace(
'''    badge: "CONTACT",
    formTitle: "Contact form",''',
'''    badge: "CONTACT",
    heroTitle: "Let’s coordinate your next logistics operation.",
    heroText: "Our team will help identify the right solution for your cargo, route or operational need.",
    formTitle: "Contact form",''',
        1
    )

    tsx = tsx.replace(
'''    badge: "联系",
    formTitle: "联系表单",''',
'''    badge: "联系",
    heroTitle: "让我们协调您的下一项物流操作。",
    heroText: "我们的团队将帮助您为货物、路线或运营需求找到合适方案。",
    formTitle: "联系表单",''',
        1
    )

# 2) Reemplazar hero vacío por hero con contenido
old = '<section className={styles.contactHero} aria-label="Across Logistics" />'
new = '''<section className={styles.contactHero} aria-label="Across Logistics">
        <div className={styles.contactHeroCopy}>
          <span>{t.badge}</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
        </div>
      </section>'''

if old in tsx:
    tsx = tsx.replace(old, new, 1)
elif "contactHeroCopy" in tsx:
    print("ℹ️ El hero ya tenía contenido")
else:
    raise SystemExit("❌ No encontré el hero vacío exacto en page.tsx")

page_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === CONTACTO HERO COPY FINAL START === */"
end = "/* === CONTACTO HERO COPY FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Texto premium sobre el hero de contacto */
.contactHero {{
  display: flex !important;
  align-items: flex-end !important;
  padding: clamp(6rem, 9vw, 9rem) 6vw clamp(3rem, 5vw, 5rem) !important;
  isolation: isolate !important;
}}

.contactHero::before {{
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 0 !important;
  pointer-events: none !important;
  background:
    linear-gradient(90deg, rgba(8,11,16,.74) 0%, rgba(8,11,16,.48) 44%, rgba(8,11,16,.16) 100%),
    linear-gradient(180deg, rgba(8,11,16,.12) 0%, rgba(8,11,16,.54) 100%) !important;
}}

.contactHeroCopy {{
  position: relative !important;
  z-index: 2 !important;
  width: min(620px, 100%) !important;
  color: #fff !important;
}}

.contactHeroCopy span {{
  display: inline-flex !important;
  margin-bottom: .9rem !important;
  color: #d6c08d !important;
  font-size: .78rem !important;
  font-weight: 950 !important;
  letter-spacing: .18em !important;
  text-transform: uppercase !important;
}}

.contactHeroCopy h1 {{
  margin: 0 !important;
  color: #fff !important;
  font-size: clamp(2.45rem, 5vw, 4.8rem) !important;
  line-height: .94 !important;
  letter-spacing: -.06em !important;
  font-weight: 950 !important;
  text-shadow: 0 18px 46px rgba(0,0,0,.38) !important;
}}

.contactHeroCopy p {{
  max-width: 520px !important;
  margin: 1.15rem 0 0 !important;
  color: rgba(255,255,255,.84) !important;
  font-size: clamp(.95rem, 1.25vw, 1.08rem) !important;
  line-height: 1.62 !important;
}}

@media (max-width: 760px) {{
  .contactHero {{
    min-height: 360px !important;
    padding: 6.5rem 22px 2.4rem !important;
    align-items: flex-end !important;
  }}

  .contactHeroCopy {{
    width: min(100%, 330px) !important;
  }}

  .contactHeroCopy h1 {{
    font-size: clamp(2rem, 9.5vw, 2.85rem) !important;
    line-height: .96 !important;
  }}

  .contactHeroCopy p {{
    font-size: .88rem !important;
    line-height: 1.5 !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Hero de contacto con texto agregado")
print("✅ Page backup:", page_backup)
print("✅ CSS backup:", css_backup)
