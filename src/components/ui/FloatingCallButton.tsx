"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./FloatingCallButton.module.css";

const copy = {
  es: {
    bubble: "Agenda una llamada",
    label: "Agendar una llamada",
    aria: "Agendar una llamada comercial",
  },
  en: {
    bubble: "Schedule a call",
    label: "Schedule a call",
    aria: "Schedule a commercial call",
  },
  zh: {
    bubble: "预约通话",
    label: "预约通话",
    aria: "预约商务通话",
  },
};

type Locale = keyof typeof copy;

function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/zh")) return "zh";
  return "es";
}

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18 19.5 19.5 0 0 1 6 12.81 19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.91.33 1.8.62 2.65a2 2 0 0 1-.45 2.11L8 9.72a16 16 0 0 0 6.28 6.28l1.24-1.23a2 2 0 0 1 2.11-.45c.85.29 1.74.5 2.65.62A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FloatingCallButton() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname || "");
  const t = copy[locale];

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 760px)").matches);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);
    window.addEventListener("orientationchange", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("orientationchange", checkMobile);
    };
  }, []);

  if (isMobile) return null;

  return (
    <a href="/contacto" className={styles.floating} aria-label={t.aria}>
      <span className={styles.chatBubble}>{t.bubble}</span>
      <span className={styles.callPill}>{t.label}</span>
      <span className={styles.callButton}>
        <PhoneIcon />
      </span>
    </a>
  );
}
