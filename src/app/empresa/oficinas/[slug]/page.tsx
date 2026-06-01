import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { offices } from "@/data/offices";
import styles from "../Oficinas.module.css";

export function generateStaticParams() {
  return offices.map((office) => ({ slug: office.slug }));
}

export default async function OficinaDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const office = offices.find((item) => item.slug === slug);

  if (!office) notFound();

  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.detail}>
          <Link href="/empresa/oficinas" className={styles.back}>
            ← Volver a oficinas
          </Link>

          <span>{office.country}</span>
          <h1>{office.city}</h1>

          <div className={styles.detailCard}>
            <div>
              <small>Dirección</small>
              <p>{office.address}</p>
            </div>

            <div>
              <small>Teléfono</small>
              <p>{office.phone}</p>
            </div>

            <div className={styles.actions}>
              <a href="/contacto">Contactar oficina</a>
              <a href="/cotizacion">Solicitar cotización</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
