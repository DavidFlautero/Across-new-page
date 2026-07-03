const fs = require("fs");
const path = require("path");

const ROOT = "src/app/servicios";

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const configs = [
  {
    key: "aereo",
    slug: "transporte-aereo",
    detect: ["TRANSPORTE AÉREO INTERNACIONAL", "Movemos su carga aérea"],
    finalBg: "/images/contactoimagen.png",
    es: {
      heroEyebrow: "TRANSPORTE AÉREO INTERNACIONAL",
      heroTitle: "Movemos su carga aérea con rapidez, control y trazabilidad.",
      heroText: "Coordinamos envíos aéreos internacionales con control documental, seguimiento operativo y soluciones adaptadas a cargas urgentes, sensibles o de alto valor.",
      primaryCta: "Cotizar carga aérea",
      secondaryCta: "Hablar con un especialista",
      stickyPrimary: "Cotizar aéreo",
      stickySecondary: "Rastrear carga",
      stickySecondaryHref: "/tracking?servicio=transporte-aereo",
      finalTitle: "Coordinemos su próxima operación internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar carga aérea",
      preEyebrow: "ANTES DE COTIZAR",
      preTitle: "La ruta aérea se define por carga, urgencia y documentación.",
      preText: "Revisamos qué se mueve, desde dónde sale, cuándo debe llegar y qué requisitos documentales tiene. Con eso definimos si conviene urgente, consolidado, courier, directo o chárter.",
      prePoints: [
        ["Carga", "Tipo de mercancía, valor, sensibilidad y cuidado requerido."],
        ["Ruta", "Origen, destino, disponibilidad aérea y fecha límite."],
        ["Control", "Documentos, restricciones y seguimiento operativo."],
      ],
    },
    en: {
      heroEyebrow: "INTERNATIONAL AIR FREIGHT",
      heroTitle: "We move your air cargo with speed, control and traceability.",
      heroText: "We coordinate international air shipments with document control, operational tracking and solutions adapted to urgent, sensitive or high-value cargo.",
      primaryCta: "Quote air cargo",
      secondaryCta: "Talk to a specialist",
      stickyPrimary: "Quote air",
      stickySecondary: "Track cargo",
      stickySecondaryHref: "/tracking?servicio=transporte-aereo",
      finalTitle: "Let’s coordinate your next international operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote air cargo",
      preEyebrow: "BEFORE QUOTING",
      preTitle: "The air route is defined by cargo, urgency and documentation.",
      preText: "We review what moves, where it departs from, when it must arrive and which documents are required. With that, we define whether urgent, consolidated, courier, direct or charter is more viable.",
      prePoints: [
        ["Cargo", "Type of goods, value, sensitivity and required care."],
        ["Route", "Origin, destination, air availability and deadline."],
        ["Control", "Documents, restrictions and operational tracking."],
      ],
    },
    zh: {
      heroEyebrow: "国际空运",
      heroTitle: "快速、管控、全程可追踪地运输您的空运货物。",
      heroText: "我们协调国际空运业务，提供文件管控、运营跟踪，以及适用于紧急、 敏感或高价值货物的方案。",
      primaryCta: "获取空运报价",
      secondaryCta: "联系专家",
      stickyPrimary: "空运报价",
      stickySecondary: "货物追踪",
      stickySecondaryHref: "/tracking?servicio=transporte-aereo",
      finalTitle: "协调您的下一次国际物流操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取空运报价",
      preEyebrow: "报价前",
      preTitle: "空运路线取决于货物、紧急程度和文件要求。",
      preText: "我们会确认货物类型、始发地、到达时限以及所需文件，以判断紧急空运、拼货、专人携带、直达或包机是否更合适。",
      prePoints: [
        ["货物", "货物类型、价值、敏感性和所需照护。"],
        ["路线", "始发地、目的地、舱位可用性和截止时间。"],
        ["管控", "文件、限制要求和运营跟踪。"],
      ],
    },
  },
  {
    key: "maritimo",
    slug: "transporte-maritimo",
    detect: ["TRANSPORTE MARÍTIMO INTERNACIONAL"],
    finalBg: "/images/maritimo.png",
    es: {
      heroEyebrow: "TRANSPORTE MARÍTIMO INTERNACIONAL",
      heroTitle: "Movemos su carga marítima con control, coordinación portuaria y trazabilidad.",
      heroText: "Gestionamos embarques FCL, LCL y proyectos marítimos con control documental, coordinación portuaria, aduanas y seguimiento operativo de origen a destino.",
      primaryCta: "Cotizar carga marítima",
      secondaryCta: "Hablar con un especialista",
      stickyPrimary: "Cotizar marítimo",
      stickySecondary: "Hablar ahora",
      finalTitle: "Coordinemos su próxima operación internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar carga marítima",
      preEyebrow: "ANTES DE COTIZAR",
      preTitle: "El embarque marítimo se define por volumen, ruta y documentación.",
      preText: "Revisamos origen, destino, tipo de carga, volumen, Incoterm y documentos para definir si conviene FCL, LCL, proyecto, cross trade o puerta a puerta.",
      prePoints: [["Carga", "Tipo, volumen, peso y condiciones de la mercancía."], ["Ruta", "Puerto de origen, destino, tiempos y disponibilidad."], ["Control", "Documentos, aduanas y seguimiento operativo."]],
    },
    en: {
      heroEyebrow: "INTERNATIONAL OCEAN FREIGHT",
      heroTitle: "We move your ocean cargo with port coordination, control and traceability.",
      heroText: "We manage FCL, LCL and ocean project shipments with document control, port coordination, customs and operational tracking from origin to destination.",
      primaryCta: "Quote ocean freight",
      secondaryCta: "Talk to a specialist",
      stickyPrimary: "Quote ocean",
      stickySecondary: "Talk now",
      finalTitle: "Let’s coordinate your next international operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote ocean freight",
      preEyebrow: "BEFORE QUOTING",
      preTitle: "Ocean freight is defined by volume, route and documentation.",
      preText: "We review origin, destination, cargo type, volume, Incoterm and documents to define whether FCL, LCL, project, cross trade or door-to-door is more viable.",
      prePoints: [["Cargo", "Type, volume, weight and cargo conditions."], ["Route", "Port of origin, destination, timing and availability."], ["Control", "Documents, customs and operational tracking."]],
    },
    zh: {
      heroEyebrow: "国际海运",
      heroTitle: "通过港口协调、管控和可追踪性运输您的海运货物。",
      heroText: "我们管理 FCL、LCL 和项目海运，涵盖文件管控、港口协调、海关和从 始发地到目的地的运营跟踪。",
      primaryCta: "获取海运报价",
      secondaryCta: "联系专家",
      stickyPrimary: "海运报价",
      stickySecondary: "立即联系",
      finalTitle: "协调您的下一次国际物流操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取海运报价",
      preEyebrow: "报价前",
      preTitle: "海运方案取决于体积、路线和文件。",
      preText: "我们会审核始发地、目的地、货物类型、体积、贸易条款和文件，以判断 FCL、LCL、项目运输、第三国贸易或门到门是否更合适。",
      prePoints: [["货物", "类型、体积、重量和货物条件。"], ["路线", "始发港、目的地、时间和舱位。"], ["管控", "文件、海关和运营跟踪。"]],
    },
  },
  {
    key: "almacen",
    slug: "almacen-distribucion",
    detect: ["Almacén y distribución"],
    finalBg: "/images/almacenHero.png",
    es: {
      heroEyebrow: "ALMACÉN Y DISTRIBUCIÓN",
      heroTitle: "Gestionamos su inventario con orden, velocidad y trazabilidad.",
      heroText: "Coordinamos almacenaje, preparación de pedidos, distribución y control operativo para empresas que necesitan stock visible, procesos ordenados y entregas coordinadas.",
      primaryCta: "Cotizar almacenaje",
      secondaryCta: "Hablar con un especialista",
      stickyPrimary: "Cotizar almacén",
      stickySecondary: "Hablar ahora",
      finalTitle: "Coordinemos su próxima operación internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar almacenaje",
      preEyebrow: "ANTES DE COTIZAR",
      preTitle: "La operación se define por stock, pedidos y frecuencia de salida.",
      preText: "Revisamos volumen, rotación, tipo de mercancía, preparación requerida y canales de distribución para proponer una solución operativa viable.",
      prePoints: [["Stock", "Volumen, referencias, rotación y condiciones de almacenamiento."], ["Pedidos", "Picking, packing, etiquetado y preparación."], ["Distribución", "Frecuencia de salida, destinos y nivel de servicio."]],
    },
    en: {
      heroEyebrow: "WAREHOUSING AND DISTRIBUTION",
      heroTitle: "We manage your inventory with order, speed and traceability.",
      heroText: "We coordinate warehousing, order preparation, distribution and operational control for companies that need visible stock, organized processes and coordinated deliveries.",
      primaryCta: "Quote warehousing",
      secondaryCta: "Talk to a specialist",
      stickyPrimary: "Quote storage",
      stickySecondary: "Talk now",
      finalTitle: "Let’s coordinate your next international operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote warehousing",
      preEyebrow: "BEFORE QUOTING",
      preTitle: "The operation is defined by stock, orders and outbound frequency.",
      preText: "We review volume, rotation, cargo type, preparation needs and distribution channels to propose a viable operational solution.",
      prePoints: [["Stock", "Volume, SKUs, rotation and storage conditions."], ["Orders", "Picking, packing, labeling and preparation."], ["Distribution", "Outbound frequency, destinations and service level."]],
    },
    zh: {
      heroEyebrow: "仓储与配送",
      heroTitle: "以秩序、速度和可追踪性管理您的库存。",
      heroText: "我们协调仓储、订单准备、配送和运营管控，帮助企业实现库存可视、 流程有序和交付协调。",
      primaryCta: "获取仓储报价",
      secondaryCta: "联系专家",
      stickyPrimary: "仓储报价",
      stickySecondary: "立即联系",
      finalTitle: "协调您的下一次国际物流操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取仓储报价",
      preEyebrow: "报价前",
      preTitle: "仓储操作取决于库存、订单和出库频率。",
      preText: "我们会审核体量、周转、货物类型、准备需求和配送渠道，以提出可行的运营方案。",
      prePoints: [["库存", "体量、SKU、周转和存储条件。"], ["订单", "拣货、包装 、贴标和准备。"], ["配送", "出库频率、目的地和服务水平。"]],
    },
  },
  {
    key: "temperatura",
    slug: "temperatura-controlada",
    detect: ["Carga temperatura controlada", "Cadena de frío"],
    finalBg: "/images/contactoimagen.png",
    es: {
      heroEyebrow: "TEMPERATURA CONTROLADA",
      heroTitle: "Protegemos su carga sensible con control térmico y trazabilidad.",
      heroText: "Coordinamos operaciones para mercancías que requieren temperatura controlada, monitoreo, protocolos claros y seguimiento operativo de origen a destino.",
      primaryCta: "Cotizar cadena de frío",
      secondaryCta: "Hablar con un especialista",
      stickyPrimary: "Cotizar frío",
      stickySecondary: "Hablar ahora",
      finalTitle: "Coordinemos su próxima operación internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar cadena de frío",
      preEyebrow: "ANTES DE COTIZAR",
      preTitle: "La operación depende del producto, rango térmico y ruta.",
      preText: "Revisamos tipo de mercancía, temperatura requerida, tiempo de tránsito, origen, destino y protocolo para proteger la integridad del producto.",
      prePoints: [["Producto", "Pharma, alimentos, muestras o mercancía crítica."], ["Temperatura", "Rango térmico, sensibilidad y tiempo de exposición."], ["Control", "Monitoreo, protocolo y trazabilidad operativa."]],
    },
    en: {
      heroEyebrow: "TEMPERATURE CONTROLLED CARGO",
      heroTitle: "We protect sensitive cargo with thermal control and traceability.",
      heroText: "We coordinate operations for goods that require controlled temperature, monitoring, clear protocols and operational tracking from origin to destination.",
      primaryCta: "Quote cold chain",
      secondaryCta: "Talk to a specialist",
      stickyPrimary: "Quote cold",
      stickySecondary: "Talk now",
      finalTitle: "Let’s coordinate your next international operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote cold chain",
      preEyebrow: "BEFORE QUOTING",
      preTitle: "The operation depends on product, temperature range and route.",
      preText: "We review cargo type, required temperature, transit time, origin, destination and protocol to protect product integrity.",
      prePoints: [["Product", "Pharma, food, samples or critical goods."], ["Temperature", "Thermal range, sensitivity and exposure time."], ["Control", "Monitoring, protocol and operational traceability."]],
    },
    zh: {
      heroEyebrow: "温控货物",
      heroTitle: "通过温控和可追踪性保护您的敏感货物。",
      heroText: "我们协调需要温控、监控、明确协议和从始发地到目的地运营跟踪的货 物操作。",
      primaryCta: "获取冷链报价",
      secondaryCta: "联系专家",
      stickyPrimary: "冷链报价",
      stickySecondary: "立即联系",
      finalTitle: "协调您的下一次国际物流操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取冷链报价",
      preEyebrow: "报价前",
      preTitle: "操作取决于产品、温度范围和路线。",
      preText: "我们会审核货物类型、所需温度、运输时间、始发地、目的地和操作协议，以保护产品完整性。",
      prePoints: [["产品", "医药、食品、样品或关键货物。"], ["温度", "温度范围、敏感性和暴露时间。"], ["管控", "监控、协议和运营可追踪性。"]],
    },
  },
  {
    key: "ecommerce",
    slug: "ecommerce",
    detect: ["Logística e-commerce"],
    finalBg: "/images/heroecommerce.png",
    es: {
      heroEyebrow: "LOGÍSTICA E-COMMERCE",
      heroTitle: "Preparamos y entregamos sus pedidos con velocidad, control y trazabilidad.",
      heroText: "Coordinamos fulfillment, almacenaje, preparación de pedidos, distribución y devoluciones para marcas que venden online y necesitan operación visible.",
      primaryCta: "Cotizar fulfillment",
      secondaryCta: "Hablar con un especialista",
      stickyPrimary: "Cotizar fulfillment",
      stickySecondary: "Hablar ahora",
      finalTitle: "Coordinemos su próxima operación internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar fulfillment",
      preEyebrow: "ANTES DE COTIZAR",
      preTitle: "La operación se define por stock, pedidos y promesa de entrega.",
      preText: "Revisamos volumen de pedidos, canales de venta, preparación, entregas y devoluciones para estructurar una operación e-commerce viable.",
      prePoints: [["Stock", "Inventario, referencias y disponibilidad."], ["Pedidos", "Picking, packing, etiquetado y tiempos de preparación."], ["Entrega", "Distribución, devoluciones y trazabilidad."]],
    },
    en: {
      heroEyebrow: "E-COMMERCE LOGISTICS",
      heroTitle: "We prepare and deliver your orders with speed, control and traceability.",
      heroText: "We coordinate fulfillment, warehousing, order preparation, distribution and returns for online brands that need visible operations.",
      primaryCta: "Quote fulfillment",
      secondaryCta: "Talk to a specialist",
      stickyPrimary: "Quote fulfill",
      stickySecondary: "Talk now",
      finalTitle: "Let’s coordinate your next international operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote fulfillment",
      preEyebrow: "BEFORE QUOTING",
      preTitle: "The operation is defined by stock, orders and delivery promise.",
      preText: "We review order volume, sales channels, preparation, deliveries and returns to structure a viable e-commerce operation.",
      prePoints: [["Stock", "Inventory, SKUs and availability."], ["Orders", "Picking, packing, labeling and preparation times."], ["Delivery", "Distribution, returns and traceability."]],
    },
    zh: {
      heroEyebrow: "电商物流",
      heroTitle: "以速度、管控和可追踪性准备并交付您的订单。",
      heroText: "我们为在线品牌协调履约、仓储、订单准备、配送和退货，帮助其实现 可视化运营。",
      primaryCta: "获取履约报价",
      secondaryCta: "联系专家",
      stickyPrimary: "履约报价",
      stickySecondary: "立即联系",
      finalTitle: "协调您的下一次国际物流操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取履约报价",
      preEyebrow: "报价前",
      preTitle: "电商操作取决于库存、订单和交付承诺。",
      preText: "我们会审核订单量、销售渠道、准备流程、配送和退货，以设计可行的电商运营方案。",
      prePoints: [["库存", "库存、SKU 和可用性。"], ["订单", "拣货、包装、贴标和准备时间。"], ["交付", "配送、退货和可追踪性。"]],
    },
  },
  {
    key: "especiales",
    slug: "cargas-especiales",
    detect: ["CARGAS ESPECIALES E INDUSTRIALES"],
    finalBg: "/images/cargas-especiales-desktop/transporte-especial-hero.png",
    es: {
      heroEyebrow: "CARGAS ESPECIALES E INDUSTRIALES",
      heroTitle: "Movemos cargas especiales con planificación técnica, permisos y control operativo.",
      heroText: "Coordinamos operaciones para cargas sobredimensionadas, industriales o fuera de estándar con análisis técnico, rutas, permisos, manipulación especializada y seguimiento.",
      primaryCta: "Cotizar carga especial",
      secondaryCta: "Hablar con un especialista",
      stickyPrimary: "Cotizar especial",
      stickySecondary: "Hablar ahora",
      finalTitle: "Coordinemos su próxima operación internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar carga especial",
      preEyebrow: "ANTES DE COTIZAR",
      preTitle: "La operación se define por dimensiones, ruta y permisos.",
      preText: "Revisamos peso, medidas, punto de carga, destino, restricciones, permisos y manipulación para diseñar una operación segura y viable.",
      prePoints: [["Carga", "Peso, dimensiones, centro de gravedad y manipulación."], ["Ruta", "Origen, destino, accesos, restricciones y equipos."], ["Permisos", "Autorizaciones, escoltas y coordinación operativa."]],
    },
    en: {
      heroEyebrow: "SPECIAL AND INDUSTRIAL CARGO",
      heroTitle: "We move special cargo with technical planning, permits and operational control.",
      heroText: "We coordinate operations for oversized, industrial or non-standard cargo with technical analysis, routes, permits, specialized handling and tracking.",
      primaryCta: "Quote special cargo",
      secondaryCta: "Talk to a specialist",
      stickyPrimary: "Quote special",
      stickySecondary: "Talk now",
      finalTitle: "Let’s coordinate your next international operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote special cargo",
      preEyebrow: "BEFORE QUOTING",
      preTitle: "The operation is defined by dimensions, route and permits.",
      preText: "We review weight, dimensions, loading point, destination, restrictions, permits and handling to design a safe and viable operation.",
      prePoints: [["Cargo", "Weight, dimensions, center of gravity and handling."], ["Route", "Origin, destination, access, restrictions and equipment."], ["Permits", "Authorizations, escorts and operational coordination."]],
    },
    zh: {
      heroEyebrow: "特殊与工业货物",
      heroTitle: "通过技术规划、许可和运营管控运输特殊货物。",
      heroText: "我们协调超限、工业或非标准货物操作，涵盖技术分析、路线、许可、 专业装卸和跟踪。",
      primaryCta: "获取特殊货物报价",
      secondaryCta: "联系专家",
      stickyPrimary: "特殊报价",
      stickySecondary: "立即联系",
      finalTitle: "协调您的下一次国际物流操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取特殊货物报价",
      preEyebrow: "报价前",
      preTitle: "操作取决于尺寸、路线和许可。",
      preText: "我们会审核重量、尺寸、装货点、目的地、限制、许可和装卸要求，以设计安全可行的操作。",
      prePoints: [["货物", "重量、尺寸、重心和装卸要求。"], ["路线", "始发地、目的地、通道、限制和设备。"], ["许可", "授权、护送和运营协调。"]],
    },
  },
];

function detectConfig(text) {
  return configs.find((config) => config.detect.some((needle) => text.includes(needle)));
}

function localeBounds(text, locale) {
  const re = /\n\s*"?(es|en|zh)"?\s*:\s*\{/g;
  const matches = [...text.matchAll(re)];
  const currentIndex = matches.findIndex((m) => m[1] === locale);
  if (currentIndex === -1) return null;

  const start = matches[currentIndex].index + 1;
  const end =
    currentIndex + 1 < matches.length
      ? matches[currentIndex + 1].index + 1
      : text.indexOf("} satisfies", start);

  if (end === -1) return null;
  return { start, end };
}

function replaceField(block, key, value) {
  const re = new RegExp(`(["']?${key}["']?\\s*:\\s*)("[^"]*"|'[^']*')`);
  if (re.test(block)) return block.replace(re, `$1${JSON.stringify(value)}`);
  return block;
}

function cleanInjectedData(block) {
  const markerKeys = [
    "stickyPrimary",
    "stickySecondary",
    "stickySecondaryHref",
    "whiteCloseEyebrow",
    "quoteEyebrow",
    "decisionEyebrow",
    "actionAccordionEyebrow",
    "bridgeEyebrow",
    "preQuoteEyebrow",
  ];

  for (const key of markerKeys) {
    const start = block.indexOf(`    ${key}:`);
    const startQuoted = block.indexOf(`    "${key}":`);
    const realStart = start !== -1 ? start : startQuoted;

    if (realStart !== -1) {
      const pillars = block.indexOf("    pillars:", realStart);
      const quotedPillars = block.indexOf('    "pillars":', realStart);
      const end = pillars !== -1 ? pillars : quotedPillars;
      if (end !== -1) return block.slice(0, realStart) + block.slice(end);
    }
  }

  return block;
}

function insertServiceData(block, localeData) {
  const points = localeData.prePoints
    .map(([title, text]) => `[${JSON.stringify(title)}, ${JSON.stringify(text)}]`)
    .join(",\n      ");

  const data = `    stickyPrimary: ${JSON.stringify(localeData.stickyPrimary)},
    stickySecondary: ${JSON.stringify(localeData.stickySecondary)},
    stickySecondaryHref: ${JSON.stringify(localeData.stickySecondaryHref || "")},

    preQuoteEyebrow: ${JSON.stringify(localeData.preEyebrow)},
    preQuoteTitle: ${JSON.stringify(localeData.preTitle)},
    preQuoteText: ${JSON.stringify(localeData.preText)},
    preQuoteCta: ${JSON.stringify(localeData.finalSecondary)},
    preQuotePoints: [
      ${points},
    ],

`;

  if (block.includes("    pillars:")) return block.replace("    pillars:", data + "    pillars:");
  if (block.includes('    "pillars":')) return block.replace('    "pillars":', data + '    "pillars":');
  throw new Error("No encontré pillars para insertar datos nuevos.");
}

function updateLocale(page, locale, data) {
  const bounds = localeBounds(page, locale);
  if (!bounds) return page;

  let block = page.slice(bounds.start, bounds.end);
  block = cleanInjectedData(block);

  for (const key of [
    "heroEyebrow",
    "heroTitle",
    "heroText",
    "primaryCta",
    "secondaryCta",
    "finalTitle",
    "finalText",
    "finalPrimary",
    "finalSecondary",
  ]) {
    block = replaceField(block, key, data[key]);
  }

  block = insertServiceData(block, data);
  return page.slice(0, bounds.start) + block + page.slice(bounds.end);
}

function removeOldSections(page) {
  const classes = [
    "airActionMobile",
    "airDecisionMobile",
    "airQuoteMobile",
    "airBridgeMobile",
    "airWhiteCloseMobile",
    "servicePreQuote",
  ];

  for (const className of classes) {
    const re = new RegExp(
      `\\n\\s*<section className=\\{styles\\.${className}\\}[\\s\\S]*?\\n\\s*<\\/section>\\s*`,
      "g"
    );
    page = page.replace(re, "\n");
  }

  page = page.replace(
    /\n\s*<div className=\{styles\.finalContactMethods\}>[\s\S]*?<\/div>\s*(?=\n\s*<div className=\{styles\.finalActions\}>)/g,
    "\n"
  );

  return page;
}

function insertPreQuote(page, config) {
  const section = `
        <section className={styles.servicePreQuote} aria-labelledby="service-prequote-title">
          <span className={styles.eyebrow}>{t.preQuoteEyebrow}</span>
          <h2 id="service-prequote-title">{t.preQuoteTitle}</h2>
          <p>{t.preQuoteText}</p>

          <div className={styles.servicePreQuotePoints}>
            {t.preQuotePoints.map(([title, text]: string[]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>

          <Link href="/cotizacion?servicio=${config.slug}">
            {t.preQuoteCta}
          </Link>
        </section>

`;

  return page.replace(/(\s*<section className=\{styles\.finalCta\})/, section + "$1");
}

function normalizeFinalActions(page, config) {
  const block = `<div className={styles.finalActions}>
              <Link href="/contacto?servicio=${config.slug}">{t.finalPrimary}</Link>
              <Link href="/cotizacion?servicio=${config.slug}">{t.finalSecondary}</Link>
            </div>`;

  return page.replace(
    /<div className=\{styles\.finalActions\}>[\s\S]*?<\/div>/,
    block
  );
}

function insertSticky(page, config) {
  page = page.replace(
    /\n\s*<div className=\{styles\.mobileStickyCta\}[\s\S]*?<\/div>\s*(?=\n\s*<Footer \/>)/g,
    "\n"
  );

  const sticky = `
      <div className={styles.mobileStickyCta} aria-label="Acciones rápidas">
        <Link href="/cotizacion?servicio=${config.slug}">
          {t.stickyPrimary}
        </Link>

        <Link href={t.stickySecondaryHref || "/contacto?servicio=${config.slug}"}>
          {t.stickySecondary}
        </Link>
      </div>

`;

  if (!page.includes("<Footer />")) return page;
  return page.replace("      <Footer />", sticky + "      <Footer />");
}

const pages = walk(ROOT).filter((file) => file.endsWith("page.tsx"));
const changed = [];

for (const file of pages) {
  let page = fs.readFileSync(file, "utf8");
  const config = detectConfig(page);
  if (!config) continue;

  page = updateLocale(page, "es", config.es);
  page = updateLocale(page, "en", config.en);
  page = updateLocale(page, "zh", config.zh);

  page = removeOldSections(page);
  page = insertPreQuote(page, config);
  page = normalizeFinalActions(page, config);
  page = insertSticky(page, config);

  fs.writeFileSync(file, page);
  changed.push(file);
}

console.log("Páginas actualizadas:");
changed.forEach((file) => console.log(" - " + file));
