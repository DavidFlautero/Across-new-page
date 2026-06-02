"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import styles from "../../servicios/_shared/ServicePage.module.css";

type Locale = "es" | "en" | "zh";


const team = [
  ["Vicente Castellano", "Director General", "/images/team/vicente_420x280_ok.jpg"],
  ["Isabel Gordillo", "Directora Financiera", "/images/team/isa_420x280_ok.jpg"],
  ["Juan Castellano", "Group Overseas Manager", "/images/team/juan_420x280.jpg"],
  ["Manel Luque", "Spain Country Manager", "/images/team/manel_420x280.jpg"],
  ["Ramón Macho", "China Country Manager", "/images/team/ramon_420x280.jpg"],
  ["Gonzalo Giner", "Steering Committee", "/images/team/gonzalo_420x280.jpg"],
  ["Simone Serra", "Netherlands Country Manager", "/images/team/simone_serra_420x280.png"],
  ["Xavier Sanz", "Global Intragroup Manager", "/images/team/xavi_420x280.jpg"],
  ["Nieves Ferrer", "Directora de Aduanas", "/images/team/nieves_420x280.jpg"],
  ["Ignacio Ardisana", "Director oficina Northern Spain", "/images/team/ignacio_420x280.jpg"],
  ["Álex Iglesias", "Director oficina Barcelona", "/images/team/alex_iglesias_420x280.png"],
  ["Miguel Giménez", "Director oficina Madrid", "/images/team/miguel_gimenez_420x280.png"],
  ["Marta Guillot", "Directora de oficina Valencia", "/images/team/marta_guillot_420x280.png"],
  ["Vicente Castellano", "UAE Country Manager", "/images/team/vicente_420x280_ok.jpg"],
  ["Andreia Monteiro", "Portugal Country Manager", "/images/team/andreia_monteiro_420x280.png"],
  ["Jesus Espinosa", "US Country Manager", "/images/team/jesus_espinosa_420x280.png"],
] as const;

const copy = {
  es: {
    eyebrow: "QUIÉNES SOMOS",
    title: "Soluciones logísticas integrales para empresas que operan sin fronteras.",
    description:
      "Across Logistics nace para resolver operaciones internacionales complejas con claridad, eficiencia y control. No trasladamos problemas a nuestros clientes: diseñamos soluciones logísticas ejecutables.",
    primary: "Solicitar información",
    secondary: "Ver oficinas",
    blockEyebrow: "ACROSS LOGISTICS",
    blockTitle: "Transporte, aduanas, almacén y distribución bajo una misma visión.",
    blockText:
      "Asesoramos, organizamos y coordinamos operaciones internacionales aplicando normas de comercio global para que cada mercancía llegue a destino en el menor tiempo posible y en perfectas condiciones.",
    servicesIntro:
      "Nuestra estructura combina equipo experto, credenciales internacionales y una red global preparada para responder donde la operación lo necesita.",
    servicesTitle: "Lo que define nuestra forma de operar.",
    services: [
      ["Soluciones integrales", "Diseñamos operaciones completas: transporte, documentación, aduanas, almacén y distribución."],
      ["Red mundial", "Oficinas, agentes y partners conectados en Europa, Asia, Oriente Medio y América."],
      ["Credenciales internacionales", "AEO/OEA, ISO 9001, IATA y GDP respaldan seguridad, calidad y cumplimiento."],
      ["Equipo especializado", "Profesionales en comercio internacional, operaciones, aduanas y coordinación global."],
      ["Control operativo", "Seguimiento, trazabilidad y comunicación clara durante toda la operación."],
      ["Sostenibilidad", "Soluciones multimodales y visión responsable para reducir impacto y mejorar eficiencia."]
    ],
    ctaEyebrow: "Across the world",
    ctaTitle: "Una red global con metodología común y equipos locales.",
    ctaText:
      "Nuestra estructura internacional nos permite ofrecer servicios logísticos en cualquier parte del mundo con la misma filosofía: control, cercanía, eficiencia y compromiso.",
    ctaButton: "Conocer nuestras oficinas →"
  },
  en: {
    eyebrow: "ABOUT US",
    title: "Integrated logistics solutions for companies operating without borders.",
    description:
      "Across Logistics was created to solve complex international operations with clarity, efficiency and control. We do not transfer problems to our clients: we design executable logistics solutions.",
    primary: "Request information",
    secondary: "View offices",
    blockEyebrow: "ACROSS LOGISTICS",
    blockTitle: "Transport, customs, warehousing and distribution under one vision.",
    blockText:
      "We advise, organize and coordinate international operations applying global trade standards so every shipment reaches its destination as quickly as possible and in perfect condition.",
    servicesIntro:
      "Our structure combines expert teams, international credentials and a global network ready to respond wherever the operation requires.",
    servicesTitle: "What defines the way we operate.",
    services: [
      ["Integrated solutions", "We design complete operations: transport, documentation, customs, warehousing and distribution."],
      ["Global network", "Offices, agents and partners connected across Europe, Asia, the Middle East and America."],
      ["International credentials", "AEO, ISO 9001, IATA and GDP support safety, quality and compliance."],
      ["Specialized team", "Professionals in international trade, operations, customs and global coordination."],
      ["Operational control", "Tracking, traceability and clear communication throughout the operation."],
      ["Sustainability", "Multimodal solutions and a responsible vision to reduce impact and improve efficiency."]
    ],
    ctaEyebrow: "Across the world",
    ctaTitle: "A global network with a shared methodology and local teams.",
    ctaText:
      "Our international structure allows us to provide logistics services anywhere in the world with the same philosophy: control, proximity, efficiency and commitment.",
    ctaButton: "Explore our offices →"
  },
  zh: {
    eyebrow: "关于我们",
    title: "为无边界运营企业提供一体化物流解决方案。",
    description:
      "Across Logistics 致力于以清晰、高效和可控的方式解决复杂国际物流业务。我们不把问题转嫁给客户，而是设计可执行的物流方案。",
    primary: "申请信息",
    secondary: "查看办公室",
    blockEyebrow: "ACROSS LOGISTICS",
    blockTitle: "以统一视角协调运输、海关、仓储与配送。",
    blockText:
      "我们按照国际贸易标准组织和协调全球物流业务，确保每票货物以最快速度、安全并以最佳状态到达目的地。",
    servicesIntro:
      "我们的结构结合专业团队、国际资质与全球网络，可在业务需要的任何地点快速响应。",
    servicesTitle: "定义我们运营方式的核心能力。",
    services: [
      ["一体化解决方案", "我们设计完整业务：运输、文件、海关、仓储与配送。"],
      ["全球网络", "连接欧洲、亚洲、中东和美洲的办公室、代理与合作伙伴。"],
      ["国际资质", "AEO、ISO 9001、IATA 与 GDP 支持安全、质量与合规。"],
      ["专业团队", "国际贸易、运营、海关与全球协调领域的专业人员。"],
      ["运营控制", "全流程追踪、可视化和清晰沟通。"],
      ["可持续发展", "通过多式联运和负责任方案降低影响并提升效率。"]
    ],
    ctaEyebrow: "全球网络",
    ctaTitle: "统一方法论与本地团队组成的全球网络。",
    ctaText:
      "我们的国际结构让我们能够在世界任何地方提供物流服务，并保持同样的理念：控制、贴近、高效与承诺。",
    ctaButton: "查看我们的办公室 →"
  }
} as const;

export default function QuienesSomosPage() {
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
        <Image
          src="/images/quienes1.png"
          alt="Across Logistics quienes somos"
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
            <Link href="/contacto">{t.primary}</Link>
            <Link href="/empresa/oficinas">{t.secondary}</Link>
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
            <Image
              src="/images/quienes2.png"
              alt="Across Logistics global team"
              fill
              className={styles.servicesImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>


        <section className={styles.teamSection}>
          <div className={styles.teamHead}>
            <span>NUESTRO EQUIPO</span>
            <h2>Dirección global, experiencia local y coordinación internacional.</h2>
            <p>
              Un equipo directivo conectado entre oficinas, países y áreas operativas
              para responder con precisión en cada mercado.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {team.map(([name, position, image]) => (
              <article key={`${name}-${position}`} className={styles.teamCard}>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className={styles.teamImage}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />

                <div className={styles.teamOverlay} />

                <div className={styles.teamInfo}>
                  <h3>{name}</h3>
                  <p>{position}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <span>{t.ctaEyebrow}</span>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <Link href="/empresa/oficinas">{t.ctaButton}</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
