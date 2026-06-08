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
    eyebrow: "PROJECT CARGO",
    heroTitle: "Logística especializada para cargas sobredimensionadas, pesadas y críticas.",
    heroText:
      "Planificamos operaciones especiales para mercancías que requieren ingeniería logística, permisos, estudios de ruta, manipulación especializada y coordinación internacional desde origen hasta destino.",
    quote: "Solicitar evaluación técnica",
    specialist: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN INDUSTRIAL ESPECIALIZADA",
    blockTitle: "Cuando la carga exige planificación, precisión y control operativo.",
    blockText:
      "Coordinamos cargas sobredimensionadas, pesadas, sensibles o fuera de estándar, integrando análisis técnico, rutas, permisos, equipos de manipulación, embalaje y seguimiento operativo.",

    servicesIntro:
      "Diseñamos soluciones para carga pesada, industrial, sobredimensionada, peligrosa o sensible, coordinando cada etapa desde origen hasta destino.",
    servicesTitle: "Servicios para cargas especiales e industriales.",

    ctaEyebrow: "PROYECTOS ESPECIALES",
    ctaTitle: "Planifique su operación con un equipo experto.",
    ctaText:
      "Analizamos dimensiones, peso, origen, destino, restricciones de ruta, permisos y condiciones de entrega para construir una solución viable, segura y trazable.",
    ctaPrimary: "Evaluar carga especial",
    ctaSecondary: "Ver oficinas",

    relatedEyebrow: "SERVICIOS RELACIONADOS",
    relatedTitle: "Operaciones complementarias para cargas críticas.",
    related: {
      customs: "Servicios de Aduanas",
      air: "Transporte Aéreo",
      sea: "Transporte Marítimo",
    },

    services: [
      [
        "Proyectos de carga pesada y grandes dimensiones",
        "Planificación integral para mover cargas de gran peso, volumen o complejidad técnica, coordinando rutas, permisos, equipos y entrega final.",
      ],
      [
        "Recepción y almacenaje de carga",
        "Coordinación, verificación y almacenamiento seguro de cargas especiales o industriales antes de su transporte nacional o internacional.",
      ],
      [
        "Operaciones especiales de carga y descarga",
        "Supervisión de maniobras críticas para proteger la integridad de la mercancía, equipos involucrados y personal operativo.",
      ],
      [
        "Carga rodada convencional y especial · Ro-Ro",
        "Soluciones para embarcar maquinaria, vehículos, equipos pesados y unidades industriales mediante operaciones Ro-Ro.",
      ],
      [
        "Break Bulk",
        "Planificación y supervisión de cargas fraccionadas, mercancías a granel y proyectos industriales fuera de contenedor estándar.",
      ],
      [
        "Chartering",
        "Fletamento de avión o barco para operaciones especiales que requieren capacidad dedicada, tiempos definidos y control operativo total.",
      ],
      [
        "Transporte de maquinaria",
        "Movimiento de maquinaria pesada para industrias con requerimientos de seguridad, coordinación técnica y cumplimiento de plazos.",
      ],
      [
        "Mercancías peligrosas",
        "Gestión de mercancías peligrosas con protocolos específicos para transporte terrestre, marítimo o aéreo.",
      ],
      [
        "Embalajes y cajas especiales",
        "Diseño y coordinación de embalajes técnicos conforme a la normativa aplicable y al tipo de mercancía transportada.",
      ],
    ],
  },

  en: {
    eyebrow: "PROJECT CARGO",
    heroTitle: "Specialized logistics for oversized, heavy and critical cargo.",
    heroText:
      "We plan special operations for cargo requiring logistics engineering, permits, route studies, specialized handling and international coordination from origin to destination.",
    quote: "Request technical assessment",
    specialist: "Talk to a specialist",

    blockEyebrow: "SPECIALIZED INDUSTRIAL OPERATIONS",
    blockTitle: "When cargo requires planning, precision and operational control.",
    blockText:
      "We coordinate oversized, heavy, sensitive or non-standard cargo by integrating technical analysis, routes, permits, handling equipment, packaging and operational tracking.",

    servicesIntro:
      "We design solutions for heavy, industrial, oversized, dangerous or sensitive cargo, coordinating every stage from origin to destination.",
    servicesTitle: "Services for special and industrial cargo.",

    ctaEyebrow: "SPECIAL PROJECTS",
    ctaTitle: "Plan your operation with an expert team.",
    ctaText:
      "We analyze dimensions, weight, origin, destination, route restrictions, permits and delivery conditions to build a viable, safe and traceable solution.",
    ctaPrimary: "Evaluate special cargo",
    ctaSecondary: "View offices",

    relatedEyebrow: "RELATED SERVICES",
    relatedTitle: "Complementary operations for critical cargo.",
    related: {
      customs: "Customs Services",
      air: "Air Freight",
      sea: "Sea Freight",
    },

    services: [
      [
        "Heavy and oversized cargo projects",
        "End-to-end planning for high-weight, high-volume or technically complex cargo, coordinating routes, permits, equipment and final delivery.",
      ],
      [
        "Cargo reception and storage",
        "Coordination, verification and secure storage of special or industrial cargo before national or international transport.",
      ],
      [
        "Special loading and unloading operations",
        "Supervision of critical maneuvers to protect cargo integrity, operational equipment and personnel.",
      ],
      [
        "Conventional and special rolling cargo · Ro-Ro",
        "Solutions for shipping machinery, vehicles, heavy equipment and industrial units through Ro-Ro operations.",
      ],
      [
        "Break Bulk",
        "Planning and supervision of break bulk cargo, bulk goods and industrial projects outside standard containers.",
      ],
      [
        "Chartering",
        "Aircraft or vessel chartering for special operations requiring dedicated capacity, defined timing and full operational control.",
      ],
      [
        "Machinery transport",
        "Heavy machinery transport for industries with safety, technical coordination and deadline requirements.",
      ],
      [
        "Dangerous goods",
        "Management of dangerous goods with specific protocols for road, sea or air transport.",
      ],
      [
        "Special packaging and crates",
        "Design and coordination of technical packaging according to applicable regulations and cargo requirements.",
      ],
    ],
  },

  zh: {
    eyebrow: "项目货运",
    heroTitle: "面向超限、重型和关键货物的专业物流解决方案。",
    heroText:
      "我们为需要物流工程、许可、路线研究、专业装卸和国际协调的特殊货物规划运输操作，从始发地到目的地全程管理。",
    quote: "申请技术评估",
    specialist: "联系专家",

    blockEyebrow: "专业工业物流运营",
    blockTitle: "当货物需要规划、精准执行和运营控制时。",
    blockText:
      "我们协调超限、重型、敏感或非标准货物，整合技术分析、路线、许可、装卸设备、包装和运营跟踪。",

    servicesIntro:
      "我们为重型、工业、超限、危险或敏感货物设计解决方案，从始发地到目的地协调每一个环节。",
    servicesTitle: "特殊货物与工业货物服务。",

    ctaEyebrow: "特殊项目",
    ctaTitle: "与专业团队一起规划您的运输操作。",
    ctaText:
      "我们分析尺寸、重量、始发地、目的地、路线限制、许可和交付条件，为您制定可行、安全且可追溯的物流方案。",
    ctaPrimary: "评估特殊货物",
    ctaSecondary: "查看办公室",

    relatedEyebrow: "相关服务",
    relatedTitle: "面向关键货物的配套操作。",
    related: {
      customs: "海关服务",
      air: "空运服务",
      sea: "海运服务",
    },

    services: [
      [
        "重型与超限货物项目",
        "为高重量、大体积或技术复杂货物提供全流程规划，协调路线、许可、设备和最终交付。",
      ],
      [
        "货物接收与仓储",
        "在国内或国际运输前，对特殊或工业货物进行协调、核验和安全存储。",
      ],
      [
        "特殊装卸操作",
        "监督关键装卸环节，保护货物完整性、操作设备和现场人员安全。",
      ],
      [
        "普通与特殊滚装货物 · Ro-Ro",
        "通过 Ro-Ro 操作为机械、车辆、重型设备和工业单元提供运输方案。",
      ],
      [
        "散杂货 Break Bulk",
        "规划和监督散杂货、大宗货物以及标准集装箱以外的工业项目运输。",
      ],
      [
        "包机与包船",
        "为需要专属运力、明确时效和全面运营控制的特殊操作安排飞机或船舶。",
      ],
      [
        "机械运输",
        "为有安全、技术协调和时限要求的行业运输重型机械。",
      ],
      [
        "危险品",
        "按照陆运、海运或空运要求，通过专项流程管理危险品运输。",
      ],
      [
        "特殊包装与木箱",
        "根据适用法规和货物要求设计并协调技术包装方案。",
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
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/cargaspecial.png"
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
              src="/images/cargaspecial.png"
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

        <RelatedServices current="cargas-especiales" locale={locale} />
      </main>

      <Footer />
    </div>
  );
}
