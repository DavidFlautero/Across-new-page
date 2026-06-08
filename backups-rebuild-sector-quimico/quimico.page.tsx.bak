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
    eyebrow: "CHEMICAL LOGISTICS",
    title: "Logística química con seguridad, cumplimiento y control operativo.",
    description:
      "Coordinamos operaciones nacionales e internacionales para productos químicos, mercancías reguladas, carga peligrosa, materias primas y cadenas de suministro que requieren gestión documental, trazabilidad, seguridad y cumplimiento normativo.",
    primary: "Solicitar solución química",
    secondary: "Hablar con un especialista",

    blockEyebrow: "OPERACIÓN QUÍMICA ESPECIALIZADA",
    blockTitle: "Logística segura para mercancías reguladas y sensibles.",
    blockText:
      "Diseñamos soluciones para el sector químico integrando transporte, almacenamiento, gestión documental, mercancías peligrosas, control normativo, coordinación aduanera y trazabilidad operativa.",

    servicesIntro:
      "Soluciones para empresas químicas que necesitan mover mercancía regulada, sensible o peligrosa con seguridad, trazabilidad y cumplimiento.",
    servicesTitle: "Servicios logísticos para productos químicos y mercancías reguladas.",

    services: [
      [
        "Servicios de aduanas",
        "Gestión documental, clasificación, despacho y cumplimiento aduanero para importaciones y exportaciones de productos químicos.",
      ],
      [
        "Carga de temperatura controlada",
        "Transporte para productos refrigerados, congelados, perecederos o sensibles a condiciones térmicas específicas.",
      ],
      [
        "Cargas especiales e industriales",
        "Coordinación de operaciones complejas para mercancía industrial, sobredimensionada o de manipulación crítica.",
      ],
      [
        "Transporte aéreo",
        "Soluciones globales para envíos químicos donde el tiempo, la seguridad y el cumplimiento son prioritarios.",
      ],
      [
        "Transporte marítimo",
        "Operaciones marítimas para cargas químicas internacionales, FCL, LCL, IMO o proyectos especiales.",
      ],
      [
        "Almacén y distribución",
        "Soluciones de almacenamiento y distribución adaptadas a productos con requisitos técnicos o regulatorios.",
      ],
      [
        "Mercancías peligrosas",
        "Gestión especializada para cargas reguladas con protocolos de seguridad, documentación y trazabilidad.",
      ],
      [
        "Control documental",
        "Revisión de documentación técnica, permisos, fichas de seguridad y requisitos operativos para evitar bloqueos.",
      ],
    ],

    ctaEyebrow: "SECTOR QUÍMICO",
    ctaTitle: "Planifique su operación química con un equipo especializado.",
    ctaText:
      "Analizamos tipo de producto, clasificación, origen, destino, documentación, requisitos de seguridad, normativa aplicable y tiempos operativos para construir una solución segura, eficiente y trazable.",
    ctaPrimary: "Evaluar operación química",
    ctaSecondary: "Ver oficinas",
  },

  en: {
    eyebrow: "CHEMICAL LOGISTICS",
    title: "Chemical logistics with safety, compliance and operational control.",
    description:
      "We coordinate domestic and international operations for chemical products, regulated goods, dangerous cargo, raw materials and supply chains requiring documentation management, traceability, safety and regulatory compliance.",
    primary: "Request chemical solution",
    secondary: "Talk to a specialist",

    blockEyebrow: "SPECIALIZED CHEMICAL OPERATIONS",
    blockTitle: "Secure logistics for regulated and sensitive goods.",
    blockText:
      "We design solutions for the chemical sector by integrating transport, warehousing, documentation management, dangerous goods, regulatory control, customs coordination and operational traceability.",

    servicesIntro:
      "Solutions for chemical companies that need to move regulated, sensitive or dangerous cargo with safety, traceability and compliance.",
    servicesTitle: "Logistics services for chemical products and regulated goods.",

    services: [
      [
        "Customs services",
        "Documentation management, classification, clearance and customs compliance for chemical imports and exports.",
      ],
      [
        "Temperature-controlled cargo",
        "Transport for refrigerated, frozen, perishable or temperature-sensitive products under specific conditions.",
      ],
      [
        "Special and industrial cargo",
        "Coordination of complex operations for industrial, oversized or critical-handling cargo.",
      ],
      [
        "Air freight",
        "Global solutions for chemical shipments where time, safety and compliance are priorities.",
      ],
      [
        "Ocean freight",
        "Ocean freight operations for international chemical cargo, FCL, LCL, IMO or special projects.",
      ],
      [
        "Warehousing and distribution",
        "Storage and distribution solutions adapted to products with technical or regulatory requirements.",
      ],
      [
        "Dangerous goods",
        "Specialized management for regulated cargo with safety protocols, documentation and traceability.",
      ],
      [
        "Documentation control",
        "Review of technical documentation, permits, safety data sheets and operational requirements to avoid delays.",
      ],
    ],

    ctaEyebrow: "CHEMICAL SECTOR",
    ctaTitle: "Plan your chemical operation with a specialized team.",
    ctaText:
      "We analyze product type, classification, origin, destination, documentation, safety requirements, applicable regulations and operational timing to build a safe, efficient and traceable solution.",
    ctaPrimary: "Evaluate chemical operation",
    ctaSecondary: "View offices",
  },

  zh: {
    eyebrow: "化工物流",
    title: "具备安全、合规与运营控制的化工物流。",
    description:
      "我们为化工产品、受监管货物、危险品、原材料以及需要文件管理、可追溯性、安全和法规合规的供应链协调国内与国际物流业务。",
    primary: "申请化工物流方案",
    secondary: "联系专家",

    blockEyebrow: "专业化工物流运营",
    blockTitle: "面向受监管与敏感货物的安全物流。",
    blockText:
      "我们为化工行业设计物流方案，整合运输、仓储、文件管理、危险品、法规控制、海关协调和运营可追溯性。",

    servicesIntro:
      "为需要安全、可追溯性和合规运输监管类、敏感类或危险类货物的化工企业提供解决方案。",
    servicesTitle: "面向化工产品与受监管货物的物流服务。",

    services: [
      [
        "海关服务",
        "为化工产品进出口提供文件管理、归类、清关和海关合规支持。",
      ],
      [
        "温控货运",
        "在特定条件下运输冷藏、冷冻、易腐或温度敏感产品。",
      ],
      [
        "特殊与工业货物",
        "协调工业、超限或关键操作货物的复杂物流业务。",
      ],
      [
        "空运",
        "为时间、安全和合规优先的化工货物提供全球运输方案。",
      ],
      [
        "海运",
        "面向国际化工货物、FCL、LCL、IMO 或特殊项目的海运操作。",
      ],
      [
        "仓储与配送",
        "为具有技术或法规要求的产品提供仓储与配送解决方案。",
      ],
      [
        "危险品",
        "按照安全协议、文件要求和可追溯性管理受监管货物。",
      ],
      [
        "文件控制",
        "审查技术文件、许可、安全数据表和操作要求，避免延误。",
      ],
    ],

    ctaEyebrow: "化工行业",
    ctaTitle: "与专业团队一起规划您的化工物流操作。",
    ctaText:
      "我们分析产品类型、分类、始发地、目的地、文件、安全要求、适用法规和操作时效，为您构建安全、高效且可追溯的方案。",
    ctaPrimary: "评估化工物流操作",
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

export default function QuimicoPage() {
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
          src="/images/sectores/quimicohero.png"
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
              src="/images/sectores/quimico2.png"
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
