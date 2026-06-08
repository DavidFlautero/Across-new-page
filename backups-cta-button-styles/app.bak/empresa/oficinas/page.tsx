"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { offices } from "@/data/offices";
import styles from "./Oficinas.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    badge: "OFICINAS INTERNACIONALES",
    title: "Una red internacional preparada para responder en origen, tránsito y destino.",
    description:
      "Across Logistics conecta oficinas, equipos locales y partners estratégicos para coordinar operaciones logísticas internacionales con cercanía, control y capacidad de respuesta en cada mercado.",
    primary: "Hablar con un especialista",
    secondary: "Solicitar solución logística",
    view: "Ver oficina →",

    ctaEyebrow: "RED INTERNACIONAL",
    ctaTitle: "Conectemos su operación con la oficina adecuada.",
    ctaText:
      "Analizamos origen, destino, tipo de carga, sector y necesidades operativas para dirigir su consulta al equipo Across Logistics correspondiente.",
    ctaPrimary: "Contactar oficina",
    ctaSecondary: "Solicitar cotización",
  },

  en: {
    badge: "INTERNATIONAL OFFICES",
    title: "An international network ready to respond at origin, transit and destination.",
    description:
      "Across Logistics connects offices, local teams and strategic partners to coordinate international logistics operations with proximity, control and responsiveness in each market.",
    primary: "Talk to a specialist",
    secondary: "Request logistics solution",
    view: "View office →",

    ctaEyebrow: "INTERNATIONAL NETWORK",
    ctaTitle: "Connect your operation with the right office.",
    ctaText:
      "We analyze origin, destination, cargo type, sector and operational needs to route your request to the appropriate Across Logistics team.",
    ctaPrimary: "Contact office",
    ctaSecondary: "Request quotation",
  },

  zh: {
    badge: "国际办公室",
    title: "覆盖始发地、运输过程与目的地的国际响应网络。",
    description:
      "Across Logistics 连接办公室、本地团队与战略合作伙伴，在每个市场以贴近客户、运营控制和快速响应能力协调国际物流操作。",
    primary: "联系专家",
    secondary: "申请物流方案",
    view: "查看办公室 →",

    ctaEyebrow: "国际网络",
    ctaTitle: "将您的业务连接到合适的办公室。",
    ctaText:
      "我们分析始发地、目的地、货物类型、行业和运营需求，将您的咨询转交给对应的 Across Logistics 团队。",
    ctaPrimary: "联系办公室",
    ctaSecondary: "申请报价",
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

export default function OficinasPage() {
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
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.intro}>
          <span>{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>

          <div className={styles.introActions}>
            <Link href="/contacto">{t.primary}</Link>
            <Link href="/cotizacion">{t.secondary}</Link>
          </div>
        </section>

        <section className={styles.heroStrip}>
          <Image
            src="/images/hero/hero-empresas.png"
            alt={t.title}
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </section>

        <section className={styles.grid}>
          {offices.map((office) => (
            <Link key={office.slug} href={office.url} className={styles.card}>
              <Image
                src={office.image}
                alt={office.city}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={styles.cardImage}
              />

              <div className={styles.cardOverlay} />

              <div className={styles.cardContent}>
                <small>{office.country}</small>
                <h2>{office.city}</h2>
                <p>{office.address}</p>
                <strong>{office.phone}</strong>
                <span>{t.view}</span>
              </div>
            </Link>
          ))}
        </section>

        <section className={styles.networkCta}>
          <div>
            <span>{t.ctaEyebrow}</span>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>

          <div className={styles.networkCtaActions}>
            <Link href="/contacto">{t.ctaPrimary}</Link>
            <Link href="/cotizacion">{t.ctaSecondary}</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
