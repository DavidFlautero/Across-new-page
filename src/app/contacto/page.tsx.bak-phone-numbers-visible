"use client";

import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { offices } from "@/data/offices";
import styles from "./Contacto.module.css";

type Locale = "es" | "en" | "zh";

const phones = [
  ["Europa", "+34933170726", "+34 933 170 726"],
  ["Asia", "+8675523143571", "+86 755 2314 3571"],
  ["Oriente Medio", "+971501926339", "+971 501 926 339"],
  ["EEUU", "+17135976939", "+1 713 597 6939"],
];

const copy = {
  es: {
    badge: "CONTACTO",
    title: "Soluciones logísticas con atención internacional.",
    text: "Complete el formulario o contacte directamente con nuestro equipo regional. Across Logistics atenderá su solicitud con una respuesta personalizada.",
    formTitle: "Formulario de contacto",
    name: "Nombre*",
    company: "Empresa*",
    email: "Email*",
    phone: "Teléfono*",
    country: "País / Región*",
    message: "Mensaje*",
    legal: "ACROSS LOGISTICS, S.L.U. como responsable del tratamiento tratará tus datos con la finalidad de dar respuesta a tu consulta o petición. Puedes acceder, rectificar y suprimir tus datos, así como ejercer otros derechos consultando la información adicional y detallada sobre protección de datos en nuestra Política de Privacidad Web y nuestros Términos y Condiciones.",
    privacy: "He leído y acepto la política de privacidad y los términos y condiciones*",
    marketing: "Acepto recibir comunicaciones comerciales de Across Logistics",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    success: "Solicitud enviada correctamente.",
    error: "No se pudo enviar la solicitud. Intente nuevamente.",
    call: "Tocar para llamar",
    offices: "OFICINAS",
    officesTitle: "Presencia internacional",
    viewOffice: "Ver oficina →",
  },
  en: {
    badge: "CONTACT",
    title: "International logistics support for your next operation.",
    text: "Complete the form or contact our regional team directly. Across Logistics will handle your request with a personalized response.",
    formTitle: "Contact form",
    name: "Name*",
    company: "Company*",
    email: "Email*",
    phone: "Phone*",
    country: "Country / Region*",
    message: "Message*",
    legal: "ACROSS LOGISTICS, S.L.U. as data controller will process your data in order to respond to your inquiry or request. You may access, rectify and delete your data, as well as exercise other rights by consulting the additional and detailed information on data protection in our Website Privacy Policy and Terms and Conditions.",
    privacy: "I have read and accept the privacy policy and terms and conditions*",
    marketing: "I agree to receive commercial communications from Across Logistics",
    submit: "Send request",
    sending: "Sending...",
    success: "Request sent successfully.",
    error: "The request could not be sent. Please try again.",
    call: "Tap to call",
    offices: "OFFICES",
    officesTitle: "International presence",
    viewOffice: "View office →",
  },
  zh: {
    badge: "联系",
    title: "为您的下一次物流业务提供国际化支持。",
    text: "请填写表格或直接联系我们的区域团队。Across Logistics 将为您的需求提供个性化回复。",
    formTitle: "联系表单",
    name: "姓名*",
    company: "公司*",
    email: "邮箱*",
    phone: "电话*",
    country: "国家 / 地区*",
    message: "留言*",
    legal: "ACROSS LOGISTICS, S.L.U. 作为数据控制方，将处理您的数据，以回复您的咨询或请求。您可以通过我们的网站隐私政策以及条款和条件，查阅有关数据保护的详细信息，并行使访问、更正、删除及其他相关权利。",
    privacy: "我已阅读并接受隐私政策以及条款和条件*",
    marketing: "我同意接收 Across Logistics 的商业通讯",
    submit: "发送请求",
    sending: "发送中...",
    success: "请求已成功发送。",
    error: "请求无法发送。请重试。",
    call: "点击拨打",
    offices: "办公室",
    officesTitle: "国际布局",
    viewOffice: "查看办公室 →",
  },
} as const;

const countries = [
  "España",
  "Colombia",
  "Argentina",
  "México",
  "Chile",
  "Perú",
  "Estados Unidos",
  "Países Bajos",
  "China",
  "Emiratos Árabes Unidos",
  "Portugal",
  "Otro",
];

export default function ContactoPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("across-locale") as Locale | null;
    if (saved && saved in copy) setLocale(saved);

    const handler = (event: Event) => {
      const next = (event as CustomEvent<Locale>).detail;
      if (next && next in copy) setLocale(next);
    };

    window.addEventListener("across-locale-change", handler);
    return () => window.removeEventListener("across-locale-change", handler);
  }, []);

  const t = copy[locale];

  const contactRequiredMessage = (label: string) => {
    const field = label.replace("*", "").trim();

    if (locale === "en") return `Please complete: ${field}.`;
    if (locale === "zh") return `请填写：${field}。`;

    return `Falta completar: ${field}.`;
  };

  const contactInvalidEmailMessage =
    locale === "en"
      ? "Please enter a valid email address."
      : locale === "zh"
        ? "请输入有效的电子邮件地址。"
        : "Ingrese un correo electrónico válido.";

  const contactInvalidPhoneMessage =
    locale === "en"
      ? "Please enter a valid phone number."
      : locale === "zh"
        ? "请输入有效的电话号码。"
        : "Ingrese un número de teléfono válido.";

  const contactPrivacyMessage =
    locale === "en"
      ? "You must accept the privacy policy before submitting."
      : locale === "zh"
        ? "提交前必须接受隐私政策。"
        : "Debe aceptar la política de privacidad antes de enviar.";

  function validateContactData(form: FormData) {
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const country = String(form.get("country") || "").trim();
    const message = String(form.get("message") || "").trim();
    const privacyAccepted = form.get("privacyAccepted") === "on";
    const digits = phone.replace(/\D/g, "");

    if (!name) return contactRequiredMessage(t.name);
    if (!company) return contactRequiredMessage(t.company);
    if (!email) return contactRequiredMessage(t.email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return contactInvalidEmailMessage;
    if (!phone) return contactRequiredMessage(t.phone);
    if (digits.length < 7 || digits.length > 18) return contactInvalidPhoneMessage;
    if (!country) return contactRequiredMessage(t.country);
    if (!message) return contactRequiredMessage(t.message);
    if (message.length < 10) return contactRequiredMessage(t.message);
    if (!privacyAccepted) return contactPrivacyMessage;

    return "";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEl = event.currentTarget;

    const form = new FormData(formEl);
    const validationError = validateContactData(form);

    if (validationError) {
      setSent(false);
      setError(validationError);
      return;
    }

    setError("");
    setSent(false);
    setSending(true);

    const res = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        company: form.get("company"),
        email: form.get("email"),
        phone: form.get("phone"),
        country: form.get("country"),
        message: form.get("message"),
        privacyAccepted: form.get("privacyAccepted") === "on",
        marketingAccepted: form.get("marketingAccepted") === "on",
        website: window.location.origin,
        locale,
      }),
    });

    setSending(false);

    if (res.ok) {
      setSent(true);
      formEl.reset();
      return;
    }

    setError(t.error);
  }

  return (
    <>
      <Header />

      <main className={styles.contactPage}>
        <section className={styles.contactGrid}>
          <div className={styles.contactIntro}>
            <span className={styles.eyebrow}>{t.badge}</span>
            <h1 className={styles.contactTitle}>{t.title}</h1>
            <p className={styles.contactText}>{t.text}</p>

            <div className={styles.phonesGrid}>
              {phones.map(([label, href, visible]) => (
                <a key={href} href={`tel:${href}`} className={styles.phoneCard}>
                  <span className={styles.phoneLabel}>{label}</span>
                  <strong className={styles.phoneNumber}>{visible}</strong>
                  <small className={styles.phoneCta}>{t.call}</small>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className={styles.contactForm}>
            <h2 className={styles.formTitle}>{t.formTitle}</h2>

            <div className={styles.twoCols}>
              <input name="name" placeholder={t.name} required minLength={2} className={styles.formControl} />
              <input name="company" placeholder={t.company} required minLength={2} className={styles.formControl} />
            </div>

            <div className={styles.twoCols}>
              <input name="email" type="email" placeholder={t.email} required className={styles.formControl} />
              <input name="phone" placeholder={t.phone} required minLength={7} inputMode="tel" className={styles.formControl} />
            </div>

            <select name="country" required defaultValue="" className={styles.formControl}>
              <option value="" disabled>{t.country}</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>

            <textarea name="message" placeholder={t.message} rows={7} required minLength={10} className={`${styles.formControl} ${styles.messageBox}`} />

            <p className={styles.legalText}>{t.legal}</p>

            <label className={styles.checkRow}>
              <input name="privacyAccepted" type="checkbox" required />
              <span>{t.privacy}</span>
            </label>

            <label className={styles.checkRow}>
              <input name="marketingAccepted" type="checkbox" />
              <span>{t.marketing}</span>
            </label>

            <button type="submit" disabled={sending} className={styles.submitButton}>
              {sending ? t.sending : t.submit}
            </button>

            {sent && <p className={styles.success}>{t.success}</p>}
            {error && <p className={styles.fail}>{error}</p>}
          </form>
        </section>
        <section className={styles.contactOfficesSection}>
          <div className={styles.contactOfficesHead}>
            <span>{t.offices}</span>
            <h2>{t.officesTitle}</h2>
          </div>

          <div className={styles.contactOfficesGrid}>
            {offices.map((office) => (
              <Link key={office.slug} href={office.url} className={styles.contactOfficeCard}>
                <Image
                  src={office.image}
                  alt={office.city}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.contactOfficeImage}
                />

                <div className={styles.contactOfficeOverlay} />

                <div className={styles.contactOfficeContent}>
                  <small>{office.country}</small>
                  <h2>{office.city}</h2>
                  <p>{office.address}</p>
                  <strong>{office.phone}</strong>
                  <span>{t.viewOffice}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

const page: React.CSSProperties = {
  background: "#f3efe8",
  color: "#121212",
  padding: "120px 20px 70px",
};

const wrap: React.CSSProperties = {
  maxWidth: 1220,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "0.95fr 1.05fr",
  gap: 34,
  alignItems: "start",
};

const intro: React.CSSProperties = {
  padding: "34px 0",
};

const eyebrow: React.CSSProperties = {
  color: "#b40032",
  fontWeight: 950,
  letterSpacing: ".24em",
  fontSize: ".72rem",
  textTransform: "uppercase",
};

const title: React.CSSProperties = {
  margin: "18px 0",
  maxWidth: 600,
  fontSize: "clamp(2.7rem,5vw,5.4rem)",
  lineHeight: ".9",
  letterSpacing: "-.075em",
  color: "#151515",
};

const text: React.CSSProperties = {
  maxWidth: 560,
  color: "rgba(0,0,0,.66)",
  lineHeight: 1.75,
  fontSize: "1.05rem",
};

const phoneGrid: React.CSSProperties = {
  marginTop: 34,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 14,
};

const phoneCard: React.CSSProperties = {
  textDecoration: "none",
  color: "#111",
  background: "rgba(255,255,255,.92)",
  border: "1px solid rgba(0,0,0,.06)",
  borderRadius: 24,
  padding: "22px",
  boxShadow: "0 22px 55px rgba(0,0,0,.08)",
};

const phoneLabel: React.CSSProperties = {
  display: "block",
  color: "#b40032",
  fontWeight: 950,
  fontSize: ".72rem",
  letterSpacing: ".18em",
  textTransform: "uppercase",
};

const phoneNumber: React.CSSProperties = {
  display: "block",
  marginTop: 8,
  fontSize: "1.18rem",
};

const phoneCta: React.CSSProperties = {
  display: "block",
  marginTop: 10,
  color: "rgba(0,0,0,.48)",
  fontWeight: 800,
};

const form: React.CSSProperties = {
  background: "#fff",
  borderRadius: 34,
  padding: 34,
  boxShadow: "0 34px 95px rgba(0,0,0,.12)",
  border: "1px solid rgba(0,0,0,.055)",
  display: "grid",
  gap: 15,
};

const formTitle: React.CSSProperties = {
  margin: "0 0 10px",
  fontSize: "1.55rem",
  letterSpacing: "-.04em",
};

const twoCols: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
};

const input: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(0,0,0,.06)",
  outline: 0,
  borderRadius: 16,
  padding: "17px 18px",
  background: "#eee8df",
  fontWeight: 700,
  color: "#111",
};

const textarea: React.CSSProperties = {
  ...input,
  resize: "vertical",
};

const legalText: React.CSSProperties = {
  color: "rgba(0,0,0,.62)",
  fontSize: ".82rem",
  lineHeight: 1.6,
  margin: "6px 0 0",
};

const checkRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  color: "rgba(0,0,0,.72)",
  fontSize: ".86rem",
  lineHeight: 1.45,
  fontWeight: 650,
};

const button: React.CSSProperties = {
  height: 60,
  border: 0,
  borderRadius: 999,
  background: "linear-gradient(135deg,#980826,#d20f42)",
  color: "#fff",
  fontWeight: 950,
  cursor: "pointer",
  boxShadow: "0 20px 55px rgba(190,0,50,.24)",
};

const success: React.CSSProperties = { color: "#087a3b", fontWeight: 900 };
const fail: React.CSSProperties = { color: "#c1121f", fontWeight: 900 };

const officeIntro: React.CSSProperties = {
  maxWidth: 1220,
  margin: "80px auto 24px",
};

const officesTitle: React.CSSProperties = {
  margin: "12px 0 0",
  fontSize: "clamp(2.2rem,4vw,4rem)",
  letterSpacing: "-.07em",
};
