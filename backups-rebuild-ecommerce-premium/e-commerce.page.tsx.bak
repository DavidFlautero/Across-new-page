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
    eyebrow: "E-COMMERCE LOGISTICS",
    heroTitle: "Logística e-commerce para operaciones digitales escalables.",
    heroText:
      "Integramos almacenaje, preparación de pedidos, control de inventario, distribución, última milla y soluciones de valor añadido para marcas que necesitan operar con rapidez, trazabilidad y eficiencia.",
    quote: "Solicitar solución e-commerce",
    specialist: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN E-COMMERCE INTEGRADA",
    blockTitle: "Del pedido online a la entrega final, con control y trazabilidad.",
    blockText:
      "Diseñamos operaciones logísticas para e-commerce conectando stock, picking, packing, preparación de pedidos, distribución y seguimiento para mejorar tiempos, reducir errores y escalar ventas.",

    servicesIntro:
      "Conectamos sistemas, inventario, pedidos, preparación y transporte para que cada venta online avance con control operativo y visibilidad.",
    servicesTitle: "Servicios logísticos para e-commerce y fulfillment.",

    ctaEyebrow: "LOGÍSTICA PARA E-COMMERCE",
    ctaTitle: "Escalemos su operación digital con un equipo especializado.",
    ctaText:
      "Analizamos volumen de pedidos, rotación, canales de venta, necesidades de almacenaje, preparación, distribución y última milla para construir una solución eficiente y escalable.",
    ctaPrimary: "Evaluar operación e-commerce",
    ctaSecondary: "Ver oficinas",

    services: [
      [
        "Software de gestión de almacenes (SGA)",
        "Tecnología para controlar, coordinar y optimizar movimientos, procesos y operativas de almacén.",
      ],
      [
        "Integración perfecta entre sistemas",
        "Conexión en tiempo real con CMS como Shopify o WooCommerce, ERP, transportistas y sistemas clave del negocio.",
      ],
      [
        "Gestión 360 de su negocio e-Commerce",
        "Coordinación del negocio desde origen, pedidos, fábrica del proveedor, almacenes y distribución final.",
      ],
      [
        "Informes periódicos de KPI",
        "Cuadros de mando para seguir indicadores clave, rendimiento operativo y evolución del negocio.",
      ],
      [
        "Mejora continua de procesos",
        "Análisis permanente para eliminar fricción, optimizar costes y reducir tiempos de preparación.",
      ],
      [
        "Last Mile Delivery",
        "Gestión de última milla para reducir costes y tiempos de entrega en España, Portugal y Europa Occidental.",
      ],
    ],
  },

  en: {
    eyebrow: "E-COMMERCE LOGISTICS",
    heroTitle: "E-commerce logistics for scalable digital operations.",
    heroText:
      "We integrate warehousing, order preparation, inventory control, distribution, last mile and value-added solutions for brands that need speed, traceability and operational efficiency.",
    quote: "Request e-commerce solution",
    specialist: "Talk to a specialist",

    blockEyebrow: "INTEGRATED E-COMMERCE OPERATIONS",
    blockTitle: "From online order to final delivery, with control and traceability.",
    blockText:
      "We design logistics operations for e-commerce by connecting stock, picking, packing, order preparation, distribution and tracking to improve times, reduce errors and scale sales.",

    servicesIntro:
      "We connect systems, inventory, orders, preparation and transport so every online sale moves forward with operational control and visibility.",
    servicesTitle: "Logistics services for e-commerce and fulfillment.",

    ctaEyebrow: "E-COMMERCE LOGISTICS",
    ctaTitle: "Scale your digital operation with a specialized team.",
    ctaText:
      "We analyze order volume, rotation, sales channels, warehousing needs, preparation, distribution and last mile requirements to build an efficient and scalable solution.",
    ctaPrimary: "Evaluate e-commerce operation",
    ctaSecondary: "View offices",

    services: [
      [
        "Warehouse Management System (WMS)",
        "Technology to control, coordinate and optimize warehouse movements, processes and operations.",
      ],
      [
        "Seamless systems integration",
        "Real-time connection with CMS platforms such as Shopify or WooCommerce, ERP, carriers and key business systems.",
      ],
      [
        "360º e-commerce business management",
        "Business coordination from origin, orders, supplier factory, warehouses and final distribution.",
      ],
      [
        "Periodic KPI reports",
        "Dashboards to monitor key indicators, operational performance and business evolution.",
      ],
      [
        "Continuous process improvement",
        "Permanent analysis to remove friction, optimize costs and reduce order preparation times.",
      ],
      [
        "Last Mile Delivery",
        "Last-mile management to reduce delivery costs and transit times in Spain, Portugal and Western Europe.",
      ],
    ],
  },

  zh: {
    eyebrow: "电商物流",
    heroTitle: "面向可扩展数字业务的电商物流解决方案。",
    heroText:
      "我们整合仓储、订单准备、库存控制、配送、最后一公里和增值服务，帮助品牌实现快速、可追溯且高效的运营。",
    quote: "申请电商物流方案",
    specialist: "联系专家",

    blockEyebrow: "综合电商物流运营",
    blockTitle: "从线上订单到最终交付，实现控制与可追溯。",
    blockText:
      "我们为电商设计物流操作，连接库存、拣货、包装、订单准备、配送和跟踪，以缩短时间、减少错误并支持销售增长。",

    servicesIntro:
      "我们连接系统、库存、订单、准备和运输，让每一笔线上销售都具备运营控制和可视化能力。",
    servicesTitle: "电商与履约物流服务。",

    ctaEyebrow: "电商物流",
    ctaTitle: "与专业团队一起扩展您的数字业务运营。",
    ctaText:
      "我们分析订单量、周转率、销售渠道、仓储需求、订单准备、配送和最后一公里要求，为您构建高效且可扩展的方案。",
    ctaPrimary: "评估电商运营",
    ctaSecondary: "查看办公室",

    services: [
      [
        "仓库管理系统（WMS）",
        "用于控制、协调与优化仓库移动、流程和运营的技术系统。",
      ],
      [
        "系统无缝集成",
        "与 Shopify、WooCommerce 等 CMS、ERP、承运商及关键业务系统实时连接。",
      ],
      [
        "360° 电商业务管理",
        "从源头、订单、供应商工厂、仓库到最终配送的业务协调。",
      ],
      [
        "定期 KPI 报告",
        "通过仪表盘监控关键指标、运营表现与业务发展。",
      ],
      [
        "持续流程改进",
        "持续分析流程，减少摩擦、优化成本并缩短订单准备时间。",
      ],
      [
        "最后一公里配送",
        "管理末端配送，降低西班牙、葡萄牙及西欧地区的配送成本与时间。",
      ],
    ],
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

export default function EcommercePage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
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

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/heroecommerce.png"
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
              {t.services.map(([title, description]: readonly [string, string]) => (
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
              src="/images/segundaecommerce.png"
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


      <RelatedServices current="e-commerce" locale={locale} />

      <Footer />
    </div>
  );
}
