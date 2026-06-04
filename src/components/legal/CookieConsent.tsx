"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "across-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved !== "accepted" && saved !== "declined") {
      setVisible(true);
    }
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

  return (
    <div className={styles.backdrop} role="presentation">
      <section
        className={styles.banner}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
        <div className={styles.copy}>
          <span>🍪</span>
          <h2 id="cookie-title">Uso de cookies</h2>
          <p>
            Utilizamos cookies técnicas necesarias para el funcionamiento del sitio.
            Las cookies de análisis, medición o seguimiento solo se activarán si usted
            acepta expresamente.
          </p>

          <p className={styles.links}>
            Consulte nuestra{" "}
            <Link href="/politica-de-cookies">Política de Cookies</Link>,{" "}
            <Link href="/politica-de-privacidad-web">Política de Privacidad</Link>{" "}
            y <Link href="/aviso-legal">Aviso Legal</Link>.
          </p>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={() => saveConsent("accepted")}>
            Aceptar
          </button>

          <button type="button" onClick={() => saveConsent("declined")}>
            Rechazar
          </button>
        </div>
      </section>
    </div>
  );
}
