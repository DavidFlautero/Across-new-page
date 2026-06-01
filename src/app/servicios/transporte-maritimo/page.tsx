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
    eyebrow: "SEA FREIGHT",
    heroTitle: "Transporte marítimo global, seguro y competitivo.",
    heroText:
      "Movemos cargas FCL, LCL, RO/RO y proyectos especiales con cobertura internacional, control documental y planificación operativa de principio a fin.",
    quote: "Solicitar cotización",
    specialist: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN MARÍTIMA INTERNACIONAL",
    blockTitle: "Más alcance, menor coste y máxima visibilidad para su carga.",
    blockText:
      "Diseñamos operaciones marítimas para empresas que necesitan mover mercancía internacional sin perder control: rutas, documentación, modalidad de carga, coordinación portuaria y entrega final.",
    servicesIntro:
      "Elija la modalidad adecuada para su operación y deje la coordinación completa en manos de un equipo especializado.",
    servicesTitle: "Nuestros servicios para transporte marítimo.",
    ctaEyebrow: "Cotización express",
    ctaTitle: "Coordinemos su próxima operación marítima internacional.",
    ctaText:
      "Analizamos origen, destino, volumen, tipo de carga y urgencia para preparar una propuesta clara, rápida y viable.",
    ctaButton: "Solicitar propuesta →",
    services: [
      ["Carga peligrosa / IMO", "Gestión especializada de mercancías IMO con protocolos internacionales de seguridad."],
      ["Equipos especiales / OT · RF · FR · OOG", "Coordinación para carga sobredimensionada, refrigerada y proyectos complejos."],
      ["Cargas convencionales y RO/RO", "Operaciones para vehículos, maquinaria y carga general."],
      ["Contenedores completos / FCL", "Servicios FCL para exportaciones e importaciones de alto volumen."],
      ["Grupaje marítimo / LCL", "Consolidación de mercancías para reducir costos manteniendo control."],
      ["Chartering marítimo", "Soluciones personalizadas para operaciones especiales y gran escala."],
    ],
  },
  en: {
    eyebrow: "SEA FREIGHT",
    heroTitle: "Global, secure and competitive ocean freight.",
    heroText:
      "We move FCL, LCL, RO/RO and project cargo operations with international coverage, documentation control and end-to-end operational planning.",
    quote: "Request quotation",
    specialist: "Talk to a specialist",
    blockEyebrow: "INTERNATIONAL OCEAN OPERATIONS",
    blockTitle: "Greater reach, lower cost and full visibility for your cargo.",
    blockText:
      "We design ocean freight operations for companies that need to move international cargo without losing control: routes, documentation, cargo mode, port coordination and final delivery.",
    servicesIntro:
      "Choose the right modality for your operation and let a specialized team coordinate the full process.",
    servicesTitle: "Our ocean freight services.",
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s coordinate your next international ocean freight operation.",
    ctaText:
      "We analyze origin, destination, volume, cargo type and urgency to prepare a clear, fast and viable proposal.",
    ctaButton: "Request proposal →",
    services: [
      ["Dangerous goods / IMO", "Specialized management of IMO cargo with international safety protocols."],
      ["Special equipment / OT · RF · FR · OOG", "Coordination for oversized, refrigerated and complex project cargo."],
      ["Conventional cargo and RO/RO", "Operations for vehicles, machinery and general cargo."],
      ["Full container load / FCL", "FCL services for high-volume imports and exports."],
      ["Less than container load / LCL", "Cargo consolidation to reduce costs while maintaining control."],
      ["Ocean chartering", "Tailored ocean freight solutions for special operations and large-scale projects."],
    ],
  },
  zh: {
    eyebrow: "海运物流",
    heroTitle: "全球化、安全且高效的海运解决方案。",
    heroText:
      "我们提供 FCL、LCL、RO/RO 及项目货运服务，覆盖国际运输、文件控制与全流程运营规划。",
    quote: "申请报价",
    specialist: "联系专家",
    blockEyebrow: "国际海运运营",
    blockTitle: "更广覆盖、更低成本，并为您的货物提供全程可视化。",
    blockText:
      "我们为需要在国际范围内运输货物且保持全程控制的企业设计海运方案：航线、文件、装载方式、港口协调与最终交付。",
    servicesIntro:
      "选择适合您业务的运输模式，由专业团队负责完整协调。",
    servicesTitle: "我们的海运服务。",
    ctaEyebrow: "快速报价",
    ctaTitle: "让我们协调您的下一次国际海运业务。",
    ctaText:
      "我们会分析起运地、目的地、体积、货物类型与时效要求，为您准备清晰、快速且可执行的方案。",
    ctaButton: "申请方案 →",
    services: [
      ["危险品 / IMO", "按照国际安全标准管理 IMO 危险品货物。"],
      ["特殊设备 / OT · RF · FR · OOG", "协调超限、冷藏及复杂项目货物。"],
      ["普通货物与 RO/RO", "车辆、机械及普通货物的海运操作。"],
      ["整箱运输 / FCL", "面向大批量进出口业务的整箱运输服务。"],
      ["拼箱运输 / LCL", "通过货物拼箱降低成本，同时保持运输控制。"],
      ["海运包船", "为特殊操作与大型项目提供定制化海运方案。"],
    ],
  },
} as const;

export default function TransporteMaritimoPage() {
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
        <Image src="/images/maritimo.png" alt="Transporte marítimo" fill priority className={styles.heroImage} sizes="100vw" />
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
              src="/images/transportemaritimo.png"
              alt="Operación marítima"
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
