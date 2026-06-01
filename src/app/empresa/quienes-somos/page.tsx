import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./QuienesSomos.module.css";

export default function QuienesSomosPage() {
  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.intro}>
          <span>Somos Across Logistics</span>
          <h1>Soluciones logísticas integrales para comercio internacional.</h1>
          <p>
            En un mercado global cada vez más complejo, Across Logistics nace
            con la vocación de ofrecer soluciones logísticas eficaces, claras y
            orientadas a la máxima satisfacción del cliente.
          </p>
        </section>

        <section className={styles.editorial}>
          <div>
            <h2>No trasladamos problemas. Diseñamos soluciones.</h2>
          </div>

          <div className={styles.text}>
            <p>
              Asesoramos, organizamos y coordinamos operaciones de transporte
              aplicando normas de comercio internacional para que cada mercancía
              llegue a su destino final en el menor tiempo posible y en perfectas
              condiciones.
            </p>
            <p>
              Con el apoyo de nuestro equipo, las compañías reducen costes,
              eliminan restricciones geográficas y aprovechan mejor las
              oportunidades de los mercados internacionales.
            </p>
          </div>
        </section>

        <section className={styles.cards}>
          <article>
            <span>01</span>
            <h3>Credenciales internacionales</h3>
            <p>AEO/OEA, ISO 9001, IATA y GDP respaldan calidad, seguridad y cumplimiento.</p>
          </article>

          <article>
            <span>02</span>
            <h3>Equipo especializado</h3>
            <p>Dirección, operaciones, aduanas y red internacional coordinadas bajo un mismo estándar.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Red mundial</h3>
            <p>Oficinas, joint ventures y agentes que actúan como extensión internacional de Across.</p>
          </article>
        </section>

        <section className={styles.quote}>
          <blockquote>
            “Para nosotros no existen límites en la distancia, sólo los que nos marcamos en el tiempo.”
          </blockquote>
        </section>

        <section className={styles.network}>
          <div>
            <span>Across the world</span>
            <h2>Una red global conectada a su operación.</h2>
          </div>
          <p>
            Nuestra estructura internacional permite ofrecer servicios logísticos
            en diferentes mercados mediante aliados que comparten nuestra
            metodología y estándar operativo.
          </p>
          <a href="/empresa/oficinas">Ver nuestras oficinas</a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
