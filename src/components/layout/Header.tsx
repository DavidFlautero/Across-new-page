"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { acrossCopy, locales, type Locale } from "@/i18n/across";
import styles from "./Header.module.css";

const LOCALE_KEY = "across-locale";

const PRIVATE_AREA_URL =
  "https://id.factorialhr.com/login?&return_to=https%3A%2F%2Fapp.factorialhr.com%2F";

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
];

const resources: [string, string][] = [
  ["/recursos", "Recursos"],
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

  const renderLinks = (items: [string, string][]) =>
    items.map(([href, label]) => (
      <Link key={href} href={href}>
        {label}
      </Link>
    ));

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
              {renderLinks(services)}
            </div>
          </div>

          <div className={styles.dropdown} onMouseEnter={() => setOpenMenu("sectors")} onMouseLeave={() => setOpenMenu(null)}>
            <button type="button" className={styles.dropdownTrigger}>{t.sectors} <span>▾</span></button>
            <div className={`${styles.dropdownMenu} ${openMenu === "sectors" ? styles.dropdownVisible : ""}`}>
              {renderLinks(sectors)}
            </div>
          </div>

          <Link href="/empresa">{t.company}</Link>
          <Link href="/recursos">{t.resources}</Link>
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

        <div className={styles.mobileLang}>
          {(Object.keys(locales) as Locale[]).map((key) => (
            <button
              key={key}
              type="button"
              className={key === locale ? styles.languageActive : ""}
              onClick={() => changeLocale(key)}
            >
              <span>{locales[key].flag}</span>
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
          <Link href="/" onClick={() => setMobileOpen(false)}>{t.home}</Link>
          <Link href="/tracking" onClick={() => setMobileOpen(false)}>{t.tracking}</Link>
          <Link href="/servicios" onClick={() => setMobileOpen(false)}>{t.services}</Link>
          <Link href="/sectores" onClick={() => setMobileOpen(false)}>{t.sectors}</Link>
          <Link href="/empresa" onClick={() => setMobileOpen(false)}>{t.company}</Link>
          <Link href="/recursos" onClick={() => setMobileOpen(false)}>{t.resources}</Link>
          <Link href="/contacto" onClick={() => setMobileOpen(false)}>{t.contact}</Link>
          <a href={PRIVATE_AREA_URL} target="_blank" rel="noopener noreferrer">{t.private}</a>
        </nav>
      </aside>
    </header>
  );
}
