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
    eyebrow: "WAREHOUSING & DISTRIBUTION",
    heroTitle: "Almacén y distribución para operaciones que necesitan control.",
    heroText: "Integramos almacenamiento, preparación de pedidos, gestión de inventario y distribución para empresas que necesitan eficiencia, visibilidad y capacidad operativa escalable.",
    quote: "Solicitar cotización",
    specialist: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN LOGÍSTICA INTEGRAL",
    blockTitle: "Más visibilidad, menos fricción y entregas mejor coordinadas.",
    blockText: "Diseñamos soluciones de almacenaje y distribución adaptadas a cada operación, conectando inventario, preparación, transporte y entrega final bajo un mismo estándar operativo.",
    servicesIntro: "Centralice su operación logística con procesos diseñados para reducir tiempos, mejorar control y aumentar capacidad de respuesta.",
    servicesTitle: "Nuestros servicios de almacén y distribución.",
    ctaEyebrow: "Cotización express",
    ctaTitle: "Diseñemos una operación de almacén y distribución a medida.",
    ctaText: "Analizamos volumen, rotación, tipo de mercancía, destinos y tiempos de entrega para construir una solución clara, escalable y eficiente.",
    ctaButton: "Solicitar propuesta →",
    services: [
      ["Depósito aduanero. DA, DDA y LAME", "Soluciones de depósito aduanero para operaciones que requieren control fiscal, documental y operativo."],
      ["Depósito de mercancía peligrosa (APQ)", "Almacenamiento especializado para mercancías peligrosas bajo protocolos de seguridad y cumplimiento."],
      ["Seguridad y vigilancia 24/7", "Instalaciones con control permanente para proteger mercancías críticas o de alto valor."],
      ["Gestión de inventarios y pedidos", "Control de stock, preparación de pedidos y visibilidad operativa para reducir errores."],
      ["Picking & packing", "Preparación, embalaje, consolidación y acondicionamiento de pedidos para distribución."],
      ["Intermodal", "Coordinación entre diferentes modos de transporte para optimizar costes y tiempos."],
      ["Integración perfecta entre sistemas", "Conexión operativa entre plataformas, inventario, pedidos y procesos logísticos."],
      ["Informes periódicos de KPI", "Reportes de indicadores clave para medir rendimiento, servicio y eficiencia operativa."],
      ["Inspección almacén SOIVRE", "Soporte para inspecciones y controles requeridos en operaciones específicas."],
      ["Registro Sanitario Alimentación", "Gestión vinculada a mercancías alimentarias que requieren cumplimiento sanitario."],
      ["Sistema de gestión de almacenes (SGA)", "Operación apoyada en sistemas de gestión para mejorar trazabilidad y control."],
      ["Last Mile Delivery", "Distribución de última milla orientada a entregas rápidas, coordinadas y medibles."],
      ["Servicios de valor añadido", "Etiquetado, manipulación, preparación especial y adaptaciones según canal o mercado."],
      ["Mejora continua de procesos", "Optimización operativa basada en datos, medición y revisión constante."],
      ["Gestión 360 de su negocio", "Coordinación integral de la operación logística para centralizar control y ejecución."],
    ],
  },
  en: {
    eyebrow: "WAREHOUSING & DISTRIBUTION",
    heroTitle: "Warehousing and distribution for operations that need control.",
    heroText: "We integrate storage, order preparation, inventory management and distribution for companies that need efficiency, visibility and scalable operational capacity.",
    quote: "Request quotation",
    specialist: "Talk to a specialist",
    blockEyebrow: "INTEGRATED LOGISTICS OPERATIONS",
    blockTitle: "More visibility, less friction and better coordinated deliveries.",
    blockText: "We design warehousing and distribution solutions adapted to each operation, connecting inventory, preparation, transport and final delivery under one operating standard.",
    servicesIntro: "Centralize your logistics operation with processes designed to reduce times, improve control and increase responsiveness.",
    servicesTitle: "Our warehousing and distribution services.",
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s design a tailored warehousing and distribution operation.",
    ctaText: "We analyze volume, rotation, cargo type, destinations and delivery times to build a clear, scalable and efficient solution.",
    ctaButton: "Request proposal →",
    services: [
      ["Customs warehouse. DA, DDA and LAME", "Customs warehouse solutions for operations requiring fiscal, documentation and operational control."],
      ["Dangerous goods warehouse (APQ)", "Specialized storage for dangerous goods under safety and compliance protocols."],
      ["24/7 security and surveillance", "Facilities with permanent control to protect critical or high-value cargo."],
      ["Inventory and order management", "Stock control, order preparation and operational visibility to reduce errors."],
      ["Picking & packing", "Order preparation, packing, consolidation and conditioning for distribution."],
      ["Intermodal", "Coordination between transport modes to optimize costs and transit times."],
      ["Seamless systems integration", "Operational connection between platforms, inventory, orders and logistics processes."],
      ["Periodic KPI reports", "Performance reports to measure service level, efficiency and operational quality."],
      ["SOIVRE warehouse inspection", "Support for inspections and controls required in specific operations."],
      ["Food sanitary registration", "Management for food cargo requiring sanitary compliance."],
      ["Warehouse Management System (WMS)", "Operations supported by warehouse systems to improve traceability and control."],
      ["Last Mile Delivery", "Last-mile distribution focused on fast, coordinated and measurable deliveries."],
      ["Value-added services", "Labeling, handling, special preparation and adaptations by channel or market."],
      ["Continuous process improvement", "Operational optimization based on data, measurement and constant review."],
      ["360º business management", "End-to-end logistics coordination to centralize control and execution."],
    ],
  },
  zh: {
    eyebrow: "仓储与配送",
    heroTitle: "为需要高度控制的业务提供仓储与配送方案。",
    heroText: "我们整合仓储、订单准备、库存管理与配送服务，帮助企业提升效率、可视化能力与可扩展运营能力。",
    quote: "申请报价",
    specialist: "联系专家",
    blockEyebrow: "综合物流运营",
    blockTitle: "更高可视化、更少摩擦，以及更协调的交付流程。",
    blockText: "我们根据每项业务设计仓储与配送解决方案，将库存、备货、运输与最终交付连接在同一运营标准下。",
    servicesIntro: "通过专业流程集中管理物流业务，缩短时间、提升控制并增强响应能力。",
    servicesTitle: "我们的仓储与配送服务。",
    ctaEyebrow: "快速报价",
    ctaTitle: "让我们为您设计定制化仓储与配送方案。",
    ctaText: "我们会分析货量、周转率、货物类型、目的地与交付时效，构建清晰、可扩展且高效的方案。",
    ctaButton: "申请方案 →",
    services: [
      ["海关仓库 DA、DDA 与 LAME", "为需要税务、文件和运营控制的业务提供海关仓储方案。"],
      ["危险品仓储（APQ）", "按照安全与合规要求存储危险品货物。"],
      ["24/7 安全与监控", "通过持续监控保护关键或高价值货物。"],
      ["库存与订单管理", "库存控制、订单准备与运营可视化，减少错误。"],
      ["拣货与包装", "订单拣选、包装、合并与配送准备。"],
      ["多式联运", "协调不同运输方式以优化成本与时效。"],
      ["系统无缝集成", "连接平台、库存、订单与物流流程。"],
      ["定期 KPI 报告", "提供关键绩效指标报告，衡量服务、效率与运营质量。"],
      ["SOIVRE 仓库检验", "支持特定业务所需的检验与监管流程。"],
      ["食品卫生注册", "管理需要卫生合规的食品货物。"],
      ["仓库管理系统（WMS）", "通过仓库管理系统提升可追踪性与控制能力。"],
      ["最后一公里配送", "面向快速、协调和可衡量交付的末端配送。"],
      ["增值服务", "标签、操作处理、特殊准备及按渠道或市场进行适配。"],
      ["持续流程改进", "基于数据、评估与持续复盘优化运营流程。"],
      ["360° 业务管理", "端到端物流协调，集中控制与执行。"],
    ],
  },
} as const;

export default function AlmacenDistribucionPage() {
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
  const firstServices = t.services.slice(0, 8);
  const secondServices = t.services.slice(8);

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image src="/images/almacenHero.png" alt="Almacén y distribución" fill priority className={styles.heroImage} sizes="100vw" />
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
              {firstServices.map(([title, description]) => (
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
            <Image src="/images/almacensegunda.png" alt="Operación de almacén" fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </section>

        <section className={`${styles.servicesPanel} ${styles.servicesPanelReverse}`}>
          <div className={styles.servicesImageWrap}>
            <Image src="/images/almacentercer.png" alt="Gestión avanzada de almacén" fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>

          <div className={styles.servicesCopy}>
            <p>{t.servicesIntro}</p>
            <h2>{t.servicesTitle}</h2>

            <div className={styles.accordion}>
              {secondServices.map(([title, description]) => (
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
