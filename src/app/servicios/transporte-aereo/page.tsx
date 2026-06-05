"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "../_shared/ServicePage.module.css";
import RelatedServices from "../_shared/RelatedServices";

type Locale = "es" | "en" | "zh";

const copy: Record<Locale, any> = {
  es: {
    heroEyebrow: "Transporte Aéreo",
    heroTitle: "Transporte aéreo para cargas urgentes y operaciones críticas.",
    heroText:
      "Coordinamos soluciones aéreas internacionales para mercancías urgentes, sensibles o críticas, con control operativo desde origen hasta destino. Como Agente IATA Acreditado, trabajamos con las principales aerolíneas del mundo para asegurar que su mercancía llegue a destino en tiempo y forma.",
    heroStrong: "Salidas diarias a casi todos los destinos del mundo.",
    primaryCta: "Solicitar cotización aérea",
    secondaryCta: "Hablar con un especialista",

    overviewEyebrow: "SOLUCIÓN PRIORITARIA",
    overviewTitle:
      "Controle sus plazos críticos con una operación aérea global, precisa y trazable.",
    overviewText:
      "Coordinamos operaciones aéreas urgentes, sensibles y de alto valor con seguimiento, documentación y acompañamiento experto durante todo el proceso logístico.",

    servicesIntro:
      "Con salidas diarias a casi todos los destinos, coordinamos operaciones aéreas urgentes con planificación documental, seguimiento operativo y soporte experto en origen y destino.",
    servicesTitle: "Servicios aéreos adaptados a cada prioridad logística.",
    services: [
      {
        title: "Mensajería exprés",
        text: "Soluciones aéreas para documentación, muestras, piezas críticas y envíos urgentes que requieren trazabilidad, rapidez y gestión prioritaria de origen a destino.",
      },
      {
        title: "Mercancía peligrosa DGR",
        text: "Gestión especializada de mercancías peligrosas bajo normativa IATA DGR, con revisión documental, embalaje, etiquetado y coordinación operativa segura.",
      },
      {
        title: "Chárter aéreo dedicado",
        text: "Contratación de aeronaves dedicadas para cargas sobredimensionadas, sensibles o extremadamente urgentes, cuando la operación requiere capacidad exclusiva y control total.",
      },
      {
        title: "Reserva aérea y coordinación operativa",
        text: "Reservas aéreas ágiles con aerolíneas aliadas, seguimiento operativo y confirmación eficiente de espacios para optimizar tiempos de tránsito y disponibilidad.",
      },
      {
        title: "Urgencias aéreas 24/7",
        text: "Respuesta inmediata para operaciones críticas, con coordinación permanente, monitoreo continuo y acompañamiento experto durante todo el movimiento internacional.",
      },
    ],

    stripEyebrow: "RED INTERNACIONAL",
    stripTitle: "Operación aérea conectada con oficinas estratégicas.",
    stripText:
      "Coordinamos cargas urgentes con soporte documental, gestión aduanera y seguimiento operativo desde origen hasta destino.",
    stripPrimary: "Evaluar carga aérea",
    stripSecondary: "Ver oficinas",

    capabilitiesEyebrow: "POR QUÉ ELEGIRNOS",
    capabilitiesTitle:
      "Operación aérea respaldada por certificaciones, agilidad y cobertura global.",
    capabilitiesText:
      "Diseñamos operaciones aéreas con control documental, trazabilidad y coordinación internacional para responder cuando el tiempo, la seguridad y la precisión son decisivos.",
    stats: [
      ["IATA", "Operación aérea especializada"],
      ["24/7", "Time critical logistics"],
      ["DGR", "Carga peligrosa y sensible"],
      ["Global", "Coordinación internacional"],
    ],

    relatedTitle: "Servicios relacionados",
    related: {
      customs: "Servicios de Aduanas",
      temperature: "Temperatura Controlada",
      special: "Cargas Especiales",
    },
  },

  en: {
    heroEyebrow: "Air Freight",
    heroTitle: "Air freight for urgent cargo and critical operations.",
    heroText:
      "We coordinate international air freight solutions for urgent, sensitive or critical goods, with operational control from origin to destination. As an IATA Accredited Agent, we work with leading airlines worldwide to ensure your cargo reaches its destination on time and in proper condition.",
    heroStrong: "Daily departures to almost every destination worldwide.",
    primaryCta: "Request air quotation",
    secondaryCta: "Talk to a specialist",

    overviewEyebrow: "PRIORITY SOLUTION",
    overviewTitle:
      "Control critical deadlines with a global, precise and traceable air operation.",
    overviewText:
      "We coordinate urgent, sensitive and high-value air operations with tracking, documentation and expert support throughout the logistics process.",

    servicesIntro:
      "With daily departures to almost every destination, we coordinate urgent air operations with document planning, operational tracking and expert support at origin and destination.",
    servicesTitle: "Air freight services adapted to each logistics priority.",
    services: [
      {
        title: "Express courier",
        text: "Air solutions for documents, samples, critical parts and urgent shipments requiring traceability, speed and priority management from origin to destination.",
      },
      {
        title: "Dangerous goods DGR",
        text: "Specialized management of dangerous goods under IATA DGR regulations, including documentation review, packaging, labeling and safe operational coordination.",
      },
      {
        title: "Dedicated air charter",
        text: "Dedicated aircraft chartering for oversized, sensitive or extremely urgent cargo when the operation requires exclusive capacity and full control.",
      },
      {
        title: "Air booking and operational coordination",
        text: "Agile air bookings with partner airlines, operational tracking and efficient space confirmation to optimize transit times and availability.",
      },
      {
        title: "24/7 air emergencies",
        text: "Immediate response for critical operations, with permanent coordination, continuous monitoring and expert support throughout the international movement.",
      },
    ],

    stripEyebrow: "INTERNATIONAL NETWORK",
    stripTitle: "Air operations connected with strategic offices.",
    stripText:
      "We coordinate urgent cargo with documentary support, customs management and operational tracking from origin to destination.",
    stripPrimary: "Evaluate air cargo",
    stripSecondary: "View offices",

    capabilitiesEyebrow: "WHY CHOOSE US",
    capabilitiesTitle:
      "Air operations backed by certifications, agility and global coverage.",
    capabilitiesText:
      "We design air operations with document control, traceability and international coordination to respond when time, safety and precision are decisive.",
    stats: [
      ["IATA", "Specialized air operations"],
      ["24/7", "Time critical logistics"],
      ["DGR", "Dangerous and sensitive goods"],
      ["Global", "International coordination"],
    ],

    relatedTitle: "Related services",
    related: {
      customs: "Customs Services",
      temperature: "Temperature Controlled",
      special: "Special Cargo",
    },
  },

  zh: {
    heroEyebrow: "空运服务",
    heroTitle: "面向紧急货物和关键业务的空运解决方案。",
    heroText:
      "我们为紧急、敏感或关键货物协调国际空运方案，从始发地到目的地提供运营控制。作为 IATA 认证代理，我们与全球主要航空公司合作，确保您的货物按时、安全抵达。",
    heroStrong: "每日航班覆盖全球几乎所有主要目的地。",
    primaryCta: "申请空运报价",
    secondaryCta: "联系专家",

    overviewEyebrow: "优先解决方案",
    overviewTitle: "通过全球化、精准且可追溯的空运操作掌控关键时限。",
    overviewText:
      "我们协调紧急、敏感和高价值空运业务，提供全流程跟踪、文件管理和专业物流支持。",

    servicesIntro:
      "凭借覆盖全球主要目的地的每日航班，我们以文件规划、运营跟踪和始发地及目的地支持来协调紧急空运业务。",
    servicesTitle: "根据不同物流优先级定制的空运服务。",
    services: [
      {
        title: "快递空运",
        text: "为文件、样品、关键零部件和紧急货物提供空运方案，确保从始发地到目的地的可追溯性、速度和优先处理。",
      },
      {
        title: "危险品 DGR",
        text: "按照 IATA DGR 规定专业管理危险品，包括文件审核、包装、标签和安全运营协调。",
      },
      {
        title: "专属包机服务",
        text: "为超限、敏感或极度紧急货物安排专属飞机，当操作需要专属舱位和全面控制时提供支持。",
      },
      {
        title: "空运订舱与运营协调",
        text: "通过合作航空公司进行高效订舱、运营跟踪和舱位确认，以优化运输时间和可用性。",
      },
      {
        title: "24/7 紧急空运",
        text: "为关键业务提供即时响应，配合持续协调、实时监控和全程国际运输专业支持。",
      },
    ],

    stripEyebrow: "国际网络",
    stripTitle: "与战略办公室联动的空运操作。",
    stripText:
      "我们协调紧急货物运输，提供文件支持、清关管理和从始发地到目的地的运营跟踪。",
    stripPrimary: "评估空运货物",
    stripSecondary: "查看办公室",

    capabilitiesEyebrow: "为什么选择我们",
    capabilitiesTitle: "由认证、敏捷能力和全球覆盖支持的空运操作。",
    capabilitiesText:
      "我们通过文件控制、可追溯性和国际协调来设计空运操作，在时间、安全和精准性至关重要时提供可靠响应。",
    stats: [
      ["IATA", "专业空运操作"],
      ["24/7", "关键时效物流"],
      ["DGR", "危险品与敏感货物"],
      ["Global", "国际协调"],
    ],

    relatedTitle: "相关服务",
    related: {
      customs: "海关服务",
      temperature: "温控运输",
      special: "特殊货物",
    },
  },
} satisfies Record<Locale, typeof copy.es>;

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

export default function TransporteAereoPage() {
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
            src="/images/hero/cargaAereahero.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/hero/cargaAereahero-mobile.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 0px"
            className={`${styles.heroImage} ${styles.heroImageMobile}`}
          />

          <div className={styles.heroOverlay} />

          <div className={styles.heroContent}>
            <span>{t.heroEyebrow}</span>

            <h1>{t.heroTitle}</h1>

            <p>
              {t.heroText}
              <br />
              <strong>{t.heroStrong}</strong>
            </p>

            <div className={styles.actions}>
              <Link href="/cotizacion">{t.primaryCta}</Link>
              <Link href="/contacto">{t.secondaryCta}</Link>
            </div>
          </div>
        </section>

        <Certifications />

        <section className={styles.content}>
          <div className={styles.mainContent}>
            <section id="overview" className={styles.block}>
              <span>{t.overviewEyebrow}</span>
              <h2>{t.overviewTitle}</h2>
              <p>{t.overviewText}</p>
            </section>

            <section id="services" className={styles.servicesPanel}>
              <div className={styles.servicesCopy}>
                <p>{t.servicesIntro}</p>
                <h2>{t.servicesTitle}</h2>

                <div className={styles.accordion}>
                  {t.services.map((item: { title: string; description?: string; text?: string; href?: string; label?: string }) => (
                    <details key={item.title} className={styles.serviceItem}>
                      <summary>
                        <h3>{item.title}</h3>
                        <span>+</span>
                      </summary>
                      <p>{item.text}</p>
                    </details>
                  ))}
                </div>
              </div>

              <div className={styles.servicesImageWrap}>
                <Image
                  src="/images/cargaaerea.png"
                  alt={t.servicesTitle}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={styles.servicesImage}
                />
              </div>
            </section>

            <section className={styles.compactCta}>
              <div>
                <span>{t.stripEyebrow}</span>
                <h2>{t.stripTitle}</h2>
                <p>{t.stripText}</p>
              </div>

              <div className={styles.compactCtaActions}>
                <Link href="/cotizacion">{t.stripPrimary}</Link>
                <Link href="/empresa/oficinas">{t.stripSecondary}</Link>
              </div>
            </section>

            <section className={styles.capabilities}>
              <div className={styles.capabilitiesContent}>
                <span>{t.capabilitiesEyebrow}</span>
                <h2>{t.capabilitiesTitle}</h2>
                <p>{t.capabilitiesText}</p>

                <div className={styles.capabilityStats}>
                  {t.stats.map(([value, label]: readonly string[]) => (
                    <div key={value}>
                      <strong>{value}</strong>
                      <small>{label}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.capabilitiesImage}>
                <Image
                  src="/images/cargaaerea.png"
                  alt={t.capabilitiesTitle}
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
            </section>

            <RelatedServices current="transporte-aereo" locale={locale} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
