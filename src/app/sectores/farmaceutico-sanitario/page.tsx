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
    title: "Logística farmacéutica y sanitaria con trazabilidad, cumplimiento y control operativo.",
    description:
      "Coordinamos operaciones nacionales e internacionales para productos farmacéuticos, sanitarios, dispositivos médicos, material sensible y cadenas de suministro que requieren control documental, temperatura, seguridad y visibilidad desde origen hasta destino.",
    primary: "Solicitar solución farmacéutica",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN FARMACÉUTICA ESPECIALIZADA",
    blockTitle: "Logística segura para productos críticos y regulados.",
    blockText:
      "Diseñamos soluciones para el sector farmacéutico y sanitario integrando transporte, temperatura controlada, almacenaje, distribución, gestión documental, trazabilidad y cumplimiento normativo.",

    servicesIntro:
      "Soluciones para operaciones sanitarias que requieren precisión, documentación, control térmico, seguridad y seguimiento continuo.",
    servicesTitle: "Servicios logísticos para farmacéutico, sanitario y healthcare.",

    services: [
      [
        "Carga farmacéutica",
        "Gestión especializada para productos médicos, farmacéuticos y sanitarios con requisitos operativos y documentales específicos.",
      ],
      [
        "Temperatura controlada",
        "Coordinación de cadena de frío y rangos térmicos para mercancía sensible o regulada.",
      ],
      [
        "Dispositivos médicos",
        "Transporte y distribución de equipos sanitarios, dispositivos médicos y material clínico.",
      ],
      [
        "Cumplimiento documental",
        "Control de documentación, permisos, requisitos regulatorios y trazabilidad asociada a cada operación.",
      ],
      [
        "Trazabilidad operativa",
        "Seguimiento de mercancía crítica, visibilidad logística y control durante toda la cadena.",
      ],
      [
        "Operaciones urgentes",
        "Soluciones prioritarias para envíos sanitarios de alta criticidad, reposiciones o entregas sensibles.",
      ],
    ],

    ctaEyebrow: "FARMACÉUTICO Y SANITARIO",
    ctaTitle: "Planifique su operación sanitaria con un equipo especializado.",
    ctaText:
      "Analizamos tipo de producto, rango de temperatura, origen, destino, documentación, criticidad, normativa y tiempos de entrega para construir una solución segura, eficiente y trazable.",
    ctaPrimary: "Evaluar operación sanitaria",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "PHARMA & HEALTHCARE LOGISTICS",
    title: "Pharma and healthcare logistics with traceability, compliance and operational control.",
    description:
      "We coordinate domestic and international operations for pharmaceutical products, healthcare goods, medical devices, sensitive materials and supply chains requiring documentation control, temperature, security and visibility from origin to destination.",
    primary: "Request pharma solution",
    secondary: "Talk to a specialist",

    blockEyebrow: "SPECIALIZED PHARMA OPERATIONS",
    blockTitle: "Secure logistics for critical and regulated products.",
    blockText:
      "We design solutions for the pharmaceutical and healthcare sector by integrating transport, temperature control, warehousing, distribution, documentation management, traceability and regulatory compliance.",

    servicesIntro:
      "Solutions for healthcare operations requiring precision, documentation, thermal control, security and continuous tracking.",
    servicesTitle: "Logistics services for pharma, healthcare and medical supply chains.",

    services: [
      [
        "Pharmaceutical cargo",
        "Specialized management for medical, pharmaceutical and healthcare products with specific operational and documentation requirements.",
      ],
      [
        "Temperature control",
        "Cold chain and temperature range coordination for sensitive or regulated cargo.",
      ],
      [
        "Medical devices",
        "Transport and distribution of healthcare equipment, medical devices and clinical materials.",
      ],
      [
        "Documentation compliance",
        "Control of documents, permits, regulatory requirements and traceability associated with each operation.",
      ],
      [
        "Operational traceability",
        "Critical cargo tracking, logistics visibility and control throughout the full chain.",
      ],
      [
        "Urgent operations",
        "Priority solutions for highly critical healthcare shipments, replenishments or sensitive deliveries.",
      ],
    ],

    ctaEyebrow: "PHARMA & HEALTHCARE",
    ctaTitle: "Plan your healthcare operation with a specialized team.",
    ctaText:
      "We analyze product type, temperature range, origin, destination, documentation, criticality, regulations and delivery timing to build a safe, efficient and traceable solution.",
    ctaPrimary: "Evaluate healthcare operation",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "医药与医疗物流",
    title: "具备可追溯性、合规能力与运营控制的医药医疗物流。",
    description:
      "我们为药品、医疗产品、医疗器械、敏感材料以及需要文件控制、温度、安全和全程可视化的供应链协调国内与国际物流业务。",
    primary: "申请医药物流方案",
    secondary: "联系专家",

    blockEyebrow: "专业医药物流运营",
    blockTitle: "面向关键与受监管产品的安全物流。",
    blockText:
      "我们为医药与医疗行业设计物流方案，整合运输、温控、仓储、配送、文件管理、可追溯性和法规合规。",

    servicesIntro:
      "为需要精准、文件、温控、安全和持续跟踪的医疗物流业务打造解决方案。",
    servicesTitle: "面向医药、医疗和卫生供应链的物流服务。",

    services: [
      [
        "医药货运",
        "为医疗、医药与卫生产品提供专业管理，满足特定运营和文件要求。",
      ],
      [
        "温度控制",
        "为敏感或受监管货物协调冷链与温度范围控制。",
      ],
      [
        "医疗器械",
        "运输和配送医疗设备、医疗器械与临床材料。",
      ],
      [
        "文件合规",
        "控制文件、许可、监管要求以及每项操作相关的可追溯性。",
      ],
      [
        "运营追踪",
        "在整个链路中对关键货物进行跟踪、物流可视化和控制。",
      ],
      [
        "紧急运输",
        "为高关键性医疗货物、补货或敏感交付提供优先解决方案。",
      ],
    ],

    ctaEyebrow: "医药与医疗",
    ctaTitle: "与专业团队一起规划您的医疗物流操作。",
    ctaText:
      "我们分析产品类型、温度范围、始发地、目的地、文件、关键程度、法规和交付时效，为您构建安全、高效且可追溯的方案。",
    ctaPrimary: "评估医疗物流操作",
    ctaSecondary: "查看办公室",
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

export default function FarmaceuticoSanitarioPage() {
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
          src="/images/sectores/herofarmaceutico2.png"
          alt={t.title}
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
              src="/images/sectores/herofarmaseutico.png"
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

      <Footer />
    </div>
  );
}
