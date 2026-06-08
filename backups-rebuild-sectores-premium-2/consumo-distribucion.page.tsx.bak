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
    eyebrow: "CONSUMER & RETAIL LOGISTICS",
    title: "Logística para consumo y distribución con eficiencia, control y escalabilidad.",
    description:
      "Coordinamos operaciones nacionales e internacionales para productos de consumo, retail, distribución mayorista, e-commerce y cadenas comerciales que requieren rapidez, visibilidad operativa y capacidad de respuesta.",
    primary: "Solicitar solución de distribución",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN DE CONSUMO Y RETAIL",
    blockTitle: "Logística flexible para cadenas de distribución exigentes.",
    blockText:
      "Diseñamos soluciones para empresas de consumo y distribución integrando almacenaje, preparación de pedidos, transporte, última milla, control de inventario, trazabilidad y coordinación nacional e internacional.",

    servicesIntro:
      "Integramos soluciones logísticas para cadenas comerciales que necesitan disponibilidad, velocidad, control operativo y cumplimiento en cada etapa.",
    servicesTitle: "Servicios logísticos para consumo, retail y distribución.",

    services: [
      [
        "E-commerce",
        "Almacenamiento, preparación de pedidos, envío y entrega apoyados en tecnología para mejorar tiempos, reducir costes y escalar operaciones.",
      ],
      [
        "Servicios de aduanas",
        "Gestión documental, cumplimiento normativo y soporte operativo para importaciones y exportaciones.",
      ],
      [
        "Carga de temperatura controlada",
        "Transporte de productos refrigerados, congelados o perecederos bajo condiciones controladas.",
      ],
      [
        "Cargas especiales e industriales",
        "Gestión de operaciones complejas para mercancías que requieren planificación, manipulación o coordinación especializada.",
      ],
      [
        "Transporte aéreo",
        "Soluciones globales para envíos urgentes o de alta prioridad donde el tiempo es determinante.",
      ],
      [
        "Transporte marítimo",
        "Servicios marítimos para operaciones internacionales de alto volumen, distribución mayorista y cadenas de suministro globales.",
      ],
      [
        "Transporte terrestre",
        "Distribución terrestre flexible para entregas nacionales e internacionales con seguimiento operativo.",
      ],
      [
        "Almacén y distribución",
        "Soluciones de almacenamiento, gestión de stock, preparación de pedidos y distribución adaptadas a cada operación.",
      ],
    ],

    ctaEyebrow: "CONSUMO Y DISTRIBUCIÓN",
    ctaTitle: "Escalemos su operación comercial con un equipo especializado.",
    ctaText:
      "Analizamos tipo de producto, volumen, rotación, canales de venta, destinos, tiempos de entrega y necesidades de distribución para construir una solución eficiente, medible y escalable.",
    ctaPrimary: "Evaluar operación de distribución",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "CONSUMER & RETAIL LOGISTICS",
    title: "Consumer and distribution logistics with efficiency, control and scalability.",
    description:
      "We coordinate domestic and international operations for consumer goods, retail, wholesale distribution, e-commerce and commercial supply chains requiring speed, operational visibility and responsiveness.",
    primary: "Request distribution solution",
    secondary: "Talk to a specialist",

    blockEyebrow: "CONSUMER & RETAIL OPERATIONS",
    blockTitle: "Flexible logistics for demanding distribution chains.",
    blockText:
      "We design solutions for consumer and distribution companies by integrating warehousing, order preparation, transport, last mile, inventory control, traceability and domestic or international coordination.",

    servicesIntro:
      "We integrate logistics solutions for commercial supply chains that need availability, speed, operational control and compliance at every stage.",
    servicesTitle: "Logistics services for consumer goods, retail and distribution.",

    services: [
      [
        "E-commerce",
        "Storage, order preparation, shipping and delivery supported by technology to improve speed, reduce costs and scale operations.",
      ],
      [
        "Customs services",
        "Documentation management, regulatory compliance and operational support for imports and exports.",
      ],
      [
        "Temperature-controlled cargo",
        "Transport of refrigerated, frozen or perishable goods under controlled conditions.",
      ],
      [
        "Special and industrial cargo",
        "Management of complex operations for goods requiring planning, handling or specialized coordination.",
      ],
      [
        "Air freight",
        "Global solutions for urgent or high-priority shipments where time is decisive.",
      ],
      [
        "Ocean freight",
        "Ocean freight services for high-volume international operations, wholesale distribution and global supply chains.",
      ],
      [
        "Road transport",
        "Flexible road distribution for domestic and international deliveries with operational tracking.",
      ],
      [
        "Warehousing and distribution",
        "Storage, stock management, order preparation and distribution solutions adapted to each operation.",
      ],
    ],

    ctaEyebrow: "CONSUMER & DISTRIBUTION",
    ctaTitle: "Scale your commercial operation with a specialized team.",
    ctaText:
      "We analyze product type, volume, rotation, sales channels, destinations, delivery timing and distribution needs to build an efficient, measurable and scalable solution.",
    ctaPrimary: "Evaluate distribution operation",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "消费品与零售物流",
    title: "具备效率、控制力与可扩展性的消费品与配送物流。",
    description:
      "我们为消费品、零售、批发配送、电商和商业供应链协调国内与国际物流业务，满足其对速度、运营可视化和响应能力的要求。",
    primary: "申请配送物流方案",
    secondary: "联系专家",

    blockEyebrow: "消费品与零售运营",
    blockTitle: "面向高要求配送链的灵活物流。",
    blockText:
      "我们为消费品与配送企业设计物流方案，整合仓储、订单准备、运输、最后一公里、库存控制、可追溯性以及国内和国际协调。",

    servicesIntro:
      "我们为需要可用性、速度、运营控制和全流程合规的商业供应链整合物流方案。",
    servicesTitle: "面向消费品、零售与配送的物流服务。",

    services: [
      [
        "电商物流",
        "通过技术支持仓储、订单准备、发货与交付，以提升速度、降低成本并扩展运营。",
      ],
      [
        "海关服务",
        "为进出口提供文件管理、法规合规和运营支持。",
      ],
      [
        "温控货运",
        "在受控条件下运输冷藏、冷冻或易腐货物。",
      ],
      [
        "特殊与工业货物",
        "为需要规划、装卸或专业协调的货物管理复杂物流操作。",
      ],
      [
        "空运",
        "为时间关键的紧急或高优先级货物提供全球运输方案。",
      ],
      [
        "海运",
        "面向高容量国际业务、批发配送和全球供应链的海运服务。",
      ],
      [
        "陆运",
        "为国内与国际交付提供灵活陆路配送和运营跟踪。",
      ],
      [
        "仓储与配送",
        "根据不同业务需求提供仓储、库存管理、订单准备和配送解决方案。",
      ],
    ],

    ctaEyebrow: "消费品与配送",
    ctaTitle: "与专业团队一起扩展您的商业运营。",
    ctaText:
      "我们分析产品类型、货量、周转率、销售渠道、目的地、交付时效和配送需求，为您构建高效、可衡量且可扩展的方案。",
    ctaPrimary: "评估配送运营",
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

export default function ConsumoDistribucionPage() {
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
          src="/images/sectores/consumo1.png"
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
              src="/images/sectores/consumo2.png"
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
