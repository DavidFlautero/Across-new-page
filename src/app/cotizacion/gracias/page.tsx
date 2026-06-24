import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import styles from "../Cotizacion.module.css";

export default function CotizacionGraciasPage() {
  return (
    <div className="page-shell">
      <Header />

      <main className={styles.thanksPage}>
        <section className={styles.thanksCard}>
          <span>Solicitud recibida</span>
          <h1>Gracias. Nuestro equipo revisará su solicitud.</h1>
          <p>
            Hemos recibido la información de su operación. Un especialista de Across Logistics
            se pondrá en contacto para avanzar con una propuesta ajustada a su carga, ruta y requerimiento.
          </p>

          <Link href="/" className={styles.thanksButton}>
            Volver al inicio
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
