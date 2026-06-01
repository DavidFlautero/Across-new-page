"use client";

import { useEffect, useState } from "react";
import { locales, type Locale } from "@/i18n/across";
import styles from "./Hero.module.css";

const LOCALE_KEY = "across-locale";

function TrackingIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5h10v7H4z" />
      <path d="M14 9h3.5l2.5 3v1.5h-6z" />
      <path d="M7 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M17 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    </svg>
  );
}

function WarehouseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 5l9 5.5" />
      <path d="M5 10v9h14v-9" />
      <path d="M8 19v-6h8v6" />
      <path d="M10 15h4" />
    </svg>
  );
}

function ShipIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 15h16l-2 4H6z" />
      <path d="M7 15V9h8v6" />
      <path d="M10 9V6h4v3" />
      <path d="M4 21c1.2-.8 2.4-.8 3.6 0s2.4.8 3.6 0 2.4-.8 3.6 0" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11.5 21 4l-6.5 16-3.5-7-8-1.5Z" />
      <path d="m11 13 10-9" />
    </svg>
  );
}

const copy = {
  es: {
    titles: [
      "Logística internacional diseñada para operaciones que no pueden detenerse.",
      "Movemos mercancías críticas con precisión, velocidad y alcance global.",
      "Control total de su carga por aire, mar y tierra.",
      "Gestión integral de operaciones de transporte transfronterizo.",
      "Infraestructura logística premium para empresas globales.",
    ],
    cta: "Solicite su presupuesto ahora",
    secondary: "Explorar servicios",
    quickLinks: [
      { icon: TrackingIcon, title: "Tracking", subtitle: "Visibilidad de carga", href: "/tracking" },
      { icon: WarehouseIcon, title: "Almacén", subtitle: "Almacenamiento y distribución", href: "/#servicios" },
      { icon: ShipIcon, title: "Marítimo", subtitle: "Transporte marítimo", href: "/servicios/transporte-maritimo" },
      { icon: PlaneIcon, title: "Aéreo", subtitle: "Carga aérea prioritaria", href: "/servicios/transporte-aereo" },
    ],
  },
  en: {
    titles: [
      "International logistics built for operations that cannot stop.",
      "We move critical freight with precision, speed and global reach.",
      "Full control of your cargo by air, ocean and land.",
      "End-to-end management of cross-border transportation operations.",
      "Premium logistics infrastructure for global companies.",
    ],
    cta: "Request your quote now",
    secondary: "Explore services",
    quickLinks: [
      { icon: TrackingIcon, title: "Tracking", subtitle: "Cargo visibility", href: "/tracking" },
      { icon: WarehouseIcon, title: "Warehouse", subtitle: "Storage & distribution", href: "/#servicios" },
      { icon: ShipIcon, title: "Ocean", subtitle: "Ocean freight", href: "/servicios/transporte-maritimo" },
      { icon: PlaneIcon, title: "Air", subtitle: "Priority air cargo", href: "/servicios/transporte-aereo" },
    ],
  },
  zh: {
    titles: [
      "为不能停滞的全球业务打造国际物流体系。",
      "以精准、速度与全球覆盖运输关键货物。",
      "通过空运、海运与陆运全面掌控您的货物。",
      "跨境运输业务的一体化运营管理。",
      "面向全球企业的高端物流基础设施。",
    ],
    cta: "立即申请报价",
    secondary: "查看服务",
    quickLinks: [
      { icon: TrackingIcon, title: "追踪", subtitle: "货物可视化", href: "/tracking" },
      { icon: WarehouseIcon, title: "仓储", subtitle: "仓储与配送", href: "/#servicios" },
      { icon: ShipIcon, title: "海运", subtitle: "国际海运", href: "/servicios/transporte-maritimo" },
      { icon: PlaneIcon, title: "空运", subtitle: "优先空运货物", href: "/servicios/transporte-aereo" },
    ],
  },
} as const;

export default function Hero() {
  const [locale, setLocale] = useState<Locale>("es");
  const [activeTitle, setActiveTitle] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (saved && saved in locales) setLocale(saved);

    const onChange = (event: Event) => {
      setLocale((event as CustomEvent<Locale>).detail);
      setActiveTitle(0);
    };

    window.addEventListener("across-locale-change", onChange);
    return () => window.removeEventListener("across-locale-change", onChange);
  }, []);

  const t = copy[locale];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveTitle((current) => (current + 1) % t.titles.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [t.titles.length]);

  return (
    <section className={styles.hero}>
      <video className={styles.video} autoPlay muted loop playsInline>
        <source src="/videos/Across-Demo.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />
      <div className={styles.redGlow} />

      <div className={styles.content}>
        <div className={styles.titleWrap}>
          {t.titles.map((title, index) => (
            <h1
              key={title}
              className={`${styles.title} ${
                index === activeTitle ? styles.titleActive : ""
              }`}
            >
              {title}
            </h1>
          ))}
        </div>

        <div className={styles.line} />

        <div className={styles.actions}>
          <a href="/cotizacion" className={styles.primaryBtn}>
            {t.cta}
          </a>

          <a href="/#servicios" className={styles.secondaryBtn}>
            {t.secondary}
          </a>
        </div>
      </div>

      <div className={styles.commandBar}>
        {t.quickLinks.map((item) => {
          const Icon = item.icon;

          return (
            <a href={item.href} key={item.title} className={styles.commandItem}>
              <Icon />
              <div>
                <span>{item.title}</span>
                <small>{item.subtitle}</small>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
