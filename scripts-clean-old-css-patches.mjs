import fs from "fs";
import path from "path";

const roots = ["src/app/servicios", "src/app/sectores"];

const keepMarkers = [
  "SERVICE MOBILE UNIFIED SYSTEM V3",
  "HERO CTA BUTTONS PILL SYSTEM V2",
];

const removeMarkers = [
  "ACROSS CTA BUTTON POLISH V1",
  "HERO CTA BUTTONS GLOBAL POLISH",
  "GLOBAL SERVICE MOBILE BACKGROUND SYSTEM",
  "SERVICE MOBILE MASTER RESET V2",
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

  "CARGAS ESPECIALES - DESKTOP/TABLET IMAGES",
  "CARGAS ESPECIALES - DESKTOP/TABLET HERO + SECCIONES",
  "CARGAS ESPECIALES - MOBILE IMAGES",
  "CARGAS ESPECIALES - MOBILE REAL",

  "TERRESTRE - IMÁGENES MOBILE COMO FONDO DE SECCIONES",
  "TERRESTRE - FONDO VISIBLE DETRÁS DE SERVICES/CARDS",

  "MARÍTIMO - FIX IMÁGENES INTERNAS MOBILE/TABLET",
  "MARÍTIMO - IMÁGENES DETRÁS DEL TEXTO",
  "MARÍTIMO - FONDO DETRÁS DE \"SERVICES\" / CARDS",
  "MARÍTIMO - FIX REAL FONDO SERVICES VISIBLE",
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full, out);
      continue;
    }

    if (
      item.endsWith(".module.css") &&
      !full.includes(".bak") &&
      !full.includes("backup") &&
      !full.includes("backups")
    ) {
      out.push(full);
    }
  }

  return out;
}

function removeBlockByMarker(css, marker) {
  const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Bloques con formato:
  // /* =====================================================
  //    MARKER
  //    ...
  //    ===================================================== */
  const blockRegex = new RegExp(
    `\\n?\\/\\* =====================================================\\n\\s*${escaped}[\\s\\S]*?(?=\\n\\/\\* =====================================================|\\n\\/\\* END [^*]+ \\*\\/|$)`,
    "g"
  );

  css = css.replace(blockRegex, "\n");

  // End markers sueltos
  const endRegex = new RegExp(
    `\\n?\\/\\* END ${escaped} \\*\\/`,
    "g"
  );

  css = css.replace(endRegex, "\n");

  return css;
}

function extractBlock(css, marker) {
  const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(
    `\\/\\* =====================================================\\n\\s*${escaped}[\\s\\S]*?\\/\\* END ${escaped} \\*\\/`,
    "g"
  );

  const matches = [...css.matchAll(regex)];
  if (!matches.length) return null;

  // Si hay duplicados, conservar solo el último.
  return matches[matches.length - 1][0];
}

const files = roots.flatMap(root => walk(root));

for (const file of files) {
  let css = fs.readFileSync(file, "utf8");
  const original = css;

  const keepBlocks = {};
  for (const marker of keepMarkers) {
    keepBlocks[marker] = extractBlock(css, marker);
  }

  // Quitar bloques viejos explícitos.
  for (const marker of removeMarkers) {
    css = removeBlockByMarker(css, marker);
  }

  // Quitar duplicados de sistemas nuevos, para reinsertar solo uno.
  for (const marker of keepMarkers) {
    css = removeBlockByMarker(css, marker);
  }

  css = css.trimEnd();

  // Reinsertar sistemas nuevos al final, si existían.
  for (const marker of keepMarkers) {
    if (keepBlocks[marker]) {
      css += "\n\n" + keepBlocks[marker].trim() + "\n";
    }
  }

  // Limpieza de espacios excesivos.
  css = css.replace(/\n{4,}/g, "\n\n\n");

  if (css !== original) {
    fs.writeFileSync(file, css, "utf8");
    console.log("CLEAN", file);
  }
}
