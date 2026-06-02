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
    eyebrow: "CHEMICAL LOGISTICS",
    title: "Transporte y logística para el sector químico.",
    description:
      "Diseñamos soluciones para productos químicos y mercancías peligrosas con control normativo, seguridad operativa y coordinación internacional de principio a fin.",
    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN QUÍMICA INTERNACIONAL",
    blockTitle: "Seguridad, cumplimiento y precisión para cargas complejas.",
    blockText:
      "El sector químico exige procesos rigurosos: normas de seguridad, controles medioambientales, documentación técnica y manipulación especializada. Coordinamos importaciones y exportaciones para productos químicos en cualquier destino, reduciendo riesgos y manteniendo la operación bajo control.",
    servicesIntro:
      "Soluciones para empresas químicas que necesitan mover mercancía regulada, sensible o peligrosa con seguridad, trazabilidad y cumplimiento.",
    servicesTitle: "Servicios logísticos para el sector químico.",
    services: [
      ["Servicios de aduanas", "Gestión documental y cumplimiento aduanero para importaciones y exportaciones de productos químicos."],
      ["Carga de temperatura controlada", "Transporte para productos refrigerados, congelados, perecederos o sensibles a condiciones térmicas."],
      ["Cargas especiales e industriales", "Coordinación de operaciones complejas para mercancía industrial, sobredimensionada o de manipulación crítica."],
      ["Transporte aéreo", "Soluciones globales para envíos químicos donde el tiempo y la seguridad son prioritarios."],
      ["Transporte marítimo", "Operaciones marítimas personalizadas para cargas químicas internacionales, FCL, LCL o proyectos especiales."],
      ["Almacén y distribución", "Soluciones de almacenamiento flexible y distribución adaptadas a productos con requisitos específicos."],
      ["Mercancías peligrosas", "Gestión especializada para cargas reguladas con protocolos de seguridad y trazabilidad."],
      ["Control documental", "Revisión de documentación técnica, permisos, fichas y requisitos operativos para evitar bloqueos."]
    ],
    ctaEyebrow: "Cotización express",
    ctaTitle: "Planifiquemos su próxima operación química con seguridad.",
    ctaText:
      "Analizamos producto, clasificación, riesgo, documentación, origen y destino para construir una solución logística segura, viable y competitiva.",
    ctaButton: "Solicitar propuesta →",
  },
  en: {
    eyebrow: "CHEMICAL LOGISTICS",
    title: "Transport and logistics for the chemical sector.",
    description:
      "We design solutions for chemical products and dangerous goods with regulatory control, operational safety and end-to-end international coordination.",
    primary: "Request quotation",
    secondary: "Talk to a specialist",
    blockEyebrow: "INTERNATIONAL CHEMICAL OPERATIONS",
    blockTitle: "Safety, compliance and precision for complex cargo.",
    blockText:
      "The chemical sector requires rigorous processes: safety regulations, environmental controls, technical documentation and specialized handling. We coordinate imports and exports for chemical products to any destination, reducing risks and keeping the operation under control.",
    servicesIntro:
      "Solutions for chemical companies that need to move regulated, sensitive or dangerous cargo with safety, traceability and compliance.",
    servicesTitle: "Chemical sector logistics services.",
    services: [
      ["Customs services", "Documentation management and customs compliance for chemical imports and exports."],
      ["Temperature-controlled cargo", "Transport for refrigerated, frozen, perishable or temperature-sensitive products."],
      ["Special and industrial cargo", "Coordination of complex operations for industrial, oversized or critical-handling cargo."],
      ["Air freight", "Global solutions for chemical shipments where time and safety are a priority."],
      ["Ocean freight", "Tailored ocean operations for international chemical cargo, FCL, LCL or project cargo."],
      ["Warehousing and distribution", "Flexible storage and distribution solutions adapted to products with specific requirements."],
      ["Dangerous goods", "Specialized management for regulated cargo with safety protocols and traceability."],
      ["Documentation control", "Review of technical documentation, permits, sheets and operational requirements to avoid delays."]
    ],
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s plan your next chemical operation safely.",
    ctaText:
      "We analyze product, classification, risk, documentation, origin and destination to build a secure, viable and competitive logistics solution.",
    ctaButton: "Request proposal →",
  },
  zh: {
    eyebrow: "化工物流",
    title: "面向化工行业的运输与物流方案。",
    description:
      "我们为化工产品和危险品提供具备法规控制、运营安全与全流程国际协调的物流解决方案。",
    primary: "申请报价",
    secondary: "联系专家",
    blockEyebrow: "国际化工物流运营",
    blockTitle: "为复杂货物提供安全、合规与精准控制。",
    blockText:
      "化工行业需要严格流程：安全规范、环保控制、技术文件与专业操作。我们协调化工产品进出口至全球目的地，降低风险并保持运营可控。",
    servicesIntro:
      "为需要安全、追踪与合规运输监管类、敏感类或危险类货物的化工企业提供解决方案。",
    servicesTitle: "化工行业物流服务。",
    services: [
      ["海关服务", "化工产品进出口文件管理与海关合规。"],
      ["温控货运", "冷藏、冷冻、易腐或温度敏感产品运输。"],
      ["特殊与工业货物", "工业、超限或关键操作货物的复杂物流协调。"],
      ["空运", "为时间与安全优先的化工货物提供全球运输方案。"],
      ["海运", "面向 FCL、LCL 或项目货运的国际化工海运定制服务。"],
      ["仓储与配送", "适用于特殊要求产品的灵活仓储与配送方案。"],
      ["危险品", "按照安全协议与追踪要求管理受监管货物。"],
      ["文件控制", "审查技术文件、许可、资料与运营要求，避免延误。"]
    ],
    ctaEyebrow: "快速报价",
    ctaTitle: "安全规划您的下一次化工物流业务。",
    ctaText:
      "我们分析产品、分类、风险、文件、起运地与目的地，构建安全、可行且有竞争力的物流方案。",
    ctaButton: "申请方案 →",
  },
} as const;

export default function QuimicoPage() {
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
          src="/images/sectores/quimicohero.png"
          alt="Chemical logistics"
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
              src="/images/sectores/quimico2.png"
              alt="Chemical logistics operation"
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
