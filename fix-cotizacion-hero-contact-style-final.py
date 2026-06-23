from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-cotizacion-hero-contact-style")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-cotizacion-hero-contact-style")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# Textos ES
tsx = tsx.replace(
    'heroBadge: "Cotizador Express",',
    'heroBadge: "Cotización",'
)

tsx = tsx.replace(
    'heroTitle: "Configure su operación logística con precisión.",',
    'heroTitle: "Solicite una propuesta logística ajustada a su operación.",'
)

tsx = tsx.replace(
    '''heroText:
      "Complete los datos de su requerimiento y nuestro equipo preparará una propuesta ajustada a su carga, destino, urgencia y tipo de operación.",''',
    '''heroText:
      "Complete sus datos y un operador especializado se contactará con usted para analizar su carga, destino y requerimiento operativo.",'''
)

# Textos EN
tsx = tsx.replace(
    'heroTitle: "Configure your logistics operation with precision.",',
    'heroTitle: "Request a logistics proposal tailored to your operation.",'
)

tsx = tsx.replace(
    '''heroText:
      "Complete your requirements and our team will prepare a proposal aligned with your cargo, destination, urgency and operation type.",''',
    '''heroText:
      "Complete your details and a specialized operator will contact you to review your cargo, destination and operational requirements.",'''
)

# Textos ZH
tsx = tsx.replace(
    'heroTitle: "精准配置您的物流操作。",',
    'heroTitle: "申请适合您业务的物流方案。",'
)

tsx = tsx.replace(
    '''heroText:
      "请填写您的需求，我们的团队将根据货物、目的地、时效和操作类型准备定制方案。",''',
    '''heroText:
      "请填写您的信息，我们的专业人员将联系您，了解您的货物、目的地和运营需求。",'''
)

page_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === COTIZACION HERO CONTACT STYLE FINAL START === */"
end = "/* === COTIZACION HERO CONTACT STYLE FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Hero Cotización estilo Contacto: imagen segundaaduana + copy premium */

.hero {{
  width: 100% !important;
  min-height: clamp(360px, 46vw, 620px) !important;
  margin: 0 !important;
  padding: clamp(6rem, 9vw, 9rem) 6vw clamp(3rem, 5vw, 5rem) !important;
  position: relative !important;
  display: flex !important;
  align-items: flex-end !important;
  overflow: hidden !important;
  isolation: isolate !important;
  color: #fff !important;
  background-image:
    linear-gradient(90deg, rgba(8,11,16,.74) 0%, rgba(8,11,16,.48) 44%, rgba(8,11,16,.16) 100%),
    linear-gradient(180deg, rgba(8,11,16,.12) 0%, rgba(8,11,16,.54) 100%),
    url("/images/segundaaduana.png") !important;
  background-size: cover !important;
  background-position: center center !important;
  background-repeat: no-repeat !important;
}}

.heroOverlay {{
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}}

.heroContent {{
  position: relative !important;
  z-index: 2 !important;
  width: min(680px, 100%) !important;
  max-width: 680px !important;
  color: #fff !important;
}}

.heroContent span {{
  display: inline-flex !important;
  margin-bottom: .9rem !important;
  color: #d6c08d !important;
  -webkit-text-fill-color: #d6c08d !important;
  font-size: .78rem !important;
  font-weight: 950 !important;
  letter-spacing: .18em !important;
  text-transform: uppercase !important;
}}

.heroContent h1 {{
  max-width: 680px !important;
  margin: 0 !important;
  color: #fff !important;
  -webkit-text-fill-color: #fff !important;
  font-size: clamp(2.45rem, 5vw, 4.8rem) !important;
  line-height: .94 !important;
  letter-spacing: -.06em !important;
  font-weight: 950 !important;
  text-shadow: 0 18px 46px rgba(0,0,0,.38) !important;
}}

.heroContent p {{
  max-width: 560px !important;
  margin: 1.15rem 0 0 !important;
  color: rgba(255,255,255,.84) !important;
  -webkit-text-fill-color: rgba(255,255,255,.84) !important;
  font-size: clamp(.95rem, 1.25vw, 1.08rem) !important;
  line-height: 1.62 !important;
}}

@media (max-width: 760px) {{
  .hero {{
    min-height: 360px !important;
    padding: 6.5rem 22px 2.4rem !important;
    align-items: flex-end !important;
    background-image:
      linear-gradient(180deg, rgba(8,11,16,.30) 0%, rgba(8,11,16,.66) 100%),
      url("/images/segundaaduana.png") !important;
    background-position: center center !important;
  }}

  .heroContent {{
    width: min(100%, 330px) !important;
  }}

  .heroContent h1 {{
    font-size: clamp(2rem, 9.5vw, 2.85rem) !important;
    line-height: .96 !important;
  }}

  .heroContent p {{
    font-size: .88rem !important;
    line-height: 1.5 !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Hero Cotización actualizado estilo Contacto")
print("✅ Imagen: /images/segundaaduana.png")
print("✅ Copy actualizado en ES/EN/ZH")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
