"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import RelatedServices from "../_shared/RelatedServices";
import styles from "./Servicio.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Carga temperatura controlada",
    "heroTitle": "Cadena de frío para cargas que no pueden perder control.",
    "heroText": "Coordinamos transporte y soluciones logísticas para mercancías sensibles a temperatura, integrando monitoreo, control operativo y trazabilidad de origen a destino.",
    "primaryCta": "Planificar mi operación",
    "secondaryCta": "Hablar con nuestro equipo",
    "activeLabel": "Operación refrigerada activa",
    "activeRoute": "Origen → Destino",
    "activeCargo": "Carga sensible",
    "activeStatusLabel": "Estado:",
    "activeStatus": "Temperatura controlada",
    "activeEtaLabel": "Control:",
    "activeEta": "Monitoreo activo",
    "trust": [
      [
        "Cadena de frío",
        "Control térmico"
      ],
      [
        "Carga sensible",
        "Pharma / alimentos"
      ],
      [
        "Monitoreo",
        "Trazabilidad operativa"
      ],
      [
        "Cumplimiento",
        "Protocolos especializados"
      ]
    ],
    "overviewEyebrow": "Logística sensible",
    "overviewTitle": "Control térmico, seguridad y trazabilidad para mercancías críticas.",
    "overviewText": "La carga con temperatura controlada exige planificación, equipos adecuados, seguimiento y protocolos claros. Diseñamos operaciones para proteger la integridad del producto en cada etapa logística.",
    "overviewButton": "Conocer más sobre temperatura controlada",
    "pillars": [
      [
        "Control de temperatura",
        "Coordinación de rangos térmicos según producto, ruta y requerimientos."
      ],
      [
        "Monitoreo operativo",
        "Seguimiento de condiciones y avance durante la operación."
      ],
      [
        "Protocolos especializados",
        "Procedimientos para mercancía sensible, pharma, alimentos o productos críticos."
      ],
      [
        "Entrega segura",
        "Coordinación final para reducir riesgos y conservar la integridad de la carga."
      ]
    ],
    "servicesEyebrow": "Nuestros servicios de temperatura",
    "servicesTitle": "Soluciones para cargas sensibles que requieren control continuo.",
    "services": [
      [
        "Transporte refrigerado",
        "Movimientos con control térmico para productos sensibles."
      ],
      [
        "Carga pharma",
        "Coordinación para productos sanitarios, médicos o farmacéuticos."
      ],
      [
        "Alimentos y perecederos",
        "Operaciones para mercancías que requieren conservación y tiempos precisos."
      ],
      [
        "Monitoreo de condiciones",
        "Seguimiento operativo para mantener visibilidad sobre la carga."
      ],
      [
        "Cadena de frío internacional",
        "Soluciones multimodales para operaciones globales sensibles."
      ],
      [
        "Door to door",
        "Coordinación completa desde retiro hasta entrega final."
      ]
    ],
    "useCasesEyebrow": "Cuándo usar temperatura controlada",
    "useCasesTitle": "Cuando el producto depende del control térmico.",
    "useCases": [
      [
        "Productos farmacéuticos",
        "Operaciones para mercancía médica o sanitaria."
      ],
      [
        "Alimentos perecederos",
        "Transporte para productos que requieren conservación."
      ],
      [
        "Cosmética sensible",
        "Cargas que no deben exponerse a variaciones térmicas."
      ],
      [
        "Muestras críticas",
        "Envíos donde la estabilidad del producto es prioridad."
      ],
      [
        "Carga sanitaria",
        "Operaciones con protocolos y trazabilidad."
      ],
      [
        "Distribución refrigerada",
        "Movimientos programados con control operativo."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación térmica clara desde el primer contacto.",
    "process": [
      [
        "Análisis del producto",
        "Revisamos tipo de carga, rango térmico y sensibilidad."
      ],
      [
        "Selección de solución",
        "Definimos equipo, ruta y modalidad adecuada."
      ],
      [
        "Documentación",
        "Coordinamos requisitos comerciales, sanitarios y operativos."
      ],
      [
        "Preparación de operación",
        "Gestionamos retiro, acondicionamiento y control inicial."
      ],
      [
        "Seguimiento",
        "Monitoreamos avance y condiciones operativas."
      ],
      [
        "Entrega final",
        "Coordinamos recepción y cierre seguro."
      ]
    ],
    "bandTitle": "Operaciones con temperatura controlada para cargas que no admiten variaciones.",
    "bandText": "Nuestro equipo coordina soluciones para empresas que necesitan preservar producto, cumplir protocolos y mantener trazabilidad en operaciones sensibles.",
    "stats": [
      [
        "Control térmico",
        "Rangos según producto"
      ],
      [
        "Carga sensible",
        "Pharma, alimentos y más"
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
    "finalTitle": "Coordinemos su próxima carga con temperatura controlada.",
    "finalText": "Cuéntenos tipo de producto, rango térmico, origen, destino y urgencia. Nuestro equipo analizará la mejor solución operativa.",
    "finalPrimary": "Solicitar cotización refrigerada",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Temperature-controlled cargo",
    "heroTitle": "Cold chain for cargo that cannot lose control.",
    "heroText": "We coordinate transport and logistics solutions for temperature-sensitive goods, integrating monitoring, operational control and traceability from origin to destination.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active refrigerated operation",
    "activeRoute": "Origin → Destination",
    "activeCargo": "Sensitive cargo",
    "activeStatusLabel": "Status:",
    "activeStatus": "Temperature controlled",
    "activeEtaLabel": "Control:",
    "activeEta": "Active monitoring",
    "trust": [
      [
        "Cold chain",
        "Thermal control"
      ],
      [
        "Sensitive cargo",
        "Pharma / food"
      ],
      [
        "Monitoring",
        "Operational traceability"
      ],
      [
        "Compliance",
        "Specialized protocols"
      ]
    ],
    "overviewEyebrow": "Sensitive logistics",
    "overviewTitle": "Thermal control, security and traceability for critical goods.",
    "overviewText": "Temperature-controlled cargo requires planning, proper equipment, tracking and clear protocols. We design operations to protect product integrity at every logistics stage.",
    "overviewButton": "Learn more about temperature control",
    "pillars": [
      [
        "Temperature control",
        "Coordination of thermal ranges according to product, route and requirements."
      ],
      [
        "Operational monitoring",
        "Tracking of conditions and progress during the operation."
      ],
      [
        "Specialized protocols",
        "Procedures for sensitive goods, pharma, food or critical products."
      ],
      [
        "Safe delivery",
        "Final coordination to reduce risks and preserve cargo integrity."
      ]
    ],
    "servicesEyebrow": "Our temperature services",
    "servicesTitle": "Solutions for sensitive cargo requiring continuous control.",
    "services": [
      [
        "Refrigerated transport",
        "Movements with thermal control for sensitive products."
      ],
      [
        "Pharma cargo",
        "Coordination for healthcare, medical or pharmaceutical products."
      ],
      [
        "Food and perishables",
        "Operations for goods requiring preservation and precise timing."
      ],
      [
        "Condition monitoring",
        "Operational tracking to maintain visibility over cargo."
      ],
      [
        "International cold chain",
        "Multimodal solutions for sensitive global operations."
      ],
      [
        "Door to door",
        "Complete coordination from pickup to final delivery."
      ]
    ],
    "useCasesEyebrow": "When to use temperature control",
    "useCasesTitle": "When the product depends on thermal control.",
    "useCases": [
      [
        "Pharmaceutical products",
        "Operations for medical or healthcare goods."
      ],
      [
        "Perishable food",
        "Transport for products requiring preservation."
      ],
      [
        "Sensitive cosmetics",
        "Cargo that should not be exposed to thermal variations."
      ],
      [
        "Critical samples",
        "Shipments where product stability is a priority."
      ],
      [
        "Healthcare cargo",
        "Operations with protocols and traceability."
      ],
      [
        "Refrigerated distribution",
        "Scheduled movements with operational control."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "A clear thermal operation from the first contact.",
    "process": [
      [
        "Product analysis",
        "We review cargo type, thermal range and sensitivity."
      ],
      [
        "Solution selection",
        "We define the proper equipment, route and modality."
      ],
      [
        "Documentation",
        "We coordinate commercial, sanitary and operational requirements."
      ],
      [
        "Operation setup",
        "We manage pickup, preparation and initial control."
      ],
      [
        "Tracking",
        "We monitor progress and operational conditions."
      ],
      [
        "Final delivery",
        "We coordinate reception and secure closure."
      ]
    ],
    "bandTitle": "Temperature-controlled operations for cargo that cannot tolerate variations.",
    "bandText": "Our team coordinates solutions for companies that need to preserve products, comply with protocols and maintain traceability in sensitive operations.",
    "stats": [
      [
        "Thermal control",
        "Ranges according to product"
      ],
      [
        "Sensitive cargo",
        "Pharma, food and more"
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
    "finalTitle": "Let’s coordinate your next temperature-controlled cargo.",
    "finalText": "Tell us product type, thermal range, origin, destination and urgency. Our team will analyze the best operational solution.",
    "finalPrimary": "Request refrigerated quotation",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "温控货运",
    "heroTitle": "为不能失控的货物提供冷链方案。",
    "heroText": "我们为温度敏感货物协调运输和物流解决方案，整合监控、运营控制以及从始发地到目的地的可追溯性。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的冷链操作",
    "activeRoute": "始发地 → 目的地",
    "activeCargo": "敏感货物",
    "activeStatusLabel": "状态：",
    "activeStatus": "温度受控",
    "activeEtaLabel": "控制：",
    "activeEta": "主动监控",
    "trust": [
      [
        "冷链",
        "温度控制"
      ],
      [
        "敏感货物",
        "医药 / 食品"
      ],
      [
        "监控",
        "运营可追溯"
      ],
      [
        "合规",
        "专业流程"
      ]
    ],
    "overviewEyebrow": "敏感物流",
    "overviewTitle": "为关键货物提供温控、安全与可追溯性。",
    "overviewText": "温控货物需要规划、合适设备、跟踪和明确协议。我们设计每个阶段都能保护产品完整性的物流操作。",
    "overviewButton": "了解温控服务",
    "pillars": [
      [
        "温度控制",
        "根据产品、路线和要求协调温度范围。"
      ],
      [
        "运营监控",
        "跟踪操作过程中的条件和进度。"
      ],
      [
        "专业协议",
        "适用于敏感、医药、食品或关键产品的流程。"
      ],
      [
        "安全交付",
        "协调最终交付以降低风险并保持货物完整。"
      ]
    ],
    "servicesEyebrow": "我们的温控服务",
    "servicesTitle": "为需要持续控制的敏感货物提供解决方案。",
    "services": [
      [
        "冷藏运输",
        "为敏感产品提供温控运输。"
      ],
      [
        "医药货物",
        "为医疗、卫生或制药产品提供协调。"
      ],
      [
        "食品与易腐品",
        "为需要保存和准时运输的货物提供操作。"
      ],
      [
        "条件监控",
        "通过运营跟踪保持货物可视化。"
      ],
      [
        "国际冷链",
        "为全球敏感业务提供多式联运方案。"
      ],
      [
        "门到门",
        "从提货到最终交付的完整协调。"
      ]
    ],
    "useCasesEyebrow": "何时使用温控",
    "useCasesTitle": "当产品依赖温度控制时。",
    "useCases": [
      [
        "药品",
        "医疗或卫生货物操作。"
      ],
      [
        "易腐食品",
        "需要保存的产品运输。"
      ],
      [
        "敏感化妆品",
        "不应暴露于温度变化的货物。"
      ],
      [
        "关键样品",
        "产品稳定性优先的运输。"
      ],
      [
        "卫生货物",
        "带有协议和可追溯性的操作。"
      ],
      [
        "冷藏配送",
        "带有运营控制的计划运输。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从首次联系开始，温控操作清晰可控。",
    "process": [
      [
        "产品分析",
        "审核货物类型、温度范围和敏感性。"
      ],
      [
        "方案选择",
        "确定合适设备、路线和运输方式。"
      ],
      [
        "文件管理",
        "协调商业、卫生和运营要求。"
      ],
      [
        "操作准备",
        "管理提货、准备和初始控制。"
      ],
      [
        "跟踪",
        "监控进度和运营条件。"
      ],
      [
        "最终交付",
        "协调收货和安全关闭。"
      ]
    ],
    "bandTitle": "为不能承受温度波动的货物提供温控操作。",
    "bandText": "我们的团队为需要保护产品、遵守协议并保持可追溯性的企业协调敏感操作。",
    "stats": [
      [
        "温度控制",
        "根据产品设定范围"
      ],
      [
        "敏感货物",
        "医药、食品等"
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
    "finalTitle": "让我们协调您的下一批温控货物。",
    "finalText": "告诉我们产品类型、温度范围、始发地、目的地和紧急程度。我们的团队将分析最佳操作方案。",
    "finalPrimary": "申请冷链报价",
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

export default function TemperaturaControladaPage() {
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
        <section className={styles.hero} data-service-name="temperatura-controlada" data-service-hero-home="true"
      >
          <Image
            src="/images/temperaturacontrolada.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/controltemp.png"
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

          <div className={styles.commandBar} data-service-trust="temperatura-controlada">
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/temperaturacontrolada.png')" } as CSSProperties}>
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

        <section className={styles.darkBand} data-mobile-hide-after-cert="true">
          <div className={styles.darkBandImage}>
            <Image
              src="/images/transporte-maritimo-desktop/1.png"
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/temperaturacontrolada.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/temperaturacontrolada.png"
              alt={t.finalTitle}
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
        </section>

        <RelatedServices current="transporte-aereo" locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
