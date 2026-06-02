"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Recursos.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    badge: "FAQ & RECURSOS",
    title: "FAQ y recursos para comercio internacional.",
    text: "Documentación corporativa, información técnica y respuestas frecuentes para planificar operaciones logísticas con mayor precisión.",
    cta: "Solicite más información",
    faqTitle: "Preguntas frecuentes",
    downloadsTitle: "Descargas",
    downloadsText: "Documentación útil para importadores, exportadores y equipos logísticos.",
    contactTitle: "¿Necesita asesoramiento personalizado?",
    contactText: "Nuestro equipo de Atención al Cliente atenderá sus necesidades y le orientará según su operación.",
    contactButton: "Contactar ahora →",
    corporate: "Información Corporativa",
    technical: "Información Técnica",
    view: "Descargar PDF",
    faqs: [
      ["¿Qué es un DUA y para qué sirve?", "El DUA o Documento Único Administrativo es una declaración de importación o exportación ante las autoridades aduaneras. Aporta información sobre el producto, sirve de base para la declaración tributaria y debe acompañar la mercancía durante las formalidades aduaneras."],
      ["¿Qué tengo que hacer para realizar operaciones intracomunitarias?", "Las empresas deben inscribirse previamente en el Registro de Operadores Intracomunitarios, también conocido como censo VIES, para obtener un número especial de identificación fiscal válido para operaciones de IVA intracomunitario."],
      ["¿Cuál es el plazo para reexportar una mercancía en exportación temporal?", "El plazo inicial es de tres años, aunque puede ampliarse en circunstancias especiales. Las mercancías reintroducidas y declaradas dentro del plazo pueden quedar exentas de derechos de importación."],
      ["¿Cómo puedo comprobar la partida arancelaria de mi mercancía?", "La partida arancelaria puede comprobarse en la base de datos TARIC de la Unión Europea, validando clasificación, vigencia y requisitos aplicables."],
      ["¿Cómo funciona el seguro?", "El seguro de transporte cubre riesgos que puedan afectar a la mercancía o al medio de transporte. Su cálculo suele basarse en el valor de factura más parte del coste total del transporte."],
      ["¿Qué es el VGM?", "El VGM es el peso bruto verificado del contenedor, incluyendo mercancía, embalaje, estiba y tara. Debe declararse antes del embarque mediante pesaje certificado."],
      ["¿Qué son los WAIVERS?", "Son documentos obligatorios para exportar a determinados países, especialmente en África. Recogen datos del exportador, importador, mercancía, valor, contenedor, grupaje y ruta."],
      ["¿Cómo funcionan los Incoterms?", "Los Incoterms definen responsabilidades, costes y riesgos entre comprador y vendedor en operaciones internacionales."]
    ],
    downloads: [
      ["集装箱尺寸", "技术 PDF · 集装箱", "https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores"],
      ["托盘类型", "技术 PDF · 托盘", "https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales"],
      ["托盘仓储容量", "技术 PDF · 仓储", "https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales"],
      ["Incoterms 国际贸易术语", "技术 PDF · 国际贸易", "https://hubspot.acrosslogistics.com/es/landing-page-incoterms"]
    ]
  },
  en: {
    badge: "FAQ & RESOURCES",
    title: "FAQ and resources for international trade.",
    text: "Corporate documentation, technical information and frequent answers to plan logistics operations with greater precision.",
    cta: "Request information",
    faqTitle: "Frequently asked questions",
    downloadsTitle: "Downloads",
    downloadsText: "Useful documentation for importers, exporters and logistics teams.",
    contactTitle: "Need personalized advice?",
    contactText: "Our Customer Service team will review your needs and guide you according to your operation.",
    contactButton: "Contact now →",
    corporate: "Corporate Information",
    technical: "Technical Information",
    view: "Download PDF",
    faqs: [
      ["What is a DUA and what is it used for?", "The DUA is an import or export declaration submitted to customs authorities. It provides product information, supports tax declaration and accompanies goods through customs formalities."],
      ["What do I need for intra-community operations?", "Companies must register in the Intra-Community Operators Register, also known as VIES, to obtain a valid VAT identification number."],
      ["What is the deadline to re-export goods under temporary export?", "The initial period is three years and may be extended under special circumstances."],
      ["How can I check my tariff classification?", "The tariff code can be checked in the European Union TARIC database to validate classification, validity and applicable requirements."],
      ["How does insurance work?", "Transport insurance covers risks affecting goods or the means of transport. It is usually calculated from the invoice value plus part of the transport cost."],
      ["What is VGM?", "VGM is the verified gross mass of the container, including goods, packaging, securing material and tare. It must be declared before shipment."],
      ["What are WAIVERS?", "They are mandatory documents for exporting to specific countries, especially in Africa, including shipper, consignee, cargo, value and routing details."],
      ["How do Incoterms work?", "Incoterms define responsibilities, costs and risk transfer between buyer and seller in international operations."]
    ],
    downloads: [
      ["Corporate Catalogue", "https://hubspot.acrosslogistics.com/es/catalogo-corporativo"],
      ["ESP ZIP Codes", "https://hubspot.acrosslogistics.com/es/esp-zip-codes"],
      ["CONTAINERS - Types and specifications", "https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores"],
      ["PALLETS - Types and specifications", "https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales"],
      ["PALLETS - Truck and container layout", "https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales"],
      ["Incoterms - International transport rules", "https://hubspot.acrosslogistics.com/es/landing-page-incoterms"]
    ]
  },
  zh: {
    badge: "常见问题与资源",
    title: "国际贸易常见问题与资源。",
    text: "为进口商、出口商和物流团队提供企业资料、技术信息与常见问题解答。",
    cta: "申请信息",
    faqTitle: "常见问题",
    downloadsTitle: "下载资料",
    downloadsText: "为进口商、出口商和物流团队提供实用资料。",
    contactTitle: "需要个性化咨询？",
    contactText: "我们的客户服务团队将根据您的业务需求提供指导。",
    contactButton: "立即联系 →",
    corporate: "企业信息",
    technical: "技术信息",
    view: "下载 PDF",
    faqs: [
      ["什么是 DUA？", "DUA 是提交给海关的进出口申报文件，用于提供货物信息、支持税务申报并完成海关手续。"],
      ["如何进行欧盟内部交易？", "企业需在欧盟内部运营商登记系统 VIES 中注册，以获得有效的增值税识别号码。"],
      ["临时出口货物的再出口期限是多少？", "初始期限通常为三年，特殊情况下可延长。"],
      ["如何查询商品关税编码？", "可通过欧盟 TARIC 数据库核查商品编码、有效性和相关要求。"],
      ["运输保险如何运作？", "运输保险覆盖货物或运输工具可能面临的风险，通常按发票价值和部分运输成本计算。"],
      ["什么是 VGM？", "VGM 是集装箱核实总重量，包括货物、包装、固定材料和箱体自重，装船前必须申报。"],
      ["什么是 WAIVERS？", "WAIVER 是出口到部分国家，特别是非洲部分国家时所需的强制文件。"],
      ["Incoterms 如何运作？", "Incoterms 定义国际交易中买卖双方的责任、费用和风险转移。"]
    ],
    downloads: [
      ["企业手册", "https://hubspot.acrosslogistics.com/es/catalogo-corporativo"],
      ["ESP 邮编资料", "https://hubspot.acrosslogistics.com/es/esp-zip-codes"],
      ["集装箱类型与规格", "https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores"],
      ["托盘类型与规格", "https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales"],
      ["托盘在卡车和集装箱中的布局", "https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales"],
      ["Incoterms 国际运输规则", "https://hubspot.acrosslogistics.com/es/landing-page-incoterms"]
    ]
  }
} as const;

const phones = [
  ["Europa", "+34 933 170 726"],
  ["Asia", "+86 755 2314 3571"],
  ["Oriente Medio", "+971 501 926 339"],
  ["EEUU", "+1 713 597 6939"],
] as const;

export default function RecursosPage() {
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
        <Image src="/images/recursos1.png" alt="Recursos Across Logistics" fill priority className={styles.heroImage} sizes="100vw" />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.text}</p>
          <Link href="/contacto">{t.cta}</Link>
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

        <section className={styles.downloads}>
          <div className={styles.downloadImage}>
            <Image src="/images/recursos2.png" alt="Documentación logística" fill className={styles.secondImage} sizes="(max-width: 900px) 100vw, 48vw" />
          </div>

          <div className={styles.downloadCopy}>
            <span>{t.downloadsTitle}</span>
            <h2>{t.downloadsText}</h2>

            <div className={styles.originalResources}>
              <div className={styles.resourceColumn}>
                <h3>Información Corporativa</h3>

                <a href="/recursos/catalogo-corporativo-across.pdf" download>
                  <span>01- Catálogo Corporativo</span>
                  <strong>Descargar PDF ↓</strong>
                </a>
              </div>

              <div className={styles.resourceColumn}>
                <h3>Información Técnica</h3>

                <a href="/recursos/esp-zip-codes-across.pdf" download>
                  <span>01- ESP ZIP Codes</span>
                  <strong>Descargar PDF ↓</strong>
                </a>

                <a href="https://hubspot.acrosslogistics.com/es/landing-page-medidas-de-contenedores" target="_blank" rel="noopener noreferrer">
                  <span>02- Medidas de Contenedores</span>
                  <strong>Ver recurso →</strong>
                </a>

                <a href="https://hubspot.acrosslogistics.com/es/landing-page-tipos-de-pales" target="_blank" rel="noopener noreferrer">
                  <span>03- Tipos de Palés</span>
                  <strong>Ver recurso →</strong>
                </a>

                <a href="https://hubspot.acrosslogistics.com/es/landing-page-capacidad-almacenamiento-pales" target="_blank" rel="noopener noreferrer">
                  <span>04- Capacidad de Almacenamiento de Palés</span>
                  <strong>Ver recurso →</strong>
                </a>

                <a href="https://hubspot.acrosslogistics.com/es/landing-page-incoterms" target="_blank" rel="noopener noreferrer">
                  <span>05- Incoterms</span>
                  <strong>Ver recurso →</strong>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contactCta}>
          <div>
            <span>{t.contactTitle}</span>
            <h2>{t.contactText}</h2>
          </div>

          <div className={styles.phoneGrid}>
            {phones.map(([label, phone]) => (
              <article key={label}>
                <small>{label}</small>
                <strong>{phone}</strong>
              </article>
            ))}
          </div>

          <Link href="/contacto">{t.contactButton}</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
