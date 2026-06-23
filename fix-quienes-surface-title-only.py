from pathlib import Path
import re
import shutil

tsx_path = Path("src/app/empresa/quienes-somos/page.tsx")

if not tsx_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/quienes-somos/page.tsx")

backup = tsx_path.with_suffix(tsx_path.suffix + ".bak-before-surface-title-only")
if not backup.exists():
    shutil.copy2(tsx_path, backup)

tsx = tsx_path.read_text(encoding="utf-8", errors="ignore")

# 1) Agregar estado para detectar Surface/tablet angosta
old_state = 'const [showFullTeam, setShowFullTeam] = useState(false);'
new_state = '''const [showFullTeam, setShowFullTeam] = useState(false);
  const [isSurfaceHero, setIsSurfaceHero] = useState(false);'''

if old_state not in tsx:
    raise SystemExit("❌ No encontré el estado showFullTeam")
tsx = tsx.replace(old_state, new_state, 1)

# 2) Insertar useEffect de media query justo después del useEffect de locale
marker = '''  const t = copy[locale];

  const heroTrust: readonly (readonly [string, string])[] = ({'''

surface_effect = '''  useEffect(() => {
    const query = "(min-width: 500px) and (max-width: 760px) and (min-height: 650px)";
    const media = window.matchMedia(query);

    const update = () => setIsSurfaceHero(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const t = copy[locale];

  const surfaceHeroTitle =
    locale === "es"
      ? "Logística internacional con control experto."
      : locale === "en"
        ? "International logistics with expert control."
        : "专业管控的国际物流。";

  const heroTitle = isSurfaceHero ? surfaceHeroTitle : t.title;

  const heroTrust: readonly (readonly [string, string])[] = ({'''

if marker not in tsx:
    raise SystemExit("❌ No encontré el bloque const t / heroTrust")

tsx = tsx.replace(marker, surface_effect, 1)

# 3) Cambiar h1 para usar heroTitle
tsx = tsx.replace("<h1>{t.title}</h1>", "<h1>{heroTitle}</h1>", 1)

tsx_path.write_text(tsx, encoding="utf-8")

print("✅ Título corto aplicado solo Surface/tablet angosta")
print("✅ ES: Logística internacional con control experto.")
print("✅ Backup:", backup)
