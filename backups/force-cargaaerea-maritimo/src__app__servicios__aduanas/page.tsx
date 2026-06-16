"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import RelatedServices from "../_shared/RelatedServices";
import styles from "./Aduanas.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  "es": {
    "heroEyebrow": "Servicios de aduanas",
    "heroTitle": "Despacho aduanero para operaciones que no pueden quedar detenidas.",
    "heroText": "Gestionamos documentación, clasificación, cumplimiento y coordinación aduanera para importaciones y exportaciones, reduciendo riesgos operativos y tiempos de liberación.",
    "primaryCta": "Planificar mi operación",
    "secondaryCta": "Hablar con nuestro equipo",
    "activeLabel": "Gestión aduanera activa",
    "activeRoute": "Origen → Aduana → Destino",
    "activeCargo": "Importación / Exportación",
    "activeStatusLabel": "Estado:",
    "activeStatus": "En revisión",
    "activeEtaLabel": "Prioridad:",
    "activeEta": "Liberación",
    "trust": [
      [
        "Documentación",
        "Control aduanero"
      ],
      [
        "Clasificación",
        "Partidas arancelarias"
      ],
      [
        "Cumplimiento",
        "Normativa vigente"
      ],
      [
        "Liberación",
        "Gestión operativa"
      ]
    ],
    "overviewEyebrow": "Cumplimiento aduanero",
    "overviewTitle": "Gestión documental y operativa para mover carga sin fricciones.",
    "overviewText": "Una operación internacional puede detenerse por un documento incompleto, una clasificación incorrecta o una gestión tardía. Nuestro equipo coordina el proceso aduanero para reducir riesgos y mantener continuidad.",
    "overviewButton": "Conocer más sobre aduanas",
    "pillars": [
      [
        "Revisión documental",
        "Control de facturas, packing list, certificados y documentos requeridos."
      ],
      [
        "Clasificación arancelaria",
        "Soporte para identificar partidas y requisitos aplicables."
      ],
      [
        "Gestión de despacho",
        "Coordinación del proceso de importación o exportación con operadores y autoridades."
      ],
      [
        "Cumplimiento normativo",
        "Apoyo para reducir riesgos, errores y demoras operativas."
      ]
    ],
    "servicesEyebrow": "Nuestros servicios aduaneros",
    "servicesTitle": "Soluciones para importaciones y exportaciones con control.",
    "services": [
      [
        "Despacho de importación",
        "Gestión documental y operativa para ingreso de mercancía."
      ],
      [
        "Despacho de exportación",
        "Coordinación para salida internacional de carga."
      ],
      [
        "Clasificación arancelaria",
        "Soporte para partidas, requisitos y tratamiento documental."
      ],
      [
        "Revisión documental",
        "Validación de documentos comerciales y operativos."
      ],
      [
        "Asesoría aduanera",
        "Acompañamiento para operaciones complejas o recurrentes."
      ],
      [
        "Coordinación integral",
        "Integración con transporte, almacén y entrega final."
      ]
    ],
    "useCasesEyebrow": "Cuándo necesita soporte aduanero",
    "useCasesTitle": "Cuando la documentación define el avance de la operación.",
    "useCases": [
      [
        "Importaciones",
        "Ingreso de mercancía con control documental."
      ],
      [
        "Exportaciones",
        "Salida internacional con coordinación aduanera."
      ],
      [
        "Carga sensible",
        "Mercancías con requisitos específicos."
      ],
      [
        "Operaciones recurrentes",
        "Procesos continuos que requieren orden y seguimiento."
      ],
      [
        "Proyectos internacionales",
        "Cargas con documentación compleja."
      ],
      [
        "Multimodal",
        "Operaciones que combinan transporte y despacho."
      ]
    ],
    "processEyebrow": "Nuestro proceso operativo",
    "processTitle": "Una gestión aduanera clara desde la revisión documental.",
    "process": [
      [
        "Análisis inicial",
        "Revisamos tipo de operación, carga y documentación disponible."
      ],
      [
        "Validación documental",
        "Controlamos requisitos, certificados y datos comerciales."
      ],
      [
        "Clasificación",
        "Apoyamos la identificación arancelaria y requisitos aplicables."
      ],
      [
        "Coordinación de despacho",
        "Gestionamos el avance con operadores y autoridades."
      ],
      [
        "Seguimiento",
        "Monitoreamos estados y posibles observaciones."
      ],
      [
        "Liberación",
        "Coordinamos cierre aduanero y continuidad logística."
      ]
    ],
    "bandTitle": "Gestión aduanera diseñada para que la carga siga avanzando.",
    "bandText": "Nuestro equipo coordina procesos aduaneros para empresas que necesitan cumplimiento, precisión documental y continuidad operativa en comercio internacional.",
    "stats": [
      [
        "Documentación",
        "Revisión y control"
      ],
      [
        "Clasificación",
        "Soporte arancelario"
      ],
      [
        "Despacho",
        "Importación y exportación"
      ],
      [
        "Soporte experto",
        "Especialistas dedicados"
      ]
    ],
    "finalTitle": "Coordinemos su próxima operación aduanera.",
    "finalText": "Cuéntenos tipo de operación, mercancía, origen, destino y documentación disponible. Nuestro equipo analizará el mejor camino para avanzar.",
    "finalPrimary": "Solicitar soporte aduanero",
    "finalSecondary": "Hablar con un especialista"
  },
  "en": {
    "heroEyebrow": "Customs services",
    "heroTitle": "Customs clearance for operations that cannot remain stopped.",
    "heroText": "We manage documentation, classification, compliance and customs coordination for imports and exports, reducing operational risks and release times.",
    "primaryCta": "Plan my operation",
    "secondaryCta": "Talk to our team",
    "activeLabel": "Active customs management",
    "activeRoute": "Origin → Customs → Destination",
    "activeCargo": "Import / Export",
    "activeStatusLabel": "Status:",
    "activeStatus": "Under review",
    "activeEtaLabel": "Priority:",
    "activeEta": "Release",
    "trust": [
      [
        "Documentation",
        "Customs control"
      ],
      [
        "Classification",
        "Tariff codes"
      ],
      [
        "Compliance",
        "Current regulation"
      ],
      [
        "Release",
        "Operational management"
      ]
    ],
    "overviewEyebrow": "Customs compliance",
    "overviewTitle": "Documentary and operational management to move cargo without friction.",
    "overviewText": "An international operation can be stopped by an incomplete document, an incorrect classification or late management. Our team coordinates the customs process to reduce risks and maintain continuity.",
    "overviewButton": "Learn more about customs",
    "pillars": [
      [
        "Document review",
        "Control of invoices, packing lists, certificates and required documents."
      ],
      [
        "Tariff classification",
        "Support to identify codes and applicable requirements."
      ],
      [
        "Clearance management",
        "Coordination of import or export processes with operators and authorities."
      ],
      [
        "Regulatory compliance",
        "Support to reduce risks, errors and operational delays."
      ]
    ],
    "servicesEyebrow": "Our customs services",
    "servicesTitle": "Solutions for imports and exports with control.",
    "services": [
      [
        "Import clearance",
        "Documentary and operational management for goods entry."
      ],
      [
        "Export clearance",
        "Coordination for international cargo departure."
      ],
      [
        "Tariff classification",
        "Support for codes, requirements and document treatment."
      ],
      [
        "Document review",
        "Validation of commercial and operational documents."
      ],
      [
        "Customs advisory",
        "Support for complex or recurring operations."
      ],
      [
        "Integrated coordination",
        "Integration with transport, warehousing and final delivery."
      ]
    ],
    "useCasesEyebrow": "When customs support is needed",
    "useCasesTitle": "When documentation defines operational progress.",
    "useCases": [
      [
        "Imports",
        "Goods entry with document control."
      ],
      [
        "Exports",
        "International departure with customs coordination."
      ],
      [
        "Sensitive cargo",
        "Goods with specific requirements."
      ],
      [
        "Recurring operations",
        "Continuous processes requiring order and tracking."
      ],
      [
        "International projects",
        "Cargo with complex documentation."
      ],
      [
        "Multimodal",
        "Operations combining transport and clearance."
      ]
    ],
    "processEyebrow": "Our operational process",
    "processTitle": "Clear customs management from document review.",
    "process": [
      [
        "Initial analysis",
        "We review operation type, cargo and available documentation."
      ],
      [
        "Document validation",
        "We control requirements, certificates and commercial data."
      ],
      [
        "Classification",
        "We support tariff identification and applicable requirements."
      ],
      [
        "Clearance coordination",
        "We manage progress with operators and authorities."
      ],
      [
        "Tracking",
        "We monitor statuses and possible observations."
      ],
      [
        "Release",
        "We coordinate customs closure and logistics continuity."
      ]
    ],
    "bandTitle": "Customs management designed to keep cargo moving.",
    "bandText": "Our team coordinates customs processes for companies that need compliance, documentary precision and operational continuity in international trade.",
    "stats": [
      [
        "Documentation",
        "Review and control"
      ],
      [
        "Classification",
        "Tariff support"
      ],
      [
        "Clearance",
        "Import and export"
      ],
      [
        "Expert support",
        "Dedicated specialists"
      ]
    ],
    "finalTitle": "Let’s coordinate your next customs operation.",
    "finalText": "Tell us operation type, goods, origin, destination and available documentation. Our team will analyze the best path forward.",
    "finalPrimary": "Request customs support",
    "finalSecondary": "Talk to a specialist"
  },
  "zh": {
    "heroEyebrow": "海关服务",
    "heroTitle": "为不能停滞的业务提供清关服务。",
    "heroText": "我们为进出口业务管理文件、归类、合规和海关协调，降低运营风险并缩短放行时间。",
    "primaryCta": "规划物流操作",
    "secondaryCta": "联系我们的团队",
    "activeLabel": "进行中的海关管理",
    "activeRoute": "始发地 → 海关 → 目的地",
    "activeCargo": "进口 / 出口",
    "activeStatusLabel": "状态：",
    "activeStatus": "审核中",
    "activeEtaLabel": "优先级：",
    "activeEta": "放行",
    "trust": [
      [
        "文件",
        "海关控制"
      ],
      [
        "归类",
        "税则编码"
      ],
      [
        "合规",
        "现行法规"
      ],
      [
        "放行",
        "运营管理"
      ]
    ],
    "overviewEyebrow": "海关合规",
    "overviewTitle": "通过文件和运营管理让货物顺畅流动。",
    "overviewText": "国际业务可能因文件不完整、归类错误或管理延迟而停滞。我们的团队协调海关流程以降低风险并保持连续性。",
    "overviewButton": "了解海关服务",
    "pillars": [
      [
        "文件审核",
        "控制发票、装箱单、证书和所需文件。"
      ],
      [
        "税则归类",
        "支持识别编码和适用要求。"
      ],
      [
        "清关管理",
        "与运营商和主管部门协调进口或出口流程。"
      ],
      [
        "法规合规",
        "帮助降低风险、错误和运营延误。"
      ]
    ],
    "servicesEyebrow": "我们的海关服务",
    "servicesTitle": "为进出口提供可控解决方案。",
    "services": [
      [
        "进口清关",
        "为货物进口提供文件和运营管理。"
      ],
      [
        "出口清关",
        "协调国际货物出口。"
      ],
      [
        "税则归类",
        "支持编码、要求和文件处理。"
      ],
      [
        "文件审核",
        "验证商业和运营文件。"
      ],
      [
        "海关咨询",
        "为复杂或重复业务提供支持。"
      ],
      [
        "综合协调",
        "与运输、仓储和最终交付整合。"
      ]
    ],
    "useCasesEyebrow": "何时需要海关支持",
    "useCasesTitle": "当文件决定操作进度时。",
    "useCases": [
      [
        "进口",
        "带有文件控制的货物入境。"
      ],
      [
        "出口",
        "带有海关协调的国际出运。"
      ],
      [
        "敏感货物",
        "具有特定要求的货物。"
      ],
      [
        "重复业务",
        "需要秩序和跟踪的连续流程。"
      ],
      [
        "国际项目",
        "文件复杂的货物。"
      ],
      [
        "多式联运",
        "结合运输和清关的业务。"
      ]
    ],
    "processEyebrow": "我们的运营流程",
    "processTitle": "从文件审核开始，海关管理清晰可控。",
    "process": [
      [
        "初步分析",
        "审核业务类型、货物和现有文件。"
      ],
      [
        "文件验证",
        "控制要求、证书和商业数据。"
      ],
      [
        "归类",
        "支持税则识别和适用要求。"
      ],
      [
        "清关协调",
        "与运营商和主管部门推动流程。"
      ],
      [
        "跟踪",
        "监控状态和可能的问题。"
      ],
      [
        "放行",
        "协调海关关闭和物流连续性。"
      ]
    ],
    "bandTitle": "为保持货物流动而设计的海关管理。",
    "bandText": "我们的团队为需要合规、文件精准和国际贸易运营连续性的企业协调海关流程。",
    "stats": [
      [
        "文件",
        "审核与控制"
      ],
      [
        "归类",
        "税则支持"
      ],
      [
        "清关",
        "进口与出口"
      ],
      [
        "专家支持",
        "专属专家"
      ]
    ],
    "finalTitle": "让我们协调您的下一次海关操作。",
    "finalText": "告诉我们业务类型、货物、始发地、目的地和现有文件。我们的团队将分析最佳推进路径。",
    "finalPrimary": "申请海关支持",
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

export default function AduanasPage() {
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
        <section className={styles.hero} data-service-name="aduanas" data-service-hero-home="true"
      >
          <Image
            src="/images/aduanashero.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/caduana.png"
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

          <div className={styles.commandBar} data-service-trust="aduanas">
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/aduanashero.png')" } as CSSProperties}>
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/aduanashero.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/aduanashero.png"
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
