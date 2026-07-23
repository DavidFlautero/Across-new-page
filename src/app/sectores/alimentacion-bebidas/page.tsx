"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "./Sector.module.css";

import SectorLeadForm from "./SectorLeadForm";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Transporte especial para",
    "heroTitle": "Alimentos y Bebidas",
    "heroText": "Soluciones logísticas para alimentos y bebidas, con control, trazabilidad y cadena de frío cuando el producto lo requiere.",
    "primaryCta": "Solicitar propuesta logística",
    "secondaryCta": "Hablar con un especialista",
    "activeLabel": "Operación alimentaria activa",
    "activeRoute": "Proveedor → Distribución",
    "activeCargo": "Alimentos y bebidas",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En coordinación",
    "activeEtaLabel": "Prioridad:",
    "activeEta": "Entrega segura",
    "trust": [
      [
        "Trazabilidad",
        "Control operativo"
      ],
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Cadena de frío",
        "Cuando aplica"
      ],
      [
        "Cumplimiento",
        "Documentación y control"
      ]
    ],
    "overviewEyebrow": "Expertos en el sector de:",
    "overviewTitle": "Transporte y logística especializada para Alimentos y Bebidas.",
    "overviewText": "El transporte de alimentos y bebidas exige precisión, trazabilidad y capacidad de respuesta. Diseñamos soluciones para mercancía perecedera, productos con temperatura controlada y operaciones nacionales e internacionales, adaptando cada movimiento a los requisitos del producto, el mercado y el destino.",
    "overviewButton": "Hablar con un especialista",
    "pillars": [
      [
        "Control de producto",
        "Coordinación según tipo de mercancía, sensibilidad, rotación y requisitos de entrega."
      ],
      [
        "Distribución eficiente",
        "Planificación de salidas, rutas y entregas para clientes, retail o puntos de venta."
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo para mantener visibilidad de la mercancía."
      ],
      [
        "Cadena de frío",
        "Soluciones con control térmico cuando el producto lo requiere."
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
            "Control de tiempos y condiciones para facilitar operaciones de importación y exportación."
      ]
],
    "useCasesEyebrow": "Cuándo necesita logística especializada",
    "useCasesTitle": "Cuando el producto debe llegar bien, a tiempo y bajo control.",
    "useCases": [
      [
        "Alimentos perecederos",
        "Operaciones que requieren tiempos precisos y control de condiciones."
      ],
      [
        "Bebidas",
        "Distribución de productos embotellados, envasados o de alto volumen."
      ],
      [
        "Retail y supermercados",
        "Entregas programadas hacia cadenas y puntos de venta."
      ],
      [
        "Importadores",
        "Gestión integral para productos alimentarios internacionales."
      ],
      [
        "Campañas comerciales",
        "Picos de demanda y entregas de alta rotación."
      ],
      [
        "Productos sensibles",
        "Mercancía que requiere cuidado, trazabilidad o control térmico."
      ]
    ],
    "processEyebrow": "Nuestro proceso",
    "processTitle": "Una operación clara y coordinada de principio a fin.",
    "process": [
      [
            "Analizamos la mercancía",
            "Revisamos el producto, sensibilidad, volumen, origen, destino y requisitos específicos."
      ],
      [
            "Diseñamos la solución",
            "Definimos transporte, temperatura, almacenamiento, documentación y tiempos según la operación."
      ],
      [
            "Coordinamos y monitorizamos",
            "Gestionamos la ejecución y el seguimiento de cada hito para mantener visibilidad y control."
      ],
      [
            "Entregamos",
            "Coordinamos la entrega final y el cierre operativo asegurando continuidad y cumplimiento."
      ]
],
    "bandTitle": "Logística alimentaria diseñada para proteger producto y continuidad.",
    "bandText": "Nuestro equipo coordina operaciones para empresas que necesitan puntualidad, trazabilidad y respuesta profesional en alimentos, bebidas y productos de consumo.",
    "stats": [
      [
        "Trazabilidad",
        "Seguimiento operativo"
      ],
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Cadena de frío",
        "Cuando aplica"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "¿Necesita transportar alimentos o bebidas?",
    "finalText": "Cuéntenos las características de su mercancía, origen y destino. Nuestro equipo diseñará una solución adaptada a sus necesidades de transporte, control y conservación.",
    "finalPrimary": "Solicitar propuesta logística",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Food and beverage sector",
    "heroTitle": "Logistics for products that demand timing, control and trust.",
    "heroText": "We design logistics operations for food, beverages, perishables and consumer products, integrating transport, warehousing, distribution, traceability and operational control.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active food operation",
    "activeRoute": "Supplier → Distribution",
    "activeCargo": "Food and beverages",
    "activeStatusLabel": "Status:",
    "activeStatus": "In coordination",
    "activeEtaLabel": "Priority:",
    "activeEta": "Safe delivery",
    "trust": [
      [
        "Traceability",
        "Operational control"
      ],
      [
        "Distribution",
        "Coordinated deliveries"
      ],
      [
        "Cold chain",
        "When required"
      ],
      [
        "Compliance",
        "Documentation and control"
      ]
    ],
    "overviewEyebrow": "Sector expertise",
    "overviewTitle": "Experts in transport and logistics for the Food and Beverage sector.",
    "overviewText": "Food and beverage transport demands precision, traceability and responsiveness. We design solutions for perishable goods, temperature-controlled products and domestic and international operations, adapting every movement to the product, market and destination requirements.",
    "overviewButton": "Talk to a specialist",
    "pillars": [
      [
        "Product control",
        "Coordination according to goods type, sensitivity, rotation and delivery requirements."
      ],
      [
        "Efficient distribution",
        "Planning of dispatches, routes and deliveries for clients, retail or points of sale."
      ],
      [
        "Traceability",
        "Operational tracking to maintain cargo visibility."
      ],
      [
        "Cold chain",
        "Temperature-controlled solutions when the product requires it."
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
    "useCasesEyebrow": "When specialized logistics is needed",
    "useCasesTitle": "When the product must arrive properly, on time and under control.",
    "useCases": [
      [
        "Perishable food",
        "Operations requiring precise timing and condition control."
      ],
      [
        "Beverages",
        "Distribution of bottled, packaged or high-volume products."
      ],
      [
        "Retail and supermarkets",
        "Scheduled deliveries to chains and points of sale."
      ],
      [
        "Importers",
        "Integrated management for international food products."
      ],
      [
        "Commercial campaigns",
        "Demand peaks and high-rotation deliveries."
      ],
      [
        "Sensitive products",
        "Goods requiring care, traceability or thermal control."
      ]
    ],
    "processEyebrow": "Our process",
    "processTitle": "A clear and coordinated operation from start to finish.",
    "process": [
      [
            "We analyze the cargo",
            "We review the product, sensitivity, volume, origin, destination and specific requirements."
      ],
      [
            "We design the solution",
            "We define transport, temperature, warehousing, documentation and timing."
      ],
      [
            "We coordinate and monitor",
            "We manage execution and track every milestone to maintain visibility and control."
      ],
      [
            "We deliver",
            "We coordinate final delivery and operational closure, ensuring continuity and compliance."
      ]
],
    "bandTitle": "Food logistics designed to protect product and continuity.",
    "bandText": "Our team coordinates operations for companies that need punctuality, traceability and professional response in food, beverages and consumer products.",
    "stats": [
      [
        "Traceability",
        "Operational tracking"
      ],
      [
        "Distribution",
        "Coordinated deliveries"
      ],
      [
        "Cold chain",
        "When required"
      ],
      [
        "Expert support",
        "Dedicated specialists"
      ]
    ],
    "finalTitle": "Do you need to transport food or beverages?",
    "finalText": "Tell us about your cargo, origin and destination. Our team will design a solution adapted to your transport, control and preservation requirements.",
    "finalPrimary": "Request logistics proposal",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "食品与饮料行业",
    "heroTitle": "为需要时间、控制和信任的产品提供物流。",
    "heroText": "我们为食品、饮料、易腐品和消费品设计物流运营，整合运输、仓储、配送、可追溯性和运营控制。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的食品操作",
    "activeRoute": "供应商 → 配送",
    "activeCargo": "食品与饮料",
    "activeStatusLabel": "状态：",
    "activeStatus": "协调中",
    "activeEtaLabel": "优先级：",
    "activeEta": "安全交付",
    "trust": [
      [
        "可追溯性",
        "运营控制"
      ],
      [
        "配送",
        "协调交付"
      ],
      [
        "冷链",
        "按需提供"
      ],
      [
        "合规",
        "文件与控制"
      ]
    ],
    "overviewEyebrow": "行业专业能力",
    "overviewTitle": "食品与饮料行业运输和物流专家。",
    "overviewText": "食品与饮料运输需要精准、可追溯性和快速响应能力。我们为易腐产品、温控货物以及国内和国际业务设计物流解决方案，根据产品、市场和目的地的具体要求规划每一次运输。",
    "overviewButton": "联系专家",
    "pillars": [
      [
        "产品控制",
        "根据货物类型、敏感性、周转和交付要求进行协调。"
      ],
      [
        "高效配送",
        "为客户、零售或销售点规划出库、路线和交付。"
      ],
      [
        "可追溯性",
        "通过运营跟踪保持货物可视化。"
      ],
      [
        "冷链",
        "当产品需要时提供温控解决方案。"
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
    "useCasesEyebrow": "何时需要专业物流",
    "useCasesTitle": "当产品必须完好、准时且受控到达时。",
    "useCases": [
      [
        "易腐食品",
        "需要精准时间和条件控制的操作。"
      ],
      [
        "饮料",
        "瓶装、包装或大批量产品配送。"
      ],
      [
        "零售与超市",
        "向连锁和销售点进行计划交付。"
      ],
      [
        "进口商",
        "为国际食品提供综合管理。"
      ],
      [
        "商业活动",
        "需求高峰和高周转交付。"
      ],
      [
        "敏感产品",
        "需要保护、可追溯或温控的货物。"
      ]
    ],
    "processEyebrow": "我们的流程",
    "processTitle": "从开始到交付，清晰且协调的物流运营。",
    "process": [
      [
            "分析货物",
            "审核产品、敏感性、数量、始发地、目的地和具体要求。"
      ],
      [
            "设计解决方案",
            "确定运输方式、温控、仓储、文件和时间安排。"
      ],
      [
            "协调与监控",
            "管理运营执行并跟踪关键节点，保持全程可视和可控。"
      ],
      [
            "完成交付",
            "协调最终交付和运营关闭，确保连续性与合规。"
      ]
],
    "bandTitle": "为保护产品和连续性而设计的食品物流。",
    "bandText": "我们的团队为食品、饮料和消费品企业协调需要准时、可追溯和专业响应的运营。",
    "stats": [
      [
        "可追溯性",
        "运营跟踪"
      ],
      [
        "配送",
        "协调交付"
      ],
      [
        "冷链",
        "按需提供"
      ],
      [
        "专家支持",
        "专属专家"
      ]
    ],
    "finalTitle": "您需要运输食品或饮料吗？",
    "finalText": "请告诉我们货物特点、始发地和目的地。我们的团队将根据运输、控制和保存要求设计合适的物流解决方案。",
    "finalPrimary": "申请物流方案",
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

export default function AlimentacionBebidasSectorPage() {
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
      ? "Control de producto y continuidad para alimentos y bebidas."
      : locale === "en"
        ? "Product control and continuity for food and beverage operations."
        : "食品与饮料物流中的产品控制与供应连续性。";

  const operationalIntro =
    locale === "es"
      ? "Gestionamos operaciones adaptadas a las condiciones de cada alimento o bebida, coordinando conservación, tiempos de tránsito, transporte y distribución. Cuando el producto lo requiere, integramos control térmico y seguimiento operativo para proteger la mercancía y mantener la continuidad desde el origen hasta la entrega."
      : locale === "en"
        ? "We manage operations adapted to the requirements of each food and beverage product, coordinating preservation, transit times, transport and distribution. When required, we integrate temperature control and operational tracking to protect the cargo and maintain continuity from origin through final delivery."
        : "我们根据不同食品和饮料产品的要求管理物流运营，协调储存条件、运输时效、运输方式和配送。必要时整合温度控制和运营跟踪，确保货物从始发地到最终交付始终受到保护。";

  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Conservación y preparación",
            title: "Condiciones definidas antes de mover la mercancía.",
            text:
              "Preparamos cada operación teniendo en cuenta la sensibilidad del producto, sus necesidades de conservación y las condiciones necesarias para mantener su calidad.",
            details: [
              "Cadena de frío cuando aplica",
              "Control de conservación y manipulación",
              "Preparación según producto y destino"
            ]
          },
          {
            number: "02",
            eyebrow: "Transporte y control",
            title: "La mercancía bajo control durante todo el trayecto.",
            text:
              "Coordinamos la modalidad de transporte, los tiempos de tránsito y los principales hitos operativos para mantener continuidad durante el movimiento.",
            details: [
              "Transporte nacional e internacional",
              "Control de tiempos de tránsito",
              "Coordinación documental y aduanera"
            ]
          },
          {
            number: "03",
            eyebrow: "Distribución y entrega",
            title: "Coordinación hasta el punto final de recepción.",
            text:
              "Organizamos la distribución y las entregas según el canal de destino, manteniendo seguimiento sobre la operación hasta la recepción final.",
            details: [
              "Distribución a retail y clientes",
              "Entregas programadas y coordinadas",
              "Seguimiento y gestión de incidencias"
            ]
          }
        ]
      : locale === "en"
        ? [
            {
              number: "01",
              eyebrow: "Preservation and preparation",
              title: "Conditions defined before the cargo moves.",
              text:
                "We prepare every operation according to product sensitivity, preservation requirements and the conditions needed to maintain product quality.",
              details: [
                "Cold chain when required",
                "Preservation and handling control",
                "Preparation according to product and destination"
              ]
            },
            {
              number: "02",
              eyebrow: "Transport and control",
              title: "Cargo under control throughout the journey.",
              text:
                "We coordinate transport mode, transit times and key operational milestones to maintain continuity throughout the movement.",
              details: [
                "Domestic and international transport",
                "Transit-time control",
                "Customs and document coordination"
              ]
            },
            {
              number: "03",
              eyebrow: "Distribution and delivery",
              title: "Coordination through the final point of reception.",
              text:
                "We organize distribution and deliveries according to the destination channel while maintaining operational tracking through final reception.",
              details: [
                "Distribution to retail and clients",
                "Scheduled and coordinated deliveries",
                "Tracking and incident management"
              ]
            }
          ]
        : [
            {
              number: "01",
              eyebrow: "储存与准备",
              title: "在货物运输前确定所需条件。",
              text:
                "根据产品敏感性、储存要求和保持产品品质所需的条件准备每项物流运营。",
              details: [
                "需要时提供冷链",
                "储存和操作条件控制",
                "根据产品和目的地进行准备"
              ]
            },
            {
              number: "02",
              eyebrow: "运输与控制",
              title: "在整个运输过程中保持货物受控。",
              text:
                "协调运输方式、运输时效和主要运营节点，保持整个运输过程的连续性。",
              details: [
                "国内和国际运输",
                "运输时效控制",
                "海关及文件协调"
              ]
            },
            {
              number: "03",
              eyebrow: "配送与交付",
              title: "协调直至最终收货地点。",
              text:
                "根据不同目的地渠道组织配送和交付，并持续跟踪运营直至最终收货。",
              details: [
                "零售及客户配送",
                "计划与协调交付",
                "跟踪与异常管理"
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
            src="/images/sectores/alimentosybebidas2.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/alimentosybebidas2.png"
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
                <Link href="#solicitar-propuesta" className={styles.primaryBtn}>{t.primaryCta}</Link>
                <Link href="/contacto" className={styles.secondaryBtn}>{t.secondaryCta}</Link>
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

        <section className={styles.services} style={{ "--mobile-bg": "url('/images/sectores/alimentosybebidas.png')" } as CSSProperties}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.servicesEyebrow}</span>
            <h2>{t.servicesTitle}</h2>
          </div>

          <div className={styles.serviceGrid}>
            {t.services.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["timer", "truck", "plane", "globe", "box", "document"];

              const serviceHrefs = [
                "/servicios/temperatura-controlada",
                "/servicios/transporte-terrestre",
                "/servicios/transporte-aereo",
                "/servicios/transporte-maritimo",
                "/servicios/almacen-distribucion",
                "/servicios/aduanas",
              ];

              return (
                <article key={title}>
                  <Link href={serviceHrefs[index]}>
                    <i>
                      <Icon name={icons[index]} />
                    </i>

                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>

                    <span aria-hidden="true">→</span>
                  </Link>
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
