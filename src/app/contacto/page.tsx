"use client";

import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Contacto.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    badge: "CONTACTO",
    formTitle: "Formulario de contacto",
    name: "Nombre*",
    company: "Empresa*",
    email: "Email*",
    phone: "Teléfono*",
    country: "País / Región*",
    message: "Mensaje*",
    legal:
      "ACROSS LOGISTICS, S.L.U. como responsable del tratamiento tratará tus datos con la finalidad de dar respuesta a tu consulta o petición. Puedes acceder, rectificar y suprimir tus datos, así como ejercer otros derechos consultando la información adicional y detallada sobre protección de datos en nuestra Política de Privacidad Web y nuestros Términos y Condiciones.",
    privacy: "He leído y acepto la política de privacidad y los términos y condiciones*",
    marketing: "Acepto recibir comunicaciones comerciales de Across Logistics",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    success: "Solicitud enviada correctamente.",
    error: "No se pudo enviar la solicitud. Intente nuevamente.",
  },
  en: {
    badge: "CONTACT",
    formTitle: "Contact form",
    name: "Name*",
    company: "Company*",
    email: "Email*",
    phone: "Phone*",
    country: "Country / Region*",
    message: "Message*",
    legal:
      "ACROSS LOGISTICS, S.L.U. as data controller will process your data in order to respond to your inquiry or request. You may access, rectify and delete your data, as well as exercise other rights by consulting the additional and detailed information on data protection in our Website Privacy Policy and Terms and Conditions.",
    privacy: "I have read and accept the privacy policy and terms and conditions*",
    marketing: "I agree to receive commercial communications from Across Logistics",
    submit: "Send request",
    sending: "Sending...",
    success: "Request sent successfully.",
    error: "The request could not be sent. Please try again.",
  },
  zh: {
    badge: "联系",
    formTitle: "联系表单",
    name: "姓名*",
    company: "公司*",
    email: "邮箱*",
    phone: "电话*",
    country: "国家 / 地区*",
    message: "留言*",
    legal:
      "ACROSS LOGISTICS, S.L.U. 作为数据控制方，将处理您的数据，以回复您的咨询或请求。您可以通过我们的网站隐私政策以及条款和条件，查阅有关数据保护的详细信息，并行使访问、更正、删除及其他相关权利。",
    privacy: "我已阅读并接受隐私政策以及条款和条件*",
    marketing: "我同意接收 Across Logistics 的商业通讯",
    submit: "发送请求",
    sending: "发送中...",
    success: "请求已成功发送。",
    error: "请求无法发送。请重试。",
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

const signalSteps = {
  es: [
    {
      tone: "green",
    },
    {
      tone: "amber",
    },
    {
      tone: "red",
    },
  ],
  en: [
    {
      tone: "green",
    },
    {
      tone: "amber",
    },
    {
      tone: "red",
    },
  ],
  zh: [
    {
      tone: "green",
    },
    {
      tone: "amber",
    },
    {
      tone: "red",
    },
  ],
} as const;

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

      <section className={styles.contactHero} aria-label="Across Logistics" />

      <main className={styles.contactPage}>
        <section className={styles.contactShell}>
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

            <textarea
              name="message"
              placeholder={t.message}
              rows={7}
              required
              minLength={10}
              className={`${styles.formControl} ${styles.messageBox}`}
            />

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

          <aside className={styles.signalPanel} aria-label="Proceso de contacto">
<div className={styles.signalList}>
              {signalSteps[locale].map((step) => (
                <article key={step.title} className={styles.signalItem} data-tone={step.tone}>
                  <i aria-hidden="true" />
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
