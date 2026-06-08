import fs from "fs";
import path from "path";

const roots = ["src/app/servicios", "src/app/sectores"];
const files = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      walk(full);
      continue;
    }

    if (
      item.endsWith(".module.css") &&
      !full.includes(".bak") &&
      !full.includes("backup") &&
      !full.includes("backups")
    ) {
      files.push(full);
    }
  }
}

roots.forEach(walk);

const oldMarkers = [
  "HERO CTA BUTTONS GLOBAL POLISH",
  "HERO CTA BUTTONS PILL SYSTEM V2",
];

const block = `

/* =====================================================
   HERO CTA BUTTONS PILL SYSTEM V2
   Botones del hero: mismo lenguaje visual en desktop y mobile.
   ===================================================== */

.actions {
  display: flex !important;
  align-items: center !important;
  gap: .85rem !important;
  flex-wrap: wrap !important;
}

.actions a {
  min-height: 54px !important;
  min-width: 245px !important;
  padding: 0 1.55rem !important;

  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: .65rem !important;

  border-radius: 999px !important;
  text-decoration: none !important;
  text-transform: uppercase !important;

  font-size: .78rem !important;
  font-weight: 950 !important;
  letter-spacing: .075em !important;
  line-height: 1 !important;

  transition:
    transform .22s ease,
    box-shadow .22s ease,
    border-color .22s ease,
    background .22s ease,
    color .22s ease !important;
}

.actions a:first-child {
  color: #fff !important;
  background: linear-gradient(135deg, #ed1b2f 0%, #c90027 100%) !important;
  border: 1px solid rgba(237, 27, 47, .9) !important;
  box-shadow:
    0 18px 44px rgba(237, 27, 47, .27),
    inset 0 1px 0 rgba(255,255,255,.18) !important;
}

.actions a:last-child {
  color: #fff !important;
  background: rgba(255,255,255,.075) !important;
  border: 1px solid rgba(255,255,255,.24) !important;
  box-shadow:
    0 16px 40px rgba(0,0,0,.24),
    inset 0 1px 0 rgba(255,255,255,.10) !important;
  backdrop-filter: blur(10px) !important;
}

.actions a:hover {
  transform: translateY(-2px) !important;
}

.actions a:first-child:hover {
  box-shadow:
    0 24px 58px rgba(237, 27, 47, .34),
    inset 0 1px 0 rgba(255,255,255,.22) !important;
}

.actions a:last-child:hover {
  background: rgba(255,255,255,.13) !important;
  border-color: rgba(255,255,255,.36) !important;
}

@media (max-width: 760px) {
  .actions {
    width: 100% !important;
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: .8rem !important;
  }

  .actions a {
    width: 100% !important;
    min-width: 0 !important;
    min-height: 52px !important;
    padding: 0 1.15rem !important;
    font-size: .74rem !important;
    letter-spacing: .075em !important;
  }
}

@media (max-width: 380px) {
  .actions a {
    min-height: 50px !important;
    font-size: .71rem !important;
  }
}

/* END HERO CTA BUTTONS PILL SYSTEM V2 */
`;

for (const file of files) {
  let css = fs.readFileSync(file, "utf8");

  for (const marker of oldMarkers) {
    const escaped = marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      `\\n\\/\\* =====================================================\\n\\s*${escaped}[\\s\\S]*?\\/\\* END ${escaped} \\*\\/`,
      "g"
    );
    css = css.replace(re, "");
  }

  css = css.trimEnd() + block + "\n";
  fs.writeFileSync(file, css, "utf8");
  console.log("OK", file);
}
