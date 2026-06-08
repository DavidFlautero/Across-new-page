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

    title:
      "Logística especializada para alimentación y bebidas.",

    description:
      "Coordinamos operaciones logísticas para productos alimentarios y bebidas con control operativo, trazabilidad y máxima eficiencia en almacenamiento, transporte y distribución.",

    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN ALIMENTARIA INTERNACIONAL",

    blockTitle:
      "Control, trazabilidad y rapidez para productos sensibles.",

    blockText:
      "Gestionamos operaciones logísticas para el sector alimentación y bebidas garantizando cumplimiento sanitario, control documental y coordinación eficiente desde origen hasta entrega final.",

    servicesIntro:
      "Soluciones diseñadas para cadenas de suministro que requieren continuidad, seguridad y precisión operativa.",

    servicesTitle:
      "Servicios logísticos para alimentación y bebidas.",

    services: [
      [
        "Distribución alimentaria",
        "Coordinación de entregas nacionales e internacionales con control de tiempos y trazabilidad.",
      ],
      [
        "Gestión de inventario",
        "Supervisión de stock y rotación para optimizar disponibilidad y reducir pérdidas.",
      ],
      [
        "Control documental",
        "Gestión de documentación sanitaria y operativa para importación y exportación.",
      ],
      [
        "Operación multimodal",
        "Integración entre transporte terrestre, marítimo y aéreo según necesidades operativas.",
      ],
      [
        "Picking & packing",
        "Preparación eficiente de pedidos para retail, distribución y e-commerce alimentario.",
      ],
      [
        "Control de calidad",
        "Procesos de supervisión y validación para proteger integridad del producto.",
      ],
    ],

    ctaEyebrow: "Cotización express",

    ctaTitle:
      "Optimice su cadena logística alimentaria.",

    ctaText:
      "Analizamos producto, volumen, destinos y operación requerida para construir una solución logística rápida, segura y escalable.",

    ctaButton: "Solicitar propuesta →",
  },

  en: {
    eyebrow: "FOOD & BEVERAGE LOGISTICS",

    title:
      "Specialized logistics for food and beverage operations.",

    description:
      "We coordinate logistics operations for food and beverage products with operational control, traceability and maximum efficiency in storage, transportation and distribution.",

    primary: "Request quotation",
    secondary: "Talk to a specialist",

    blockEyebrow: "INTERNATIONAL FOOD OPERATIONS",

    blockTitle:
      "Control, traceability and speed for sensitive products.",

    blockText:
      "We manage logistics operations for the food and beverage sector ensuring sanitary compliance, documentation control and efficient coordination from origin to final delivery.",

    servicesIntro:
      "Solutions designed for supply chains that require continuity, security and operational precision.",

    servicesTitle:
      "Food & beverage logistics services.",

    services: [
      [
        "Food distribution",
        "Coordination of domestic and international deliveries with time control and traceability.",
      ],
      [
        "Inventory management",
        "Stock supervision and rotation optimization to reduce losses.",
      ],
      [
        "Documentation control",
        "Management of sanitary and operational documentation for imports and exports.",
      ],
      [
        "Multimodal operations",
        "Integration between road, maritime and air transport according to operational requirements.",
      ],
      [
        "Picking & packing",
        "Efficient order preparation for retail, distribution and food e-commerce.",
      ],
      [
        "Quality control",
        "Supervision and validation processes to protect product integrity.",
      ],
    ],

    ctaEyebrow: "Express quotation",

    ctaTitle:
      "Optimize your food supply chain.",

    ctaText:
      "We analyze product, volume, destinations and operational requirements to build a fast, secure and scalable logistics solution.",

    ctaButton: "Request proposal →",
  },

  zh: {
    eyebrow: "食品饮料物流",

    title:
      "食品与饮料行业专业物流解决方案。",

    description:
      "我们为食品与饮料行业提供高效物流运营，包括仓储、运输、配送与全流程可追溯管理。",

    primary: "申请报价",
    secondary: "联系专家",

    blockEyebrow: "国际食品物流运营",

    blockTitle:
      "为敏感产品提供更高的控制力与时效性。",

    blockText:
      "我们为食品与饮料行业协调国际物流业务，确保卫生合规、文件控制以及从起点到最终交付的高效运营。",

    servicesIntro:
      "为需要稳定性、安全性与高精度运营的供应链打造的物流方案。",

    servicesTitle:
      "食品与饮料物流服务。",

    services: [
      [
        "食品配送",
        "协调国内与国际配送，确保时效与可追溯性。",
      ],
      [
        "库存管理",
        "优化库存与周转，减少损耗。",
      ],
      [
        "文件控制",
        "管理进出口所需的卫生与运营文件。",
      ],
      [
        "多式联运",
        "整合陆运、海运与空运解决方案。",
      ],
      [
        "订单分拣与包装",
        "为零售、配送与食品电商提供高效备货。",
      ],
      [
        "质量控制",
        "通过监督与验证流程保障产品完整性。",
      ],
    ],

    ctaEyebrow: "快速报价",

    ctaTitle:
      "优化您的食品物流供应链。",

    ctaText:
      "我们分析产品、运输量、目的地与运营需求，构建快速、安全且可扩展的物流方案。",

    ctaButton: "申请方案 →",
  },
} as const;

export default function AlimentacionBebidasPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("across-locale") as Locale | null;

    if (saved && saved in copy) {
      setLocale(saved);
    }

    const handler = (event: Event) => {
      const next = (event as CustomEvent<Locale>).detail;

      if (next && next in copy) {
        setLocale(next);
      }
    };

    window.addEventListener("across-locale-change", handler);

    return () =>
      window.removeEventListener("across-locale-change", handler);
  }, []);

  const t = copy[locale];

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/sectores/alimentosybebidas.png"
          alt="Food and beverage logistics"
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
            <Link href="/cotizacion">
              {t.primary}
            </Link>

            <Link href="/contacto">
              {t.secondary}
            </Link>
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
                <details
                  key={title}
                  className={styles.serviceItem}
                >
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
              alt="Food logistics operation"
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

          <Link href="/cotizacion">
            {t.ctaButton}
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
