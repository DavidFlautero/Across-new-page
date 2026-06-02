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
    eyebrow: "CONSUMER & DISTRIBUTION LOGISTICS",
    title: "Logística para consumo y distribución en movimiento constante.",
    description:
      "Diseñamos soluciones para empresas que necesitan abastecer, preparar, empaquetar y distribuir productos con velocidad, control y capacidad de respuesta.",
    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN CONSUMO Y DISTRIBUCIÓN",
    blockTitle: "Del stock al cliente final, con más control y menos fricción.",
    blockText:
      "El sector de consumo y distribución exige operaciones rápidas, flexibles y conectadas. Coordinamos almacenamiento, transporte, aduanas y distribución para que cada producto llegue al mercado en tiempo y forma.",
    servicesIntro:
      "Integramos soluciones logísticas para cadenas de consumo que necesitan disponibilidad, visibilidad y cumplimiento en cada etapa.",
    servicesTitle: "Servicios logísticos para consumo y distribución.",
    services: [
      ["e-Commerce", "Almacenamiento, preparación, envío y entrega apoyados en soluciones tecnológicas para mejorar tiempos y reducir costes."],
      ["Servicios de aduanas", "Gestión documental y cumplimiento normativo para importaciones y exportaciones."],
      ["Carga de temperatura controlada", "Transporte de productos refrigerados, congelados o perecederos en condiciones controladas."],
      ["Cargas especiales e industriales", "Gestión de operaciones complejas con soluciones eficientes y competitivas."],
      ["Transporte aéreo", "Soluciones globales para envíos donde el tiempo es una prioridad."],
      ["Transporte marítimo", "Servicios marítimos personalizados para operaciones internacionales de alto volumen."],
      ["Transporte terrestre", "Distribución terrestre flexible para entregas nacionales e internacionales."],
      ["Almacén y distribución", "Soluciones de almacenamiento inteligente, competitivo y adaptado a cada cliente."],
    ],
    ctaEyebrow: "Cotización express",
    ctaTitle: "Hagamos más eficiente su operación de consumo.",
    ctaText:
      "Analizamos volumen, rotación, canales de venta, destinos y tiempos de entrega para construir una solución logística clara, rápida y escalable.",
    ctaButton: "Solicitar propuesta →",
  },
  en: {
    eyebrow: "CONSUMER & DISTRIBUTION LOGISTICS",
    title: "Logistics for consumer goods and distribution in constant motion.",
    description:
      "We design solutions for companies that need to supply, prepare, pack and distribute products with speed, control and responsiveness.",
    primary: "Request quotation",
    secondary: "Talk to a specialist",
    blockEyebrow: "CONSUMER & DISTRIBUTION OPERATIONS",
    blockTitle: "From stock to final customer, with more control and less friction.",
    blockText:
      "Consumer and distribution operations require speed, flexibility and connected processes. We coordinate warehousing, transportation, customs and distribution so every product reaches the market on time.",
    servicesIntro:
      "We integrate logistics solutions for consumer supply chains that need availability, visibility and compliance at every stage.",
    servicesTitle: "Consumer and distribution logistics services.",
    services: [
      ["e-Commerce", "Storage, preparation, shipping and delivery supported by technology to improve speed and reduce costs."],
      ["Customs services", "Documentation management and regulatory compliance for imports and exports."],
      ["Temperature-controlled cargo", "Transport of refrigerated, frozen or perishable goods under controlled conditions."],
      ["Special and industrial cargo", "Management of complex operations with efficient and competitive solutions."],
      ["Air freight", "Global solutions for shipments where time is a priority."],
      ["Ocean freight", "Tailored ocean freight services for high-volume international operations."],
      ["Road transport", "Flexible road distribution for domestic and international deliveries."],
      ["Warehousing and distribution", "Smart, competitive and tailored storage solutions for each client."],
    ],
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s make your consumer logistics operation more efficient.",
    ctaText:
      "We analyze volume, rotation, sales channels, destinations and delivery times to build a clear, fast and scalable logistics solution.",
    ctaButton: "Request proposal →",
  },
  zh: {
    eyebrow: "消费品与配送物流",
    title: "面向持续流动的消费品与配送物流。",
    description:
      "我们为需要快速供货、备货、包装和配送产品的企业设计具备速度、控制力与响应能力的物流方案。",
    primary: "申请报价",
    secondary: "联系专家",
    blockEyebrow: "消费与配送运营",
    blockTitle: "从库存到终端客户，实现更高控制与更少摩擦。",
    blockText:
      "消费与配送行业需要快速、灵活且互联的运营。我们协调仓储、运输、海关和配送，让产品准时进入市场。",
    servicesIntro:
      "我们为需要可用性、可视化和全流程合规的消费品供应链整合物流方案。",
    servicesTitle: "消费品与配送物流服务。",
    services: [
      ["电商物流", "通过技术支持仓储、备货、发货与交付，提高速度并降低成本。"],
      ["海关服务", "进出口文件管理与法规合规。"],
      ["温控货运", "在受控条件下运输冷藏、冷冻或易腐货物。"],
      ["特殊与工业货物", "以高效且具有竞争力的方案管理复杂运营。"],
      ["空运", "为时间优先的货物提供全球运输方案。"],
      ["海运", "面向高容量国际业务的定制海运服务。"],
      ["陆运", "面向国内与国际交付的灵活陆路配送。"],
      ["仓储与配送", "为每位客户提供智能、具竞争力且定制化的仓储方案。"],
    ],
    ctaEyebrow: "快速报价",
    ctaTitle: "让您的消费品物流运营更高效。",
    ctaText:
      "我们分析货量、周转、销售渠道、目的地与交付时间，构建清晰、快速且可扩展的物流方案。",
    ctaButton: "申请方案 →",
  },
} as const;

export default function ConsumoDistribucionPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("across-locale") as Locale | null;
    if (saved && saved in copy) setLocale(saved);

    const handler = (event: Event) => {
      const next = (event as CustomEvent<Locale>).detail;
      if (next && next in copy) setLocale(next);
    };

    window.addEventListener("across-locale-change", handler);
    return () => window.removeEventListener("across-locale-change", handler);
  }, []);

  const t = copy[locale];

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/sectores/consumo1.png"
          alt="Consumer and distribution logistics"
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
              src="/images/sectores/consumo2.png"
              alt="Consumer distribution operation"
              fill
              className={styles.servicesImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className={styles.cta}>
          <span>{t.ctaEyebrow}</span>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <Link href="/cotizacion">{t.ctaButton}</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
