from pathlib import Path
import re
import shutil
import unicodedata

ROOT = Path("src/app")

TEXTS = {
    "servicios/transporte-aereo": {
        "eyebrow": "TRANSPORTE AÉREO INTERNACIONAL",
        "title": "Transporte aéreo internacional para cargas urgentes, sensibles o de alto valor.",
        "mobileTitle": "Carga aérea urgente y sensible.",
        "description": "Coordinamos envíos aéreos internacionales con control documental, seguimiento operativo y soluciones adaptadas a cargas críticas, sensibles o de alto valor.",
        "primary": "Solicitar cotización aérea",
        "secondary": "Hablar con un especialista",
    },
    "servicios/transporte-maritimo": {
        "eyebrow": "TRANSPORTE MARÍTIMO INTERNACIONAL",
        "title": "Transporte marítimo internacional para embarques FCL, LCL y proyectos especiales.",
        "mobileTitle": "Embarques marítimos FCL y LCL.",
        "description": "Gestionamos embarques marítimos internacionales con coordinación portuaria, control documental, aduanas y seguimiento operativo de origen a destino.",
        "primary": "Solicitar cotización marítima",
        "secondary": "Hablar con un especialista",
    },
    "servicios/transporte-terrestre": {
        "eyebrow": "TRANSPORTE TERRESTRE",
        "title": "Transporte terrestre nacional e internacional con trazabilidad operativa.",
        "mobileTitle": "Transporte terrestre con trazabilidad.",
        "description": "Coordinamos transporte terrestre para carga completa, grupaje, distribución y operaciones especiales, con seguimiento operativo y control documental durante el recorrido.",
        "primary": "Solicitar cotización terrestre",
        "secondary": "Hablar con un especialista",
    },
    "servicios/cargas-especiales": {
        "eyebrow": "CARGAS ESPECIALES E INDUSTRIALES",
        "title": "Ingeniería logística para cargas sobredimensionadas, industriales o fuera de estándar.",
        "mobileTitle": "Cargas especiales bajo control.",
        "description": "Coordinamos operaciones especiales para cargas que requieren análisis técnico, permisos, rutas, manipulación especializada y seguimiento operativo.",
        "primary": "Solicitar cotización especial",
        "secondary": "Hablar con un especialista",
    },
    "servicios/temperatura-controlada": {
        "eyebrow": "TEMPERATURA CONTROLADA",
        "title": "Logística con temperatura controlada para mercancías sensibles.",
        "mobileTitle": "Cadena de frío controlada.",
        "description": "Coordinamos transporte y soluciones logísticas para mercancías sensibles a temperatura, integrando control térmico, trazabilidad, documentación y manejo especializado.",
        "primary": "Solicitar cotización refrigerada",
        "secondary": "Hablar con un especialista",
    },
    "servicios/almacen-distribucion": {
        "eyebrow": "ALMACÉN Y DISTRIBUCIÓN",
        "title": "Almacenaje, preparación y distribución con control de stock.",
        "mobileTitle": "Stock y distribución bajo control.",
        "description": "Integramos recepción, almacenaje, preparación de pedidos, despacho y distribución para operaciones que requieren orden, precisión y visibilidad.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "servicios/aduanas": {
        "eyebrow": "SERVICIOS DE ADUANAS",
        "title": "Gestión aduanera para importaciones y exportaciones con menor riesgo operativo.",
        "mobileTitle": "Gestión aduanera con control.",
        "description": "Gestionamos documentación, clasificación, cumplimiento y coordinación aduanera para reducir riesgos, demoras y costos inesperados.",
        "primary": "Solicitar soporte aduanero",
        "secondary": "Hablar con un especialista",
    },
    "servicios/e-commerce": {
        "eyebrow": "LOGÍSTICA E-COMMERCE",
        "title": "Fulfillment e-commerce con gestión de stock, pedidos, entregas y devoluciones.",
        "mobileTitle": "Fulfillment e-commerce completo.",
        "description": "Coordinamos almacenaje, preparación de pedidos, distribución, devoluciones y trazabilidad operativa para tiendas online, marketplaces y marcas digitales.",
        "primary": "Solicitar propuesta e-commerce",
        "secondary": "Hablar con un especialista",
    },
    "sectores/alimentacion-bebidas": {
        "eyebrow": "SECTOR ALIMENTACIÓN Y BEBIDAS",
        "title": "Logística para alimentos y bebidas con trazabilidad, control y cumplimiento operativo.",
        "mobileTitle": "Alimentos y bebidas bajo control.",
        "description": "Diseñamos operaciones para alimentos, bebidas, perecederos y productos de consumo, integrando transporte, almacenaje, distribución, trazabilidad y control operativo.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "sectores/energias-renovables": {
        "eyebrow": "SECTOR ENERGÍAS RENOVABLES",
        "title": "Logística para proyectos renovables con planificación técnica y coordinación multimodal.",
        "mobileTitle": "Logística para proyectos renovables.",
        "description": "Coordinamos transporte, manipulación, permisos y operaciones especiales para componentes de energía renovable, cargas industriales y proyectos de alta complejidad.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "sectores/automocion": {
        "eyebrow": "SECTOR AUTOMOCIÓN",
        "title": "Logística automotriz para mantener activa la cadena de suministro.",
        "mobileTitle": "Logística automotriz especializada.",
        "description": "Coordinamos transporte, almacenaje, distribución y operaciones especiales para componentes, repuestos, autopartes y proyectos de automoción.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "sectores/tecnologico": {
        "eyebrow": "SECTOR TECNOLÓGICO",
        "title": "Logística para tecnología de alto valor con seguridad, trazabilidad y control documental.",
        "mobileTitle": "Tecnología con seguridad y control.",
        "description": "Coordinamos operaciones para equipos tecnológicos, dispositivos, componentes electrónicos y mercancía de alto valor, integrando transporte, documentación, almacenaje y seguimiento operativo.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "sectores/farmaceutico-sanitario": {
        "eyebrow": "SECTOR FARMACÉUTICO Y SANITARIO",
        "title": "Logística sanitaria para productos sensibles, regulados y de alto control.",
        "mobileTitle": "Logística sanitaria especializada.",
        "description": "Coordinamos operaciones para productos farmacéuticos, sanitarios, médicos y sensibles, integrando control documental, trazabilidad, cadena de frío cuando aplica y seguimiento operativo.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "sectores/consumo-distribucion": {
        "eyebrow": "SECTOR CONSUMO Y DISTRIBUCIÓN",
        "title": "Logística para productos de consumo, retail y distribución comercial.",
        "mobileTitle": "Consumo y distribución bajo control.",
        "description": "Coordinamos transporte, almacenaje, preparación, distribución y trazabilidad para productos de consumo, retail, e-commerce y operaciones comerciales.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "sectores/quimico": {
        "eyebrow": "SECTOR QUÍMICO",
        "title": "Logística química con seguridad, cumplimiento normativo y trazabilidad.",
        "mobileTitle": "Químicos con seguridad y control.",
        "description": "Coordinamos operaciones logísticas para productos químicos, materias primas, mercancía sensible y cargas reguladas, integrando transporte, documentación, trazabilidad y control operativo.",
        "primary": "Solicitar propuesta logística",
        "secondary": "Hablar con un especialista",
    },
    "empresa/quienes-somos": {
        "eyebrow": "QUIÉNES SOMOS",
        "title": "Logística internacional con control, cumplimiento y coordinación experta.",
        "mobileTitle": "Logística internacional con control.",
        "description": "Conectamos empresas, mercados y cadenas de suministro mediante soluciones logísticas integrales, combinando cobertura internacional, experiencia operativa, tecnología, cumplimiento documental y atención especializada.",
        "primary": "Conocer nuestras soluciones",
        "secondary": "Ver oficinas",
    },
    "empresa/oficinas": {
        "eyebrow": "NUESTRAS OFICINAS",
        "title": "Presencia internacional para coordinar operaciones en mercados estratégicos.",
        "mobileTitle": "Presencia internacional operativa.",
        "description": "Nuestra red de oficinas conecta operaciones, clientes y mercados estratégicos para responder con precisión en cada destino.",
        "primary": "Hablar con un especialista",
        "secondary": "Ver oficinas",
    },
    "empresa/sostenibilidad": {
        "eyebrow": "SOSTENIBILIDAD",
        "title": "Operaciones logísticas más eficientes, trazables y responsables.",
        "mobileTitle": "Logística eficiente y responsable.",
        "description": "Trabajamos para reducir impacto, optimizar recursos y avanzar hacia operaciones logísticas con mayor eficiencia, trazabilidad y responsabilidad ambiental.",
        "primary": "Conocer nuestro enfoque",
        "secondary": "Hablar con un especialista",
    },
    "recursos": {
        "eyebrow": "FAQ Y RECURSOS",
        "title": "Recursos logísticos para tomar mejores decisiones operativas.",
        "mobileTitle": "Recursos para decidir mejor.",
        "description": "Acceda a contenidos, guías y materiales diseñados para ayudar a empresas a tomar mejores decisiones en transporte internacional, aduanas, distribución y operaciones especiales.",
        "primary": "Explorar recursos",
        "secondary": "Hablar con un especialista",
    },
    "blog": {
        "eyebrow": "BLOG",
        "title": "Análisis y novedades sobre logística internacional.",
        "mobileTitle": "Blog de logística internacional.",
        "description": "Actualidad, novedades y conocimiento especializado en logística internacional, aduanas, transporte y cadena de suministro.",
    },
    "cotizacion": {
        "eyebrow": "SOLICITUD DE COTIZACIÓN LOGÍSTICA",
        "title": "Solicite una propuesta logística ajustada a su operación.",
        "mobileTitle": "Solicite su propuesta logística.",
        "description": "Complete los datos de su requerimiento y nuestro equipo preparará una propuesta ajustada a su carga, destino, urgencia y tipo de operación.",
        "primary": "Solicitar propuesta logística",
    },
    "contacto": {
        "title": "Formulario de contacto",
        "description": "Envíe su consulta y nuestro equipo revisará su solicitud para orientarle según el tipo de operación, carga o servicio requerido.",
        "primary": "Enviar solicitud",
        "legal": "ACROSS LOGISTICS, S.L.U., como responsable del tratamiento, tratará sus datos con la finalidad de responder a su consulta o solicitud. Puede acceder, rectificar y suprimir sus datos, así como ejercer otros derechos consultando la información adicional en nuestra Política de Privacidad Web y nuestros Términos y Condiciones.",
    },
}

KEY_ALIASES = {
    "eyebrow": ["eyebrow", "heroEyebrow", "kicker", "badge", "volanta"],
    "title": ["title", "heroTitle", "desktopTitle", "headline", "h1"],
    "mobileTitle": ["mobileTitle", "heroMobileTitle", "mobileHeadline", "mobileH1", "shortTitle"],
    "description": ["description", "heroDescription", "subtitle", "subtext", "text", "heroText", "intro"],
    "primary": ["primary", "primaryCta", "ctaPrimary", "primaryLabel", "primaryText", "submitLabel"],
    "secondary": ["secondary", "secondaryCta", "ctaSecondary", "secondaryLabel", "secondaryText"],
    "legal": ["legal", "legalText", "privacyText"],
}

def norm(s: str) -> str:
    s = s.replace("\\", "/").lower()
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return s

def js_string(value: str) -> str:
    return '"' + value.replace("\\", "\\\\").replace('"', '\\"') + '"'

def find_matching_brace(text: str, open_pos: int) -> int:
    depth = 0
    quote = None
    esc = False
    for i in range(open_pos, len(text)):
        ch = text[i]
        if quote:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == quote:
                quote = None
        else:
            if ch in ("'", '"', "`"):
                quote = ch
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    return i
    return -1

def find_es_block(text: str):
    m = re.search(r"\bes\s*:\s*\{", text)
    if not m:
        return None
    open_pos = text.find("{", m.start())
    close_pos = find_matching_brace(text, open_pos)
    if close_pos == -1:
        return None
    return open_pos + 1, close_pos

def replace_key_once(block: str, aliases, value: str):
    for key in aliases:
        # key: "..."
        pattern = re.compile(
            rf"(\b{re.escape(key)}\s*:\s*)(['\"`])(?:\\.|(?!\2).)*\2",
            re.S
        )
        if pattern.search(block):
            block = pattern.sub(lambda m: m.group(1) + js_string(value), block, count=1)
            return block, True, key
    return block, False, None

def patch_signal_steps(text: str):
    # Arregla los 3 bloques del contacto si existen como signalSteps.
    titles = [
        ("Solicitud recibida", "Recibimos sus datos y revisamos qué necesita mover, cotizar o coordinar.", "green"),
        ("Análisis operativo", "Revisamos ruta, tiempos, documentación y condiciones del servicio.", "amber"),
        ("Respuesta especializada", "Nuestro equipo le contactará para avanzar con una propuesta ajustada a su operación.", "red"),
    ]

    if "const signalSteps" not in text:
        return text, False

    replacement = '''const signalSteps: Record<Locale, { title: string; text: string; description: string; tone: "green" | "amber" | "red" }[]> = {
  es: [
    {
      title: "Solicitud recibida",
      text: "Recibimos sus datos y revisamos qué necesita mover, cotizar o coordinar.",
      description: "Recibimos sus datos y revisamos qué necesita mover, cotizar o coordinar.",
      tone: "green",
    },
    {
      title: "Análisis operativo",
      text: "Revisamos ruta, tiempos, documentación y condiciones del servicio.",
      description: "Revisamos ruta, tiempos, documentación y condiciones del servicio.",
      tone: "amber",
    },
    {
      title: "Respuesta especializada",
      text: "Nuestro equipo le contactará para avanzar con una propuesta ajustada a su operación.",
      description: "Nuestro equipo le contactará para avanzar con una propuesta ajustada a su operación.",
      tone: "red",
    },
  ],
  en: [
    {
      title: "Request received",
      text: "We receive your details and review what you need to move, quote or coordinate.",
      description: "We receive your details and review what you need to move, quote or coordinate.",
      tone: "green",
    },
    {
      title: "Operational analysis",
      text: "We review route, timing, documentation and service conditions.",
      description: "We review route, timing, documentation and service conditions.",
      tone: "amber",
    },
    {
      title: "Specialized response",
      text: "Our team will contact you to move forward with a proposal adjusted to your operation.",
      description: "Our team will contact you to move forward with a proposal adjusted to your operation.",
      tone: "red",
    },
  ],
  zh: [
    {
      title: "请求已收到",
      text: "我们会接收您的信息，并了解您需要运输、报价或协调的内容。",
      description: "我们会接收您的信息，并了解您需要运输、报价或协调的内容。",
      tone: "green",
    },
    {
      title: "运营分析",
      text: "我们会审核路线、时间、文件和服务条件。",
      description: "我们会审核路线、时间、文件和服务条件。",
      tone: "amber",
    },
    {
      title: "专业回复",
      text: "我们的团队将联系您，推进符合您运营需求的方案。",
      description: "我们的团队将联系您，推进符合您运营需求的方案。",
      tone: "red",
    },
  ],
};'''

    start = text.find("const signalSteps")
    eq = text.find("=", start)
    brace = text.find("{", eq)
    if start == -1 or eq == -1 or brace == -1:
        return text, False

    close = find_matching_brace(text, brace)
    if close == -1:
        return text, False

    end = close + 1
    rest = text[end:]
    if rest.lstrip().startswith("as const"):
        ws = len(rest) - len(rest.lstrip())
        end += ws + len("as const")
    rest = text[end:]
    if rest.lstrip().startswith(";"):
        ws = len(rest) - len(rest.lstrip())
        end += ws + 1

    return text[:start] + replacement + text[end:], True

def best_target_for_file(path: Path):
    rel = norm(str(path.relative_to(ROOT)))
    if rel == "page.tsx":
        return None  # HOME / PRINCIPAL NO SE TOCA
    if "backup" in rel or ".bak" in rel:
        return None

    candidates = []
    for key in TEXTS:
        nk = norm(key)
        if nk in rel:
            candidates.append((len(nk), key))

    if not candidates:
        return None

    return sorted(candidates, reverse=True)[0][1]

changed_files = []
missing = []

for p in sorted(ROOT.rglob("page.tsx")):
    target_key = best_target_for_file(p)
    if not target_key:
        continue

    desired = TEXTS[target_key]
    text = p.read_text(encoding="utf-8")
    original = text

    # backup único
    backup = p.with_suffix(p.suffix + ".bak-hero-final")
    if not backup.exists():
        shutil.copy2(p, backup)

    es_range = find_es_block(text)
    changed_keys = []

    if es_range:
        a, b = es_range
        block = text[a:b]

        for canonical, value in desired.items():
            aliases = KEY_ALIASES.get(canonical, [canonical])
            block, did, used_key = replace_key_once(block, aliases, value)
            if did:
                changed_keys.append(f"{canonical}->{used_key}")
            else:
                missing.append((str(p), canonical))

        text = text[:a] + block + text[b:]

    # Contacto: además actualiza signalSteps/bloques.
    if target_key == "contacto":
        text, did_signal = patch_signal_steps(text)
        if did_signal:
            changed_keys.append("signalSteps")

    if text != original:
        p.write_text(text, encoding="utf-8")
        changed_files.append((str(p), ", ".join(changed_keys) if changed_keys else "texto actualizado"))

print("\\n✅ ARCHIVOS ACTUALIZADOS:")
for file, keys in changed_files:
    print(f" - {file}: {keys}")

print("\\n⚠️ CAMPOS NO ENCONTRADOS, REVISAR SI HACE FALTA:")
for file, key in missing:
    print(f" - {file}: {key}")

print("\\n✅ HOME / PRINCIPAL NO FUE TOCADO.")
