from pathlib import Path
import re
import shutil

page_path = Path("src/app/cotizacion/page.tsx")
css_path = Path("src/app/cotizacion/Cotizacion.module.css")
thanks_dir = Path("src/app/cotizacion/gracias")
thanks_path = thanks_dir / "page.tsx"

if not page_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/page.tsx")

if not css_path.exists():
    raise SystemExit("❌ No existe src/app/cotizacion/Cotizacion.module.css")

page_backup = page_path.with_suffix(page_path.suffix + ".bak-before-step1-validation-ios-redirect-final")
css_backup = css_path.with_suffix(css_path.suffix + ".bak-before-step1-validation-ios-redirect-final")

if not page_backup.exists():
    shutil.copy2(page_path, page_backup)

if not css_backup.exists():
    shutil.copy2(css_path, css_backup)

tsx = page_path.read_text(encoding="utf-8", errors="ignore")
css = css_path.read_text(encoding="utf-8", errors="ignore")

# -----------------------------------------------------
# 1) Helpers de validación email/teléfono antes de getStepValidationError
# -----------------------------------------------------
helpers = '''
  const invalidEmailMessage =
    locale === "en"
      ? "Enter a valid email address."
      : locale === "zh"
        ? "请输入有效的电子邮件地址。"
        : "Ingrese un correo electrónico válido.";

  const blockedEmailMessage =
    locale === "en"
      ? "The email entered cannot be used. Please use a valid personal or business email."
      : locale === "zh"
        ? "输入的电子邮件无法使用。请使用有效的个人或公司邮箱。"
        : "El correo ingresado no puede ser utilizado. Use un email personal o corporativo válido.";

  const invalidPhoneMessage =
    locale === "en"
      ? "Enter a valid phone number. Use only numbers and optionally + at the beginning."
      : locale === "zh"
        ? "请输入有效电话号码。只能使用数字，并且可在开头使用 +。"
        : "Ingrese un teléfono válido. Use solo números y, si corresponde, + al inicio.";

  const sanitizePhoneValue = (value: string) => {
    const clean = value.replace(/[^0-9+]/g, "");

    if (!clean) return "";

    const hasPlus = clean.startsWith("+");
    const digits = clean.replace(/\\+/g, "");

    return hasPlus ? `+${digits}` : digits;
  };

  const isValidPhoneValue = (value: string) => /^\\+?\\d{7,18}$/.test(value.trim());

  const isValidEmailValue = (value: string) => {
    const email = value.trim().toLowerCase();
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email);
  };

  const isBlockedEmailValue = (value: string) => {
    const email = value.trim().toLowerCase();
    const [local = "", domain = ""] = email.split("@");

    const blockedLocals = new Set([
      "test",
      "prueba",
      "demo",
      "fake",
      "asdf",
      "qwerty",
      "correo",
      "email",
      "mail",
      "hola",
      "nombre",
      "empresa",
      "admin",
      "info",
    ]);

    const blockedDomains = [
      "test.com",
      "example.com",
      "example.es",
      "dominio.com",
      "dominio.es",
      "correo.com",
      "email.com",
      "mail.com",
      "fake.com",
      "prueba.com",
      "asdf.com",
      "qwerty.com",
      "tempmail",
      "temp-mail",
      "mailinator",
      "yopmail",
      "10minutemail",
      "guerrillamail",
    ];

    if (!email || !domain) return true;
    if (blockedLocals.has(local)) return true;
    if (blockedDomains.some((blocked) => domain.includes(blocked))) return true;

    return false;
  };

'''

if "const sanitizePhoneValue = (value: string)" not in tsx:
    marker = "  const getStepValidationError = (step: number) => {"
    if marker not in tsx:
        raise SystemExit("❌ No encontré getStepValidationError para insertar helpers.")
    tsx = tsx.replace(marker, helpers + "\n" + marker, 1)

# -----------------------------------------------------
# 2) Reemplazar validación del paso 0 / paso 1 contacto
# -----------------------------------------------------
start = tsx.find("    if (step === 0) {")
end = tsx.find("    if (step === 1) {", start)

if start == -1 or end == -1:
    raise SystemExit("❌ No encontré bloque if (step === 0)")

step0 = '''    if (step === 0) {
      const normalizedEmail = form.email.trim().toLowerCase();
      const normalizedPhone = sanitizePhoneValue(form.phone);

      if (!isFilled(form.name)) return requiredMessage(t.name);
      if (!isFilled(form.company)) return requiredMessage(t.company);
      if (!isFilled(form.email)) return requiredMessage(t.email);
      if (!isValidEmailValue(normalizedEmail)) return invalidEmailMessage;
      if (isBlockedEmailValue(normalizedEmail)) return blockedEmailMessage;
      if (!isFilled(form.phone)) return requiredMessage(t.phone);
      if (!isValidPhoneValue(normalizedPhone)) return invalidPhoneMessage;
      if (!isFilled(form.country)) return requiredMessage(t.country);
      if (!isFilled(form.contractDate)) return requiredMessage(t.contractDate);
      return "";
    }

'''

tsx = tsx[:start] + step0 + tsx[end:]

# -----------------------------------------------------
# 3) Sanitizar teléfono al escribir
# -----------------------------------------------------
# Casos comunes del input phone
tsx = re.sub(
    r'onChange=\\{\\(e\\) => setValue\\("phone", e\\.target\\.value\\)\\}',
    'onChange={(e) => setValue("phone", sanitizePhoneValue(e.target.value))}',
    tsx
)

tsx = re.sub(
    r'onChange=\\{\\(event\\) => setValue\\("phone", event\\.target\\.value\\)\\}',
    'onChange={(event) => setValue("phone", sanitizePhoneValue(event.target.value))}',
    tsx
)

# Si quedó input de phone sin inputMode/pattern, se lo agregamos de forma segura
tsx = re.sub(
    r'(<input[^>]+value=\\{form\\.phone\\}[^>]+onChange=\\{[^}]+setValue\\("phone", sanitizePhoneValue\\([^)]*\\)\\)[^}]*\\}[^>]*)(/?>)',
    lambda m: m.group(1)
        .replace(' type="text"', ' type="tel"')
        .replace(" type='text'", " type='tel'")
        + ('' if 'inputMode=' in m.group(1) else ' inputMode="tel"')
        + ('' if 'pattern=' in m.group(1) else ' pattern="^\\\\+?[0-9]{7,18}$"')
        + m.group(2),
    tsx
)

# -----------------------------------------------------
# 4) Normalizar email al escribir/pegar sin espacios
# -----------------------------------------------------
tsx = re.sub(
    r'onChange=\\{\\(e\\) => setValue\\("email", e\\.target\\.value\\)\\}',
    'onChange={(e) => setValue("email", e.target.value.trim().toLowerCase())}',
    tsx
)

tsx = re.sub(
    r'onChange=\\{\\(event\\) => setValue\\("email", event\\.target\\.value\\)\\}',
    'onChange={(event) => setValue("email", event.target.value.trim().toLowerCase())}',
    tsx
)

# -----------------------------------------------------
# 5) Redirección a página de gracias al enviar OK
# -----------------------------------------------------
success_patterns = [
    '''      setSent(true);
      setForm(initialForm);''',
    '''      setSent(true);
      setForm(initialForm);
      return;''',
]

success_replacement = '''      window.location.href = "/cotizacion/gracias";
      return;'''

for old in success_patterns:
    if old in tsx:
        tsx = tsx.replace(old, success_replacement, 1)
        break

# Limpieza sintaxis
tsx = re.sub(r'",\\s*,', '",', tsx)
tsx = re.sub(r'\\},\\s*,', '},', tsx)
tsx = re.sub(r"\\.{4,}form,", "...form,", tsx)
tsx = re.sub(r"\\.{4,}prev,", "...prev,", tsx)

page_path.write_text(tsx, encoding="utf-8")

# -----------------------------------------------------
# 6) CSS iPhone selects nativos
# -----------------------------------------------------
start_marker = "/* === COTIZACION IOS SELECT FIX FINAL START === */"
end_marker = "/* === COTIZACION IOS SELECT FIX FINAL END === */"

css = re.sub(re.escape(start_marker) + r"[\\s\\S]*?" + re.escape(end_marker), "", css).rstrip()

css_patch = '''
/* === COTIZACION IOS SELECT FIX FINAL START === */

/* iPhone/Safari: forzar selects nativos y clicables */
.formCard select,
.grid select,
.subBlock select,
.form select {
  display: block !important;
  width: 100% !important;
  min-height: 54px !important;
  height: auto !important;

  -webkit-appearance: menulist !important;
  appearance: auto !important;

  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
  touch-action: manipulation !important;

  position: relative !important;
  z-index: 20 !important;

  color: #07111d !important;
  -webkit-text-fill-color: #07111d !important;
  background-color: #ffffff !important;

  font-size: 16px !important;
  line-height: 1.2 !important;
  border: 1px solid rgba(7,17,29,.14) !important;
}

.formCard select option,
.grid select option,
.subBlock select option,
.form select option {
  color: #07111d !important;
  background: #ffffff !important;
  font-size: 16px !important;
}

@supports (-webkit-touch-callout: none) {
  .formCard select,
  .grid select,
  .subBlock select,
  .form select {
    -webkit-appearance: menulist-button !important;
    appearance: auto !important;
    font-size: 16px !important;
  }

  .formCard label,
  .grid label,
  .subBlock label {
    -webkit-tap-highlight-color: rgba(225,19,67,.12) !important;
  }
}

/* Evita overlays que bloqueen taps sobre selects en mobile */
@media (max-width: 760px) {
  .formCard,
  .grid,
  .subBlock,
  .originDestination {
    overflow: visible !important;
  }

  .formCard select {
    z-index: 50 !important;
  }
}

/* === COTIZACION IOS SELECT FIX FINAL END === */
'''

css += "\n\n" + css_patch.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

# -----------------------------------------------------
# 7) Página de gracias
# -----------------------------------------------------
thanks_dir.mkdir(parents=True, exist_ok=True)

thanks_path.write_text('''import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import styles from "../Cotizacion.module.css";

export default function CotizacionGraciasPage() {
  return (
    <div className="page-shell">
      <Header />

      <main className={styles.thanksPage}>
        <section className={styles.thanksCard}>
          <span>Solicitud recibida</span>
          <h1>Gracias. Nuestro equipo revisará su solicitud.</h1>
          <p>
            Hemos recibido la información de su operación. Un especialista de Across Logistics
            se pondrá en contacto para avanzar con una propuesta ajustada a su carga, ruta y requerimiento.
          </p>

          <Link href="/" className={styles.thanksButton}>
            Volver al inicio
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
''', encoding="utf-8")

# CSS gracias
thanks_start = "/* === COTIZACION THANKS PAGE FINAL START === */"
thanks_end = "/* === COTIZACION THANKS PAGE FINAL END === */"
css = css_path.read_text(encoding="utf-8", errors="ignore")
css = re.sub(re.escape(thanks_start) + r"[\\s\\S]*?" + re.escape(thanks_end), "", css).rstrip()

thanks_css = '''
/* === COTIZACION THANKS PAGE FINAL START === */

.thanksPage {
  min-height: 72vh;
  display: grid;
  place-items: center;
  padding: 9rem 1.5rem 5rem;
  background:
    radial-gradient(circle at 85% 12%, rgba(214,192,141,.18), transparent 28rem),
    linear-gradient(180deg, #07111d 0%, #102435 42%, #f4f0ea 42%, #eee8df 100%);
}

.thanksCard {
  width: min(860px, 100%);
  padding: clamp(2rem, 5vw, 4rem);
  border-radius: 34px;
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(255,255,255,.75);
  box-shadow: 0 34px 90px rgba(7,17,29,.24);
  text-align: center;
}

.thanksCard span {
  display: inline-block;
  color: #d00236;
  -webkit-text-fill-color: #d00236;
  font-size: .78rem;
  font-weight: 950;
  letter-spacing: .16em;
  text-transform: uppercase;
}

.thanksCard h1 {
  margin: .9rem auto 0;
  max-width: 720px;
  color: #07111d;
  -webkit-text-fill-color: #07111d;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: .98;
  letter-spacing: -.055em;
  font-weight: 950;
}

.thanksCard p {
  max-width: 680px;
  margin: 1.2rem auto 0;
  color: rgba(7,17,29,.68);
  -webkit-text-fill-color: rgba(7,17,29,.68);
  line-height: 1.7;
}

.thanksButton {
  margin-top: 1.8rem;
  min-height: 54px;
  padding: 0 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  color: #fff;
  -webkit-text-fill-color: #fff;
  background: #07111d;
  font-weight: 900;
  text-decoration: none;
}

/* === COTIZACION THANKS PAGE FINAL END === */
'''

css += "\n\n" + thanks_css.strip() + "\n"
css_path.write_text(css, encoding="utf-8")

print("✅ Validación email falsa/bloqueada ahora en paso 1")
print("✅ Teléfono sanitizado: solo números y + al inicio")
print("✅ iPhone selects forzados a nativos")
print("✅ Envío OK redirige a /cotizacion/gracias")
print("✅ Página de gracias creada")
print("✅ Backup page:", page_backup)
print("✅ Backup css:", css_backup)
