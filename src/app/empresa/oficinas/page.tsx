"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "./Oficinas.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    heroEyebrow: "Nuestras oficinas",
    heroTitle: "Una red internacional preparada para responder en origen, tránsito y destino.",
    heroText: "Across Logistics conecta oficinas, equipos locales y partners estratégicos para coordinar operaciones logísticas internacionales con cercanía, control y capacidad de respuesta.",
    primaryCta: "Contactar oficina",
    secondaryCta: "Solicitar cotización",
    overviewEyebrow: "Red internacional",
    overviewTitle: "Oficinas y equipos conectados para operar en mercados clave.",
    overviewText: "Nuestra presencia internacional permite coordinar operaciones con conocimiento local, gestión documental y seguimiento operativo en cada etapa.",
    overviewButton: "Contactar oficina",
    servicesEyebrow: "Cobertura",
    servicesTitle: "Coordinación local con alcance global.",
    useCasesEyebrow: "Mercados conectados",
    useCasesTitle: "Respondemos donde su cadena logística lo necesita.",
    processEyebrow: "Operación coordinada",
    processTitle: "De origen a destino con equipos conectados.",
    bandTitle: "Red internacional, respuesta local y control operativo.",
    bandText: "Oficinas, agentes y partners estratégicos conectados para acompañar operaciones internacionales.",
    finalTitle: "Conectemos su operación con la oficina adecuada.",
    finalText: "Nuestro equipo puede orientar su necesidad hacia la oficina o mercado correspondiente.",
    finalPrimary: "Contactar oficina",
    finalSecondary: "Solicitar cotización",
    activeLabel: "Operación activa",
    activeRoute: "Across Logistics",
    activeCargo: "Coordinación internacional",
    activeStatusLabel: "Enfoque:",
    activeStatus: "Control operativo",
    activeEtaLabel: "Red:",
    activeEta: "Global",
    trust: [
      ["Control", "Seguimiento operativo"],
      ["Red global", "Cobertura internacional"],
      ["Cumplimiento", "Gestión documental"],
      ["Equipo experto", "Atención especializada"]
    ],
    pillars: [
      ["Red internacional", "Oficinas, agentes y partners conectados para responder en mercados clave."],
      ["Control documental", "Procesos claros para operaciones internacionales exigentes."],
      ["Tecnología y visibilidad", "Seguimiento operativo para tomar mejores decisiones."],
      ["Atención especializada", "Equipos preparados para acompañar cada operación."]
    ],
    services: [
      ["Planificación", "Diseñamos operaciones de acuerdo con origen, destino, carga y urgencia."],
      ["Coordinación", "Integramos equipos, agentes y proveedores en una operación clara."],
      ["Documentación", "Gestionamos requisitos comerciales, aduaneros y operativos."],
      ["Seguimiento", "Mantenemos visibilidad sobre cada etapa de la operación."],
      ["Respuesta", "Acompañamos incidencias y decisiones críticas con criterio profesional."],
      ["Mejora", "Optimizamos procesos para futuras operaciones."]
    ],
    useCases: [
      ["Importación y exportación", "Operaciones internacionales con control documental."],
      ["Cargas sensibles", "Mercancías que requieren seguimiento y atención especializada."],
      ["Red de oficinas", "Coordinación entre origen, tránsito y destino."],
      ["Aduanas", "Gestión regulatoria para continuidad operativa."],
      ["Distribución", "Conexión entre almacenaje, transporte y entrega final."],
      ["Proyectos especiales", "Operaciones que requieren planificación técnica."]
    ],
    process: [
      ["Análisis", "Entendemos la necesidad operativa."],
      ["Diseño", "Definimos ruta, modalidad y estructura."],
      ["Coordinación", "Conectamos equipos y proveedores."],
      ["Documentación", "Validamos requisitos clave."],
      ["Seguimiento", "Monitoreamos el avance."],
      ["Optimización", "Mejoramos futuras operaciones."]
    ],
    stats: [
      ["Red internacional", "Cobertura global"],
      ["Control", "Trazabilidad operativa"],
      ["Cumplimiento", "Gestión documental"],
      ["Equipo experto", "Atención especializada"]
    ],
  },

  en: {
    heroEyebrow: "Our offices",
    heroTitle: "An international network ready to respond at origin, transit and destination.",
    heroText: "Across Logistics connects offices, local teams and strategic partners to coordinate international logistics operations with proximity, control and response capacity.",
    primaryCta: "Contact office",
    secondaryCta: "Request quotation",
    overviewEyebrow: "International network",
    overviewTitle: "Offices and teams connected to operate in key markets.",
    overviewText: "Our international presence allows us to coordinate operations with local knowledge, document management and operational tracking at every stage.",
    overviewButton: "Contact office",
    servicesEyebrow: "Coverage",
    servicesTitle: "Local coordination with global reach.",
    useCasesEyebrow: "Connected markets",
    useCasesTitle: "We respond where your logistics chain needs it.",
    processEyebrow: "Coordinated operation",
    processTitle: "From origin to destination with connected teams.",
    bandTitle: "International network, local response and operational control.",
    bandText: "Offices, agents and strategic partners connected to support international operations.",
    finalTitle: "Connect your operation with the right office.",
    finalText: "Our team can guide your need to the right office or market.",
    finalPrimary: "Contact office",
    finalSecondary: "Request quotation",
    activeLabel: "Active operation",
    activeRoute: "Across Logistics",
    activeCargo: "International coordination",
    activeStatusLabel: "Focus:",
    activeStatus: "Operational control",
    activeEtaLabel: "Network:",
    activeEta: "Global",
    trust: [
      ["Control", "Operational tracking"],
      ["Global network", "International coverage"],
      ["Compliance", "Document management"],
      ["Expert team", "Specialized attention"]
    ],
    pillars: [
      ["International network", "Offices, agents and partners connected in key markets."],
      ["Document control", "Clear processes for demanding international operations."],
      ["Technology and visibility", "Operational tracking to support better decisions."],
      ["Specialized attention", "Teams prepared to support each operation."]
    ],
    services: [
      ["Planning", "We design operations according to origin, destination, cargo and urgency."],
      ["Coordination", "We integrate teams, agents and providers into a clear operation."],
      ["Documentation", "We manage commercial, customs and operational requirements."],
      ["Tracking", "We maintain visibility over every stage of the operation."],
      ["Response", "We support incidents and critical decisions with professional judgment."],
      ["Improvement", "We optimize processes for future operations."]
    ],
    useCases: [
      ["Import and export", "International operations with document control."],
      ["Sensitive cargo", "Goods requiring tracking and specialized attention."],
      ["Office network", "Coordination between origin, transit and destination."],
      ["Customs", "Regulatory management for operational continuity."],
      ["Distribution", "Connection between warehousing, transport and final delivery."],
      ["Special projects", "Operations requiring technical planning."]
    ],
    process: [
      ["Analysis", "We understand the operational need."],
      ["Design", "We define route, modality and structure."],
      ["Coordination", "We connect teams and providers."],
      ["Documentation", "We validate key requirements."],
      ["Tracking", "We monitor progress."],
      ["Optimization", "We improve future operations."]
    ],
    stats: [
      ["International network", "Global coverage"],
      ["Control", "Operational traceability"],
      ["Compliance", "Document management"],
      ["Expert team", "Specialized attention"]
    ],
  },

  zh: {
    heroEyebrow: "我们的办公室",
    heroTitle: "覆盖始发地、运输过程与目的地的国际响应网络。",
    heroText: "Across Logistics 连接办公室、本地团队和战略合作伙伴，以近距离、控制力和响应能力协调国际物流业务。",
    primaryCta: "联系办公室",
    secondaryCta: "申请报价",
    overviewEyebrow: "国际网络",
    overviewTitle: "连接关键市场的办公室和团队。",
    overviewText: "我们的国际布局使我们能够以本地知识、文件管理和运营跟踪协调每个阶段。",
    overviewButton: "联系办公室",
    servicesEyebrow: "覆盖范围",
    servicesTitle: "具备全球范围的本地协调。",
    useCasesEyebrow: "连接市场",
    useCasesTitle: "在您的物流链需要的地方作出响应。",
    processEyebrow: "协调运营",
    processTitle: "从始发地到目的地，由连接的团队支持。",
    bandTitle: "国际网络、本地响应与运营控制。",
    bandText: "办公室、代理和战略合作伙伴连接起来支持国际业务。",
    finalTitle: "将您的业务连接到合适的办公室。",
    finalText: "我们的团队可将您的需求引导至合适的办公室或市场。",
    finalPrimary: "联系办公室",
    finalSecondary: "申请报价",
    activeLabel: "进行中的业务",
    activeRoute: "Across Logistics",
    activeCargo: "国际协调",
    activeStatusLabel: "重点：",
    activeStatus: "运营控制",
    activeEtaLabel: "网络：",
    activeEta: "全球",
    trust: [
      ["控制", "运营跟踪"],
      ["全球网络", "国际覆盖"],
      ["合规", "文件管理"],
      ["专家团队", "专项服务"]
    ],
    pillars: [
      ["国际网络", "办公室、代理和合作伙伴连接关键市场。"],
      ["文件控制", "适用于高要求国际业务的清晰流程。"],
      ["技术与可视化", "运营跟踪支持更好的决策。"],
      ["专业服务", "准备充分的团队支持每项业务。"]
    ],
    services: [
      ["规划", "根据始发地、目的地、货物和紧急程度设计业务。"],
      ["协调", "将团队、代理和供应商整合为清晰运营。"],
      ["文件", "管理商业、海关和运营要求。"],
      ["跟踪", "保持每个阶段的可视性。"],
      ["响应", "以专业判断支持突发情况和关键决策。"],
      ["改进", "优化未来业务流程。"]
    ],
    useCases: [
      ["进出口", "具备文件控制的国际业务。"],
      ["敏感货物", "需要跟踪和专项服务的货物。"],
      ["办公室网络", "始发地、运输过程和目的地之间的协调。"],
      ["海关", "确保运营连续性的监管管理。"],
      ["配送", "连接仓储、运输和最终交付。"],
      ["特殊项目", "需要技术规划的业务。"]
    ],
    process: [
      ["分析", "了解运营需求。"],
      ["设计", "确定路线、模式和结构。"],
      ["协调", "连接团队和供应商。"],
      ["文件", "验证关键要求。"],
      ["跟踪", "监控进度。"],
      ["优化", "改进未来业务。"]
    ],
    stats: [
      ["国际网络", "全球覆盖"],
      ["控制", "运营可追溯性"],
      ["合规", "文件管理"],
      ["专家团队", "专项服务"]
    ],
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

export default function OficinasPage() {
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
            src="/images/hero/hero-empresas.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/hero/hero-empresas.png"
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

        <section className={styles.services} data-mobile-hide-after-cert="true" style={{ "--mobile-bg": "url('/images/hero/hero-empresas.png')" } as CSSProperties}>
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

        <section className={styles.finalCta} style={{ "--mobile-bg": "url('/images/hero/hero-empresas.png')" } as CSSProperties} data-across-final-cta="true">
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
              src="/images/hero/hero-empresas.png"
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
