"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import Image from "next/image";
import Link from "next/link";
import styles from "../_shared/ServicePage.module.css";
import RelatedServices from "../_shared/RelatedServices";

type Locale = "es" | "en" | "zh";

const copy: Record<Locale, any> = {
  es: {
    eyebrow: "TEMPERATURE CONTROLLED LOGISTICS",
    heroTitle: "Logística con temperatura controlada para mercancías sensibles.",
    heroText:
      "Coordinamos operaciones nacionales e internacionales para productos que requieren control térmico, trazabilidad, cumplimiento documental y monitoreo operativo desde origen hasta destino.",
    quote: "Solicitar cotización especializada",
    specialist: "Hablar con un especialista",

    blockEyebrow: "CADENA DE FRÍO CONTROLADA",
    blockTitle: "Mantenga la integridad de su mercancía en cada etapa logística.",
    blockText:
      "Gestionamos productos farmacéuticos, sanitarios, alimentarios y mercancías sensibles con soluciones adaptadas a rangos térmicos, normativa, embalaje, transporte y seguimiento operativo.",

    servicesIntro:
      "Diseñamos soluciones para productos que requieren temperatura estable, control documental y coordinación especializada en cada tramo de la operación.",
    servicesTitle: "Servicios para carga con temperatura controlada.",

    ctaEyebrow: "OPERACIÓN SENSIBLE",
    ctaTitle: "Planifique su logística térmica con un equipo especializado.",
    ctaText:
      "Analizamos tipo de producto, rango de temperatura, origen, destino, embalaje, documentación y tiempos críticos para construir una solución segura, viable y trazable.",
    ctaPrimary: "Evaluar operación térmica",
    ctaSecondary: "Ver oficinas",

    services: [
      [
        "Cadena de frío internacional",
        "Coordinación logística para mercancías sensibles que requieren control térmico continuo, trazabilidad y cumplimiento operativo.",
      ],
      [
        "Carga farmacéutica y sanitaria",
        "Operaciones especializadas para productos médicos, farmacéuticos y sanitarios con requisitos térmicos y documentales específicos.",
      ],
      [
        "Alimentos refrigerados y congelados",
        "Transporte nacional e internacional para productos perecederos, refrigerados o congelados con control de temperatura.",
      ],
      [
        "Monitoreo y trazabilidad",
        "Seguimiento operativo, control de temperatura y visibilidad durante toda la operación logística.",
      ],
      [
        "Almacenamiento refrigerado",
        "Coordinación de infraestructura logística preparada para mercancías sensibles y operaciones con temperatura controlada.",
      ],
      [
        "Operaciones urgentes",
        "Respuesta prioritaria para mercancías críticas que requieren coordinación rápida, segura y controlada.",
      ],
    ],
  },

  en: {
    eyebrow: "TEMPERATURE CONTROLLED LOGISTICS",
    heroTitle: "Temperature-controlled logistics for sensitive cargo.",
    heroText:
      "We coordinate domestic and international operations for products requiring thermal control, traceability, documentation compliance and operational monitoring from origin to destination.",
    quote: "Request specialized quotation",
    specialist: "Talk to a specialist",

    blockEyebrow: "CONTROLLED COLD CHAIN",
    blockTitle: "Preserve cargo integrity at every logistics stage.",
    blockText:
      "We manage pharmaceutical, healthcare, food and sensitive goods with solutions adapted to temperature ranges, regulations, packaging, transport and operational tracking.",

    servicesIntro:
      "We design solutions for products requiring stable temperature, documentation control and specialized coordination across every stage of the operation.",
    servicesTitle: "Services for temperature-controlled cargo.",

    ctaEyebrow: "SENSITIVE OPERATION",
    ctaTitle: "Plan your thermal logistics with a specialized team.",
    ctaText:
      "We analyze product type, temperature range, origin, destination, packaging, documentation and critical timing to build a safe, viable and traceable solution.",
    ctaPrimary: "Evaluate thermal operation",
    ctaSecondary: "View offices",

    services: [
      [
        "International cold chain",
        "Logistics coordination for sensitive cargo requiring continuous thermal control, traceability and operational compliance.",
      ],
      [
        "Pharmaceutical and healthcare cargo",
        "Specialized operations for medical, pharmaceutical and healthcare products with specific thermal and documentation requirements.",
      ],
      [
        "Refrigerated and frozen food",
        "Domestic and international transport for perishable, refrigerated or frozen products with temperature control.",
      ],
      [
        "Monitoring and traceability",
        "Operational tracking, temperature control and visibility throughout the logistics operation.",
      ],
      [
        "Refrigerated storage",
        "Coordination of logistics infrastructure prepared for sensitive goods and temperature-controlled operations.",
      ],
      [
        "Urgent operations",
        "Priority response for critical cargo requiring fast, safe and controlled coordination.",
      ],
    ],
  },

  zh: {
    eyebrow: "温控物流",
    heroTitle: "面向敏感货物的温控物流解决方案。",
    heroText:
      "我们为需要温度控制、可追溯性、文件合规和运营监控的产品协调国内与国际物流操作，从始发地到目的地全程管理。",
    quote: "申请专业报价",
    specialist: "联系专家",

    blockEyebrow: "可控冷链",
    blockTitle: "在每一个物流环节保持货物完整性。",
    blockText:
      "我们为医药、医疗、食品和敏感货物提供适配温度范围、法规、包装、运输和运营跟踪的解决方案。",

    servicesIntro:
      "我们为需要稳定温度、文件控制和专业协调的产品设计解决方案，覆盖操作的每一个阶段。",
    servicesTitle: "温控货运服务。",

    ctaEyebrow: "敏感货物操作",
    ctaTitle: "与专业团队一起规划您的温控物流。",
    ctaText:
      "我们分析产品类型、温度范围、始发地、目的地、包装、文件和关键时效，为您制定安全、可行且可追溯的方案。",
    ctaPrimary: "评估温控操作",
    ctaSecondary: "查看办公室",

    services: [
      [
        "国际冷链运输",
        "为需要持续温控、可追溯性和运营合规的敏感货物提供物流协调。",
      ],
      [
        "医药与医疗货物",
        "为有特定温度和文件要求的医疗、医药及卫生产品提供专业运输操作。",
      ],
      [
        "冷藏与冷冻食品",
        "为易腐、冷藏或冷冻产品提供带温度控制的国内和国际运输。",
      ],
      [
        "监控与追踪",
        "在整个物流操作中提供运营跟踪、温度控制和可视化管理。",
      ],
      [
        "冷藏仓储",
        "协调适用于敏感货物和温控操作的物流基础设施。",
      ],
      [
        "紧急操作",
        "为需要快速、安全和可控协调的关键货物提供优先响应。",
      ],
    ],
  },
} as const;

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

export default function TemperaturaControladaPage() {
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
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/controltemp.png"
          alt={t.heroTitle}
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>{t.eyebrow}</span>

          <h1>{t.heroTitle}</h1>

          <p>{t.heroText}</p>

          <div className={styles.actions}>
            <Link href="/cotizacion">{t.quote}</Link>
            <Link href="/contacto">{t.specialist}</Link>
          </div>
        </div>
      </section>

      <Certifications />

      <main className={styles.content}>
        <section className={styles.block}>
          <span>{t.blockEyebrow}</span>

          <h2>{t.blockTitle}</h2>

          <p>{t.blockText}</p>
        </section>

        <section className={styles.servicesPanel}>
          <div className={styles.servicesCopy}>
            <p>{t.servicesIntro}</p>

            <h2>{t.servicesTitle}</h2>

            <div className={styles.accordion}>
              {t.services.map(([title, description]: readonly [string, string]) => (
                <details key={title} className={styles.serviceItem}>
                  <summary>
                    <h3>{title}</h3>
                    <span>+</span>
                  </summary>

                  <p>{description}</p>
                </details>
              ))}
            </div>
          </div>

          <div className={styles.servicesImageWrap}>
            <Image
              src="/images/temperaturacontrolada.png"
              alt={t.servicesTitle}
              fill
              className={styles.servicesImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className={styles.compactCta}>
          <div>
            <span>{t.ctaEyebrow}</span>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>

          <div className={styles.compactCtaActions}>
            <Link href="/cotizacion">{t.ctaPrimary}</Link>
            <Link href="/empresa/oficinas">{t.ctaSecondary}</Link>
          </div>
        </section>
      </main>


      <RelatedServices current="temperatura-controlada" locale={locale} />

      <Footer />
    </div>
  );
}
