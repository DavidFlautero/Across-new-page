"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Recursos.module.css";
import aereoStyles from "../servicios/transporte-aereo/TransporteAereo.module.css";
import heroStyles from "../empresa/quienes-somos/QuienesSomos.module.css";

type Locale = "es" | "en" | "zh";


type ResourceIconName = "faq" | "download" | "contact" | "guide";

function ResourceIcon({ name }: { name: ResourceIconName }) {
  if (name === "faq") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 18h.01" />
        <path d="M9.2 9.1a3 3 0 1 1 4.9 2.3c-1.2.8-2.1 1.5-2.1 3.1" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v10" />
        <path d="m8 10 4 4 4-4" />
        <path d="M5 17v3h14v-3" />
        <path d="M7 4h10" />
      </svg>
    );
  }

  if (name === "contact") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H9l-5 4v-13.5Z" />
        <path d="M8 9h8" />
        <path d="M8 12h5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H20v17H7.5A2.5 2.5 0 0 0 5 21.5v-17Z" />
      <path d="M5 19a2.5 2.5 0 0 1 2.5-2.5H20" />
      <path d="M9 6h7" />
      <path d="M9 9h5" />
    </svg>
  );
}

const copy = {
  es: {
    heroEyebrow: "Recursos",
    heroTitle: "Centro de recursos logísticos.",
    heroText:
      "Acceda a preguntas frecuentes, documentación útil, recursos técnicos y contactos de Across Logistics para planificar mejor sus operaciones internacionales.",
    heroPrimary: "Ver preguntas frecuentes",
    heroSecondary: "Ver descargas",

    statusTitle: "Centro de recursos",
    statusRoute: "FAQ · Documentación · Contactos",
    statusText: "Soporte logístico",
    statusLeftLabel: "Contenido:",
    statusLeftValue: "Disponible",
    statusRightLabel: "Idiomas:",
    statusRightValue: "ES · EN · ZH",

    quick: [
      ["FAQ", "Preguntas frecuentes"],
      ["Descargas", "Documentación útil"],
      ["Contactos", "Soporte por país"],
      ["Guías", "Recursos técnicos"],
    ],

    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Resolvemos tus dudas más comunes.",
    faqText:
      "Encuentra respuestas claras sobre nuestras operaciones, procesos y servicios logísticos.",
    faqButton: "Ver todas las preguntas",
    faqs: [
      [
        "¿Qué es un DUA y para qué sirve?",
        "El DUA es el Documento Único Administrativo. Se utiliza en operaciones aduaneras para declarar mercancías en importaciones y exportaciones.",
      ],
      [
        "¿Qué tengo que hacer para realizar operaciones intracomunitarias?",
        "Debe contar con documentación fiscal y comercial adecuada, validar datos del operador y cumplir los requisitos propios de la operación dentro de la Unión Europea.",
      ],
      [
        "¿Cuál es el plazo para reexportar una mercancía en exportación temporal?",
        "El plazo depende del régimen aduanero autorizado y de la operación concreta. Conviene revisar la documentación y condiciones aprobadas antes de mover la mercancía.",
      ],
      [
        "¿Cómo puedo comprobar la partida arancelaria de mi mercancía?",
        "La partida arancelaria se comprueba analizando la naturaleza del producto, composición, uso y clasificación aplicable en nomenclatura aduanera.",
      ],
      [
        "¿Cómo funciona el seguro?",
        "El seguro protege la mercancía frente a determinados riesgos durante el transporte. La cobertura depende del valor declarado, trayecto y condiciones contratadas.",
      ],
      [
        "¿Qué es el VGM?",
        "El VGM es el peso bruto verificado del contenedor. Es obligatorio en transporte marítimo para declarar el peso antes del embarque.",
      ],
      [
        "¿Qué son los WAIVERS?",
        "Los waivers son autorizaciones o documentos requeridos por algunos países para permitir el ingreso o tránsito de determinadas cargas.",
      ],
      [
        "¿Cómo funcionan los Incoterms?",
        "Los Incoterms definen responsabilidades entre comprador y vendedor: entrega, costes, riesgos, transporte y documentación.",
      ],
    ],

    downloadsEyebrow: "Descargas",
    downloadsTitle:
      "Documentación útil para importadores, exportadores y equipos logísticos.",
    corporateTitle: "Información corporativa",
    technicalTitle: "Información técnica",
    downloadLabel: "Descargar PDF",
    viewLabel: "Ver recurso",
    corporate: [
      ["Catálogo corporativo", "Descargar PDF", "/downloads/catalogo-corporativo.pdf"],
      ["Presentación institucional", "Descargar PDF", "/downloads/presentacion-institucional.pdf"],
      ["Políticas de calidad", "Descargar PDF", "/downloads/politicas-calidad.pdf"],
      ["Certificaciones", "Descargar PDF", "/downloads/certificaciones.pdf"],
    ],
    technical: [
      ["ESP ZIP Codes", "Descargar PDF", "/downloads/esp-zip-codes.pdf"],
      ["Medidas de contenedores", "Ver recurso", "/downloads/medidas-contenedores.pdf"],
      ["Tipos de palés", "Ver recurso", "/downloads/tipos-pales.pdf"],
      ["Capacidad de almacenamiento de palés", "Ver recurso", "/downloads/capacidad-almacenamiento-pales.pdf"],
      ["Incoterms 2020", "Ver recurso", "/downloads/incoterms-2020.pdf"],
    ],

    moreEyebrow: "Más recursos",
    moreTitle: "Guías y recursos técnicos para tu operación diaria.",
    resourcesCorporateTitle: "Recursos corporativos",
    resourcesTechnicalTitle: "Recursos técnicos",
    contactTitle: "Teléfonos de contacto",
    corporateLinks: [
      "Términos y condiciones",
      "Política de privacidad",
      "Código de ética",
      "Responsabilidad social",
    ],
    technicalLinks: [
      "Guías de embalaje",
      "Normativas aduaneras",
      "Documentos necesarios",
      "Recomendaciones operativas",
    ],
    phones: [
      ["España", "+34 91 123 45 67"],
      ["China", "+86 21 1234 5678"],
      ["México", "+52 55 1234 5678"],
      ["Argentina", "+54 11 1234 5678"],
    ],
    allContacts: "Ver todos los contactos",

    ctaTitle: "Acompañamos tu operación con soporte experto",
    ctaText:
      "Nuestro equipo está listo para asesorarte en cada paso del proceso logístico.",
    ctaButton: "Contactar con un especialista",
  },

  en: {
    heroEyebrow: "Resources",
    heroTitle: "Logistics resource center.",
    heroText:
      "Access frequently asked questions, useful documentation, technical resources and Across Logistics contacts to better plan your international operations.",
    heroPrimary: "View FAQ",
    heroSecondary: "View downloads",

    statusTitle: "Resource center",
    statusRoute: "FAQ · Documentation · Contacts",
    statusText: "Logistics support",
    statusLeftLabel: "Content:",
    statusLeftValue: "Available",
    statusRightLabel: "Languages:",
    statusRightValue: "ES · EN · ZH",

    quick: [
      ["FAQ", "Frequently asked questions"],
      ["Downloads", "Useful documentation"],
      ["Contacts", "Country support"],
      ["Guides", "Technical resources"],
    ],

    faqEyebrow: "Frequently asked questions",
    faqTitle: "We answer your most common questions.",
    faqText:
      "Find clear answers about our operations, processes and logistics services.",
    faqButton: "View all questions",
    faqs: [
      [
        "What is a DUA and what is it used for?",
        "DUA is the Single Administrative Document. It is used in customs operations to declare goods in imports and exports.",
      ],
      [
        "What do I need to carry out intra-community operations?",
        "You need proper tax and commercial documentation, operator validation and compliance with the requirements of the EU operation.",
      ],
      [
        "What is the deadline to re-export goods under temporary export?",
        "The deadline depends on the authorized customs regime and the specific operation. Documentation and approved conditions should be reviewed before moving goods.",
      ],
      [
        "How can I check the tariff heading of my goods?",
        "Tariff classification is checked by analyzing the product nature, composition, use and applicable customs nomenclature.",
      ],
      [
        "How does insurance work?",
        "Insurance protects goods against certain transport risks. Coverage depends on declared value, route and contracted terms.",
      ],
      [
        "What is VGM?",
        "VGM is the verified gross mass of the container. It is mandatory in maritime transport before loading.",
      ],
      [
        "What are waivers?",
        "Waivers are authorizations or documents required by some countries to allow the entry or transit of certain cargo.",
      ],
      [
        "How do Incoterms work?",
        "Incoterms define responsibilities between buyer and seller: delivery, costs, risks, transport and documentation.",
      ],
    ],

    downloadsEyebrow: "Downloads",
    downloadsTitle:
      "Useful documentation for importers, exporters and logistics teams.",
    corporateTitle: "Corporate information",
    technicalTitle: "Technical information",
    downloadLabel: "Download PDF",
    viewLabel: "View resource",
    corporate: [
      ["Corporate catalogue", "Download PDF", "/downloads/catalogo-corporativo.pdf"],
      ["Institutional presentation", "Download PDF", "/downloads/presentacion-institucional.pdf"],
      ["Quality policies", "Download PDF", "/downloads/politicas-calidad.pdf"],
      ["Certifications", "Download PDF", "/downloads/certificaciones.pdf"],
    ],
    technical: [
      ["ESP ZIP Codes", "Download PDF", "/downloads/esp-zip-codes.pdf"],
      ["Container dimensions", "View resource", "/downloads/medidas-contenedores.pdf"],
      ["Pallet types", "View resource", "/downloads/tipos-pales.pdf"],
      ["Pallet storage capacity", "View resource", "/downloads/capacidad-almacenamiento-pales.pdf"],
      ["Incoterms 2020", "View resource"],
    ],

    moreEyebrow: "More resources",
    moreTitle: "Technical guides and resources for your daily operation.",
    resourcesCorporateTitle: "Corporate resources",
    resourcesTechnicalTitle: "Technical resources",
    contactTitle: "Contact numbers",
    corporateLinks: [
      "Terms and conditions",
      "Privacy policy",
      "Code of ethics",
      "Social responsibility",
    ],
    technicalLinks: [
      "Packaging guides",
      "Customs regulations",
      "Required documents",
      "Operational recommendations",
    ],
    phones: [
      ["Spain", "+34 91 123 45 67"],
      ["China", "+86 21 1234 5678"],
      ["Mexico", "+52 55 1234 5678"],
      ["Argentina", "+54 11 1234 5678"],
    ],
    allContacts: "View all contacts",

    ctaTitle: "Need help planning your operation?",
    ctaText:
      "Our team is ready to advise you at every step of the logistics process.",
    ctaButton: "Contact a specialist",
  },

  zh: {
    heroEyebrow: "资源",
    heroTitle: "物流资源中心。",
    heroText:
      "获取常见问题、实用文件、技术资源和 Across Logistics 联系方式，以便更好规划国际物流业务。",
    heroPrimary: "查看常见问题",
    heroSecondary: "查看下载",

    statusTitle: "资源中心",
    statusRoute: "常见问题 · 文件 · 联系方式",
    statusText: "物流支持",
    statusLeftLabel: "内容：",
    statusLeftValue: "可用",
    statusRightLabel: "语言：",
    statusRightValue: "ES · EN · ZH",

    quick: [
      ["常见问题", "物流问题解答"],
      ["下载", "实用文件资料"],
      ["联系", "各国支持"],
      ["指南", "技术资源"],
    ],

    faqEyebrow: "常见问题",
    faqTitle: "解答您最常见的问题。",
    faqText:
      "查看关于我们运营、流程和物流服务的清晰答案。",
    faqButton: "查看所有问题",
    faqs: [
      ["什么是 DUA？有什么用途？", "DUA 是单一行政文件，用于海关业务中申报进出口货物。"],
      ["如何进行欧盟内部业务？", "需要准备适当的税务和商业文件，验证经营者信息，并遵守欧盟内部业务要求。"],
      ["临时出口货物重新出口的期限是多久？", "期限取决于批准的海关制度和具体业务，运输前应核对文件和条件。"],
      ["如何确认货物的海关编码？", "海关编码通过分析产品性质、组成、用途和适用的海关分类确定。"],
      ["保险如何运作？", "保险在运输过程中针对特定风险保护货物，保障范围取决于申报价值、路线和条款。"],
      ["什么是 VGM？", "VGM 是集装箱核实总重量，在海运装船前必须申报。"],
      ["什么是 WAIVERS？", "Waivers 是某些国家要求的授权或文件，用于允许特定货物进入或过境。"],
      ["Incoterms 如何运作？", "Incoterms 定义买卖双方在交付、成本、风险、运输和文件方面的责任。"],
    ],

    downloadsEyebrow: "下载",
    downloadsTitle:
      "面向进口商、出口商和物流团队的实用文件。",
    corporateTitle: "企业信息",
    technicalTitle: "技术信息",
    downloadLabel: "下载 PDF",
    viewLabel: "查看资源",
    corporate: [
      ["企业目录", "下载 PDF", "/downloads/catalogo-corporativo.pdf"],
      ["机构介绍", "下载 PDF", "/downloads/presentacion-institucional.pdf"],
      ["质量政策", "下载 PDF", "/downloads/politicas-calidad.pdf"],
      ["认证文件", "下载 PDF", "/downloads/certificaciones.pdf"],
    ],
    technical: [
      ["ESP ZIP Codes", "下载 PDF", "/downloads/esp-zip-codes.pdf"],
      ["集装箱尺寸", "查看资源", "/downloads/medidas-contenedores.pdf"],
      ["托盘类型", "查看资源", "/downloads/tipos-pales.pdf"],
      ["托盘存储容量", "查看资源", "/downloads/capacidad-almacenamiento-pales.pdf"],
      ["Incoterms 2020", "查看资源", "/downloads/incoterms-2020.pdf"],
    ],

    moreEyebrow: "更多资源",
    moreTitle: "适用于日常运营的技术指南和资源。",
    resourcesCorporateTitle: "企业资源",
    resourcesTechnicalTitle: "技术资源",
    contactTitle: "联系电话",
    corporateLinks: ["条款和条件", "隐私政策", "道德准则", "社会责任"],
    technicalLinks: ["包装指南", "海关法规", "所需文件", "运营建议"],
    phones: [
      ["西班牙", "+34 91 123 45 67"],
      ["中国", "+86 21 1234 5678"],
      ["墨西哥", "+52 55 1234 5678"],
      ["阿根廷", "+54 11 1234 5678"],
    ],
    allContacts: "查看所有联系方式",

    ctaTitle: "您的业务需要帮助吗？",
    ctaText:
      "我们的团队可在物流流程的每一步为您提供专业建议。",
    ctaButton: "联系顾问",
  },
} satisfies Record<Locale, any>;

export default function RecursosPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const getLocale = (): Locale => {
      if (typeof window === "undefined") return "es";
      const stored = window.localStorage.getItem("across-locale");
      return stored === "en" || stored === "zh" ? stored : "es";
    };

    const updateLocale = () => setLocale(getLocale());
    updateLocale();

    window.addEventListener("across-locale-change", updateLocale);
    window.addEventListener("storage", updateLocale);

    return () => {
      window.removeEventListener("across-locale-change", updateLocale);
      window.removeEventListener("storage", updateLocale);
    };
  }, []);

  const t = copy[locale];

  const downloadBenefits = {
    es: [
      ["Documentación actualizada", "Revisamos y actualizamos los archivos periódicamente para brindar información siempre vigente."],
      ["Acceso seguro", "Archivos verificados y listos para utilizar en cada operación."],
      ["Disponibles siempre", "Descargá lo que necesitás, cuando lo necesitás."],
    ],
    en: [
      ["Updated documentation", "We review and update files periodically to provide always-current information."],
      ["Secure access", "Verified files ready to use in every operation."],
      ["Always available", "Download what you need, whenever you need it."],
    ],
    zh: [
      ["文件保持更新", "我们定期审核和更新文件，确保信息始终有效。"],
      ["安全访问", "文件经过验证，可用于每项业务操作。"],
      ["随时可用", "可在需要时下载所需资料。"],
    ],
  }[locale];
  const resourceIcons: ResourceIconName[] = ["faq", "download", "contact", "guide"];

  return (
    <div className={styles.page}>
      <Header />
<main>
        <section
          className={heroStyles.hero}
          data-aereo-hero="true"
          data-service-hero-home="true"
        >
          <Image
            src="/images/recursos1.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${heroStyles.heroImage} ${heroStyles.heroImageDesktop}`}
          />

          <Image
            src="/images/recursos1.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 0px"
            className={`${heroStyles.heroImage} ${heroStyles.heroImageMobile}`}
          />

          <div className={heroStyles.heroOverlay} />

          <div className={heroStyles.heroInner}>
            <div className={heroStyles.heroContent}>
              <span className={heroStyles.eyebrow}>{t.heroEyebrow}</span>
              <h1 className={heroStyles.title}>{t.heroTitle}</h1>
              <p className={heroStyles.subtitle}>{t.heroText}</p>

              <div className={heroStyles.actions}>
                <Link href="#faq-recursos" className={heroStyles.primaryBtn}>
                  {t.heroPrimary}
                </Link>
                <Link href="#descargas-recursos" className={heroStyles.secondaryBtn}>
                  {t.heroSecondary}
                </Link>
              </div>
            </div>

            <div className={heroStyles.operationCard}>
              <span>{t.statusTitle}</span>
              <strong>{t.statusRoute}</strong>
              <p>{t.statusText}</p>

              <div>
                <small>{t.statusLeftLabel}</small>
                <b>{t.statusLeftValue}</b>
              </div>

              <div>
                <small>{t.statusRightLabel}</small>
                <em>{t.statusRightValue}</em>
              </div>
            </div>
          </div>

          <div className={heroStyles.commandBar} data-aereo-trust="true">
            {t.quick.map(([title, text], index) => (
              <div key={title} className={heroStyles.commandItem}>
                <i aria-hidden="true"><ResourceIcon name={resourceIcons[index] ?? "faq"} /></i>
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section id="faq-recursos" className={styles.faqSection}>
          <div className={styles.sectionIntro}>
            <span>{t.faqEyebrow}</span>
            <h2>{t.faqTitle}</h2>
            <p>{t.faqText}</p>
            <Link href="#descargas-recursos">{t.faqButton}</Link>
          </div>

          <div className={styles.faqList}>
            {t.faqs.map(([question, answer], index) => (
              <details className={styles.faqItem} key={question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{question}</strong>
                  <i>+</i>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="descargas-recursos" className={styles.downloads}>
          <div className={styles.downloadImage}>
            <Image
              src="/images/recursos2.png"
              alt={t.downloadsTitle}
              fill
              sizes="(max-width: 900px) 100vw, 44vw"
            />
          </div>

          <div className={styles.downloadPanel}>
            <span>{t.downloadsEyebrow}</span>
            <h2>{t.downloadsTitle}</h2>

            <div className={styles.downloadColumns}>
              <div className={styles.resourceColumn}>
                <h3>{t.corporateTitle}</h3>
                <ul>
                  {t.corporate.map(([name, action, href], index) => (
                    <li key={name}>
                      <strong>{String(index + 1).padStart(2, "0")} · {name}</strong>
                      <a href={href} download>{action} ↓</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.resourceColumn}>
                <h3>{t.technicalTitle}</h3>
                <ul>
                  {t.technical.map(([name, action, href], index) => (
                    <li key={name}>
                      <strong>{String(index + 1).padStart(2, "0")} · {name}</strong>
                      <a href={href} download>{action} ↓</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.downloadBenefits}>
              {downloadBenefits.map(([title, text], index) => (
                <article key={title}>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

<section className={styles.resourceFinalCta}>
          <picture className={styles.resourceFinalCtaBg} aria-hidden="true">
            <source media="(max-width: 760px)" srcSet="/images/operador/contactcenter-mobile.png" />
            <img src="/images/operador/contactcenter.png" alt="" />
          </picture>
          <div className={styles.resourceFinalCtaInner}>
            <div className={styles.resourceFinalCtaCopy}>
              <span className={styles.ctaKicker}>
                {locale === "es"
                  ? "Soporte operativo"
                  : locale === "en"
                    ? "Operational support"
                    : "运营支持"}
              </span>

              <h2>{t.ctaTitle}</h2>
              <p>{t.ctaText}</p>

              <ul className={styles.ctaProof}>
                <li>
                  {locale === "es"
                    ? "Revisión documental"
                    : locale === "en"
                      ? "Document review"
                      : "文件审核"}
                </li>
                <li>
                  {locale === "es"
                    ? "Recursos técnicos"
                    : locale === "en"
                      ? "Technical resources"
                      : "技术资源"}
                </li>
                <li>
                  {locale === "es"
                    ? "Asesoría logística"
                    : locale === "en"
                      ? "Logistics guidance"
                      : "物流咨询"}
                </li>
              </ul>

              <Link href="/contacto">{t.ctaButton}</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
