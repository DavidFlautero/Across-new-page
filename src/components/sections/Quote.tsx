"use client";

import { useState } from "react";
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

          <form>
            {step === 0 && (
              <div className={styles.grid}>
                <input placeholder="Nombre completo *" />
                <input placeholder="Empresa *" />
                <input placeholder="Email *" />
                <input placeholder="Teléfono *" />
              </div>
            )}

            {step === 1 && (
              <div className={styles.grid}>
                <input placeholder="País / ciudad de origen *" />
                <input placeholder="País / ciudad de destino *" />
                <select defaultValue="">
                  <option value="" disabled>Tipo de operación</option>
                  <option>Importación</option>
                  <option>Exportación</option>
                  <option>Nacional</option>
                  <option>Internacional</option>
                </select>
                <input placeholder="Fecha estimada" />
              </div>
            )}

            {step === 2 && (
              <div className={styles.grid}>
                <select defaultValue="">
                  <option value="" disabled>Servicio requerido</option>
                  <option>Transporte Aéreo</option>
                  <option>Transporte Marítimo</option>
                  <option>Cargas Especiales</option>
                  <option>Temperatura Controlada</option>
                  <option>Almacén y Distribución</option>
                  <option>Servicios de Aduanas</option>
                  <option>e-Commerce</option>
                </select>
                <select defaultValue="">
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
                <input placeholder="Tipo de mercancía *" />
                <input placeholder="Peso aproximado" />
                <input placeholder="Dimensiones / volumen" />
                <select defaultValue="">
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
                />
                <label className={styles.consent}>
                  <input type="checkbox" />
                  <span>Acepto el tratamiento de mis datos para recibir respuesta comercial.</span>
                </label>
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep((v) => Math.max(0, v - 1))}
              >
                Anterior
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  className={styles.primary}
                  onClick={() => setStep((v) => Math.min(steps.length - 1, v + 1))}
                >
                  Siguiente
                </button>
              ) : (
                <button type="button" className={styles.primary}>
                  Solicitar presupuesto
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
