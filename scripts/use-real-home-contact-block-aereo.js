const fs = require("fs");
const path = require("path");

const pagePath = "src/app/servicios/transporte-aereo/page.tsx";
const componentCandidates = [
  "src/components/sections/HomeCorporateFinal.tsx",
  "src/components/sections/HomeCorporateFinal.jsx",
  "src/components/sections/HomeCorporateFinal/index.tsx",
  "src/components/sections/HomeCorporateFinal/index.jsx",
];

if (!fs.existsSync(pagePath)) {
  console.error("No existe:", pagePath);
  process.exit(1);
}

const componentPath = componentCandidates.find((p) => fs.existsSync(p));

if (!componentPath) {
  console.error("No encontré el componente HomeCorporateFinal en src/components/sections.");
  console.error("Busqué:");
  componentCandidates.forEach((p) => console.error(" - " + p));
  process.exit(1);
}

let page = fs.readFileSync(pagePath, "utf8");

const backupDir = "_backup_aereo_before_home_contact_" + new Date().toISOString().replace(/[:.]/g, "-");
fs.mkdirSync(backupDir, { recursive: true });
fs.writeFileSync(path.join(backupDir, "page.before.tsx"), page, "utf8");

/* 1) Importar el bloque REAL de la home */
if (!page.includes('HomeCorporateFinal from "@/components/sections/HomeCorporateFinal"')) {
  page = page.replace(
    /import RelatedServices from "@\/app\/servicios\/_shared\/RelatedServices";/,
    `import RelatedServices from "@/app/servicios/_shared/RelatedServices";
import HomeCorporateFinal from "@/components/sections/HomeCorporateFinal";`
  );

  if (!page.includes('HomeCorporateFinal from "@/components/sections/HomeCorporateFinal"')) {
    page = page.replace(
      /import styles from "\.\/TransporteAereo\.module\.css";/,
      `import HomeCorporateFinal from "@/components/sections/HomeCorporateFinal";
import styles from "./TransporteAereo.module.css";`
    );
  }
}

/* 2) Borrar bloques inventados/duplicados */
const sectionClassesToRemove = [
  "contactHero",
  "servicePreQuote",
  "airActionMobile",
  "airDecisionMobile",
  "airQuoteMobile",
  "airBridgeMobile",
];

for (const className of sectionClassesToRemove) {
  const re = new RegExp(
    `\\n\\s*<section className=\\{styles\\.${className}\\}[\\s\\S]*?\\n\\s*<\\/section>\\s*`,
    "g"
  );
  page = page.replace(re, "\n");
}

/* 3) Borrar cualquier HomeCorporateFinal duplicado */
page = page.replace(/\n\s*<HomeCorporateFinal\s*\/>\s*/g, "\n");

/* 4) Borrar el finalCta viejo/inventado para que no haya dos contactos */
page = page.replace(
  /\n\s*<section\s+className=\{styles\.finalCta\}[\s\S]*?\n\s*<\/section>\s*/g,
  "\n"
);

/* 5) Insertar el bloque REAL de la home antes de RelatedServices */
if (page.includes("<RelatedServices")) {
  page = page.replace(
    /(\n\s*<RelatedServices\b)/,
    `\n        <HomeCorporateFinal />\n$1`
  );
} else if (page.includes("      <Footer />")) {
  page = page.replace(
    "      <Footer />",
    `        <HomeCorporateFinal />\n\n      <Footer />`
  );
} else {
  console.error("No encontré dónde insertar HomeCorporateFinal.");
  process.exit(1);
}

/* 6) Asegurar sticky mobile: Iniciar operación + Contacto */
page = page.replace(
  /\n\s*<div className=\{styles\.mobileStickyCta\}[\s\S]*?\n\s*<\/div>\s*(?=\n\s*<Footer \/>)/g,
  "\n"
);

const sticky = `
      <div className={styles.mobileStickyCta} aria-label="Acciones rápidas de transporte aéreo">
        <Link href="/cotizacion?servicio=transporte-aereo">
          {t.stickyPrimary || "Iniciar operación"}
        </Link>

        <Link href="/contacto?servicio=transporte-aereo">
          {t.stickySecondary || "Contacto"}
        </Link>
      </div>

`;

page = page.replace("      <Footer />", sticky + "      <Footer />");

fs.writeFileSync(pagePath, page, "utf8");

console.log("OK: insertado HomeCorporateFinal real en aéreo.");
console.log("Componente usado:", componentPath);
console.log("Backup:", backupDir);
