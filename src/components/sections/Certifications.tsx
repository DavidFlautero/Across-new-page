import Image from "next/image";
import styles from "./Certifications.module.css";

export default function Certifications() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span>Certificaciones internacionales</span>
        <h2>Estándares que garantizan excelencia</h2>
        <p>
          Cumplimos con certificaciones internacionales que avalan nuestra calidad,
          seguridad y compromiso en cada operación logística.
        </p>
      </div>

      <Image
        src="/images/certificaciones-desktop.png"
        alt="Certificaciones Across Logistics"
        width={1920}
        height={260}
        className={styles.image}
        priority
      />
    </section>
  );
}
