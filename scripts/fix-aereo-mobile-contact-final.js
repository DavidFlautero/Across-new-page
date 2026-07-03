const fs = require("fs");

const pagePath = "src/app/servicios/transporte-aereo/page.tsx";
let page = fs.readFileSync(pagePath, "utf8");

/* backup */
fs.mkdirSync("_backup_safe_aereo_contact_final", { recursive: true });
fs.writeFileSync("_backup_safe_aereo_contact_final/page.before.tsx", page, "utf8");

/* 1) Quitar HomeCorporateFinal de aéreo */
page = page.replace(/\nimport HomeCorporateFinal from "@\/components\/sections\/HomeCorporateFinal";/g, "");
page = page.replace(/\n\s*<HomeCorporateFinal\s*\/>\s*/g, "\n");

/* 2) Quitar bloques inventados/duplicados */
for (const className of [
  "contactHero",
  "servicePreQuote",
  "airWhiteCloseMobile",
  "airActionMobile",
  "airDecisionMobile",
  "airQuoteMobile",
  "airBridgeMobile",
]) {
  const re = new RegExp(
    `\\n\\s*<section className=\\{styles\\.${className}\\}[\\s\\S]*?\\n\\s*<\\/section>\\s*`,
    "g"
  );
  page = page.replace(re, "\n");
}

/* 3) Ajustar textos finales existentes sin agregar props raras */
page = page.replace(/finalTitle:\s*"[^"]*",/g, 'finalTitle: "Coordinemos su próxima operación aérea internacional.",');
page = page.replace(/finalText:\s*"[^"]*",/g, 'finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",');
page = page.replace(/finalPrimary:\s*"[^"]*",/g, 'finalPrimary: "Hablar con un especialista",');

/* 4) Quitar cualquier finalCta anterior */
page = page.replace(
  /\n\s*<section\s+className=\{styles\.finalCta\}[\s\S]*?\n\s*<\/section>\s*/g,
  "\n"
);

/* 5) Insertar UN SOLO bloque final de contacto antes de RelatedServices */
const finalContact = `
        <section
          className={styles.finalCta}
          data-aereo-contact-final="true"
          style={{ "--mobile-bg": "url('/images/contactoimagen.png')" } as CSSProperties}
        >
          <div>
            <h2>{t.finalTitle}</h2>
            <p>{t.finalText}</p>

            <div className={styles.finalActions}>
              <Link href="/contacto?servicio=transporte-aereo">{t.finalPrimary}</Link>
            </div>
          </div>

          <div className={styles.finalImage} aria-hidden="true">
            <Image
              src="/images/contactoimagen.png"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

`;

if (page.includes("<RelatedServices")) {
  page = page.replace(/(\n\s*<RelatedServices\b)/, finalContact + "$1");
} else {
  page = page.replace("      <Footer />", finalContact + "      <Footer />");
}

/* 6) Sticky mobile limpio: Iniciar operación + Contacto */
page = page.replace(
  /\n\s*<div className=\{styles\.mobileStickyCta\}[\s\S]*?\n\s*<\/div>\s*(?=\n\s*<Footer \/>)/g,
  "\n"
);

const sticky = `
      <div className={styles.mobileStickyCta} aria-label="Acciones rápidas de transporte aéreo">
        <Link href="/cotizacion?servicio=transporte-aereo">
          Iniciar operación
        </Link>

        <Link href="/contacto?servicio=transporte-aereo">
          Contacto
        </Link>
      </div>

`;

page = page.replace("      <Footer />", sticky + "      <Footer />");

fs.writeFileSync(pagePath, page, "utf8");
console.log("OK: aéreo quedó con un solo bloque final de contacto y sticky limpio.");
