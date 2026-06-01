import { services } from "@/data/services";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionLabel>Servicios</SectionLabel>
          <h2>Soluciones logísticas integrales para comercio internacional.</h2>
          <p>
            Una oferta completa para transportar, coordinar, almacenar y liberar
            mercancía con control operacional de principio a fin.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <span>{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#quote">Solicitar presupuesto</a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
