"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import RelatedServices from "@/app/servicios/_shared/RelatedServices";
import HomeCorporateFinal from "@/components/sections/HomeCorporateFinal";
import styles from "./Servicio.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "TEMPERATURA CONTROLADA",
    "heroTitle": "Protegemos su carga sensible con control térmico y trazabilidad.",
    "heroText": "Coordinamos operaciones para mercancías que requieren temperatura controlada, monitoreo, protocolos claros y seguimiento operativo de origen a destino.",
    "primaryCta": "Cotizar cadena de frío",
    "secondaryCta": "Hablar con un especialista",
    contactEyebrow: "CONTACTO DIRECTO",
    contactTitle: "Coordinemos su próxima operación internacional.",
    contactText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
    contactPrimary: "Hablar con un especialista",
    contactSecondary: "Cotizar ahora",


    activeLabel: "Operación refrigerada activa",
    activeRoute: "Origen → Destino",
    activeCargo: "Carga sensible",
    activeStatusLabel: "Estado:",
    activeStatus: "Temperatura controlada",
    activeEtaLabel: "Control:",
    activeEta: "Monitoreo activo",

    trust: [
      ["Cadena de frío", "Control térmico"],
      ["Carga sensible", "Pharma / alimentos"],
      ["Monitoreo", "Trazabilidad operativa"],
      ["Cumplimiento", "Protocolos especializados"],
    ],

    overviewEyebrow: "LOGÍSTICA SENSIBLE",
    overviewTitle: "Control térmico, seguridad y trazabilidad para mercancías críticas.",
    overviewText: "La carga con temperatura controlada exige planificación, equipos adecuados, seguimiento y protocolos claros. Diseñamos operaciones para proteger la integridad del producto.",
    overviewButton: "Rastrea tu carga",

    stickyPrimary: "Cotizar frío",
    stickySecondary: "Hablar ahora",
    stickySecondaryHref: "",

    preQuoteEyebrow: "ANTES DE COTIZAR",
    preQuoteTitle: "La operación depende del producto, rango térmico y ruta.",
    preQuoteText: "Revisamos tipo de mercancía, temperatura requerida, tiempo de tránsito, origen, destino y protocolo para proteger la integridad del producto.",
    preQuoteCta: "Cotizar cadena de frío",
    preQuotePoints: [
      ["Producto", "Pharma, alimentos, muestras o mercancía crítica."],
      ["Temperatura", "Rango térmico, sensibilidad y tiempo de exposición."],
      ["Control", "Monitoreo, protocolo y trazabilidad operativa."],
    ],

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
    "finalTitle": "Coordinemos su próxima operación internacional.",
    "finalText": "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
    "finalPrimary": "Hablar con un especialista",
    "finalSecondary": "Cotizar cadena de frío"
  },
  "en": {
    "heroEyebrow": "TEMPERATURE CONTROLLED CARGO",
    "heroTitle": "We protect sensitive cargo with thermal control and traceability.",
    "heroText": "We coordinate operations for goods that require controlled temperature, monitoring, clear protocols and operational tracking from origin to destination.",
    "primaryCta": "Quote cold chain",
    "secondaryCta": "Talk to a specialist",
    contactEyebrow: "DIRECT CONTACT",
    contactTitle: "Let’s coordinate your next international operation.",
    contactText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
    contactPrimary: "Talk to a specialist",
    contactSecondary: "Quote now",


    activeLabel: "Active cold chain operation",
    activeRoute: "Origin → Destination",
    activeCargo: "Sensitive cargo",
    activeStatusLabel: "Status:",
    activeStatus: "Temperature controlled",
    activeEtaLabel: "Control:",
    activeEta: "Active monitoring",

    trust: [
      ["Cold chain", "Thermal control"],
      ["Sensitive cargo", "Pharma / food"],
      ["Monitoring", "Operational traceability"],
      ["Compliance", "Specialized protocols"],
    ],

    overviewEyebrow: "SENSITIVE LOGISTICS",
    overviewTitle: "Thermal control, safety and traceability for critical goods.",
    overviewText: "Temperature-controlled cargo requires planning, proper equipment, tracking and clear protocols. We design operations to protect product integrity.",
    overviewButton: "Track your cargo",

    stickyPrimary: "Quote cold",
    stickySecondary: "Talk now",
    stickySecondaryHref: "",

    preQuoteEyebrow: "BEFORE QUOTING",
    preQuoteTitle: "The operation depends on product, temperature range and route.",
    preQuoteText: "We review cargo type, required temperature, transit time, origin, destination and protocol to protect product integrity.",
    preQuoteCta: "Quote cold chain",
    preQuotePoints: [
      ["Product", "Pharma, food, samples or critical goods."],
      ["Temperature", "Thermal range, sensitivity and exposure time."],
      ["Control", "Monitoring, protocol and operational traceability."],
    ],

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
    "finalTitle": "Let’s coordinate your next international operation.",
    "finalText": "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
    "finalPrimary": "Talk to a specialist",
    "finalSecondary": "Quote cold chain"
  },
  "zh": {
    "heroEyebrow": "温控货物",
    "heroTitle": "通过温控和可追踪性保护您的敏感货物。",
    "heroText": "我们协调需要温控、监控、明确协议和从始发地到目的地运营跟踪的货 物操作。",
    "primaryCta": "获取冷链报价",
    "secondaryCta": "联系专家",
    contactEyebrow: "直接联系",
    contactTitle: "协调您的下一次国际物流操作。",
    contactText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
    contactPrimary: "联系专家",
    contactSecondary: "立即报价",


    activeLabel: "冷链操作中",
    activeRoute: "始发地 → 目的地",
    activeCargo: "敏感货物",
    activeStatusLabel: "状态：",
    activeStatus: "温控中",
    activeEtaLabel: "管控：",
    activeEta: "主动监控",

    trust: [
      ["冷链", "温度管控"],
      ["敏感货物", "医药 / 食品"],
      ["监控", "运营可追踪"],
      ["合规", "专业协议"],
    ],

    overviewEyebrow: "敏感物流",
    overviewTitle: "为关键货物提供温控、安全和可追踪性。",
    overviewText: "温控货物需要规划、合适设备、跟踪和明确协议。我们设计操作以保护产品完整性。",
    overviewButton: "追踪货物",

    stickyPrimary: "冷链报价",
    stickySecondary: "立即联系",
    stickySecondaryHref: "",

    preQuoteEyebrow: "报价前",
    preQuoteTitle: "操作取决于产品、温度范围和路线。",
    preQuoteText: "我们会审核货物类型、所需温度、运输时间、始发地、目的地和操作协议，以保护产品完整性。",
    preQuoteCta: "获取冷链报价",
    preQuotePoints: [
      ["产品", "医药、食品、样品或关键货物。"],
      ["温度", "温度范围、敏感性和暴露时间。"],
      ["管控", "监控、协议和运营可追踪性。"],
    ],

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
    "finalTitle": "协调您的下一次国际物流操作。",
    "finalText": "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
    "finalPrimary": "联系专家",
    "finalSecondary": "获取冷链报价"
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
            <Link href="/tracking">{t.overviewButton}</Link>
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

        <section className={styles.services} data-mobile-hide-after-cert="true">
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

        <section className={`${styles.processAccordionSection} aereoProcessPremium`}>
          <div className={styles.processAccordionHead}>
            <span className={styles.eyebrow}>{t.processEyebrow}</span>
            <h2>{t.processTitle}</h2>
          </div>
          <style>{`
            /* AEREO_PROCESS_INLINE_FORCE */
            @media (max-width: 900px) {
              .aereoProcessPremium .aereoProcessCard {
                background: linear-gradient(145deg, #07111d 0%, #102f45 100%) !important;
                color: #fff !important;
              }

              .aereoProcessPremium .aereoProcessTitle,
              .aereoProcessPremium .aereoProcessTitle *,
              .aereoProcessPremium .aereoProcessSummary,
              .aereoProcessPremium .aereoProcessSummary * {
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
                opacity: 1 !important;
                filter: none !important;
                mix-blend-mode: normal !important;
              }

              .aereoProcessPremium .aereoProcessTitle small {
                color: rgba(255,255,255,.72) !important;
                -webkit-text-fill-color: rgba(255,255,255,.72) !important;
              }

              .aereoProcessPremium .aereoProcessBody,
              .aereoProcessPremium .aereoProcessBody p {
                color: rgba(255,255,255,.78) !important;
                -webkit-text-fill-color: rgba(255,255,255,.78) !important;
              }

              .aereoProcessPremium .aereoProcessBody a {
                color: #fff !important;
                -webkit-text-fill-color: #fff !important;
              }

              .aereoProcessPremium .aereoProcessIcon::before,
              .aereoProcessPremium .aereoProcessIcon::after {
                background: #d6b36b !important;
              }
            }
          `}</style>

          <div className={styles.processAccordionList}>
            {t.process.map(([title, text]: string[], index: number) => (
              <details className={`${styles.processAccordionCard} aereoProcessCard`} key={title}>
                <summary className={`${styles.processAccordionSummary} aereoProcessSummary`}>
                  <span className={styles.processAccordionNumber}>{index + 1}</span>

                  <span className={`${styles.processAccordionTitle} aereoProcessTitle`}>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>

                  <span className={`${styles.processAccordionIcon} aereoProcessIcon`} aria-hidden="true" />
                </summary>

                <div className={`${styles.processAccordionBody} aereoProcessBody`}>
                  <p>
                    {locale === "es"
                      ? "Coordinamos ruta, documentación, tiempos y seguimiento operativo según la urgencia de la carga."
                      : locale === "en"
                        ? "We coordinate route, documentation, timing and operational tracking according to cargo urgency."
                        : "我们根据货物紧急程度协调路线、文件、时间和操作跟踪。"}
                  </p>

                  <Link href="/cotizacion?servicio=temperatura-controlada">
                    {locale === "es" ? "Cotizar esta modalidad" : locale === "en" ? "Quote this option" : "获取报价"}
                  </Link>
                </div>
              </details>
            ))}          </div>

          <div className={styles.processAccordionActions}>
            <div>
              <strong>
                {locale === "es"
                  ? "¿Tenés una operación de temperatura controlada en curso?"
                  : locale === "en"
                    ? "Do you have an air operation in progress?"
                    : "您是否有正在进行的空运操作？"}
              </strong>
              <p>
                {locale === "es"
                  ? "Coordinamos ruta, documentación y seguimiento para que tu carga avance sin fricción."
                  : locale === "en"
                    ? "We coordinate routing, documentation and tracking so your cargo moves without friction."
                    : "我们协调路线、文件和跟踪，确保您的货物顺利推进。"}
              </p>
            </div>

            <div>
              <Link href="/cotizacion?servicio=temperatura-controlada">
                {locale === "es" ? "Solicitar cotización de temperatura controlada" : locale === "en" ? "Request air quote" : "申请空运报价"}
              </Link>

              <Link href="/contacto?servicio=temperatura-controlada">
                {locale === "es" ? "Hablar con asesor" : locale === "en" ? "Talk to an advisor" : "联系顾问"}
              </Link>
            </div>
          </div>

        </section>

        <section className={styles.darkBand} data-mobile-hide-after-cert="true">
          <div className={styles.darkBandImage}>
            <Image
              src="/images/transporte-cima/controltemp.png"
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

        <section className={styles.faqSection} data-temperatura-controlada-faq-section="true">
          <div className={styles.faqHead}>
            <span className={styles.eyebrow}>
              {locale === "es" ? "Preguntas frecuentes" : locale === "en" ? "Frequently asked questions" : "常见问题"}
            </span>

            <h2>
              {locale === "es"
                ? "Dudas frecuentes sobre logística con temperatura controlada."
                : locale === "en"
                  ? "Common questions about temperature-controlled logistics."
                  : "关于温控物流的常见问题。"}
            </h2>

            <p>
              {locale === "es"
                ? "Resolvemos las principales dudas antes de coordinar una carga sensible a temperatura: rango térmico, embalaje, trazabilidad, documentación y entrega."
                : locale === "en"
                  ? "We answer the main questions before coordinating temperature-sensitive cargo: temperature range, packaging, traceability, documentation and delivery."
                  : "我们解答温控货物运输前的主要问题：温度范围、包装、可追溯性、文件和交付。"}
            </p>
          </div>

          <div className={styles.faqList}>
            {[
              [
                locale === "es" ? "¿Qué cargas requieren temperatura controlada?" : locale === "en" ? "What cargo requires temperature control?" : "哪些货物需要温控？",
                locale === "es"
                  ? "Productos farmacéuticos, sanitarios, alimentos, perecederos, químicos sensibles, cosmética y mercancía que requiere un rango térmico estable."
                  : locale === "en"
                    ? "Pharmaceuticals, healthcare products, food, perishables, sensitive chemicals, cosmetics and goods that require a stable temperature range."
                    : "药品、医疗产品、食品、易腐品、敏感化学品、化妆品以及需要稳定温度范围的货物。"
              ],
              [
                locale === "es" ? "¿Cómo se define el rango de temperatura?" : locale === "en" ? "How is the temperature range defined?" : "温度范围如何确定？",
                locale === "es"
                  ? "Se define según el producto, ficha técnica, requisitos del fabricante, embalaje, normativa y condiciones de tránsito."
                  : locale === "en"
                    ? "It is defined according to the product, technical sheet, manufacturer requirements, packaging, regulations and transit conditions."
                    : "温度范围根据产品、技术资料、制造商要求、包装、法规和运输条件确定。"
              ],
              [
                locale === "es" ? "¿Se puede hacer seguimiento de la cadena de frío?" : locale === "en" ? "Can the cold chain be tracked?" : "冷链可以跟踪吗？",
                locale === "es"
                  ? "Sí. Coordinamos seguimiento operativo y trazabilidad de hitos críticos para mantener visibilidad durante la operación."
                  : locale === "en"
                    ? "Yes. We coordinate operational tracking and traceability of critical milestones to maintain visibility during the operation."
                    : "可以。我们协调关键节点的操作跟踪和可追溯性，以保持运输过程可视化。"
              ],
              [
                locale === "es" ? "¿Across coordina transporte internacional con temperatura controlada?" : locale === "en" ? "Does Across coordinate international temperature-controlled transport?" : "Across 是否协调国际温控运输？",
                locale === "es"
                  ? "Sí. Coordinamos operaciones internacionales con proveedores, documentación, aduanas, manipulación y entrega final."
                  : locale === "en"
                    ? "Yes. We coordinate international operations with providers, documentation, customs, handling and final delivery."
                    : "是的。我们协调国际操作，包括供应商、文件、清关、操作和最终交付。"
              ],
              [
                locale === "es" ? "¿Qué información necesito para cotizar?" : locale === "en" ? "What information is needed for a quote?" : "报价需要哪些信息？",
                locale === "es"
                  ? "Producto, volumen, peso, origen, destino, rango de temperatura, embalaje, fecha estimada y requisitos documentales."
                  : locale === "en"
                    ? "Product, volume, weight, origin, destination, temperature range, packaging, estimated date and documentation requirements."
                    : "产品、体积、重量、起点、目的地、温度范围、包装、预计日期和文件要求。"
              ],
              [
                locale === "es" ? "¿Qué pasa si la carga es farmacéutica o sanitaria?" : locale === "en" ? "What if the cargo is pharmaceutical or healthcare-related?" : "如果货物是药品或医疗产品怎么办？",
                locale === "es"
                  ? "Revisamos requisitos de manipulación, documentación, trazabilidad y condiciones de transporte para reducir riesgos operativos."
                  : locale === "en"
                    ? "We review handling, documentation, traceability and transport conditions to reduce operational risks."
                    : "我们审核操作、文件、可追溯性和运输条件，以降低操作风险。"
              ]
            ].map(([question, answer]) => (
              <details className={styles.faqItem} key={question}>
                <summary>
                  <span>{question}</span>
                  <i aria-hidden="true" />
                </summary>

                <div>
                  <p>{answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>





<RelatedServices current="temperatura-controlada" locale={locale} />

        <div className={styles.aereoFinalStack}>
          <div className={styles.homeFinalContact}>
            <HomeCorporateFinal />
          </div>

          <Footer />
        </div>

      </main>

      <div className={styles.mobileStickyCta} aria-label="Acciones rápidas de temperatura controlada">
        <Link href="/cotizacion?servicio=temperatura-controlada">
          SOLICITAR COTIZACIÓN
        </Link>

        <Link href="/contacto?servicio=temperatura-controlada">
          HABLAR CON ASESOR
        </Link>
      </div>



      <div className={styles.mobileStickyCta} aria-label="Acciones rápidas">
        <Link href="/cotizacion?servicio=temperatura-controlada">
          {t.stickyPrimary}
        </Link>

        <Link href={t.stickySecondaryHref || "/contacto?servicio=temperatura-controlada"}>
          {t.stickySecondary}
        </Link>
      </div>

      
    </div>
  );
}
