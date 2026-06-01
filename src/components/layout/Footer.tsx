import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const offices = [
  ["Barcelona HQ", "T +34 933 170 726"],
  ["Madrid", "T +34 912 907 640"],
  ["Valencia", "T +34 961 666 654"],
  ["Rotterdam", "T +31 10 310 08 96"],
  ["Amsterdam", "T +31 6 4603 1788"],
  ["Hong Kong", "T +852 2707 5251"],
  ["Shenzhen", "T +86 755 2314 3571"],
  ["Hangzhou", "T +86 571 8661 2338"],
  ["Dubái", "T +971 501 926 339"],
  ["Gijón", "T +34 667 062 584"],
  ["Oporto", "T +351 912 722 623"],
  ["Houston", "T +1 713 597 6939"],
  ["Dallas", "T +1 713 597 6939"],
  ["Miami", "+1 786 821 0671"],
];

const services = [
  ["e-Commerce", "/servicios/e-commerce"],
  ["Almacén y Distribución", "/servicios/almacen-distribucion"],
  ["Servicios de Aduanas", "/servicios/aduanas"],
  ["Carga Temperatura Controlada", "/servicios/temperatura-controlada"],
  ["Cargas Especiales e Industriales", "/servicios/cargas-especiales"],
  ["Transporte Aéreo", "/servicios/transporte-aereo"],
  ["Transporte Marítimo", "/servicios/transporte-maritimo"],
  ["Transporte Terrestre", "/servicios"],
];

const company = [
  ["Empresa", "/empresa"],
  ["Nuestras Oficinas", "/empresa/oficinas"],
  ["Sostenibilidad", "/empresa/sostenibilidad"],
  ["Recursos", "/recursos"],
  ["Contacto", "/contacto"],
  ["FAQ", "/recursos"],
  ["Blog", "/recursos"],
];

const legal = [
  "Política de Cookies",
  "Política de Privacidad Web",
  "Política de Redes Sociales",
  "Política de Calidad",
  "Aviso Legal y Normas del Blog",
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Image
            src="/images/logo-ACROSS-Blanco.svg"
            alt="Across Logistics"
            width={220}
            height={80}
          />

          <p>
            Soluciones logísticas internacionales para empresas que requieren
            precisión, visibilidad y control operativo.
          </p>

          <a href="mailto:info@acrosslogistics.com" className={styles.email}>
            info@acrosslogistics.com
          </a>
        </div>

        <div className={styles.contact}>
          <h3>Contacto</h3>

          <div className={styles.officeGrid}>
            {offices.map(([city, phone]) => (
              <div key={city} className={styles.office}>
                <strong>{city}</strong>
                <span>{phone}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.linksBlock}>
          <h3>Servicios</h3>
          <div className={styles.links}>
            {services.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.linksBlock}>
          <h3>Empresa</h3>
          <div className={styles.links}>
            {company.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>

          <h3 className={styles.legalTitle}>Legal</h3>
          <div className={styles.legalLinks}>
            {legal.map((item) => (
              <a href="#" key={item}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2026 Across Logistics. Todos los derechos reservados.</span>
        <span>International Freight · Customs · Warehousing · Distribution</span>
      </div>
    </footer>
  );
}
