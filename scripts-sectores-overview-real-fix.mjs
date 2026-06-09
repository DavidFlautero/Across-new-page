import fs from "fs";
import path from "path";

const root = "src/app/sectores";

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function getImageSrcByImageClass(text, className) {
  const imageTags = text.match(/<Image[\s\S]*?\/>/g) || [];

  for (const tag of imageTags) {
    if (tag.includes(`styles.${className}`)) {
      const src = tag.match(/src="([^"]+)"/);
      if (src) return src[1];
    }
  }

  return null;
}

function ensureCssPropertiesImport(text) {
  if (text.includes("CSSProperties")) return text;

  if (text.includes('from "react"')) {
    return text.replace(
      /import\s+\{([^}]+)\}\s+from\s+"react";/,
      (match, imports) => `import {${imports}} from "react";\nimport type { CSSProperties } from "react";`
    );
  }

  return `import type { CSSProperties } from "react";\n${text}`;
}

function replaceOverviewSection(text, imageUrl) {
  const newTag =
    `<section className={\`\${styles.overview} \${styles.overviewMobileBg}\`} style={{ "--sector-overview-bg": "url('${imageUrl}')" } as CSSProperties}>`;

  return text.replace(
    /<section\s+className=(?:\{styles\.overview\}|\{\`\$\{styles\.overview\}\s+\$\{styles\.overviewMobileBg\}\`\})(?:\s+style=\{\{[\s\S]*?\}\s+as\s+CSSProperties\})?\s*>/g,
    newTag
  );
}

function cleanOldOverviewCss(css) {
  const markers = [
    "SECTORES OVERVIEW MOBILE BACKGROUND SYSTEM",
    "SECTORES OVERVIEW HARD MOBILE FIX",
    "SECTORES OVERVIEW REAL MOBILE FIX",
  ];

  for (const marker of markers) {
    const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    css = css.replace(
      new RegExp(
        `\\n\\/\\* =====================================================\\n\\s*${escaped}[\\s\\S]*?\\/\\* END ${escaped} \\*\\/`,
        "g"
      ),
      ""
    );
  }

  return css;
}

const overviewCss = `

/* =====================================================
   SECTORES OVERVIEW REAL MOBILE FIX
   Aplica imagen detrás SOLO a overview en mobile.
   No depende de services ni finalCta.
   ===================================================== */

@media (max-width: 760px) {
  .page .overviewMobileBg {
    position: relative !important;
    isolation: isolate !important;
    overflow: hidden !important;

    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 3.4rem 18px 3.8rem !important;

    background: #050609 !important;
    color: #fff !important;
  }

  .page .overviewMobileBg::before {
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 0 !important;

    background-image: var(--sector-overview-bg) !important;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;

    opacity: .96 !important;
    filter: brightness(.42) contrast(1.16) saturate(.96) !important;
    pointer-events: none !important;
  }

  .page .overviewMobileBg::after {
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 1 !important;

    background:
      radial-gradient(circle at 74% 18%, rgba(237, 27, 47, .16), transparent 20rem),
      linear-gradient(180deg, rgba(5,6,9,.92) 0%, rgba(5,6,9,.76) 44%, rgba(5,6,9,.98) 100%) !important;
    pointer-events: none !important;
  }

  .page .overviewMobileBg > *,
  .page .overviewMobileBg .overviewCopy,
  .page .overviewMobileBg .overviewCopy > * {
    position: relative !important;
    z-index: 2 !important;
  }

  .page .overviewMobileBg .overviewCopy {
    width: 100% !important;
    max-width: 430px !important;
    margin: 0 !important;
    padding: 0 !important;
    color: #fff !important;
  }

  .page .overviewMobileBg .overviewCopy h2 {
    max-width: 430px !important;
    margin: 0 !important;
    color: #fff !important;
    font-size: clamp(2rem, 9.4vw, 3.05rem) !important;
    line-height: .96 !important;
    letter-spacing: -.055em !important;
  }

  .page .overviewMobileBg .overviewCopy p {
    max-width: 430px !important;
    margin: 1rem 0 0 !important;
    color: rgba(255,255,255,.78) !important;
    font-size: .92rem !important;
    line-height: 1.6 !important;
  }

  .page .overviewMobileBg .overviewCopy a {
    width: 100% !important;
    max-width: 430px !important;
    min-height: 52px !important;
    margin-top: 1.6rem !important;
    padding: 0 1.15rem !important;

    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;

    border-radius: 999px !important;
    color: #fff !important;
    background: linear-gradient(135deg, #ed1b2f 0%, #c90027 100%) !important;
    border: 1px solid rgba(237, 27, 47, .9) !important;

    text-decoration: none !important;
    text-transform: uppercase !important;
    font-size: .74rem !important;
    font-weight: 950 !important;
    letter-spacing: .075em !important;
  }
}

@media (max-width: 380px) {
  .page .overviewMobileBg {
    padding: 3.1rem 14px 3.4rem !important;
  }

  .page .overviewMobileBg .overviewCopy h2 {
    font-size: clamp(1.85rem, 9.6vw, 2.55rem) !important;
  }

  .page .overviewMobileBg .overviewCopy a {
    min-height: 50px !important;
    font-size: .7rem !important;
  }
}

/* END SECTORES OVERVIEW REAL MOBILE FIX */
`;

for (const slug of fs.readdirSync(root)) {
  const dir = path.join(root, slug);
  if (!fs.statSync(dir).isDirectory()) continue;

  const pageFile = path.join(dir, "page.tsx");
  const cssFile = path.join(dir, "Servicio.module.css");

  if (!fs.existsSync(pageFile) || !fs.existsSync(cssFile)) {
    console.log("SKIP", slug);
    continue;
  }

  let page = read(pageFile);
  let css = read(cssFile);

  const image =
    getImageSrcByImageClass(page, "heroImageMobile") ||
    getImageSrcByImageClass(page, "heroImageDesktop");

  if (!image) {
    console.log("SIN IMAGEN", slug);
    continue;
  }

  page = ensureCssPropertiesImport(page);
  page = replaceOverviewSection(page, image);

  css = cleanOldOverviewCss(css);
  css = css.trimEnd() + overviewCss + "\n";

  write(pageFile, page);
  write(cssFile, css);

  console.log("OK", slug, "overview:", image);
}
