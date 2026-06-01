"use client";

import { useState } from "react";
import styles from "./FloatingCallButton.module.css";

const countries = [
  "Argentina",
  "Colombia",
  "España",
  "México",
  "Chile",
  "Perú",
  "Ecuador",
  "Uruguay",
  "Paraguay",
  "Bolivia",
  "Brasil",
  "Estados Unidos",
  "China",
  "Hong Kong",
  "Países Bajos",
  "Portugal",
  "Emiratos Árabes Unidos",
  "Otro",
];

export default function FloatingCallButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={styles.floating} onClick={() => setOpen(true)}>
        <div className={styles.icon}>✆</div>
        <div className={styles.copy}>
          <span>Asesor comercial</span>
          <strong>Solicitar llamada</strong>
        </div>
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setOpen(false)}>
              ×
            </button>

            <div className={styles.modalHeader}>
              <div className={styles.modalIcon}>✆</div>
              <div>
                <h3>Agende una llamada</h3>
                <p>Para un asesoramiento personalizado</p>
              </div>
            </div>

            <form className={styles.form}>
              <div className={styles.grid}>
                <label>
                  <span>Fecha:</span>
                  <input type="date" required />
                </label>

                <label>
                  <span>Hora:</span>
                  <input type="time" required />
                </label>
              </div>

              <label>
                <span>Nombre:</span>
                <input type="text" required />
              </label>

              <label>
                <span>Empresa:</span>
                <input type="text" />
              </label>

              <div className={styles.grid}>
                <label>
                  <span>Teléfono:</span>
                  <input type="tel" required />
                </label>

                <label>
                  <span>Email:</span>
                  <input type="email" required />
                </label>
              </div>

              <label>
                <span>País:</span>
                <select defaultValue="" required>
                  <option value="" disabled>
                    Seleccionar país
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Breve Descripción:</span>
                <textarea rows={4} />
              </label>

              <button type="submit">Reservar cita de llamada</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
