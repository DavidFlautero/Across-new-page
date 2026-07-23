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
    "heroTitle": "Consumo y Distribución",
    "heroText": "Coordinamos transporte, almacenaje, preparación, distribución y trazabilidad para productos de consumo, retail, e-commerce y operaciones comerciales.",
    "primaryCta": "Solicitar propuesta logística",
    "secondaryCta": "Hablar con un especialista",
    "activeLabel": "Operación de distribución activa",
    "activeRoute": "Almacén → Cliente",
    "activeCargo": "Productos de consumo",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En distribución",
    "activeEtaLabel": "Salida:",
    "activeEta": "Programada",
    "trust": [
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Stock",
        "Control operativo"
      ],
      [
        "Retail",
        "Puntos de venta"
      ],
      [
        "Trazabilidad",
        "Seguimiento"
      ]
    ],
    "overviewEyebrow": "Logística de consumo",
    "overviewTitle": "Operaciones flexibles para marcas, retail y distribución comercial.",
    "overviewText": "El consumo exige velocidad, cobertura, preparación eficiente y capacidad para responder a picos de demanda. Diseñamos operaciones para mover mercancía con orden y visibilidad.",
    "overviewButton": "Hablar con un especialista",
    "pillars": [
      [
        "Gestión de stock",
        "Control de inventario, entradas, salidas y disponibilidad."
      ],
      [
        "Preparación de pedidos",
        "Picking, packing y acondicionamiento según canal."
      ],
      [
        "Distribución",
        "Entregas a clientes, tiendas, centros o puntos de venta."
      ],
      [
        "Trazabilidad",
        "Seguimiento de estados, tiempos y avance operativo."
      ]
    ],
"whatWeDoEyebrow": "Capacidad operativa",
    "whatWeDoTitle": "Gestión integral para operaciones de consumo y distribución.",
    "whatWeDo": [
      [
        "Gestión de inventario y disponibilidad",
        "Coordinación de entradas, control de stock, rotación y disponibilidad de mercancía para mantener continuidad operativa."
      ],
      [
        "Preparación y consolidación de pedidos",
        "Organización de picking, packing, agrupación de referencias y acondicionamiento según canal, destino y requisitos de entrega."
      ],
      [
        "Distribución hacia retail",
        "Planificación de expediciones y entregas hacia tiendas, cadenas, plataformas logísticas y puntos de venta."
      ],
      [
        "Operaciones omnicanal",
        "Integración de flujos B2B, retail y e-commerce dentro de una misma operación logística y de distribución."
      ],
      [
        "Gestión de demanda",
        "Adaptación de capacidad, almacenamiento y distribución durante campañas comerciales, lanzamientos y períodos de alta rotación."
      ],
      [
        "Trazabilidad y control de entrega",
        "Seguimiento de movimientos, estados operativos e incidencias desde la preparación del pedido hasta la recepción final."
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
    "useCasesEyebrow": "Cuándo necesita logística de consumo",
    "useCasesTitle": "Cuando la demanda exige orden, velocidad y cobertura.",
    "useCases": [
      [
        "Retail",
        "Entregas hacia tiendas y puntos comerciales."
      ],
      [
        "E-commerce",
        "Preparación y distribución de pedidos online."
      ],
      [
        "Campañas",
        "Picos de demanda y promociones."
      ],
      [
        "Stock estacional",
        "Gestión de inventario por temporada."
      ],
      [
        "Distribución B2B",
        "Entregas a clientes corporativos o mayoristas."
      ],
      [
        "Productos de alta rotación",
        "Movimientos frecuentes y controlados."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación de consumo clara desde el stock hasta la entrega.",
    "process": [
      [
        "Análisis operativo",
        "Revisamos producto, volumen, frecuencia y destinos."
      ],
      [
        "Diseño logístico",
        "Definimos almacenamiento, preparación y distribución."
      ],
      [
        "Documentación",
        "Coordinamos requisitos comerciales y operativos."
      ],
      [
        "Preparación",
        "Gestionamos picking, packing y salida."
      ],
      [
        "Seguimiento",
        "Monitoreamos estados y entregas."
      ],
      [
        "Entrega final",
        "Coordinamos recepción y cierre operativo."
      ]
    ],
    "bandTitle": "Logística de consumo diseñada para mantener la mercancía en movimiento.",
    "bandText": "Nuestro equipo coordina operaciones para marcas y distribuidores que necesitan stock visible, preparación eficiente y entregas confiables.",
    "stats": [
      [
        "Distribución",
        "Cobertura operativa"
      ],
      [
        "Stock",
        "Control y visibilidad"
      ],
      [
        "Retail",
        "Puntos de venta"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su operación de consumo y distribución.",
    "finalText": "Cuéntenos tipo de producto, volumen, frecuencia de salidas y destinos. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta logística",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Sector consumo y distribución",
    "heroTitle": "Logística para productos de consumo que necesitan llegar a tiempo.",
    "heroText": "Coordinamos transporte, almacenaje, preparación, distribución y trazabilidad para productos de consumo, retail, e-commerce y operaciones comerciales.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Operación de distribución activa",
    "activeRoute": "Almacén → Cliente",
    "activeCargo": "Productos de consumo",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En distribución",
    "activeEtaLabel": "Salida:",
    "activeEta": "Programada",
    "trust": [
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Stock",
        "Control operativo"
      ],
      [
        "Retail",
        "Puntos de venta"
      ],
      [
        "Trazabilidad",
        "Seguimiento"
      ]
    ],
    "overviewEyebrow": "Logística de consumo",
    "overviewTitle": "Operaciones flexibles para marcas, retail y distribución comercial.",
    "overviewText": "El consumo exige velocidad, cobertura, preparación eficiente y capacidad para responder a picos de demanda. Diseñamos operaciones para mover mercancía con orden y visibilidad.",
    "overviewButton": "Talk to a specialist",
    "pillars": [
      [
        "Gestión de stock",
        "Control de inventario, entradas, salidas y disponibilidad."
      ],
      [
        "Preparación de pedidos",
        "Picking, packing y acondicionamiento según canal."
      ],
      [
        "Distribución",
        "Entregas a clientes, tiendas, centros o puntos de venta."
      ],
      [
        "Trazabilidad",
        "Seguimiento de estados, tiempos y avance operativo."
      ]
    ],
"whatWeDoEyebrow": "What we do",
    "whatWeDoTitle": "Solutions across the entire distribution chain.",
    "whatWeDo": [
      [
        "Stock management",
        "We coordinate reception, control and product availability."
      ],
      [
        "Order preparation",
        "We organize picking, preparation and conditioning for each operation."
      ],
      [
        "Retail distribution",
        "We plan deliveries to stores, chains and points of sale."
      ],
      [
        "E-commerce operations",
        "We coordinate preparation and distribution for omnichannel operations."
      ],
      [
        "Campaigns and demand peaks",
        "We adapt capacity and planning to high-volume periods."
      ],
      [
        "Delivery traceability",
        "We maintain visibility from preparation through final delivery."
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
    "useCasesEyebrow": "Cuándo necesita logística de consumo",
    "useCasesTitle": "Cuando la demanda exige orden, velocidad y cobertura.",
    "useCases": [
      [
        "Retail",
        "Entregas hacia tiendas y puntos comerciales."
      ],
      [
        "E-commerce",
        "Preparación y distribución de pedidos online."
      ],
      [
        "Campañas",
        "Picos de demanda y promociones."
      ],
      [
        "Stock estacional",
        "Gestión de inventario por temporada."
      ],
      [
        "Distribución B2B",
        "Entregas a clientes corporativos o mayoristas."
      ],
      [
        "Productos de alta rotación",
        "Movimientos frecuentes y controlados."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación de consumo clara desde el stock hasta la entrega.",
    "process": [
      [
        "Análisis operativo",
        "Revisamos producto, volumen, frecuencia y destinos."
      ],
      [
        "Diseño logístico",
        "Definimos almacenamiento, preparación y distribución."
      ],
      [
        "Documentación",
        "Coordinamos requisitos comerciales y operativos."
      ],
      [
        "Preparación",
        "Gestionamos picking, packing y salida."
      ],
      [
        "Seguimiento",
        "Monitoreamos estados y entregas."
      ],
      [
        "Entrega final",
        "Coordinamos recepción y cierre operativo."
      ]
    ],
    "bandTitle": "Logística de consumo diseñada para mantener la mercancía en movimiento.",
    "bandText": "Nuestro equipo coordina operaciones para marcas y distribuidores que necesitan stock visible, preparación eficiente y entregas confiables.",
    "stats": [
      [
        "Distribución",
        "Cobertura operativa"
      ],
      [
        "Stock",
        "Control y visibilidad"
      ],
      [
        "Retail",
        "Puntos de venta"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su operación de consumo y distribución.",
    "finalText": "Cuéntenos tipo de producto, volumen, frecuencia de salidas y destinos. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta logística",
    "finalSecondary": "Hablar con un especialista"
  },
  "zh": {
    "heroEyebrow": "Sector consumo y distribución",
    "heroTitle": "Logística para productos de consumo que necesitan llegar a tiempo.",
    "heroText": "Coordinamos transporte, almacenaje, preparación, distribución y trazabilidad para productos de consumo, retail, e-commerce y operaciones comerciales.",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "Operación de distribución activa",
    "activeRoute": "Almacén → Cliente",
    "activeCargo": "Productos de consumo",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En distribución",
    "activeEtaLabel": "Salida:",
    "activeEta": "Programada",
    "trust": [
      [
        "Distribución",
        "Entregas coordinadas"
      ],
      [
        "Stock",
        "Control operativo"
      ],
      [
        "Retail",
        "Puntos de venta"
      ],
      [
        "Trazabilidad",
        "Seguimiento"
      ]
    ],
    "overviewEyebrow": "Logística de consumo",
    "overviewTitle": "Operaciones flexibles para marcas, retail y distribución comercial.",
    "overviewText": "El consumo exige velocidad, cobertura, preparación eficiente y capacidad para responder a picos de demanda. Diseñamos operaciones para mover mercancía con orden y visibilidad.",
    "overviewButton": "联系专家",
    "pillars": [
      [
        "Gestión de stock",
        "Control de inventario, entradas, salidas y disponibilidad."
      ],
      [
        "Preparación de pedidos",
        "Picking, packing y acondicionamiento según canal."
      ],
      [
        "Distribución",
        "Entregas a clientes, tiendas, centros o puntos de venta."
      ],
      [
        "Trazabilidad",
        "Seguimiento de estados, tiempos y avance operativo."
      ]
    ],
"whatWeDoEyebrow": "我们的服务",
    "whatWeDoTitle": "覆盖整个配送链的物流解决方案。",
    "whatWeDo": [
      [
        "库存管理",
        "协调货物接收、库存控制和产品可用性。"
      ],
      [
        "订单准备",
        "根据每项业务安排拣货、准备和包装。"
      ],
      [
        "零售配送",
        "规划向门店、连锁企业和销售点的配送。"
      ],
      [
        "电商物流",
        "协调多渠道业务的订单准备和配送。"
      ],
      [
        "活动与需求高峰",
        "根据高周转时期调整物流能力和计划。"
      ],
      [
        "交付追踪",
        "从订单准备到最终交付保持全程可视化。"
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
    "useCasesEyebrow": "Cuándo necesita logística de consumo",
    "useCasesTitle": "Cuando la demanda exige orden, velocidad y cobertura.",
    "useCases": [
      [
        "Retail",
        "Entregas hacia tiendas y puntos comerciales."
      ],
      [
        "E-commerce",
        "Preparación y distribución de pedidos online."
      ],
      [
        "Campañas",
        "Picos de demanda y promociones."
      ],
      [
        "Stock estacional",
        "Gestión de inventario por temporada."
      ],
      [
        "Distribución B2B",
        "Entregas a clientes corporativos o mayoristas."
      ],
      [
        "Productos de alta rotación",
        "Movimientos frecuentes y controlados."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación de consumo clara desde el stock hasta la entrega.",
    "process": [
      [
        "Análisis operativo",
        "Revisamos producto, volumen, frecuencia y destinos."
      ],
      [
        "Diseño logístico",
        "Definimos almacenamiento, preparación y distribución."
      ],
      [
        "Documentación",
        "Coordinamos requisitos comerciales y operativos."
      ],
      [
        "Preparación",
        "Gestionamos picking, packing y salida."
      ],
      [
        "Seguimiento",
        "Monitoreamos estados y entregas."
      ],
      [
        "Entrega final",
        "Coordinamos recepción y cierre operativo."
      ]
    ],
    "bandTitle": "Logística de consumo diseñada para mantener la mercancía en movimiento.",
    "bandText": "Nuestro equipo coordina operaciones para marcas y distribuidores que necesitan stock visible, preparación eficiente y entregas confiables.",
    "stats": [
      [
        "Distribución",
        "Cobertura operativa"
      ],
      [
        "Stock",
        "Control y visibilidad"
      ],
      [
        "Retail",
        "Puntos de venta"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su operación de consumo y distribución.",
    "finalText": "Cuéntenos tipo de producto, volumen, frecuencia de salidas y destinos. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta logística",
    "finalSecondary": "Hablar con un especialista"
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

export default function ConsumoDistribucionSectorPage() {
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


  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Planificación y abastecimiento",
            title: "Inventario preparado para responder a la demanda.",
            text:
              "Coordinamos entradas, disponibilidad, rotación y necesidades de stock para mantener continuidad operativa y anticipar campañas o períodos de alta demanda.",
            details: [
              "Control de inventario y disponibilidad",
              "Planificación de rotación",
              "Gestión de campañas y picos de demanda"
            ]
          },
          {
            number: "02",
            eyebrow: "Preparación y expedición",
            title: "Cada pedido preparado según su canal y destino.",
            text:
              "Organizamos los procesos previos a la distribución, desde la preparación y consolidación hasta el acondicionamiento requerido por cada operación.",
            details: [
              "Picking y preparación de pedidos",
              "Packing y acondicionamiento",
              "Consolidación por destino o canal"
            ]
          },
          {
            number: "03",
            eyebrow: "Distribución y control",
            title: "Una operación coordinada hasta la entrega final.",
            text:
              "Integramos distribución retail, B2B y e-commerce con seguimiento operativo para mantener visibilidad sobre entregas, estados e incidencias.",
            details: [
              "Distribución a retail y puntos de venta",
              "Operaciones B2B y omnicanal",
              "Trazabilidad y gestión de incidencias"
            ]
          }
        ]
      : locale === "en"
        ? [
            {
              number: "01",
              eyebrow: "Planning and supply",
              title: "Inventory prepared to respond to demand.",
              text:
                "We coordinate inbound flows, availability, rotation and stock requirements to maintain operational continuity and anticipate peak-demand periods.",
              details: [
                "Inventory and availability control",
                "Stock rotation planning",
                "Campaign and demand-peak management"
              ]
            },
            {
              number: "02",
              eyebrow: "Preparation and dispatch",
              title: "Every order prepared for its channel and destination.",
              text:
                "We organize the processes prior to distribution, from picking and consolidation to the conditioning required by each operation.",
              details: [
                "Picking and order preparation",
                "Packing and conditioning",
                "Consolidation by destination or channel"
              ]
            },
            {
              number: "03",
              eyebrow: "Distribution and control",
              title: "A coordinated operation through final delivery.",
              text:
                "We integrate retail, B2B and e-commerce distribution with operational tracking to maintain visibility over deliveries, status and incidents.",
              details: [
                "Retail and point-of-sale distribution",
                "B2B and omnichannel operations",
                "Traceability and incident management"
              ]
            }
          ]
        : [
            {
              number: "01",
              eyebrow: "规划与供应",
              title: "以库存管理支持持续的市场需求。",
              text:
                "协调入库、库存可用性、周转以及需求变化，确保运营连续性并应对销售活动和需求高峰。",
              details: [
                "库存与可用性管理",
                "库存周转规划",
                "活动与需求高峰管理"
              ]
            },
            {
              number: "02",
              eyebrow: "订单准备与发运",
              title: "根据渠道和目的地准备每一笔订单。",
              text:
                "协调配送前的订单准备、整合以及不同业务所需的包装和处理流程。",
              details: [
                "拣货与订单准备",
                "包装与处理",
                "按渠道或目的地整合"
              ]
            },
            {
              number: "03",
              eyebrow: "配送与运营控制",
              title: "从仓库到最终交付的完整协调。",
              text:
                "整合零售、B2B和电商配送，并通过运营追踪保持对交付状态和异常情况的可视化。",
              details: [
                "零售与销售点配送",
                "B2B与多渠道运营",
                "追踪与异常管理"
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
            src="/images/sectores/consumo1.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/consumo2.png"
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


<section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/consumo3.png')" } as CSSProperties}>
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
                {t.whatWeDoEyebrow}
              </span>

              <h2>{t.whatWeDoTitle}</h2>

              <p>
                {locale === "es"
                  ? "Coordinamos de forma integral cada etapa de la operación, desde la planificación de inventario y la preparación de pedidos hasta la distribución y la entrega final. Integramos capacidad operativa, trazabilidad y control para adaptar cada flujo a los volúmenes, canales y necesidades específicas de cada cliente."
                  : locale === "en"
                    ? "An operational structure designed to coordinate goods, orders and distribution within a single logistics flow."
                    : "通过统一的物流流程协调货物、订单准备和配送。"}
              </p>
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
                      <li key={detail}>{detail}</li>
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
