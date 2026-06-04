"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import styles from "../../servicios/_shared/ServicePage.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    eyebrow: "AUTOMOTIVE LOGISTICS",
    title: "Logística para automoción con control, sincronización y trazabilidad.",
    description:
      "Coordinamos operaciones nacionales e internacionales para fabricantes, proveedores, componentes, recambios y cadenas de suministro automotive que requieren precisión, tiempos ajustados y visibilidad operativa.",
    primary: "Solicitar solución automotive",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN AUTOMOTIVE ESPECIALIZADA",
    blockTitle: "Logística precisa para cadenas de suministro que no pueden detenerse.",
    blockText:
      "Diseñamos soluciones para el sector automoción integrando transporte, almacenaje, distribución, gestión documental, entregas urgentes, piezas críticas y coordinación internacional.",

    servicesIntro:
      "Soluciones para cadenas de suministro automotive que necesitan coordinación internacional, cumplimiento, trazabilidad y capacidad de respuesta ante operaciones críticas.",
    servicesTitle: "Servicios logísticos para automoción y supply chain industrial.",

    services: [
      [
        "Transporte de componentes",
        "Coordinación nacional e internacional para piezas, recambios, componentes industriales y mercancía crítica.",
      ],
      [
        "Logística para proveedores",
        "Operaciones orientadas a fabricantes, Tier 1, Tier 2, distribuidores y redes de suministro automotive.",
      ],
      [
        "Gestión aduanera",
        "Control documental, clasificación, despacho y soporte para importaciones y exportaciones del sector automoción.",
      ],
      [
        "Almacenamiento y distribución",
        "Gestión de stock, preparación de pedidos, distribución de componentes y operaciones de valor añadido.",
      ],
      [
        "Operaciones urgentes",
        "Soluciones rápidas para evitar paradas de producción, retrasos críticos o falta de piezas en destino.",
      ],
      [
        "Trazabilidad operativa",
        "Seguimiento de mercancía, control de procesos y visibilidad durante toda la cadena logística.",
      ],
    ],

    ctaEyebrow: "AUTOMOCIÓN",
    ctaTitle: "Planifique su operación automotive con un equipo especializado.",
    ctaText:
      "Analizamos tipo de componente, volumen, origen, destino, urgencia, requisitos documentales y modelo de distribución para construir una solución segura, eficiente y trazable.",
    ctaPrimary: "Evaluar operación automotive",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "AUTOMOTIVE LOGISTICS",
    title: "Automotive logistics with control, synchronization and traceability.",
    description:
      "We coordinate domestic and international operations for manufacturers, suppliers, components, spare parts and automotive supply chains requiring precision, tight timing and operational visibility.",
    primary: "Request automotive solution",
    secondary: "Talk to a specialist",

    blockEyebrow: "SPECIALIZED AUTOMOTIVE OPERATIONS",
    blockTitle: "Precise logistics for supply chains that cannot stop.",
    blockText:
      "We design solutions for the automotive sector by integrating transport, warehousing, distribution, documentation management, urgent deliveries, critical parts and international coordination.",

    servicesIntro:
      "Solutions for automotive supply chains requiring international coordination, compliance, traceability and responsiveness for critical operations.",
    servicesTitle: "Logistics services for automotive and industrial supply chains.",

    services: [
      [
        "Component transport",
        "Domestic and international coordination for parts, spare parts, industrial components and critical cargo.",
      ],
      [
        "Supplier logistics",
        "Operations for manufacturers, Tier 1, Tier 2, distributors and automotive supply networks.",
      ],
      [
        "Customs management",
        "Documentation control, classification, clearance and support for automotive imports and exports.",
      ],
      [
        "Warehousing and distribution",
        "Stock management, order preparation, component distribution and value-added operations.",
      ],
      [
        "Urgent operations",
        "Fast solutions to avoid production stops, critical delays or lack of parts at destination.",
      ],
      [
        "Operational traceability",
        "Cargo tracking, process control and visibility across the full logistics chain.",
      ],
    ],

    ctaEyebrow: "AUTOMOTIVE",
    ctaTitle: "Plan your automotive operation with a specialized team.",
    ctaText:
      "We analyze component type, volume, origin, destination, urgency, documentation requirements and distribution model to build a safe, efficient and traceable solution.",
    ctaPrimary: "Evaluate automotive operation",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "汽车物流",
    title: "具备控制、同步与可追溯能力的汽车行业物流。",
    description:
      "我们为制造商、供应商、零部件、备件以及需要精准时效和运营可视化的汽车供应链协调国内与国际物流业务。",
    primary: "申请汽车物流方案",
    secondary: "联系专家",

    blockEyebrow: "专业汽车物流运营",
    blockTitle: "为不能停滞的供应链提供精准物流。",
    blockText:
      "我们为汽车行业设计物流方案，整合运输、仓储、配送、文件管理、紧急交付、关键零部件和国际协调。",

    servicesIntro:
      "为需要国际协调、合规、可追溯性和关键业务响应能力的汽车供应链打造解决方案。",
    servicesTitle: "面向汽车与工业供应链的物流服务。",

    services: [
      [
        "零部件运输",
        "协调国内与国际零部件、备件、工业组件和关键货物运输。",
      ],
      [
        "供应商物流",
        "服务制造商、一级供应商、二级供应商、经销商和汽车供应网络。",
      ],
      [
        "海关管理",
        "为汽车进出口提供文件控制、归类、清关和操作支持。",
      ],
      [
        "仓储与配送",
        "零部件库存管理、订单准备、配送和增值操作。",
      ],
      [
        "紧急运输",
        "快速响应，避免生产停滞、关键延误或目的地零部件短缺。",
      ],
      [
        "运营追踪",
        "在整个物流链路中提供货物追踪、流程控制和可视化管理。",
      ],
    ],

    ctaEyebrow: "汽车行业",
    ctaTitle: "与专业团队一起规划您的汽车物流操作。",
    ctaText:
      "我们分析组件类型、货量、始发地、目的地、紧急程度、文件要求和配送模式，为您构建安全、高效且可追溯的方案。",
    ctaPrimary: "评估汽车物流操作",
    ctaSecondary: "查看办公室",
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

export default function AutomocionPage() {
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
          src="/images/sectores/transporte-logistica-automocion.png"
          alt={t.title}
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>

          <div className={styles.actions}>
            <Link href="/cotizacion">{t.primary}</Link>
            <Link href="/contacto">{t.secondary}</Link>
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
              {t.services.map(([title, description]) => (
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
              src="/images/sectores/automocion2.png"
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
