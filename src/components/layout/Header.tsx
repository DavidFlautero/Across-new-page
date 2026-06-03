"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { acrossCopy, locales, type Locale } from "@/i18n/across";
import styles from "./Header.module.css";

const LOCALE_KEY = "across-locale";

const PRIVATE_AREA_URL =
  "https://id.factorialhr.com/login?&return_to=https%3A%2F%2Fapp.factorialhr.com%2F";

const menuCopy = {
  es: {
    services: [
      ["/servicios/transporte-aereo", "Transporte Aéreo"],
      ["/servicios/transporte-maritimo", "Transporte Marítimo"],
      ["/servicios/cargas-especiales", "Cargas Especiales"],
      ["/servicios/temperatura-controlada", "Carga de Temperatura Controlada"],
      ["/servicios/almacen-distribucion", "Almacén y Distribución"],
      ["/servicios/aduanas", "Servicios de Aduanas"],
      ["/servicios/e-commerce", "e-Commerce"],
    ],
    sectors: [
      ["/sectores/alimentacion-bebidas", "Alimentación & Bebidas"],
      ["/sectores/energias-renovables", "Energías Renovables"],
      ["/sectores/automocion", "Automoción"],
      ["/sectores/tecnologico", "Tecnológico"],
      ["/sectores/farmaceutico-sanitario", "Farmacéutico & Sanitario"],
      ["/sectores/consumo-distribucion", "Consumo & Distribución"],
      ["/sectores/quimico", "Químico"],
    ],
    company: [
      ["/empresa/quienes-somos", "Quiénes somos"],
      ["/empresa/oficinas", "Nuestras oficinas"],
      ["/empresa/sostenibilidad", "Sostenibilidad"],
      ["https://acrosslogistics.factorialhr.com/complaints", "Quejas y denuncias"],
      ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "Trabaja con nosotros"],
    ],
  },
  en: {
    services: [
      ["/servicios/transporte-aereo", "Air Freight"],
      ["/servicios/transporte-maritimo", "Ocean Freight"],
      ["/servicios/cargas-especiales", "Special Cargo"],
      ["/servicios/temperatura-controlada", "Temperature-Controlled Cargo"],
      ["/servicios/almacen-distribucion", "Warehousing & Distribution"],
      ["/servicios/aduanas", "Customs Services"],
      ["/servicios/e-commerce", "e-Commerce"],
    ],
    sectors: [
      ["/sectores/alimentacion-bebidas", "Food & Beverage"],
      ["/sectores/energias-renovables", "Renewable Energy"],
      ["/sectores/automocion", "Automotive"],
      ["/sectores/tecnologico", "Technology"],
      ["/sectores/farmaceutico-sanitario", "Pharma & Healthcare"],
      ["/sectores/consumo-distribucion", "Consumer & Distribution"],
      ["/sectores/quimico", "Chemical"],
    ],
    company: [
      ["/empresa/quienes-somos", "About us"],
      ["/empresa/oficinas", "Our offices"],
      ["/empresa/sostenibilidad", "Sustainability"],
      ["https://acrosslogistics.factorialhr.com/complaints", "Complaints channel"],
      ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "Work with us"],
    ],
  },
  zh: {
    services: [
      ["/servicios/transporte-aereo", "空运"],
      ["/servicios/transporte-maritimo", "海运"],
      ["/servicios/cargas-especiales", "特殊货运"],
      ["/servicios/temperatura-controlada", "温控货运"],
      ["/servicios/almacen-distribucion", "仓储与配送"],
      ["/servicios/aduanas", "海关服务"],
      ["/servicios/e-commerce", "电商物流"],
    ],
    sectors: [
      ["/sectores/alimentacion-bebidas", "食品饮料"],
      ["/sectores/energias-renovables", "可再生能源"],
      ["/sectores/automocion", "汽车行业"],
      ["/sectores/tecnologico", "科技行业"],
      ["/sectores/farmaceutico-sanitario", "医药与医疗"],
      ["/sectores/consumo-distribucion", "消费与配送"],
      ["/sectores/quimico", "化工行业"],
    ],
    company: [
      ["/empresa/quienes-somos", "关于我们"],
      ["/empresa/oficinas", "我们的办公室"],
      ["/empresa/sostenibilidad", "可持续发展"],
      ["https://acrosslogistics.factorialhr.com/complaints", "投诉渠道"],
      ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "加入我们"],
    ],
  },
} as const;

const company: [string, string][] = [
  ["/empresa/quienes-somos", "Quiénes somos"],
  ["/empresa/oficinas", "Nuestras oficinas"],
  ["/empresa/sostenibilidad", "Sostenibilidad"],
  ["https://acrosslogistics.factorialhr.com/complaints", "Quejas y denuncias"],
  ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "Trabaja con nosotros"],
];

const resources: [string, string][] = [
  ["/recursos", "FAQ & Recursos"],
  ["/blog", "Blog"],
];


function FlagIcon({ locale }: { locale: Locale }) {
  if (locale === "es") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#AA151B"/>
        <path d="M0 7h24v10H0z" fill="#F1BF00"/>
      </svg>
    );
  }

  if (locale === "en") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#012169"/>
        <path d="M0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="4"/>
        <path d="M0 0 24 24M24 0 0 24" stroke="#C8102E" strokeWidth="2"/>
        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7"/>
        <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="4"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#DE2910"/>
      <path d="M6.2 5.2 7 7.4h2.3L7.4 8.8l.8 2.2-2-1.35L4.2 11l.8-2.2-1.9-1.4h2.3l.8-2.2Z" fill="#FFDE00"/>
    </svg>
  );
}


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileSection, setMobileSection] = useState<
    null | "services" | "sectors" | "company" | "resources"
  >(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (saved && saved in locales) setLocale(saved);
  }, []);

  function changeLocale(next: Locale) {
    setLocale(next);
    window.localStorage.setItem(LOCALE_KEY, next);
    window.dispatchEvent(new CustomEvent("across-locale-change", { detail: next }));
  }

  const t = acrossCopy[locale].nav;
  const menu = menuCopy[locale];

  const renderLinks = (items: readonly (readonly [string, string])[]) =>
    items.map(([href, label]) => {
      const external = href.startsWith("http");

      if (external) {
        return (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }

      return (
        <Link key={href} href={href}>
          {label}
        </Link>
      );
    });

  return (
    <header className={styles.wrapper}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo-ACROSS-Blanco.svg"
            alt="Across Logistics"
            width={210}
            height={64}
            priority
          />
        </Link>

        <nav className={styles.nav}>
          <Link href="/tracking">{t.tracking}</Link>
          <a href={PRIVATE_AREA_URL} target="_blank" rel="noopener noreferrer">
            {t.private}
          </a>

          <div className={styles.divider} />

          <Link href="/">{t.home}</Link>

          <div className={styles.dropdown} onMouseEnter={() => setOpenMenu("services")} onMouseLeave={() => setOpenMenu(null)}>
            <button type="button" className={styles.dropdownTrigger}>{t.services} <span>▾</span></button>
            <div className={`${styles.dropdownMenu} ${openMenu === "services" ? styles.dropdownVisible : ""}`}>
              {renderLinks(menu.services)}
            </div>
          </div>

          <div className={styles.dropdown} onMouseEnter={() => setOpenMenu("sectors")} onMouseLeave={() => setOpenMenu(null)}>
            <button type="button" className={styles.dropdownTrigger}>{t.sectors} <span>▾</span></button>
            <div className={`${styles.dropdownMenu} ${openMenu === "sectors" ? styles.dropdownVisible : ""}`}>
              {renderLinks(menu.sectors)}
            </div>
          </div>

          <div className={styles.dropdown} onMouseEnter={() => setOpenMenu("company")} onMouseLeave={() => setOpenMenu(null)}>
            <button type="button" className={styles.dropdownTrigger}>{t.company} <span>▾</span></button>

            <div className={`${styles.dropdownMenu} ${openMenu === "company" ? styles.dropdownVisible : ""}`}>
              {renderLinks(menu.company)}
            </div>
          </div>
          <div
            className={styles.dropdown}
            onMouseEnter={() => setOpenMenu("resources")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button type="button" className={styles.dropdownTrigger}>
              {t.resources} <span>▾</span>
            </button>

            <div
              className={`${styles.dropdownMenu} ${
                openMenu === "resources" ? styles.dropdownVisible : ""
              }`}
            >
              {resources.map(([href, label]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/contacto">{t.contact}</Link>
        </nav>

        <div className={styles.language}>
          {(Object.keys(locales) as Locale[]).map((key) => (
            <button
              key={key}
              type="button"
              className={key === locale ? styles.languageActive : ""}
              onClick={() => changeLocale(key)}
            >
              <FlagIcon locale={key} />
            </button>
          ))}
        </div>

        <div className={styles.mobileLang}>
          {(Object.keys(locales) as Locale[]).map((key) => (
            <button
              key={key}
              type="button"
              className={key === locale ? styles.languageActive : ""}
              onClick={() => changeLocale(key)}
            >
              <FlagIcon locale={key} />
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.mobileButton}
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      </div>

      <div
        className={`${styles.mobileBackdrop} ${mobileOpen ? styles.mobileBackdropVisible : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelVisible : ""}`}>
        <button type="button" className={styles.closeButton} onClick={() => setMobileOpen(false)}>
          ×
        </button>

        <Image
          src="/images/logo-ACROSS-Blanco.svg"
          alt="Across Logistics"
          width={190}
          height={58}
          className={styles.mobileLogo}
        />

        <nav className={styles.mobileLinks}>
          {!mobileSection && (
            <>
              <Link href="/" onClick={() => setMobileOpen(false)}>
                {t.home}
              </Link>

              <Link href="/tracking" onClick={() => setMobileOpen(false)}>
                {t.tracking}
              </Link>

              <button type="button" onClick={() => setMobileSection("services")}>
                {t.services} <span>›</span>
              </button>

              <button type="button" onClick={() => setMobileSection("sectors")}>
                {t.sectors} <span>›</span>
              </button>

              <button type="button" onClick={() => setMobileSection("company")}>
                {t.company} <span>›</span>
              </button>

              <button type="button" onClick={() => setMobileSection("resources")}>
                {t.resources} <span>›</span>
              </button>

              <Link href="/contacto" onClick={() => setMobileOpen(false)}>
                {t.contact}
              </Link>
            </>
          )}

          {mobileSection === "services" && (
            <div className={styles.mobileSubmenu}>
              <button
                type="button"
                className={styles.mobileBack}
                onClick={() => setMobileSection(null)}
              >
                ← Volver
              </button>

              {menu.services.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {mobileSection === "sectors" && (
            <div className={styles.mobileSubmenu}>
              <button
                type="button"
                className={styles.mobileBack}
                onClick={() => setMobileSection(null)}
              >
                ← Volver
              </button>

              {menu.sectors.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {mobileSection === "company" && (
            <div className={styles.mobileSubmenu}>
              <button
                type="button"
                className={styles.mobileBack}
                onClick={() => setMobileSection(null)}
              >
                ← Volver
              </button>

              {menu.company.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {mobileSection === "resources" && (
            <div className={styles.mobileSubmenu}>
              <button
                type="button"
                className={styles.mobileBack}
                onClick={() => setMobileSection(null)}
              >
                ← Volver
              </button>

              {resources.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>
    </header>
  );
}
