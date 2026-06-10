"use client";

import { useEffect, useRef, useState } from "react";
import { locales, type Locale } from "@/i18n/across";
import styles from "./Hero.module.css";

const LOCALE_KEY = "across-locale";

function TrackingIcon() {

  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      if (video instanceof HTMLVideoElement) {
        video.playbackRate = 0.72;
      }
    });
  }, []);

  /* HERO VIDEO PLAYBACK RATE */
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

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7h11v8H3z" />
      <path d="M14 10h3.5l3.5 3.5V15h-7z" />
      <path d="M6.5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M17.5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M8.5 16h7" />
    </svg>
  );
}

const copy = {
  es: {
    slides: [
      {
        title: `Su operación logística
no puede detenerse.
Nosotros tampoco.`,
        text: "Controle su operación en tiempo real y solicite una solución logística adaptada a su carga, destino y urgencia.",
      },
      {
        title: `Carga internacional
con control real
de punta a punta.`,
        text: "Planifique su próximo envío con trazabilidad, respuesta rápida y gestión operativa especializada.",
      },
      {
        title: `Más que transporte.
Gestión logística
sin fricción.`,
        text: "Hable con un especialista y convierta su operación logística en una ventaja competitiva.",
      },
    ],
    cta: "Solicite su presupuesto ahora",
    secondary: "Hablar con un especialista",
    quickLinks: [
      { icon: TrackingIcon, title: "Tracking", subtitle: "Visibilidad de carga", href: "/tracking" },
      { icon: WarehouseIcon, title: "Almacén", subtitle: "Almacenamiento y distribución", href: "/#servicios" },
      { icon: ShipIcon, title: "Marítimo", subtitle: "Transporte marítimo", href: "/servicios/transporte-maritimo" },
      { icon: PlaneIcon, title: "Aéreo", subtitle: "Carga aérea prioritaria", href: "/servicios/transporte-aereo" },
      { icon: TruckIcon, title: "Terrestre", subtitle: "Transporte por carretera", href: "/servicios/transporte-terrestre" },
    ],
  },
  en: {
    slides: [
      {
        title: `Your logistics operation
cannot stop.
Neither can we.`,
        text: "Real-time visibility, international freight and operational control for companies that need every shipment delivered on time.",
      },
      {
        title: `International cargo
with end-to-end
operational control.`,
        text: "We coordinate ocean, air and ground freight with traceability, fast response and specialized logistics management.",
      },
      {
        title: `More than freight.
Logistics management
without friction.`,
        text: "Integrated solutions for companies that need to move critical cargo with precision, visibility and compliance.",
      },
    ],
    cta: "Request your quote now",
    secondary: "Speak with a specialist",
    quickLinks: [
      { icon: TrackingIcon, title: "Tracking", subtitle: "Cargo visibility", href: "/tracking" },
      { icon: WarehouseIcon, title: "Warehouse", subtitle: "Storage & distribution", href: "/#servicios" },
      { icon: ShipIcon, title: "Ocean", subtitle: "Ocean freight", href: "/servicios/transporte-maritimo" },
      { icon: PlaneIcon, title: "Air", subtitle: "Priority air cargo", href: "/servicios/transporte-aereo" },
      { icon: TruckIcon, title: "Road", subtitle: "Road freight", href: "/servicios/transporte-terrestre" },
    ],
  },
  zh: {
    slides: [
      {
        title: `您的物流运营
不能停止。
我们也是。`,
        text: "为需要确保每一次交付的企业提供实时可视化、国际运输与运营控制。",
      },
      {
        title: `国际货运
全流程
运营可控。`,
        text: "我们协调海运、空运与陆运，提供可视化追踪、快速响应与专业物流管理。",
      },
      {
        title: `不只是运输。
更是高效的
物流管理。`,
        text: "为需要精准、可视化与合规交付的企业提供一体化物流解决方案。",
      },
    ],
    cta: "申请报价",
    secondary: "联系专家",
    quickLinks: [
      { icon: TrackingIcon, title: "追踪", subtitle: "货物可视化", href: "/tracking" },
      { icon: WarehouseIcon, title: "仓储", subtitle: "仓储与配送", href: "/#servicios" },
      { icon: ShipIcon, title: "海运", subtitle: "国际海运", href: "/servicios/transporte-maritimo" },
      { icon: PlaneIcon, title: "空运", subtitle: "优先空运货物", href: "/servicios/transporte-aereo" },
      { icon: TruckIcon, title: "陆运", subtitle: "公路运输", href: "/servicios/transporte-terrestre" },
    ],
  },
} as const;

export default function Hero() {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // ACROSS_AUTOPLAY_FORCE_FINAL
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];

    const prepareVideo = (video: HTMLVideoElement) => {
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.playbackRate = 0.72;

      video.setAttribute("muted", "");
      video.setAttribute("autoplay", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("loop", "");
      video.setAttribute("preload", "auto");
    };

    const forcePlay = () => {
      videos.forEach((video) => {
        prepareVideo(video);

        if (video.paused || video.readyState >= 2) {
          const promise = video.play();
          if (promise && typeof promise.catch === "function") {
            promise.catch(() => {
              // El navegador puede bloquear hasta el primer gesto.
            });
          }
        }
      });
    };

    videos.forEach((video) => {
      prepareVideo(video);

      video.addEventListener("loadedmetadata", forcePlay);
      video.addEventListener("loadeddata", forcePlay);
      video.addEventListener("canplay", forcePlay);
      video.addEventListener("canplaythrough", forcePlay);
      video.addEventListener("pause", forcePlay);
    });

    forcePlay();

    const timers = [
      window.setTimeout(forcePlay, 80),
      window.setTimeout(forcePlay, 250),
      window.setTimeout(forcePlay, 700),
      window.setTimeout(forcePlay, 1400),
      window.setTimeout(forcePlay, 2600),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) forcePlay();
      },
      { threshold: 0.05 }
    );

    videos.forEach((video) => observer.observe(video));

    window.addEventListener("touchstart", forcePlay, { passive: true });
    window.addEventListener("pointerdown", forcePlay, { passive: true });
    window.addEventListener("scroll", forcePlay, { passive: true });
    window.addEventListener("resize", forcePlay);
    window.addEventListener("orientationchange", forcePlay);
    document.addEventListener("visibilitychange", forcePlay);

    return () => {
      timers.forEach(window.clearTimeout);
      observer.disconnect();

      videos.forEach((video) => {
        video.removeEventListener("loadedmetadata", forcePlay);
        video.removeEventListener("loadeddata", forcePlay);
        video.removeEventListener("canplay", forcePlay);
        video.removeEventListener("canplaythrough", forcePlay);
        video.removeEventListener("pause", forcePlay);
      });

      window.removeEventListener("touchstart", forcePlay);
      window.removeEventListener("pointerdown", forcePlay);
      window.removeEventListener("scroll", forcePlay);
      window.removeEventListener("resize", forcePlay);
      window.removeEventListener("orientationchange", forcePlay);
      document.removeEventListener("visibilitychange", forcePlay);
    };
  }, []);


  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];

    const forcePlay = () => {
      videos.forEach((video) => {
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.autoplay = true;
        video.loop = true;
        video.preload = "auto";
        video.playbackRate = 0.72;

        const attempt = video.play();
        if (attempt && typeof attempt.catch === "function") {
          attempt.catch(() => {
            // Algunos navegadores bloquean hasta primer gesto del usuario.
          });
        }
      });
    };

    forcePlay();

    const timers = [
      window.setTimeout(forcePlay, 250),
      window.setTimeout(forcePlay, 900),
      window.setTimeout(forcePlay, 1800),
    ];

    window.addEventListener("touchstart", forcePlay, { passive: true });
    window.addEventListener("pointerdown", forcePlay, { passive: true });
    window.addEventListener("scroll", forcePlay, { passive: true });
    document.addEventListener("visibilitychange", forcePlay);

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("touchstart", forcePlay);
      window.removeEventListener("pointerdown", forcePlay);
      window.removeEventListener("scroll", forcePlay);
      document.removeEventListener("visibilitychange", forcePlay);
    };
  }, []);

  const [locale, setLocale] = useState<Locale>("es");
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
  const slides = t.slides;
  const slide = slides[activeSlide % slides.length];

  useEffect(() => {
    setActiveSlide(0);
  }, [locale]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forcePlay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.load();
      video.play().catch(() => {});
    };

    forcePlay();

    window.addEventListener("touchstart", forcePlay, { once: true });
    document.addEventListener("visibilitychange", forcePlay);

    return () => {
      window.removeEventListener("touchstart", forcePlay);
      document.removeEventListener("visibilitychange", forcePlay);
    };
  }, []);

  return (
    <section className={styles.hero}>
      <video
        ref={videoRef}
        className={`${styles.video} ${styles.desktopVideo}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src="/videos/Across-Demo.mp4" type="video/mp4" />
      </video>

      <video
        ref={videoRef}
        className={`${styles.video} ${styles.mobileVideo}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      >
        <source src="/videos/Across-Demo-mobile.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />
      <div className={styles.redGlow} />

      <div className={styles.content}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>
            {slide.title.split("\n").map((line, index) => (
              <span key={`${line}-${index}`}>{line}</span>
            ))}
          </h1>

          <p className={styles.subtitle}>{slide.text}</p>
        </div>

        <div className={styles.line} />

        <div className={styles.actions}>
          <a href="/cotizacion" className={styles.primaryBtn}>
            {t.cta}
          </a>

          <a href="/contacto" className={styles.secondaryBtn}>
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
