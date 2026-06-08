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
    eyebrow: "E-COMMERCE LOGISTICS",
    heroTitle: "Logística y almacén para e-commerce con gestión total.",
    heroText:
      "Conectamos almacenamiento, stock, pedidos, preparación y entrega para que su tienda online venda más rápido, reduzca costes y opere sin fricción.",
    quote: "Solicitar cotización",
    specialist: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN E-COMMERCE",
    blockTitle: "Deje en nuestras manos la gestión del stock y la entrega.",
    blockText:
      "Nos conectamos con su e-commerce y su ERP para gestionar pedidos de forma rápida y eficiente, coordinando inventario, preparación, distribución y última milla desde un mismo sistema operativo.",
    servicesIntro:
      "Escalamos su operación digital con tecnología, integración entre sistemas y procesos logísticos diseñados para vender mejor.",
    servicesTitle: "Nuestros servicios de gestión para e-Commerce.",
    ctaEyebrow: "Cotización express",
    ctaTitle: "Construyamos una operación e-commerce más rápida y rentable.",
    ctaText:
      "Analizamos plataforma, volumen de pedidos, stock, destino y tiempos de entrega para diseñar una solución clara, integrada y escalable.",
    ctaButton: "Solicitar propuesta →",
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
    heroTitle: "E-commerce warehousing and logistics with full management.",
    heroText:
      "We connect storage, stock, orders, preparation and delivery so your online store can sell faster, reduce costs and operate without friction.",
    quote: "Request quotation",
    specialist: "Talk to a specialist",
    blockEyebrow: "E-COMMERCE OPERATIONS",
    blockTitle: "Leave stock management and delivery in our hands.",
    blockText:
      "We connect with your e-commerce and ERP to manage orders quickly and efficiently, coordinating inventory, preparation, distribution and last mile from one operating system.",
    servicesIntro:
      "We scale your digital operation with technology, system integration and logistics processes designed to help you sell better.",
    servicesTitle: "Our e-commerce management services.",
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s build a faster and more profitable e-commerce operation.",
    ctaText:
      "We analyze platform, order volume, stock, destination and delivery times to design a clear, integrated and scalable solution.",
    ctaButton: "Request proposal →",
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
    heroTitle: "提供全流程管理的电商仓储与物流方案。",
    heroText:
      "我们连接仓储、库存、订单、备货与配送，帮助您的线上商店更快销售、降低成本并顺畅运营。",
    quote: "申请报价",
    specialist: "联系专家",
    blockEyebrow: "电商运营",
    blockTitle: "将库存管理与配送交给我们。",
    blockText:
      "我们可连接您的电商平台与 ERP，高效管理订单，并在同一运营体系下协调库存、备货、配送与最后一公里。",
    servicesIntro:
      "我们通过技术、系统集成与专业物流流程，帮助您的数字业务实现规模化增长。",
    servicesTitle: "我们的电商管理服务。",
    ctaEyebrow: "快速报价",
    ctaTitle: "让我们打造更快、更高效的电商物流运营。",
    ctaText:
      "我们会分析平台、订单量、库存、目的地与交付时效，设计清晰、集成且可扩展的解决方案。",
    ctaButton: "申请方案 →",
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

export default function EcommercePage() {
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
          src="/images/heroecommerce.png"
          alt="Logística e-commerce"
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
              src="/images/segundaecommerce.png"
              alt="Operación e-commerce"
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
