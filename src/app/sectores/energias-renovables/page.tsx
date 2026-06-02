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
    eyebrow: "RENEWABLE ENERGY LOGISTICS",
    title: "Logística para proyectos de energías renovables.",
    description:
      "Coordinamos transporte, manipulación y operaciones especiales para componentes de energía renovable, cargas industriales y proyectos de alta complejidad.",
    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN INDUSTRIAL ESPECIALIZADA",
    blockTitle: "Control operativo para proyectos que no pueden detenerse.",
    blockText:
      "Gestionamos componentes sobredimensionados, equipos sensibles y cargas críticas para parques solares, eólicos e infraestructuras energéticas, coordinando rutas, permisos, manipulación y entrega final.",
    servicesIntro:
      "Soluciones diseñadas para operaciones energéticas que requieren planificación, ingeniería logística y trazabilidad.",
    servicesTitle: "Servicios logísticos para energías renovables.",
    services: [
      ["Transporte de componentes eólicos", "Coordinación de palas, torres, nacelles y piezas sobredimensionadas."],
      ["Carga sobredimensionada", "Planificación de rutas, permisos y manipulación especializada."],
      ["Proyectos solares", "Transporte y distribución de paneles, inversores, estructuras y equipos sensibles."],
      ["Coordinación multimodal", "Integración de transporte marítimo, terrestre y operaciones especiales."],
      ["Gestión documental", "Control de permisos, documentación técnica y requerimientos operativos."],
      ["Entrega en obra", "Planificación de llegada, descarga y coordinación con equipos en sitio."],
    ],
    ctaEyebrow: "Cotización express",
    ctaTitle: "Planifiquemos su próxima operación renovable.",
    ctaText:
      "Analizamos tipo de componente, dimensiones, origen, destino y requerimientos de obra para construir una operación segura y viable.",
    ctaButton: "Solicitar propuesta →",
  },
  en: {
    eyebrow: "RENEWABLE ENERGY LOGISTICS",
    title: "Logistics for renewable energy projects.",
    description:
      "We coordinate transport, handling and special operations for renewable energy components, industrial cargo and highly complex projects.",
    primary: "Request quotation",
    secondary: "Talk to a specialist",
    blockEyebrow: "SPECIALIZED INDUSTRIAL OPERATIONS",
    blockTitle: "Operational control for projects that cannot stop.",
    blockText:
      "We manage oversized components, sensitive equipment and critical cargo for solar, wind and energy infrastructure projects, coordinating routes, permits, handling and final delivery.",
    servicesIntro:
      "Solutions designed for energy operations that require planning, logistics engineering and traceability.",
    servicesTitle: "Renewable energy logistics services.",
    services: [
      ["Wind component transport", "Coordination of blades, towers, nacelles and oversized parts."],
      ["Oversized cargo", "Route planning, permits and specialized handling."],
      ["Solar projects", "Transport and distribution of panels, inverters, structures and sensitive equipment."],
      ["Multimodal coordination", "Integration of ocean freight, road transport and special operations."],
      ["Documentation management", "Control of permits, technical documentation and operational requirements."],
      ["Site delivery", "Arrival planning, unloading and coordination with on-site teams."],
    ],
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s plan your next renewable energy operation.",
    ctaText:
      "We analyze component type, dimensions, origin, destination and site requirements to build a safe and viable operation.",
    ctaButton: "Request proposal →",
  },
  zh: {
    eyebrow: "可再生能源物流",
    title: "可再生能源项目物流解决方案。",
    description:
      "我们为可再生能源组件、工业货物和高复杂度项目协调运输、装卸与特殊物流操作。",
    primary: "申请报价",
    secondary: "联系专家",
    blockEyebrow: "专业工业物流运营",
    blockTitle: "为不能停滞的项目提供运营控制。",
    blockText:
      "我们管理太阳能、风能和能源基础设施项目中的超限部件、敏感设备和关键货物，协调路线、许可、装卸与最终交付。",
    servicesIntro:
      "为需要规划、物流工程和可追溯性的能源项目打造解决方案。",
    servicesTitle: "可再生能源物流服务。",
    services: [
      ["风电组件运输", "协调叶片、塔筒、机舱及超限部件运输。"],
      ["超限货物", "路线规划、许可办理与专业装卸。"],
      ["太阳能项目", "运输与配送面板、逆变器、结构件和敏感设备。"],
      ["多式联运协调", "整合海运、陆运和特殊物流操作。"],
      ["文件管理", "管理许可、技术文件和运营要求。"],
      ["现场交付", "到达计划、卸货以及与现场团队协调。"],
    ],
    ctaEyebrow: "快速报价",
    ctaTitle: "让我们规划您的下一次可再生能源物流业务。",
    ctaText:
      "我们分析组件类型、尺寸、起运地、目的地和现场要求，构建安全可行的运营方案。",
    ctaButton: "申请方案 →",
  },
} as const;

export default function EnergiasRenovablesPage() {
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
          src="/images/sectores/energiasrenovables.png"
          alt="Renewable energy logistics"
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
              src="/images/sectores/energiasrenovables.png"
              alt="Renewable logistics operation"
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
