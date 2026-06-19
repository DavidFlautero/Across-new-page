"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Recursos.module.css";
import empresaHeroStyles from "../empresa/Empresa.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    badge: "FAQ & RECURSOS",
    title: "Recursos logísticos para operar con más información, control y criterio.",
    text:
      "Acceda a contenidos, guías y materiales de Across Logistics diseñados para ayudar a empresas a tomar mejores decisiones en transporte internacional, aduanas, distribución y operaciones especiales.",
    primary: "Explorar recursos",
    secondary: "Hablar con un especialista",

    faqTitle: "Preguntas frecuentes",
    downloadsTitle: "Descargas",
    downloadsText:
      "Documentación útil para importadores, exportadores y equipos logísticos.",

    corporate: "Información corporativa",
    technical: "Información técnica",
    downloadPdf: "Descargar PDF ↓",
    viewResource: "Ver recurso →",

    contactTitle: "ASESORAMIENTO LOGÍSTICO",
    contactText:
      "Convierta la información en una operación mejor planificada.",
    contactDescription:
      "Si necesita aplicar estos recursos a una operación real, nuestro equipo puede ayudarle a evaluar origen, destino, tipo de mercancía, documentación, tiempos y mejor solución logística.",
    contactButton: "Hablar con un especialista →",

    regions: {
      europe: "Europa",
      asia: "Asia",
      middleEast: "Oriente Medio",
      usa: "EEUU",
    },

    faqs: [
      [
        "¿Qué es un DUA y para qué sirve?",
        "El DUA o Documento Único Administrativo es una declaración de importación o exportación ante las autoridades aduaneras. Aporta información sobre el producto, sirve de base para la declaración tributaria y debe acompañar la mercancía durante las formalidades aduaneras.",
      ],
      [
        "¿Qué tengo que hacer para realizar operaciones intracomunitarias?",
        "Las empresas deben inscribirse previamente en el Registro de Operadores Intracomunitarios, también conocido como censo VIES, para obtener un número especial de identificación fiscal válido para operaciones de IVA intracomunitario.",
      ],
      [
        "¿Cuál es el plazo para reexportar una mercancía en exportación temporal?",
        "El plazo inicial es de tres años, aunque puede ampliarse en circunstancias especiales. Las mercancías reintroducidas y declaradas dentro del plazo pueden quedar exentas de derechos de importación.",
      ],
      [
        "¿Cómo puedo comprobar la partida arancelaria de mi mercancía?",
        "La partida arancelaria puede comprobarse en la base de datos TARIC de la Unión Europea, validando clasificación, vigencia y requisitos aplicables.",
      ],
      [
        "¿Cómo funciona el seguro?",
        "El seguro de transporte cubre riesgos que puedan afectar a la mercancía o al medio de transporte. Su cálculo suele basarse en el valor de factura más parte del coste total del transporte.",
      ],
      [
        "¿Qué es el VGM?",
        "El VGM es el peso bruto verificado del contenedor, incluyendo mercancía, embalaje, estiba y tara. Debe declararse antes del embarque mediante pesaje certificado.",
      ],
      [
        "¿Qué son los WAIVERS?",
        "Son documentos obligatorios para exportar a determinados países, especialmente en África. Recogen datos del exportador, importador, mercancía, valor, contenedor, grupaje y ruta.",
      ],
      [
        "¿Cómo funcionan los Incoterms?",
        "Los Incoterms definen responsabilidades, costes y riesgos entre comprador y vendedor en operaciones internacionales.",
      ],
    ],

    resources: {
      corporate: [
        {
          title: "01- Catálogo corporativo",
          href: "/recursos/catalogo-corporativo-across.pdf",
          action: "Descargar PDF ↓",
          download: true,
        },
      ],
      technical: [
        {
          title: "01- ESP ZIP Codes",
          href: "/recursos/esp-zip-codes-across.pdf",
          action: "Descargar PDF ↓",
          download: true,
        },
        {
          title: "02- Medidas de contenedores",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores",
          action: "Ver recurso →",
        },
        {
          title: "03- Tipos de palés",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales",
          action: "Ver recurso →",
        },
        {
          title: "04- Capacidad de almacenamiento de palés",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales",
          action: "Ver recurso →",
        },
        {
          title: "05- Incoterms",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-incoterms",
          action: "Ver recurso →",
        },
      ],
    },
  },

  en: {
    badge: "FAQ & RESOURCES",
    title: "Logistics resources to operate with better information, control and criteria.",
    text:
      "Access Across Logistics content, guides and materials designed to help companies make better decisions in international transport, customs, distribution and special operations.",
    primary: "Explore resources",
    secondary: "Talk to a specialist",

    faqTitle: "Frequently asked questions",
    downloadsTitle: "Downloads",
    downloadsText:
      "Useful documentation for importers, exporters and logistics teams.",

    corporate: "Corporate information",
    technical: "Technical information",
    downloadPdf: "Download PDF ↓",
    viewResource: "View resource →",

    contactTitle: "LOGISTICS ADVISORY",
    contactText:
      "Turn information into a better planned operation.",
    contactDescription:
      "If you need to apply these resources to a real operation, our team can help you evaluate origin, destination, cargo type, documentation, timing and the best logistics solution.",
    contactButton: "Talk to a specialist →",

    regions: {
      europe: "Europe",
      asia: "Asia",
      middleEast: "Middle East",
      usa: "USA",
    },

    faqs: [
      [
        "What is a DUA and what is it used for?",
        "The DUA is an import or export declaration submitted to customs authorities. It provides product information, supports tax declaration and accompanies goods through customs formalities.",
      ],
      [
        "What do I need for intra-community operations?",
        "Companies must register in the Intra-Community Operators Register, also known as VIES, to obtain a valid VAT identification number.",
      ],
      [
        "What is the deadline to re-export goods under temporary export?",
        "The initial period is three years and may be extended under special circumstances.",
      ],
      [
        "How can I check my tariff classification?",
        "The tariff code can be checked in the European Union TARIC database to validate classification, validity and applicable requirements.",
      ],
      [
        "How does insurance work?",
        "Transport insurance covers risks affecting goods or the means of transport. It is usually calculated from the invoice value plus part of the transport cost.",
      ],
      [
        "What is VGM?",
        "VGM is the verified gross mass of the container, including goods, packaging, securing material and tare. It must be declared before shipment.",
      ],
      [
        "What are WAIVERS?",
        "They are mandatory documents for exporting to specific countries, especially in Africa, including shipper, consignee, cargo, value and routing details.",
      ],
      [
        "How do Incoterms work?",
        "Incoterms define responsibilities, costs and risk transfer between buyer and seller in international operations.",
      ],
    ],

    resources: {
      corporate: [
        {
          title: "01- Corporate catalogue",
          href: "/recursos/catalogo-corporativo-across.pdf",
          action: "Download PDF ↓",
          download: true,
        },
      ],
      technical: [
        {
          title: "01- ESP ZIP Codes",
          href: "/recursos/esp-zip-codes-across.pdf",
          action: "Download PDF ↓",
          download: true,
        },
        {
          title: "02- Container dimensions",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores",
          action: "View resource →",
        },
        {
          title: "03- Pallet types",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales",
          action: "View resource →",
        },
        {
          title: "04- Pallet storage capacity",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales",
          action: "View resource →",
        },
        {
          title: "05- Incoterms",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-incoterms",
          action: "View resource →",
        },
      ],
    },
  },

  zh: {
    badge: "常见问题与资源",
    title: "帮助企业以更多信息、控制力和判断力运营的物流资源。",
    text:
      "获取 Across Logistics 的内容、指南和资料，帮助企业在国际运输、海关、配送和特殊物流操作中做出更好的决策。",
    primary: "浏览资源",
    secondary: "联系专家",

    faqTitle: "常见问题",
    downloadsTitle: "下载资料",
    downloadsText:
      "为进口商、出口商和物流团队提供实用资料。",

    corporate: "企业信息",
    technical: "技术信息",
    downloadPdf: "下载 PDF ↓",
    viewResource: "查看资源 →",

    contactTitle: "物流咨询",
    contactText:
      "将信息转化为规划更好的物流操作。",
    contactDescription:
      "如果您需要将这些资源应用到实际业务中，我们的团队可以帮助您评估始发地、目的地、货物类型、文件、时效和最佳物流方案。",
    contactButton: "联系专家 →",

    regions: {
      europe: "欧洲",
      asia: "亚洲",
      middleEast: "中东",
      usa: "美国",
    },

    faqs: [
      [
        "什么是 DUA？",
        "DUA 是提交给海关的进出口申报文件，用于提供货物信息、支持税务申报并完成海关手续。",
      ],
      [
        "如何进行欧盟内部交易？",
        "企业需在欧盟内部运营商登记系统 VIES 中注册，以获得有效的增值税识别号码。",
      ],
      [
        "临时出口货物的再出口期限是多少？",
        "初始期限通常为三年，特殊情况下可延长。",
      ],
      [
        "如何查询商品关税编码？",
        "可通过欧盟 TARIC 数据库核查商品编码、有效性和相关要求。",
      ],
      [
        "运输保险如何运作？",
        "运输保险覆盖货物或运输工具可能面临的风险，通常按发票价值和部分运输成本计算。",
      ],
      [
        "什么是 VGM？",
        "VGM 是集装箱核实总重量，包括货物、包装、固定材料和箱体自重，装船前必须申报。",
      ],
      [
        "什么是 WAIVERS？",
        "WAIVER 是出口到部分国家，特别是非洲部分国家时所需的强制文件。",
      ],
      [
        "Incoterms 如何运作？",
        "Incoterms 定义国际交易中买卖双方的责任、费用和风险转移。",
      ],
    ],

    resources: {
      corporate: [
        {
          title: "01- 企业手册",
          href: "/recursos/catalogo-corporativo-across.pdf",
          action: "下载 PDF ↓",
          download: true,
        },
      ],
      technical: [
        {
          title: "01- ESP 邮编资料",
          href: "/recursos/esp-zip-codes-across.pdf",
          action: "下载 PDF ↓",
          download: true,
        },
        {
          title: "02- 集装箱尺寸",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores",
          action: "查看资源 →",
        },
        {
          title: "03- 托盘类型",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales",
          action: "查看资源 →",
        },
        {
          title: "04- 托盘仓储容量",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales",
          action: "查看资源 →",
        },
        {
          title: "05- Incoterms 国际贸易术语",
          href: "https://hubspot.acrosslogistics.com/es/landing-page-incoterms",
          action: "查看资源 →",
        },
      ],
    },
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

export default function RecursosPage() {
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

      <section
        className={empresaHeroStyles.hero}
        data-quienes-hero="true"
        data-aereo-hero="true"
        data-service-hero-home="true"
      >
        <Image
          src="/images/recursos1.png"
          alt="Across Logistics - Recursos"
          fill
          priority
          sizes="(max-width: 900px) 0px, 100vw"
          className={`${empresaHeroStyles.heroImage} ${empresaHeroStyles.heroImageDesktop}`}
        />

        <Image
          src="/images/recursos1.png"
          alt="Across Logistics - Recursos"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 0px"
          className={`${empresaHeroStyles.heroImage} ${empresaHeroStyles.heroImageMobile}`}
        />

        <div className={empresaHeroStyles.heroOverlay} />

        <div className={empresaHeroStyles.heroInner}>
          <div className={empresaHeroStyles.heroContent}>
            <span className={empresaHeroStyles.eyebrow}>{t.badge}</span>
            <h1>{t.title}</h1>
            <p>{t.text}</p>

            <div className={empresaHeroStyles.actions}>
              <Link href="#downloads">{t.primary}</Link>
              <Link href="/contacto">{t.secondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <main className={styles.content}>
        <section className={styles.faqSection}>
          <div className={styles.sectionHead}>
            <span>FAQ</span>
            <h2>{t.faqTitle}</h2>
          </div>

          <div className={styles.faqGrid}>
            {t.faqs.map(([q, a], index) => (
              <details key={q} className={styles.faqItem}>
                <summary>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <h3>{q}</h3>
                  <span>+</span>
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="downloads" className={styles.downloads}>
          <div className={styles.downloadImage}>
            <Image
              src="/images/recursos2.png"
              alt={t.downloadsTitle}
              fill
              className={styles.secondImage}
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>

          <div className={styles.downloadCopy}>
            <span>{t.downloadsTitle}</span>
            <h2>{t.downloadsText}</h2>

            <div className={styles.originalResources}>
              <div className={styles.resourceColumn}>
                <h3>{t.corporate}</h3>

                {t.resources.corporate.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    download={resource.download || undefined}
                  >
                    <span>{resource.title}</span>
                    <strong>{resource.action}</strong>
                  </a>
                ))}
              </div>

              <div className={styles.resourceColumn}>
                <h3>{t.technical}</h3>

                {t.resources.technical.map((resource) => (
                  <a
                    key={resource.title}
                    href={resource.href}
                    download={"download" in resource && resource.download ? true : undefined}
                    target={"download" in resource && resource.download ? undefined : "_blank"}
                    rel={"download" in resource && resource.download ? undefined : "noopener noreferrer"}
                  >
                    <span>{resource.title}</span>
                    <strong>{resource.action}</strong>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
</main>

      <Footer />
    </div>
  );
}
