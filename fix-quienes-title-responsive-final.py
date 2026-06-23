from pathlib import Path
import re
import shutil

tsx_path = Path("src/app/empresa/quienes-somos/page.tsx")
css_path = Path("src/app/empresa/Empresa.module.css")

if not tsx_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/quienes-somos/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/Empresa.module.css")

tsx_backup = tsx_path.with_suffix(tsx_path.suffix + ".bak-before-responsive-title-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-responsive-title-final")

if not tsx_backup.exists():
    shutil.copy2(tsx_path, tsx_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = tsx_path.read_text(encoding="utf-8", errors="ignore")

# Limpia restos anteriores de estados/títulos condicionales si existen
tsx = tsx.replace(
    'const [showFullTeam, setShowFullTeam] = useState(false);\n  const [isSurfaceHero, setIsSurfaceHero] = useState(false);',
    'const [showFullTeam, setShowFullTeam] = useState(false);'
)

tsx = tsx.replace(
    'const [showFullTeam, setShowFullTeam] = useState(false);\n  const [isCompactHeroTitle, setIsCompactHeroTitle] = useState(false);',
    'const [showFullTeam, setShowFullTeam] = useState(false);'
)

# Agrega estado definitivo
tsx = tsx.replace(
    'const [showFullTeam, setShowFullTeam] = useState(false);',
    'const [showFullTeam, setShowFullTeam] = useState(false);\n  const [isCompactHeroTitle, setIsCompactHeroTitle] = useState(false);',
    1
)

# Borra useEffect anterior de media query si quedó
tsx = re.sub(
    r'\n\s*useEffect\(\(\) => \{\s*const query = "[^"]*";\s*const media = window\.matchMedia\(query\);[\s\S]*?\}, \[\]\);\n',
    '\n',
    tsx,
    flags=re.M
)

# Borra títulos condicionales anteriores si existen
tsx = re.sub(
    r'\n\s*const surfaceHeroTitle =[\s\S]*?\n\s*const heroTitle = isSurfaceHero \? surfaceHeroTitle : t\.title;\n',
    '\n',
    tsx,
    flags=re.M
)

tsx = re.sub(
    r'\n\s*const compactHeroTitle =[\s\S]*?\n\s*const heroTitle = isCompactHeroTitle \? compactHeroTitle : t\.title;\n',
    '\n',
    tsx,
    flags=re.M
)

# Inserta media query: compacto en tablet/mobile, grande en desktop
marker = "  const t = copy[locale];\n"
insert = '''  useEffect(() => {
    const query = "(max-width: 900px)";
    const media = window.matchMedia(query);

    const update = () => setIsCompactHeroTitle(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const t = copy[locale];

  const compactHeroTitle =
    locale === "es"
      ? "Logística internacional con control experto."
      : locale === "en"
        ? "International logistics with expert control."
        : "专业管控的国际物流。";

  const heroTitle = isCompactHeroTitle ? compactHeroTitle : t.title;
'''

if marker not in tsx:
    raise SystemExit("❌ No encontré const t = copy[locale];")

tsx = tsx.replace(marker, insert, 1)

# Cambia h1 al título final responsive
tsx = tsx.replace("<h1>{t.title}</h1>", "<h1>{heroTitle}</h1>")
tsx = tsx.replace("<h1>{heroTitle}</h1>", "<h1>{heroTitle}</h1>")

tsx_path.write_text(tsx, encoding="utf-8")

css = css_path.read_text(encoding="utf-8", errors="ignore")

start = "/* === QUIENES HERO RESPONSIVE TITLE FINAL START === */"
end = "/* === QUIENES HERO RESPONSIVE TITLE FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Desktop mantiene el título grande original.
   Tablet/mobile usan título corto desde page.tsx.
   Bloque centrado, texto alineado a la izquierda. */

@media (max-width: 900px) {{
  :global(section[data-quienes-hero="true"] [class*="heroContent"]) {{
    width: min(100% - 44px, 520px) !important;
    max-width: 520px !important;
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: left !important;
  }}

  :global(section[data-quienes-hero="true"] h1) {{
    max-width: 520px !important;
    font-size: clamp(2.85rem, 8.2vw, 4.15rem) !important;
    line-height: .94 !important;
    letter-spacing: -.058em !important;
    text-align: left !important;
  }}

  :global(section[data-quienes-hero="true"] p) {{
    max-width: 500px !important;
    text-align: left !important;
  }}

  :global(section[data-quienes-hero="true"] [class*="actions"]) {{
    justify-content: flex-start !important;
    text-align: left !important;
  }}
}}

@media (max-width: 430px) {{
  :global(section[data-quienes-hero="true"] [class*="heroContent"]) {{
    width: min(100% - 44px, 340px) !important;
    max-width: 340px !important;
  }}

  :global(section[data-quienes-hero="true"] h1) {{
    max-width: 320px !important;
    font-size: clamp(2.65rem, 11vw, 3.15rem) !important;
    line-height: .94 !important;
    letter-spacing: -.058em !important;
  }}

  :global(section[data-quienes-hero="true"] p) {{
    max-width: 320px !important;
  }}
}}

@media (min-width: 500px) and (max-width: 760px) and (min-height: 650px) {{
  :global(section[data-quienes-hero="true"] [class*="heroContent"]) {{
    width: min(100% - 48px, 470px) !important;
    max-width: 470px !important;
  }}

  :global(section[data-quienes-hero="true"] h1) {{
    max-width: 440px !important;
    font-size: clamp(3.2rem, 8vw, 3.85rem) !important;
  }}
}}
{end}
"""

css = css + "\n\n" + patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Título responsive final aplicado")
print("✅ Desktop: título largo original")
print("✅ Tablet/mobile: título corto profesional")
print("✅ Bloque centrado y texto alineado a la izquierda")
print("✅ Backup TSX:", tsx_backup)
print("✅ Backup CSS:", css_backup)
