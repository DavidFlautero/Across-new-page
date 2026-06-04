"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import Image from "next/image";
import Link from "next/link";
import styles from "../_shared/ServicePage.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    eyebrow: "TRANSPORTE TERRESTRE",
    heroTitle: "Transporte terrestre por carretera para operaciones nacionales e internacionales.",
    heroText:
      "Coordinamos soluciones de transporte terrestre para cargas completas, grupajes, distribución regional y operaciones puerta a puerta, con planificación de rutas, control documental y trazabilidad operativa.",
    quote: "Solicitar cotización terrestre",
    specialist: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN POR CARRETERA",
    blockTitle: "Conectamos origen y destino con control, flexibilidad y seguimiento.",
    blockText:
      "Diseñamos operaciones terrestres adaptadas al tipo de mercancía, urgencia, volumen y destino, integrando coordinación con almacenes, aduanas, puertos, aeropuertos y centros de distribución.",

    servicesIntro:
      "Gestionamos transporte por carretera para operaciones B2B que requieren precisión, cumplimiento de plazos y una coordinación logística clara desde la recogida hasta la entrega.",
    servicesTitle: "Servicios terrestres adaptados a cada necesidad logística.",
    services: [
      [
        "Carga completa FTL",
        "Transporte dedicado para mercancías que requieren vehículo completo, control directo de ruta y mayor seguridad operativa.",
      ],
      [
        "Grupaje y carga parcial LTL",
        "Soluciones eficientes para cargas de menor volumen, optimizando costes mediante consolidación y coordinación de entregas.",
      ],
      [
        "Distribución nacional y regional",
        "Operaciones de distribución por carretera para entregas programadas, rutas regionales y abastecimiento de puntos comerciales.",
      ],
      [
        "Puerta a puerta",
        "Coordinación integral desde el punto de recogida hasta la entrega final, con seguimiento y soporte operativo.",
      ],
      [
        "Conexión multimodal",
        "Integración del transporte terrestre con operaciones marítimas, aéreas, aduaneras y de almacenaje.",
      ],
      [
        "Cargas especiales por carretera",
        "Gestión de mercancías voluminosas, sensibles o con requerimientos específicos de manipulación y planificación.",
      ],
    ],

    ctaEyebrow: "RED TERRESTRE Y MULTIMODAL",
    ctaTitle: "Planifiquemos su próxima operación por carretera.",
    ctaText:
      "Analizamos origen, destino, tipo de mercancía, volumen, urgencia y requisitos operativos para construir una solución terrestre segura y viable.",
    ctaPrimary: "Cotizar transporte terrestre",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "ROAD FREIGHT",
    heroTitle: "Road freight for domestic and international operations.",
    heroText:
      "We coordinate road freight solutions for full loads, groupage, regional distribution and door-to-door operations, with route planning, documentation control and operational traceability.",
    quote: "Request road quotation",
    specialist: "Talk to a specialist",

    blockEyebrow: "ROAD OPERATIONS",
    blockTitle: "We connect origin and destination with control, flexibility and tracking.",
    blockText:
      "We design road freight operations adapted to cargo type, urgency, volume and destination, integrating coordination with warehouses, customs, ports, airports and distribution centers.",

    servicesIntro:
      "We manage road transport for B2B operations that require precision, deadline control and clear logistics coordination from pickup to delivery.",
    servicesTitle: "Road freight services adapted to each logistics requirement.",
    services: [
      [
        "Full truckload FTL",
        "Dedicated transport for cargo requiring a full vehicle, direct route control and higher operational security.",
      ],
      [
        "Less-than-truckload LTL",
        "Efficient solutions for smaller-volume cargo, optimizing costs through consolidation and delivery coordination.",
      ],
      [
        "Domestic and regional distribution",
        "Road distribution operations for scheduled deliveries, regional routes and commercial supply flows.",
      ],
      [
        "Door-to-door transport",
        "End-to-end coordination from pickup point to final delivery, with tracking and operational support.",
      ],
      [
        "Multimodal connection",
        "Integration of road freight with ocean, air, customs and warehousing operations.",
      ],
      [
        "Special cargo by road",
        "Management of oversized, sensitive or specific-requirement cargo requiring handling and route planning.",
      ],
    ],

    ctaEyebrow: "ROAD AND MULTIMODAL NETWORK",
    ctaTitle: "Let’s plan your next road operation.",
    ctaText:
      "We analyze origin, destination, cargo type, volume, urgency and operational requirements to build a safe and viable road freight solution.",
    ctaPrimary: "Quote road freight",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "陆运服务",
    heroTitle: "面向国内与国际业务的公路运输解决方案。",
    heroText:
      "我们为整车、拼车、区域配送和门到门业务协调公路运输方案，提供路线规划、文件控制和运营可追溯性。",
    quote: "申请陆运报价",
    specialist: "联系专家",

    blockEyebrow: "公路运输运营",
    blockTitle: "以控制力、灵活性和跟踪能力连接始发地与目的地。",
    blockText:
      "我们根据货物类型、时效、体积和目的地设计陆运操作，并与仓储、海关、港口、机场和配送中心进行协同。",

    servicesIntro:
      "我们为需要精准执行、时效控制和清晰物流协调的 B2B 业务管理公路运输，从提货到最终交付提供支持。",
    servicesTitle: "适用于不同物流需求的陆运服务。",
    services: [
      [
        "整车运输 FTL",
        "适用于需要专属车辆、直接路线控制和更高运营安全性的货物运输。",
      ],
      [
        "零担运输 LTL",
        "适用于较小体积货物的高效方案，通过拼载和配送协调优化成本。",
      ],
      [
        "国内与区域配送",
        "为计划交付、区域路线和商业补货提供公路配送运营。",
      ],
      [
        "门到门运输",
        "从提货点到最终交付的全流程协调，并提供跟踪和运营支持。",
      ],
      [
        "多式联运连接",
        "将陆运与海运、空运、清关和仓储操作进行整合。",
      ],
      [
        "公路特殊货物",
        "管理超限、敏感或有特殊要求的货物，提供装卸和路线规划支持。",
      ],
    ],

    ctaEyebrow: "陆运与多式联运网络",
    ctaTitle: "规划您的下一次公路运输操作。",
    ctaText:
      "我们分析始发地、目的地、货物类型、体积、时效和运营要求，构建安全可行的陆运方案。",
    ctaPrimary: "获取陆运报价",
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

export default function TransporteTerrestrePage() {
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
          src="/images/sectores/transporte-logistica-automocion.png"
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
        </section>

        <section className={styles.block}>
          <span>{t.ctaEyebrow}</span>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>

          <div className={styles.actions}>
            <Link href="/cotizacion">{t.ctaPrimary}</Link>
            <Link href="/empresa/oficinas">{t.ctaSecondary}</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
