import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./PremiumPage.module.css";

type PremiumPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  items?: string[];
};

export default function PremiumPage({
  eyebrow,
  title,
  description,
  items = [],
}: PremiumPageProps) {
  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.bg} />

          <div className={styles.content}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>

            {items.length > 0 && (
              <div className={styles.grid}>
                {items.map((item) => (
                  <article key={item} className={styles.card}>
                    <span />
                    <strong>{item}</strong>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
