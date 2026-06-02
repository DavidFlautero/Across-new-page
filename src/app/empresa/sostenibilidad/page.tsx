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
    eyebrow: "SOSTENIBILIDAD AMBIENTAL",
    title: "Logística más eficiente, menor impacto ambiental.",
    description:
      "Trabajamos para reducir el impacto climático de las operaciones logísticas mediante planificación inteligente, eficiencia energética, soluciones multimodales y una gestión más responsable de cada envío.",
    primary: "Solicitar información",
    secondary: "Conocer Across",
    blockEyebrow: "COMPROMISO CON EL CLIMA",
    blockTitle: "Mover mercancía también implica cuidar el entorno donde operamos.",
    blockText:
      "La logística tiene un impacto directo en emisiones, consumo energético, ocupación de recursos y eficiencia de las cadenas de suministro. Por eso diseñamos operaciones que priorizan rutas mejor planificadas, consolidación de cargas, transporte multimodal, reducción de movimientos innecesarios y decisiones logísticas más responsables.",
    servicesIntro:
      "Nuestro enfoque ambiental combina eficiencia operativa con reducción de impacto: menos kilómetros improductivos, más control y mejor planificación.",
    servicesTitle: "Ejes de nuestra logística sostenible.",
    services: [
      ["Optimización de rutas", "Planificamos recorridos y conexiones para reducir trayectos innecesarios, tiempos muertos y consumo operativo."],
      ["Soluciones multimodales", "Combinamos marítimo, terrestre, aéreo y almacén para elegir la alternativa más eficiente según cada operación."],
      ["Consolidación de cargas", "Agrupamos mercancías cuando la operación lo permite para mejorar ocupación, reducir movimientos y optimizar costes."],
      ["Eficiencia energética", "Impulsamos procesos logísticos más eficientes para disminuir desperdicio operativo y consumo innecesario de recursos."],
      ["Reducción de emisiones", "Buscamos alternativas de transporte y planificación que contribuyan a reducir la huella ambiental de la cadena logística."],
      ["Mejora continua", "Medimos, revisamos y optimizamos procesos para avanzar hacia operaciones más limpias, responsables y eficientes."]
    ],
    ctaEyebrow: "Across Logistics",
    ctaTitle: "Una logística más responsable empieza con una mejor planificación.",
    ctaText:
      "Diseñemos una operación que combine rendimiento, control, cumplimiento y menor impacto ambiental.",
    ctaButton: "Hablar con un especialista →"
  },
  en: {
    eyebrow: "ENVIRONMENTAL SUSTAINABILITY",
    title: "More efficient logistics, lower environmental impact.",
    description:
      "We work to reduce the climate impact of logistics operations through smarter planning, energy efficiency, multimodal solutions and more responsible shipment management.",
    primary: "Request information",
    secondary: "About Across",
    blockEyebrow: "CLIMATE COMMITMENT",
    blockTitle: "Moving cargo also means caring for the environment where we operate.",
    blockText:
      "Logistics has a direct impact on emissions, energy consumption, resource use and supply chain efficiency. That is why we design operations that prioritize better planned routes, cargo consolidation, multimodal transport, fewer unnecessary movements and more responsible logistics decisions.",
    servicesIntro:
      "Our environmental approach combines operational efficiency with impact reduction: fewer unproductive kilometers, more control and better planning.",
    servicesTitle: "Pillars of our sustainable logistics.",
    services: [
      ["Route optimization", "We plan routes and connections to reduce unnecessary trips, idle time and operational consumption."],
      ["Multimodal solutions", "We combine ocean, road, air and warehousing to choose the most efficient alternative for each operation."],
      ["Cargo consolidation", "We group shipments whenever possible to improve utilization, reduce movements and optimize costs."],
      ["Energy efficiency", "We promote more efficient logistics processes to reduce operational waste and unnecessary resource consumption."],
      ["Emission reduction", "We seek transport and planning alternatives that help reduce the environmental footprint of the logistics chain."],
      ["Continuous improvement", "We measure, review and optimize processes to move toward cleaner, more responsible and efficient operations."]
    ],
    ctaEyebrow: "Across Logistics",
    ctaTitle: "More responsible logistics starts with better planning.",
    ctaText:
      "Let’s design an operation that combines performance, control, compliance and lower environmental impact.",
    ctaButton: "Talk to a specialist →"
  },
  zh: {
    eyebrow: "环境可持续发展",
    title: "更高效的物流，更低的环境影响。",
    description:
      "我们通过智能规划、能源效率、多式联运和更负责任的货运管理，努力降低物流运营对气候的影响。",
    primary: "申请信息",
    secondary: "了解 Across",
    blockEyebrow: "气候承诺",
    blockTitle: "运输货物，也意味着保护我们运营所在的环境。",
    blockText:
      "物流会直接影响排放、能源消耗、资源使用和供应链效率。因此，我们设计更合理的路线、货物合并、多式联运方案，减少不必要移动，并推动更负责任的物流决策。",
    servicesIntro:
      "我们的环境方案将运营效率与影响降低结合起来：减少无效里程、增强控制并提升规划质量。",
    servicesTitle: "我们的可持续物流重点。",
    services: [
      ["路线优化", "规划路线与连接，减少不必要行程、等待时间和运营消耗。"],
      ["多式联运方案", "结合海运、陆运、空运与仓储，为每项业务选择更高效的方案。"],
      ["货物合并", "在条件允许时合并货物，提高装载率、减少移动并优化成本。"],
      ["能源效率", "推动更高效的物流流程，减少运营浪费和不必要资源消耗。"],
      ["减少排放", "寻找有助于降低物流链环境足迹的运输与规划方案。"],
      ["持续改进", "持续测量、审查和优化流程，推动更清洁、更负责任和更高效的运营。"]
    ],
    ctaEyebrow: "Across Logistics",
    ctaTitle: "更负责任的物流，始于更好的规划。",
    ctaText:
      "让我们设计兼具绩效、控制、合规与更低环境影响的物流运营。",
    ctaButton: "联系专家 →"
  }
} as const;

export default function SostenibilidadPage() {
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
        <Image src="/images/sosten1.png" alt="Sostenibilidad Across Logistics" fill priority className={styles.heroImage} sizes="100vw" />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>

          <div className={styles.actions}>
            <Link href="/contacto">{t.primary}</Link>
            <Link href="/empresa/quienes-somos">{t.secondary}</Link>
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
            <Image src="/images/sosten2.png" alt="Operación logística sostenible" fill className={styles.servicesImage} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
        </section>

        <section className={styles.cta}>
          <span>{t.ctaEyebrow}</span>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <Link href="/contacto">{t.ctaButton}</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
