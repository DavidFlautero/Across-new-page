import fs from "fs";
import path from "path";

const servicesDir = "src/app/servicios";
const publicDir = "public/images";
const imageExts = [".png", ".jpg", ".jpeg", ".webp"];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function webPath(file) {
  return "/" + file.replaceAll("\\", "/").replace(/^public\//, "");
}

function getImageSrcInsideWrapper(text, wrapperClass) {
  const wrapperNeedle = `className={styles.${wrapperClass}}`;
  const idx = text.indexOf(wrapperNeedle);
  if (idx === -1) return null;

  const chunk = text.slice(idx, idx + 1200);
  const src = chunk.match(/src="([^"]+)"/);
  return src ? src[1] : null;
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

function mobileImagesForSlug(slug) {
  const folder = path.join(publicDir, `${slug}-mobile`);
  if (!fs.existsSync(folder)) return [];

  return fs.readdirSync(folder)
    .filter((name) => imageExts.includes(path.extname(name).toLowerCase()))
    .sort()
    .map((name) => webPath(path.join(folder, name)));
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

function upsertSectionStyle(text, className, imageUrl) {
  if (!imageUrl) return text;

  const styleValue = `style={{ "--mobile-bg": "url('${imageUrl}')" } as CSSProperties}`;

  const sectionRegex = new RegExp(
    `<section className=\\{styles\\.${className}\\}([^>]*)>`,
    "g"
  );

  return text.replace(sectionRegex, (match, rest) => {
    if (match.includes("--mobile-bg")) {
      return match.replace(
        /style=\{\{ "--mobile-bg": "url\('[^']+'\)" \} as CSSProperties\}/,
        styleValue
      );
    }

    return `<section className={styles.${className}} ${styleValue}${rest}>`;
  });
}

function cleanOldMobileBlocks(css) {
  const markers = [
    "GLOBAL SERVICE MOBILE BACKGROUND SYSTEM",
    "SERVICE MOBILE MASTER RESET V2",
    "SERVICE MOBILE UNIFIED SYSTEM V3",
    "GLOBAL SERVICE FIX - MOBILE USA IMÁGENES DESKTOP",
    "MARÍTIMO - OCULTAR BLOQUE OPERATIVO REDUNDANTE",
    "MARÍTIMO - DARK BAND CON IMAGEN DETRÁS DEL TEXTO",
    "MARÍTIMO - OCULTAR DARK BAND SOLO EN MOBILE",
    "MARÍTIMO - SERVICES MOBILE CON IMAGEN DETRÁS",
    "MARÍTIMO - MOBILE FINAL CLEAN",
    "MARITIMO - IPHONE SE FINAL CTA FULL WIDTH FIX",
    "TEMPERATURA CONTROLADA - FIX MOBILE IMÁGENES",
    "TEMPERATURA CONTROLADA - MOBILE ONLY FIX FINAL",
    "TEMPERATURA CONTROLADA - MOBILE EMERGENCY FIX",
    "TEMPERATURA CONTROLADA - MOBILE BACKGROUND FIX REAL",
    "TEMPERATURA CONTROLADA - MOBILE CLEAN",
    "TEMPERATURA CONTROLADA - MOBILE CLEAN SYSTEM",
  ];

  for (const marker of markers) {
    const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      `\\n\\/\\* =====================================================\\n\\s*${escaped}[\\s\\S]*?(?=\\n\\/\\* =====================================================|$)`,
      "g"
    );
    css = css.replace(re, "\n");
  }

  css = css.replace(/\/\* END SERVICE MOBILE MASTER RESET V2 \*\//g, "");
  css = css.replace(/\/\* END GLOBAL SERVICE MOBILE BACKGROUND SYSTEM \*\//g, "");
  css = css.replace(/\/\* END SERVICE MOBILE UNIFIED SYSTEM V3 \*\//g, "");

  return css;
}

const mobileCss = `

/* =====================================================
   SERVICE MOBILE UNIFIED SYSTEM V3
   Sistema mobile común para páginas de servicios.
   - darkBand oculto en mobile
   - services y finalCta usan --mobile-bg
   - si no hay imagen mobile, usa imagen desktop detectada
   ===================================================== */

@media (max-width: 760px) {
  .page {
    overflow-x: hidden !important;
    background: #f4f1eb !important;
  }

  .heroImageDesktop {
    display: none !important;
  }

  .heroImageMobile {
    display: block !important;
  }

  .heroImage {
    object-fit: cover !important;
    object-position: center center !important;
  }

  .darkBand {
    display: none !important;
  }

  .services,
  .finalCta {
    position: relative !important;
    isolation: isolate !important;
    overflow: hidden !important;
    display: block !important;
    grid-template-columns: none !important;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    margin: 0 !important;
    transform: none !important;
    box-sizing: border-box !important;
    background: #050609 !important;
    color: #fff !important;
  }

  .services {
    padding: 3.4rem 18px 3.8rem !important;
  }

  .finalCta {
    padding: 4rem 24px 4.2rem !important;
  }

  .services::before,
  .finalCta::before {
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 0 !important;
    background-image: var(--mobile-bg) !important;
    background-size: cover !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    opacity: .92 !important;
    filter: brightness(.44) contrast(1.14) saturate(.96) !important;
    pointer-events: none !important;
  }

  .services::after,
  .finalCta::after {
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 1 !important;
    background:
      radial-gradient(circle at 72% 18%, rgba(237, 27, 47, .16), transparent 20rem),
      linear-gradient(180deg, rgba(5,6,9,.90) 0%, rgba(5,6,9,.76) 44%, rgba(5,6,9,.97) 100%) !important;
    pointer-events: none !important;
  }

  .services > *,
  .services .sectionHead,
  .services .serviceGrid,
  .serviceGrid,
  .serviceGrid > *,
  .operationCard,
  .finalCta > *:not(.finalImage),
  .finalActions {
    position: relative !important;
    z-index: 2 !important;
  }

  .services .sectionHead {
    display: block !important;
    width: 100% !important;
    margin: 0 0 1.8rem !important;
    padding: 0 !important;
  }

  .services .sectionHead h2,
  .finalCta h2 {
    max-width: 430px !important;
    margin: 0 !important;
    color: #fff !important;
    font-size: clamp(2rem, 9.4vw, 3.05rem) !important;
    line-height: .96 !important;
    letter-spacing: -.055em !important;
  }

  .services .eyebrow {
    color: #ed1b2f !important;
  }

  .serviceGrid {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: .85rem !important;
    width: 100% !important;
  }

  .operationCard,
  .serviceGrid article {
    width: 100% !important;
    background: rgba(7, 9, 14, .72) !important;
    border: 1px solid rgba(255,255,255,.14) !important;
    backdrop-filter: blur(6px) !important;
  }

  .finalCta > div:first-child {
    width: 100% !important;
    max-width: 430px !important;
    margin: 0 !important;
    padding: 0 !important;
    transform: none !important;
  }

  .finalCta p {
    max-width: 430px !important;
    margin: 1rem 0 0 !important;
    color: rgba(255,255,255,.78) !important;
    font-size: .92rem !important;
    line-height: 1.55 !important;
  }

  .finalActions {
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: .8rem !important;
    width: 100% !important;
    max-width: 430px !important;
    margin-top: 1.6rem !important;
  }

  .finalActions a {
    width: 100% !important;
    min-height: 48px !important;
    border-radius: 999px !important;
  }

  .darkBandImage,
  .finalImage {
    display: none !important;
  }
}

@media (max-width: 380px) {
  .services {
    padding: 3.1rem 14px 3.4rem !important;
  }

  .finalCta {
    padding: 3.4rem 18px 3.7rem !important;
  }

  .services .sectionHead h2,
  .finalCta h2 {
    font-size: clamp(1.85rem, 9.6vw, 2.55rem) !important;
  }
}

/* END SERVICE MOBILE UNIFIED SYSTEM V3 */
`;

const cssFilesBySlug = {
  "transporte-aereo": "TransporteAereo.module.css",
};

for (const slug of fs.readdirSync(servicesDir)) {
  const dir = path.join(servicesDir, slug);
  if (!fs.statSync(dir).isDirectory()) continue;

  const pageFile = path.join(dir, "page.tsx");
  const cssFile = path.join(dir, cssFilesBySlug[slug] || "Servicio.module.css");

  if (!fs.existsSync(pageFile) || !fs.existsSync(cssFile)) {
    console.log("SKIP", slug);
    continue;
  }

  let page = read(pageFile);
  let css = read(cssFile);

  const heroDesktop = getImageSrcByImageClass(page, "heroImageDesktop");
  const heroMobile = getImageSrcByImageClass(page, "heroImageMobile");

  const darkImage = getImageSrcInsideWrapper(page, "darkBandImage");
  const finalImage = getImageSrcInsideWrapper(page, "finalImage");

  const mobileImgs = mobileImagesForSlug(slug);

  const servicesBg = mobileImgs[0] || darkImage || finalImage || heroDesktop || heroMobile;
  const finalBg = mobileImgs[1] || finalImage || servicesBg;

  page = ensureCssPropertiesImport(page);
  page = upsertSectionStyle(page, "services", servicesBg);
  page = upsertSectionStyle(page, "finalCta", finalBg);

  css = cleanOldMobileBlocks(css);
  css = css.trimEnd() + mobileCss + "\n";

  write(pageFile, page);
  write(cssFile, css);

  console.log("OK", slug);
  console.log("  services:", servicesBg);
  console.log("  final:", finalBg);
}
