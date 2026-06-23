from pathlib import Path
import shutil

file = Path("src/components/HomeDesktopFinalFixer.tsx")

if not file.exists():
    raise SystemExit("❌ No existe src/components/HomeDesktopFinalFixer.tsx")

backup = file.with_suffix(file.suffix + ".bak-before-visual-card-final")
if not backup.exists():
    shutil.copy2(file, backup)

text = file.read_text(encoding="utf-8", errors="ignore")

# 1) Agregar visual card a limpieza
text = text.replace(
    '[data-home-hero-final], [data-home-services-final], [data-home-cert-final]',
    '[data-home-hero-final], [data-home-services-final], [data-home-cert-final], [data-home-visual-card-final]'
)

text = text.replace(
    'el.removeAttribute("data-home-cert-final");',
    'el.removeAttribute("data-home-cert-final");\n        el.removeAttribute("data-home-visual-card-final");'
)

# 2) Insertar función robusta para encontrar el cuadro azul
if "const findVisualCardByText" not in text:
    insert_after = '''    const findSectionByHeading = (text: string, attr: string) => {
      const headings = [...document.querySelectorAll("h1, h2, h3")];

      const heading = headings.find((el) =>
        (el.textContent || "").replace(/\\s+/g, " ").trim().includes(text)
      );

      if (!heading) return null;

      const section = heading.closest("section");
      if (!section) return null;

      section.setAttribute(attr, "true");
      return section;
    };
'''
    visual_func = '''
    const findVisualCardByText = (text: string) => {
      const nodes = [...document.querySelectorAll("article, div, a")];

      const candidates = nodes
        .filter((el) => {
          const content = (el.textContent || "").replace(/\\s+/g, " ").trim();
          return content.includes(text) && content.length < 900;
        })
        .sort((a, b) => {
          const aImg = a.querySelector("img") ? 0 : 1;
          const bImg = b.querySelector("img") ? 0 : 1;
          const aLen = (a.textContent || "").length;
          const bLen = (b.textContent || "").length;
          return aImg - bImg || aLen - bLen;
        });

      const card = candidates[0];
      if (!card) return null;

      card.setAttribute("data-home-visual-card-final", "true");
      return card;
    };
'''
    text = text.replace(insert_after, insert_after + visual_func)

# 3) Llamar la función
if 'findVisualCardByText("De origen a destino");' not in text:
    text = text.replace(
        '''    findSectionByHeading(
      "Experiencia, certificaciones",
      "data-home-cert-final"
    );''',
        '''    findSectionByHeading(
      "Experiencia, certificaciones",
      "data-home-cert-final"
    );

    findVisualCardByText("De origen a destino");'''
    )

# 4) Meter CSS final antes del bloque tablet hero
marker = "      /* ============================= */\n      /* TABLET HERO: BOTONES EN FILA SIN TOCARSE */"
css_patch = r'''
      /* ============================= */
      /* DESKTOP GRANDE: SERVICIOS HOME MÁS BALANCEADO */
      /* ============================= */

      @media (min-width: 1281px) {
        [data-home-services-final="true"] {
          padding-top: 5.6rem !important;
          padding-bottom: 5.4rem !important;
        }

        [data-home-services-final="true"] h2 {
          max-width: 780px !important;
          font-size: clamp(3.35rem, 4.1vw, 5.15rem) !important;
          line-height: .92 !important;
          letter-spacing: -0.058em !important;
        }

        [data-home-visual-card-final="true"] {
          width: min(100%, 450px) !important;
          max-width: 450px !important;
          min-height: 470px !important;
          align-self: start !important;
          transform: translateY(-1.2rem) !important;
        }
      }

      /* ============================= */
      /* CUADRO AZUL OPERACIÓN INTEGRADA */
      /* ============================= */

      @media (min-width: 761px) {
        [data-home-visual-card-final="true"] {
          position: relative !important;
          overflow: hidden !important;
          border-radius: 14px !important;
          border: 1px solid rgba(255,255,255,.16) !important;
          box-shadow:
            0 30px 90px rgba(0,0,0,.22),
            inset 0 1px 0 rgba(255,255,255,.10) !important;
        }

        [data-home-visual-card-final="true"]::after {
          content: "" !important;
          position: absolute !important;
          inset: 0 !important;
          pointer-events: none !important;
          background:
            linear-gradient(90deg, rgba(0,0,0,.50) 0%, rgba(0,0,0,.22) 52%, rgba(0,0,0,.06) 100%),
            linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(0,0,0,.34) 100%) !important;
          z-index: 1 !important;
        }

        [data-home-visual-card-final="true"] > * {
          position: relative !important;
          z-index: 2 !important;
        }

        [data-home-visual-card-final="true"] h2,
        [data-home-visual-card-final="true"] h3,
        [data-home-visual-card-final="true"] strong {
          text-shadow: 0 4px 20px rgba(0,0,0,.62) !important;
        }

        [data-home-visual-card-final="true"] h2,
        [data-home-visual-card-final="true"] h3 {
          max-width: 420px !important;
          line-height: .98 !important;
          letter-spacing: -.045em !important;
        }

        [data-home-visual-card-final="true"] i,
        [data-home-visual-card-final="true"] span:empty,
        [data-home-visual-card-final="true"] [class*="dot"],
        [data-home-visual-card-final="true"] [class*="Dot"],
        [data-home-visual-card-final="true"] [class*="circle"],
        [data-home-visual-card-final="true"] [class*="Circle"] {
          width: 28px !important;
          height: 28px !important;
          min-width: 28px !important;
          min-height: 28px !important;
          display: inline-grid !important;
          place-items: center !important;
          border-radius: 999px !important;
          background: rgba(5,31,55,.78) !important;
          border: 1px solid rgba(210,164,92,.72) !important;
          box-shadow:
            0 10px 24px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.12) !important;
        }

        [data-home-visual-card-final="true"] i::before,
        [data-home-visual-card-final="true"] span:empty::before,
        [data-home-visual-card-final="true"] [class*="dot"]::before,
        [data-home-visual-card-final="true"] [class*="Dot"]::before,
        [data-home-visual-card-final="true"] [class*="circle"]::before,
        [data-home-visual-card-final="true"] [class*="Circle"]::before {
          content: "" !important;
          width: 7px !important;
          height: 7px !important;
          border-radius: 999px !important;
          background: #d2a45c !important;
          box-shadow: 0 0 18px rgba(210,164,92,.85) !important;
        }

        [data-home-visual-card-final="true"] a[href] {
          margin-top: 1.35rem !important;
          min-height: 48px !important;
          padding: 0 1.45rem !important;
          border-radius: 999px !important;
          background: rgba(5,31,55,.72) !important;
          border: 1px solid rgba(210,164,92,.62) !important;
          color: #fff !important;
          box-shadow:
            0 16px 36px rgba(0,0,0,.26),
            inset 0 1px 0 rgba(255,255,255,.12) !important;
        }
      }

'''

if "CUADRO AZUL OPERACIÓN INTEGRADA" not in text:
    text = text.replace(marker, css_patch + marker)

file.write_text(text, encoding="utf-8")

print("✅ HomeDesktopFinalFixer actualizado")
print("✅ Backup:", backup)
