import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

import styles from "./ContactCTA.module.css";

export default function ContactCTA() {
  return (
    <section id="contact" className={styles.section}>
      <Container className={styles.container}>
        <p>Agende una llamada</p>
        <h2>Hable con un asesor comercial para planificar su operación.</h2>
        <div className={styles.actions}>
          <Button href="mailto:info@acrosslogistics.com">Enviar consulta</Button>
          <Button href="tel:+34000000000" variant="secondary">Llamar ahora</Button>
        </div>
      </Container>
    </section>
  );
}
