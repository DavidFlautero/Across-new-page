"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    contact: "Contacto",
    services: "Servicios",
    company: "Empresa",
    resources: "Recursos",
    legal: "Legal",
    rights: "© 2026 Across Logistics. Todos los derechos reservados.",
    offices: [
      ["Barcelona HQ", "T+34 933 170 726"],
      ["Madrid", "T+34 912 907 640"],
      ["Valencia", "T+34 961 666 654"],
      ["Rotterdam", "T+31 10 310 08 96"],
      ["Amsterdam", "T.+31 6 4603 1788"],
      ["Hong Kong", "T.+852 2707 5251"],
      ["Shenzhen", "T.+86 755 2314 3571"],
      ["Hangzhou", "T.+86 571 8661 2338"],
      ["Dubái", "T.+971 501 926 339"],
      ["Gijón", "T.+34 667 062 584"],
      ["Oporto", "T.+351 912 722 623"],
      ["Houston", "T.+1 713 597 6939"],
      ["Dallas", "T.+1 713 597 6939"],
      ["Miami", "+1 786 821 0671"],
    ],
    servicesLinks: [
      ["/servicios/e-commerce", "e-Commerce"],
      ["/servicios/almacen-distribucion", "Almacén y Distribución"],
      ["/servicios/aduanas", "Servicios de Aduanas"],
      ["/servicios/temperatura-controlada", "Carga Temperatura Controlada"],
      ["/servicios/cargas-especiales", "Cargas Especiales e Industriales"],
      ["/servicios/transporte-aereo", "Transporte Aéreo"],
      ["/servicios/transporte-maritimo", "Transporte Marítimo"],
    ],
    companyLinks: [
      ["/empresa/quienes-somos", "Quiénes somos"],
      ["/empresa/oficinas", "Nuestras oficinas"],
      ["/empresa/sostenibilidad", "Sostenibilidad"],
      ["https://acrosslogistics.factorialhr.com/complaints", "Quejas y denuncias"],
      ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "Trabaja con nosotros"],
    ],
    resourcesLinks: [
      ["/recursos", "Recursos"],
      ["/contacto", "Contacto"],
      ["/cotizacion", "Cotización Express"],
      ["/faq", "FAQ"],
      ["/blog", "Blog"],
    ],
    legalLinks: [
      ["/politica-de-cookies", "Política de Cookies"],
      ["/politica-de-privacidad-web", "Política de Privacidad Web"],
      ["/politica-de-redes-sociales", "Política de Redes Sociales"],
      ["/politica-de-calidad", "Política de Calidad"],
      ["/aviso-legal", "Aviso Legal"],
    ],
  },
  en: {
    contact: "Contact",
    services: "Services",
    company: "Company",
    resources: "Resources",
    legal: "Legal",
    rights: "© 2026 Across Logistics. All rights reserved.",
    offices: [
      ["Barcelona HQ", "T+34 933 170 726"],
      ["Madrid", "T+34 912 907 640"],
      ["Valencia", "T+34 961 666 654"],
      ["Rotterdam", "T+31 10 310 08 96"],
      ["Amsterdam", "T.+31 6 4603 1788"],
      ["Hong Kong", "T.+852 2707 5251"],
      ["Shenzhen", "T.+86 755 2314 3571"],
      ["Hangzhou", "T.+86 571 8661 2338"],
      ["Dubai", "T.+971 501 926 339"],
      ["Gijón", "T.+34 667 062 584"],
      ["Oporto", "T.+351 912 722 623"],
      ["Houston", "T.+1 713 597 6939"],
      ["Dallas", "T.+1 713 597 6939"],
      ["Miami", "+1 786 821 0671"],
    ],
    servicesLinks: [
      ["/servicios/e-commerce", "e-Commerce"],
      ["/servicios/almacen-distribucion", "Warehousing & Distribution"],
      ["/servicios/aduanas", "Customs Services"],
      ["/servicios/temperatura-controlada", "Temperature-Controlled Cargo"],
      ["/servicios/cargas-especiales", "Special & Industrial Cargo"],
      ["/servicios/transporte-aereo", "Air Freight"],
      ["/servicios/transporte-maritimo", "Ocean Freight"],
    ],
    companyLinks: [
      ["/empresa/quienes-somos", "About us"],
      ["/empresa/oficinas", "Our offices"],
      ["/empresa/sostenibilidad", "Sustainability"],
      ["https://acrosslogistics.factorialhr.com/complaints", "Complaints channel"],
      ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "Work with us"],
    ],
    resourcesLinks: [
      ["/recursos", "Resources"],
      ["/contacto", "Contact"],
      ["/cotizacion", "Express Quote"],
      ["/faq", "FAQ"],
      ["/blog", "Blog"],
    ],
    legalLinks: [
      ["/politica-de-cookies", "Cookie Policy"],
      ["/politica-de-privacidad-web", "Website Privacy Policy"],
      ["/politica-de-redes-sociales", "Social Media Privacy Policy"],
      ["/politica-de-calidad", "Quality Policy"],
      ["/aviso-legal", "Legal Notice"],
    ],
  },
  zh: {
    contact: "联系",
    services: "服务",
    company: "公司",
    resources: "资源",
    legal: "法律",
    rights: "© 2026 Across Logistics. 版权所有。",
    offices: [
      ["Barcelona HQ", "T+34 933 170 726"],
      ["Madrid", "T+34 912 907 640"],
      ["Valencia", "T+34 961 666 654"],
      ["Rotterdam", "T+31 10 310 08 96"],
      ["Amsterdam", "T.+31 6 4603 1788"],
      ["Hong Kong", "T.+852 2707 5251"],
      ["Shenzhen", "T.+86 755 2314 3571"],
      ["Hangzhou", "T.+86 571 8661 2338"],
      ["Dubai", "T.+971 501 926 339"],
      ["Gijón", "T.+34 667 062 584"],
      ["Oporto", "T.+351 912 722 623"],
      ["Houston", "T.+1 713 597 6939"],
      ["Dallas", "T.+1 713 597 6939"],
      ["Miami", "+1 786 821 0671"],
    ],
    servicesLinks: [
      ["/servicios/e-commerce", "电商物流"],
      ["/servicios/almacen-distribucion", "仓储与配送"],
      ["/servicios/aduanas", "海关服务"],
      ["/servicios/temperatura-controlada", "温控货运"],
      ["/servicios/cargas-especiales", "特殊与工业货物"],
      ["/servicios/transporte-aereo", "空运"],
      ["/servicios/transporte-maritimo", "海运"],
    ],
    companyLinks: [
      ["/empresa/quienes-somos", "关于我们"],
      ["/empresa/oficinas", "我们的办公室"],
      ["/empresa/sostenibilidad", "可持续发展"],
      ["https://acrosslogistics.factorialhr.com/complaints", "投诉渠道"],
      ["https://hubspot.acrosslogistics.com/work-with-us?_gl=1*4r16p5*_ga*MTc2Mjc1OTc4MS4xNzgwMTM5MzAz*_ga_5YSHEDWDMT*czE3ODAyMzAxNDUkbzEwJGcxJHQxNzgwMjMwMTQ5JGo1NiRsMCRoMA..", "加入我们"],
    ],
    resourcesLinks: [
      ["/recursos", "资源"],
      ["/contacto", "联系"],
      ["/cotizacion", "快速报价"],
      ["/faq", "常见问题"],
      ["/blog", "博客"],
    ],
    legalLinks: [
      ["/politica-de-cookies", "Cookie 政策"],
      ["/politica-de-privacidad-web", "网站隐私政策"],
      ["/politica-de-redes-sociales", "社交媒体隐私政策"],
      ["/politica-de-calidad", "质量政策"],
      ["/aviso-legal", "法律声明"],
    ],
  },
} as const;

const socials = [
  ["https://www.linkedin.com/company/across-logistics/", "in"],
  ["https://www.facebook.com/acrosslogistics", "f"],
  ["https://www.instagram.com/acrosslogistics/", "◎"],
  ["https://twitter.com/acrosslogistics", "𝕏"],
];

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  }

  return <Link href={href}>{children}</Link>;
}

export default function Footer() {
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
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image src="/images/logo-ACROSS-Blanco.svg" alt="Across Logistics" width={210} height={64} />

            <div className={styles.socials}>
              {socials.map(([href, label]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ))}
            </div>

            <a className={styles.email} href="mailto:info@acrosslogistics.com">
              info@acrosslogistics.com
            </a>
          </div>

          <div className={styles.contactBlock}>
            <h3>{t.contact}</h3>

            <div className={styles.officesGrid}>
              {t.offices.map(([city, phone]) => (
                <p key={city}>
                  <strong>{city}</strong>
                  <span>{phone}</span>
                </p>
              ))}
            </div>
          </div>

          <div className={styles.linksBlock}>
            <div>
              <h3>{t.services}</h3>
              {t.servicesLinks.map(([href, label]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}
            </div>

            <div>
              <h3>{t.company}</h3>
              {t.companyLinks.map(([href, label]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}
            </div>

            <div>
              <h3>{t.resources}</h3>
              {t.resourcesLinks.map(([href, label]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}
            </div>

            <div>
              <h3>{t.legal}</h3>
              {t.legalLinks.map(([href, label]) => <SmartLink key={href} href={href}>{label}</SmartLink>)}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>{t.rights}</span>
          <span>Across Logistics</span>
        </div>
      </div>
    </footer>
  );
}
