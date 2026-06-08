"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import Image from "next/image";
import Link from "next/link";
import styles from "../_shared/ServicePage.module.css";
import RelatedServices from "../_shared/RelatedServices";

type Locale = "es" | "en" | "zh";

const copy: Record<Locale, any> = {
  es: {
    eyebrow: "WAREHOUSING & DISTRIBUTION",
    heroTitle: "Almacenaje y distribución para operaciones logísticas eficientes.",
    heroText: "Gestionamos mercancías, inventario, preparación de pedidos y distribución nacional e internacional con control operativo, trazabilidad y soluciones adaptadas a cada cadena de suministro.",
    quote: "Solicitar solución logística",
    specialist: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN LOGÍSTICA INTEGRADA",
    blockTitle: "Control, trazabilidad y eficiencia desde el almacén hasta la entrega.",
    blockText: "Diseñamos soluciones de almacenaje y distribución para empresas que necesitan gestionar stock, preparar pedidos, optimizar flujos logísticos y asegurar entregas con visibilidad operativa.",
    servicesIntro: "Centralizamos procesos de almacenaje, inventario, preparación y distribución para reducir tiempos, mejorar control y aumentar la capacidad de respuesta.",
    servicesTitle: "Servicios de almacenaje y distribución para cadenas de suministro exigentes.",
    ctaEyebrow: "ALMACENAJE Y DISTRIBUCIÓN",
    ctaTitle: "Optimice su operación logística con un equipo especializado.",
    ctaText: "Analizamos tipo de mercancía, volumen, rotación, necesidades de almacenaje, preparación de pedidos y distribución para construir una solución eficiente y escalable.",
    ctaPrimary: "Evaluar operación logística",
    ctaSecondary: "Ver oficinas",
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
    heroTitle: "Warehousing and distribution for efficient logistics operations.",
    heroText: "We manage cargo, inventory, order preparation and domestic or international distribution with operational control, traceability and solutions adapted to each supply chain.",
    quote: "Request logistics solution",
    specialist: "Talk to a specialist",
    blockEyebrow: "INTEGRATED LOGISTICS OPERATIONS",
    blockTitle: "Control, traceability and efficiency from warehouse to delivery.",
    blockText: "We design warehousing and distribution solutions for companies that need to manage stock, prepare orders, optimize logistics flows and secure deliveries with operational visibility.",
    servicesIntro: "We centralize warehousing, inventory, order preparation and distribution processes to reduce times, improve control and increase responsiveness.",
    servicesTitle: "Warehousing and distribution services for demanding supply chains.",
    ctaEyebrow: "WAREHOUSING & DISTRIBUTION",
    ctaTitle: "Optimize your logistics operation with a specialized team.",
    ctaText: "We analyze cargo type, volume, rotation, storage needs, order preparation and distribution requirements to build an efficient and scalable solution.",
    ctaPrimary: "Evaluate logistics operation",
    ctaSecondary: "View offices",
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
    heroTitle: "面向高效物流运营的仓储与配送解决方案。",
    heroText: "我们管理货物、库存、订单准备以及国内和国际配送，提供运营控制、可追溯性和适配供应链需求的解决方案。",
    quote: "申请物流方案",
    specialist: "联系专家",
    blockEyebrow: "综合物流运营",
    blockTitle: "从仓储到交付，实现控制、可追溯性与效率。",
    blockText: "我们为需要管理库存、准备订单、优化物流流程并确保可视化交付的企业设计仓储与配送解决方案。",
    servicesIntro: "我们集中管理仓储、库存、订单准备和配送流程，以缩短时间、提升控制并增强响应能力。",
    servicesTitle: "面向高要求供应链的仓储与配送服务。",
    ctaEyebrow: "仓储与配送",
    ctaTitle: "与专业团队一起优化您的物流运营。",
    ctaText: "我们分析货物类型、货量、周转率、仓储需求、订单准备和配送要求，为您构建高效且可扩展的方案。",
    ctaPrimary: "评估物流运营",
    ctaSecondary: "查看办公室",
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
    const getInitialLocale = (): Locale => {
      const saved =
        window.localStorage.getItem("locale") ||
        window.localStorage.getItem("across-locale");

      if (saved === "en" || saved === "zh" || saved === "es") return saved;

      const htmlLang = document.documentElement.lang;
      if (htmlLang === "en" || htmlLang === "zh" || htmlLang === "es") return htmlLang;

      return "es";
    };

    const updateLocale = (event?: Event) => {
      const rawDetail = event instanceof CustomEvent ? event.detail : null;

      const next =
        typeof rawDetail === "string"
          ? rawDetail
          : rawDetail && typeof rawDetail === "object" && "locale" in rawDetail
            ? String((rawDetail as { locale?: unknown }).locale)
            : rawDetail && typeof rawDetail === "object" && "language" in rawDetail
              ? String((rawDetail as { language?: unknown }).language)
              : null;

      if (next === "es" || next === "en" || next === "zh") {
        setLocale(next);
        return;
      }

      setLocale(getInitialLocale());
    };

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
  const firstServices = t.services.slice(0, 8);
  const secondServices = t.services.slice(8);

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image src="/images/almacenHero.png" alt={t.heroTitle} fill priority className={styles.heroImage} sizes="100vw" />
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
              {firstServices.map(([title, description]: readonly [string, string]) => (
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
            <Image src="/images/almacensegunda.png" alt={t.servicesTitle} fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </section>

        <section className={`${styles.servicesPanel} ${styles.servicesPanelReverse}`}>
          <div className={styles.servicesImageWrap}>
            <Image src="/images/almacentercer.png" alt={t.servicesTitle} fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>

          <div className={styles.servicesCopy}>
            <p>{t.servicesIntro}</p>
            <h2>{t.servicesTitle}</h2>

            <div className={styles.accordion}>
              {secondServices.map(([title, description]: readonly [string, string]) => (
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


      <RelatedServices current="almacen-distribucion" locale={locale} />

      <Footer />
    </div>
  );
}
