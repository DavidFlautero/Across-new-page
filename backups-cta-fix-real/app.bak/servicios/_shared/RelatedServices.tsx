import Image from "next/image";
import Link from "next/link";
import styles from "./ServicePage.module.css";

type Locale = "es" | "en" | "zh";

type RelatedService = {
  slug: string;
  href: string;
  image: string;
  labels: Record<Locale, string>;
};

const copy: Record<Locale, { eyebrow: string; title: string }> = {
  es: {
    eyebrow: "SERVICIOS RELACIONADOS",
    title: "Operaciones complementarias para su logística.",
  },
  en: {
    eyebrow: "RELATED SERVICES",
    title: "Complementary operations for your logistics.",
  },
  zh: {
    eyebrow: "相关服务",
    title: "适用于您物流业务的配套服务。",
  },
};

const services: RelatedService[] = [
  {
    slug: "aduanas",
    href: "/servicios/aduanas",
    image: "/images/hero/hero-empresas.png",
    labels: {
      es: "Servicios de Aduanas",
      en: "Customs Services",
      zh: "海关服务",
    },
  },
  {
    slug: "transporte-aereo",
    href: "/servicios/transporte-aereo",
    image: "/images/hero/cargaAereahero.png",
    labels: {
      es: "Transporte Aéreo",
      en: "Air Freight",
      zh: "空运服务",
    },
  },
  {
    slug: "transporte-maritimo",
    href: "/servicios/transporte-maritimo",
    image: "/images/maritimo.png",
    labels: {
      es: "Transporte Marítimo",
      en: "Ocean Freight",
      zh: "海运服务",
    },
  },
  {
    slug: "transporte-terrestre",
    href: "/servicios/transporte-terrestre",
    image: "/images/sectores/transporteterrestre.png",
    labels: {
      es: "Transporte Terrestre",
      en: "Road Freight",
      zh: "陆运服务",
    },
  },
  {
    slug: "cargas-especiales",
    href: "/servicios/cargas-especiales",
    image: "/images/cargaspecial.png",
    labels: {
      es: "Cargas Especiales",
      en: "Special Cargo",
      zh: "特殊货物",
    },
  },
  {
    slug: "temperatura-controlada",
    href: "/servicios/temperatura-controlada",
    image: "/images/controltemp.png",
    labels: {
      es: "Temperatura Controlada",
      en: "Temperature Controlled",
      zh: "温控运输",
    },
  },
  {
    slug: "almacenaje",
    href: "/servicios/almacenaje",
    image: "/images/almacenHero.png",
    labels: {
      es: "Almacenaje",
      en: "Warehousing",
      zh: "仓储服务",
    },
  },
];

export default function RelatedServices({
  current,
  locale,
}: {
  current: string;
  locale: Locale;
}) {
  const t = copy[locale] ?? copy.es;

  const visibleServices = services
    .filter((service) => service.slug !== current)
    .slice(0, 4);

  return (
    <section className={styles.related}>
      <span>{t.eyebrow}</span>

      <h2>{t.title}</h2>

      <div className={styles.relatedGrid}>
        {visibleServices.map((service) => (
          <Link key={service.slug} href={service.href} className={styles.relatedCard}>
            <Image
              src={service.image}
              alt={service.labels[locale] ?? service.labels.es}
              fill
              sizes="(max-width: 900px) 100vw, 25vw"
            />
            <span>{service.labels[locale] ?? service.labels.es}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
