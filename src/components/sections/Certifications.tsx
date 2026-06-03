"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { locales, type Locale } from "@/i18n/across";
import styles from "./Certifications.module.css";

const LOCALE_KEY = "across-locale";

const copy = {
  es: {
    eyebrow: "CERTIFICACIONES INTERNACIONALES",
    title: "Estándares que garantizan excelencia",
    text: "Cumplimos con certificaciones internacionales que respaldan calidad, seguridad y cumplimiento operativo en cada movimiento logístico.",
  },
  en: {
    eyebrow: "INTERNATIONAL CERTIFICATIONS",
    title: "Standards that guarantee excellence",
    text: "We comply with international certifications that support quality, security and operational excellence in every logistics movement.",
  },
  zh: {
    eyebrow: "国际认证",
    title: "保障卓越服务的标准",
    text: "我们遵循国际认证标准，为每一次物流运营提供质量、安全与合规保障。",
  },
} as const;

export default function Certifications() {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (saved && saved in locales) setLocale(saved);

    const onChange = (event: Event) => {
      const next = (event as CustomEvent<Locale>).detail;
      if (next && next in locales) setLocale(next);
    };

    window.addEventListener("across-locale-change", onChange);
    return () => window.removeEventListener("across-locale-change", onChange);
  }, []);

  const t = copy[locale];

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <span>{t.eyebrow}</span>
        <h2>{t.title}</h2>
        <p>{t.text}</p>
      </div>

      <div className={styles.imageWrap}>
        <Image
          src="/images/certificaciones-desktop.png"
          alt="Across Logistics Certifications"
          fill
          priority
          className={styles.image}
        />
      </div>
    </section>
  );
}
