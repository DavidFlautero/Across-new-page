"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Tracking.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    badge: "TRACKING",
    title: "Seguimiento de contenedores y operaciones logísticas.",
    text: "Introduzca su número de contenedor o referencia de tracking para consultar el estado disponible.",
    label: "Número de tracking / contenedor",
    placeholder: "Ej: MSKU1234567",
    button: "Consultar tracking",
    empty: "Ingrese un número de tracking para realizar la consulta.",
    helpTitle: "¿Necesita más información?",
    helpText:
      "Si no obtiene resultados o necesita asistencia sobre su operación, contacte con nuestro equipo.",
    contact: "Contactar con Across",
  },
  en: {
    badge: "TRACKING",
    title: "Container and logistics operation tracking.",
    text: "Enter your container number or tracking reference to check the available status.",
    label: "Tracking / container number",
    placeholder: "E.g. MSKU1234567",
    button: "Track shipment",
    empty: "Enter a tracking number to search.",
    helpTitle: "Need more information?",
    helpText:
      "If no results are available or you need support with your operation, contact our team.",
    contact: "Contact Across",
  },
  zh: {
    badge: "货物跟踪",
    title: "集装箱与物流操作跟踪。",
    text: "请输入集装箱号或跟踪参考号，以查询可用状态。",
    label: "跟踪号 / 集装箱号",
    placeholder: "例如：MSKU1234567",
    button: "查询跟踪",
    empty: "请输入跟踪号进行查询。",
    helpTitle: "需要更多信息？",
    helpText: "如果没有结果或需要操作支持，请联系我们的团队。",
    contact: "联系 Across",
  },
} as const;

function cleanTrackingCode(value: string) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

export default function TrackingPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [trackingCode, setTrackingCode] = useState("");
  const [submittedCode, setSubmittedCode] = useState("default-container-code");
  const [error, setError] = useState("");

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

  useEffect(() => {
    const receiveShipsgoMessage = (event: MessageEvent) => {
      if (!String(event.origin).includes("shipsgo.com")) return;

      const containerCode = event.data?.Parameters?.ContainerCode;
      if (typeof containerCode === "string" && containerCode.trim()) {
        setSubmittedCode(cleanTrackingCode(containerCode));
      }
    };

    window.addEventListener("message", receiveShipsgoMessage);
    return () => window.removeEventListener("message", receiveShipsgoMessage);
  }, []);

  const t = copy[locale];

  const iframeSrc = useMemo(() => {
    return `https://shipsgo.com/iframe/where-is-my-container/${encodeURIComponent(
      submittedCode || "default-container-code"
    )}`;
  }, [submittedCode]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const code = cleanTrackingCode(trackingCode);

    if (!code) {
      setError(t.empty);
      return;
    }

    setError("");
    setSubmittedCode(code);
  }

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

            <form className={styles.searchBox} onSubmit={submit}>
              <label>
                {t.label}
                <div>
                  <input
                    value={trackingCode}
                    onChange={(event) => setTrackingCode(event.target.value)}
                    placeholder={t.placeholder}
                    autoComplete="off"
                  />
                  <button type="submit">{t.button}</button>
                </div>
              </label>

              {error && <p>{error}</p>}
            </form>
          </div>
        </section>

        <section className={styles.trackingShell}>
          <div className={styles.mapCard}>
            <iframe
              key={iframeSrc}
              src={iframeSrc}
              title="Across Logistics tracking"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="geolocation"
            />
          </div>

          <aside className={styles.helpCard}>
            <span>Across Logistics</span>
            <h2>{t.helpTitle}</h2>
            <p>{t.helpText}</p>
            <a href="/contacto">{t.contact}</a>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
