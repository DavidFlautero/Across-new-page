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
    "heroTitle": "Industria Química",
    "heroText": "Coordinamos operaciones logísticas para productos químicos, materias primas, mercancía sensible y cargas reguladas, integrando transporte, documentación, trazabilidad y control operativo.",
    "primaryCta": "Solicitar propuesta logística",
    "secondaryCta": "Hablar con un especialista",
    "activeLabel": "Operación química activa",
    "activeRoute": "Origen → Planta",
    "activeCargo": "Producto químico",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En coordinación",
    "activeEtaLabel": "Control:",
    "activeEta": "Alta seguridad",
    "trust": [
      [
        "Cumplimiento",
        "Documentación controlada"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ],
      [
        "Seguridad",
        "Protocolos operativos"
      ],
      [
        "Trazabilidad",
        "Seguimiento de origen a destino"
      ]
    ],
    "overviewEyebrow": "Expertos en el sector de:",
    "overviewTitle": "Transporte y logística especializada para la Industria Química.",
    "overviewText": "El transporte de productos químicos exige seguridad, precisión y un control riguroso. Diseñamos soluciones para mercancías sensibles y reguladas, operaciones nacionales e internacionales, adaptando cada movimiento a los requisitos del producto, la normativa aplicable y el destino.",
    "overviewButton": "Hablar con un especialista",
    "pillars": [
      [
        "Control documental",
        "Revisión de documentos comerciales, técnicos, aduaneros y operativos según el tipo de producto."
      ],
      [
        "Manejo especializado",
        "Coordinación de transporte y manipulación adaptada a mercancías sensibles o reguladas."
      ],
      [
        "Seguridad operativa",
        "Planificación con foco en prevención, trazabilidad y reducción de riesgos."
      ],
      [
        "Coordinación integral",
        "Integración con transporte, aduanas, almacén y entrega final."
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
    "useCasesEyebrow": "Cuándo necesita logística química",
    "useCasesTitle": "Cuando la carga requiere control antes, durante y después del movimiento.",
    "useCases": [
      [
        "Materias primas",
        "Movimientos para producción, industria y transformación."
      ],
      [
        "Productos químicos",
        "Operaciones con requisitos documentales y operativos específicos."
      ],
      [
        "Carga sensible",
        "Mercancías que requieren cuidado, control y trazabilidad."
      ],
      [
        "Importadores químicos",
        "Gestión internacional con documentación y coordinación aduanera."
      ],
      [
        "Industria y manufactura",
        "Abastecimiento para plantas, procesos y proyectos productivos."
      ],
      [
        "Distribución especializada",
        "Entregas a clientes industriales, laboratorios o centros técnicos."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación química clara desde la validación inicial.",
    "process": [
      [
        "Análisis del producto",
        "Revisamos tipo de carga, requisitos, documentación y sensibilidad."
      ],
      [
        "Diseño logístico",
        "Definimos modalidad, ruta, controles y tiempos de operación."
      ],
      [
        "Validación documental",
        "Coordinamos documentos comerciales, técnicos, aduaneros y operativos."
      ],
      [
        "Preparación",
        "Gestionamos retiro, acondicionamiento, carga y salida."
      ],
      [
        "Seguimiento",
        "Monitoreamos avance, hitos y trazabilidad."
      ],
      [
        "Entrega final",
        "Coordinamos recepción, descarga y cierre operativo."
      ]
    ],
    "bandTitle": "Logística química diseñada para operaciones que no admiten improvisación.",
    "bandText": "Nuestro equipo coordina operaciones para empresas químicas e industriales que necesitan cumplimiento, trazabilidad y respuesta profesional en cada etapa logística.",
    "stats": [
      [
        "Cumplimiento",
        "Documentación y control"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
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
    "finalTitle": "Coordinemos su próxima operación química.",
    "finalText": "Cuéntenos tipo de producto, origen, destino, documentación disponible y requisitos. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta química",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Special transport for",
    "heroTitle": "Chemical Industry",
    "heroText": "We coordinate logistics operations for chemical products, raw materials, sensitive goods and regulated cargo, integrating transport, documentation, traceability and operational control.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active chemical operation",
    "activeRoute": "Origin → Plant",
    "activeCargo": "Chemical product",
    "activeStatusLabel": "Status:",
    "activeStatus": "In coordination",
    "activeEtaLabel": "Control:",
    "activeEta": "High security",
    "trust": [
      [
        "Compliance",
        "Controlled documentation"
      ],
      [
        "Sensitive cargo",
        "Specialized handling"
      ],
      [
        "Safety",
        "Operational protocols"
      ],
      [
        "Traceability",
        "Origin-to-destination tracking"
      ]
    ],
    "overviewEyebrow": "Specialized chemical logistics",
    "overviewTitle": "Operational control for products that require precision and responsibility.",
    "overviewText": "The chemical sector requires planning, documentary compliance, proper handling and visibility at every stage. We design operations to reduce risks, maintain continuity and protect cargo integrity.",
    "overviewButton": "Talk to a specialist",
    "pillars": [
      [
        "Document control",
        "Review of commercial, technical, customs and operational documents according to product type."
      ],
      [
        "Specialized handling",
        "Transport and handling coordination adapted to sensitive or regulated goods."
      ],
      [
        "Operational safety",
        "Planning focused on prevention, traceability and risk reduction."
      ],
      [
        "Integrated coordination",
        "Integration with transport, customs, warehousing and final delivery."
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
    "useCasesEyebrow": "When chemical logistics is needed",
    "useCasesTitle": "When cargo requires control before, during and after movement.",
    "useCases": [
      [
        "Raw materials",
        "Movements for production, industry and transformation."
      ],
      [
        "Chemical products",
        "Operations with specific document and operational requirements."
      ],
      [
        "Sensitive cargo",
        "Goods requiring care, control and traceability."
      ],
      [
        "Chemical importers",
        "International management with documentation and customs coordination."
      ],
      [
        "Industry and manufacturing",
        "Supply for plants, processes and productive projects."
      ],
      [
        "Specialized distribution",
        "Deliveries to industrial clients, laboratories or technical centers."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "A clear chemical operation from initial validation.",
    "process": [
      [
        "Product analysis",
        "We review cargo type, requirements, documentation and sensitivity."
      ],
      [
        "Logistics design",
        "We define modality, route, controls and operational timing."
      ],
      [
        "Document validation",
        "We coordinate commercial, technical, customs and operational documents."
      ],
      [
        "Preparation",
        "We manage pickup, conditioning, loading and dispatch."
      ],
      [
        "Tracking",
        "We monitor progress, milestones and traceability."
      ],
      [
        "Final delivery",
        "We coordinate reception, unloading and operational closure."
      ]
    ],
    "bandTitle": "Chemical logistics designed for operations that cannot be improvised.",
    "bandText": "Our team coordinates operations for chemical and industrial companies that need compliance, traceability and professional response at every logistics stage.",
    "stats": [
      [
        "Compliance",
        "Documentation and control"
      ],
      [
        "Sensitive cargo",
        "Specialized handling"
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
    "finalTitle": "Let’s coordinate your next chemical operation.",
    "finalText": "Tell us product type, origin, destination, available documentation and requirements. Our team will analyze the best logistics solution.",
    "finalPrimary": "Request chemical proposal",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "专项运输",
    "heroTitle": "化工行业",
    "heroText": "我们为化工产品、原材料、敏感货物和受监管货物协调物流运营，整合运输、文件、可追溯性和运营控制。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的化工操作",
    "activeRoute": "始发地 → 工厂",
    "activeCargo": "化工产品",
    "activeStatusLabel": "状态：",
    "activeStatus": "协调中",
    "activeEtaLabel": "控制：",
    "activeEta": "高安全",
    "trust": [
      [
        "合规",
        "文件受控"
      ],
      [
        "敏感货物",
        "专业处理"
      ],
      [
        "安全",
        "运营协议"
      ],
      [
        "可追溯性",
        "从始发地到目的地跟踪"
      ]
    ],
    "overviewEyebrow": "专业化工物流",
    "overviewTitle": "为需要精准和责任的产品提供运营控制。",
    "overviewText": "化工行业需要规划、文件合规、适当处理和每个阶段的可视化。我们设计运营以降低风险、保持连续性并保护货物完整性。",
    "overviewButton": "联系专家",
    "pillars": [
      [
        "文件控制",
        "根据产品类型审核商业、技术、海关和运营文件。"
      ],
      [
        "专业处理",
        "为敏感或受监管货物协调运输和处理。"
      ],
      [
        "运营安全",
        "以预防、可追溯性和降低风险为重点进行规划。"
      ],
      [
        "综合协调",
        "与运输、海关、仓储和最终交付整合。"
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
    "useCasesEyebrow": "何时需要化工物流",
    "useCasesTitle": "当货物在移动前、中、后都需要控制时。",
    "useCases": [
      [
        "原材料",
        "用于生产、工业和加工的运输。"
      ],
      [
        "化工产品",
        "具有特定文件和运营要求的操作。"
      ],
      [
        "敏感货物",
        "需要保护、控制和可追溯的货物。"
      ],
      [
        "化工进口商",
        "带有文件和海关协调的国际管理。"
      ],
      [
        "工业与制造",
        "为工厂、流程和生产项目供应。"
      ],
      [
        "专业配送",
        "交付至工业客户、实验室或技术中心。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从初始验证开始，化工操作清晰可控。",
    "process": [
      [
        "产品分析",
        "审核货物类型、要求、文件和敏感性。"
      ],
      [
        "物流设计",
        "确定方式、路线、控制和运营时间。"
      ],
      [
        "文件验证",
        "协调商业、技术、海关和运营文件。"
      ],
      [
        "准备",
        "管理提货、处理、装载和出库。"
      ],
      [
        "跟踪",
        "监控进度、节点和可追溯性。"
      ],
      [
        "最终交付",
        "协调接收、卸货和运营关闭。"
      ]
    ],
    "bandTitle": "为不能即兴处理的操作设计化工物流。",
    "bandText": "我们的团队为需要合规、可追溯性和专业响应的化工与工业企业协调每个物流阶段。",
    "stats": [
      [
        "合规",
        "文件与控制"
      ],
      [
        "敏感货物",
        "专业处理"
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
    "finalTitle": "让我们协调您的下一次化工操作。",
    "finalText": "告诉我们产品类型、始发地、目的地、现有文件和要求。我们的团队将分析最佳物流方案。",
    "finalPrimary": "申请化工方案",
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

export default function QuimicoSectorPage() {
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
      ? "Control técnico para el transporte de productos químicos y mercancías reguladas."
      : locale === "en"
        ? "Technical control for the transport of chemical products and regulated cargo."
        : "面向化工产品和受监管货物运输的专业技术控制。";

  const operationalIntro =
    locale === "es"
      ? "Coordinamos operaciones para productos químicos, materias primas y mercancías reguladas a partir de su clasificación, características y requisitos de transporte. Integramos validación documental, selección de medios adecuados, planificación de rutas y seguimiento operativo para mantener control sobre la mercancía desde la recogida hasta la recepción en planta, almacén o destino industrial."
      : locale === "en"
        ? "We coordinate operations for chemical products, raw materials and regulated cargo according to their classification, characteristics and transport requirements. We integrate documentation validation, appropriate transport selection, route planning and operational tracking to maintain control from collection through reception at the plant, warehouse or industrial destination."
        : "我们根据化工产品、原材料和受监管货物的分类、特性及运输要求协调物流运营，并整合文件审核、运输方式选择、路线规划和运营跟踪，确保从提货到工厂、仓库或工业目的地收货的全过程受控。";

  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Clasificación y validación",
            title: "La operación se define a partir de las características reales del producto.",
            text:
              "Revisamos la información técnica y documental disponible para identificar requisitos de manipulación, compatibilidad, acondicionamiento y transporte antes de iniciar el movimiento.",
            details: [
              "Revisión de clasificación y documentación técnica",
              "Validación de requisitos de embalaje y etiquetado",
              "Identificación de condiciones y restricciones operativas"
            ]
          },
          {
            number: "02",
            eyebrow: "Transporte y seguridad operativa",
            title: "Cada carga se coordina según su nivel de exigencia.",
            text:
              "Definimos modalidad, ruta y condiciones operativas teniendo en cuenta el tipo de mercancía, los puntos de transferencia y los requisitos aplicables a cada trayecto.",
            details: [
              "Coordinación de transporte terrestre y multimodal",
              "Planificación de rutas y puntos de transferencia",
              "Gestión de mercancías reguladas cuando aplica"
            ]
          },
          {
            number: "03",
            eyebrow: "Trazabilidad y recepción",
            title: "Control operativo hasta la entrega en destino.",
            text:
              "Supervisamos los principales hitos del movimiento y coordinamos documentación, aduanas y recepción para mantener visibilidad sobre la operación hasta su cierre.",
            details: [
              "Seguimiento de hitos y estado de la carga",
              "Coordinación documental y aduanera",
              "Gestión de incidencias, descarga y recepción"
            ]
          }
        ]
      : locale === "en"
        ? [
          {
            number: "01",
            eyebrow: "Classification and validation",
            title: "The operation is defined around the actual characteristics of the product.",
            text:
              "We review available technical and documentary information to identify handling, compatibility, conditioning and transport requirements before movement begins.",
            details: [
              "Classification and technical-document review",
              "Packaging and labeling requirement validation",
              "Identification of operational conditions and restrictions"
            ]
          },
          {
            number: "02",
            eyebrow: "Transport and operational safety",
            title: "Every cargo movement is coordinated according to its level of complexity.",
            text:
              "We define transport mode, route and operational conditions according to cargo type, transfer points and the requirements applicable to each movement.",
            details: [
              "Road and multimodal transport coordination",
              "Route and transfer-point planning",
              "Regulated cargo management when applicable"
            ]
          },
          {
            number: "03",
            eyebrow: "Traceability and reception",
            title: "Operational control through final delivery.",
            text:
              "We monitor key transport milestones and coordinate documentation, customs and reception to maintain visibility over the operation through completion.",
            details: [
              "Cargo status and milestone tracking",
              "Customs and document coordination",
              "Incident, unloading and reception management"
            ]
          }
        ]
      : [
          {
            number: "01",
            eyebrow: "分类与审核",
            title: "根据产品的实际特性确定物流方案。",
            text:
              "审核现有技术资料和运输文件，以确定货物操作、相容性、包装处理和运输要求。",
            details: [
              "产品分类与技术文件审核",
              "包装和标签要求确认",
              "运营条件与限制识别"
            ]
          },
          {
            number: "02",
            eyebrow: "运输与运营安全",
            title: "根据货物的具体要求协调每项运输。",
            text:
              "根据货物类型、中转节点和适用要求确定运输方式、路线及运营条件。",
            details: [
              "陆运及多式联运协调",
              "路线与中转节点规划",
              "适用时的受监管货物管理"
            ]
          },
          {
            number: "03",
            eyebrow: "追踪与收货",
            title: "保持运营控制直至最终交付。",
            text:
              "跟踪主要运输节点，并协调文件、海关和最终收货，保持整个运营过程的可视化。",
            details: [
              "货物状态与关键节点跟踪",
              "海关及文件协调",
              "异常、卸货与收货管理"
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
            src="/images/sectores/quimico2.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/quimico2.png"
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/quimicohero.png')" } as CSSProperties}>
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
