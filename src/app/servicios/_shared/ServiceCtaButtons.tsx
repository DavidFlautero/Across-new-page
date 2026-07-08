import Link from "next/link";
import styles from "./ServiceCtaButtons.module.css";

type Locale = "es" | "en" | "zh";

type Service =
  | "transporte-aereo"
  | "transporte-maritimo"
  | "transporte-terrestre"
  | "aduanas"
  | string;

type Props = {
  locale: Locale;
  service: Service;
};

function getCopy(locale: Locale, service: Service) {
  const isMaritime = service === "transporte-maritimo";
  const isAir = service === "transporte-aereo";

  if (locale === "en") {
    return {
      primary: isMaritime ? "Request ocean quote" : isAir ? "Request air quote" : "Request a quote",
      secondary: "Talk to an advisor",
    };
  }

  if (locale === "zh") {
    return {
      primary: isMaritime ? "申请海运报价" : isAir ? "申请空运报价" : "申请报价",
      secondary: "联系顾问",
    };
  }

  return {
    primary: isMaritime
      ? "Solicitar cotización marítima"
      : isAir
        ? "Solicitar cotización aérea"
        : "Solicitar cotización",
    secondary: "Hablar con asesor",
  };
}

export default function ServiceCtaButtons({ locale, service }: Props) {
  const copy = getCopy(locale, service);

  return (
    <div className={styles.wrap} aria-label="Acciones del servicio">
      <Link className={styles.primary} href={`/cotizacion?servicio=${service}`}>
        {copy.primary} <span aria-hidden="true">→</span>
      </Link>

      <Link className={styles.secondary} href={`/contacto?servicio=${service}`}>
        {copy.secondary}
      </Link>
    </div>
  );
}
