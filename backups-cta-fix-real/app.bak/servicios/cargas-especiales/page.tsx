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
  es: {
    heroEyebrow: "Cargas especiales e industriales",
    heroTitle: "Ingeniería logística para cargas que no encajan en lo estándar.",
    heroText:
      "Coordinamos operaciones especiales para cargas sobredimensionadas, industriales, sensibles o de alto valor, integrando análisis técnico, permisos, rutas, manipulación y seguimiento operativo.",
    primaryCta: "Planificar mi operación",
    secondaryCta: "Talk to our team",

    activeLabel: "Operación especial activa",
    activeRoute: "Puerto → Obra",
    activeCargo: "Carga sobredimensionada",
    activeStatusLabel: "Estado:",
    activeStatus: "En planificación",
    activeEtaLabel: "Prioridad:",
    activeEta: "Alta complejidad",

    trust: [
      ["Sobredimensionadas", "Cargas fuera de estándar"],
      ["Ingeniería logística", "Análisis técnico"],
      ["Permisos y rutas", "Gestión operativa"],
      ["Seguimiento", "Control de principio a fin"],
    ],

    overviewEyebrow: "Operaciones especiales",
    overviewTitle: "Planificación precisa para cargas que requieren más que transporte.",
    overviewText:
      "Las cargas especiales exigen análisis, coordinación y control. Diseñamos soluciones para mercancías que requieren permisos, manipulación especializada, rutas estudiadas y equipos adaptados.",
    overviewButton: "Conocer más sobre cargas especiales",

    pillars: [
      ["Análisis técnico", "Evaluamos dimensiones, peso, centro de gravedad, ruta, manipulación y restricciones."],
      ["Gestión de permisos", "Coordinamos autorizaciones, documentación y requisitos operativos."],
      ["Manipulación especializada", "Integramos equipos, operadores y procedimientos adecuados para cada carga."],
      ["Seguimiento operativo", "Monitoreamos cada etapa para reducir riesgos y mantener control."],
    ],

    servicesEyebrow: "Nuestros servicios especiales",
    servicesTitle: "Soluciones diseñadas para cargas de alta complejidad.",
    services: [
      ["Carga sobredimensionada", "Operaciones para mercancías que superan medidas o pesos convencionales."],
      ["Carga industrial", "Transporte y coordinación para maquinaria, equipos y componentes productivos."],
      ["Proyectos especiales", "Planificación integral para cargas críticas, obras e infraestructuras."],
      ["Permisos y escoltas", "Gestión de autorizaciones, rutas especiales y acompañamiento cuando corresponde."],
      ["Multimodal especial", "Integración terrestre, marítima o aérea según la complejidad de la operación."],
      ["Door to door", "Coordinación completa desde origen hasta destino final."],
    ],

    useCasesEyebrow: "Cuándo requiere una operación especial",
    useCasesTitle: "Cuando la carga no puede tratarse como estándar.",
    useCases: [
      ["Maquinaria pesada", "Equipos industriales que requieren planificación y manipulación específica."],
      ["Componentes de obra", "Elementos para infraestructuras, energía o construcción."],
      ["Carga sobredimensionada", "Mercancías con dimensiones o pesos fuera de operación regular."],
      ["Carga sensible", "Bienes que requieren control, seguridad y procedimientos especiales."],
      ["Proyectos llave en mano", "Coordinación integral para operaciones de alta complejidad."],
      ["Operaciones multimodales", "Movimientos que combinan diferentes modos de transporte."],
    ],

    processEyebrow: "Nuestro proceso operativo",
    processTitle: "Una operación especial diseñada antes de mover la carga.",
    process: [
      ["Análisis de carga", "Revisamos dimensiones, peso, fragilidad, requisitos y destino final."],
      ["Estudio de ruta", "Evaluamos restricciones, accesos, permisos y viabilidad operativa."],
      ["Plan documental", "Coordinamos autorizaciones, seguros y documentación requerida."],
      ["Equipo y manipulación", "Definimos medios, operadores y procedimientos de carga."],
      ["Seguimiento", "Monitoreamos hitos críticos durante todo el movimiento."],
      ["Entrega final", "Coordinamos descarga, recepción y cierre seguro de la operación."],
    ],

    bandTitle: "Operaciones especiales diseñadas para cargas que no admiten improvisación.",
    bandText:
      "Nuestro equipo coordina cargas industriales y especiales para empresas que necesitan planificación técnica, control operativo y respuesta profesional ante movimientos complejos.",
    stats: [
      ["Alta complejidad", "Operaciones fuera de estándar"],
      ["Permisos", "Gestión documental y rutas"],
      ["Multimodal", "Integración logística"],
      ["Soporte experto", "Especialistas dedicados"],
    ],

    finalTitle: "Coordinemos su próxima carga especial.",
    finalText:
      "Cuéntenos dimensiones, peso, origen, destino y restricciones. Nuestro equipo analizará la viabilidad y la mejor solución operativa.",
    finalPrimary: "Solicitar cotización especial",
    finalSecondary: "Hablar con un especialista",
  },

  en: {
    heroEyebrow: "Special and industrial cargo",
    heroTitle: "Logistics engineering for cargo that does not fit the standard.",
    heroText:
      "We coordinate special operations for oversized, industrial, sensitive or high-value cargo, integrating technical analysis, permits, routes, handling and operational tracking.",
    primaryCta: "Plan my operation",
    secondaryCta: "Talk to our team",

    activeLabel: "Active special operation",
    activeRoute: "Port → Site",
    activeCargo: "Oversized cargo",
    activeStatusLabel: "Status:",
    activeStatus: "In planning",
    activeEtaLabel: "Priority:",
    activeEta: "High complexity",

    trust: [
      ["Oversized", "Non-standard cargo"],
      ["Logistics engineering", "Technical analysis"],
      ["Permits and routes", "Operational management"],
      ["Tracking", "End-to-end control"],
    ],

    overviewEyebrow: "Special operations",
    overviewTitle: "Precise planning for cargo that requires more than transport.",
    overviewText:
      "Special cargo requires analysis, coordination and control. We design solutions for goods that require permits, specialized handling, studied routes and adapted equipment.",
    overviewButton: "Learn more about special cargo",

    pillars: [
      ["Technical analysis", "We assess dimensions, weight, center of gravity, route, handling and restrictions."],
      ["Permit management", "We coordinate authorizations, documentation and operational requirements."],
      ["Specialized handling", "We integrate equipment, operators and procedures adapted to each cargo."],
      ["Operational tracking", "We monitor every stage to reduce risk and maintain control."],
    ],

    servicesEyebrow: "Our special services",
    servicesTitle: "Solutions designed for high-complexity cargo.",
    services: [
      ["Oversized cargo", "Operations for goods exceeding conventional dimensions or weights."],
      ["Industrial cargo", "Transport and coordination for machinery, equipment and productive components."],
      ["Special projects", "End-to-end planning for critical cargo, sites and infrastructure."],
      ["Permits and escorts", "Management of authorizations, special routes and escort when required."],
      ["Special multimodal", "Road, ocean or air integration according to operational complexity."],
      ["Door to door", "Complete coordination from origin to final destination."],
    ],

    useCasesEyebrow: "When a special operation is required",
    useCasesTitle: "When cargo cannot be treated as standard.",
    useCases: [
      ["Heavy machinery", "Industrial equipment requiring planning and specific handling."],
      ["Site components", "Elements for infrastructure, energy or construction."],
      ["Oversized cargo", "Goods with dimensions or weights outside regular operation."],
      ["Sensitive cargo", "Goods requiring control, security and special procedures."],
      ["Turnkey projects", "End-to-end coordination for high-complexity operations."],
      ["Multimodal operations", "Movements combining different transport modes."],
    ],

    processEyebrow: "Our operational process",
    processTitle: "A special operation designed before moving the cargo.",
    process: [
      ["Cargo analysis", "We review dimensions, weight, fragility, requirements and final destination."],
      ["Route study", "We assess restrictions, access, permits and operational viability."],
      ["Document plan", "We coordinate authorizations, insurance and required documentation."],
      ["Equipment and handling", "We define resources, operators and loading procedures."],
      ["Tracking", "We monitor critical milestones throughout the movement."],
      ["Final delivery", "We coordinate unloading, reception and secure operation closure."],
    ],

    bandTitle: "Special operations designed for cargo that cannot be improvised.",
    bandText:
      "Our team coordinates industrial and special cargo for companies that need technical planning, operational control and professional response for complex movements.",
    stats: [
      ["High complexity", "Non-standard operations"],
      ["Permits", "Documents and route management"],
      ["Multimodal", "Logistics integration"],
      ["Expert support", "Dedicated specialists"],
    ],

    finalTitle: "Let’s coordinate your next special cargo.",
    finalText:
      "Tell us dimensions, weight, origin, destination and restrictions. Our team will analyze feasibility and the best operational solution.",
    finalPrimary: "Request special quotation",
    finalSecondary: "Talk to a specialist",
  },

  zh: {
    heroEyebrow: "特殊与工业货物",
    heroTitle: "为非标准货物提供物流工程方案。",
    heroText:
      "我们协调超限、工业、敏感或高价值货物的特殊运输，整合技术分析、许可、路线、装卸和运营跟踪。",
    primaryCta: "规划物流操作",
    secondaryCta: "联系我们的团队",

    activeLabel: "进行中的特殊操作",
    activeRoute: "港口 → 工地",
    activeCargo: "超限货物",
    activeStatusLabel: "状态：",
    activeStatus: "规划中",
    activeEtaLabel: "优先级：",
    activeEta: "高复杂度",

    trust: [
      ["超限货物", "非标准货物"],
      ["物流工程", "技术分析"],
      ["许可与路线", "运营管理"],
      ["跟踪", "全流程控制"],
    ],

    overviewEyebrow: "特殊操作",
    overviewTitle: "为需要超越普通运输的货物提供精准规划。",
    overviewText:
      "特殊货物需要分析、协调和控制。我们为需要许可、专业装卸、路线研究和适配设备的货物设计解决方案。",
    overviewButton: "了解特殊货物服务",

    pillars: [
      ["技术分析", "评估尺寸、重量、重心、路线、装卸和限制。"],
      ["许可管理", "协调授权、文件和运营要求。"],
      ["专业装卸", "整合适合每批货物的设备、操作人员和流程。"],
      ["运营跟踪", "监控每个阶段以降低风险并保持控制。"],
    ],

    servicesEyebrow: "我们的特殊服务",
    servicesTitle: "为高复杂度货物设计的解决方案。",
    services: [
      ["超限货物", "为超过常规尺寸或重量的货物提供运输操作。"],
      ["工业货物", "为机械、设备和生产组件提供运输与协调。"],
      ["特殊项目", "为关键货物、工地和基础设施提供整体规划。"],
      ["许可与护送", "管理授权、特殊路线和必要时的护送。"],
      ["特殊多式联运", "根据操作复杂度整合陆运、海运或空运。"],
      ["门到门", "从始发地到最终目的地的完整协调。"],
    ],

    useCasesEyebrow: "何时需要特殊操作",
    useCasesTitle: "当货物不能按标准方式处理时。",
    useCases: [
      ["重型机械", "需要规划和特定装卸的工业设备。"],
      ["工程组件", "用于基础设施、能源或建筑的部件。"],
      ["超限货物", "尺寸或重量超出常规操作的货物。"],
      ["敏感货物", "需要控制、安全和特殊流程的货物。"],
      ["交钥匙项目", "为高复杂度业务提供整体协调。"],
      ["多式联运", "结合不同运输方式的操作。"],
    ],

    processEyebrow: "我们的运营流程",
    processTitle: "在移动货物之前设计特殊操作。",
    process: [
      ["货物分析", "审核尺寸、重量、易损性、要求和最终目的地。"],
      ["路线研究", "评估限制、通行、许可和操作可行性。"],
      ["文件计划", "协调授权、保险和所需文件。"],
      ["设备与装卸", "确定资源、操作人员和装载程序。"],
      ["跟踪", "监控运输过程中的关键节点。"],
      ["最终交付", "协调卸货、接收和安全关闭操作。"],
    ],

    bandTitle: "为不能即兴处理的货物设计特殊操作。",
    bandText:
      "我们的团队为需要技术规划、运营控制和专业响应的企业协调工业和特殊货物。",
    stats: [
      ["高复杂度", "非标准操作"],
      ["许可", "文件和路线管理"],
      ["多式联运", "物流整合"],
      ["专家支持", "专属专家"],
    ],

    finalTitle: "让我们协调您的下一批特殊货物。",
    finalText:
      "告诉我们尺寸、重量、始发地、目的地和限制。我们的团队将分析可行性和最佳操作方案。",
    finalPrimary: "申请特殊报价",
    finalSecondary: "联系专家",
  },
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

export default function CargasEspecialesPage() {
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
        <section className={styles.hero}>
          <Image
            src="/images/cargas-especiales-desktop/transporte-especial-hero.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/cargas-especiales-desktop/transporte-especial-hero.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 0px"
            className={`${styles.heroImage} ${styles.heroImageMobile}`}
          />

          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>{t.heroEyebrow}</span>
              <h1>{t.heroTitle}</h1>
              <p>{t.heroText}</p>

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
        </section>

        <section className={styles.trustBar}>
          {t.trust.map(([title, text]: string[], index: number) => {
            const icons: IconName[] = ["timer", "shield", "document", "tracking"];

            return (
              <div key={title}>
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

        <section className={styles.services} style={{ "--mobile-bg": "url('/images/cargas-especiales-mobile/carga-especial1.png')" } as CSSProperties}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.servicesEyebrow}</span>
            <h2>{t.servicesTitle}</h2>
          </div>

          <div className={styles.serviceGrid}>
            {t.services.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["gear", "package", "shield", "route", "globe", "truck"];

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

        <section className={styles.useCases}>
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
              const icons: IconName[] = ["search", "package", "document", "route", "tracking", "truck"];

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

        <section className={styles.darkBand}>
          <div className={styles.darkBandImage}>
            <Image
              src="/images/sectores/transportemaritimo.png"
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/cargas-especiales-mobile/carga-especial2.png')" } as CSSProperties}>
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
              src="/images/sectores/transportemaritimo.png"
              alt={t.finalTitle}
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
        </section>

        <RelatedServices current="cargas-especiales" locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
