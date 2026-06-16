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
    heroEyebrow: "Transporte terrestre internacional",
    heroTitle: "Rutas terrestres que conectan operaciones críticas.",
    heroText:
      "Coordinamos transporte terrestre nacional e internacional para cargas completas, grupaje, distribución y operaciones especiales, con seguimiento operativo y control documental de origen a destino.",
    primaryCta: "Planificar mi operación",
    secondaryCta: "Hablar con nuestro equipo",

    activeLabel: "Operación terrestre activa",
    activeRoute: "Madrid → Valencia",
    activeCargo: "Carga FTL / LTL",
    activeStatusLabel: "Estado:",
    activeStatus: "En coordinación",
    activeEtaLabel: "Entrega:",
    activeEta: "Programada",

    trust: [
      ["Carga completa", "FTL / LTL"],
      ["Distribución", "Red terrestre"],
      ["Documentación", "Control fronterizo"],
      ["Seguimiento", "Trazabilidad operativa"],
    ],

    overviewEyebrow: "Operaciones por carretera",
    overviewTitle: "Control, continuidad y precisión en cada tramo terrestre.",
    overviewText:
      "El transporte terrestre exige planificación de rutas, coordinación documental, visibilidad operativa y capacidad de respuesta. Diseñamos operaciones nacionales e internacionales para cargas que requieren puntualidad, seguridad y control.",
    overviewButton: "Conocer más sobre terrestre",

    pillars: [
      ["Planificación de rutas", "Diseño de trayectos eficientes según origen, destino, urgencia y tipo de carga."],
      ["Control documental", "Gestión de documentación comercial, aduanera y operativa para tránsitos nacionales e internacionales."],
      ["Seguimiento operativo", "Monitoreo de la operación para mantener visibilidad sobre cada movimiento."],
      ["Entrega puerta a puerta", "Integración de retiro, transporte, conexión logística y entrega final."],
    ],

    servicesEyebrow: "Nuestros servicios terrestres",
    servicesTitle: "Soluciones terrestres para cada necesidad logística.",
    services: [
      ["Carga completa FTL", "Transporte dedicado para operaciones que requieren capacidad exclusiva y control directo."],
      ["Carga parcial LTL", "Optimización de costos mediante consolidación y rutas compartidas."],
      ["Distribución nacional", "Movimientos regionales y nacionales con coordinación operativa y trazabilidad."],
      ["Cargas especiales", "Soluciones por carretera para mercancías sensibles, industriales o de manejo particular."],
      ["Cross-border", "Coordinación terrestre internacional con soporte documental y control fronterizo."],
      ["Door to door", "Desde retiro en origen hasta entrega final en destino con un solo flujo operativo."],
    ],

    useCasesEyebrow: "Cuándo conviene usar transporte terrestre",
    useCasesTitle: "Cuando la operación necesita cercanía, control y continuidad.",
    useCases: [
      ["Distribución comercial", "Movimientos frecuentes para cadenas de suministro y entregas programadas."],
      ["Carga industrial", "Transporte para componentes, maquinaria, repuestos y mercancías productivas."],
      ["Conexión multimodal", "Integración con operaciones marítimas, aéreas o logísticas de almacén."],
      ["Última milla B2B", "Entrega final coordinada para clientes corporativos y operaciones comerciales."],
      ["Cross-border", "Operaciones terrestres entre países con documentación y seguimiento."],
      ["Carga sensible", "Movimientos que requieren control, coordinación y visibilidad."],
    ],

    processEyebrow: "Nuestro proceso operativo",
    processTitle: "Una operación terrestre clara desde el primer contacto.",
    process: [
      ["Análisis de carga", "Revisamos tipo de mercancía, volumen, peso, origen, destino y urgencia."],
      ["Diseño de ruta", "Definimos la alternativa terrestre más eficiente y segura."],
      ["Documentación", "Coordinamos requisitos comerciales, aduaneros y operativos."],
      ["Asignación de transporte", "Gestionamos capacidad, unidad y coordinación de salida."],
      ["Seguimiento", "Monitoreamos el avance y los hitos de la operación."],
      ["Entrega final", "Coordinamos recepción, descarga y cierre operativo."],
    ],

    bandTitle: "Operaciones terrestres diseñadas para cargas que no pueden detenerse.",
    bandText:
      "Nuestro equipo coordina transporte terrestre para empresas que necesitan continuidad, trazabilidad y respuesta profesional en cada tramo de la cadena logística.",
    stats: [
      ["Rutas terrestres", "Cobertura nacional e internacional"],
      ["FTL / LTL", "Carga completa y consolidada"],
      ["Control operativo", "Seguimiento de origen a destino"],
      ["Soporte experto", "Especialistas dedicados"],
    ],

    finalTitle: "Coordinemos su próxima operación terrestre.",
    finalText:
      "Cuéntenos origen, destino, tipo de carga y urgencia. Nuestro equipo analizará la mejor solución terrestre para su operación.",
    finalPrimary: "Solicitar cotización terrestre",
    finalSecondary: "Hablar con un especialista",
  },

  en: {
    heroEyebrow: "International road freight",
    heroTitle: "Road routes that connect critical operations.",
    heroText:
      "We coordinate domestic and international road freight for full loads, partial loads, distribution and special operations, with operational tracking and document control from origin to destination.",
    primaryCta: "Plan my operation",
    secondaryCta: "Talk to our team",

    activeLabel: "Active road operation",
    activeRoute: "Madrid → Valencia",
    activeCargo: "FTL / LTL cargo",
    activeStatusLabel: "Status:",
    activeStatus: "In coordination",
    activeEtaLabel: "Delivery:",
    activeEta: "Scheduled",

    trust: [
      ["Full load", "FTL / LTL"],
      ["Distribution", "Road network"],
      ["Documentation", "Border control"],
      ["Tracking", "Operational visibility"],
    ],

    overviewEyebrow: "Road operations",
    overviewTitle: "Control, continuity and precision across every road segment.",
    overviewText:
      "Road freight requires route planning, document coordination, operational visibility and response capacity. We design domestic and international operations for cargo that requires punctuality, security and control.",
    overviewButton: "Learn more about road freight",

    pillars: [
      ["Route planning", "Efficient route design according to origin, destination, urgency and cargo type."],
      ["Document control", "Commercial, customs and operational document management."],
      ["Operational tracking", "Monitoring to maintain visibility over every movement."],
      ["Door-to-door delivery", "Integrated pickup, transport, logistics connection and final delivery."],
    ],

    servicesEyebrow: "Our road services",
    servicesTitle: "Road solutions for every logistics requirement.",
    services: [
      ["FTL full load", "Dedicated transport for operations requiring exclusive capacity and direct control."],
      ["LTL partial load", "Cost optimization through consolidation and shared routes."],
      ["Domestic distribution", "Regional and national movements with operational coordination."],
      ["Special road cargo", "Road solutions for sensitive, industrial or special-handling goods."],
      ["Cross-border", "International road coordination with document support and border control."],
      ["Door to door", "From origin pickup to final delivery under one operational flow."],
    ],

    useCasesEyebrow: "When to use road freight",
    useCasesTitle: "When the operation needs proximity, control and continuity.",
    useCases: [
      ["Commercial distribution", "Frequent movements for supply chains and scheduled deliveries."],
      ["Industrial cargo", "Transport for components, machinery, spare parts and productive goods."],
      ["Multimodal connection", "Integration with ocean, air or warehousing operations."],
      ["B2B last mile", "Final delivery for corporate clients and commercial operations."],
      ["Cross-border", "International road operations with documentation and tracking."],
      ["Sensitive cargo", "Movements requiring control, coordination and visibility."],
    ],

    processEyebrow: "Our operational process",
    processTitle: "A clear road operation from the first contact.",
    process: [
      ["Cargo analysis", "We review goods type, volume, weight, origin, destination and urgency."],
      ["Route design", "We define the most efficient and secure road alternative."],
      ["Documentation", "We coordinate commercial, customs and operational requirements."],
      ["Transport allocation", "We manage capacity, vehicle and departure coordination."],
      ["Tracking", "We monitor progress and operational milestones."],
      ["Final delivery", "We coordinate reception, unloading and operation closure."],
    ],

    bandTitle: "Road operations designed for cargo that cannot stop.",
    bandText:
      "Our team coordinates road transport for companies that need continuity, traceability and professional response across every segment of the logistics chain.",
    stats: [
      ["Road routes", "Domestic and international coverage"],
      ["FTL / LTL", "Full and consolidated cargo"],
      ["Operational control", "Tracking from origin to destination"],
      ["Expert support", "Dedicated specialists"],
    ],

    finalTitle: "Let’s coordinate your next road operation.",
    finalText:
      "Tell us origin, destination, cargo type and urgency. Our team will analyze the best road solution for your operation.",
    finalPrimary: "Request road quotation",
    finalSecondary: "Talk to a specialist",
  },

  zh: {
    heroEyebrow: "国际陆运",
    heroTitle: "连接关键业务的陆运路线。",
    heroText:
      "我们协调国内及国际陆运，包括整车、零担、配送和特殊运输，并提供从始发地到目的地的运营跟踪和文件控制。",
    primaryCta: "规划物流操作",
    secondaryCta: "联系我们的团队",

    activeLabel: "进行中的陆运操作",
    activeRoute: "马德里 → 瓦伦西亚",
    activeCargo: "FTL / LTL 货物",
    activeStatusLabel: "状态：",
    activeStatus: "协调中",
    activeEtaLabel: "交付：",
    activeEta: "已安排",

    trust: [
      ["整车运输", "FTL / LTL"],
      ["配送服务", "陆运网络"],
      ["文件管理", "边境控制"],
      ["运输跟踪", "运营可视化"],
    ],

    overviewEyebrow: "陆运运营",
    overviewTitle: "在每一个陆运环节实现控制、连续性与精准。",
    overviewText:
      "陆运需要路线规划、文件协调、运营可视化和响应能力。我们为需要准时、安全和控制的货物设计国内及国际运输方案。",
    overviewButton: "了解陆运服务",

    pillars: [
      ["路线规划", "根据始发地、目的地、紧急程度和货物类型设计高效路线。"],
      ["文件控制", "管理商业、海关和运营文件。"],
      ["运营跟踪", "监控每次运输以保持可视化。"],
      ["门到门交付", "整合提货、运输、物流衔接和最终交付。"],
    ],

    servicesEyebrow: "我们的陆运服务",
    servicesTitle: "适用于不同物流需求的陆运解决方案。",
    services: [
      ["FTL 整车", "为需要专属运力和直接控制的业务提供专车运输。"],
      ["LTL 零担", "通过拼载和共享路线优化成本。"],
      ["国内配送", "区域和全国运输，配合运营协调。"],
      ["特殊陆运货物", "为敏感、工业或特殊处理货物提供道路运输方案。"],
      ["跨境陆运", "提供文件支持和边境控制的国际陆运协调。"],
      ["门到门", "从始发地提货到目的地最终交付的一体化流程。"],
    ],

    useCasesEyebrow: "何时选择陆运",
    useCasesTitle: "当运营需要接近性、控制和连续性时。",
    useCases: [
      ["商业配送", "供应链和计划交付的高频运输。"],
      ["工业货物", "零部件、机械、备件和生产货物运输。"],
      ["多式联运衔接", "与海运、空运或仓储业务衔接。"],
      ["B2B 最后一公里", "为企业客户和商业业务协调最终交付。"],
      ["跨境运输", "带有文件和跟踪支持的国际陆运。"],
      ["敏感货物", "需要控制、协调和可视化的运输。"],
    ],

    processEyebrow: "我们的运营流程",
    processTitle: "从首次联系开始，陆运操作清晰可控。",
    process: [
      ["货物分析", "审核货物类型、体积、重量、始发地、目的地和紧急程度。"],
      ["路线设计", "确定最高效且安全的陆运方案。"],
      ["文件管理", "协调商业、海关和运营要求。"],
      ["车辆安排", "管理运力、车辆和发运协调。"],
      ["跟踪", "监控运输进度和运营节点。"],
      ["最终交付", "协调收货、卸货和运营关闭。"],
    ],

    bandTitle: "为不能停止的货物设计的陆运操作。",
    bandText:
      "我们的团队为需要连续性、可追溯性和专业响应的企业协调陆运服务。",
    stats: [
      ["陆运路线", "国内及国际覆盖"],
      ["FTL / LTL", "整车与拼载货物"],
      ["运营控制", "从始发地到目的地跟踪"],
      ["专家支持", "专属专家"],
    ],

    finalTitle: "让我们协调您的下一次陆运操作。",
    finalText:
      "告诉我们始发地、目的地、货物类型和紧急程度。我们的团队将分析最合适的陆运方案。",
    finalPrimary: "申请陆运报价",
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

export default function TransporteTerrestrePage() {
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
        <section className={styles.hero} data-service-name="transporte-terrestre" data-service-hero-home="true"
      >
          <Image
            src="/images/sectores/transporteterrestre.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/transporte-terrestre-mobile/trannsporte-terrestre1.png"
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

          <div className={styles.commandBar} data-service-trust="transporte-terrestre">
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/sectores/transporteterrestre.png')" } as CSSProperties}>
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

            <div className={styles.darkBandActions}>
              <Link href="/cotizacion">{t.finalPrimary}</Link>
              <Link href="/contacto">{t.finalSecondary}</Link>
            </div>
            <div className={styles.stats}>
              {t.stats.map(([value, label]: string[]) => (
                <article key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/sectores/transporteterrestre.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/sectores/transporteterrestre.png"
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
