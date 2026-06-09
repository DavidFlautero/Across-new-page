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
    title: "Logística para automoción con precisión industrial.",
    description:
      "Coordinamos operaciones logísticas para fabricantes, proveedores y distribuidores del sector automoción, integrando transporte, aduanas, almacenamiento y distribución.",
    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN AUTOMOTRIZ INTERNACIONAL",
    blockTitle: "Continuidad, control y velocidad para cadenas automotrices.",
    blockText:
      "Gestionamos componentes, recambios, vehículos y mercancía industrial con procesos diseñados para mantener la continuidad operativa, reducir incidencias y mejorar la trazabilidad.",
    servicesIntro:
      "Soluciones para cadenas de suministro automotrices que necesitan coordinación internacional, cumplimiento y capacidad de respuesta.",
    servicesTitle: "Servicios logísticos para automoción.",
    services: [
      ["Transporte de componentes", "Coordinación nacional e internacional para piezas, recambios y componentes industriales."],
      ["Logística para proveedores", "Operaciones orientadas a fabricantes, Tier 1, Tier 2 y distribuidores."],
      ["Gestión aduanera", "Control documental y despacho para importaciones y exportaciones del sector automoción."],
      ["Almacenamiento y distribución", "Gestión de stock, preparación y distribución de componentes."],
      ["Operaciones urgentes", "Soluciones rápidas para evitar paradas de producción o retrasos críticos."],
      ["Trazabilidad operativa", "Seguimiento de mercancía y control de procesos durante toda la cadena logística."],
    ],
    ctaEyebrow: "Cotización express",
    ctaTitle: "Movamos su operación automotriz con más control.",
    ctaText:
      "Analizamos origen, destino, tipo de mercancía, tiempos y criticidad para diseñar una solución logística eficiente y escalable.",
    ctaButton: "Solicitar propuesta →",
  },
  en: {
    eyebrow: "AUTOMOTIVE LOGISTICS",
    title: "Automotive logistics with industrial precision.",
    description:
      "We coordinate logistics operations for manufacturers, suppliers and distributors in the automotive sector, integrating transport, customs, warehousing and distribution.",
    primary: "Request quotation",
    secondary: "Talk to a specialist",
    blockEyebrow: "INTERNATIONAL AUTOMOTIVE OPERATIONS",
    blockTitle: "Continuity, control and speed for automotive supply chains.",
    blockText:
      "We manage components, spare parts, vehicles and industrial cargo through processes designed to maintain operational continuity, reduce incidents and improve traceability.",
    servicesIntro:
      "Solutions for automotive supply chains requiring international coordination, compliance and responsiveness.",
    servicesTitle: "Automotive logistics services.",
    services: [
      ["Component transport", "Domestic and international coordination for parts, spare parts and industrial components."],
      ["Supplier logistics", "Operations for manufacturers, Tier 1, Tier 2 and distributors."],
      ["Customs management", "Documentation control and clearance for automotive imports and exports."],
      ["Warehousing and distribution", "Stock management, preparation and distribution of components."],
      ["Urgent operations", "Fast solutions to avoid production stops or critical delays."],
      ["Operational traceability", "Cargo tracking and process control across the full logistics chain."],
    ],
    ctaEyebrow: "Express quotation",
    ctaTitle: "Move your automotive operation with greater control.",
    ctaText:
      "We analyze origin, destination, cargo type, timing and criticality to design an efficient and scalable logistics solution.",
    ctaButton: "Request proposal →",
  },
  zh: {
    eyebrow: "汽车物流",
    title: "具备工业级精度的汽车行业物流。",
    description:
      "我们为汽车制造商、供应商和经销商协调物流业务，整合运输、海关、仓储与配送。",
    primary: "申请报价",
    secondary: "联系专家",
    blockEyebrow: "国际汽车物流运营",
    blockTitle: "为汽车供应链提供连续性、控制力与速度。",
    blockText:
      "我们管理零部件、备件、车辆和工业货物，通过专业流程保障运营连续性、减少问题并提升可追踪性。",
    servicesIntro:
      "面向需要国际协调、合规与快速响应的汽车供应链解决方案。",
    servicesTitle: "汽车物流服务。",
    services: [
      ["零部件运输", "协调国内与国际零部件、备件和工业组件运输。"],
      ["供应商物流", "服务制造商、一级供应商、二级供应商与经销商。"],
      ["海关管理", "汽车进出口文件控制与清关。"],
      ["仓储与配送", "零部件库存、备货与配送管理。"],
      ["紧急运输", "避免生产停滞或关键延误的快速物流方案。"],
      ["运营追踪", "全链路货物追踪与流程控制。"],
    ],
    ctaEyebrow: "快速报价",
    ctaTitle: "以更高控制力推动您的汽车物流业务。",
    ctaText:
      "我们分析起运地、目的地、货物类型、时效与关键程度，设计高效且可扩展的物流方案。",
    ctaButton: "申请方案 →",
  },
} as const;

export default function AutomocionPage() {
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
          src="/images/sectores/transporte-logistica-automocion.png"
          alt="Automotive logistics"
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
              alt="Automotive logistics operation"
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
