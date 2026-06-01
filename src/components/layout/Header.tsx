"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { acrossCopy, locales, type Locale } from "@/i18n/across";
import styles from "./Header.module.css";

const LOCALE_KEY = "across-locale";

const PRIVATE_AREA_URL =
  "https://id.factorialhr.com/login?&return_to=https%3A%2F%2Fapp.factorialhr.com%2F";

const COMPLAINTS_URL = "https://acrosslogistics.factorialhr.com/complaints";
const CAREERS_URL =
  "https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..";

const services: [string, string][] = [
  ["/servicios/transporte-aereo", "Transporte Aéreo"],
  ["/servicios/transporte-maritimo", "Transporte Marítimo"],
  ["/servicios/cargas-especiales", "Cargas Especiales"],
  ["/servicios/temperatura-controlada", "Temperatura Controlada"],
  ["/servicios/almacen-distribucion", "Almacén y Distribución"],
  ["/servicios/aduanas", "Servicios de Aduanas"],
  ["/servicios/e-commerce", "e-Commerce"],
];

const sectors: [string, string][] = [
  ["/sectores#alimentacion-bebidas", "Alimentación & Bebidas"],
  ["/sectores#energias-renovables", "Energías Renovables"],
  ["/sectores#automocion", "Automoción"],
  ["/sectores#tecnologico", "Tecnológico"],
  ["/sectores#farmaceutico-sanitario", "Farmacéutico & Sanitario"],
  ["/sectores#consumo-distribucion", "Consumo & Distribución"],
  ["/sectores#quimico", "Químico"],
];

const resources: [string, string][] = [
  ["/recursos", "Recursos"],
  ["/recursos#faq", "FAQ"],
  ["/recursos#blog", "Blog"],
  ["/cotizacion", "Cotización Express"],
  ["/contacto", "Contacto"],
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const companyLinks = [
    { href: "/empresa/quienes-somos", label: t.who },
    { href: "/empresa/oficinas", label: t.offices },
    { href: "/empresa/sostenibilidad", label: t.sustainability },
    { href: COMPLAINTS_URL, label: t.complaints, external: true },
    { href: CAREERS_URL, label: t.careers, external: true },
  ];

  const renderLinks = (
    items: Array<[string, string] | { href: string; label: string; external?: boolean }>
  ) =>
    items.map((item) => {
      const href = Array.isArray(item) ? item[0] : item.href;
      const label = Array.isArray(item) ? item[1] : item.label;
      const external = !Array.isArray(item) && item.external;

      return external ? (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
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

          <div
            className={styles.dropdown}
            onMouseEnter={() => setOpenMenu("services")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button type="button" className={styles.dropdownTrigger}>
              {t.services} <span>▾</span>
            </button>
            <div className={`${styles.dropdownMenu} ${openMenu === "services" ? styles.dropdownVisible : ""}`}>
              {renderLinks(services)}
            </div>
          </div>

          <div
            className={styles.dropdown}
            onMouseEnter={() => setOpenMenu("sectors")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button type="button" className={styles.dropdownTrigger}>
              {t.sectors} <span>▾</span>
            </button>
            <div className={`${styles.dropdownMenu} ${openMenu === "sectors" ? styles.dropdownVisible : ""}`}>
              {renderLinks(sectors)}
            </div>
          </div>

          <div
            className={styles.dropdown}
            onMouseEnter={() => setOpenMenu("company")}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button type="button" className={styles.dropdownTrigger}>
              {t.company} <span>▾</span>
            </button>
            <div className={`${styles.dropdownMenu} ${openMenu === "company" ? styles.dropdownVisible : ""}`}>
              {renderLinks(companyLinks)}
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
            <div className={`${styles.dropdownMenu} ${openMenu === "resources" ? styles.dropdownVisible : ""}`}>
              {renderLinks(resources)}
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
              <span>{locales[key].flag}</span>
              <strong>{locales[key].short}</strong>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.mobileButton}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileVisible : ""}`}>
        <Link href="/">{t.home}</Link>
        <Link href="/servicios">{t.services}</Link>
        <Link href="/sectores">{t.sectors}</Link>
        <Link href="/empresa">{t.company}</Link>
        <Link href="/recursos">{t.resources}</Link>
        <Link href="/contacto">{t.contact}</Link>
      </div>
    </header>
  );
}
