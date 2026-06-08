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
    eyebrow: "TECHNOLOGY LOGISTICS",
    title: "Logística para tecnología con seguridad, trazabilidad y control operativo.",
    description:
      "Coordinamos operaciones nacionales e internacionales para equipos tecnológicos, electrónica, componentes sensibles, hardware, dispositivos y cadenas de suministro que requieren precisión, protección y visibilidad desde origen hasta destino.",
    primary: "Solicitar solución tecnológica",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN TECNOLÓGICA ESPECIALIZADA",
    blockTitle: "Logística segura para mercancías sensibles y de alto valor.",
    blockText:
      "Diseñamos soluciones para empresas tecnológicas integrando transporte, almacenaje, distribución, control documental, manipulación especializada, entregas urgentes y trazabilidad operativa.",

    servicesIntro:
      "Soluciones para empresas tecnológicas que necesitan mover mercancía sensible, electrónica o de alto valor con seguridad, velocidad y control.",
    servicesTitle: "Servicios logísticos para tecnología y equipos sensibles.",

    services: [
      [
        "Carga tecnológica sensible",
        "Transporte y coordinación para equipos electrónicos, hardware, dispositivos y componentes delicados.",
      ],
      [
        "Mercancía de alto valor",
        "Operaciones con protocolos de seguridad, trazabilidad, control documental y seguimiento operativo.",
      ],
      [
        "Distribución internacional",
        "Coordinación de entregas globales para fabricantes, distribuidores, integradores y operadores tecnológicos.",
      ],
      [
        "Gestión aduanera",
        "Control documental, clasificación y despacho para importación y exportación de productos tecnológicos.",
      ],
      [
        "Almacenamiento seguro",
        "Gestión de stock, preparación de pedidos y manipulación controlada para equipos sensibles.",
      ],
      [
        "Operaciones urgentes",
        "Soluciones rápidas para entregas críticas, lanzamientos, reposiciones estratégicas o proyectos tecnológicos.",
      ],
    ],

    ctaEyebrow: "TECNOLOGÍA",
    ctaTitle: "Planifique su operación tecnológica con un equipo especializado.",
    ctaText:
      "Analizamos tipo de producto, valor, volumen, origen, destino, nivel de sensibilidad, requisitos documentales y tiempos de entrega para construir una solución segura, eficiente y trazable.",
    ctaPrimary: "Evaluar operación tecnológica",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "TECHNOLOGY LOGISTICS",
    title: "Technology logistics with security, traceability and operational control.",
    description:
      "We coordinate domestic and international operations for technology equipment, electronics, sensitive components, hardware, devices and supply chains requiring precision, protection and visibility from origin to destination.",
    primary: "Request technology solution",
    secondary: "Talk to a specialist",

    blockEyebrow: "SPECIALIZED TECHNOLOGY OPERATIONS",
    blockTitle: "Secure logistics for sensitive and high-value cargo.",
    blockText:
      "We design solutions for technology companies by integrating transport, warehousing, distribution, documentation control, specialized handling, urgent deliveries and operational traceability.",

    servicesIntro:
      "Solutions for technology companies that need to move sensitive, electronic or high-value cargo with security, speed and control.",
    servicesTitle: "Logistics services for technology and sensitive equipment.",

    services: [
      [
        "Sensitive technology cargo",
        "Transport and coordination for electronics, hardware, devices and delicate components.",
      ],
      [
        "High-value cargo",
        "Operations with security protocols, traceability, documentation control and operational tracking.",
      ],
      [
        "International distribution",
        "Global delivery coordination for manufacturers, distributors, integrators and technology operators.",
      ],
      [
        "Customs management",
        "Documentation control, classification and clearance for imports and exports of technology products.",
      ],
      [
        "Secure warehousing",
        "Stock management, order preparation and controlled handling for sensitive equipment.",
      ],
      [
        "Urgent operations",
        "Fast solutions for critical deliveries, launches, strategic replenishment or technology projects.",
      ],
    ],

    ctaEyebrow: "TECHNOLOGY",
    ctaTitle: "Plan your technology operation with a specialized team.",
    ctaText:
      "We analyze product type, value, volume, origin, destination, sensitivity level, documentation requirements and delivery timing to build a secure, efficient and traceable solution.",
    ctaPrimary: "Evaluate technology operation",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "科技物流",
    title: "具备安全、可追溯性与运营控制的科技物流。",
    description:
      "我们为科技设备、电子产品、敏感组件、硬件、设备以及需要精准、防护和全程可视化的供应链协调国内与国际物流业务。",
    primary: "申请科技物流方案",
    secondary: "联系专家",

    blockEyebrow: "专业科技物流运营",
    blockTitle: "面向敏感与高价值货物的安全物流。",
    blockText:
      "我们为科技企业设计物流方案，整合运输、仓储、配送、文件控制、专业装卸、紧急交付和运营可追溯性。",

    servicesIntro:
      "为需要安全、速度和控制的科技企业提供敏感、电子或高价值货物物流方案。",
    servicesTitle: "面向科技产品与敏感设备的物流服务。",

    services: [
      [
        "敏感科技货物",
        "为电子设备、硬件、设备和精密组件提供运输与协调。",
      ],
      [
        "高价值货物",
        "具备安全协议、可追溯性、文件控制和运营跟踪的物流操作。",
      ],
      [
        "国际配送",
        "为制造商、分销商、集成商和科技运营商协调全球交付。",
      ],
      [
        "海关管理",
        "为科技产品进出口提供文件控制、归类和清关支持。",
      ],
      [
        "安全仓储",
        "为敏感设备提供库存管理、订单准备和受控操作。",
      ],
      [
        "紧急运输",
        "为关键交付、产品发布、战略补货或科技项目提供快速方案。",
      ],
    ],

    ctaEyebrow: "科技行业",
    ctaTitle: "与专业团队一起规划您的科技物流操作。",
    ctaText:
      "我们分析产品类型、价值、货量、始发地、目的地、敏感程度、文件要求和交付时效，为您构建安全、高效且可追溯的方案。",
    ctaPrimary: "评估科技物流操作",
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

export default function TecnologicoPage() {
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
          src="/images/sectores/transporte-logistica-tecnologia.png"
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
              src="/images/sectores/tecnologico.png"
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
