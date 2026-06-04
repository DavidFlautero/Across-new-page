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
    eyebrow: "FOOD & BEVERAGE LOGISTICS",
    title: "Logística para alimentación y bebidas con control, trazabilidad y cumplimiento.",
    description:
      "Coordinamos operaciones nacionales e internacionales para productos alimentarios, bebidas, perecederos y cadenas de suministro que requieren control documental, eficiencia operativa y visibilidad desde origen hasta destino.",
    primary: "Solicitar solución logística",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN ALIMENTARIA ESPECIALIZADA",
    blockTitle: "Logística segura para productos que requieren precisión y cumplimiento.",
    blockText:
      "Diseñamos soluciones para empresas de alimentación y bebidas integrando transporte, almacenaje, distribución, control documental, trazabilidad y coordinación internacional.",

    servicesIntro:
      "Soluciones diseñadas para cadenas alimentarias que requieren continuidad operativa, control de producto, documentación precisa y capacidad de respuesta.",
    servicesTitle: "Servicios logísticos para cadenas de alimentación y bebidas.",

    services: [
      [
        "Distribución alimentaria",
        "Coordinación de entregas nacionales e internacionales con control de tiempos, trazabilidad y continuidad operativa.",
      ],
      [
        "Gestión de inventario",
        "Supervisión de stock, rotación y disponibilidad para optimizar flujos logísticos y reducir pérdidas.",
      ],
      [
        "Control documental",
        "Gestión de documentación sanitaria, operativa y de comercio exterior para importación y exportación.",
      ],
      [
        "Operación multimodal",
        "Integración entre transporte terrestre, marítimo y aéreo según producto, destino y tiempos requeridos.",
      ],
      [
        "Picking & packing",
        "Preparación eficiente de pedidos para retail, distribución mayorista y e-commerce alimentario.",
      ],
      [
        "Control de calidad",
        "Procesos de supervisión y validación para proteger la integridad del producto durante la operación.",
      ],
    ],

    ctaEyebrow: "ALIMENTACIÓN Y BEBIDAS",
    ctaTitle: "Planifique su operación con un equipo especializado.",
    ctaText:
      "Analizamos tipo de producto, volumen, origen, destino, requisitos documentales, temperatura, rotación y tiempos de entrega para construir una solución segura, eficiente y escalable.",
    ctaPrimary: "Evaluar operación alimentaria",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "FOOD & BEVERAGE LOGISTICS",
    title: "Food and beverage logistics with control, traceability and compliance.",
    description:
      "We coordinate domestic and international operations for food products, beverages, perishables and supply chains requiring documentation control, operational efficiency and visibility from origin to destination.",
    primary: "Request logistics solution",
    secondary: "Talk to a specialist",

    blockEyebrow: "SPECIALIZED FOOD OPERATIONS",
    blockTitle: "Secure logistics for products requiring precision and compliance.",
    blockText:
      "We design solutions for food and beverage companies by integrating transport, warehousing, distribution, documentation control, traceability and international coordination.",

    servicesIntro:
      "Solutions designed for food supply chains requiring operational continuity, product control, accurate documentation and responsiveness.",
    servicesTitle: "Logistics services for food and beverage supply chains.",

    services: [
      [
        "Food distribution",
        "Coordination of domestic and international deliveries with time control, traceability and operational continuity.",
      ],
      [
        "Inventory management",
        "Stock supervision, rotation and availability control to optimize logistics flows and reduce losses.",
      ],
      [
        "Documentation control",
        "Management of sanitary, operational and foreign trade documentation for imports and exports.",
      ],
      [
        "Multimodal operations",
        "Integration between road, ocean and air transport according to product, destination and required timing.",
      ],
      [
        "Picking & packing",
        "Efficient order preparation for retail, wholesale distribution and food e-commerce.",
      ],
      [
        "Quality control",
        "Supervision and validation processes to protect product integrity throughout the operation.",
      ],
    ],

    ctaEyebrow: "FOOD & BEVERAGE",
    ctaTitle: "Plan your operation with a specialized team.",
    ctaText:
      "We analyze product type, volume, origin, destination, documentation requirements, temperature, rotation and delivery times to build a secure, efficient and scalable solution.",
    ctaPrimary: "Evaluate food operation",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "食品饮料物流",
    title: "具备控制、可追溯性与合规能力的食品饮料物流。",
    description:
      "我们为食品、饮料、易腐产品及需要文件控制、运营效率和全程可视化的供应链协调国内与国际物流业务。",
    primary: "申请物流方案",
    secondary: "联系专家",

    blockEyebrow: "专业食品物流运营",
    blockTitle: "为需要精准与合规的产品提供安全物流。",
    blockText:
      "我们为食品与饮料企业设计物流方案，整合运输、仓储、配送、文件控制、可追溯性和国际协调。",

    servicesIntro:
      "为需要运营连续性、产品控制、准确文件和快速响应能力的食品供应链打造物流方案。",
    servicesTitle: "面向食品饮料供应链的物流服务。",

    services: [
      [
        "食品配送",
        "协调国内与国际配送，确保时效、可追溯性和运营连续性。",
      ],
      [
        "库存管理",
        "监督库存、周转和可用性，以优化物流流程并减少损耗。",
      ],
      [
        "文件控制",
        "管理进出口所需的卫生、运营与外贸文件。",
      ],
      [
        "多式联运",
        "根据产品、目的地和时效要求整合陆运、海运与空运方案。",
      ],
      [
        "订单分拣与包装",
        "为零售、批发配送和食品电商提供高效订单准备。",
      ],
      [
        "质量控制",
        "通过监督与验证流程保障产品在整个操作中的完整性。",
      ],
    ],

    ctaEyebrow: "食品与饮料",
    ctaTitle: "与专业团队一起规划您的物流操作。",
    ctaText:
      "我们分析产品类型、货量、始发地、目的地、文件要求、温度、周转率和交付时效，为您构建安全、高效且可扩展的方案。",
    ctaPrimary: "评估食品物流操作",
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

export default function AlimentacionBebidasPage() {
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
          src="/images/sectores/alimentosybebidas.png"
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
              src="/images/sectores/alimentosybebidas2.png"
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
