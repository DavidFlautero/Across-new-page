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
    eyebrow: "COLD CHAIN LOGISTICS",
    heroTitle: "Carga de temperatura controlada con trazabilidad total.",
    heroText:
      "Protegemos mercancías sensibles mediante soluciones logísticas refrigeradas para operaciones farmacéuticas, alimentarias y carga crítica internacional.",
    quote: "Solicitar cotización",
    specialist: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN TEMPERATURA CONTROLADA",
    blockTitle:
      "Control térmico preciso para operaciones sensibles y de alto valor.",
    blockText:
      "Diseñamos operaciones logísticas refrigeradas para mercancías que requieren estabilidad térmica, monitoreo continuo y máxima seguridad operativa durante todo el trayecto.",
    servicesIntro:
      "Coordinamos operaciones refrigeradas internacionales con seguimiento, documentación y control especializado.",
    servicesTitle:
      "Nuestros servicios para carga de temperatura controlada.",
    ctaEyebrow: "Cotización express",
    ctaTitle:
      "Coordinemos su próxima operación de cadena de frío.",
    ctaText:
      "Analizamos requerimientos térmicos, tiempos de tránsito y tipo de mercancía para diseñar una solución eficiente y segura.",
    ctaButton: "Solicitar propuesta →",
    services: [
      [
        "Cadena de frío internacional",
        "Coordinación logística para mercancías sensibles con control térmico continuo.",
      ],
      [
        "Carga farmacéutica",
        "Operaciones especializadas para productos médicos y farmacéuticos.",
      ],
      [
        "Alimentos refrigerados",
        "Transporte internacional de alimentos perecederos y congelados.",
      ],
      [
        "Monitoreo y trazabilidad",
        "Seguimiento operativo y control de temperatura durante toda la operación.",
      ],
      [
        "Almacenamiento refrigerado",
        "Infraestructura logística preparada para carga sensible.",
      ],
      [
        "Operaciones urgentes",
        "Coordinación prioritaria para mercancía crítica y envíos sensibles.",
      ],
    ],
  },

  en: {
    eyebrow: "COLD CHAIN LOGISTICS",
    heroTitle: "Temperature-controlled cargo with full traceability.",
    heroText:
      "We protect sensitive cargo through refrigerated logistics solutions for pharmaceutical, food and critical international operations.",
    quote: "Request quotation",
    specialist: "Talk to a specialist",
    blockEyebrow: "TEMPERATURE-CONTROLLED OPERATIONS",
    blockTitle:
      "Precise thermal control for sensitive and high-value operations.",
    blockText:
      "We design refrigerated logistics operations for cargo requiring thermal stability, continuous monitoring and maximum operational security.",
    servicesIntro:
      "We coordinate refrigerated international operations with specialized monitoring and control.",
    servicesTitle:
      "Our temperature-controlled cargo services.",
    ctaEyebrow: "Express quotation",
    ctaTitle:
      "Let’s coordinate your next cold chain operation.",
    ctaText:
      "We analyze thermal requirements, transit times and cargo type to design an efficient and secure solution.",
    ctaButton: "Request proposal →",
    services: [
      [
        "International cold chain",
        "Logistics coordination for sensitive cargo with continuous thermal control.",
      ],
      [
        "Pharmaceutical cargo",
        "Specialized operations for medical and pharmaceutical products.",
      ],
      [
        "Refrigerated food cargo",
        "International transport for perishable and frozen food products.",
      ],
      [
        "Monitoring and traceability",
        "Operational tracking and temperature monitoring throughout the shipment.",
      ],
      [
        "Refrigerated storage",
        "Logistics infrastructure prepared for sensitive cargo.",
      ],
      [
        "Urgent operations",
        "Priority coordination for critical and sensitive shipments.",
      ],
    ],
  },

  zh: {
    eyebrow: "冷链物流",
    heroTitle: "全程可追踪的温控货运解决方案。",
    heroText:
      "我们为医药、食品及高敏感国际货物提供专业冷链物流与温控运输服务。",
    quote: "申请报价",
    specialist: "联系专家",
    blockEyebrow: "温控物流运营",
    blockTitle:
      "为高价值与敏感货物提供精准温度控制。",
    blockText:
      "我们为需要恒温、持续监控与高安全标准的货物设计冷链物流解决方案。",
    servicesIntro:
      "我们协调国际冷链运输并提供专业监控与温度控制。",
    servicesTitle:
      "我们的温控货运服务。",
    ctaEyebrow: "快速报价",
    ctaTitle:
      "让我们协调您的下一次冷链运输业务。",
    ctaText:
      "我们会根据温度要求、运输时间与货物类型设计安全高效的物流方案。",
    ctaButton: "申请方案 →",
    services: [
      [
        "国际冷链运输",
        "针对敏感货物提供持续温控物流协调。",
      ],
      [
        "医药货运",
        "医药与医疗产品的专业运输服务。",
      ],
      [
        "冷藏食品运输",
        "生鲜与冷冻食品的国际运输。",
      ],
      [
        "监控与追踪",
        "全程温度监控与物流追踪。",
      ],
      [
        "冷藏仓储",
        "适用于敏感货物的冷链仓储设施。",
      ],
      [
        "紧急运输",
        "针对关键与敏感货物的优先协调。",
      ],
    ],
  },
} as const;

export default function TemperaturaControladaPage() {
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
          src="/images/controltemp.png"
          alt="Carga temperatura controlada"
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
              src="/images/temperaturacontrolada.png"
              alt="Cadena de frío"
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
