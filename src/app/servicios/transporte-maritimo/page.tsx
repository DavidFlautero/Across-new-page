"use client";

import { useEffect, useState } from "react";
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
    heroEyebrow: "Transporte marítimo internacional",
    heroTitle: "Capacidad global para cargas que cruzan océanos.",
    heroText:
      "Coordinamos embarques marítimos internacionales con control documental, seguimiento operativo y soluciones adaptadas a cargas FCL, LCL, proyectos especiales o de alto valor.",
    primaryCta: "Solicitar cotización",
    secondaryCta: "Hablar con un especialista",

    activeLabel: "Operación marítima activa",
    activeRoute: "Madrid → Bogotá",
    activeCargo: "Carga crítica",
    activeStatusLabel: "Estado:",
    activeStatus: "En coordinación",
    activeEtaLabel: "ETA:",
    activeEta: "Prioritario",

    trust: [
      ["Carga FCL", "Operaciones críticas"],
      ["Carga especial", "Control y trazabilidad"],
      ["Documentación", "Gestión aduanera"],
      ["Seguimiento operativo", "Trazabilidad operativa"],
    ],

    overviewEyebrow: "Operaciones confiables",
    overviewTitle: "Velocidad, precisión y control en cada etapa del embarque marítimo.",
    overviewText:
      "El transporte marítimo exige coordinación exacta entre origen, naviera, aduana y destino final. En Across Logistics gestionamos cada etapa para reducir tiempos, evitar errores documentales y mantener visibilidad sobre la operación.",
    overviewButton: "Conocer más sobre marítimo",

    pillars: [
      ["Coordinación portuaria", "Gestión con navieras, agentes y operadores logísticos."],
      ["Control documental", "Revisión de documentos comerciales, aduaneros y operativos."],
      ["Seguimiento de operación", "Monitoreo del avance desde origen hasta destino."],
      ["Soluciones puerta a puerta", "Integración con transporte terrestre y entrega final."],
    ],

    servicesEyebrow: "Nuestros servicios marítimos",
    servicesTitle: "Soluciones marítimas para cada tipo de embarque.",
    services: [
      ["Carga marítima FCL", "Para envíos donde el tiempo define la operación."],
      ["Carga LCL consolidada", "Optimización de costos mediante espacios compartidos."],
      ["Carga de alto valor", "Coordinación segura para productos sensibles o estratégicos."],
      ["Proyectos marítimos", "Soluciones dedicadas para operaciones especiales o cargas críticas."],
      ["Cross trade marítimo", "Operaciones internacionales entre terceros países."],
      ["Door to door", "Desde retiro en origen hasta entrega final en destino."],
    ],

    useCasesEyebrow: "Cuándo conviene usar transporte marítimo",
    useCasesTitle: "El transporte marítimo marca la diferencia.",
    useCases: [
      ["Repuestos industriales urgentes", "Evite detener una línea de producción por falta de componentes."],
      ["Productos tecnológicos", "Ideal para cargas de alto valor, sensibles o con rápida rotación."],
      ["Muestras comerciales", "Envíos rápidos para ferias, clientes o validaciones internacionales."],
      ["Carga médica o sensible", "Coordinación especial para productos que requieren mayor control."],
      ["E-commerce internacional", "Movimientos rápidos para operaciones comerciales globales."],
      ["Documentación crítica", "Soluciones para envíos donde el plazo no admite demoras."],
    ],

    processEyebrow: "Nuestro proceso operativo",
    processTitle: "Una operación marítima clara desde el primer contacto.",
    process: [
      ["Análisis de carga", "Revisamos peso, volumen, origen, destino y urgencia."],
      ["Selección de ruta", "Buscamos la alternativa marítima más eficiente."],
      ["Coordinación documental", "Validamos requisitos comerciales y aduaneros."],
      ["Booking y despacho", "Coordinamos naviera, puerto y operación de salida."],
      ["Seguimiento", "Monitoreamos el avance de la carga."],
      ["Entrega final", "Gestionamos conexión terrestre y entrega en destino."],
    ],

    bandTitle: "Operaciones marítimas diseñadas para cargas que no pueden detenerse.",
    bandText:
      "Nuestro equipo coordina soluciones marítimas internacionales para empresas que necesitan rapidez, trazabilidad y respuesta profesional ante operaciones sensibles.",
    stats: [
      ["Cobertura global", "Principales rutas globales"],
      ["Envíos urgentes", "Coordinación portuaria"],
      ["Seguridad y control", "Documentación y compliance"],
      ["Soporte especializado", "Especialistas marítimos"],
    ],

    finalTitle: "Coordinemos su próximo embarque marítimo internacional.",
    finalText:
      "Cuéntenos origen, destino, tipo de carga y urgencia. Nuestro equipo analizará la mejor alternativa marítima para su operación.",
    finalPrimary: "Solicitar cotización marítima",
    finalSecondary: "Hablar con un especialista",
  },

  en: {
    heroEyebrow: "International ocean freight",
    heroTitle: "Global capacity for cargo crossing oceans.",
    heroText:
      "We coordinate international ocean shipments with document control, operational tracking and solutions adapted to sensitive, urgent or high-value cargo.",
    primaryCta: "Request quotation",
    secondaryCta: "Talk to a specialist",

    activeLabel: "Active air operation",
    activeRoute: "Madrid → Bogotá",
    activeCargo: "Critical cargo",
    activeStatusLabel: "Status:",
    activeStatus: "In coordination",
    activeEtaLabel: "ETA:",
    activeEta: "Priority",

    trust: [
      ["Urgent cargo", "Critical operations"],
      ["High value", "Maximum security"],
      ["Documentation", "International control"],
      ["Operational tracking", "Real-time visibility"],
    ],

    overviewEyebrow: "Reliable operations",
    overviewTitle: "Speed, precision and control at every stage of air shipping.",
    overviewText:
      "Ocean freight requires exact coordination between origin, airline, customs and final destination. At Across Logistics, we manage each stage to reduce times, avoid documentation errors and maintain visibility over the operation.",
    overviewButton: "Learn more about ocean freight",

    pillars: [
      ["Airport coordination", "Management with airlines, agents and logistics operators."],
      ["Document control", "Review of commercial, customs and operational documents."],
      ["Operational tracking", "Monitoring from origin to destination."],
      ["Door-to-door solutions", "Integration with road transport and final delivery."],
    ],

    servicesEyebrow: "Our air services",
    servicesTitle: "Air solutions for every type of operation.",
    services: [
      ["Urgent air cargo", "For shipments where time defines the operation."],
      ["Consolidated cargo", "Cost optimization through shared spaces."],
      ["High-value cargo", "Secure coordination for sensitive or strategic products."],
      ["Air charter", "Dedicated solutions for special operations or critical cargo."],
      ["Cross trade marítimo", "International operations between third countries."],
      ["Door to door", "From pickup at origin to final delivery at destination."],
    ],

    useCasesEyebrow: "When to use ocean freight",
    useCasesTitle: "Ocean freight makes the difference.",
    useCases: [
      ["Urgent industrial spare parts", "Avoid stopping a production line due to missing components."],
      ["Technology products", "Ideal for high-value, sensitive or fast-moving cargo."],
      ["Commercial samples", "Fast shipments for fairs, clients or international validations."],
      ["Medical or sensitive cargo", "Special coordination for products requiring greater control."],
      ["International e-commerce", "Fast movements for global commercial operations."],
      ["Critical documentation", "Solutions for shipments where deadlines cannot be delayed."],
    ],

    processEyebrow: "Our operational process",
    processTitle: "A clear air operation from the first contact.",
    process: [
      ["Cargo analysis", "We review weight, volume, origin, destination and urgency."],
      ["Route selection", "We look for the most efficient air alternative."],
      ["Document coordination", "We validate commercial and customs requirements."],
      ["Booking and dispatch", "We coordinate airline, airport and departure operation."],
      ["Tracking", "We monitor cargo progress."],
      ["Final delivery", "We manage road connection and delivery at destination."],
    ],

    bandTitle: "Air operations designed for cargo that cannot wait.",
    bandText:
      "Our team coordinates international air solutions for companies that need speed, traceability and professional response for sensitive operations.",
    stats: [
      ["Global coverage", "More than 120 countries"],
      ["Urgent shipments", "Priority response"],
      ["Security and control", "International standards"],
      ["Specialized support", "Dedicated specialists"],
    ],

    finalTitle: "Let’s coordinate your next international air shipment.",
    finalText:
      "Tell us origin, destination, cargo type and urgency. Our team will analyze the best air alternative for your operation.",
    finalPrimary: "Request air quotation",
    finalSecondary: "Talk to a specialist",
  },

  zh: {
    heroEyebrow: "国际空运",
    heroTitle: "面向紧急货物和关键业务的国际空运服务。",
    heroText:
      "我们协调国际空运业务，提供文件控制、运营跟踪以及适用于敏感、紧急或高价值货物的定制方案。",
    primaryCta: "申请报价",
    secondaryCta: "联系专家",

    activeLabel: "进行中的空运操作",
    activeRoute: "马德里 → 波哥大",
    activeCargo: "关键货物",
    activeStatusLabel: "状态：",
    activeStatus: "协调中",
    activeEtaLabel: "ETA：",
    activeEta: "优先",

    trust: [
      ["紧急货物", "关键业务"],
      ["高价值", "最高安全标准"],
      ["文件管理", "国际控制"],
      ["运营跟踪", "实时可视化"],
    ],

    overviewEyebrow: "可靠运营",
    overviewTitle: "在空运每个阶段实现速度、精准与控制。",
    overviewText:
      "空运需要始发地、航空公司、海关和最终目的地之间的精准协调。Across Logistics 管理每个阶段，以缩短时间、避免文件错误并保持运营可视化。",
    overviewButton: "了解空运服务",

    pillars: [
      ["机场协调", "与航空公司、代理和物流运营商协调。"],
      ["文件控制", "审核商业、海关和运营文件。"],
      ["运营跟踪", "从始发地到目的地进行监控。"],
      ["门到门方案", "整合陆运和最终交付。"],
    ],

    servicesEyebrow: "我们的空运服务",
    servicesTitle: "适用于不同业务类型的空运解决方案。",
    services: [
      ["紧急空运", "适用于时间决定成败的运输。"],
      ["拼箱空运", "通过共享舱位优化成本。"],
      ["高价值货物", "为敏感或战略产品提供安全协调。"],
      ["包机服务", "为特殊业务或关键货物提供专属方案。"],
      ["第三国贸易", "第三国之间的国际业务。"],
      ["门到门", "从始发地提货到目的地最终交付。"],
    ],

    useCasesEyebrow: "何时选择空运",
    useCasesTitle: "空运能够创造关键差异。",
    useCases: [
      ["紧急工业备件", "避免因零部件缺失导致生产线停工。"],
      ["科技产品", "适合高价值、敏感或快速流转货物。"],
      ["商业样品", "用于展会、客户或国际验证的快速运输。"],
      ["医疗或敏感货物", "为需要更高控制的产品提供特殊协调。"],
      ["国际电商", "支持全球商业业务的快速流转。"],
      ["关键文件", "适用于交期不允许延误的文件运输。"],
    ],

    processEyebrow: "我们的运营流程",
    processTitle: "从第一次联系开始，空运操作清晰可控。",
    process: [
      ["货物分析", "审核重量、体积、始发地、目的地和紧急程度。"],
      ["路线选择", "寻找最高效的空运方案。"],
      ["文件协调", "验证商业和海关要求。"],
      ["订舱与派送", "协调航空公司、机场和出运操作。"],
      ["跟踪", "监控货物运输进度。"],
      ["最终交付", "管理陆运衔接和目的地交付。"],
    ],

    bandTitle: "为空运不能等待的货物设计的运营方案。",
    bandText:
      "我们的团队为需要速度、可追溯性和专业响应的企业协调国际空运解决方案。",
    stats: [
      ["全球覆盖", "超过120个国家"],
      ["紧急运输", "优先响应"],
      ["安全与控制", "国际标准"],
      ["专业支持", "专属专家"],
    ],

    finalTitle: "让我们协调您的下一次国际空运。",
    finalText:
      "告诉我们始发地、目的地、货物类型和紧急程度。我们的团队将为您的业务分析最佳空运方案。",
    finalPrimary: "申请空运报价",
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

export default function TransporteMaritimoPage() {
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
            src="/images/maritimo.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/maritimo-mobile.png"
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

        <section className={styles.services}>
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

        <section className={styles.darkBand}>
          <div className={styles.darkBandImage}>
            <Image
              src="/images/transportemaritimo.png"
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

        <section className={styles.finalCta}>
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
              src="/images/maritimo.png"
              alt={t.finalTitle}
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>
        </section>

        <RelatedServices current="transporte-maritimo" locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
