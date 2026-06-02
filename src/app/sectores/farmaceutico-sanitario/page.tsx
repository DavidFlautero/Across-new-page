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
    eyebrow: "PHARMA & HEALTHCARE LOGISTICS",
    title: "Logística farmacéutica y sanitaria con control crítico.",
    description: "Coordinamos mercancía farmacéutica, sanitaria y sensible con trazabilidad, cumplimiento, control térmico y máxima seguridad operativa.",
    primary: "Solicitar cotización",
    secondary: "Hablar con un especialista",
    blockEyebrow: "OPERACIÓN SANITARIA INTERNACIONAL",
    blockTitle: "Cumplimiento, temperatura y trazabilidad para carga sanitaria.",
    blockText: "Gestionamos productos farmacéuticos, dispositivos médicos, material sanitario y mercancía sensible bajo procesos diseñados para proteger integridad, tiempos y cumplimiento regulatorio.",
    servicesIntro: "Soluciones para operaciones sanitarias que requieren precisión, documentación, seguridad y control continuo.",
    servicesTitle: "Servicios logísticos para farmacéutico y sanitario.",
    services: [
      ["Carga farmacéutica", "Gestión especializada para productos médicos, farmacéuticos y sanitarios."],
      ["Temperatura controlada", "Coordinación de cadena de frío para mercancía sensible."],
      ["Dispositivos médicos", "Transporte y distribución de equipos sanitarios y material clínico."],
      ["Cumplimiento documental", "Control de documentación, permisos y requisitos regulatorios."],
      ["Trazabilidad operativa", "Seguimiento de mercancía crítica durante toda la operación."],
      ["Operaciones urgentes", "Soluciones prioritarias para envíos sanitarios de alta criticidad."]
    ],
    ctaEyebrow: "Cotización express",
    ctaTitle: "Coordinemos su operación sanitaria con máxima seguridad.",
    ctaText: "Analizamos producto, temperatura, urgencia, documentación y destino para diseñar una operación sanitaria segura y viable.",
    ctaButton: "Solicitar propuesta →"
  },
  en: {
    eyebrow: "PHARMA & HEALTHCARE LOGISTICS",
    title: "Pharmaceutical and healthcare logistics with critical control.",
    description: "We coordinate pharmaceutical, healthcare and sensitive cargo with traceability, compliance, thermal control and maximum operational security.",
    primary: "Request quotation",
    secondary: "Talk to a specialist",
    blockEyebrow: "INTERNATIONAL HEALTHCARE OPERATIONS",
    blockTitle: "Compliance, temperature and traceability for healthcare cargo.",
    blockText: "We manage pharmaceutical products, medical devices, healthcare materials and sensitive cargo through processes designed to protect integrity, timing and regulatory compliance.",
    servicesIntro: "Solutions for healthcare operations requiring precision, documentation, security and continuous control.",
    servicesTitle: "Pharma and healthcare logistics services.",
    services: [
      ["Pharmaceutical cargo", "Specialized management for medical, pharmaceutical and healthcare products."],
      ["Temperature control", "Cold chain coordination for sensitive cargo."],
      ["Medical devices", "Transport and distribution of healthcare equipment and clinical materials."],
      ["Documentation compliance", "Control of documents, permits and regulatory requirements."],
      ["Operational traceability", "Critical cargo tracking throughout the full operation."],
      ["Urgent operations", "Priority solutions for highly critical healthcare shipments."]
    ],
    ctaEyebrow: "Express quotation",
    ctaTitle: "Let’s coordinate your healthcare operation with maximum security.",
    ctaText: "We analyze product, temperature, urgency, documentation and destination to design a safe and viable healthcare operation.",
    ctaButton: "Request proposal →"
  },
  zh: {
    eyebrow: "医药与医疗物流",
    title: "具备关键控制能力的医药与医疗物流。",
    description: "我们为医药、医疗和敏感货物提供可追踪、合规、温控与高安全标准的物流协调。",
    primary: "申请报价",
    secondary: "联系专家",
    blockEyebrow: "国际医疗物流运营",
    blockTitle: "为医疗货物提供合规、温控与追踪能力。",
    blockText: "我们管理药品、医疗器械、医疗材料和敏感货物，通过专业流程保障完整性、时效与法规合规。",
    servicesIntro: "为需要精度、文件、安全与持续控制的医疗物流业务设计方案。",
    servicesTitle: "医药与医疗物流服务。",
    services: [
      ["医药货运", "医药、医疗与卫生产品的专业管理。"],
      ["温度控制", "敏感货物的冷链协调。"],
      ["医疗器械", "医疗设备与临床材料的运输配送。"],
      ["文件合规", "文件、许可与监管要求控制。"],
      ["运营追踪", "关键货物全流程追踪。"],
      ["紧急运输", "高关键性医疗货物的优先物流方案。"]
    ],
    ctaEyebrow: "快速报价",
    ctaTitle: "以最高安全标准协调您的医疗物流业务。",
    ctaText: "我们分析产品、温度、紧急程度、文件与目的地，设计安全可行的医疗物流方案。",
    ctaButton: "申请方案 →"
  }
} as const;

export default function FarmaceuticoSanitarioPage() {
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
        <Image src="/images/sectores/herofarmaceutico2.png" alt="Pharma healthcare logistics" fill priority className={styles.heroImage} sizes="100vw" />
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
            <Image src="/images/sectores/herofarmaseutico.png" alt="Healthcare logistics operation" fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
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
