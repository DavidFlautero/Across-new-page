"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "./QuienesSomos.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    heroEyebrow: "Quiénes somos",
    heroTitle: "Logística internacional para empresas que necesitan control, precisión y capacidad operativa global.",
    heroText:
      "Conectamos empresas, mercados y cadenas de suministro mediante soluciones logísticas integrales, combinando cobertura internacional, experiencia operativa, tecnología, cumplimiento documental y atención especializada.",
    primaryCta: "Conocer nuestras soluciones",
    secondaryCta: "Ver oficinas",

    activeLabel: "Operación global activa",
    activeRoute: "Europa → América → Asia",
    activeCargo: "Red internacional",
    activeStatusLabel: "Enfoque:",
    activeStatus: "Control operativo",
    activeEtaLabel: "Cobertura:",
    activeEta: "Global",

    trust: [
      ["Cobertura global", "Red internacional"],
      ["Cumplimiento", "Control documental"],
      ["Tecnología", "Visibilidad operativa"],
      ["Equipo experto", "Atención especializada"],
    ],

    overviewEyebrow: "Across Logistics",
    overviewTitle: "Logística internacional con visión operativa y compromiso de largo plazo.",
    overviewText:
      "Across Logistics acompaña a empresas que necesitan mover mercancías con seguridad, control y eficiencia. Coordinamos transporte, aduanas, almacenaje, distribución y operaciones especiales para cadenas de suministro nacionales e internacionales.",
    overviewButton: "Conocer nuestra red",

    pillars: [
      ["Soluciones integrales", "Diseñamos operaciones que conectan transporte, documentación, aduanas, almacenaje y distribución."],
      ["Red internacional", "Oficinas, agentes y partners conectados para operar en Europa, Asia, Oriente Medio y América."],
      ["Control documental", "Procesos certificados, trazabilidad y cumplimiento normativo para operaciones críticas."],
      ["Atención especializada", "Equipos expertos que acompañan cada operación con criterio, seguimiento y respuesta profesional."],
    ],

    servicesEyebrow: "Nuestra forma de operar",
    servicesTitle: "Lo que define nuestra forma de operar.",
    services: [
      ["Soluciones integrales", "Integramos transporte, aduanas, almacenaje, distribución y operaciones especiales en una sola visión logística."],
      ["Red internacional", "Coordinamos operaciones con oficinas, agentes y partners estratégicos en mercados clave."],
      ["Credenciales internacionales", "Trabajamos con estándares, certificaciones y procesos que fortalecen la seguridad operacional."],
      ["Equipo especializado", "Un equipo con experiencia local e internacional acompaña cada operación con precisión."],
      ["Control operativo", "Seguimiento, documentación y trazabilidad para reducir fricción y anticipar riesgos."],
      ["Visión sostenible", "Impulsamos soluciones multimodales y decisiones logísticas más responsables."],
    ],

    useCasesEyebrow: "Capacidad global",
    useCasesTitle: "Acompañamos operaciones exigentes en múltiples industrias.",
    useCases: [
      ["Comercio internacional", "Empresas que necesitan mover mercancías entre mercados con control y visibilidad."],
      ["Operaciones críticas", "Cargas sensibles, urgentes o de alto valor que requieren coordinación precisa."],
      ["Expansión global", "Negocios que conectan proveedores, clientes y centros de distribución internacionales."],
      ["Gestión aduanera", "Procesos donde el cumplimiento documental define la continuidad operativa."],
      ["Distribución especializada", "Operaciones que requieren conexión entre almacenaje, transporte y entrega final."],
      ["Cadenas de suministro", "Equipos que necesitan planificación, trazabilidad y respuesta en cada etapa."],
    ],

    processEyebrow: "Metodología operativa",
    processTitle: "Una forma de trabajar clara, coordinada y medible.",
    process: [
      ["Diagnóstico", "Entendemos origen, destino, tipo de carga, urgencia y requisitos documentales."],
      ["Diseño logístico", "Definimos la ruta, modalidad y estructura operativa más eficiente."],
      ["Coordinación", "Integramos proveedores, agentes, aduanas y transporte en una operación controlada."],
      ["Documentación", "Validamos requisitos comerciales, aduaneros y operativos."],
      ["Seguimiento", "Monitoreamos el avance y comunicamos hitos relevantes."],
      ["Mejora continua", "Analizamos resultados para optimizar futuras operaciones."],
    ],

    bandTitle: "Dirección global, experiencia local y coordinación internacional.",
    bandText:
      "Un equipo conectado entre oficinas, países y áreas operativas para responder con precisión en cada mercado.",
    stats: [
      ["Red global", "Oficinas y partners estratégicos"],
      ["Operación integral", "Transporte, aduanas y distribución"],
      ["Control", "Documentación y trazabilidad"],
      ["Equipo experto", "Atención especializada"],
    ],

    finalTitle: "Conectemos su operación con nuestra red logística.",
    finalText:
      "Nuestro equipo está listo para entender sus necesidades y diseñar la mejor solución para su cadena de suministro.",
    finalPrimary: "Contactar ahora",
    finalSecondary: "Ver oficinas",
  },

  en: {
    heroEyebrow: "About us",
    heroTitle: "International logistics for companies that need control, precision and global operational capacity.",
    heroText:
      "We connect companies, markets and supply chains through integrated logistics solutions, combining international coverage, operational experience, technology, document compliance and specialized attention.",
    primaryCta: "Explore our solutions",
    secondaryCta: "View offices",

    activeLabel: "Active global operation",
    activeRoute: "Europe → America → Asia",
    activeCargo: "International network",
    activeStatusLabel: "Focus:",
    activeStatus: "Operational control",
    activeEtaLabel: "Coverage:",
    activeEta: "Global",

    trust: [
      ["Global coverage", "International network"],
      ["Compliance", "Document control"],
      ["Technology", "Operational visibility"],
      ["Expert team", "Specialized attention"],
    ],

    overviewEyebrow: "Across Logistics",
    overviewTitle: "International logistics with operational vision and long-term commitment.",
    overviewText:
      "Across Logistics supports companies that need to move goods with safety, control and efficiency. We coordinate transport, customs, warehousing, distribution and special operations for national and international supply chains.",
    overviewButton: "Explore our network",

    pillars: [
      ["Integrated solutions", "We design operations connecting transport, documentation, customs, warehousing and distribution."],
      ["International network", "Offices, agents and partners connected across Europe, Asia, the Middle East and America."],
      ["Document control", "Certified processes, traceability and regulatory compliance for critical operations."],
      ["Specialized attention", "Expert teams support each operation with judgment, tracking and professional response."],
    ],

    servicesEyebrow: "The way we operate",
    servicesTitle: "What defines the way we operate.",
    services: [
      ["Integrated solutions", "We integrate transport, customs, warehousing, distribution and special operations into one logistics vision."],
      ["International network", "We coordinate operations with offices, agents and strategic partners in key markets."],
      ["International credentials", "We work with standards, certifications and processes that strengthen operational safety."],
      ["Specialized team", "A team with local and international experience supports each operation with precision."],
      ["Operational control", "Tracking, documentation and traceability to reduce friction and anticipate risks."],
      ["Sustainable vision", "We promote multimodal solutions and more responsible logistics decisions."],
    ],

    useCasesEyebrow: "Global capacity",
    useCasesTitle: "We support demanding operations across multiple industries.",
    useCases: [
      ["International trade", "Companies that need to move goods between markets with control and visibility."],
      ["Critical operations", "Sensitive, urgent or high-value cargo requiring precise coordination."],
      ["Global expansion", "Businesses connecting suppliers, customers and international distribution centers."],
      ["Customs management", "Processes where document compliance defines operational continuity."],
      ["Specialized distribution", "Operations requiring connection between warehousing, transport and final delivery."],
      ["Supply chains", "Teams that need planning, traceability and response at every stage."],
    ],

    processEyebrow: "Operational methodology",
    processTitle: "A clear, coordinated and measurable way of working.",
    process: [
      ["Diagnosis", "We understand origin, destination, cargo type, urgency and document requirements."],
      ["Logistics design", "We define the most efficient route, modality and operating structure."],
      ["Coordination", "We integrate suppliers, agents, customs and transport into a controlled operation."],
      ["Documentation", "We validate commercial, customs and operational requirements."],
      ["Tracking", "We monitor progress and communicate relevant milestones."],
      ["Continuous improvement", "We analyze results to optimize future operations."],
    ],

    bandTitle: "Global leadership, local expertise and international coordination.",
    bandText:
      "A team connected across offices, countries and operational areas to respond with precision in every market.",
    stats: [
      ["Global network", "Offices and strategic partners"],
      ["Integrated operation", "Transport, customs and distribution"],
      ["Control", "Documentation and traceability"],
      ["Expert team", "Specialized attention"],
    ],

    finalTitle: "Connect your operation with our logistics network.",
    finalText:
      "Our team is ready to understand your needs and design the best solution for your supply chain.",
    finalPrimary: "Contact now",
    finalSecondary: "View offices",
  },

  zh: {
    heroEyebrow: "关于我们",
    heroTitle: "为需要控制力、精准度和全球运营能力的企业提供国际物流服务。",
    heroText:
      "我们通过一体化物流解决方案连接企业、市场与供应链，结合国际覆盖、运营经验、技术、文件合规和专业服务。",
    primaryCta: "了解我们的解决方案",
    secondaryCta: "查看办公室",

    activeLabel: "进行中的全球业务",
    activeRoute: "欧洲 → 美洲 → 亚洲",
    activeCargo: "国际网络",
    activeStatusLabel: "重点：",
    activeStatus: "运营控制",
    activeEtaLabel: "覆盖：",
    activeEta: "全球",

    trust: [
      ["全球覆盖", "国际网络"],
      ["合规管理", "文件控制"],
      ["技术能力", "运营可视化"],
      ["专业团队", "专项服务"],
    ],

    overviewEyebrow: "Across Logistics",
    overviewTitle: "具备运营视野与长期承诺的国际物流。",
    overviewText:
      "Across Logistics 支持需要安全、控制和效率的企业运输货物。我们协调运输、海关、仓储、配送和特殊业务，服务国内与国际供应链。",
    overviewButton: "了解我们的网络",

    pillars: [
      ["一体化方案", "连接运输、文件、海关、仓储和配送的整体运营设计。"],
      ["国际网络", "办公室、代理和合作伙伴连接欧洲、亚洲、中东和美洲。"],
      ["文件控制", "认证流程、可追溯性和法规合规，支持关键业务。"],
      ["专业服务", "专家团队以判断力、跟踪和专业响应支持每项业务。"],
    ],

    servicesEyebrow: "我们的运营方式",
    servicesTitle: "定义我们运营方式的核心能力。",
    services: [
      ["一体化方案", "将运输、海关、仓储、配送和特殊业务整合为一个物流视野。"],
      ["国际网络", "通过关键市场的办公室、代理和战略合作伙伴协调业务。"],
      ["国际资质", "以标准、认证和流程加强运营安全。"],
      ["专业团队", "具备本地和国际经验的团队精准支持每项业务。"],
      ["运营控制", "通过跟踪、文件和可追溯性降低摩擦并预判风险。"],
      ["可持续视野", "推动多式联运方案和更负责任的物流决策。"],
    ],

    useCasesEyebrow: "全球能力",
    useCasesTitle: "我们支持多个行业的高要求业务。",
    useCases: [
      ["国际贸易", "需要在市场之间可控、可视地运输货物的企业。"],
      ["关键业务", "需要精准协调的敏感、紧急或高价值货物。"],
      ["全球扩张", "连接供应商、客户和国际配送中心的业务。"],
      ["海关管理", "文件合规决定运营连续性的流程。"],
      ["专业配送", "需要连接仓储、运输和最终交付的业务。"],
      ["供应链", "每个阶段都需要规划、可追溯性和响应的团队。"],
    ],

    processEyebrow: "运营方法",
    processTitle: "清晰、协调且可衡量的工作方式。",
    process: [
      ["诊断", "了解始发地、目的地、货物类型、紧急程度和文件要求。"],
      ["物流设计", "确定最高效的路线、模式和运营结构。"],
      ["协调", "将供应商、代理、海关和运输整合到受控业务中。"],
      ["文件", "验证商业、海关和运营要求。"],
      ["跟踪", "监控进度并沟通关键节点。"],
      ["持续改进", "分析结果以优化未来业务。"],
    ],

    bandTitle: "全球管理、本地经验与国际协调。",
    bandText:
      "跨办公室、国家和运营领域连接的团队，为每个市场提供精准响应。",
    stats: [
      ["全球网络", "办公室和战略合作伙伴"],
      ["一体化运营", "运输、海关和配送"],
      ["控制", "文件和可追溯性"],
      ["专家团队", "专项服务"],
    ],

    finalTitle: "将您的业务连接到我们的物流网络。",
    finalText:
      "我们的团队已准备好了解您的需求，并为您的供应链设计最佳方案。",
    finalPrimary: "立即联系",
    finalSecondary: "查看办公室",
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

export default function QuienesSomosPage() {
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
            src="/images/quienes1.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/quienes1.png"
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/quienes1.png')" } as CSSProperties}>
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/quienes1.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/quienes1.png"
              alt={t.finalTitle}
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
        </section>
</main>

      <Footer />
    </div>
  );
}
