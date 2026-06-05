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
    eyebrow: "CUSTOMS SERVICES",
    heroTitle: "Gestión aduanera ágil, segura y estratégica.",
    heroText:
      "Coordinamos operaciones aduaneras internacionales con control documental, cumplimiento normativo y máxima eficiencia para reducir tiempos y evitar bloqueos operativos.",
    quote: "Solicitar cotización",
    specialist: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN ADUANERA INTERNACIONAL",
    blockTitle:
      "Menos fricción operativa y mayor velocidad en cada despacho.",
    blockText:
      "Gestionamos procesos aduaneros complejos para importación y exportación, asegurando cumplimiento, trazabilidad y coordinación eficiente entre transporte, documentación y autoridades.",

    servicesIntro:
      "Optimizamos la gestión aduanera para reducir incidencias, acelerar procesos y mejorar la continuidad operativa.",
    servicesTitle:
      "Nuestros servicios aduaneros.",

    ctaEyebrow: "Cotización express",
    ctaTitle:
      "Coordinemos su próxima operación aduanera.",
    ctaText:
      "Analizamos tipo de mercancía, origen, destino y requerimientos regulatorios para construir una operación segura y eficiente.",
    ctaButton: "Solicitar propuesta →",

    services: [
      [
        "Despacho de importación",
        "Gestión documental y coordinación integral para operaciones de importación.",
      ],
      [
        "Despacho de exportación",
        "Procesos aduaneros ágiles para exportaciones internacionales.",
      ],
      [
        "Asesoramiento aduanero",
        "Consultoría especializada para optimizar procesos y cumplimiento normativo.",
      ],
      [
        "Clasificación arancelaria",
        "Determinación correcta de partidas arancelarias y requisitos regulatorios.",
      ],
      [
        "Gestión documental",
        "Control y validación de documentación para operaciones internacionales.",
      ],
      [
        "Inspecciones y controles",
        "Coordinación con autoridades y organismos de control.",
      ],
      [
        "Regímenes especiales",
        "Operaciones vinculadas a depósitos aduaneros y regímenes especiales.",
      ],
      [
        "Cumplimiento normativo",
        "Seguimiento regulatorio para minimizar riesgos e incidencias.",
      ],
      [
        "Optimización de costes",
        "Análisis operativo para mejorar eficiencia fiscal y logística.",
      ],
      [
        "Coordinación multimodal",
        "Integración entre aduanas, transporte y distribución.",
      ],
    ],
  },

  en: {
    eyebrow: "CUSTOMS SERVICES",
    heroTitle: "Agile, secure and strategic customs management.",
    heroText:
      "We coordinate international customs operations with documentation control, regulatory compliance and maximum efficiency to reduce delays and operational risks.",
    quote: "Request quotation",
    specialist: "Talk to a specialist",

    blockEyebrow: "INTERNATIONAL CUSTOMS OPERATIONS",
    blockTitle:
      "Less operational friction and greater speed in every clearance.",
    blockText:
      "We manage complex customs processes for imports and exports, ensuring compliance, traceability and efficient coordination between transport, documentation and authorities.",

    servicesIntro:
      "We optimize customs management to reduce incidents, accelerate processes and improve operational continuity.",
    servicesTitle:
      "Our customs services.",

    ctaEyebrow: "Express quotation",
    ctaTitle:
      "Let’s coordinate your next customs operation.",
    ctaText:
      "We analyze cargo type, origin, destination and regulatory requirements to build a secure and efficient operation.",
    ctaButton: "Request proposal →",

    services: [
      [
        "Import clearance",
        "Documentation management and full coordination for import operations.",
      ],
      [
        "Export clearance",
        "Agile customs processes for international exports.",
      ],
      [
        "Customs consulting",
        "Specialized advisory to optimize processes and regulatory compliance.",
      ],
      [
        "Tariff classification",
        "Correct determination of tariff codes and regulatory requirements.",
      ],
      [
        "Documentation management",
        "Control and validation of documents for international operations.",
      ],
      [
        "Inspections and controls",
        "Coordination with authorities and inspection agencies.",
      ],
      [
        "Special regimes",
        "Operations linked to customs warehouses and special regimes.",
      ],
      [
        "Regulatory compliance",
        "Regulatory monitoring to minimize risks and incidents.",
      ],
      [
        "Cost optimization",
        "Operational analysis to improve fiscal and logistics efficiency.",
      ],
      [
        "Multimodal coordination",
        "Integration between customs, transportation and distribution.",
      ],
    ],
  },

  zh: {
    eyebrow: "海关服务",
    heroTitle: "高效、安全且具战略性的海关管理。",
    heroText:
      "我们协调国际海关业务，提供文件控制、法规合规与高效率运营，以减少延误与运营风险。",
    quote: "申请报价",
    specialist: "联系专家",

    blockEyebrow: "国际海关运营",
    blockTitle:
      "减少运营摩擦，加快每一次清关流程。",
    blockText:
      "我们管理复杂的进出口海关流程，确保合规、可追踪性以及运输、文件与监管机构之间的高效协调。",

    servicesIntro:
      "我们优化海关管理，以减少问题、加快流程并提升运营连续性。",
    servicesTitle:
      "我们的海关服务。",

    ctaEyebrow: "快速报价",
    ctaTitle:
      "让我们协调您的下一次海关业务。",
    ctaText:
      "我们分析货物类型、起运地、目的地及监管要求，构建安全高效的运营方案。",
    ctaButton: "申请方案 →",

    services: [
      [
        "进口清关",
        "进口业务的文件管理与整体协调。",
      ],
      [
        "出口清关",
        "国际出口业务的高效海关流程。",
      ],
      [
        "海关咨询",
        "优化流程与法规合规的专业咨询。",
      ],
      [
        "税则归类",
        "正确确定税则编码与监管要求。",
      ],
      [
        "文件管理",
        "国际业务文件的控制与验证。",
      ],
      [
        "检查与监管",
        "与监管机构及检查部门协调。",
      ],
      [
        "特殊监管模式",
        "涉及海关仓储与特殊监管模式的业务。",
      ],
      [
        "法规合规",
        "法规跟踪以降低风险与问题。",
      ],
      [
        "成本优化",
        "提升税务与物流效率的运营分析。",
      ],
      [
        "多式联运协调",
        "整合海关、运输与配送流程。",
      ],
    ],
  },
} as const;

export default function AduanasPage() {
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

  const firstServices = t.services.slice(0, 5);
  const secondServices = t.services.slice(5);

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/aduanashero.png"
          alt="Servicios aduaneros"
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
            <Link href="/cotizacion">
              {t.quote}
            </Link>

            <Link href="/contacto">
              {t.specialist}
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
              {firstServices.map(([title, description]: readonly [string, string]) => (
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
              src="/images/terceraaduana.png"
              alt="Operación aduanera"
              fill
              className={styles.servicesImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className={`${styles.servicesPanel} ${styles.servicesPanelReverse}`}>
          <div className={styles.servicesImageWrap}>
            <Image
              src="/images/segundaaduana.png"
              alt="Gestión aduanera"
              fill
              className={styles.servicesImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className={styles.servicesCopy}>
            <p>{t.servicesIntro}</p>

            <h2>{t.servicesTitle}</h2>

            <div className={styles.accordion}>
              {secondServices.map(([title, description]: readonly [string, string]) => (
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
