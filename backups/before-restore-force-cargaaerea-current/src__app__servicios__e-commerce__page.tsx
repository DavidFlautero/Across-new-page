"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import RelatedServices from "../_shared/RelatedServices";
import styles from "./ECommerce.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Logística e-commerce",
    "heroTitle": "Operaciones e-commerce preparadas para vender, preparar y entregar.",
    "heroText": "Coordinamos soluciones logísticas para tiendas online, marketplaces y marcas digitales: almacenaje, preparación de pedidos, distribución, devoluciones y trazabilidad operativa.",
    "primaryCta": "Planificar mi operación",
    "secondaryCta": "Hablar con nuestro equipo",
    "activeLabel": "Operación e-commerce activa",
    "activeRoute": "Stock → Pedido → Cliente",
    "activeCargo": "Fulfillment y distribución",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En preparación",
    "activeEtaLabel": "Salida:",
    "activeEta": "Programada",
    "trust": [
      [
        "Fulfillment",
        "Pedidos preparados"
      ],
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Devoluciones",
        "Logística inversa"
      ],
      [
        "Trazabilidad",
        "Control operativo"
      ]
    ],
    "overviewEyebrow": "Operación digital",
    "overviewTitle": "Logística diseñada para convertir pedidos online en entregas reales.",
    "overviewText": "El e-commerce exige velocidad, orden, visibilidad y capacidad de respuesta. Diseñamos operaciones para gestionar stock, preparar pedidos, coordinar salidas y mantener trazabilidad desde el almacén hasta el cliente final.",
    "overviewButton": "Conocer más sobre e-commerce",
    "pillars": [
      [
        "Gestión de stock",
        "Control de inventario, entradas, salidas y disponibilidad para operaciones online."
      ],
      [
        "Preparación de pedidos",
        "Picking, packing, etiquetado y acondicionamiento según canal de venta."
      ],
      [
        "Distribución coordinada",
        "Planificación de entregas nacionales, regionales o dedicadas."
      ],
      [
        "Logística inversa",
        "Gestión de devoluciones, cambios y recuperación de mercancía."
      ]
    ],
    "servicesEyebrow": "Nuestros servicios e-commerce",
    "servicesTitle": "Soluciones logísticas para marcas que venden online.",
    "services": [
      [
        "Fulfillment",
        "Preparación integral de pedidos para tiendas online y marketplaces."
      ],
      [
        "Almacenaje e-commerce",
        "Stock organizado para operaciones digitales con alta rotación."
      ],
      [
        "Picking y packing",
        "Preparación eficiente, ordenada y adaptada al tipo de producto."
      ],
      [
        "Distribución nacional",
        "Coordinación de entregas hacia clientes, tiendas o puntos de retiro."
      ],
      [
        "Logística inversa",
        "Gestión de devoluciones, cambios y reingreso de mercancía."
      ],
      [
        "Operaciones omnicanal",
        "Integración de flujos entre tienda online, retail y distribución B2B."
      ]
    ],
    "useCasesEyebrow": "Cuándo necesita logística e-commerce",
    "useCasesTitle": "Cuando vender online requiere una operación detrás.",
    "useCases": [
      [
        "Tiendas online",
        "Preparación y despacho de pedidos desde inventario centralizado."
      ],
      [
        "Marketplaces",
        "Operaciones con altos volúmenes, tiempos definidos y control de stock."
      ],
      [
        "Marcas D2C",
        "Distribución directa al consumidor con experiencia de entrega cuidada."
      ],
      [
        "Campañas comerciales",
        "Picos de demanda, promociones y eventos con mayor volumen."
      ],
      [
        "Retail omnicanal",
        "Conexión entre stock, tienda online, puntos físicos y entregas."
      ],
      [
        "Devoluciones",
        "Gestión ordenada de cambios, reingresos y recuperación de producto."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación e-commerce clara desde el ingreso de stock hasta la entrega.",
    "process": [
      [
        "Recepción de stock",
        "Coordinamos ingreso, control e identificación de mercancía."
      ],
      [
        "Gestión de inventario",
        "Organizamos disponibilidad, ubicación y estado operativo."
      ],
      [
        "Preparación",
        "Ejecutamos picking, packing, etiquetado y acondicionamiento."
      ],
      [
        "Plan de salida",
        "Coordinamos rutas, operadores y prioridades de entrega."
      ],
      [
        "Seguimiento",
        "Monitoreamos estados, tiempos y trazabilidad del pedido."
      ],
      [
        "Entrega o devolución",
        "Cerramos la operación con entrega final o logística inversa."
      ]
    ],
    "bandTitle": "Logística e-commerce diseñada para pedidos que no pueden quedarse quietos.",
    "bandText": "Nuestro equipo coordina operaciones para marcas que necesitan control de stock, preparación eficiente, distribución confiable y respuesta profesional en cada pedido.",
    "stats": [
      [
        "Fulfillment",
        "Preparación de pedidos"
      ],
      [
        "Stock visible",
        "Control operativo"
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
    "finalTitle": "Coordinemos su operación e-commerce.",
    "finalText": "Cuéntenos volumen de pedidos, tipo de producto, frecuencia de salidas y destinos. Nuestro equipo analizará la mejor solución logística para su canal online.",
    "finalPrimary": "Solicitar propuesta e-commerce",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "E-commerce logistics",
    "heroTitle": "E-commerce operations built to sell, prepare and deliver.",
    "heroText": "We coordinate logistics solutions for online stores, marketplaces and digital brands: warehousing, order preparation, distribution, returns and operational traceability.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active e-commerce operation",
    "activeRoute": "Stock → Order → Customer",
    "activeCargo": "Fulfillment and distribution",
    "activeStatusLabel": "Status:",
    "activeStatus": "In preparation",
    "activeEtaLabel": "Dispatch:",
    "activeEta": "Scheduled",
    "trust": [
      [
        "Fulfillment",
        "Orders prepared"
      ],
      [
        "Distribution",
        "Coordinated deliveries"
      ],
      [
        "Returns",
        "Reverse logistics"
      ],
      [
        "Traceability",
        "Operational control"
      ]
    ],
    "overviewEyebrow": "Digital operation",
    "overviewTitle": "Logistics designed to turn online orders into real deliveries.",
    "overviewText": "E-commerce requires speed, order, visibility and response capacity. We design operations to manage stock, prepare orders, coordinate dispatches and maintain traceability from warehouse to final customer.",
    "overviewButton": "Learn more about e-commerce",
    "pillars": [
      [
        "Stock management",
        "Inventory, inbound, outbound and availability control for online operations."
      ],
      [
        "Order preparation",
        "Picking, packing, labeling and conditioning according to the sales channel."
      ],
      [
        "Coordinated distribution",
        "Planning for national, regional or dedicated deliveries."
      ],
      [
        "Reverse logistics",
        "Management of returns, exchanges and goods recovery."
      ]
    ],
    "servicesEyebrow": "Our e-commerce services",
    "servicesTitle": "Logistics solutions for brands selling online.",
    "services": [
      [
        "Fulfillment",
        "End-to-end order preparation for online stores and marketplaces."
      ],
      [
        "E-commerce warehousing",
        "Organized stock for high-rotation digital operations."
      ],
      [
        "Picking and packing",
        "Efficient preparation adapted to product type."
      ],
      [
        "Domestic distribution",
        "Delivery coordination to customers, stores or pickup points."
      ],
      [
        "Reverse logistics",
        "Returns, exchanges and product re-entry management."
      ],
      [
        "Omnichannel operations",
        "Flow integration between online store, retail and B2B distribution."
      ]
    ],
    "useCasesEyebrow": "When e-commerce logistics is needed",
    "useCasesTitle": "When selling online requires an operation behind it.",
    "useCases": [
      [
        "Online stores",
        "Order preparation and dispatch from centralized inventory."
      ],
      [
        "Marketplaces",
        "Operations with high volumes, defined times and stock control."
      ],
      [
        "D2C brands",
        "Direct-to-consumer distribution with a careful delivery experience."
      ],
      [
        "Commercial campaigns",
        "Demand peaks, promotions and high-volume events."
      ],
      [
        "Omnichannel retail",
        "Connection between stock, online store, physical points and deliveries."
      ],
      [
        "Returns",
        "Organized management of exchanges, re-entry and product recovery."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "A clear e-commerce operation from stock entry to delivery.",
    "process": [
      [
        "Stock reception",
        "We coordinate inbound, control and goods identification."
      ],
      [
        "Inventory management",
        "We organize availability, location and operational status."
      ],
      [
        "Preparation",
        "We execute picking, packing, labeling and conditioning."
      ],
      [
        "Dispatch plan",
        "We coordinate routes, operators and delivery priorities."
      ],
      [
        "Tracking",
        "We monitor order statuses, times and traceability."
      ],
      [
        "Delivery or return",
        "We close the operation with final delivery or reverse logistics."
      ]
    ],
    "bandTitle": "E-commerce logistics designed for orders that cannot stand still.",
    "bandText": "Our team coordinates operations for brands that need stock control, efficient preparation, reliable distribution and professional response for every order.",
    "stats": [
      [
        "Fulfillment",
        "Order preparation"
      ],
      [
        "Visible stock",
        "Operational control"
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
    "finalTitle": "Let’s coordinate your e-commerce operation.",
    "finalText": "Tell us order volume, product type, dispatch frequency and destinations. Our team will analyze the best logistics solution for your online channel.",
    "finalPrimary": "Request e-commerce proposal",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "电商物流",
    "heroTitle": "为销售、准备和交付而设计的电商运营。",
    "heroText": "我们为在线商店、平台和数字品牌协调物流解决方案：仓储、订单准备、配送、退货和运营可追溯性。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的电商操作",
    "activeRoute": "库存 → 订单 → 客户",
    "activeCargo": "履约与配送",
    "activeStatusLabel": "状态：",
    "activeStatus": "准备中",
    "activeEtaLabel": "出库：",
    "activeEta": "已安排",
    "trust": [
      [
        "订单履约",
        "订单准备"
      ],
      [
        "配送",
        "协调交付"
      ],
      [
        "退货",
        "逆向物流"
      ],
      [
        "可追溯",
        "运营控制"
      ]
    ],
    "overviewEyebrow": "数字运营",
    "overviewTitle": "将在线订单转化为真实交付的物流方案。",
    "overviewText": "电商需要速度、秩序、可视化和响应能力。我们设计运营流程，用于管理库存、准备订单、协调出库，并从仓库到最终客户保持可追溯性。",
    "overviewButton": "了解电商物流",
    "pillars": [
      [
        "库存管理",
        "为在线运营控制库存、入库、出库和可用性。"
      ],
      [
        "订单准备",
        "根据销售渠道进行拣货、包装、贴标和处理。"
      ],
      [
        "配送协调",
        "规划全国、区域或专属交付。"
      ],
      [
        "逆向物流",
        "管理退货、换货和货物回收。"
      ]
    ],
    "servicesEyebrow": "我们的电商服务",
    "servicesTitle": "面向在线销售品牌的物流解决方案。",
    "services": [
      [
        "订单履约",
        "为在线商店和平台提供完整订单准备。"
      ],
      [
        "电商仓储",
        "为高周转数字运营提供有序库存。"
      ],
      [
        "拣货与包装",
        "根据产品类型进行高效准备。"
      ],
      [
        "国内配送",
        "协调向客户、门店或自提点交付。"
      ],
      [
        "逆向物流",
        "管理退货、换货和产品重新入库。"
      ],
      [
        "全渠道运营",
        "整合在线商店、零售和 B2B 配送流程。"
      ]
    ],
    "useCasesEyebrow": "何时需要电商物流",
    "useCasesTitle": "当在线销售背后需要运营时。",
    "useCases": [
      [
        "在线商店",
        "从集中库存准备和发送订单。"
      ],
      [
        "平台业务",
        "具有高订单量、固定时效和库存控制的操作。"
      ],
      [
        "D2C 品牌",
        "直接面向消费者并重视交付体验。"
      ],
      [
        "商业活动",
        "需求高峰、促销和高订单量活动。"
      ],
      [
        "全渠道零售",
        "连接库存、网店、实体点和交付。"
      ],
      [
        "退货",
        "有序管理换货、重新入库和产品回收。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从库存入库到交付，电商操作清晰可控。",
    "process": [
      [
        "库存接收",
        "协调入库、控制和货物识别。"
      ],
      [
        "库存管理",
        "组织可用性、位置和运营状态。"
      ],
      [
        "订单准备",
        "执行拣货、包装、贴标和处理。"
      ],
      [
        "出库计划",
        "协调路线、运营商和交付优先级。"
      ],
      [
        "跟踪",
        "监控订单状态、时间和可追溯性。"
      ],
      [
        "交付或退货",
        "通过最终交付或逆向物流关闭操作。"
      ]
    ],
    "bandTitle": "为不能停下来的订单设计的电商物流。",
    "bandText": "我们的团队为需要库存控制、高效准备、可靠配送和专业响应的品牌协调运营。",
    "stats": [
      [
        "履约",
        "订单准备"
      ],
      [
        "库存可视",
        "运营控制"
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
    "finalTitle": "让我们协调您的电商运营。",
    "finalText": "告诉我们订单量、产品类型、出库频率和目的地。我们的团队将分析适合您在线渠道的最佳物流方案。",
    "finalPrimary": "申请电商方案",
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

export default function ECommercePage() {
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
        <section className={styles.hero} data-service-name="e-commerce" data-service-hero-home="true"
      >
          <Image
            src="/images/heroecommerce.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/ecommerce.png"
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

          <div className={styles.commandBar} data-service-trust="e-commerce">
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/heroecommerce.png')" } as CSSProperties}>
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/heroecommerce.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/heroecommerce.png"
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
