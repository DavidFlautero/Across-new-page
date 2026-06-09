import fs from "fs";
import path from "path";

const root = "src/app/sectores";

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, text) {
  fs.writeFileSync(file, text, "utf8");
}

function getImageSrcInsideWrapper(text, wrapperClass) {
  const idx = text.indexOf(`className={styles.${wrapperClass}}`);
  if (idx === -1) return null;

  const chunk = text.slice(idx, idx + 1400);
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

function upsertOverviewBg(text, imageUrl) {
  const styleValue = `style={{ "--mobile-bg": "url('${imageUrl}')" } as CSSProperties}`;

  return text.replace(
    /<section className=\{styles\.overview\}([^>]*)>/g,
    (match, rest) => {
      if (match.includes("--mobile-bg")) {
        return match.replace(
          /style=\{\{ "--mobile-bg": "url\('[^']+'\)" \} as CSSProperties\}/,
          styleValue
        );
      }

      return `<section className={styles.overview} ${styleValue}${rest}>`;
    }
  );
}

function cleanOldOverviewCss(css) {
  return css.replace(
    /\n\/\* =====================================================\n\s*SECTORES OVERVIEW MOBILE BACKGROUND SYSTEM[\s\S]*?\/\* END SECTORES OVERVIEW MOBILE BACKGROUND SYSTEM \*\//g,
    ""
  );
}

const overviewCss = `

/* =====================================================
   SECTORES OVERVIEW MOBILE BACKGROUND SYSTEM
   Mobile: overview usa imagen detrás, igual que services/finalCta.
   ===================================================== */

@media (max-width: 760px) {
  .overview {
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

  .overview::before {
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

  .overview::after {
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    z-index: 1 !important;

    background:
      radial-gradient(circle at 72% 18%, rgba(237, 27, 47, .16), transparent 20rem),
      linear-gradient(180deg, rgba(5,6,9,.90) 0%, rgba(5,6,9,.76) 44%, rgba(5,6,9,.97) 100%) !important;
    pointer-events: none !important;
  }

  .overview > *,
  .overviewCopy,
  .overviewCopy > * {
    position: relative !important;
    z-index: 2 !important;
  }

  .overviewCopy {
    width: 100% !important;
    max-width: 430px !important;
    margin: 0 !important;
    padding: 0 !important;
    color: #fff !important;
  }

  .overviewCopy h2 {
    max-width: 430px !important;
    margin: 0 !important;
    color: #fff !important;
    font-size: clamp(2rem, 9.4vw, 3.05rem) !important;
    line-height: .96 !important;
    letter-spacing: -.055em !important;
  }

  .overviewCopy p {
    max-width: 430px !important;
    margin: 1rem 0 0 !important;
    color: rgba(255,255,255,.78) !important;
    font-size: .92rem !important;
    line-height: 1.6 !important;
  }

  .overviewCopy a {
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
  .overview {
    padding: 3.1rem 14px 3.4rem !important;
  }

  .overviewCopy h2 {
    font-size: clamp(1.85rem, 9.6vw, 2.55rem) !important;
  }

  .overviewCopy a {
    min-height: 50px !important;
    font-size: .7rem !important;
  }
}

/* END SECTORES OVERVIEW MOBILE BACKGROUND SYSTEM */
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

  const overviewBg =
    getImageSrcInsideWrapper(page, "darkBandImage") ||
    getImageSrcByImageClass(page, "heroImageMobile") ||
    getImageSrcByImageClass(page, "heroImageDesktop") ||
    getImageSrcInsideWrapper(page, "finalImage");

  if (!overviewBg) {
    console.log("SIN IMAGEN", slug);
    continue;
  }

  page = ensureCssPropertiesImport(page);
  page = upsertOverviewBg(page, overviewBg);

  css = cleanOldOverviewCss(css);
  css = css.trimEnd() + overviewCss + "\n";

  write(pageFile, page);
  write(cssFile, css);

  console.log("OK", slug, "overview:", overviewBg);
}
