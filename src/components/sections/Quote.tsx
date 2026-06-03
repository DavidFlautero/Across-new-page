"use client";

import { useMemo, useState } from "react";
import styles from "./Quote.module.css";

const steps = [
  "Contacto",
  "Ruta",
  "Servicio",
  "Carga",
  "Confirmación",
];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    operation: "",
    timeline: "",
    service: "",
    incoterm: "",
    cargo: "",
    weight: "",
    dimensions: "",
    condition: "",
    message: "",
    privacyAccepted: false,
  });

  const canContinue = useMemo(() => {
    if (step === 0) return form.name && form.company && form.email && form.phone;
    if (step === 1) return form.origin && form.destination;
    if (step === 2) return form.service;
    return true;
  }, [step, form]);

  async function submitQuote() {
    if (!form.privacyAccepted || loading) return;

    try {
      setLoading(true);

      const response = await fetch("/api/cotizacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          country: form.origin || "Colombia",
          website: window.location.origin,
          marketingAccepted: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        alert("No se pudo enviar la solicitud. Revise los datos e inténtelo nuevamente.");
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("No se pudo enviar la solicitud. Inténtelo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cotizacion" className={styles.section}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <span>Cotización Express</span>
          <h1>Solicite su presupuesto logístico</h1>
          <p>
            Complete el formulario paso a paso. Al finalizar, el equipo comercial
            podrá revisar su solicitud con la información necesaria.
          </p>

          <div className={styles.timeline}>
            {steps.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setStep(index)}
                className={`${styles.step} ${index === step ? styles.active : ""} ${
                  index < step ? styles.done : ""
                }`}
              >
                <i />
                <div>
                  <small>Paso {index + 1}</small>
                  <strong>{item}</strong>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <small>{steps[step]}</small>
            <strong>{String(step + 1).padStart(2, "0")}</strong>
          </div>

          <form onSubmit={(event) => event.preventDefault()}>
            {step === 0 && (
              <div className={styles.grid}>
                <input
                  placeholder="Nombre completo *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Empresa *"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  placeholder="Teléfono *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            )}

            {step === 1 && (
              <div className={styles.grid}>
                <input
                  placeholder="País / ciudad de origen *"
                  value={form.origin}
                  onChange={(e) => setForm({ ...form, origin: e.target.value })}
                />
                <input
                  placeholder="País / ciudad de destino *"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                />
                <select
                  value={form.operation}
                  onChange={(e) => setForm({ ...form, operation: e.target.value })}
                >
                  <option value="" disabled>Tipo de operación</option>
                  <option>Importación</option>
                  <option>Exportación</option>
                  <option>Nacional</option>
                  <option>Internacional</option>
                </select>
                <input
                  placeholder="Fecha estimada"
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                />
              </div>
            )}

            {step === 2 && (
              <div className={styles.grid}>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="" disabled>Servicio requerido</option>
                  <option>Transporte Aéreo</option>
                  <option>Transporte Marítimo</option>
                  <option>Cargas Especiales</option>
                  <option>Temperatura Controlada</option>
                  <option>Almacén y Distribución</option>
                  <option>Servicios de Aduanas</option>
                  <option>e-Commerce</option>
                </select>
                <select
                  value={form.incoterm}
                  onChange={(e) => setForm({ ...form, incoterm: e.target.value })}
                >
                  <option value="" disabled>Incoterm</option>
                  <option>EXW</option>
                  <option>FOB</option>
                  <option>CIF</option>
                  <option>DAP</option>
                  <option>DDP</option>
                  <option>No lo sé todavía</option>
                </select>
              </div>
            )}

            {step === 3 && (
              <div className={styles.grid}>
                <input
                  placeholder="Tipo de mercancía *"
                  value={form.cargo}
                  onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                />
                <input
                  placeholder="Peso aproximado"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                />
                <input
                  placeholder="Dimensiones / volumen"
                  value={form.dimensions}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                />
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                >
                  <option value="" disabled>Condición especial</option>
                  <option>No aplica</option>
                  <option>Mercancía peligrosa</option>
                  <option>Temperatura controlada</option>
                  <option>Carga frágil</option>
                  <option>Carga sobredimensionada</option>
                  <option>Baterías de litio</option>
                </select>
              </div>
            )}

            {step === 4 && (
              <div className={styles.grid}>
                <textarea
                  className={styles.full}
                  placeholder="Explique brevemente su necesidad logística"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={form.privacyAccepted}
                    onChange={(e) =>
                      setForm({ ...form, privacyAccepted: e.target.checked })
                    }
                  />
                  <span>Acepto el tratamiento de mis datos para recibir respuesta comercial.</span>
                </label>
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                disabled={step === 0 || loading}
                onClick={() => setStep((v) => Math.max(0, v - 1))}
              >
                Anterior
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className={styles.primary}
                  disabled={!canContinue}
                  onClick={() =>
                    canContinue && setStep((v) => Math.min(steps.length - 1, v + 1))
                  }
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.primary}
                  disabled={!form.privacyAccepted || loading || success}
                  onClick={submitQuote}
                >
                  {loading
                    ? "Enviando..."
                    : success
                      ? "Solicitud enviada"
                      : "Solicitar presupuesto"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
