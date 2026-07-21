"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import Certifications from "@/components/sections/Certifications";
import styles from "./Sector.module.css";
import final from "./RenewablesFinal.module.css";
import SectorLeadForm from "./SectorLeadForm";

type Locale = "es" | "en" | "zh";
type IconName = "wind" | "solar" | "box" | "route" | "document" | "truck" | "search" | "shield" | "tracking";

const copy = {
  es: {
    heroEyebrow: "Logística especializada para",
    heroTitle: "Energías Renovables",
    heroText: "Soluciones logísticas para componentes eólicos, proyectos solares y cargas industriales, con planificación técnica, coordinación multimodal y entrega en obra.",
    primaryCta: "Solicitar propuesta logística",
    overviewEyebrow: "Expertos en el sector",
    overviewTitle: "Logística especializada para proyectos energéticos de alta exigencia.",
    overviewText: "Gestionamos componentes sobredimensionados, equipos sensibles y cargas críticas para parques solares, eólicos e infraestructuras energéticas, coordinando rutas, permisos, manipulación y entrega final.",
    overviewButton: "Hablar con un especialista",
    pillars: [
      ["Planificación técnica", "Analizamos dimensiones, peso, ruta, accesos y restricciones operativas."],
      ["Gestión de permisos", "Coordinamos documentación para rutas, maniobras y cargas especiales."],
      ["Transporte multimodal", "Integramos transporte marítimo, terrestre o aéreo según el proyecto."],
      ["Entrega en obra", "Coordinamos ventanas, accesos, descarga y recepción final."]
    ],
    servicesEyebrow: "Soluciones especializadas",
    servicesTitle: "Servicios logísticos para cada necesidad del proyecto.",
    services: [
      ["Componentes eólicos", "Transporte de palas, torres, nacelles y equipos asociados."],
      ["Proyectos solares", "Coordinación para paneles, estructuras, inversores y componentes técnicos."],
      ["Carga sobredimensionada", "Operaciones para mercancías fuera de medidas estándar."],
      ["Coordinación multimodal", "Integración de puerto, carretera, almacén y entrega final."],
      ["Gestión documental", "Permisos y requisitos operativos para cargas especiales."],
      ["Entrega en obra", "Coordinación con accesos, ventanas de entrega y equipos de manipulación."]
    ],
    processEyebrow: "Nuestro proceso",
    processTitle: "Una operación clara y coordinada de principio a fin.",
    process: [
      ["Analizamos el proyecto", "Revisamos dimensiones, peso, componente, origen, destino y requerimientos de obra."],
      ["Diseñamos la operación", "Definimos ruta, permisos, transporte, equipos y maniobras necesarias."],
      ["Coordinamos y monitorizamos", "Gestionamos documentación, operadores y cada hito crítico del proyecto."],
      ["Entregamos en obra", "Coordinamos acceso, descarga, recepción y cierre operativo."]
    ]
  },
  en: {
    heroEyebrow: "Specialized logistics for",
    heroTitle: "Renewable Energy",
    heroText: "Logistics solutions for wind components, solar projects and industrial cargo, with technical planning, multimodal coordination and site delivery.",
    primaryCta: "Request logistics proposal",
    overviewEyebrow: "Sector expertise",
    overviewTitle: "Specialized logistics for demanding energy projects.",
    overviewText: "We manage oversized components, sensitive equipment and critical cargo for solar farms, wind projects and energy infrastructure, coordinating routes, permits, handling and final delivery.",
    overviewButton: "Talk to a specialist",
    pillars: [
      ["Technical planning", "We analyze dimensions, weight, route, access and operational restrictions."],
      ["Permit management", "We coordinate documentation for routes, maneuvers and special cargo."],
      ["Multimodal transport", "We integrate ocean, road or air transport according to the project."],
      ["Site delivery", "We coordinate time windows, access, unloading and final reception."]
    ],
    servicesEyebrow: "Specialized solutions",
    servicesTitle: "Logistics services for every project requirement.",
    services: [
      ["Wind components", "Transport of blades, towers, nacelles and associated equipment."],
      ["Solar projects", "Coordination for panels, structures, inverters and technical components."],
      ["Oversized cargo", "Operations for cargo outside standard dimensions."],
      ["Multimodal coordination", "Integration of port, road, warehousing and final delivery."],
      ["Document management", "Permits and operational requirements for special cargo."],
      ["Site delivery", "Coordination with access, delivery windows and handling equipment."]
    ],
    processEyebrow: "Our process",
    processTitle: "A clear and coordinated operation from start to finish.",
    process: [
      ["We analyze the project", "We review dimensions, weight, component, origin, destination and site requirements."],
      ["We design the operation", "We define route, permits, transport, equipment and required maneuvers."],
      ["We coordinate and monitor", "We manage documentation, operators and every critical project milestone."],
      ["We deliver to site", "We coordinate access, unloading, reception and operational closure."]
    ]
  },
  zh: {
    heroEyebrow: "专业物流服务",
    heroTitle: "可再生能源",
    heroText: "为风电组件、太阳能项目和工业货物提供物流方案，包括技术规划、多式联运协调和工地交付。",
    primaryCta: "申请物流方案",
    overviewEyebrow: "行业专长",
    overviewTitle: "面向高要求能源项目的专业物流。",
    overviewText: "我们为太阳能、风能和能源基础设施管理超限组件、敏感设备和关键货物，协调路线、许可、装卸和最终交付。",
    overviewButton: "联系专家",
    pillars: [
      ["技术规划", "分析尺寸、重量、路线、通行和运营限制。"],
      ["许可管理", "协调路线、操作和特殊货物所需文件。"],
      ["多式联运", "根据项目整合海运、陆运或空运。"],
      ["工地交付", "协调时间窗口、通行、卸货和最终接收。"]
    ],
    servicesEyebrow: "专业解决方案",
    servicesTitle: "满足项目不同需求的物流服务。",
    services: [
      ["风电组件", "运输叶片、塔筒、机舱和相关设备。"],
      ["太阳能项目", "协调面板、结构、逆变器和技术组件。"],
      ["超限货物", "为超出标准尺寸的货物提供操作。"],
      ["多式联运协调", "整合港口、道路、仓储和最终交付。"],
      ["文件管理", "特殊货物所需许可和运营要求。"],
      ["工地交付", "协调通行、交付窗口和装卸设备。"]
    ],
    processEyebrow: "我们的流程",
    processTitle: "从开始到结束，清晰协调每一步。",
    process: [
      ["分析项目", "审核尺寸、重量、组件、始发地、目的地和工地要求。"],
      ["设计物流方案", "确定路线、许可、运输方式、设备和所需操作。"],
      ["协调并监控", "管理文件、操作人员和项目关键节点。"],
      ["交付至工地", "协调通行、卸货、接收和运营收尾。"]
    ]
  }
} satisfies Record<Locale, any>;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem("locale") || window.localStorage.getItem("across-locale");
  if (saved === "es" || saved === "en" || saved === "zh") return saved;
  const htmlLang = document.documentElement.lang;
  return htmlLang === "en" || htmlLang === "zh" ? htmlLang : "es";
}

function Icon({ name }: { name: IconName }) {
  const common = { width: 32, height: 32, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, React.ReactNode> = {
    wind: <><path d="M12 12 5 5" /><path d="M12 12 19 5" /><path d="M12 12v9" /><circle cx="12" cy="12" r="2" /></>,
    solar: <><rect x="3" y="7" width="18" height="10" rx="1" /><path d="M7 7v10M12 7v10M17 7v10M3 12h18M12 17v4M8 21h8" /></>,
    box: <><path d="m21 8-9-5-9 5 9 5 9-5Z" /><path d="M3 8v8l9 5 9-5V8M12 13v8" /></>,
    route: <><path d="M4 6h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h11" /><path d="M4 6l3-3M4 6l3 3" /></>,
    document: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5M8 13h8M8 17h6" /></>,
    truck: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.4 2.8 8.3 7 10 4.2-1.7 7-5.6 7-10V6l-7-3Z" /><path d="m9.5 12 1.8 1.8 3.7-4" /></>,
    tracking: <><path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.3" /></>
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export default function EnergiasRenovablesPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const update = (event?: Event) => {
      const detail = event instanceof CustomEvent ? event.detail : null;
      if (detail === "es" || detail === "en" || detail === "zh") setLocale(detail);
      else setLocale(getInitialLocale());
    };
    update();
    window.addEventListener("across-locale-change", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("across-locale-change", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const t = copy[locale];
  const serviceIcons: IconName[] = ["wind", "solar", "box", "route", "document", "truck"];
  const serviceHrefs = [
    "/servicios/cargas-especiales",
    "/servicios/cargas-especiales",
    "/servicios/cargas-especiales",
    "/servicios/transporte-terrestre",
    "/servicios/aduanas",
    "/servicios/transporte-terrestre"
  ];
  const pillarIcons: IconName[] = ["search", "document", "route", "tracking"];

  return (
    <div className="page-shell">
      <Header />
      <main className={`${styles.page} ${final.page}`}>
        <section className={`${styles.hero} ${final.hero}`} data-aereo-hero="true" data-service-hero-home="true">
          <Image src="/images/sectores/energiasrenovables.png" alt={t.heroTitle} fill priority sizes="100vw" className={styles.heroImage} />
          <div className={styles.heroOverlay} />
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>{t.heroEyebrow}</span>
              <h1 className={styles.title}>{t.heroTitle}</h1>
              <p>{t.heroText}</p>
              <div className={styles.actions}>
                <Link href="#solicitar-propuesta">{t.primaryCta}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.overview} ${final.overview}`}>
          <div className={styles.overviewCopy}>
            <span className={styles.eyebrow}>{t.overviewEyebrow}</span>
            <h2>{t.overviewTitle}</h2>
            <p>{t.overviewText}</p>
            <Link href="#solicitar-propuesta">{t.overviewButton}</Link>
          </div>
          <div className={styles.pillars}>
            {t.pillars.map(([title, text]: string[], index: number) => (
              <article key={title}>
                <i><Icon name={pillarIcons[index]} /></i>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.services} ${final.services}`} style={{ "--sector-bg": "url('/images/sectores/energiasrenovables.png')" } as CSSProperties}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.servicesEyebrow}</span>
            <h2>{t.servicesTitle}</h2>
          </div>
          <div className={`${styles.serviceGrid} ${final.serviceGrid}`}>
            {t.services.map(([title, text]: string[], index: number) => (
              <article key={title}>
                <Link href={serviceHrefs[index]}>
                  <i><Icon name={serviceIcons[index]} /></i>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.process} ${final.process}`}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.processEyebrow}</span>
            <h2>{t.processTitle}</h2>
          </div>
          <div className={`${styles.processGrid} ${final.processGrid}`}>
            {t.process.map(([title, text]: string[], index: number) => (
              <article key={title}>
                <strong>{index + 1}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <Certifications />
        <SectorLeadForm />
      </main>
      <Footer />
    </div>
  );
}
