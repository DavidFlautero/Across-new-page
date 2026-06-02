import fs from "fs";
import path from "path";

const pages = [
  {
    slug: "politica-de-cookies",
    title: "Política de Cookies",
    source: "https://acrosslogistics.com/politica-de-cookies",
  },
  {
    slug: "politica-de-privacidad-web",
    title: "Política de Privacidad Web",
    source: "https://acrosslogistics.com/politica-de-privacidad",
  },
  {
    slug: "politica-de-redes-sociales",
    title: "Política de Redes Sociales",
    source: "https://acrosslogistics.com/politica-de-privacidad-redes-sociales",
  },
  {
    slug: "politica-de-calidad",
    title: "Política de Calidad",
    source: "https://acrosslogistics.com/politica-de-calidad",
  },
  {
    slug: "aviso-legal",
    title: "Aviso Legal y Normas del Blog",
    source: "https://acrosslogistics.com/aviso-legal",
  },
];

function clean(html) {
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<img[^>]*>/gi, "");

  const h1 = body.search(/<h1[\s\S]*?>/i);
  if (h1 >= 0) body = body.slice(h1);

  const cutMarkers = [
    "info@acrosslogistics.com",
    "CONTACTO",
    "SERVICIOS",
    "© Copyright",
    "Configuración de cookies",
  ];

  for (const marker of cutMarkers) {
    const i = body.indexOf(marker);
    if (i > 700) body = body.slice(0, i);
  }

  return body
    .replace(/\sclass="[^"]*"/gi, "")
    .replace(/\sid="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .replace(/\son[a-z]+="[^"]*"/gi, "")
    .replace(/<div[^>]*>/gi, "<section>")
    .replace(/<\/div>/gi, "</section>")
    .trim();
}

function asTemplateLiteral(value) {
  return "`" + value.replace(/`/g, "\\`").replace(/\$\{/g, "\\${") + "`";
}

for (const page of pages) {
  const res = await fetch(page.source);
  if (!res.ok) throw new Error(`No se pudo descargar ${page.source}`);

  const html = await res.text();
  const content = clean(html);

  const dir = path.join("src/app", page.slug);
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(
    path.join(dir, "page.tsx"),
    `import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/app/_legal/LegalPage.module.css";

const html = ${asTemplateLiteral(content)};

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <span className={styles.kicker}>LEGAL</span>
        <h1>${page.title}</h1>

        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <Footer />
    </div>
  );
}
`,
    "utf8"
  );

  console.log(`OK ${page.slug}`);
}
