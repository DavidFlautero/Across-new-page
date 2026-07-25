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
    "heroTitle": "Tecnología",
    "heroText": "Soluciones logísticas para productos tecnológicos y mercancía de alto valor, con seguridad, trazabilidad y control documental.",
    "primaryCta": "Solicitar propuesta logística",
    "secondaryCta": "Hablar con un especialista",
    "activeLabel": "Operación tecnológica activa",
    "activeRoute": "Origen → Centro técnico",
    "activeCargo": "Carga tecnológica",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En coordinación",
    "activeEtaLabel": "Control:",
    "activeEta": "Alta seguridad",
    "trust": [
      [
        "Alto valor",
        "Control reforzado"
      ],
      [
        "Tecnología",
        "Equipos y componentes"
      ],
      [
        "Trazabilidad",
        "Visibilidad operativa"
      ],
      [
        "Documentación",
        "Gestión internacional"
      ]
    ],
    "overviewEyebrow": "Expertos en el sector de:",
    "overviewTitle": "Transporte y logística especializada para Tecnología.",
    "overviewText": "La tecnología requiere manipulación cuidadosa, control documental, seguridad, tiempos precisos y visibilidad. Coordinamos operaciones para proteger equipos, componentes y dispositivos durante toda la cadena.",
    "overviewButton": "Inicia mi operación",
    "pillars": [
      [
        "Seguridad operativa",
        "Coordinación para cargas de alto valor o sensibilidad técnica."
      ],
      [
        "Documentación internacional",
        "Gestión de requisitos comerciales, aduaneros y operativos."
      ],
      [
        "Almacenaje especializado",
        "Control de stock, preparación y distribución de productos tecnológicos."
      ],
      [
        "Seguimiento",
        "Visibilidad sobre cada etapa del movimiento logístico."
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
    "useCasesEyebrow": "Cuándo necesita logística tecnológica",
    "useCasesTitle": "Cuando la carga exige seguridad, cuidado y trazabilidad.",
    "useCases": [
      [
        "Dispositivos electrónicos",
        "Operaciones para productos sensibles y de alto valor."
      ],
      [
        "Componentes tecnológicos",
        "Movimientos para cadenas de suministro e integración."
      ],
      [
        "Equipos profesionales",
        "Transporte de hardware, servidores o equipos técnicos."
      ],
      [
        "Importadores",
        "Coordinación internacional con documentación."
      ],
      [
        "Retail tecnológico",
        "Distribución hacia puntos de venta o clientes B2B."
      ],
      [
        "Proyectos IT",
        "Entrega de equipos para instalaciones o despliegues."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación tecnológica clara desde el primer contacto.",
    "process": [
      [
        "Análisis de carga",
        "Revisamos valor, sensibilidad, volumen y requisitos."
      ],
      [
        "Diseño logístico",
        "Definimos modalidad, ruta y controles operativos."
      ],
      [
        "Documentación",
        "Coordinamos requisitos comerciales y aduaneros."
      ],
      [
        "Preparación",
        "Gestionamos retiro, acondicionamiento y salida."
      ],
      [
        "Seguimiento",
        "Monitoreamos avance e hitos críticos."
      ],
      [
        "Entrega final",
        "Coordinamos recepción segura y cierre."
      ]
    ],
    "bandTitle": "Logística tecnológica diseñada para cargas que requieren control total.",
    "bandText": "Nuestro equipo coordina operaciones para empresas que necesitan seguridad, precisión documental y trazabilidad en productos tecnológicos.",
    "stats": [
      [
        "Alto valor",
        "Seguridad operativa"
      ],
      [
        "Tecnología",
        "Equipos y componentes"
      ],
      [
        "Trazabilidad",
        "Seguimiento completo"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su próxima operación tecnológica.",
    "finalText": "Cuéntenos tipo de producto, valor, origen, destino y urgencia. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta tecnológica",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Special transport for",
    "heroTitle": "Technology",
    "heroText": "Logistics solutions for technology products and high-value cargo, with security, traceability and document control.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active technology operation",
    "activeRoute": "Origin → Technical center",
    "activeCargo": "Technology cargo",
    "activeStatusLabel": "Status:",
    "activeStatus": "In coordination",
    "activeEtaLabel": "Control:",
    "activeEta": "High security",
    "trust": [
      [
        "High value",
        "Reinforced control"
      ],
      [
        "Technology",
        "Equipment and components"
      ],
      [
        "Traceability",
        "Operational visibility"
      ],
      [
        "Documentation",
        "International management"
      ]
    ],
    "overviewEyebrow": "Sector expertise",
    "overviewTitle": "Specialized transport and logistics for the Technology sector.",
    "overviewText": "Technology requires careful handling, document control, security, precise timing and visibility. We coordinate operations to protect equipment, components and devices across the entire chain.",
    "overviewButton": "Start my operation",
    "pillars": [
      [
        "Operational security",
        "Coordination for high-value or technically sensitive cargo."
      ],
      [
        "International documentation",
        "Commercial, customs and operational requirement management."
      ],
      [
        "Specialized warehousing",
        "Stock control, preparation and distribution of technology products."
      ],
      [
        "Tracking",
        "Visibility over every stage of the logistics movement."
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
    "useCasesEyebrow": "When technology logistics is needed",
    "useCasesTitle": "When cargo demands security, care and traceability.",
    "useCases": [
      [
        "Electronic devices",
        "Operations for sensitive and high-value products."
      ],
      [
        "Technology components",
        "Movements for supply chains and integration."
      ],
      [
        "Professional equipment",
        "Transport of hardware, servers or technical equipment."
      ],
      [
        "Importers",
        "International coordination with documentation."
      ],
      [
        "Technology retail",
        "Distribution to points of sale or B2B customers."
      ],
      [
        "IT projects",
        "Equipment delivery for installations or deployments."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "A clear technology operation from the first contact.",
    "process": [
      [
        "Cargo analysis",
        "We review value, sensitivity, volume and requirements."
      ],
      [
        "Logistics design",
        "We define modality, route and operational controls."
      ],
      [
        "Documentation",
        "We coordinate commercial and customs requirements."
      ],
      [
        "Preparation",
        "We manage pickup, conditioning and dispatch."
      ],
      [
        "Tracking",
        "We monitor progress and critical milestones."
      ],
      [
        "Final delivery",
        "We coordinate secure reception and closure."
      ]
    ],
    "bandTitle": "Technology logistics designed for cargo requiring full control.",
    "bandText": "Our team coordinates operations for companies requiring security, document precision and traceability for technology products.",
    "stats": [
      [
        "High value",
        "Operational security"
      ],
      [
        "Technology",
        "Equipment and components"
      ],
      [
        "Traceability",
        "Full tracking"
      ],
      [
        "Expert support",
        "Dedicated specialists"
      ]
    ],
    "finalTitle": "Let’s coordinate your next technology operation.",
    "finalText": "Tell us product type, value, origin, destination and urgency. Our team will analyze the best logistics solution.",
    "finalPrimary": "Request technology proposal",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "科技产品专项运输",
    "heroTitle": "科技",
    "heroText": "为科技产品和高价值货物提供专业物流解决方案，包括安全保障、全程追踪和文件管理。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的科技物流",
    "activeRoute": "始发地 → 技术中心",
    "activeCargo": "科技货物",
    "activeStatusLabel": "状态：",
    "activeStatus": "协调中",
    "activeEtaLabel": "控制：",
    "activeEta": "高安全",
    "trust": [
      [
        "高价值",
        "加强控制"
      ],
      [
        "科技",
        "设备和组件"
      ],
      [
        "可追溯",
        "运营可视化"
      ],
      [
        "文件",
        "国际管理"
      ]
    ],
    "overviewEyebrow": "行业专业能力",
    "overviewTitle": "面向科技行业的专业运输与物流服务。",
    "overviewText": "科技产品需要谨慎处理、文件控制、安全、准时和可视化。我们协调全链路操作以保护设备、组件和产品。",
    "overviewButton": "开始我的物流操作",
    "pillars": [
      [
        "运营安全",
        "为高价值或技术敏感货物提供协调。"
      ],
      [
        "国际文件",
        "管理商业、海关和运营要求。"
      ],
      [
        "专业仓储",
        "科技产品库存、准备和配送控制。"
      ],
      [
        "跟踪",
        "保持每个物流阶段可视化。"
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
    "useCasesEyebrow": "何时需要科技物流",
    "useCasesTitle": "当货物需要安全、保护和可追溯时。",
    "useCases": [
      [
        "电子设备",
        "敏感和高价值产品操作。"
      ],
      [
        "技术组件",
        "供应链和集成运输。"
      ],
      [
        "专业设备",
        "硬件、服务器或技术设备运输。"
      ],
      [
        "进口商",
        "带文件的国际协调。"
      ],
      [
        "科技零售",
        "向销售点或 B2B 客户配送。"
      ],
      [
        "IT 项目",
        "安装或部署设备交付。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从首次联系开始，科技物流清晰可控。",
    "process": [
      [
        "货物分析",
        "审核价值、敏感性、体量和要求。"
      ],
      [
        "物流设计",
        "确定方式、路线和控制。"
      ],
      [
        "文件管理",
        "协调商业和海关要求。"
      ],
      [
        "准备",
        "管理提货、处理和出库。"
      ],
      [
        "跟踪",
        "监控进度和关键节点。"
      ],
      [
        "最终交付",
        "协调安全接收和关闭。"
      ]
    ],
    "bandTitle": "为需要全面控制的科技货物设计物流。",
    "bandText": "我们的团队为需要安全、文件精准和可追溯性的科技企业协调物流。",
    "stats": [
      [
        "高价值",
        "运营安全"
      ],
      [
        "科技",
        "设备和组件"
      ],
      [
        "可追溯",
        "全程跟踪"
      ],
      [
        "专家支持",
        "专属专家"
      ]
    ],
    "finalTitle": "让我们协调您的下一次科技物流操作。",
    "finalText": "告诉我们产品类型、价值、始发地、目的地和紧急程度。我们的团队将分析最佳物流方案。",
    "finalPrimary": "申请科技物流方案",
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

export default function TecnologicoSectorPage() {
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
      ? "Transporte especializado para tecnología, equipos sensibles y mercancía de alto valor."
      : locale === "en"
        ? "Specialized transport for technology, sensitive equipment and high-value cargo."
        : "面向科技产品、敏感设备和高价值货物的专业运输。";

  const operationalIntro =
    locale === "es"
      ? "Coordinamos operaciones para dispositivos electrónicos, hardware, servidores, componentes y equipos profesionales que requieren seguridad, manipulación controlada y trazabilidad. Adaptamos cada movimiento al valor, la sensibilidad y la urgencia de la mercancía, integrando transporte internacional, gestión documental, coordinación aduanera y entregas programadas hasta centros técnicos, integradores, empresas o puntos de distribución."
      : locale === "en"
        ? "We coordinate operations for electronic devices, hardware, servers, components and professional equipment requiring security, controlled handling and traceability. Each movement is adapted to cargo value, sensitivity and urgency, integrating international transport, documentation, customs coordination and scheduled deliveries to technical centers, integrators, businesses or distribution points."
        : "我们为电子设备、硬件、服务器、零部件及专业技术设备协调物流运营。根据货物价值、敏感性和紧急程度制定运输方案，并整合国际运输、文件管理、海关协调及面向技术中心、系统集成商、企业和配送点的计划交付。";

  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Preparación y protección",
            title: "Cada equipo preparado según su valor y sensibilidad técnica.",
            text:
              "Definimos la operativa teniendo en cuenta las características del producto, el embalaje, la manipulación requerida y los puntos de transferencia previstos durante el transporte.",
            details: [
              "Revisión de requisitos de manipulación",
              "Coordinación de embalaje y acondicionamiento",
              "Control de recogidas y puntos de transferencia"
            ]
          },
          {
            number: "02",
            eyebrow: "Transporte y seguridad operativa",
            title: "Control reforzado para mercancía sensible y de alto valor.",
            text:
              "Seleccionamos la modalidad y la ruta según valor, urgencia y destino, coordinando los principales hitos documentales y operativos para reducir exposición y mantener continuidad.",
            details: [
              "Transporte terrestre, aéreo y multimodal",
              "Operaciones urgentes para equipos críticos",
              "Gestión documental y coordinación aduanera"
            ]
          },
          {
            number: "03",
            eyebrow: "Trazabilidad y entrega técnica",
            title: "Visibilidad hasta la recepción en el punto de destino.",
            text:
              "Coordinamos entregas programadas y mantenemos seguimiento sobre los hitos principales de la operación hasta la recepción de los equipos en centros técnicos, empresas, integradores o redes de distribución.",
            details: [
              "Seguimiento de movimientos y entregas",
              "Coordinación de ventanas de recepción",
              "Gestión de incidencias y entrega final"
            ]
          }
        ]
      : locale === "en"
        ? [
          {
            number: "01",
            eyebrow: "Preparation and protection",
            title: "Every piece of equipment prepared according to its value and technical sensitivity.",
            text:
              "We define the operation according to product characteristics, packaging, handling requirements and planned transfer points throughout transport.",
            details: [
              "Handling requirement assessment",
              "Packaging and conditioning coordination",
              "Pickup and transfer-point control"
            ]
          },
          {
            number: "02",
            eyebrow: "Transport and operational security",
            title: "Enhanced control for sensitive and high-value cargo.",
            text:
              "We select transport mode and route according to value, urgency and destination, coordinating key documentary and operational milestones to reduce exposure and maintain continuity.",
            details: [
              "Road, air and multimodal transport",
              "Urgent operations for critical equipment",
              "Documentation and customs coordination"
            ]
          },
          {
            number: "03",
            eyebrow: "Traceability and technical delivery",
            title: "Visibility through reception at the final destination.",
            text:
              "We coordinate scheduled deliveries and maintain visibility over key operational milestones through equipment reception at technical centers, businesses, integrators or distribution networks.",
            details: [
              "Movement and delivery tracking",
              "Receiving-window coordination",
              "Incident management and final delivery"
            ]
          }
        ]
      : [
          {
            number: "01",
            eyebrow: "准备与保护",
            title: "根据设备价值和技术敏感性制定运输准备方案。",
            text:
              "根据产品特性、包装、操作要求和运输过程中的中转节点规划物流运营。",
            details: [
              "操作要求评估",
              "包装与运输准备协调",
              "提货及中转节点控制"
            ]
          },
          {
            number: "02",
            eyebrow: "运输与运营安全",
            title: "为敏感和高价值货物提供加强控制。",
            text:
              "根据货物价值、紧急程度和目的地选择运输方式和路线，并协调主要文件及运营节点。",
            details: [
              "陆运、空运及多式联运",
              "关键设备紧急运输",
              "文件及海关协调"
            ]
          },
          {
            number: "03",
            eyebrow: "追踪与技术交付",
            title: "保持可视化直至最终目的地收货。",
            text:
              "协调计划交付并跟踪主要运营节点，直至设备送达技术中心、企业、系统集成商或配送网络。",
            details: [
              "运输与交付跟踪",
              "收货时间窗口协调",
              "异常管理与最终交付"
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
            src="/images/sectores/tecnologico.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/tecnologico.png"
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/transporte-logistica-tecnologia.png')" } as CSSProperties}>
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
