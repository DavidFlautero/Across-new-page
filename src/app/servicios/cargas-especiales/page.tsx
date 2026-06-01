import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Certifications from "@/components/sections/Certifications";
import Image from "next/image";
import Link from "next/link";
import styles from "../_shared/ServicePage.module.css";

const services = [
  {
    title: "Proyectos de carga pesada y de grandes dimensiones",
    description:
      "Planificamos cada paso de la cadena de suministro para mover su carga dónde, cuándo y cómo la necesite, independientemente de sus dimensiones, peso o material.",
  },
  {
    title: "Recepción y almacenaje de carga",
    description:
      "Coordinamos y verificamos la correcta recepción de la carga especial o industrial y la trasladamos de forma segura a nuestros almacenes.",
  },
  {
    title: "Operaciones especiales de carga y descarga",
    description:
      "Garantizamos la seguridad de los equipos involucrados y la integridad de cargas pesadas, sensibles o de grandes dimensiones.",
  },
  {
    title: "Carga rodada convencional y/o especial · Ro-Ro",
    description:
      "Planificamos soluciones para embarcar carga rodada convencional y especial, incluyendo maquinaria, equipos pesados y unidades industriales.",
  },
  {
    title: "Break Bulk",
    description:
      "Planificamos, ejecutamos y supervisamos operaciones a medida para cargas fraccionadas, mercancías a granel y proyectos industriales.",
  },
  {
    title: "Chartering",
    description:
      "Fletamos el medio de transporte óptimo, avión o barco, para operaciones especiales e industriales con requerimientos específicos.",
  },
  {
    title: "Transporte de maquinaria",
    description:
      "Transportamos maquinaria pesada para diferentes industrias con rapidez, seguridad y coordinación especializada.",
  },
  {
    title: "Mercancías peligrosas",
    description:
      "Aplicamos protocolos específicos para manipulación y transporte de mercancías peligrosas por tierra, mar o aire.",
  },
  {
    title: "Embalajes y cajas especiales",
    description:
      "Nos aseguramos de que cada carga cuente con embalaje específico, seguro y conforme a la normativa aplicable.",
  },
];

export default function CargasEspecialesPage() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/cargaspecial.png"
          alt="Cargas especiales e industriales"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>PROJECT CARGO</span>

          <h1>Cargas especiales e industriales sin margen de error.</h1>

          <p>
            Proporcionamos una gestión integral de la cadena de suministro para
            cargas especiales e industriales, respetando los plazos de entrega,
            mitigando riesgos y coordinando proyectos globales de alta complejidad.
          </p>

          <div className={styles.actions}>
            <Link href="/cotizacion">Solicitar cotización</Link>
            <Link href="/contacto">Hablar con un especialista</Link>
          </div>
        </div>
      </section>

      <Certifications />

      <main className={styles.content}>
        <section className={styles.block}>
          <span>OPERACIÓN INDUSTRIAL ESPECIALIZADA</span>

          <h2>Gestión integral para proyectos complejos, pesados y sobredimensionados.</h2>

          <p>
            Gestionamos los proyectos globales más complejos mediante nuestra red
            de oficinas y partners internacionales. Este tipo de operaciones
            requieren experiencia, flexibilidad, planificación técnica y una
            solución logística ajustada al menor coste operativo posible.
          </p>
        </section>

        <section className={styles.servicesPanel}>
          <div className={styles.servicesCopy}>
            <p>
              Diseñamos soluciones para carga pesada, industrial, sobredimensionada,
              peligrosa o sensible, coordinando cada etapa desde origen hasta destino.
            </p>

            <h2>Nuestros servicios para cargas especiales e industriales.</h2>

            <div className={styles.accordion}>
              {services.map((service) => (
                <details key={service.title} className={styles.serviceItem}>
                  <summary>
                    <h3>{service.title}</h3>
                    <span>+</span>
                  </summary>
                  <p>{service.description}</p>
                </details>
              ))}
            </div>
          </div>

          <div className={styles.servicesImageWrap}>
            <Image
              src="/images/cargaspecial.png"
              alt="Operación de cargas especiales"
              fill
              className={styles.servicesImage}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </section>

        <section className={styles.related}>
          <span>Servicios relacionados</span>

          <h2>Operaciones complementarias.</h2>

          <div className={styles.relatedGrid}>
            <Link href="/servicios/aduanas" className={styles.relatedCard}>
              <Image src="/images/hero/hero-empresas.png" alt="Servicios de Aduanas" fill sizes="(max-width: 900px) 100vw, 33vw" />
              <span>Servicios de Aduanas</span>
            </Link>

            <Link href="/servicios/transporte-aereo" className={styles.relatedCard}>
              <Image src="/images/hero/cargaAereahero.jpg" alt="Transporte Aéreo" fill sizes="(max-width: 900px) 100vw, 33vw" />
              <span>Transporte Aéreo</span>
            </Link>

            <Link href="/servicios/transporte-maritimo" className={styles.relatedCard}>
              <Image src="/images/maritimo.png" alt="Transporte Marítimo" fill sizes="(max-width: 900px) 100vw, 33vw" />
              <span>Transporte Marítimo</span>
            </Link>
          </div>
        </section>

        <section className={styles.cta}>
          <span>Cotización express</span>

          <h2>Coordinemos su próxima operación especial.</h2>

          <p>
            Nuestro equipo puede analizar dimensiones, ruta, permisos, manipulación,
            embalaje y modalidad óptima para su carga industrial.
          </p>

          <Link href="/cotizacion">Solicitar propuesta →</Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
