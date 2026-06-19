"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "./Sector.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Sector farmacéutico y sanitario",
    "heroTitle": "Logística sanitaria para productos que no admiten errores.",
    "heroText": "Coordinamos operaciones para productos farmacéuticos, sanitarios, médicos y sensibles, integrando control documental, trazabilidad, cadena de frío cuando aplica y seguimiento operativo.",
    "primaryCta": "Planificar mi operación",
    "secondaryCta": "Hablar con nuestro equipo",
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
    "overviewButton": "Conocer más sobre sanitario",
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
    "servicesEyebrow": "Soluciones farmacéuticas y sanitarias",
    "servicesTitle": "Operaciones para productos críticos y sensibles.",
    "services": [
      [
        "Carga pharma",
        "Transporte para productos farmacéuticos y sanitarios."
      ],
      [
        "Temperatura controlada",
        "Soluciones para productos que requieren rangos térmicos."
      ],
      [
        "Dispositivos médicos",
        "Coordinación para equipos, insumos y productos sanitarios."
      ],
      [
        "Importación y exportación",
        "Soporte documental y aduanero para comercio sanitario."
      ],
      [
        "Almacenaje sensible",
        "Gestión de stock y preparación bajo control operativo."
      ],
      [
        "Door to door",
        "Coordinación completa hasta entrega final."
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
    "heroEyebrow": "Sector farmacéutico y sanitario",
    "heroTitle": "Logística sanitaria para productos que no admiten errores.",
    "heroText": "Coordinamos operaciones para productos farmacéuticos, sanitarios, médicos y sensibles, integrando control documental, trazabilidad, cadena de frío cuando aplica y seguimiento operativo.",
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
    "overviewButton": "Conocer más sobre sanitario",
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
    "servicesEyebrow": "Soluciones farmacéuticas y sanitarias",
    "servicesTitle": "Operaciones para productos críticos y sensibles.",
    "services": [
      [
        "Carga pharma",
        "Transporte para productos farmacéuticos y sanitarios."
      ],
      [
        "Temperatura controlada",
        "Soluciones para productos que requieren rangos térmicos."
      ],
      [
        "Dispositivos médicos",
        "Coordinación para equipos, insumos y productos sanitarios."
      ],
      [
        "Importación y exportación",
        "Soporte documental y aduanero para comercio sanitario."
      ],
      [
        "Almacenaje sensible",
        "Gestión de stock y preparación bajo control operativo."
      ],
      [
        "Door to door",
        "Coordinación completa hasta entrega final."
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
    "heroEyebrow": "Sector farmacéutico y sanitario",
    "heroTitle": "Logística sanitaria para productos que no admiten errores.",
    "heroText": "Coordinamos operaciones para productos farmacéuticos, sanitarios, médicos y sensibles, integrando control documental, trazabilidad, cadena de frío cuando aplica y seguimiento operativo.",
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
    "overviewButton": "Conocer más sobre sanitario",
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
    "servicesEyebrow": "Soluciones farmacéuticas y sanitarias",
    "servicesTitle": "Operaciones para productos críticos y sensibles.",
    "services": [
      [
        "Carga pharma",
        "Transporte para productos farmacéuticos y sanitarios."
      ],
      [
        "Temperatura controlada",
        "Soluciones para productos que requieren rangos térmicos."
      ],
      [
        "Dispositivos médicos",
        "Coordinación para equipos, insumos y productos sanitarios."
      ],
      [
        "Importación y exportación",
        "Soporte documental y aduanero para comercio sanitario."
      ],
      [
        "Almacenaje sensible",
        "Gestión de stock y preparación bajo control operativo."
      ],
      [
        "Door to door",
        "Coordinación completa hasta entrega final."
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/herofarmaseutico.png')" } as CSSProperties}>
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

</main>

      <Footer />
    </div>
  );
}
