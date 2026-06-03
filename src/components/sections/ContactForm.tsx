"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { offices } from "@/data/offices";
import styles from "@/app/contacto/Contacto.module.css";

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

export default function ContactForm() {
  const [locale, setLocale] = useState<Locale>("es");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = windowWidth <= 767;
  const isTablet = windowWidth > 767 && windowWidth <= 1023;

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

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const t = copy[locale];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    if (!formEl.checkValidity()) {
      formEl.reportValidity();
      return;
    }
    setError("");
    setSending(true);
    const form = new FormData(formEl);
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

  // Estilos dinámicos según dispositivo
  const sectionWrapperStyle = {
    maxWidth: "1220px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "0.95fr 1.05fr",
    gap: isMobile ? "24px" : "34px",
    alignItems: "start",
    padding: isMobile ? "24px 16px 20px" : "40px 20px 20px",
    background: "#ffffff !important",
    borderRadius: isMobile ? "24px" : "34px",
  };

  const leftCardStyle = {
    background: "#ffffff !important",
    borderRadius: isMobile ? "24px" : "34px",
    padding: isMobile ? "24px" : "34px",
    boxShadow: "0 34px 95px rgba(0,0,0,.08)",
    border: "1px solid rgba(0,0,0,.055)",
  };

  const formStyle = {
    background: "#ffffff !important",
    borderRadius: isMobile ? "24px" : "34px",
    padding: isMobile ? "24px" : "34px",
    boxShadow: "0 34px 95px rgba(0,0,0,.12)",
    border: "1px solid rgba(0,0,0,.055)",
    display: "grid",
    gap: "15px",
  };

  const phoneGridStyle = {
    marginTop: isMobile ? "24px" : "34px",
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
    gap: "14px",
  };

  const twoColsStyle = {
    display: "grid",
    gridTemplateColumns: (isMobile || isTablet) ? "1fr" : "1fr 1fr",
    gap: "14px",
  };

  const titleStyle = {
    margin: "18px 0",
    maxWidth: "600px",
    fontSize: isMobile ? "clamp(2rem,8vw,3rem)" : "clamp(2.7rem,5vw,5.4rem)",
    lineHeight: isMobile ? "1.1" : ".9",
    letterSpacing: "-.075em",
    color: "#151515",
  };

  const textStyle = {
    maxWidth: "560px",
    color: "rgba(0,0,0,.66)",
    lineHeight: 1.6,
    fontSize: isMobile ? "0.95rem" : "1.05rem",
  };

  const formTitleStyle = {
    margin: "0 0 10px",
    fontSize: isMobile ? "1.35rem" : "1.55rem",
    letterSpacing: "-.04em",
  };

  const phoneCardStyle = {
    textDecoration: "none",
    color: "#111",
    background: "rgba(255,255,255,.92)",
    border: "1px solid rgba(0,0,0,.06)",
    borderRadius: "24px",
    padding: isMobile ? "16px" : "22px",
    boxShadow: "0 22px 55px rgba(0,0,0,.08)",
  };

  const phoneNumberStyle = {
    display: "block",
    marginTop: "8px",
    fontSize: isMobile ? "1rem" : "1.18rem",
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid rgba(0,0,0,.06)",
    outline: 0,
    borderRadius: "16px",
    padding: "14px 16px",
    background: "#eee8df",
    fontWeight: 700,
    color: "#111",
    fontSize: isMobile ? "0.9rem" : "1rem",
  };

  const textareaStyle = {
    ...inputStyle,
    resize: "vertical" as const,
  };

  const buttonStyle = {
    height: isMobile ? "52px" : "60px",
    border: 0,
    borderRadius: "999px",
    background: "linear-gradient(135deg,#980826,#d20f42)",
    color: "#fff",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 20px 55px rgba(190,0,50,.24)",
    fontSize: isMobile ? "0.9rem" : "1rem",
  };

  const legalTextStyle = {
    color: "rgba(0,0,0,.62)",
    fontSize: isMobile ? "0.75rem" : ".82rem",
    lineHeight: 1.6,
    margin: "6px 0 0",
  };

  const checkRowStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    color: "rgba(0,0,0,.72)",
    fontSize: isMobile ? "0.8rem" : ".86rem",
    lineHeight: 1.45,
    fontWeight: 650,
  };

  return (
    <>
      <section className="contact-grid" style={sectionWrapperStyle}>
        <div style={leftCardStyle}>
          <span style={{ color: "#b40032", fontWeight: 950, letterSpacing: ".24em", fontSize: ".72rem", textTransform: "uppercase" }}>{t.badge}</span>
          <h1 style={titleStyle}>{t.title}</h1>
          <p style={textStyle}>{t.text}</p>
          <div className="phones-grid" style={phoneGridStyle}>
            {phones.map(([label, href, visible]) => (
              <a key={href} href={`tel:${href}`} style={phoneCardStyle}>
                <span style={{ display: "block", color: "#b40032", fontWeight: 950, fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase" }}>{label}</span>
                <strong style={phoneNumberStyle}>{visible}</strong>
                <small style={{ display: "block", marginTop: 10, color: "rgba(0,0,0,.48)", fontWeight: 800 }}>{t.call}</small>
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={submit} style={formStyle}>
          <h2 style={formTitleStyle}>{t.formTitle}</h2>
          <div style={twoColsStyle}>
            <input name="name" placeholder={t.name} required minLength={2} style={inputStyle} />
            <input name="company" placeholder={t.company} required minLength={2} style={inputStyle} />
          </div>
          <div style={twoColsStyle}>
            <input name="email" type="email" placeholder={t.email} required style={inputStyle} />
            <input name="phone" placeholder={t.phone} required minLength={7} inputMode="tel" style={inputStyle} />
          </div>
          <select name="country" required defaultValue="" style={inputStyle}>
            <option value="" disabled>{t.country}</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <textarea name="message" placeholder={t.message} rows={isMobile ? 5 : 7} required minLength={10} style={textareaStyle} />
          <p style={legalTextStyle}>{t.legal}</p>
          <label style={checkRowStyle}>
            <input name="privacyAccepted" type="checkbox" required />
            <span>{t.privacy}</span>
          </label>
          <label style={checkRowStyle}>
            <input name="marketingAccepted" type="checkbox" />
            <span>{t.marketing}</span>
          </label>
          <button type="submit" disabled={sending} style={buttonStyle}>
            {sending ? t.sending : t.submit}
          </button>
          {sent && <p style={{ color: "#087a3b", fontWeight: 900, marginTop: 10 }}>{t.success}</p>}
          {error && <p style={{ color: "#c1121f", fontWeight: 900, marginTop: 10 }}>{error}</p>}
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
    </>
  );
}
