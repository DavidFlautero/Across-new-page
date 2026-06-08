"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import Image from "next/image";
import Link from "next/link";
import styles from "../_shared/ServicePage.module.css";

type Locale = "es" | "en" | "zh";

const copy: Record<Locale, any> = {
  es: {
    eyebrow: "SEA FREIGHT",
    heroTitle: "Transporte marítimo internacional para cargas de gran volumen.",
    heroText:
      "Coordinamos soluciones marítimas globales para cargas FCL, LCL, RO/RO, mercancías especiales y proyectos internacionales que requieren planificación, control documental y trazabilidad de origen a destino.",
    quote: "Solicitar cotización marítima",
    specialist: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN MARÍTIMA GLOBAL",
    blockTitle: "Gestione sus operaciones marítimas con cobertura, control y precisión.",
    blockText:
      "Diseñamos operaciones marítimas internacionales combinando planificación de rutas, coordinación portuaria, gestión documental y seguimiento operativo para cargas contenerizadas, consolidadas y especiales.",

    servicesIntro:
      "Coordinamos soluciones marítimas para cargas completas, consolidadas, mercancías especiales y operaciones puerta a puerta, optimizando tiempos, costes y control documental.",
    servicesTitle: "Servicios marítimos adaptados a cada operación internacional.",

    ctaEyebrow: "RED MARÍTIMA INTERNACIONAL",
    ctaTitle: "Operaciones marítimas conectadas con puertos y oficinas estratégicas.",
    ctaText:
      "Coordinamos cargas FCL, LCL y proyectos especiales con soporte documental, gestión aduanera y seguimiento operativo internacional.",
    ctaPrimary: "Cotizar carga marítima",
    ctaSecondary: "Ver oficinas",

    services: [
      [
        "FCL - Contenedor completo",
        "Soluciones marítimas para cargas que requieren contenedor exclusivo, mayor control operativo y planificación directa desde origen hasta destino.",
      ],
      [
        "LCL - Carga consolidada",
        "Alternativa eficiente para mercancías de menor volumen, compartiendo espacio en contenedor con trazabilidad y coordinación documental.",
      ],
      [
        "Mercancía peligrosa / IMO",
        "Gestión especializada de mercancías IMO con protocolos internacionales de seguridad, revisión documental y coordinación operativa segura.",
      ],
      [
        "Equipos especiales / OT · RF · FR · OOG",
        "Coordinación para carga sobredimensionada, refrigerada, pesada o sensible que requiere planificación técnica y manipulación especializada.",
      ],
      [
        "RO/RO y carga convencional",
        "Operaciones para vehículos, maquinaria, carga rodante y mercancía general con coordinación portuaria internacional.",
      ],
      [
        "Chartering marítimo",
        "Soluciones personalizadas para operaciones especiales, proyectos de gran escala y cargas que requieren capacidad dedicada.",
      ],
    ],
  },

  en: {
    eyebrow: "SEA FREIGHT",
    heroTitle: "International ocean freight for high-volume cargo.",
    heroText:
      "We coordinate global ocean freight solutions for FCL, LCL, RO/RO, special cargo and international projects that require planning, documentation control and traceability from origin to destination.",
    quote: "Request ocean quotation",
    specialist: "Talk to a specialist",

    blockEyebrow: "GLOBAL OCEAN OPERATIONS",
    blockTitle: "Manage your ocean freight operations with coverage, control and precision.",
    blockText:
      "We design international ocean freight operations by combining route planning, port coordination, documentation management and operational tracking for containerized, consolidated and special cargo.",

    servicesIntro:
      "We coordinate ocean freight solutions for full loads, consolidated cargo, special goods and door-to-door operations, optimizing transit times, costs and documentation control.",
    servicesTitle: "Ocean freight services adapted to each international operation.",

    ctaEyebrow: "INTERNATIONAL OCEAN NETWORK",
    ctaTitle: "Ocean operations connected with strategic ports and offices.",
    ctaText:
      "We coordinate FCL, LCL and special project cargo with documentation support, customs management and international operational tracking.",
    ctaPrimary: "Quote ocean cargo",
    ctaSecondary: "View offices",

    services: [
      [
        "FCL - Full container load",
        "Ocean freight solutions for cargo requiring an exclusive container, greater operational control and direct planning from origin to destination.",
      ],
      [
        "LCL - Consolidated cargo",
        "An efficient alternative for lower-volume shipments, sharing container space with traceability and documentation coordination.",
      ],
      [
        "Dangerous goods / IMO",
        "Specialized management of IMO cargo with international safety protocols, documentation review and safe operational coordination.",
      ],
      [
        "Special equipment / OT · RF · FR · OOG",
        "Coordination for oversized, refrigerated, heavy or sensitive cargo requiring technical planning and specialized handling.",
      ],
      [
        "RO/RO and conventional cargo",
        "Operations for vehicles, machinery, rolling cargo and general goods with international port coordination.",
      ],
      [
        "Ocean chartering",
        "Tailored solutions for special operations, large-scale projects and cargo requiring dedicated capacity.",
      ],
    ],
  },

  zh: {
    eyebrow: "海运物流",
    heroTitle: "面向大批量货物的国际海运解决方案。",
    heroText:
      "我们为 FCL、LCL、RO/RO、特殊货物和国际项目协调全球海运方案，提供从始发地到目的地的规划、文件控制和可追溯性。",
    quote: "申请海运报价",
    specialist: "联系专家",

    blockEyebrow: "全球海运运营",
    blockTitle: "以覆盖能力、运营控制和精准执行管理您的海运业务。",
    blockText:
      "我们通过航线规划、港口协调、文件管理和运营跟踪，为集装箱货物、拼箱货物和特殊货物设计国际海运操作。",

    servicesIntro:
      "我们为整箱、拼箱、特殊货物和门到门业务协调海运方案，优化运输时间、成本和文件控制。",
    servicesTitle: "适用于不同国际业务的海运服务。",

    ctaEyebrow: "国际海运网络",
    ctaTitle: "连接战略港口与办公室的海运操作。",
    ctaText:
      "我们为 FCL、LCL 和特殊项目货物提供文件支持、清关管理和国际运营跟踪。",
    ctaPrimary: "获取海运报价",
    ctaSecondary: "查看办公室",

    services: [
      [
        "FCL - 整箱运输",
        "为需要专属集装箱、更高运营控制和从始发地到目的地直接规划的货物提供海运方案。",
      ],
      [
        "LCL - 拼箱运输",
        "适用于较小体积货物的高效方案，通过共享集装箱空间实现可追溯运输和文件协调。",
      ],
      [
        "危险品 / IMO",
        "按照国际安全标准专业管理 IMO 危险品，包括文件审核和安全运营协调。",
      ],
      [
        "特殊设备 / OT · RF · FR · OOG",
        "协调超限、冷藏、重型或敏感货物，提供技术规划和专业装卸支持。",
      ],
      [
        "RO/RO 与普通货物",
        "为车辆、机械、滚装货物和普通货物提供国际港口协调操作。",
      ],
      [
        "海运包船",
        "为特殊操作、大型项目和需要专属运力的货物提供定制化海运方案。",
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

export default function TransporteMaritimoPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const updateLocale = () => setLocale(getInitialLocale());

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
          src="/images/maritimo.png"
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
              src="/images/transportemaritimo.png"
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

      <Footer />
    </div>
  );
}
