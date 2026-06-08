import fs from "fs";
import path from "path";

const cssFiles = [];

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
      (
        full.includes("src/app/servicios") ||
        full.includes("src/app/sectores")
      )
    ) {
      cssFiles.push(full);
    }
  }
}

walk("src/app/servicios");
walk("src/app/sectores");

const marker = "HERO CTA BUTTONS GLOBAL POLISH";

const block = `

/* =====================================================
   HERO CTA BUTTONS GLOBAL POLISH
   Botones principales del hero: más premium y consistentes.
   ===================================================== */

.actions {
  display: flex !important;
  align-items: center !important;
  gap: 1rem !important;
  flex-wrap: wrap !important;
}

.actions a {
  min-height: 58px !important;
  min-width: 260px !important;
  padding: 0 2rem !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: .65rem !important;
  border-radius: 999px !important;
  font-size: .82rem !important;
  font-weight: 950 !important;
  letter-spacing: .08em !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
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
    0 22px 52px rgba(237, 27, 47, .28),
    inset 0 1px 0 rgba(255,255,255,.20) !important;
}

.actions a:last-child {
  color: #fff !important;
  background: rgba(255,255,255,.08) !important;
  border: 1px solid rgba(255,255,255,.24) !important;
  box-shadow:
    0 18px 48px rgba(0,0,0,.26),
    inset 0 1px 0 rgba(255,255,255,.12) !important;
  backdrop-filter: blur(10px) !important;
}

.actions a:hover {
  transform: translateY(-2px) !important;
}

.actions a:first-child:hover {
  box-shadow:
    0 28px 64px rgba(237, 27, 47, .34),
    inset 0 1px 0 rgba(255,255,255,.24) !important;
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
    min-height: 54px !important;
    padding: 0 1.2rem !important;
    font-size: .76rem !important;
    letter-spacing: .075em !important;
  }
}

@media (max-width: 380px) {
  .actions a {
    min-height: 50px !important;
    font-size: .72rem !important;
  }
}

/* END HERO CTA BUTTONS GLOBAL POLISH */
`;

for (const file of cssFiles) {
  let css = fs.readFileSync(file, "utf8");

  const re = new RegExp(
    `\\n\\/\\* =====================================================\\n\\s*${marker}[\\s\\S]*?\\/\\* END ${marker} \\*\\/`,
    "g"
  );

  css = css.replace(re, "");

  css = css.trimEnd() + block + "\n";
  fs.writeFileSync(file, css, "utf8");

  console.log("OK", file);
}
