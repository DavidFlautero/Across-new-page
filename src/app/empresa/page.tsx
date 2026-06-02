"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import styles from "./Empresa.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    eyebrow: "ACROSS LOGISTICS",
    title: "Soluciones logísticas integrales para operaciones globales.",
    text: "Ayudamos a empresas que operan internacionalmente a mover mercancía con más control, menos fricción y mayor capacidad de respuesta. No trasladamos problemas: diseñamos soluciones logísticas claras, eficientes y ejecutables.",
    cta: "Solicitar información",
    secondary: "Ver oficinas",
    blockTitle: "Coordinamos transporte, aduanas, almacén y distribución con una visión completa.",
    blockText: "Nuestro equipo asesora, organiza y ejecuta operaciones internacionales aplicando estándares de comercio global, control documental y coordinación operativa para que cada mercancía llegue a destino en tiempo, forma y condiciones óptimas.",
    cards: [
      ["Red internacional", "Oficinas, agentes y partners conectados para operar en Europa, Asia, Oriente Medio y América."],
      ["Credenciales globales", "AEO, ISO 9001, IATA y GDP como respaldo operativo para cargas exigentes."],
      ["Sostenibilidad", "Soluciones multimodales y visión responsable para reducir impacto y mejorar eficiencia."]
    ],
    network: "Una estructura global, una metodología común y equipos locales para responder donde la operación lo necesita.",
    button: "Conocer nuestras oficinas →"
  },
  en: {
    eyebrow: "ACROSS LOGISTICS",
    title: "Integrated logistics solutions for global operations.",
    text: "We help internationally active companies move cargo with more control, less friction and greater responsiveness. We do not transfer problems: we design clear, efficient and executable logistics solutions.",
    cta: "Request information",
    secondary: "View offices",
    blockTitle: "We coordinate transport, customs, warehousing and distribution with an end-to-end vision.",
    blockText: "Our team advises, organizes and executes international operations applying global trade standards, documentation control and operational coordination so every shipment reaches destination on time and in optimal condition.",
    cards: [
      ["International network", "Offices, agents and partners connected to operate across Europe, Asia, the Middle East and America."],
      ["Global credentials", "AEO, ISO 9001, IATA and GDP as operational backing for demanding cargo."],
      ["Sustainability", "Multimodal solutions and a responsible vision to reduce impact and improve efficiency."]
    ],
    network: "A global structure, a shared methodology and local teams ready to respond wherever the operation requires.",
    button: "Explore our offices →"
  },
  zh: {
    eyebrow: "ACROSS LOGISTICS",
    title: "面向全球业务的一体化物流解决方案。",
    text: "我们帮助国际化企业以更高控制力、更少摩擦和更强响应能力运输货物。我们不转移问题，而是设计清晰、高效且可执行的物流方案。",
    cta: "申请信息",
    secondary: "查看办公室",
    blockTitle: "我们以端到端视角协调运输、海关、仓储与配送。",
    blockText: "我们的团队按照国际贸易标准、文件控制和运营协调来组织全球物流业务，确保每票货物按时、安全并以最佳状态到达目的地。",
    cards: [
      ["国际网络", "连接欧洲、亚洲、中东和美洲的办公室、代理与合作伙伴。"],
      ["全球资质", "AEO、ISO 9001、IATA 与 GDP 为高要求货物提供运营保障。"],
      ["可持续发展", "通过多式联运和负责任的方案降低影响并提升效率。"]
    ],
    network: "全球结构、统一方法论与本地团队，让我们能够在业务需要的任何地方快速响应。",
    button: "查看我们的办公室 →"
  }
} as const;

export default function EmpresaPage() {
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
        <Image src="/images/hero/hero-empresas.png" alt="Across Logistics empresa" fill priority className={styles.heroImage} sizes="100vw" />
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <span>{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.text}</p>

          <div className={styles.actions}>
            <Link href="/contacto">{t.cta}</Link>
            <Link href="/empresa/oficinas">{t.secondary}</Link>
          </div>
        </div>
      </section>

      <Certifications />

      <main className={styles.content}>
        <section className={styles.intro}>
          <span>{t.eyebrow}</span>
          <h2>{t.blockTitle}</h2>
          <p>{t.blockText}</p>
        </section>

        <section className={styles.cards}>
          {t.cards.map(([title, text]) => (
            <article key={title}>
              <span />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className={styles.network}>
          <h2>{t.network}</h2>
          <Link href="/empresa/oficinas">{t.button}</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
