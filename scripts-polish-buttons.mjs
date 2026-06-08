import fs from "fs";
import path from "path";

const roots = [
  "src/app/servicios",
  "src/app/sectores",
  "src/app/empresa",
  "src/app/recursos",
];

const MARKER = "ACROSS CTA BUTTON POLISH V1";

const cssBlock = `

/* =====================================================
   ACROSS CTA BUTTON POLISH V1
   Botones premium corporativos para hero / CTA.
   ===================================================== */

.actions,
.finalActions,
.darkBandActions,
.compactCtaActions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.actions a,
.finalActions a,
.darkBandActions a,
.compactCtaActions a {
  min-height: 54px;
  padding: 0 1.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .65rem;

  border-radius: 999px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: .075em;
  font-size: .78rem;
  font-weight: 950;
  line-height: 1;

  transition:
    transform .22s ease,
    box-shadow .22s ease,
    border-color .22s ease,
    background .22s ease,
    color .22s ease;
}

/* Primario */
.actions a:first-child,
.finalActions a:first-child,
.darkBandActions a:first-child,
.compactCtaActions a:first-child {
  color: #fff !important;
  background:
    linear-gradient(135deg, #f0183d 0%, #d70c31 52%, #b70627 100%) !important;
  border: 1px solid rgba(255,255,255,.08) !important;
  box-shadow:
    0 22px 52px rgba(225, 19, 67, .28),
    inset 0 1px 0 rgba(255,255,255,.22);
}

/* Secundario */
.actions a:last-child,
.finalActions a:last-child,
.darkBandActions a:last-child,
.compactCtaActions a:last-child {
  color: rgba(255,255,255,.94) !important;
  background:
    linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.035)) !important;
  border: 1px solid rgba(255,255,255,.24) !important;
  box-shadow:
    0 18px 42px rgba(0,0,0,.22),
    inset 0 1px 0 rgba(255,255,255,.10);
  backdrop-filter: blur(8px);
}

/* Flecha más fina */
.actions a:first-child::after,
.finalActions a:first-child::after,
.darkBandActions a:first-child::after,
.compactCtaActions a:first-child::after {
  content: "→";
  font-size: .95rem;
  line-height: 1;
  transform: translateY(-1px);
}

/* Hover desktop */
@media (hover: hover) {
  .actions a:hover,
  .finalActions a:hover,
  .darkBandActions a:hover,
  .compactCtaActions a:hover {
    transform: translateY(-2px);
  }

  .actions a:first-child:hover,
  .finalActions a:first-child:hover,
  .darkBandActions a:first-child:hover,
  .compactCtaActions a:first-child:hover {
    box-shadow:
      0 28px 70px rgba(225, 19, 67, .36),
      inset 0 1px 0 rgba(255,255,255,.26);
  }

  .actions a:last-child:hover,
  .finalActions a:last-child:hover,
  .darkBandActions a:last-child:hover,
  .compactCtaActions a:last-child:hover {
    border-color: rgba(255,255,255,.42) !important;
    background:
      linear-gradient(135deg, rgba(255,255,255,.13), rgba(255,255,255,.055)) !important;
  }
}

/* Mobile */
@media (max-width: 760px) {
  .actions,
  .finalActions,
  .darkBandActions,
  .compactCtaActions {
    width: 100%;
    display: grid !important;
    grid-template-columns: 1fr !important;
    gap: .75rem !important;
  }

  .actions a,
  .finalActions a,
  .darkBandActions a,
  .compactCtaActions a {
    width: 100% !important;
    min-height: 52px !important;
    padding: 0 1.2rem !important;
    font-size: .74rem !important;
    letter-spacing: .065em !important;
  }
}

@media (max-width: 380px) {
  .actions a,
  .finalActions a,
  .darkBandActions a,
  .compactCtaActions a {
    min-height: 50px !important;
    font-size: .7rem !important;
  }
}

/* END ACROSS CTA BUTTON POLISH V1 */
`;

function cleanOldBlock(text) {
  const re = new RegExp(
    `\\n\\/\\* =====================================================\\n\\s*${MARKER}[\\s\\S]*?\\/\\* END ${MARKER} \\*\\/\\n?`,
    "g"
  );
  return text.replace(re, "\n");
}

const files = [];

for (const root of roots) {
  if (!fs.existsSync(root)) continue;

  for (const dirent of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, dirent.name);

    if (dirent.isDirectory()) {
      for (const f of fs.readdirSync(full)) {
        if (f.endsWith(".module.css")) {
          files.push(path.join(full, f));
        }
      }
    } else if (dirent.isFile() && dirent.name.endsWith(".module.css")) {
      files.push(full);
    }
  }
}

for (const file of files) {
  let css = fs.readFileSync(file, "utf8");
  css = cleanOldBlock(css).trimEnd() + cssBlock + "\n";
  fs.writeFileSync(file, css, "utf8");
  console.log("OK", file);
}
