"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import RelatedServices from "@/app/servicios/_shared/RelatedServices";
import styles from "./Servicio.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Sector automoción",
    "heroTitle": "Logística para cadenas automotrices que no pueden detenerse.",
    "heroText": "Coordinamos transporte, almacenaje, distribución y operaciones especiales para componentes, repuestos, autopartes y proyectos de automoción con trazabilidad y control operativo.",
    "primaryCta": "Solicitar cotización",
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
    "overviewEyebrow": "Logística automotriz",
    "overviewTitle": "Precisión logística para operaciones industriales de alta exigencia.",
    "overviewText": "La industria automotriz requiere entregas puntuales, control documental, disponibilidad de componentes y respuesta ante urgencias. Diseñamos operaciones para mantener la cadena productiva en movimiento.",
    "overviewButton": "Conocer más sobre automoción",
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
    "servicesEyebrow": "Soluciones para automoción",
    "servicesTitle": "Operaciones diseñadas para la cadena automotriz.",
    "services": [
      [
        "Transporte terrestre",
        "Rutas nacionales e internacionales para autopartes y componentes."
      ],
      [
        "Carga urgente",
        "Soluciones prioritarias para repuestos o piezas críticas."
      ],
      [
        "Almacenaje",
        "Gestión de stock, preparación y distribución de componentes."
      ],
      [
        "Importación y exportación",
        "Coordinación documental y aduanera para comercio internacional."
      ],
      [
        "Cargas especiales",
        "Transporte de equipos, maquinaria o piezas de gran volumen."
      ],
      [
        "Door to door",
        "Flujo completo desde proveedor hasta planta o destino final."
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
    "primaryCta": "Request quotation",
    "secondaryCta": "Talk to a specialist",
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
    "overviewButton": "Learn more about automotive",
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
    "servicesEyebrow": "Automotive solutions",
    "servicesTitle": "Operations designed for the automotive chain.",
    "services": [
      [
        "Road transport",
        "Domestic and international routes for auto parts and components."
      ],
      [
        "Urgent cargo",
        "Priority solutions for spares or critical pieces."
      ],
      [
        "Warehousing",
        "Stock management, preparation and component distribution."
      ],
      [
        "Import and export",
        "Document and customs coordination for international trade."
      ],
      [
        "Special cargo",
        "Transport of equipment, machinery or large parts."
      ],
      [
        "Door to door",
        "Full flow from supplier to plant or final destination."
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
    "primaryCta": "申请报价",
    "secondaryCta": "联系专家",
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
    "overviewButton": "了解汽车物流",
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
    "servicesEyebrow": "汽车行业解决方案",
    "servicesTitle": "为汽车供应链设计的运营。",
    "services": [
      [
        "陆运",
        "汽车零部件的国内和国际路线。"
      ],
      [
        "紧急货物",
        "备件或关键部件的优先方案。"
      ],
      [
        "仓储",
        "库存管理、准备和组件配送。"
      ],
      [
        "进出口",
        "国际贸易文件与海关协调。"
      ],
      [
        "特殊货物",
        "设备、机械或大型零件运输。"
      ],
      [
        "门到门",
        "从供应商到工厂或最终目的地的完整流程。"
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

export default function AutomocionPage() {
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

  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.hero}>
          <Image
            src="/images/sectores/transporte-logistica-automocion.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/automocion2.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 0px"
            className={`${styles.heroImage} ${styles.heroImageMobile}`}
          />

          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>{t.heroEyebrow}</span>
              <h1>{t.heroTitle}</h1>
              <p>{t.heroText}</p>

              <div className={styles.actions}>
                <Link href="/cotizacion">{t.primaryCta}</Link>
                <Link href="/contacto">{t.secondaryCta}</Link>
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
        </section>

        <section className={styles.trustBar}>
          {t.trust.map(([title, text]: string[], index: number) => {
            const icons: IconName[] = ["truck", "package", "shield", "route", "tracking", "door"];

            return (
              <div key={title}>
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
        </section>

        <Certifications />

        <section className={styles.overview}>
          <div className={styles.overviewCopy}>
            <span className={styles.eyebrow}>{t.overviewEyebrow}</span>
            <h2>{t.overviewTitle}</h2>
            <p>{t.overviewText}</p>
            <Link href="/contacto">{t.overviewButton}</Link>
          </div>

          <div className={styles.pillars}>
            {t.pillars.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["search", "package", "document", "route", "tracking", "truck"];

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

        <section className={styles.services}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.servicesEyebrow}</span>
            <h2>{t.servicesTitle}</h2>
          </div>

          <div className={styles.serviceGrid}>
            {t.services.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["plane", "box", "diamond", "charter", "globe", "door"];

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

        <section className={styles.useCases}>
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

        <section className={styles.process}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.processEyebrow}</span>
            <h2>{t.processTitle}</h2>
          </div>

          <div className={styles.processGrid}>
            {t.process.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["search", "route", "document", "plane", "tracking", "truck"];

              return (
                <article key={title}>
                  <strong>{index + 1}</strong>
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

        <section className={styles.darkBand}>
          <div className={styles.darkBandImage}>
            <Image
              src="/images/sectores/automocion2.png"
              alt={t.bandTitle}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>

          <div className={styles.darkBandContent}>
            <h2>{t.bandTitle}</h2>
            <p>{t.bandText}</p>

            <div className={styles.stats}>
              {t.stats.map(([value, label]: string[]) => (
                <article key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>

            <div className={styles.darkBandActions}>
              <Link href="/cotizacion">{t.finalPrimary}</Link>
              <Link href="/contacto">{t.finalSecondary}</Link>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div>
            <h2>{t.finalTitle}</h2>
            <p>{t.finalText}</p>

            <div className={styles.finalActions}>
              <Link href="/cotizacion">{t.finalPrimary}</Link>
              <Link href="/contacto">{t.finalSecondary}</Link>
            </div>
          </div>

          <div className={styles.finalImage}>
            <Image
              src="/images/sectores/transporte-logistica-automocion.png"
              alt={t.finalTitle}
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
        </section>

        <RelatedServices current="e-commerce" locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
