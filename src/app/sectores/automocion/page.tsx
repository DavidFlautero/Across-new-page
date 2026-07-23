"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "./Sector.module.css";

import SectorLeadForm from "@/app/sectores/alimentacion-bebidas/SectorLeadForm";
type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Transporte especial para",
    "heroTitle": "Automoción",
    "heroText": "Coordinamos transporte, almacenaje, distribución y operaciones especiales para componentes, repuestos, autopartes y proyectos de automoción con trazabilidad y control operativo.",
    "primaryCta": "Solicitar propuesta logística",
    "secondaryCta": "Hablar con un especialista",
    "activeLabel": "Operación automotriz activa",
    "activeRoute": "Proveedor → Planta",
    "activeCargo": "Autopartes y componentes",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En coordinación",
    "activeEtaLabel": "Prioridad:",
    "activeEta": "Línea productiva",
    "trust": [
      [
        "Just in time",
        "Continuidad operativa"
      ],
      [
        "Autopartes",
        "Componentes críticos"
      ],
      [
        "Trazabilidad",
        "Control de avance"
      ],
      [
        "Distribución",
        "Entrega coordinada"
      ]
    ],
    "overviewEyebrow": "Expertos en el sector de:",
    "overviewTitle": "Transporte y logística especializada para Automoción.",
    "overviewText": "La industria del automóvil exige rapidez, precisión y una coordinación logística especialmente rigurosa. En Across Logistics gestionamos operaciones de transporte, importación y exportación para el sector de la automoción, optimizando la eficiencia de la cadena de suministro. Nuestra cobertura mundial y local nos permite coordinar cada operación con el objetivo de asegurar entregas en los tiempos previstos.",
    "overviewButton": "Hablar con un especialista",
    "pillars": [
      [
        "Continuidad productiva",
        "Coordinación de entregas para reducir interrupciones en planta o distribución."
      ],
      [
        "Control de componentes",
        "Gestión logística para autopartes, repuestos, equipos y piezas críticas."
      ],
      [
        "Operaciones urgentes",
        "Respuesta para envíos prioritarios que afectan producción o servicio."
      ],
      [
        "Distribución B2B",
        "Entregas hacia plantas, talleres, distribuidores o centros logísticos."
      ]
    ],
    "servicesEyebrow": "Soluciones especializadas",
    "servicesTitle": "Servicios logísticos para cada necesidad del sector.",
    "services": [
      [
        "Temperatura controlada",
        "Soluciones para productos perecederos y mercancías sensibles que requieren condiciones térmicas específicas."
      ],
      [
        "Transporte terrestre",
        "Distribución nacional e internacional con planificación de rutas, tiempos y entregas."
      ],
      [
        "Transporte aéreo",
        "Soluciones para operaciones urgentes, productos sensibles y mercancías de alto valor."
      ],
      [
        "Transporte marítimo",
        "Gestión de cargas internacionales adaptada al volumen, destino y necesidades de cada operación."
      ],
      [
        "Almacén y distribución",
        "Gestión de stock, preparación de pedidos y distribución hacia clientes, retail y centros logísticos."
      ],
      [
        "Servicios de aduanas",
        "Coordinación documental y aduanera para facilitar operaciones de importación y exportación."
      ]
    ],
    "useCasesEyebrow": "Cuándo necesita logística automotriz",
    "useCasesTitle": "Cuando la operación depende de que cada pieza llegue a tiempo.",
    "useCases": [
      [
        "Autopartes",
        "Movimientos recurrentes de componentes y repuestos."
      ],
      [
        "Línea productiva",
        "Entregas que impactan directamente en continuidad industrial."
      ],
      [
        "Distribuidores",
        "Abastecimiento hacia redes comerciales o técnicas."
      ],
      [
        "Repuestos críticos",
        "Cargas urgentes para reparación, garantía o servicio."
      ],
      [
        "Importadores",
        "Operaciones internacionales con control documental."
      ],
      [
        "Proyectos industriales",
        "Equipos, maquinaria o componentes especiales."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación automotriz clara desde la necesidad hasta la entrega.",
    "process": [
      [
        "Análisis de carga",
        "Revisamos tipo de pieza, volumen, urgencia y destino."
      ],
      [
        "Diseño logístico",
        "Definimos ruta, modalidad y tiempos de operación."
      ],
      [
        "Documentación",
        "Coordinamos requisitos comerciales, aduaneros y operativos."
      ],
      [
        "Ejecución",
        "Gestionamos retiro, transporte y conexión logística."
      ],
      [
        "Seguimiento",
        "Monitoreamos hitos críticos y avance."
      ],
      [
        "Entrega final",
        "Coordinamos recepción y cierre operativo."
      ]
    ],
    "bandTitle": "Logística automotriz diseñada para mantener la producción en movimiento.",
    "bandText": "Nuestro equipo coordina operaciones para empresas que necesitan puntualidad, control documental y respuesta profesional en cadenas automotrices.",
    "stats": [
      [
        "Just in time",
        "Continuidad de suministro"
      ],
      [
        "Autopartes",
        "Componentes críticos"
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su próxima operación automotriz.",
    "finalText": "Cuéntenos tipo de carga, origen, destino, urgencia y requisitos. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta automotriz",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Automotive sector",
    "heroTitle": "Logistics for automotive chains that cannot stop.",
    "heroText": "We coordinate transport, warehousing, distribution and special operations for components, spare parts, automotive parts and projects with traceability and operational control.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active automotive operation",
    "activeRoute": "Supplier → Plant",
    "activeCargo": "Parts and components",
    "activeStatusLabel": "Status:",
    "activeStatus": "In coordination",
    "activeEtaLabel": "Priority:",
    "activeEta": "Production line",
    "trust": [
      [
        "Just in time",
        "Operational continuity"
      ],
      [
        "Auto parts",
        "Critical components"
      ],
      [
        "Traceability",
        "Progress control"
      ],
      [
        "Distribution",
        "Coordinated delivery"
      ]
    ],
    "overviewEyebrow": "Automotive logistics",
    "overviewTitle": "Logistics precision for demanding industrial operations.",
    "overviewText": "The automotive industry requires punctual deliveries, document control, component availability and response to urgency. We design operations to keep the production chain moving.",
    "overviewButton": "Talk to a specialist",
    "pillars": [
      [
        "Production continuity",
        "Delivery coordination to reduce plant or distribution interruptions."
      ],
      [
        "Component control",
        "Logistics management for auto parts, spares, equipment and critical pieces."
      ],
      [
        "Urgent operations",
        "Priority shipments affecting production or service."
      ],
      [
        "B2B distribution",
        "Deliveries to plants, workshops, distributors or logistics centers."
      ]
    ],
    "servicesEyebrow": "Specialized solutions",
    "servicesTitle": "Logistics services for every sector need.",
    "services": [
      [
        "Temperature-controlled logistics",
        "Solutions for perishable and sensitive products requiring specific thermal conditions."
      ],
      [
        "Road transport",
        "Domestic and international distribution with coordinated routes, timing and deliveries."
      ],
      [
        "Air freight",
        "Solutions for urgent operations, sensitive products and high-value cargo."
      ],
      [
        "Ocean freight",
        "International cargo management adapted to volume, destination and operational requirements."
      ],
      [
        "Warehousing and distribution",
        "Stock management, order preparation and distribution to clients, retail and logistics centers."
      ],
      [
        "Customs services",
        "Customs and documentation coordination for efficient import and export operations."
      ]
    ],
    "useCasesEyebrow": "When automotive logistics is needed",
    "useCasesTitle": "When the operation depends on every part arriving on time.",
    "useCases": [
      [
        "Auto parts",
        "Recurring movements of components and spares."
      ],
      [
        "Production line",
        "Deliveries directly impacting industrial continuity."
      ],
      [
        "Distributors",
        "Supply to commercial or technical networks."
      ],
      [
        "Critical spares",
        "Urgent cargo for repair, warranty or service."
      ],
      [
        "Importers",
        "International operations with document control."
      ],
      [
        "Industrial projects",
        "Equipment, machinery or special components."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "A clear automotive operation from need to delivery.",
    "process": [
      [
        "Cargo analysis",
        "We review part type, volume, urgency and destination."
      ],
      [
        "Logistics design",
        "We define route, modality and operational timing."
      ],
      [
        "Documentation",
        "We coordinate commercial, customs and operational requirements."
      ],
      [
        "Execution",
        "We manage pickup, transport and logistics connection."
      ],
      [
        "Tracking",
        "We monitor critical milestones and progress."
      ],
      [
        "Final delivery",
        "We coordinate reception and closure."
      ]
    ],
    "bandTitle": "Automotive logistics designed to keep production moving.",
    "bandText": "Our team coordinates operations for companies needing punctuality, document control and professional response in automotive supply chains.",
    "stats": [
      [
        "Just in time",
        "Supply continuity"
      ],
      [
        "Auto parts",
        "Critical components"
      ],
      [
        "Traceability",
        "Operational tracking"
      ],
      [
        "Expert support",
        "Dedicated specialists"
      ]
    ],
    "finalTitle": "Let’s coordinate your next automotive operation.",
    "finalText": "Tell us cargo type, origin, destination, urgency and requirements. Our team will analyze the best logistics solution.",
    "finalPrimary": "Request automotive proposal",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "汽车行业",
    "heroTitle": "为不能停止的汽车供应链提供物流。",
    "heroText": "我们为汽车零部件、备件和项目协调运输、仓储、配送和特殊操作，并提供可追溯性和运营控制。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的汽车物流",
    "activeRoute": "供应商 → 工厂",
    "activeCargo": "零部件",
    "activeStatusLabel": "状态：",
    "activeStatus": "协调中",
    "activeEtaLabel": "优先级：",
    "activeEta": "生产线",
    "trust": [
      [
        "准时制",
        "运营连续性"
      ],
      [
        "汽车零件",
        "关键组件"
      ],
      [
        "可追溯性",
        "进度控制"
      ],
      [
        "配送",
        "协调交付"
      ]
    ],
    "overviewEyebrow": "汽车物流",
    "overviewTitle": "为高要求工业运营提供精准物流。",
    "overviewText": "汽车行业需要准时交付、文件控制、组件可用性和紧急响应。我们设计运营以保持生产链流动。",
    "overviewButton": "联系专家",
    "pillars": [
      [
        "生产连续性",
        "协调交付以减少工厂或配送中断。"
      ],
      [
        "组件控制",
        "管理汽车零件、备件、设备和关键组件。"
      ],
      [
        "紧急操作",
        "影响生产或服务的优先运输。"
      ],
      [
        "B2B 配送",
        "交付到工厂、维修点、经销商或物流中心。"
      ]
    ],
    "servicesEyebrow": "专业解决方案",
    "servicesTitle": "满足行业不同需求的专业物流服务。",
    "services": [
      [
        "温控物流",
        "为易腐和温度敏感产品提供专业温控运输解决方案。"
      ],
      [
        "陆路运输",
        "通过路线、时间和交付规划协调国内及国际配送。"
      ],
      [
        "航空运输",
        "为紧急运输、敏感产品和高价值货物提供解决方案。"
      ],
      [
        "海运",
        "根据货量、目的地和运营需求管理国际海运业务。"
      ],
      [
        "仓储与配送",
        "提供库存管理、订单准备以及客户和零售配送服务。"
      ],
      [
        "海关服务",
        "协调进出口业务所需的海关和文件流程。"
      ]
    ],
    "useCasesEyebrow": "何时需要汽车物流",
    "useCasesTitle": "当每个零件都必须准时到达时。",
    "useCases": [
      [
        "汽车零件",
        "组件和备件的经常性运输。"
      ],
      [
        "生产线",
        "直接影响工业连续性的交付。"
      ],
      [
        "经销网络",
        "商业或技术网络供应。"
      ],
      [
        "关键备件",
        "维修、保修或服务的紧急货物。"
      ],
      [
        "进口商",
        "带文件控制的国际操作。"
      ],
      [
        "工业项目",
        "设备、机械或特殊组件。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从需求到交付，汽车物流清晰可控。",
    "process": [
      [
        "货物分析",
        "审核零件类型、体量、紧急程度和目的地。"
      ],
      [
        "物流设计",
        "确定路线、方式和时间。"
      ],
      [
        "文件管理",
        "协调商业、海关和运营要求。"
      ],
      [
        "执行",
        "管理提货、运输和物流衔接。"
      ],
      [
        "跟踪",
        "监控关键节点和进度。"
      ],
      [
        "最终交付",
        "协调接收和关闭。"
      ]
    ],
    "bandTitle": "为保持生产流动而设计的汽车物流。",
    "bandText": "我们的团队为需要准时、文件控制和专业响应的汽车供应链企业协调运营。",
    "stats": [
      [
        "准时制",
        "供应连续性"
      ],
      [
        "汽车零件",
        "关键组件"
      ],
      [
        "可追溯性",
        "运营跟踪"
      ],
      [
        "专家支持",
        "专属专家"
      ]
    ],
    "finalTitle": "让我们协调您的下一次汽车物流操作。",
    "finalText": "告诉我们货物类型、始发地、目的地、紧急程度和要求。我们的团队将分析最佳物流方案。",
    "finalPrimary": "申请汽车物流方案",
    "finalSecondary": "联系专家"
  }
} satisfies Record<Locale, any>;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";

  const saved =
    window.localStorage.getItem("locale") ||
    window.localStorage.getItem("across-locale");

  if (saved === "en" || saved === "zh" || saved === "es") return saved;

  const htmlLang = document.documentElement.lang;
  if (htmlLang === "en" || htmlLang === "zh" || htmlLang === "es") return htmlLang;

  return "es";
}

type IconName =
  | "timer"
  | "shield"
  | "document"
  | "tracking"
  | "airport"
  | "box"
  | "plane"
  | "diamond"
  | "charter"
  | "globe"
  | "door"
  | "gear"
  | "laptop"
  | "medical"
  | "cart"
  | "search"
  | "route"
  | "package"
  | "truck"
  | "headset";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 38,
    height: 38,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "timer":
      return (
        <svg {...common}>
          <path d="M12 8v5l3 2" />
          <path d="M9 2h6" />
          <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.4 2.8 8.3 7 10 4.2-1.7 7-5.6 7-10V6l-7-3Z" />
          <path d="m9.5 12 1.8 1.8 3.7-4" />
        </svg>
      );

    case "document":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M14 3v5h5" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </svg>
      );

    case "tracking":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );

    case "airport":
      return (
        <svg {...common}>
          <path d="M3 19h18" />
          <path d="M5 19V9h14v10" />
          <path d="M7 12h2" />
          <path d="M11 12h2" />
          <path d="M15 12h2" />
          <path d="M8 19v-4h8v4" />
          <path d="M4 9h16" />
          <path d="M9 6h6" />
          <path d="M12 3v3" />
          <path d="M2.8 6.8 8.5 5.2" />
          <path d="m15.5 5.2 5.7 1.6" />
        </svg>
      );

    case "box":
      return (
        <svg {...common}>
          <path d="m21 8-9-5-9 5 9 5 9-5Z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        </svg>
      );

    case "plane":
      return (
        <svg {...common}>
          <path d="M10.5 13.5 3 21l2.8-8.2L3 10l9 1 5.7-5.7a2.1 2.1 0 0 1 3 3L15 14l1 9-2.8-2.8L5 23l7.5-7.5" />
        </svg>
      );

    case "diamond":
      return (
        <svg {...common}>
          <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
          <path d="M2 9h20" />
          <path d="m9 3 3 6 3-6" />
          <path d="m8 9 4 12 4-12" />
        </svg>
      );

    case "charter":
      return (
        <svg {...common}>
          <path d="M2 16 22 7l-7 10-4-4-4 7-2-2 3-6-6 4Z" />
        </svg>
      );

    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21" />
          <path d="M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9" />
        </svg>
      );

    case "door":
      return (
        <svg {...common}>
          <path d="M6 21V4a1 1 0 0 1 1-1h10v18" />
          <path d="M10 12h.01" />
          <path d="M4 21h16" />
        </svg>
      );

    case "gear":
      return (
        <svg {...common}>
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M19.4 15a1.8 1.8 0 0 0 .36 2l.05.05a2 2 0 1 1-2.83 2.83l-.05-.05a1.8 1.8 0 0 0-2-.36 1.8 1.8 0 0 0-1 1.63V21a2 2 0 1 1-4 0v-.07a1.8 1.8 0 0 0-1-1.63 1.8 1.8 0 0 0-2 .36l-.05.05a2 2 0 1 1-2.83-2.83l.05-.05a1.8 1.8 0 0 0 .36-2 1.8 1.8 0 0 0-1.63-1H3a2 2 0 1 1 0-4h.07a1.8 1.8 0 0 0 1.63-1 1.8 1.8 0 0 0-.36-2l-.05-.05A2 2 0 1 1 7.12 3.95l.05.05a1.8 1.8 0 0 0 2 .36 1.8 1.8 0 0 0 1-1.63V3a2 2 0 1 1 4 0v.07a1.8 1.8 0 0 0 1 1.63 1.8 1.8 0 0 0 2-.36l.05-.05a2 2 0 1 1 2.83 2.83l-.05.05a1.8 1.8 0 0 0-.36 2 1.8 1.8 0 0 0 1.63 1H21a2 2 0 1 1 0 4h-.07a1.8 1.8 0 0 0-1.53 1Z" />
        </svg>
      );

    case "laptop":
      return (
        <svg {...common}>
          <path d="M5 5h14v10H5z" />
          <path d="M3 19h18" />
          <path d="M8 19h8" />
        </svg>
      );

    case "medical":
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
          <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
        </svg>
      );

    case "cart":
      return (
        <svg {...common}>
          <path d="M6 6h15l-2 8H8L6 3H3" />
          <circle cx="9" cy="20" r="1" />
          <circle cx="18" cy="20" r="1" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      );

    case "route":
      return (
        <svg {...common}>
          <path d="M4 6h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h11" />
          <path d="M4 6l3-3" />
          <path d="M4 6l3 3" />
        </svg>
      );

    case "package":
      return (
        <svg {...common}>
          <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" />
          <path d="M12 12 4 7.5" />
          <path d="M12 12v9" />
          <path d="m12 12 8-4.5" />
        </svg>
      );

    case "truck":
      return (
        <svg {...common}>
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );

    case "headset":
      return (
        <svg {...common}>
          <path d="M4 13a8 8 0 0 1 16 0" />
          <path d="M4 13v4a2 2 0 0 0 2 2h2v-7H6a2 2 0 0 0-2 2Z" />
          <path d="M20 13v4a2 2 0 0 1-2 2h-2v-7h2a2 2 0 0 1 2 2Z" />
          <path d="M16 19c0 1.1-.9 2-2 2h-2" />
        </svg>
      );
  }
}

export default function AutomocionSectorPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const updateLocale = (event?: Event) => {
      const rawDetail = event instanceof CustomEvent ? event.detail : null;

      const next =
        typeof rawDetail === "string"
          ? rawDetail
          : rawDetail && typeof rawDetail === "object" && "locale" in rawDetail
            ? String((rawDetail as { locale?: unknown }).locale)
            : rawDetail && typeof rawDetail === "object" && "language" in rawDetail
              ? String((rawDetail as { language?: unknown }).language)
              : null;

      if (next === "es" || next === "en" || next === "zh") {
        setLocale(next);
        return;
      }

      setLocale(getInitialLocale());
    };

    updateLocale();

    window.addEventListener("storage", updateLocale);
    window.addEventListener("languagechange", updateLocale);
    window.addEventListener("localechange", updateLocale);
    window.addEventListener("across-language-change", updateLocale);
    window.addEventListener("across-locale-change", updateLocale);

    return () => {
      window.removeEventListener("storage", updateLocale);
      window.removeEventListener("languagechange", updateLocale);
      window.removeEventListener("localechange", updateLocale);
      window.removeEventListener("across-language-change", updateLocale);
      window.removeEventListener("across-locale-change", updateLocale);
    };
  }, []);

  const t = copy[locale];

const operationalEyebrow =
    locale === "es"
      ? "Capacidad operativa"
      : locale === "en"
        ? "Operational capability"
        : "运营能力";

  const operationalTitle =
    locale === "es"
      ? "Logística de precisión para mantener la continuidad de la cadena automotriz."
      : locale === "en"
        ? "Precision logistics to maintain continuity across the automotive supply chain."
        : "保障汽车供应链连续性的精准物流。";

  const operationalIntro =
    locale === "es"
      ? "Coordinamos el transporte de componentes, piezas y suministros para fabricantes, proveedores y centros de distribución del sector automotriz. Cada operación se planifica según los ciclos de producción, las ventanas de recepción y la criticidad de la mercancía, integrando consolidación, transporte internacional y seguimiento para reducir interrupciones en la cadena de suministro."
      : locale === "en"
        ? "We coordinate the transport of components, parts and supplies for automotive manufacturers, suppliers and distribution centers. Each operation is planned around production cycles, receiving windows and cargo criticality, integrating consolidation, international transport and tracking to reduce supply chain disruptions."
        : "我们为汽车制造商、供应商和配送中心协调零部件及生产物料运输，并根据生产周期、收货时间窗口和货物重要程度规划每项运营，通过集运、国际运输和全程跟踪降低供应链中断风险。";

  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Abastecimiento y secuenciación",
            title: "Componentes coordinados según el ritmo de producción.",
            text:
              "Organizamos recogidas y flujos de abastecimiento considerando proveedores, volúmenes, frecuencias y ventanas de recepción para mantener continuidad en planta.",
            details: [
              "Recogidas y consolidación de proveedores",
              "Planificación de frecuencias y rutas",
              "Coordinación de ventanas de recepción"
            ]
          },
          {
            number: "02",
            eyebrow: "Piezas críticas y transporte",
            title: "Respuesta logística para operaciones que no pueden detenerse.",
            text:
              "Gestionamos componentes, autopartes y repuestos sensibles al tiempo mediante soluciones adaptadas a la urgencia y al impacto que cada pieza puede tener sobre la producción.",
            details: [
              "Transporte de componentes y autopartes",
              "Envíos urgentes para piezas críticas",
              "Soluciones terrestres, aéreas y multimodales"
            ]
          },
          {
            number: "03",
            eyebrow: "Control y entrega en planta",
            title: "Visibilidad operativa hasta la recepción final.",
            text:
              "Supervisamos los principales hitos del transporte y coordinamos documentación, aduanas y entrega para responder ante desviaciones que puedan afectar la continuidad de suministro.",
            details: [
              "Seguimiento de hitos críticos",
              "Coordinación documental y aduanera",
              "Gestión de incidencias y desvíos"
            ]
          }
        ]
      : locale === "en"
        ? [
          {
            number: "01",
            eyebrow: "Supply and sequencing",
            title: "Components coordinated around production requirements.",
            text:
              "We organize collections and supply flows according to suppliers, volumes, frequencies and receiving windows to maintain plant continuity.",
            details: [
              "Supplier collections and consolidation",
              "Route and frequency planning",
              "Receiving-window coordination"
            ]
          },
          {
            number: "02",
            eyebrow: "Critical parts and transport",
            title: "Logistics response for operations that cannot stop.",
            text:
              "We manage time-sensitive components, automotive parts and spares through solutions adapted to urgency and their potential impact on production.",
            details: [
              "Component and automotive-parts transport",
              "Urgent shipments for critical parts",
              "Road, air and multimodal solutions"
            ]
          },
          {
            number: "03",
            eyebrow: "Control and plant delivery",
            title: "Operational visibility through final reception.",
            text:
              "We monitor key transport milestones and coordinate documentation, customs and delivery to respond to deviations that could affect supply continuity.",
            details: [
              "Critical milestone tracking",
              "Customs and document coordination",
              "Incident and deviation management"
            ]
          }
        ]
      : [
          {
            number: "01",
            eyebrow: "供应与生产排序",
            title: "根据生产节奏协调零部件供应。",
            text:
              "根据供应商、货量、运输频率和工厂收货时间窗口组织提货与供应流，保持生产连续性。",
            details: [
              "供应商提货与集运",
              "运输路线与频率规划",
              "工厂收货时间窗口协调"
            ]
          },
          {
            number: "02",
            eyebrow: "关键零部件与运输",
            title: "为不能中断的生产运营提供物流响应。",
            text:
              "根据紧急程度和对生产的影响，协调对时效敏感的汽车零部件和备件运输。",
            details: [
              "汽车零部件运输",
              "关键配件紧急运输",
              "陆运、空运及多式联运"
            ]
          },
          {
            number: "03",
            eyebrow: "控制与工厂交付",
            title: "保持运营可视化直至最终收货。",
            text:
              "跟踪主要运输节点，并协调文件、海关和最终交付，以应对可能影响供应连续性的运输偏差。",
            details: [
              "关键运输节点跟踪",
              "海关及文件协调",
              "异常与运输偏差管理"
            ]
          }
        ];

  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.hero} data-aereo-hero="true" data-service-hero-home="true"
      >
          <Image
            src="/images/sectores/transporte-logistica-automocion.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/transporte-logistica-automocion.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 0px"
            className={`${styles.heroImage} ${styles.heroImageMobile}`}
          />

          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}
      >
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>{t.heroEyebrow}</span>
              <h1 className={styles.title}>{t.heroTitle}</h1>
              <p className={styles.subtitle}>{t.heroText}</p>

              <div className={styles.actions}>
                <Link href="/cotizacion" className={styles.primaryBtn}>{t.primaryCta}</Link>
              </div>
            </div>

            <div className={styles.operationCard}>
              <span>{t.activeLabel}</span>
              <strong>{t.activeRoute}</strong>
              <p>{t.activeCargo}</p>

              <div>
                <small>{t.activeStatusLabel}</small>
                <b>{t.activeStatus}</b>
              </div>

              <div>
                <small>{t.activeEtaLabel}</small>
                <em>{t.activeEta}</em>
              </div>
            </div>
          </div>

          <div className={styles.commandBar} data-aereo-trust="true">
            {t.trust.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["timer", "shield", "document", "tracking"];

              return (
                <div key={title} className={styles.commandItem}>
                  <i>
                    <Icon name={icons[index]} />
                  </i>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              );
            })}
          </div>
        </section>
        <section className={styles.overview}>
          <div className={styles.overviewCopy}>
            <span className={styles.eyebrow}>{t.overviewEyebrow}</span>
            <h2>{t.overviewTitle}</h2>
            <p>{t.overviewText}</p>
            <Link href="/contacto">{t.overviewButton}</Link>
          </div>

          <div className={styles.pillars}>
            {t.pillars.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["airport", "document", "tracking", "truck"];

              return (
                <article key={title}>
                  <i>
                    <Icon name={icons[index]} />
                  </i>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/autmocion11.png')" } as CSSProperties}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.servicesEyebrow}</span>
            <h2>{t.servicesTitle}</h2>
          </div>

          <div className={styles.serviceGrid}>
            {t.services.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["timer", "truck", "plane", "globe", "box", "document"];

              return (
                <article key={title}>
                  <i>
                    <Icon name={icons[index]} />
                  </i>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.useCases} data-mobile-hide-after-cert="true">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.useCasesEyebrow}</span>
            <h2>{t.useCasesTitle}</h2>
          </div>

          <div className={styles.useCaseGrid}>
            {t.useCases.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["gear", "laptop", "package", "medical", "cart", "document"];

              return (
                <article key={title}>
                  <i>
                    <Icon name={icons[index]} />
                  </i>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.operationalModel}>
          <div className={styles.operationalModelInner}>

            <header className={styles.operationalModelHead}>
              <span className={styles.operationalModelEyebrow}>
                {operationalEyebrow}
              </span>

              <h2>{operationalTitle}</h2>

              <p>{operationalIntro}</p>
            </header>

            <div className={styles.operationalStages}>
              {operationalStages.map((stage) => (
                <article
                  key={stage.number}
                  className={styles.operationalStage}
                >
                  <div className={styles.operationalStageNumber}>
                    {stage.number}
                  </div>

                  <div className={styles.operationalStageMain}>
                    <span>{stage.eyebrow}</span>

                    <h3>{stage.title}</h3>

                    <p>{stage.text}</p>
                  </div>

                  <ul className={styles.operationalStageDetails}>
                    {stage.details.map((detail) => (
                      <li key={detail}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

          </div>
        </section>

        <Certifications />

        <SectorLeadForm />

</main>

      <Footer />
    </div>
  );
}
