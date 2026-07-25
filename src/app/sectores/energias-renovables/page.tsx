"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import styles from "./Sector.module.css";

import SectorLeadForm from "@/app/sectores/alimentacion-bebidas/SectorLeadForm";
type Locale = "es" | "en" | "zh";

type IconName =
  | "timer"
  | "plane"
  | "globe"
  | "box"
  | "route"
  | "document"
  | "tracking"
  | "search"
  | "truck"
  | "wind"
  | "solar";

const copy = {
  es: {
    heroEyebrow: "Transporte especial para",
    heroTitle: "Energías Renovables",
    heroText:
      "Soluciones logísticas para proyectos de energías renovables, con transporte especial, coordinación multimodal y entrega en obra.",
    primaryCta: "Solicitar propuesta logística",
    secondaryCta: "Hablar con un especialista",

    trust: [
      ["Carga especial", "Componentes sobredimensionados"],
      ["Multimodal", "Puerto, carretera y obra"],
      ["Permisos", "Gestión documental"],
      ["Entrega en obra", "Coordinación final"],
    ],

    overviewEyebrow: "Expertos en el sector de:",
    overviewTitle: "Transporte y logística especializada para Energías Renovables.",
    overviewText: "La industria de las energías renovables exige planificación, flexibilidad y experiencia en operaciones de alta complejidad. En Across Logistics coordinamos soluciones para parques eólicos, plantas solares e infraestructuras energéticas, adaptando cada operación a las necesidades del proyecto y manteniendo nuestro compromiso con una logística eficiente, responsable y respetuosa con el medio ambiente.",
    overviewButton: "Inicia mi operación",

    pillars: [
      [
        "Planificación técnica",
        "Analizamos dimensiones, rutas, accesos y necesidades específicas de cada proyecto.",
      ],
      [
        "Cargas especiales",
        "Coordinamos componentes sobredimensionados, permisos y documentación.",
      ],
      [
        "Transporte multimodal",
        "Integramos transporte marítimo, aéreo y terrestre.",
      ],
      [
        "Entrega en obra",
        "Coordinamos la entrega final, útiles y repuestos.",
      ],
    ],

    "servicesEyebrow": "Soluciones especializadas",
    "servicesTitle": "Servicios logísticos para cada necesidad del sector.",
    "services": [
      [
        "Temperatura controlada",
        "Soluciones para productos perecederos y mercancías sensibles que requieren condiciones térmicas específicas."
      ],
      [
        "Transporte terrestre",
        "Distribución nacional e internacional con planificación de rutas, tiempos y entregas."
      ],
      [
        "Transporte aéreo",
        "Soluciones para operaciones urgentes, productos sensibles y mercancías de alto valor."
      ],
      [
        "Transporte marítimo",
        "Gestión de cargas internacionales adaptada al volumen, destino y necesidades de cada operación."
      ],
      [
        "Almacén y distribución",
        "Gestión de stock, preparación de pedidos y distribución hacia clientes, retail y centros logísticos."
      ],
      [
        "Servicios de aduanas",
        "Coordinación documental y aduanera para facilitar operaciones de importación y exportación."
      ]
    ],

    processEyebrow: "Nuestro proceso",
    processTitle:
      "Una operación clara y coordinada de principio a fin.",

    process: [
      [
        "Analizamos el proyecto",
        "Revisamos dimensiones, peso, componente, origen, destino y requerimientos de obra.",
      ],
      [
        "Diseñamos la operación",
        "Definimos ruta, permisos, transporte, equipos y maniobras necesarias.",
      ],
      [
        "Coordinamos y monitorizamos",
        "Gestionamos documentación, operadores y cada hito crítico del proyecto.",
      ],
      [
        "Entregamos en obra",
        "Coordinamos acceso, descarga, recepción y cierre operativo.",
      ],
    ],
  },

  en: {
    heroEyebrow: "Special transport for",
    heroTitle: "Renewable Energy",
    heroText:
      "Logistics solutions for renewable energy projects, with special transport, multimodal coordination and final site delivery.",
    primaryCta: "Request logistics proposal",
    secondaryCta: "Talk to a specialist",

    trust: [
      ["Special cargo", "Oversized components"],
      ["Multimodal", "Port, road and site"],
      ["Permits", "Document management"],
      ["Site delivery", "Final coordination"],
    ],

    overviewEyebrow: "Sector expertise",
    overviewTitle:
      "Specialized logistics for demanding energy projects.",
    overviewText:
      "We manage oversized components, sensitive equipment and critical cargo for solar farms, wind projects and energy infrastructure, coordinating routes, permits, handling and final delivery.",
    overviewButton: "Start my operation",

    pillars: [
      [
        "Technical planning",
        "We analyze dimensions, weight, routes, access and operational restrictions.",
      ],
      [
        "Permit management",
        "We coordinate documentation for routes, maneuvers and special cargo.",
      ],
      [
        "Multimodal transport",
        "We integrate ocean and road transport according to project requirements.",
      ],
      [
        "Site delivery",
        "We coordinate time windows, access, unloading and final reception.",
      ],
    ],

    "servicesEyebrow": "Specialized solutions",
    "servicesTitle": "Logistics services for every sector need.",
    "services": [
      [
        "Temperature-controlled logistics",
        "Solutions for perishable and sensitive products requiring specific thermal conditions."
      ],
      [
        "Road transport",
        "Domestic and international distribution with coordinated routes, timing and deliveries."
      ],
      [
        "Air freight",
        "Solutions for urgent operations, sensitive products and high-value cargo."
      ],
      [
        "Ocean freight",
        "International cargo management adapted to volume, destination and operational requirements."
      ],
      [
        "Warehousing and distribution",
        "Stock management, order preparation and distribution to clients, retail and logistics centers."
      ],
      [
        "Customs services",
        "Customs and documentation coordination for efficient import and export operations."
      ]
    ],

    processEyebrow: "Our process",
    processTitle:
      "A clear and coordinated operation from start to finish.",

    process: [
      [
        "We analyze the project",
        "We review dimensions, weight, component, origin, destination and site requirements.",
      ],
      [
        "We design the operation",
        "We define routes, permits, transport, equipment and required maneuvers.",
      ],
      [
        "We coordinate and monitor",
        "We manage documentation, operators and every critical project milestone.",
      ],
      [
        "We deliver to site",
        "We coordinate access, unloading, reception and operational closure.",
      ],
    ],
  },

  zh: {
    heroEyebrow: "可再生能源专项运输",
    heroTitle: "可再生能源",
    heroText:
      "为可再生能源项目提供物流解决方案，包括特殊运输、多式联运协调和最终工地交付。",
    primaryCta: "申请物流方案",
    secondaryCta: "联系专家",

    trust: [
      ["特殊货物", "超限组件"],
      ["多式联运", "港口、道路和工地"],
      ["许可", "文件管理"],
      ["工地交付", "最终协调"],
    ],

    overviewEyebrow: "行业专长",
    overviewTitle:
      "可再生能源行业运输与物流专家。",
    overviewText:
      "可再生能源行业需要快速响应、灵活性和精准的物流规划。Across Logistics 为风电场、太阳能电站及其他能源基础设施的建设、投产和维护提供物流协调服务。我们根据每个项目的具体需求设计高效的运输和国际协调方案，并致力于发展更加高效、负责任的物流解决方案，为向更可持续能源模式的转型提供支持。",
    overviewButton: "开始我的物流操作",

    pillars: [
      [
        "技术规划",
        "分析尺寸、重量、路线、通行条件和运营限制。",
      ],
      [
        "许可管理",
        "协调路线、操作和特殊货物所需文件。",
      ],
      [
        "多式联运",
        "根据项目需求整合海运和陆运。",
      ],
      [
        "工地交付",
        "协调时间窗口、通行、卸货和最终接收。",
      ],
    ],

    "servicesEyebrow": "专业解决方案",
    "servicesTitle": "满足行业不同需求的专业物流服务。",
    "services": [
      [
        "温控物流",
        "为易腐和温度敏感产品提供专业温控运输解决方案。"
      ],
      [
        "陆路运输",
        "通过路线、时间和交付规划协调国内及国际配送。"
      ],
      [
        "航空运输",
        "为紧急运输、敏感产品和高价值货物提供解决方案。"
      ],
      [
        "海运",
        "根据货量、目的地和运营需求管理国际海运业务。"
      ],
      [
        "仓储与配送",
        "提供库存管理、订单准备以及客户和零售配送服务。"
      ],
      [
        "海关服务",
        "协调进出口业务所需的海关和文件流程。"
      ]
    ],

    processEyebrow: "我们的流程",
    processTitle:
      "从开始到结束，清晰协调每一步。",

    process: [
      [
        "分析项目",
        "审核尺寸、重量、组件、始发地、目的地和工地要求。",
      ],
      [
        "设计物流方案",
        "确定路线、许可、运输方式、设备和所需操作。",
      ],
      [
        "协调并监控",
        "管理文件、操作人员和项目关键节点。",
      ],
      [
        "交付至工地",
        "协调通行、卸货、接收和运营收尾。",
      ],
    ],
  },
} satisfies Record<Locale, any>;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") {
    return "es";
  }

  const saved =
    window.localStorage.getItem("locale") ||
    window.localStorage.getItem("across-locale");

  if (saved === "es" || saved === "en" || saved === "zh") {
    return saved;
  }

  const htmlLang = document.documentElement.lang;

  if (htmlLang === "en" || htmlLang === "zh") {
    return htmlLang;
  }

  return "es";
}

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 38,
    height: 38,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "timer":
      return (
        <svg {...common}>
          <path d="M12 8v5l3 2" />
          <path d="M9 2h6" />
          <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z" />
        </svg>
      );

    case "plane":
      return (
        <svg {...common}>
          <path d="M10.5 13.5 3 21l2.8-8.2L3 10l9 1 5.7-5.7a2.1 2.1 0 0 1 3 3L15 14l1 9-2.8-2.8L5 23l7.5-7.5" />
        </svg>
      );

    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21" />
          <path d="M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9" />
        </svg>
      );

    case "box":
      return (
        <svg {...common}>
          <path d="m21 8-9-5-9 5 9 5 9-5Z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        </svg>
      );

    case "route":
      return (
        <svg {...common}>
          <path d="M4 6h8a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h11" />
          <path d="M4 6l3-3" />
          <path d="M4 6l3 3" />
        </svg>
      );

    case "document":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
          <path d="M14 3v5h5" />
          <path d="M8 13h8" />
          <path d="M8 17h6" />
        </svg>
      );

    case "tracking":
      return (
        <svg {...common}>
          <path d="M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      );

    case "truck":
      return (
        <svg {...common}>
          <path d="M3 7h11v9H3z" />
          <path d="M14 10h4l3 3v3h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );

    case "wind":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10 8 4c3-1 5 1 5 4" />
          <path d="m14 12 6-2c1 3-1 5-4 5" />
          <path d="m11 14-2 6c-3-1-3-4-1-6" />
          <path d="M12 14v7" />
        </svg>
      );

    case "solar":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="10" rx="1" />
          <path d="M7 7v10" />
          <path d="M12 7v10" />
          <path d="M17 7v10" />
          <path d="M3 12h18" />
          <path d="M12 17v4" />
          <path d="M8 21h8" />
        </svg>
      );

    default:
      return null;
  }
}

export default function EnergiasRenovablesSectorPage() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const updateLocale = (event?: Event) => {
      const rawDetail =
        event instanceof CustomEvent
          ? event.detail
          : null;

      const next =
        typeof rawDetail === "string"
          ? rawDetail
          : rawDetail &&
              typeof rawDetail === "object" &&
              "locale" in rawDetail
            ? String(
                (rawDetail as { locale?: unknown }).locale,
              )
            : rawDetail &&
                typeof rawDetail === "object" &&
                "language" in rawDetail
              ? String(
                  (rawDetail as { language?: unknown })
                    .language,
                )
              : null;

      if (
        next === "es" ||
        next === "en" ||
        next === "zh"
      ) {
        setLocale(next);
        return;
      }

      setLocale(getInitialLocale());
    };

    updateLocale();

    window.addEventListener(
      "storage",
      updateLocale,
    );

    window.addEventListener(
      "languagechange",
      updateLocale,
    );

    window.addEventListener(
      "localechange",
      updateLocale,
    );

    window.addEventListener(
      "across-language-change",
      updateLocale,
    );

    window.addEventListener(
      "across-locale-change",
      updateLocale,
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateLocale,
      );

      window.removeEventListener(
        "languagechange",
        updateLocale,
      );

      window.removeEventListener(
        "localechange",
        updateLocale,
      );

      window.removeEventListener(
        "across-language-change",
        updateLocale,
      );

      window.removeEventListener(
        "across-locale-change",
        updateLocale,
      );
    };
  }, []);

  const t = copy[locale];

const operationalEyebrow =
    locale === "es"
      ? "Capacidad operativa"
      : locale === "en"
        ? "Operational capability"
        : "运营能力";

  const operationalTitle =
    locale === "es"
      ? "Transporte especializado para proyectos e infraestructuras de energías renovables."
      : locale === "en"
        ? "Specialized transport for renewable energy projects and infrastructure."
        : "可再生能源项目与基础设施的专业运输。";

  const operationalIntro =
    locale === "es"
      ? "Coordinamos operaciones logísticas para parques eólicos, plantas solares y otros proyectos energéticos, adaptando cada transporte a las dimensiones, el peso y las características de los componentes. Integramos planificación de rutas, gestión de cargas especiales, transporte multimodal y coordinación de entregas en obra para mantener cada operación bajo control desde el origen hasta su destino final."
      : locale === "en"
        ? "We coordinate logistics operations for wind farms, solar plants and other renewable energy projects, adapting each transport operation to the dimensions, weight and characteristics of the components. We integrate route planning, special cargo management, multimodal transport and on-site delivery coordination from origin through final destination."
        : "我们为风电场、太阳能电站及其他可再生能源项目协调物流运营，根据设备的尺寸、重量和特性制定运输方案，并整合路线规划、特殊货物运输、多式联运及项目现场交付协调。";

  const operationalStages =
    locale === "es"
      ? [
          {
            number: "01",
            eyebrow: "Planificación técnica",
            title: "Cada operación diseñada según las características del proyecto.",
            text:
              "Analizamos dimensiones, pesos, puntos de origen, accesos y condiciones de entrega para definir una estrategia de transporte adaptada a cada componente.",
            details: [
              "Estudios de ruta y accesibilidad",
              "Planificación según peso y dimensiones",
              "Coordinación documental y permisos"
            ]
          },
          {
            number: "02",
            eyebrow: "Cargas especiales y transporte",
            title: "Soluciones para componentes que exigen una operativa específica.",
            text:
              "Coordinamos el movimiento de equipos y componentes mediante soluciones terrestres, marítimas y aéreas según las necesidades técnicas y geográficas de cada proyecto.",
            details: [
              "Componentes eólicos y fotovoltaicos",
              "Cargas sobredimensionadas y pesadas",
              "Transporte nacional e internacional"
            ]
          },
          {
            number: "03",
            eyebrow: "Coordinación y entrega en obra",
            title: "Control operativo hasta el punto final de instalación.",
            text:
              "Gestionamos los principales hitos del transporte y coordinamos las entregas según el calendario, los accesos y las necesidades operativas del proyecto.",
            details: [
              "Coordinación de entregas en obra",
              "Seguimiento de operaciones críticas",
              "Gestión de incidencias y tiempos de proyecto"
            ]
          }
        ]
      : locale === "en"
        ? [
          {
            number: "01",
            eyebrow: "Technical planning",
            title: "Every operation designed around the project requirements.",
            text:
              "We analyze dimensions, weights, origins, access conditions and delivery requirements to define a transport strategy adapted to each component.",
            details: [
              "Route and accessibility studies",
              "Planning according to weight and dimensions",
              "Documentation and permit coordination"
            ]
          },
          {
            number: "02",
            eyebrow: "Special cargo and transport",
            title: "Solutions for components requiring specialized operations.",
            text:
              "We coordinate the movement of equipment and components through road, ocean and air solutions according to the technical and geographical requirements of each project.",
            details: [
              "Wind and photovoltaic components",
              "Oversized and heavy cargo",
              "Domestic and international transport"
            ]
          },
          {
            number: "03",
            eyebrow: "Coordination and site delivery",
            title: "Operational control through the final installation point.",
            text:
              "We manage key transport milestones and coordinate deliveries according to project schedules, access conditions and operational requirements.",
            details: [
              "On-site delivery coordination",
              "Critical operation tracking",
              "Incident and project timing management"
            ]
          }
        ]
      : [
          {
            number: "01",
            eyebrow: "技术规划",
            title: "根据项目特点设计每项运输运营。",
            text:
              "分析设备尺寸、重量、始发地、道路条件和交付要求，为每个组件制定适合的运输策略。",
            details: [
              "路线与通行条件研究",
              "根据重量和尺寸制定运输计划",
              "文件与许可协调"
            ]
          },
          {
            number: "02",
            eyebrow: "特殊货物与运输",
            title: "为需要专业操作的能源设备提供运输方案。",
            text:
              "根据项目的技术和地理要求，通过陆运、海运和空运协调设备及组件运输。",
            details: [
              "风电与光伏设备组件",
              "超限及重型货物运输",
              "国内与国际运输"
            ]
          },
          {
            number: "03",
            eyebrow: "协调与项目现场交付",
            title: "运营控制直至最终安装地点。",
            text:
              "根据项目进度、现场通行条件和运营要求管理运输节点并协调最终交付。",
            details: [
              "项目现场交付协调",
              "关键运输运营跟踪",
              "异常与项目时效管理"
            ]
          }
        ];


  const trustIcons: IconName[] = [
    "box",
    "route",
    "document",
    "tracking",
  ];

  const pillarIcons: IconName[] = [
    "search",
    "document",
    "route",
    "truck",
  ];


  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>

        {/* =========================
            HERO
        ========================== */}

        <section
          className={styles.hero}
          data-aereo-hero="true"
          data-service-hero-home="true"
        >
          <Image
            src="/images/sectores/energiasrenovables.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 0px, 100vw"
            className={`${styles.heroImage} ${styles.heroImageDesktop}`}
          />

          <Image
            src="/images/sectores/energiasrenovables.png"
            alt={t.heroTitle}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 0px"
            className={`${styles.heroImage} ${styles.heroImageMobile}`}
          />

          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>
                {t.heroEyebrow}
              </span>

              <h1 className={styles.title}>
                {t.heroTitle}
              </h1>

              <p className={styles.subtitle}>
                {t.heroText}
              </p>

              <div className={styles.actions}>
                <Link href="/cotizacion">{t.primaryCta}</Link>
                <Link href="/contacto">{t.secondaryCta}</Link>
              </div>
            </div>
          </div>

          <div
            className={styles.commandBar}
            data-aereo-trust="true"
          >
            {t.trust.map(
              (
                [title, text]: string[],
                index: number,
              ) => (
                <div
                  key={title}
                  className={styles.commandItem}
                >
                  <i>
                    <Icon
                      name={trustIcons[index]}
                    />
                  </i>

                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              ),
            )}
          </div>
        </section>


        {/* =========================
            CERTIFICACIONES
        ========================== */}
        {/* =========================
            INTRODUCCIÓN
        ========================== */}

        <section className={styles.overview}>
          <div className={styles.overviewCopy}>
            <span className={styles.eyebrow}>
              {t.overviewEyebrow}
            </span>

            <h2>{t.overviewTitle}</h2>

            <p>{t.overviewText}</p>

            <Link href="/contacto">
              {t.overviewButton}
            </Link>
          </div>

          <div className={styles.pillars}>
            {t.pillars.map(
              (
                [title, text]: string[],
                index: number,
              ) => (
                <article key={title}>
                  <i>
                    <Icon
                      name={pillarIcons[index]}
                    />
                  </i>

                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ),
            )}
          </div>
        </section>


        {/* =========================
            SERVICIOS
        ========================== */}

        <section className={styles.services} style={{ "--mobile-bg": "url('/images/sectores/energiasrenovables.png')" } as CSSProperties}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.servicesEyebrow}</span>
            <h2>{t.servicesTitle}</h2>
          </div>

          <div className={styles.serviceGrid}>
            {t.services.map(([title, text]: string[], index: number) => {
              const icons: IconName[] = ["timer", "truck", "plane", "globe", "box", "document"];

              const serviceHrefs = [
                "/servicios/temperatura-controlada",
                "/servicios/transporte-terrestre",
                "/servicios/transporte-aereo",
                "/servicios/transporte-maritimo",
                "/servicios/almacen-distribucion",
                "/servicios/aduanas",
              ];

              return (
                <article key={title}>
                  <Link href={serviceHrefs[index]}>
                    <i>
                      <Icon name={icons[index]} />
                    </i>

                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>

                    <span aria-hidden="true">→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>


        {/* =========================
            PROCESO
        ========================== */}

        <section className={styles.operationalModel}>
          <div className={styles.operationalModelInner}>

            <header className={styles.operationalModelHead}>
              <span className={styles.operationalModelEyebrow}>
                {operationalEyebrow}
              </span>

              <h2>{operationalTitle}</h2>

              <p>{operationalIntro}</p>
            </header>

            <div className={styles.operationalStages}>
              {operationalStages.map((stage) => (
                <article
                  key={stage.number}
                  className={styles.operationalStage}
                >
                  <div className={styles.operationalStageNumber}>
                    {stage.number}
                  </div>

                  <div className={styles.operationalStageMain}>
                    <span>{stage.eyebrow}</span>

                    <h3>{stage.title}</h3>

                    <p>{stage.text}</p>
                  </div>

                  <ul className={styles.operationalStageDetails}>
                    {stage.details.map((detail) => (
                      <li key={detail}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

          </div>
        </section>

        <Certifications />

        <SectorLeadForm />


        {/* =========================
            CONTACTO
        ========================== */}

      </main>

      <Footer />
    </div>
  );
}
