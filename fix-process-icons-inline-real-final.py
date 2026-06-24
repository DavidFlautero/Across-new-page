from pathlib import Path
import re
import shutil

tsx_targets = [
    Path("src/app/servicios/[slug]/page.tsx"),
    Path("src/app/servicios/transporte-aereo/page.tsx"),
    Path("src/app/servicios/transporte-maritimo/page.tsx"),
    Path("src/app/servicios/transporte-terrestre/page.tsx"),
]

tsx_targets = [p for p in tsx_targets if p.exists()]

if not tsx_targets:
    tsx_targets = list(Path("src/app/servicios").glob("**/page.tsx"))

css_targets = [
    Path("src/app/servicios/[slug]/Servicio.module.css"),
    Path("src/app/servicios/transporte-aereo/TransporteAereo.module.css"),
    Path("src/app/servicios/transporte-maritimo/Servicio.module.css"),
    Path("src/app/servicios/transporte-terrestre/Servicio.module.css"),
]

css_targets = [p for p in css_targets if p.exists()]

if not css_targets:
    css_targets = list(Path("src/app/servicios").glob("**/*.module.css"))

# -------------------------------------------------------
# 1) JSX: mover icono dentro del h3 y dejar de depender del <i>
# -------------------------------------------------------
changed_tsx = 0

for p in tsx_targets:
    s = p.read_text(encoding="utf-8", errors="ignore")

    if "t.process.map" not in s and "process.map" not in s:
        continue

    backup = p.with_suffix(p.suffix + ".bak-before-inline-process-icons-final")
    if not backup.exists():
        shutil.copy2(p, backup)

    old = '''                  <strong>{index + 1}</strong>
                  <i>
                    <Icon name={icons[index]} />
                  </i>
                  <h3>{title}</h3>
                  <p>{text}</p>'''

    new = '''                  <strong>{index + 1}</strong>
                  <h3>
                    <span className={styles.processIconInline} aria-hidden="true">
                      <Icon name={icons[index]} />
                    </span>
                    <span className={styles.processTitleText}>{title}</span>
                  </h3>
                  <p>{text}</p>'''

    if old in s:
        s = s.replace(old, new)
        changed_tsx += 1
    else:
        # fallback más tolerante
        s2 = re.sub(
            r'''<strong>\{index \+ 1\}</strong>\s*
\s*<i>\s*
\s*<Icon name=\{icons\[index\]\} />\s*
\s*</i>\s*
\s*<h3>\{title\}</h3>\s*
\s*<p>\{text\}</p>''',
            '''<strong>{index + 1}</strong>
                  <h3>
                    <span className={styles.processIconInline} aria-hidden="true">
                      <Icon name={icons[index]} />
                    </span>
                    <span className={styles.processTitleText}>{title}</span>
                  </h3>
                  <p>{text}</p>''',
            s,
            flags=re.S,
        )
        if s2 != s:
            s = s2
            changed_tsx += 1

    p.write_text(s, encoding="utf-8")
    print("✅ JSX proceso corregido:", p)

# -------------------------------------------------------
# 2) CSS: matar pseudo iconos viejos y estilizar el nuevo span
# -------------------------------------------------------
patch_start = "/* === INLINE PROCESS ICONS REAL FINAL START === */"
patch_end = "/* === INLINE PROCESS ICONS REAL FINAL END === */"

patch = f"""
{patch_start}

/* Ya no usamos .processGrid i ni h3::before para los iconos */
.processGrid i,
.processGrid article i {{
  display: none !important;
}}

.processGrid h3::before,
.processGrid article h3::before,
.process article h3::before {{
  content: none !important;
  display: none !important;
  background: none !important;
  border: 0 !important;
  box-shadow: none !important;
}}

/* Layout del proceso: número + título con icono real */
.processGrid article {{
  display: grid !important;
  grid-template-columns: 44px minmax(0, 1fr) !important;
  column-gap: .85rem !important;
  align-items: start !important;
}}

.processGrid article strong {{
  grid-column: 1 !important;
  grid-row: 1 / span 2 !important;
  display: block !important;
  width: auto !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  font-size: 1rem !important;
  line-height: 1 !important;
  font-weight: 950 !important;
}}

.processGrid article h3 {{
  grid-column: 2 !important;
  display: flex !important;
  align-items: center !important;
  gap: .55rem !important;
  margin: 0 !important;
  min-width: 0 !important;
  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
}}

.processIconInline {{
  width: 22px !important;
  height: 22px !important;
  min-width: 22px !important;
  min-height: 22px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 999px !important;
  color: #123f59 !important;
  -webkit-text-fill-color: #123f59 !important;
  background: rgba(18, 63, 89, .055) !important;
  border: 1px solid rgba(18, 63, 89, .24) !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.80) !important;
  flex: 0 0 22px !important;
}}

.processIconInline svg {{
  display: block !important;
  width: 13px !important;
  height: 13px !important;
  min-width: 13px !important;
  min-height: 13px !important;
  opacity: 1 !important;
  visibility: visible !important;
  color: #123f59 !important;
  stroke: #123f59 !important;
  stroke-width: 2 !important;
}}

.processTitleText {{
  display: inline !important;
  min-width: 0 !important;
}}

.processGrid article p {{
  grid-column: 2 !important;
  margin-top: .55rem !important;
}}

@media (max-width: 900px) {{
  .processGrid {{
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }}

  .processGrid article {{
    grid-template-columns: 42px minmax(0, 1fr) !important;
    padding: 1.05rem 0 !important;
    border-bottom: 1px solid rgba(8, 11, 16, .10) !important;
  }}

  .processIconInline {{
    width: 22px !important;
    height: 22px !important;
    min-width: 22px !important;
    min-height: 22px !important;
  }}
}}

{patch_end}
"""

changed_css = 0

for p in css_targets:
    css = p.read_text(encoding="utf-8", errors="ignore")

    if "processGrid" not in css:
        continue

    backup = p.with_suffix(p.suffix + ".bak-before-inline-process-icons-final")
    if not backup.exists():
        shutil.copy2(p, backup)

    css = re.sub(re.escape(patch_start) + r"[\s\S]*?" + re.escape(patch_end), "", css).rstrip()
    css += "\n\n" + patch.strip() + "\n"

    p.write_text(css, encoding="utf-8")
    changed_css += 1
    print("✅ CSS iconos inline aplicado:", p)

print("✅ TSX modificados:", changed_tsx)
print("✅ CSS modificados:", changed_css)
