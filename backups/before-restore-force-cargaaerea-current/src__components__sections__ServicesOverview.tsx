"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/across";
import styles from "./ServicesOverview.module.css";

const LOCALE_KEY = "across-locale";

const copy = {
  es: {
    eyebrow: "Servicios",
    title: "Soluciones Logísticas para Operaciones Críticas",
    description:
      "Integramos transporte, almacenamiento, aduanas, fulfillment y distribución para empresas que operan a escala nacional e internacional.",
    cta: "Explorar solución →",
    services: [
      {
        eyebrow: "AIR FREIGHT",
        title: "Transporte Aéreo",
        text: "Carga aérea prioritaria para envíos críticos.",
        href: "/servicios/transporte-aereo",
        image: "/images/transporte-maritimo-desktop/1.png",
      },
      {
        eyebrow: "OCEAN FREIGHT",
        title: "Transporte Marítimo",
        text: "Gestión global de cargas de gran escala.",
        href: "/servicios/transporte-maritimo",
        image: "/images/transportemaritimo.png",
      },
      {
        eyebrow: "SPECIAL CARGO",
        title: "Cargas Especiales",
        text: "Soluciones especializadas para operaciones complejas.",
        href: "/servicios/cargas-especiales",
        image: "/images/cargaspecial.png",
      },
      {
        eyebrow: "COLD CHAIN",
        title: "Temperatura Controlada",
        text: "Control térmico integral para productos sensibles.",
        href: "/servicios/temperatura-controlada",
        image: "/images/controltemp.png",
      },
      {
        eyebrow: "WAREHOUSE",
        title: "Almacén y Distribución",
        text: "Infraestructura logística estratégica.",
        href: "/servicios/almacen-distribucion",
        image: "/images/almacen.png",
      },
      {
        eyebrow: "CUSTOMS",
        title: "Servicios de Aduanas",
        text: "Cumplimiento normativo sin interrupciones.",
        href: "/servicios/aduanas",
        image: "/images/caduana.png",
      },
      {
        eyebrow: "COMMERCE",
        title: "e-Commerce",
        text: "Logística escalable para el comercio digital.",
        href: "/servicios/e-commerce",
        image: "/images/ecommerce.png",
      },
    ],
  },
  en: {
    eyebrow: "Services",
    title: "Logistics solutions for operations that demand precision.",
    description:
      "We integrate transport, warehousing, customs, fulfillment and distribution for companies operating nationally and internationally.",
    cta: "View service →",
    services: [
      {
        eyebrow: "AIR FREIGHT",
        title: "Air Freight",
        text: "Air solutions for urgent, sensitive and high-value cargo.",
        href: "/servicios/transporte-aereo",
        image: "/images/transporte-maritimo-desktop/1.png",
      },
      {
        eyebrow: "OCEAN FREIGHT",
        title: "Ocean Freight",
        text: "International ocean operations for FCL, LCL and global projects.",
        href: "/servicios/transporte-maritimo",
        image: "/images/transportemaritimo.png",
      },
      {
        eyebrow: "SPECIAL CARGO",
        title: "Special Cargo",
        text: "Specialized handling for oversized goods and complex operations.",
        href: "/servicios/cargas-especiales",
        image: "/images/cargaspecial.png",
      },
      {
        eyebrow: "COLD CHAIN",
        title: "Temperature Controlled",
        text: "Cold chain for pharmaceutical, perishable and sensitive goods.",
        href: "/servicios/temperatura-controlada",
        image: "/images/controltemp.png",
      },
      {
        eyebrow: "WAREHOUSE",
        title: "Warehousing & Distribution",
        text: "Flexible infrastructure for storage, inventory and distribution.",
        href: "/servicios/almacen-distribucion",
        image: "/images/almacen.png",
      },
      {
        eyebrow: "CUSTOMS",
        title: "Customs Services",
        text: "Documentation, fiscal, tax and authority coordination.",
        href: "/servicios/aduanas",
        image: "/images/caduana.png",
      },
      {
        eyebrow: "COMMERCE",
        title: "e-Commerce",
        text: "Fulfillment, order preparation, digital integration and distribution.",
        href: "/servicios/e-commerce",
        image: "/images/ecommerce.png",
      },
    ],
  },
  zh: {
    eyebrow: "服务",
    title: "为高精度运营打造的物流解决方案。",
    description:
      "我们整合运输、仓储、清关、履约与配送，服务于国内与国际业务运营企业。",
    cta: "查看服务 →",
    services: [
      {
        eyebrow: "AIR FREIGHT",
        title: "空运",
        text: "面向紧急、敏感与高价值货物的空运解决方案。",
        href: "/servicios/transporte-aereo",
        image: "/images/transporte-maritimo-desktop/1.png",
      },
      {
        eyebrow: "OCEAN FREIGHT",
        title: "海运",
        text: "面向 FCL、LCL 与全球项目的国际海运业务。",
        href: "/servicios/transporte-maritimo",
        image: "/images/transportemaritimo.png",
      },
      {
        eyebrow: "SPECIAL CARGO",
        title: "特殊货物",
        text: "为超尺寸货物和复杂业务提供专业处理。",
        href: "/servicios/cargas-especiales",
        image: "/images/cargaspecial.png",
      },
      {
        eyebrow: "COLD CHAIN",
        title: "温控运输",
        text: "服务于药品、易腐品与敏感货物的冷链物流。",
        href: "/servicios/temperatura-controlada",
        image: "/images/controltemp.png",
      },
      {
        eyebrow: "WAREHOUSE",
        title: "仓储与配送",
        text: "面向存储、库存与配送的灵活基础设施。",
        href: "/servicios/almacen-distribucion",
        image: "/images/almacen.png",
      },
      {
        eyebrow: "CUSTOMS",
        title: "清关服务",
        text: "文件、税务、合规与海关协调管理。",
        href: "/servicios/aduanas",
        image: "/images/caduana.png",
      },
      {
        eyebrow: "COMMERCE",
        title: "电子商务物流",
        text: "履约、订单准备、数字集成与配送。",
        href: "/servicios/e-commerce",
        image: "/images/ecommerce.png",
      },
    ],
  },
} as const;

export default function ServicesOverview() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (saved && saved in locales) setLocale(saved);

    const onChange = (event: Event) => {
      setLocale((event as CustomEvent<Locale>).detail);
    };

    window.addEventListener("across-locale-change", onChange);
    return () => window.removeEventListener("across-locale-change", onChange);
  }, []);

  const t = copy[locale];

  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.header}>
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.description}</p>
      </div>

      <div className={styles.grid}>
        {t.services.map((service, index) => (
          <Link
            href={service.href}
            key={service.title}
            className={`${styles.card} ${index === 0 ? styles.featured : ""}`}
          >
            <img src={service.image} alt={service.title} />
            <div className={styles.overlay} />
            <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>

            <div className={styles.content}>
              <span>{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <b>{t.cta}</b>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
