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
    "heroTitle": "Farmacéutico y Sanitario",
    "heroText": "Soluciones logísticas para productos farmacéuticos y sanitarios, con trazabilidad, control documental y cadena de frío cuando el producto lo requiere.",
    "primaryCta": "Solicitar propuesta logística",
    "secondaryCta": "Hablar con un especialista",
    "activeLabel": "Operación sanitaria activa",
    "activeRoute": "Laboratorio → Destino",
    "activeCargo": "Producto sensible",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En control",
    "activeEtaLabel": "Prioridad:",
    "activeEta": "Alta seguridad",
    "trust": [
      [
        "Trazabilidad",
        "Control operativo"
      ],
      [
        "Cadena de frío",
        "Cuando aplica"
      ],
      [
        "Documentación",
        "Cumplimiento"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ]
    ],
    "overviewEyebrow": "Logística sanitaria",
    "overviewTitle": "Control, cumplimiento y trazabilidad para mercancía sensible.",
    "overviewText": "El sector farmacéutico y sanitario exige precisión documental, seguridad, control de condiciones y continuidad. Diseñamos operaciones para proteger productos críticos de origen a destino.",
    "overviewButton": "Inicia mi operación",
    "pillars": [
      [
        "Cumplimiento documental",
        "Gestión de requisitos comerciales, sanitarios y aduaneros."
      ],
      [
        "Control de condiciones",
        "Coordinación de temperatura, manipulación y tiempos cuando aplica."
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo para mantener visibilidad en cada etapa."
      ],
      [
        "Entrega segura",
        "Coordinación final para reducir riesgos y asegurar recepción."
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
    "useCasesEyebrow": "Cuándo necesita logística sanitaria",
    "useCasesTitle": "Cuando el producto exige control, cumplimiento y cuidado.",
    "useCases": [
      [
        "Productos farmacéuticos",
        "Mercancía crítica con requisitos específicos."
      ],
      [
        "Dispositivos médicos",
        "Equipos, insumos y productos sanitarios."
      ],
      [
        "Muestras clínicas",
        "Envíos sensibles con trazabilidad."
      ],
      [
        "Cadena de frío",
        "Productos que requieren control térmico."
      ],
      [
        "Importadores sanitarios",
        "Operaciones internacionales reguladas."
      ],
      [
        "Distribución sanitaria",
        "Entregas a centros, laboratorios o clientes B2B."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación sanitaria clara desde la validación inicial.",
    "process": [
      [
        "Análisis del producto",
        "Revisamos sensibilidad, requisitos y condiciones."
      ],
      [
        "Diseño logístico",
        "Definimos modalidad, tiempos y controles."
      ],
      [
        "Documentación",
        "Coordinamos requisitos sanitarios, comerciales y aduaneros."
      ],
      [
        "Preparación",
        "Gestionamos retiro, acondicionamiento y salida."
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
    "bandTitle": "Logística sanitaria diseñada para productos que no pueden perder control.",
    "bandText": "Nuestro equipo coordina operaciones para empresas que necesitan cumplimiento, trazabilidad y respuesta profesional en productos farmacéuticos y sanitarios.",
    "stats": [
      [
        "Cumplimiento",
        "Documentación y control"
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su próxima operación sanitaria.",
    "finalText": "Cuéntenos tipo de producto, requisitos, origen, destino y urgencia. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta sanitaria",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Special transport for",
    "heroTitle": "Pharmaceutical & Healthcare",
    "heroText": "Logistics solutions for pharmaceutical and healthcare products, with traceability, document control and temperature-controlled transport when required.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Operación sanitaria activa",
    "activeRoute": "Laboratorio → Destino",
    "activeCargo": "Producto sensible",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En control",
    "activeEtaLabel": "Prioridad:",
    "activeEta": "Alta seguridad",
    "trust": [
      [
        "Trazabilidad",
        "Control operativo"
      ],
      [
        "Cadena de frío",
        "Cuando aplica"
      ],
      [
        "Documentación",
        "Cumplimiento"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ]
    ],
    "overviewEyebrow": "Logística sanitaria",
    "overviewTitle": "Control, cumplimiento y trazabilidad para mercancía sensible.",
    "overviewText": "El sector farmacéutico y sanitario exige precisión documental, seguridad, control de condiciones y continuidad. Diseñamos operaciones para proteger productos críticos de origen a destino.",
    "overviewButton": "Start my operation",
    "pillars": [
      [
        "Cumplimiento documental",
        "Gestión de requisitos comerciales, sanitarios y aduaneros."
      ],
      [
        "Control de condiciones",
        "Coordinación de temperatura, manipulación y tiempos cuando aplica."
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo para mantener visibilidad en cada etapa."
      ],
      [
        "Entrega segura",
        "Coordinación final para reducir riesgos y asegurar recepción."
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
    "useCasesEyebrow": "Cuándo necesita logística sanitaria",
    "useCasesTitle": "Cuando el producto exige control, cumplimiento y cuidado.",
    "useCases": [
      [
        "Productos farmacéuticos",
        "Mercancía crítica con requisitos específicos."
      ],
      [
        "Dispositivos médicos",
        "Equipos, insumos y productos sanitarios."
      ],
      [
        "Muestras clínicas",
        "Envíos sensibles con trazabilidad."
      ],
      [
        "Cadena de frío",
        "Productos que requieren control térmico."
      ],
      [
        "Importadores sanitarios",
        "Operaciones internacionales reguladas."
      ],
      [
        "Distribución sanitaria",
        "Entregas a centros, laboratorios o clientes B2B."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación sanitaria clara desde la validación inicial.",
    "process": [
      [
        "Análisis del producto",
        "Revisamos sensibilidad, requisitos y condiciones."
      ],
      [
        "Diseño logístico",
        "Definimos modalidad, tiempos y controles."
      ],
      [
        "Documentación",
        "Coordinamos requisitos sanitarios, comerciales y aduaneros."
      ],
      [
        "Preparación",
        "Gestionamos retiro, acondicionamiento y salida."
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
    "bandTitle": "Logística sanitaria diseñada para productos que no pueden perder control.",
    "bandText": "Nuestro equipo coordina operaciones para empresas que necesitan cumplimiento, trazabilidad y respuesta profesional en productos farmacéuticos y sanitarios.",
    "stats": [
      [
        "Cumplimiento",
        "Documentación y control"
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su próxima operación sanitaria.",
    "finalText": "Cuéntenos tipo de producto, requisitos, origen, destino y urgencia. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta sanitaria",
    "finalSecondary": "Hablar con un especialista"
  },
  "zh": {
    "heroEyebrow": "医药与医疗专项运输",
    "heroTitle": "医药与医疗",
    "heroText": "为医药和医疗产品提供专业物流解决方案，包括可追溯管理、文件控制以及必要时的温控运输。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "Operación sanitaria activa",
    "activeRoute": "Laboratorio → Destino",
    "activeCargo": "Producto sensible",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En control",
    "activeEtaLabel": "Prioridad:",
    "activeEta": "Alta seguridad",
    "trust": [
      [
        "Trazabilidad",
        "Control operativo"
      ],
      [
        "Cadena de frío",
        "Cuando aplica"
      ],
      [
        "Documentación",
        "Cumplimiento"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ]
    ],
    "overviewEyebrow": "Logística sanitaria",
    "overviewTitle": "Control, cumplimiento y trazabilidad para mercancía sensible.",
    "overviewText": "El sector farmacéutico y sanitario exige precisión documental, seguridad, control de condiciones y continuidad. Diseñamos operaciones para proteger productos críticos de origen a destino.",
    "overviewButton": "开始我的物流操作",
    "pillars": [
      [
        "Cumplimiento documental",
        "Gestión de requisitos comerciales, sanitarios y aduaneros."
      ],
      [
        "Control de condiciones",
        "Coordinación de temperatura, manipulación y tiempos cuando aplica."
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo para mantener visibilidad en cada etapa."
      ],
      [
        "Entrega segura",
        "Coordinación final para reducir riesgos y asegurar recepción."
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
    "useCasesEyebrow": "Cuándo necesita logística sanitaria",
    "useCasesTitle": "Cuando el producto exige control, cumplimiento y cuidado.",
    "useCases": [
      [
        "Productos farmacéuticos",
        "Mercancía crítica con requisitos específicos."
      ],
      [
        "Dispositivos médicos",
        "Equipos, insumos y productos sanitarios."
      ],
      [
        "Muestras clínicas",
        "Envíos sensibles con trazabilidad."
      ],
      [
        "Cadena de frío",
        "Productos que requieren control térmico."
      ],
      [
        "Importadores sanitarios",
        "Operaciones internacionales reguladas."
      ],
      [
        "Distribución sanitaria",
        "Entregas a centros, laboratorios o clientes B2B."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una operación sanitaria clara desde la validación inicial.",
    "process": [
      [
        "Análisis del producto",
        "Revisamos sensibilidad, requisitos y condiciones."
      ],
      [
        "Diseño logístico",
        "Definimos modalidad, tiempos y controles."
      ],
      [
        "Documentación",
        "Coordinamos requisitos sanitarios, comerciales y aduaneros."
      ],
      [
        "Preparación",
        "Gestionamos retiro, acondicionamiento y salida."
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
    "bandTitle": "Logística sanitaria diseñada para productos que no pueden perder control.",
    "bandText": "Nuestro equipo coordina operaciones para empresas que necesitan cumplimiento, trazabilidad y respuesta profesional en productos farmacéuticos y sanitarios.",
    "stats": [
      [
        "Cumplimiento",
        "Documentación y control"
      ],
      [
        "Trazabilidad",
        "Seguimiento operativo"
      ],
      [
        "Carga sensible",
        "Manejo especializado"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su próxima operación sanitaria.",
    "finalText": "Cuéntenos tipo de producto, requisitos, origen, destino y urgencia. Nuestro equipo analizará la mejor solución logística.",
    "finalPrimary": "Solicitar propuesta sanitaria",
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

export default function FarmaceuticoSanitarioSectorPage() {
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
      ? "Control logístico para productos farmacéuticos y sanitarios con requisitos críticos."
      : locale === "en"
        ? "Controlled logistics for pharmaceutical and healthcare products with critical requirements."
        : "面向具有严格要求的医药与医疗产品的受控物流。";

  const operationalIntro =
    locale === "es"
      ? "Coordinamos operaciones para medicamentos, dispositivos médicos, muestras clínicas e insumos sanitarios que requieren condiciones específicas de transporte. Definimos cada movimiento según la sensibilidad del producto, los rangos térmicos aplicables, los tiempos de tránsito y los requisitos documentales, integrando control de condiciones, trazabilidad y coordinación hasta la recepción final."
      : locale === "en"
        ? "We coordinate operations for medicines, medical devices, clinical samples and healthcare supplies requiring specific transport conditions. Each movement is defined according to product sensitivity, applicable temperature ranges, transit times and documentation requirements, integrating condition control, traceability and coordination through final reception."
        : "我们为药品、医疗器械、临床样本和医疗物资协调物流运营。根据产品敏感性、适用温度范围、运输时效和文件要求制定运输方案，并整合条件控制、全程追踪和最终交付协调。";

  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Validación y acondicionamiento",
            title: "Cada producto preparado según sus condiciones de transporte.",
            text:
              "Revisamos sensibilidad, requisitos térmicos, tiempos críticos y documentación antes de definir el acondicionamiento y la solución logística.",
            details: [
              "Revisión de sensibilidad y rango térmico",
              "Acondicionamiento según requisitos del producto",
              "Validación documental previa a la expedición"
            ]
          },
          {
            number: "02",
            eyebrow: "Transporte y control de condiciones",
            title: "Continuidad operativa durante los movimientos críticos.",
            text:
              "Coordinamos modalidad, ruta y tiempos de tránsito manteniendo control sobre las condiciones requeridas por la mercancía durante cada etapa del transporte.",
            details: [
              "Control térmico cuando el producto lo requiere",
              "Planificación de rutas y tiempos críticos",
              "Transporte terrestre, aéreo y multimodal"
            ]
          },
          {
            number: "03",
            eyebrow: "Trazabilidad y entrega segura",
            title: "Visibilidad hasta la recepción del producto.",
            text:
              "Supervisamos los principales hitos de la operación y coordinamos la entrega en laboratorios, centros sanitarios, distribuidores y otros destinos autorizados.",
            details: [
              "Seguimiento de hitos y condiciones operativas",
              "Coordinación documental y de recepción",
              "Gestión de incidencias y entrega final"
            ]
          }
        ]
      : locale === "en"
        ? [
          {
            number: "01",
            eyebrow: "Validation and conditioning",
            title: "Every product prepared according to its transport requirements.",
            text:
              "We review sensitivity, temperature requirements, critical timing and documentation before defining conditioning and the logistics solution.",
            details: [
              "Sensitivity and temperature-range assessment",
              "Conditioning according to product requirements",
              "Documentation validation before dispatch"
            ]
          },
          {
            number: "02",
            eyebrow: "Transport and condition control",
            title: "Operational continuity throughout critical movements.",
            text:
              "We coordinate transport mode, route and transit times while maintaining control over the conditions required by the cargo throughout each stage.",
            details: [
              "Temperature control when required",
              "Critical route and transit-time planning",
              "Road, air and multimodal transport"
            ]
          },
          {
            number: "03",
            eyebrow: "Traceability and secure delivery",
            title: "Visibility through final product reception.",
            text:
              "We monitor key operational milestones and coordinate delivery to laboratories, healthcare centers, distributors and other designated destinations.",
            details: [
              "Milestone and operational-condition tracking",
              "Documentation and reception coordination",
              "Incident management and final delivery"
            ]
          }
        ]
      : [
          {
            number: "01",
            eyebrow: "验证与运输准备",
            title: "根据产品运输条件进行专业准备。",
            text:
              "在制定物流方案前评估产品敏感性、温度要求、关键时效和相关文件。",
            details: [
              "产品敏感性与温度范围评估",
              "根据产品要求进行运输准备",
              "发运前文件验证"
            ]
          },
          {
            number: "02",
            eyebrow: "运输与条件控制",
            title: "在关键运输过程中保持运营连续性。",
            text:
              "协调运输方式、路线和时效，并在各运输阶段保持对货物所需条件的控制。",
            details: [
              "根据产品要求进行温度控制",
              "关键路线与运输时效规划",
              "陆运、空运及多式联运"
            ]
          },
          {
            number: "03",
            eyebrow: "追踪与安全交付",
            title: "保持可视化直至产品最终收货。",
            text:
              "跟踪主要运营节点，并协调向实验室、医疗机构、经销商及其他指定目的地的交付。",
            details: [
              "关键节点与运营条件跟踪",
              "文件与收货协调",
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
            src="/images/sectores/herofarmaceutico1.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/herofarmaceutico1.png"
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/herofarmaseutico.png')" } as CSSProperties}>
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
