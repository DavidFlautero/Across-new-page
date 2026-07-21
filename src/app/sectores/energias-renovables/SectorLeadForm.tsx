"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import styles from "./RenewablesFinal.module.css";

type Locale = "es" | "en" | "zh";

const copy = {
  es: {
    title: "Planifiquemos su próxima operación renovable",
    text: "Hable con un especialista y reciba una solución logística adaptada al componente, la ruta, la obra y las exigencias de su proyecto.",
    formTitle: "Formulario de contacto",
    name: "Nombre*",
    company: "Empresa*",
    email: "Email*",
    phone: "Teléfono*",
    country: "País / Región*",
    message: "Mensaje*",
    legal: "ACROSS LOGISTICS, S.L.U., como responsable del tratamiento, tratará sus datos con la finalidad de responder a su consulta o solicitud. Puede acceder, rectificar y suprimir sus datos, así como ejercer otros derechos consultando nuestra Política de Privacidad Web y nuestros Términos y Condiciones.",
    privacy: "He leído y acepto la política de privacidad y los términos y condiciones*",
    marketing: "Acepto recibir comunicaciones comerciales de Across Logistics",
    submit: "Enviar solicitud",
    sending: "Enviando...",
    success: "Solicitud enviada correctamente.",
    error: "No se pudo enviar la solicitud. Intente nuevamente."
  },
  en: {
    title: "Let’s plan your next renewable energy operation",
    text: "Speak with a specialist and receive a logistics solution tailored to the component, route, site and demands of your project.",
    formTitle: "Contact form",
    name: "Name*",
    company: "Company*",
    email: "Email*",
    phone: "Phone*",
    country: "Country / Region*",
    message: "Message*",
    legal: "ACROSS LOGISTICS, S.L.U. will process your data in order to respond to your inquiry or request. You may exercise your rights according to our Privacy Policy and Terms and Conditions.",
    privacy: "I have read and accept the privacy policy and terms and conditions*",
    marketing: "I agree to receive commercial communications from Across Logistics",
    submit: "Send request",
    sending: "Sending...",
    success: "Request sent successfully.",
    error: "The request could not be sent. Please try again."
  },
  zh: {
    title: "规划您的下一项可再生能源物流项目",
    text: "与我们的专家沟通，获取适合组件、路线、工地和项目要求的物流方案。",
    formTitle: "联系表单",
    name: "姓名*",
    company: "公司*",
    email: "邮箱*",
    phone: "电话*",
    country: "国家 / 地区*",
    message: "留言*",
    legal: "ACROSS LOGISTICS, S.L.U. 将处理您的数据，以回复您的咨询或申请。您可以根据隐私政策以及条款和条件行使相关权利。",
    privacy: "我已阅读并接受隐私政策以及条款和条件*",
    marketing: "我同意接收 Across Logistics 的商业通讯",
    submit: "发送申请",
    sending: "发送中...",
    success: "申请已成功发送。",
    error: "无法发送申请，请重试。"
  }
} as const;

const countries = [
  "España", "Colombia", "Argentina", "México", "Chile", "Perú",
  "Estados Unidos", "Países Bajos", "China", "Emiratos Árabes Unidos",
  "Portugal", "Otro"
];

export default function SectorLeadForm() {
  const [locale, setLocale] = useState<Locale>("es");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const readLocale = () => {
      const saved = window.localStorage.getItem("across-locale");
      if (saved === "es" || saved === "en" || saved === "zh") setLocale(saved);
    };

    readLocale();

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<Locale>).detail;
      if (detail === "es" || detail === "en" || detail === "zh") setLocale(detail);
    };

    window.addEventListener("across-locale-change", handler);
    return () => window.removeEventListener("across-locale-change", handler);
  }, []);

  const t = copy[locale];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setSending(true);
    setSent(false);
    setError("");

    try {
      const response = await fetch("/api/contacto", {
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
          website: window.location.href,
          locale
        })
      });

      if (!response.ok) throw new Error("Request failed");

      formElement.reset();
      setSent(true);
    } catch {
      setError(t.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="solicitar-propuesta" className={styles.sectorLead}>
      <div className={styles.sectorLeadInner}>
        <div className={styles.sectorLeadCopy}>
          <div className={styles.sectorLeadMedia} aria-hidden="true">
            <Image
              src="/images/operador/contactcenter-mobile.png"
              alt=""
              fill
              sizes="(max-width: 1000px) 100vw, 45vw"
              className={styles.sectorLeadOperatorImage}
            />
          </div>

          <div className={styles.sectorLeadCopyContent}>
            <h2>{t.title}</h2>
            <p>{t.text}</p>
          </div>
        </div>

        <form onSubmit={submit} className={styles.sectorLeadForm}>
          <h3 className={styles.sectorLeadFormTitle}>{t.formTitle}</h3>

          <div className={styles.sectorLeadTwoCols}>
            <input name="name" placeholder={t.name} required minLength={2} className={styles.sectorLeadControl} />
            <input name="company" placeholder={t.company} required minLength={2} className={styles.sectorLeadControl} />
          </div>

          <div className={styles.sectorLeadTwoCols}>
            <input name="email" type="email" placeholder={t.email} required className={styles.sectorLeadControl} />
            <input name="phone" type="tel" placeholder={t.phone} required minLength={7} className={styles.sectorLeadControl} />
          </div>

          <select name="country" required defaultValue="" className={styles.sectorLeadControl}>
            <option value="" disabled>{t.country}</option>
            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>

          <textarea
            name="message"
            placeholder={t.message}
            rows={6}
            required
            minLength={10}
            className={`${styles.sectorLeadControl} ${styles.sectorLeadMessage}`}
          />

          <p className={styles.sectorLeadLegal}>{t.legal}</p>

          <label className={styles.sectorLeadCheck}>
            <input name="privacyAccepted" type="checkbox" required />
            <span>{t.privacy}</span>
          </label>

          <label className={styles.sectorLeadCheck}>
            <input name="marketingAccepted" type="checkbox" />
            <span>{t.marketing}</span>
          </label>

          <button type="submit" disabled={sending} className={styles.sectorLeadSubmit}>
            {sending ? t.sending : t.submit}
          </button>

          {sent && <p className={styles.sectorLeadSuccess}>{t.success}</p>}
          {error && <p className={styles.sectorLeadError}>{error}</p>}
        </form>
      </div>
    </section>
  );
}
