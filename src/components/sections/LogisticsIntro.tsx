"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { locales, type Locale } from "@/i18n/across";
import styles from "./LogisticsIntro.module.css";

const LOCALE_KEY = "across-locale";

const copy = {
  es: {
    eyebrow: "Across Logistics",
    title: "Soluciones logísticas\ninternacionales",
    body1:
      "Diseñamos y gestionamos cadenas de suministro globales con altos estándares de confiabilidad, eficiencia y control operativo para empresas con operaciones internacionales.",
    body2:
      "Integramos transporte, aduanas, almacenamiento, distribución y trazabilidad para reducir fricción operativa y mantener control total de punta a punta.",
    quoteSmall: "Solicite su presupuesto",
    quoteTitle: "Solicitar Propuesta Comercial",
    items: [
      ["Transporte Multimodal", "Soluciones integrales de transporte aéreo, marítimo y terrestre con coordinación operativa de principio a fin."],
      ["Gestión Aduanera y Cumplimiento Normativo", "Procesos aduaneros eficientes, cumplimiento regulatorio y optimización documental para operaciones internacionales."],
      ["Almacenamiento y Distribución Estratégica", "Infraestructura logística diseñada para almacenamiento, preparación de pedidos y distribución nacional e internacional."],
      ["Cadena de Frío y Cargas Especiales", "Gestión especializada de mercancías sensibles, cargas de alto valor y operaciones complejas bajo estrictos controles operativos."],
      ["Trazabilidad y Control Operativo en Tiempo Real", "Herramientas de monitoreo y visibilidad para garantizar control total de cada operación logística."],
    ],
  },
  en: {
    eyebrow: "Across Logistics",
    title: "Integrated logistics for demanding operations",
    body1:
      "We coordinate transport, customs, warehousing and distribution with operational precision and international reach.",
    body2:
      "Every movement is designed to reduce friction, protect cargo and maintain end-to-end control.",
    quoteSmall: "Request your quote",
    quoteTitle: "Online Express Quote",
    items: [
      ["Tailored solutions", "Operations designed around cargo, destination, urgency and criticality."],
      ["Client integration", "Clear communication, operational tracking and continuous support."],
      ["Control and improvement", "Optimization of timing, routes, documentation and providers."],
      ["Critical shipments", "Agile response for operations where every hour matters."],
      ["International network", "Strategic partners for transport, customs, warehousing and distribution."],
    ],
  },
  zh: {
    eyebrow: "Across Logistics",
    title: "面向高要求业务的一体化物流",
    body1: "我们以国际化能力协调运输、清关、仓储与配送，确保精准执行。",
    body2: "每一次运输都围绕降低摩擦、保护货物与端到端控制进行设计。",
    quoteSmall: "申请报价",
    quoteTitle: "在线快速报价",
    items: [
      ["定制解决方案", "根据货物、目的地、时效与关键程度设计运营方案。"],
      ["客户协同", "清晰沟通、运营跟踪与持续支持。"],
      ["管控与优化", "优化时效、路线、文件与供应商。"],
      ["关键运输", "为每小时都重要的业务提供快速响应。"],
      ["国际网络", "覆盖运输、清关、仓储与配送的战略伙伴网络。"],
    ],
  },
} as const;

export default function LogisticsIntro() {
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
    <section className={styles.section}>
      <div className={styles.left}>
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.body1}</p>
        <p>{t.body2}</p>

        <div className={styles.imagePanel} />
      </div>

      <div className={styles.right}>
        <div className={styles.accordion}>
          {t.items.map(([title, text], index) => (
            <details key={title} open={index === 0}>
              <summary>
                <strong>{title}</strong>
                <span>+</span>
              </summary>
              <p>{text}</p>
            </details>
          ))}
        </div>

        <Link href="/cotizacion" className={styles.quoteCard}>
          <b>+</b>
          <div>
            <small>{t.quoteSmall}</small>
            <strong>{t.quoteTitle}</strong>
          </div>
        </Link>
      </div>
    </section>
  );
}
