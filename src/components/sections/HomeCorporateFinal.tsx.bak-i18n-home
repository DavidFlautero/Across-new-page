"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./HomeCorporateFinal.module.css";

type IconName = "air" | "ocean" | "road" | "customs" | "warehouse" | "special";

const services: Array<[string, string, string, string, IconName]> = [
  ["01", "Transporte Aéreo", "Carga urgente, crítica y prioritaria.", "/servicios/transporte-aereo", "air"],
  ["02", "Transporte Marítimo", "Operaciones FCL, LCL y proyectos internacionales.", "/servicios/transporte-maritimo", "ocean"],
  ["03", "Transporte Terrestre", "Distribución por carretera con trazabilidad operativa.", "/servicios/transporte-terrestre", "road"],
  ["04", "Aduanas", "Gestión documental y cumplimiento normativo.", "/servicios/aduanas", "customs"],
  ["05", "Almacén y Distribución", "Almacenamiento seguro y distribución eficiente.", "/servicios/almacen-distribucion", "warehouse"],
  ["06", "Cargas Especiales", "Mercancías sobredimensionadas, sensibles o críticas.", "/servicios/cargas-especiales", "special"],
];

function ServiceIcon({ name }: { name: IconName }) {
  if (name === "air") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M3.5 15.2 24.3 5.6c.7-.3 1.4.4 1.1 1.1l-9.6 20.8-3.1-9.2-9.2-3.1Z" />
        <path d="M12.8 18.2 17.7 13.3" />
      </svg>
    );
  }

  if (name === "ocean") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M5 14.5h18l-2.2 6.4H7.2L5 14.5Z" />
        <path d="M8.2 14.5V9.4h7.2v5.1" />
        <path d="M15.4 14.5V7h4.6v7.5" />
        <path d="M4 23c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
      </svg>
    );
  }

  if (name === "road") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M4 9h13.2l3.2 4H24v7H4V9Z" />
        <path d="M17.2 9v4h3.2" />
        <path d="M8.2 22.4a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
        <path d="M19.8 22.4a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
      </svg>
    );
  }

  if (name === "customs") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M8 4.5h9l3 3v16H8v-19Z" />
        <path d="M17 4.5v4h4" />
        <path d="M11 13h7M11 17h7M11 21h4" />
        <path d="M5 8.5v16h12" />
      </svg>
    );
  }

  if (name === "warehouse") {
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M4 12.2 14 5l10 7.2v11.3H4V12.2Z" />
        <path d="M8 23.5v-8h12v8" />
        <path d="M8 15.5h12M8 19.5h12" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      <path d="M14 4.5 23 9.6v8.8l-9 5.1-9-5.1V9.6l9-5.1Z" />
      <path d="M5.4 9.8 14 15l8.6-5.2M14 15v8.5" />
      <path d="M9.7 7.2l8.6 5.1" />
    </svg>
  );
}

const homeOffices = [
  {
    city: "Barcelona",
    country: "España",
    phone: "+34 933 170 726",
    href: "/empresa/oficinas/barcelona",
    image: "/images/oficinas/barcelona.png",
  },
  {
    city: "Miami",
    country: "Estados Unidos",
    phone: "+1 786 821 0671",
    href: "/empresa/oficinas/miami",
    image: "/images/oficinas/miami.png",
  },
  {
    city: "Madrid",
    country: "España",
    phone: "+34 912 907 640",
    href: "/empresa/oficinas/madrid",
    image: "/images/oficinas/madrid.png",
  },
  {
    city: "Shenzhen",
    country: "China",
    phone: "+86 755 2314 3571",
    href: "/empresa/oficinas/shenzhen",
    image: "/images/oficinas/Shenzhen.png",
  },
];

export default function HomeCorporateFinal() {
  return (
    <>
      <section className={styles.integrated}>
        <div className={styles.integratedInner}>
          <div className={styles.copy}>
            <span>Soluciones a medida</span>
            <h2>Logística integrada para cada necesidad.</h2>
            <p>
              Diseñamos soluciones logísticas personalizadas para optimizar su cadena de
              suministro, reducir fricción operativa y mantener control de punta a punta.
            </p>

            <ul>
              <li>Enfoque en resultados</li>
              <li>Visibilidad y trazabilidad</li>
              <li>Seguridad y cumplimiento</li>
            </ul>

            <Link href="/empresa/quienes-somos">Conocer más →</Link>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/images/logisticahome.png"
              alt="Logística integrada Across Logistics"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>
        </div>
      </section>

      <section id="servicios" className={styles.services}>
        <div className={styles.servicesInner}>
          <div className={styles.servicesHead}>
            <span>Nuestras soluciones</span>
            <h2>Servicios logísticos internacionales.</h2>
          </div>

          <div className={styles.servicesLayout}>
            <div className={styles.serviceList}>
              {services.map(([number, title, text, href, icon]) => (
                <Link href={href} key={href} className={styles.serviceRow}>
                  <strong>{number}</strong>

                  <div className={styles.serviceIcon}>
                    <ServiceIcon name={icon} />
                  </div>

                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>

                  <i>→</i>
                </Link>
              ))}
            </div>

            <aside className={styles.solutionsPanel}>
              <div>
                <span>Operación integrada</span>
                <h3>De origen a destino, bajo una sola coordinación.</h3>
                <p>
                  Transporte, aduanas, almacenamiento y distribución trabajando
                  como una operación única, no como servicios aislados.
                </p>
              </div>

              <div className={styles.panelStats}>
                <div>
                  <strong>Multimodal</strong>
                  <small>Aéreo · Marítimo · Terrestre</small>
                </div>
                <div>
                  <strong>Cumplimiento</strong>
                  <small>Aduanas · Documentación · Normativa</small>
                </div>
                <div>
                  <strong>Trazabilidad</strong>
                  <small>Seguimiento · Control · Respuesta</small>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.globalTrust}>
        <div className={styles.globalOverlay}>
          <div className={styles.globalContent}>
            <span>Confianza que nos respalda</span>
            <h2>Experiencia, certificaciones y una red global para cuidar su operación.</h2>

            <div className={styles.globalCards}>
              <div>
                <strong>Red internacional</strong>
                <p>Oficinas y aliados estratégicos para coordinar operaciones globales.</p>
              </div>

              <div>
                <strong>Certificaciones</strong>
                <p>AEO · OEA · ISO · IATA · GDP como respaldo operativo.</p>
              </div>

              <div>
                <strong>Control operativo</strong>
                <p>Seguimiento, documentación y respuesta desde origen hasta destino.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mobileCertifications}>
        <div className={styles.certificationsImage}>
          <Image
            src="/images/certificaciones-desktop.png"
            alt="Certificaciones Across Logistics"
            fill
            sizes="100vw"
          />
        </div>
      </section>

      <section className={styles.homeOffices}>
        <div className={styles.homeOfficesInner}>
          <div className={styles.homeOfficesHead}>
            <span>Presencia internacional</span>
            <h2>Oficinas que nos acercan a vos.</h2>
          </div>

          <div className={styles.homeOfficesGrid}>
            {homeOffices.map((office) => (
              <Link href={office.href} key={office.href} className={styles.homeOfficeCard}>
                <div className={styles.homeOfficeImage}>
                  <Image
                    src={office.image}
                    alt={`${office.city}, ${office.country}`}
                    fill
                    sizes="220px"
                  />
                </div>

                <div className={styles.homeOfficeBody}>
                  <strong>{office.city}</strong>
                  <small>{office.country}</small>
                  <p>{office.phone}</p>
                </div>
              </Link>
            ))}

            <Link href="/empresa/oficinas" className={styles.allOfficesCard}>
              <span>◎</span>
              <strong>Ver todas</strong>
              <small>nuestras oficinas</small>
              <i>→</i>
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.homeFinalCta}>
        <div className={styles.homeFinalCtaInner}>
          <div>
            <h2>Coordinemos su próxima operación internacional</h2>
            <p>
              Hable con un especialista y reciba una solución logística adaptada
              a su carga, destino y urgencia.
            </p>
            <Link href="/contacto">Hablar con un especialista</Link>
          </div>
        </div>
      </section>
    </>
  );
}
