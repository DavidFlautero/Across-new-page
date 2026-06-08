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
    eyebrow: "TECHNOLOGY LOGISTICS",
    title: "Logística para tecnología, equipos sensibles y alto valor.",
    description: "Coordinamos operaciones para mercancía tecnológica que exige seguridad, precisión, control documental y tiempos de entrega fiables.",
    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN TECNOLÓGICA INTERNACIONAL",
    blockTitle: "Protección, trazabilidad y control para carga tecnológica.",
    blockText: "Gestionamos equipos electrónicos, componentes, dispositivos, maquinaria técnica y mercancía de alto valor con procesos diseñados para reducir riesgos, proteger el producto y mantener visibilidad operativa.",
    servicesIntro: "Soluciones para empresas tecnológicas que necesitan mover mercancía sensible con seguridad, velocidad y control.",
    servicesTitle: "Servicios logísticos para tecnología.",
    services: [
      ["Carga tecnológica sensible", "Transporte y coordinación para equipos electrónicos, hardware y componentes delicados."],
      ["Mercancía de alto valor", "Operaciones con protocolos de seguridad, trazabilidad y control documental."],
      ["Distribución internacional", "Coordinación de entregas globales para fabricantes, distribuidores y operadores tecnológicos."],
      ["Gestión aduanera", "Control documental para importación y exportación de productos tecnológicos."],
      ["Almacenamiento seguro", "Gestión de stock y preparación de pedidos para equipos sensibles."],
      ["Operaciones urgentes", "Soluciones rápidas para entregas críticas, lanzamientos o reposiciones estratégicas."]
    ],
    ctaEyebrow: "Cotización express",
    ctaTitle: "Protejamos su próxima operación tecnológica.",
    ctaText: "Analizamos tipo de equipo, valor, urgencia, destino y requisitos de manipulación para crear una solución segura y eficiente.",
    ctaButton: "Solicitar propuesta →"
  },
  en: {
    eyebrow: "TECHNOLOGY LOGISTICS",
    title: "Logistics for technology, sensitive equipment and high-value cargo.",
    description: "We coordinate operations for technology cargo requiring security, precision, documentation control and reliable delivery times.",
    primary: "Request quotation",
    secondary: "Talk to a specialist",
    blockEyebrow: "INTERNATIONAL TECHNOLOGY OPERATIONS",
    blockTitle: "Protection, traceability and control for technology cargo.",
    blockText: "We manage electronics, components, devices, technical machinery and high-value cargo through processes designed to reduce risks, protect the product and maintain operational visibility.",
    servicesIntro: "Solutions for technology companies that need to move sensitive cargo with security, speed and control.",
    servicesTitle: "Technology logistics services.",
    services: [
      ["Sensitive technology cargo", "Transport and coordination for electronics, hardware and delicate components."],
      ["High-value cargo", "Operations with security protocols, traceability and documentation control."],
      ["International distribution", "Global delivery coordination for manufacturers, distributors and technology operators."],
      ["Customs management", "Documentation control for imports and exports of technology products."],
      ["Secure warehousing", "Stock management and order preparation for sensitive equipment."],
      ["Urgent operations", "Fast solutions for critical deliveries, launches or strategic replenishment."]
    ],
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s protect your next technology operation.",
    ctaText: "We analyze equipment type, value, urgency, destination and handling requirements to create a secure and efficient solution.",
    ctaButton: "Request proposal →"
  },
  zh: {
    eyebrow: "科技物流",
    title: "面向科技产品、敏感设备与高价值货物的物流方案。",
    description: "我们为需要安全、精度、文件控制与可靠时效的科技货物协调物流业务。",
    primary: "申请报价",
    secondary: "联系专家",
    blockEyebrow: "国际科技物流运营",
    blockTitle: "为科技货物提供保护、追踪与控制。",
    blockText: "我们管理电子设备、组件、技术机械和高价值货物，通过专业流程降低风险、保护产品并保持运营可视化。",
    servicesIntro: "为需要安全、速度与控制的科技企业打造敏感货物物流方案。",
    servicesTitle: "科技物流服务。",
    services: [
      ["敏感科技货物", "电子设备、硬件与精密组件的运输协调。"],
      ["高价值货物", "具备安全协议、追踪与文件控制的物流操作。"],
      ["国际配送", "为制造商、分销商和科技运营商协调全球交付。"],
      ["海关管理", "科技产品进出口文件控制。"],
      ["安全仓储", "敏感设备库存管理与订单准备。"],
      ["紧急运输", "面向关键交付、产品发布或战略补货的快速方案。"]
    ],
    ctaEyebrow: "快速报价",
    ctaTitle: "保护您的下一次科技物流业务。",
    ctaText: "我们分析设备类型、价值、紧急程度、目的地与操作要求，创建安全高效的解决方案。",
    ctaButton: "申请方案 →"
  }
} as const;

export default function TecnologicoPage() {
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
        <Image src="/images/sectores/transporte-logistica-tecnologia.png" alt="Technology logistics" fill priority className={styles.heroImage} sizes="100vw" />
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
                  <summary><h3>{title}</h3><span>+</span></summary>
                  <p>{description}</p>
                </details>
              ))}
            </div>
          </div>

          <div className={styles.servicesImageWrap}>
            <Image src="/images/sectores/tecnologico.png" alt="Technology logistics operation" fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
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
