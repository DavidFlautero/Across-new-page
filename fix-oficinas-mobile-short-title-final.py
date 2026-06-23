from pathlib import Path
import re
import shutil

page_path = Path("src/app/empresa/oficinas/page.tsx")
global_css = Path("src/app/globals.css")

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/empresa/oficinas/page.tsx")

if not global_css.exists():
    raise SystemExit("❌ No existe src/app/globals.css")

# Backups
page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-oficinas-mobile-short-title")
css_backup = global_css.with_suffix(global_css.suffix + ".bak-before-oficinas-mobile-short-title")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(global_css, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")

# 1) Asegurar useEffect/useState importados
tsx = tsx.replace(
    'import { useState } from "react";',
    'import { useEffect, useState } from "react";'
)

tsx = tsx.replace(
    'import { useEffect } from "react";',
    'import { useEffect, useState } from "react";'
)

# 2) Agregar estado mobile si no existe
if "isMobileHeroTitle" not in tsx:
    # Buscar un useState existente del locale
    tsx = re.sub(
        r'(const\s+\[locale,\s*setLocale\]\s*=\s*useState<Locale>\("[^"]+"\);\s*)',
        r'\1\n  const [isMobileHeroTitle, setIsMobileHeroTitle] = useState(false);\n',
        tsx,
        count=1
    )

# 3) Agregar useEffect mobile antes de const t = copy[locale]
mobile_effect = '''  useEffect(() => {
    const query = "(max-width: 430px) and (min-height: 600px)";
    const media = window.matchMedia(query);

    const update = () => setIsMobileHeroTitle(media.matches);

    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

'''

if "setIsMobileHeroTitle(media.matches)" not in tsx:
    marker = "  const t = copy[locale];"
    if marker not in tsx:
        raise SystemExit("❌ No encontré const t = copy[locale]; en Oficinas")
    tsx = tsx.replace(marker, mobile_effect + marker, 1)

# 4) Agregar título corto y heroTitle después de const t = copy[locale]
title_block = '''  const mobileHeroTitle =
    locale === "es"
      ? "Presencia internacional en mercados estratégicos."
      : locale === "en"
        ? "International presence in strategic markets."
        : "战略市场中的国际布局。";

  const heroTitle = isMobileHeroTitle ? mobileHeroTitle : t.title;

'''

if "const mobileHeroTitle =" not in tsx:
    tsx = tsx.replace("  const t = copy[locale];\n", "  const t = copy[locale];\n\n" + title_block, 1)

# 5) Cambiar h1
tsx = tsx.replace("<h1>{t.title}</h1>", "<h1>{heroTitle}</h1>")

page_path.write_text(tsx, encoding="utf-8")

# 6) CSS real igual al DevTools, solo Oficinas mobile chico
css = global_css.read_text(encoding="utf-8", errors="ignore")

start = "/* === OFICINAS MOBILE SHORT TITLE FINAL START === */"
end = "/* === OFICINAS MOBILE SHORT TITLE FINAL END === */"

css = re.sub(
    re.escape(start) + r"[\s\S]*?" + re.escape(end),
    "",
    css,
    flags=re.M
).rstrip()

patch = f"""
{start}
/* Oficinas mobile chico: título corto aprobado por consola. */
@media (max-width: 430px) and (min-height: 600px) {{
  section[data-oficinas-hero="true"] h1 {{
    max-width: 315px !important;
    font-size: clamp(2.55rem, 10.6vw, 3.05rem) !important;
    line-height: .94 !important;
    letter-spacing: -.058em !important;
    margin-bottom: 1rem !important;
  }}
}}
{end}
"""

global_css.write_text(css + "\n\n" + patch.strip() + "\n", encoding="utf-8")

print("✅ Oficinas mobile: título corto aplicado")
print("✅ Desktop mantiene el título largo")
print("✅ CSS mobile igual al DevTools")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
