"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Tracking.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    badge: "TRACKING",
    title: "Seguimiento de contenedores y operaciones logísticas.",
    text:
      "Consulte el estado disponible de su operación mediante el sistema de seguimiento de contenedores.",
    notice:
      "En caso de no aparecer resultados en la búsqueda, por favor póngase en contacto con nosotros.",
    contact: "Contactar con Across",
    iframeTitle: "Seguimiento de contenedores Across Logistics",
  },
  en: {
    badge: "TRACKING",
    title: "Container and logistics operation tracking.",
    text:
      "Check the available status of your operation through the container tracking system.",
    notice:
      "If no results appear in the search, please contact our team.",
    contact: "Contact Across",
    iframeTitle: "Across Logistics container tracking",
  },
  zh: {
    badge: "货物跟踪",
    title: "集装箱与物流操作跟踪。",
    text: "通过集装箱跟踪系统查询您的操作状态。",
    notice: "如果搜索没有结果，请联系我们的团队。",
    contact: "联系 Across",
    iframeTitle: "Across Logistics 集装箱跟踪",
  },
} as const;

export default function TrackingPage() {
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

      <main>
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span>{t.badge}</span>
            <h1>{t.title}</h1>
            <p>{t.text}</p>
          </div>
        </section>

        <section className={styles.trackingShell}>
          <div className={styles.mapCard}>
            <iframe
              src="https://shipsgo.com/iframe/where-is-my-container/default-container-code"
              title={t.iframeTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="geolocation"
            />
          </div>

          <div className={styles.noticeCard}>
            <p>{t.notice}</p>
            <Link href="/contacto">{t.contact}</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
