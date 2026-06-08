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
    badge: "NUESTRAS OFICINAS",
    title: "Una red global para operaciones sin fronteras.",
    description:
      "Nuestra estructura global nos permite ofrecer soluciones logísticas integrales con la máxima eficiencia, control y cercanía en cualquier parte del mundo.",
    view: "Ver oficina →",
  },
  en: {
    badge: "OUR OFFICES",
    title: "A global network for borderless operations.",
    description:
      "Our global structure allows us to deliver integrated logistics solutions with maximum efficiency, control and proximity anywhere in the world.",
    view: "View office →",
  },
  zh: {
    badge: "我们的办公室",
    title: "面向无边界运营的全球网络。",
    description:
      "我们的全球化结构使我们能够在世界任何地方提供高效、可控且贴近客户的综合物流解决方案。",
    view: "查看办公室 →",
  },
} as const;

export default function OficinasPage() {
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
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.intro}>
          <span>{t.badge}</span>
          
          <p>{t.description}</p>
        </section>

        <section className={styles.heroStrip}>
          <Image
            src="/images/hero/hero-empresas.png"
            alt="Across Logistics global offices"
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
      </main>

      <Footer />
    </div>
  );
}
