"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";
import { locales, type Locale } from "@/i18n/across";

type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "across-cookie-consent";
const LOCALE_KEY = "across-locale";

const copy: Record<
  Locale,
  {
    title: string;
    p1: string;
    p2Start: string;
    privacy: string;
    cookies: string;
    preferences: string;
    essentials: string;
    allowAll: string;
  }
> = {
  es: {
    title: "Gestión de cookies para una mejor experiencia digital",
    p1:
      "Nuestro sitio utiliza cookies técnicas necesarias para que la página sea navegable y funcione correctamente. También podemos usar cookies de análisis para entender cómo interactúan los visitantes con nuestros servicios y mejorar la experiencia.",
    p2Start: "Puede aceptar todas las cookies o continuar solo con las esenciales. Para más información consulte nuestra",
    privacy: "política de privacidad",
    cookies: "política de cookies",
    preferences: "Preferencias de administración",
    essentials: "Solo esenciales",
    allowAll: "Permitir todo",
  },
  en: {
    title: "Cookie management for a better digital experience",
    p1:
      "Our site uses technical cookies required for the page to be navigable and work correctly. We may also use analytics cookies to understand how visitors interact with our services and improve the experience.",
    p2Start: "You can accept all cookies or continue with essential cookies only. For more information, please see our",
    privacy: "privacy policy",
    cookies: "cookie policy",
    preferences: "Cookie preferences",
    essentials: "Essential only",
    allowAll: "Allow all",
  },
  zh: {
    title: "Cookie 管理，以提供更好的数字体验",
    p1:
      "我们的网站使用必要的技术 Cookie，以确保页面可正常浏览和运行。我们也可能使用分析 Cookie 来了解访客如何与我们的服务互动，并持续优化体验。",
    p2Start: "您可以接受所有 Cookie，或仅继续使用必要 Cookie。更多信息请查看我们的",
    privacy: "隐私政策",
    cookies: "Cookie 政策",
    preferences: "管理偏好设置",
    essentials: "仅必要项",
    allowAll: "允许全部",
  },
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (savedLocale && savedLocale in locales) {
      setLocale(savedLocale);
    }

    const savedConsent = window.localStorage.getItem(STORAGE_KEY);
    if (savedConsent !== "accepted" && savedConsent !== "declined") {
      setVisible(true);
    }

    const handler = (event: Event) => {
      const next = (event as CustomEvent<Locale>).detail;
      if (next && next in locales) {
        setLocale(next);
      }
    };

    window.addEventListener("across-locale-change", handler);
    return () => window.removeEventListener("across-locale-change", handler);
  }, []);

  const saveConsent = (value: ConsentValue) => {
    window.localStorage.setItem(STORAGE_KEY, value);

    window.dispatchEvent(
      new CustomEvent("across-cookie-consent", {
        detail: {
          accepted: value === "accepted",
          value,
        },
      })
    );

    setVisible(false);
  };

  if (!visible) return null;

  const t = copy[locale];

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={styles.banner}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div className={styles.copy}>
          <h2 id="cookie-title">{t.title}</h2>

          <p>{t.p1}</p>

          <p>
            {t.p2Start}{" "}
            <Link href="/politica-de-privacidad-web">{t.privacy}</Link>{" "}
            y <Link href="/politica-de-cookies">{t.cookies}</Link>.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/politica-de-cookies" className={styles.preferences}>
            {t.preferences}
          </Link>

          <div className={styles.buttons}>
            <button type="button" onClick={() => saveConsent("declined")}>
              {t.essentials}
            </button>

            <button type="button" onClick={() => saveConsent("accepted")}>
              {t.allowAll}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
