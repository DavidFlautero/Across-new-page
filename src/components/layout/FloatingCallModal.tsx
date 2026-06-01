"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingCallModal.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    button: "Solicitar llamada de un agente comercial",
    title: "Agende una llamada",
    subtitle: "Para un asesoramiento personalizado",
    date: "Fecha",
    time: "Hora",
    name: "Nombre",
    company: "Empresa",
    phone: "Teléfono",
    email: "Email",
    country: "País",
    description: "Breve descripción",
    submit: "Reservar cita de llamada",
  },
  en: {
    button: "Request a call from a sales agent",
    title: "Schedule a call",
    subtitle: "For personalized advice",
    date: "Date",
    time: "Time",
    name: "Name",
    company: "Company",
    phone: "Phone",
    email: "Email",
    country: "Country",
    description: "Brief description",
    submit: "Book call appointment",
  },
  zh: {
    button: "申请商务顾问来电",
    title: "预约通话",
    subtitle: "获取个性化咨询",
    date: "日期",
    time: "时间",
    name: "姓名",
    company: "公司",
    phone: "电话",
    email: "邮箱",
    country: "国家",
    description: "简要说明",
    submit: "预约来电",
  },
} as const;

export default function FloatingCallModal() {
  const [open, setOpen] = useState(false);
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
    <>
      <button className={styles.floatingButton} onClick={() => setOpen(true)}>
        <span>☎</span>
        <strong>{t.button}</strong>
      </button>

      {open && (
        <div className={styles.backdrop}>
          <div className={styles.modal}>
            <button className={styles.close} onClick={() => setOpen(false)}>
              ×
            </button>

            <div className={styles.head}>
              <div className={styles.icon}>☎</div>
              <div>
                <h2>{t.title}</h2>
                <p>{t.subtitle}</p>
              </div>
            </div>

            <form className={styles.form}>
              <div className={styles.two}>
                <label>
                  {t.date}:
                  <input type="date" min={new Date().toISOString().split("T")[0]} />
                </label>

                <label>
                  {t.time}:
                  <input type="time" />
                </label>
              </div>

              <label>{t.name}:<input type="text" /></label>
              <label>{t.company}:<input type="text" /></label>

              <div className={styles.two}>
                <label>{t.phone}:<input type="tel" /></label>
                <label>{t.email}:<input type="email" /></label>
              </div>

              <label>{t.country}:<input type="text" /></label>
              <label>{t.description}:<textarea rows={3} /></label>

              <button type="submit" className={styles.submit}>
                {t.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
