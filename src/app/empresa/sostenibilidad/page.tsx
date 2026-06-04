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
    eyebrow: "SUSTAINABLE LOGISTICS",
    title: "Logística y sostenibilidad ambiental para cadenas de suministro responsables.",
    description:
      "La sostenibilidad es un factor clave para la estabilidad económica y el crecimiento a largo plazo. En Across Logistics integramos el pensamiento ecológico en nuestra forma de planificar, coordinar y optimizar cada operación.",
    primary: "Conocer nuestras soluciones",
    secondary: "Hablar con un especialista",

    blockEyebrow: "COMPROMISO AMBIENTAL",
    blockTitle: "Tecnología, multimodalidad y reducción de impacto en cada proyecto.",
    blockText:
      "Nuestro compromiso es buscar tecnologías de conducción alternativas, soluciones logísticas multimodales y modelos operativos que ayuden a reducir emisiones, optimizar recursos y avanzar hacia cadenas de suministro más responsables.",

    servicesIntro:
      "Trabajamos para combatir el cambio climático desde la logística: mejor planificación, menor impacto, compensación de emisiones y decisiones operativas más sostenibles.",
    servicesTitle: "Ejes de nuestra sostenibilidad ambiental.",

    services: [
      [
        "Optimización de rutas",
        "Planificamos recorridos, conexiones y tiempos para reducir trayectos innecesarios, esperas y consumo operativo.",
      ],
      [
        "Soluciones multimodales",
        "Integramos transporte marítimo, terrestre, aéreo y almacenaje para elegir la alternativa más eficiente según cada operación.",
      ],
      [
        "Consolidación de cargas",
        "Agrupamos mercancías cuando la operación lo permite para mejorar ocupación, reducir movimientos y optimizar costes.",
      ],
      [
        "Eficiencia energética",
        "Impulsamos procesos logísticos más eficientes para disminuir desperdicio operativo y consumo innecesario de recursos.",
      ],
      [
        "Reducción de emisiones",
        "Buscamos alternativas de transporte y planificación que contribuyan a reducir la huella ambiental de la cadena logística.",
      ],
      [
        "Mejora continua",
        "Medimos, revisamos y optimizamos procesos para avanzar hacia operaciones más limpias, responsables y eficientes.",
      ],
    ],

    ctaEyebrow: "NEUTRALIDAD EN CARBONO",
    ctaTitle: "Avancemos hacia operaciones logísticas con menor impacto ambiental.",
    ctaText:
      "Ofrecemos a nuestros clientes la posibilidad de compensar emisiones de CO₂ mediante proyectos sostenibles, combinando eficiencia logística, multimodalidad y compromiso ambiental.",
    ctaPrimary: "Hablar con un especialista",
    ctaSecondary: "Conocer soluciones",
  },

  en: {
    eyebrow: "SUSTAINABLE LOGISTICS",
    title: "Logistics and environmental sustainability for responsible supply chains.",
    description:
      "Sustainability is a key factor for economic stability and long-term growth. At Across Logistics, we integrate ecological thinking into the way we plan, coordinate and optimize every operation.",
    primary: "Explore our solutions",
    secondary: "Talk to a specialist",

    blockEyebrow: "ENVIRONMENTAL COMMITMENT",
    blockTitle: "Technology, multimodality and impact reduction in every project.",
    blockText:
      "Our commitment is to seek alternative driving technologies, multimodal logistics solutions and operating models that help reduce emissions, optimize resources and move toward more responsible supply chains.",

    servicesIntro:
      "We work to fight climate change through logistics: better planning, lower impact, emissions offsetting and more sustainable operational decisions.",
    servicesTitle: "Pillars of our environmental sustainability.",

    services: [
      [
        "Route optimization",
        "We plan routes, connections and timing to reduce unnecessary trips, waiting times and operational consumption.",
      ],
      [
        "Multimodal solutions",
        "We integrate ocean, road, air transport and warehousing to choose the most efficient alternative for each operation.",
      ],
      [
        "Cargo consolidation",
        "We group shipments whenever the operation allows it to improve utilization, reduce movements and optimize costs.",
      ],
      [
        "Energy efficiency",
        "We promote more efficient logistics processes to reduce operational waste and unnecessary resource consumption.",
      ],
      [
        "Emission reduction",
        "We seek transport and planning alternatives that help reduce the environmental footprint of the logistics chain.",
      ],
      [
        "Continuous improvement",
        "We measure, review and optimize processes to move toward cleaner, more responsible and efficient operations.",
      ],
    ],

    ctaEyebrow: "CARBON NEUTRALITY",
    ctaTitle: "Let’s move toward logistics operations with lower environmental impact.",
    ctaText:
      "We offer our clients the possibility to offset CO₂ emissions through sustainable projects, combining logistics efficiency, multimodality and environmental commitment.",
    ctaPrimary: "Talk to a specialist",
    ctaSecondary: "Explore solutions",
  },

  zh: {
    eyebrow: "可持续物流",
    title: "面向负责任供应链的物流与环境可持续发展。",
    description:
      "可持续发展是经济稳定和长期增长的关键因素。在 Across Logistics，我们将生态思维融入每一次物流操作的规划、协调和优化。",
    primary: "了解我们的解决方案",
    secondary: "联系专家",

    blockEyebrow: "环境承诺",
    blockTitle: "在每个项目中结合技术、多式联运与影响降低。",
    blockText:
      "我们的承诺是寻找替代驾驶技术、多式联运物流方案和运营模式，以帮助减少排放、优化资源并推动更负责任的供应链。",

    servicesIntro:
      "我们通过物流应对气候变化：更好的规划、更低的影响、排放补偿以及更可持续的运营决策。",
    servicesTitle: "我们的环境可持续发展重点。",

    services: [
      [
        "路线优化",
        "规划路线、连接和时效，减少不必要行程、等待时间和运营消耗。",
      ],
      [
        "多式联运方案",
        "整合海运、陆运、空运与仓储，为每项业务选择更高效的方案。",
      ],
      [
        "货物合并",
        "在条件允许时合并货物，提高装载率、减少移动并优化成本。",
      ],
      [
        "能源效率",
        "推动更高效的物流流程，减少运营浪费和不必要资源消耗。",
      ],
      [
        "减少排放",
        "寻找有助于降低物流链环境足迹的运输与规划方案。",
      ],
      [
        "持续改进",
        "持续测量、审查和优化流程，推动更清洁、更负责任和更高效的运营。",
      ],
    ],

    ctaEyebrow: "碳中和",
    ctaTitle: "让我们推动更低环境影响的物流运营。",
    ctaText:
      "我们为客户提供通过可持续项目补偿 CO₂ 排放的可能性，将物流效率、多式联运和环境承诺结合起来。",
    ctaPrimary: "联系专家",
    ctaSecondary: "了解解决方案",
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

export default function SostenibilidadPage() {
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
          src="/images/sosten1.png"
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
            <Link href="/servicios">{t.primary}</Link>
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
              src="/images/sosten2.png"
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
            <Link href="/contacto">{t.ctaPrimary}</Link>
            <Link href="/servicios">{t.ctaSecondary}</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
