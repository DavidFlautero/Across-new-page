import { industries } from "@/data/industries";
import Container from "@/components/ui/Container";
import SectionLabel from "@/components/ui/SectionLabel";

import styles from "./Industries.module.css";

export default function Industries() {
  return (
    <section id="industries" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <SectionLabel>Sectores de Aplicación</SectionLabel>
          <h2>Soluciones adaptadas a industrias con exigencias reales.</h2>
        </div>

        <div className={styles.grid}>
          {industries.map((industry, index) => (
            <article key={industry} className={styles.card}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{industry}</h3>
              <a href="#quote">Conoce más</a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
