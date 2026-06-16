"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import RelatedServices from "../_shared/RelatedServices";
import styles from "./AlmacenDistribucion.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Almacén y distribución",
    "heroTitle": "Operaciones de almacén que convierten stock en movimiento.",
    "heroText": "Coordinamos soluciones de almacenaje, preparación de pedidos, distribución y control operativo para empresas que necesitan visibilidad, orden y continuidad logística.",
    "primaryCta": "Planificar mi operación",
    "secondaryCta": "Hablar con nuestro equipo",
    "activeLabel": "Operación logística activa",
    "activeRoute": "Almacén → Cliente",
    "activeCargo": "Preparación y distribución",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En gestión",
    "activeEtaLabel": "Salida:",
    "activeEta": "Programada",
    "trust": [
      [
        "Almacenaje",
        "Stock controlado"
      ],
      [
        "Picking",
        "Preparación eficiente"
      ],
      [
        "Distribución",
        "Entrega coordinada"
      ],
      [
        "Trazabilidad",
        "Visibilidad operativa"
      ]
    ],
    "overviewEyebrow": "Gestión logística",
    "overviewTitle": "Almacén y distribución sin interrupciones.",
    "overviewText": "Una operación de almacén eficiente requiere control de stock, preparación precisa, coordinación de salidas y seguimiento. Diseñamos soluciones para mejorar continuidad, visibilidad y respuesta logística.",
    "overviewButton": "Conocer más sobre almacén",
    "pillars": [
      [
        "Control de stock",
        "Gestión organizada de inventario, entradas, salidas y disponibilidad."
      ],
      [
        "Preparación de pedidos",
        "Procesos de picking, packing y acondicionamiento según operación."
      ],
      [
        "Distribución coordinada",
        "Planificación de rutas y entregas para clientes o puntos de venta."
      ],
      [
        "Trazabilidad operativa",
        "Visibilidad sobre movimientos, estados y tiempos de gestión."
      ]
    ],
    "servicesEyebrow": "Nuestros servicios de almacén",
    "servicesTitle": "Soluciones para ordenar, preparar y distribuir mercancía.",
    "services": [
      [
        "Almacenaje",
        "Espacios y procesos para conservar mercancía bajo control."
      ],
      [
        "Picking y packing",
        "Preparación de pedidos con orden, velocidad y precisión."
      ],
      [
        "Distribución",
        "Coordinación de entregas regionales, nacionales o dedicadas."
      ],
      [
        "Cross docking",
        "Flujos rápidos para mercancía que necesita salida inmediata."
      ],
      [
        "Gestión de stock",
        "Control operativo de inventario, entradas y salidas."
      ],
      [
        "Operaciones B2B",
        "Soluciones para empresas, retail, e-commerce y distribución comercial."
      ]
    ],
    "useCasesEyebrow": "Cuándo usar almacén y distribución",
    "useCasesTitle": "Cuando el stock necesita convertirse en entrega.",
    "useCases": [
      [
        "E-commerce",
        "Preparación y salida de pedidos online."
      ],
      [
        "Retail",
        "Distribución hacia tiendas, puntos de venta o clientes."
      ],
      [
        "Stock estacional",
        "Gestión de picos de demanda y campañas."
      ],
      [
        "Mercancía importada",
        "Recepción, control y distribución posterior."
      ],
      [
        "Operaciones B2B",
        "Flujos para clientes corporativos y comerciales."
      ],
      [
        "Cross docking",
        "Reducción de tiempos de permanencia en almacén."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación de almacén clara desde la recepción hasta la entrega.",
    "process": [
      [
        "Recepción",
        "Coordinamos entrada, descarga e identificación de mercancía."
      ],
      [
        "Control de stock",
        "Registramos disponibilidad, ubicación y estado operativo."
      ],
      [
        "Preparación",
        "Gestionamos picking, packing y acondicionamiento."
      ],
      [
        "Plan de salida",
        "Definimos distribución, rutas y prioridades."
      ],
      [
        "Seguimiento",
        "Monitoreamos estados, tiempos y entregas."
      ],
      [
        "Entrega final",
        "Cerramos la operación con control y trazabilidad."
      ]
    ],
    "bandTitle": "Operaciones de almacén diseñadas para mantener la cadena en movimiento.",
    "bandText": "Nuestro equipo coordina soluciones para empresas que necesitan control de stock, preparación eficiente y distribución confiable.",
    "stats": [
      [
        "Stock controlado",
        "Visibilidad operativa"
      ],
      [
        "Picking",
        "Preparación precisa"
      ],
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su operación de almacén y distribución.",
    "finalText": "Cuéntenos tipo de mercancía, volumen, frecuencia de salidas y destinos. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta logística",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Warehousing and distribution",
    "heroTitle": "Warehouse operations that turn stock into movement.",
    "heroText": "We coordinate warehousing, order preparation, distribution and operational control solutions for companies needing visibility, order and logistics continuity.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active logistics operation",
    "activeRoute": "Warehouse → Client",
    "activeCargo": "Preparation and distribution",
    "activeStatusLabel": "Status:",
    "activeStatus": "In management",
    "activeEtaLabel": "Dispatch:",
    "activeEta": "Scheduled",
    "trust": [
      [
        "Warehousing",
        "Controlled stock"
      ],
      [
        "Picking",
        "Efficient preparation"
      ],
      [
        "Distribution",
        "Coordinated delivery"
      ],
      [
        "Traceability",
        "Operational visibility"
      ]
    ],
    "overviewEyebrow": "Logistics management",
    "overviewTitle": "Order, control and distribution for operations that cannot stop.",
    "overviewText": "An efficient warehouse operation requires stock control, accurate preparation, dispatch coordination and tracking. We design solutions to improve continuity, visibility and logistics response.",
    "overviewButton": "Learn more about warehousing",
    "pillars": [
      [
        "Stock control",
        "Organized management of inventory, inbound, outbound and availability."
      ],
      [
        "Order preparation",
        "Picking, packing and conditioning processes according to the operation."
      ],
      [
        "Coordinated distribution",
        "Route and delivery planning for clients or points of sale."
      ],
      [
        "Operational traceability",
        "Visibility over movements, statuses and management times."
      ]
    ],
    "servicesEyebrow": "Our warehousing services",
    "servicesTitle": "Solutions to store, prepare and distribute goods.",
    "services": [
      [
        "Warehousing",
        "Spaces and processes to keep goods under control."
      ],
      [
        "Picking and packing",
        "Order preparation with order, speed and precision."
      ],
      [
        "Distribution",
        "Regional, national or dedicated delivery coordination."
      ],
      [
        "Cross docking",
        "Fast flows for goods requiring immediate dispatch."
      ],
      [
        "Stock management",
        "Operational control of inventory, inbound and outbound."
      ],
      [
        "B2B operations",
        "Solutions for companies, retail, e-commerce and commercial distribution."
      ]
    ],
    "useCasesEyebrow": "When to use warehousing and distribution",
    "useCasesTitle": "When stock needs to become delivery.",
    "useCases": [
      [
        "E-commerce",
        "Preparation and dispatch of online orders."
      ],
      [
        "Retail",
        "Distribution to stores, points of sale or clients."
      ],
      [
        "Seasonal stock",
        "Management of demand peaks and campaigns."
      ],
      [
        "Imported goods",
        "Reception, control and later distribution."
      ],
      [
        "B2B operations",
        "Flows for corporate and commercial clients."
      ],
      [
        "Cross docking",
        "Reduction of warehouse dwell times."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "A clear warehouse operation from reception to delivery.",
    "process": [
      [
        "Reception",
        "We coordinate inbound, unloading and goods identification."
      ],
      [
        "Stock control",
        "We register availability, location and operational status."
      ],
      [
        "Preparation",
        "We manage picking, packing and conditioning."
      ],
      [
        "Dispatch plan",
        "We define distribution, routes and priorities."
      ],
      [
        "Tracking",
        "We monitor statuses, times and deliveries."
      ],
      [
        "Final delivery",
        "We close the operation with control and traceability."
      ]
    ],
    "bandTitle": "Warehouse operations designed to keep the chain moving.",
    "bandText": "Our team coordinates solutions for companies that need stock control, efficient preparation and reliable distribution.",
    "stats": [
      [
        "Controlled stock",
        "Operational visibility"
      ],
      [
        "Picking",
        "Accurate preparation"
      ],
      [
        "Distribution",
        "Coordinated deliveries"
      ],
      [
        "Expert support",
        "Dedicated specialists"
      ]
    ],
    "finalTitle": "Let’s coordinate your warehouse and distribution operation.",
    "finalText": "Tell us goods type, volume, dispatch frequency and destinations. Our team will analyze the best logistics solution.",
    "finalPrimary": "Request logistics proposal",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "仓储与配送",
    "heroTitle": "将库存转化为流动的仓储运营。",
    "heroText": "我们为需要可视化、秩序和物流连续性的企业协调仓储、订单准备、配送和运营控制解决方案。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的物流操作",
    "activeRoute": "仓库 → 客户",
    "activeCargo": "准备与配送",
    "activeStatusLabel": "状态：",
    "activeStatus": "管理中",
    "activeEtaLabel": "出库：",
    "activeEta": "已安排",
    "trust": [
      [
        "仓储",
        "库存受控"
      ],
      [
        "拣货",
        "高效准备"
      ],
      [
        "配送",
        "协调交付"
      ],
      [
        "可追溯",
        "运营可视化"
      ]
    ],
    "overviewEyebrow": "物流管理",
    "overviewTitle": "为不能停止的业务提供秩序、控制和配送。",
    "overviewText": "高效仓储需要库存控制、准确准备、出库协调和跟踪。我们设计解决方案以提升连续性、可视化和物流响应。",
    "overviewButton": "了解仓储服务",
    "pillars": [
      [
        "库存控制",
        "有序管理库存、入库、出库和可用性。"
      ],
      [
        "订单准备",
        "根据操作进行拣货、包装和处理。"
      ],
      [
        "配送协调",
        "为客户或销售点规划路线和交付。"
      ],
      [
        "运营可追溯",
        "对移动、状态和管理时间保持可视化。"
      ]
    ],
    "servicesEyebrow": "我们的仓储服务",
    "servicesTitle": "用于存储、准备和配送货物的解决方案。",
    "services": [
      [
        "仓储",
        "保持货物受控的空间和流程。"
      ],
      [
        "拣货与包装",
        "有序、快速、准确地准备订单。"
      ],
      [
        "配送",
        "区域、全国或专属交付协调。"
      ],
      [
        "越库",
        "为需要快速出库的货物提供快速流转。"
      ],
      [
        "库存管理",
        "库存、入库和出库的运营控制。"
      ],
      [
        "B2B 运营",
        "面向企业、零售、电商和商业配送的解决方案。"
      ]
    ],
    "useCasesEyebrow": "何时使用仓储与配送",
    "useCasesTitle": "当库存需要转化为交付时。",
    "useCases": [
      [
        "电商",
        "在线订单准备和出库。"
      ],
      [
        "零售",
        "配送到门店、销售点或客户。"
      ],
      [
        "季节性库存",
        "管理需求高峰和活动。"
      ],
      [
        "进口货物",
        "接收、控制和后续配送。"
      ],
      [
        "B2B 运营",
        "企业和商业客户流程。"
      ],
      [
        "越库",
        "减少货物在仓库停留时间。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从接收到交付，仓储操作清晰可控。",
    "process": [
      [
        "接收",
        "协调入库、卸货和货物识别。"
      ],
      [
        "库存控制",
        "记录可用性、位置和运营状态。"
      ],
      [
        "准备",
        "管理拣货、包装和处理。"
      ],
      [
        "出库计划",
        "定义配送、路线和优先级。"
      ],
      [
        "跟踪",
        "监控状态、时间和交付。"
      ],
      [
        "最终交付",
        "通过控制和可追溯关闭操作。"
      ]
    ],
    "bandTitle": "为保持供应链流动而设计的仓储运营。",
    "bandText": "我们的团队为需要库存控制、高效准备和可靠配送的企业协调解决方案。",
    "stats": [
      [
        "库存受控",
        "运营可视化"
      ],
      [
        "拣货",
        "准确准备"
      ],
      [
        "配送",
        "协调交付"
      ],
      [
        "专家支持",
        "专属专家"
      ]
    ],
    "finalTitle": "让我们协调您的仓储与配送操作。",
    "finalText": "告诉我们货物类型、数量、出库频率和目的地。我们的团队将分析最佳物流方案。",
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

export default function AlmacenDistribucionPage() {
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
        <section className={styles.hero} data-service-name="almacen-distribucion" data-service-hero-home="true"
      >
          <Image
            src="/images/almacenHero.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/almacen.png"
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

          <div className={styles.commandBar} data-service-trust="almacen-distribucion">
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/almacenHero.png')" } as CSSProperties}>
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
              src="/images/cargaaerea.png"
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/almacenHero.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/almacenHero.png"
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
