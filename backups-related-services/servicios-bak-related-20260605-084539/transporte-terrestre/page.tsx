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
    heroTitle: "Transporte terrestre nacional e internacional.",
    heroText:
      "Movemos su carga por carretera con trazabilidad, planificación de rutas y control operativo de punta a punta.",
    quote: "Solicitar cotización terrestre",
    specialist: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN POR CARRETERA",
    blockTitle: "Transporte por carretera con control y seguimiento.",
    blockText:
      "Gestionamos cargas completas, parciales y puerta a puerta, integrando almacenes, aduanas, puertos y aeropuertos cuando la operación lo requiere.",

    servicesIntro:
      "Soluciones terrestres para cada tipo de carga.",
    servicesTitle: "Soluciones de transporte terrestre.",
    services: [
      [
        "Carga completa FTL",
        "Vehículo dedicado para cargas que requieren mayor control, seguridad y tiempos definidos.",
      ],
      [
        "Grupaje y carga parcial LTL",
        "Transporte eficiente para cargas de menor volumen mediante consolidación.",
      ],
      [
        "Distribución nacional y regional",
        "Rutas programadas para abastecimiento, entregas comerciales y distribución.",
      ],
      [
        "Puerta a puerta",
        "Coordinación desde la recogida hasta la entrega final.",
      ],
      [
        "Conexión multimodal",
        "Integración con transporte marítimo, aéreo, aduanas y almacenaje.",
      ],
      [
        "Cargas especiales por carretera",
        "Soluciones para mercancías sensibles, voluminosas o con manejo específico.",
      ],
    ],

    ctaEyebrow: "RED TERRESTRE Y MULTIMODAL",
    ctaTitle: "Planifiquemos su próxima ruta.",
    ctaText:
      "Cuéntenos origen, destino, tipo de carga y urgencia. Diseñamos una solución terrestre segura y viable.",
    ctaPrimary: "Cotizar transporte terrestre",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "ROAD FREIGHT",
    heroTitle: "Domestic and international road freight.",
    heroText:
      "We move your cargo by road with traceability, route planning and end-to-end operational control.",
    quote: "Request road quotation",
    specialist: "Talk to a specialist",

    blockEyebrow: "ROAD OPERATIONS",
    blockTitle: "Road transport with control and tracking.",
    blockText:
      "We manage full loads, partial loads and door-to-door operations, integrating warehouses, customs, ports and airports when required.",

    servicesIntro:
      "Road freight solutions for every type of cargo.",
    servicesTitle: "Road freight solutions.",
    services: [
      [
        "Full truckload FTL",
        "Dedicated vehicles for cargo that requires control, security and defined transit times.",
      ],
      [
        "Less-than-truckload LTL",
        "Efficient transport for smaller cargo volumes through consolidation.",
      ],
      [
        "Domestic and regional distribution",
        "Scheduled routes for supply, commercial deliveries and regional distribution.",
      ],
      [
        "Door-to-door transport",
        "Coordination from pickup to final delivery.",
      ],
      [
        "Multimodal connection",
        "Integration with ocean, air, customs and warehousing operations.",
      ],
      [
        "Special cargo by road",
        "Solutions for sensitive, oversized or special-handling cargo.",
      ],
    ],

    ctaEyebrow: "ROAD AND MULTIMODAL NETWORK",
    ctaTitle: "Let’s plan your next route.",
    ctaText:
      "Tell us the origin, destination, cargo type and urgency. We design a safe and viable road freight solution.",
    ctaPrimary: "Quote road freight",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "陆运服务",
    heroTitle: "国内与国际陆运服务。",
    heroText:
      "我们通过公路运输您的货物，提供路线规划、可追溯性和全流程运营控制。",
    quote: "申请陆运报价",
    specialist: "联系专家",

    blockEyebrow: "公路运输运营",
    blockTitle: "可控、可追踪的公路运输。",
    blockText:
      "我们管理整车、零担和门到门运输，并在需要时协调仓储、海关、港口和机场。",

    servicesIntro:
      "适用于不同货物类型的陆运解决方案。",
    servicesTitle: "陆运解决方案。",
    services: [
      [
        "整车运输 FTL",
        "适用于需要专属车辆、路线控制和明确时效的货物。",
      ],
      [
        "零担运输 LTL",
        "适用于较小体积货物，通过拼载提升运输效率。",
      ],
      [
        "国内与区域配送",
        "用于计划交付、区域路线和商业配送。",
      ],
      [
        "门到门运输",
        "从提货到最终交付的全流程协调。",
      ],
      [
        "多式联运连接",
        "与海运、空运、清关和仓储业务衔接。",
      ],
      [
        "公路特殊货物",
        "适用于敏感、超限或需要特殊操作的货物。",
      ],
    ],

    ctaEyebrow: "陆运与多式联运网络",
    ctaTitle: "规划您的下一条运输路线。",
    ctaText:
      "告诉我们始发地、目的地、货物类型和时效要求，我们将设计安全可行的陆运方案。",
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
          src="/images/sectores/transporteterrestre.png"
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

          <div className={styles.servicesImageWrap}>
            <Image
              src="/images/sectores/transporteterrestre2.png"
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
