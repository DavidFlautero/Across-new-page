import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Cotizacion.module.css";

const incoterms = [
  ["EXW", "Ex Works"],
  ["FCA", "Free Carrier"],
  ["CPT", "Carriage Paid To"],
  ["CIP", "Carriage and Insurance Paid To"],
  ["DAP", "Delivered At Place"],
  ["DPU", "Delivered At Place Unloaded"],
  ["DDP", "Delivered Duty Paid"],
  ["FAS", "Free Alongside Ship"],
  ["FOB", "Free On Board"],
  ["CFR", "Cost and Freight"],
  ["CIF", "Cost, Insurance and Freight"],
];

const cargoTypes = [
  ["Pallet Europeo", "120 × 80 cm"],
  ["Pallet Americano", "120 × 100 cm"],
  ["Pallets Otros", "Medidas a determinar"],
  ["Cajas o bultos", "Carga suelta"],
];

export default function CotizacionPage() {
  return (
    <div className="page-shell">
      <Header />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <span>Cotizador Express</span>
            <h1>Configure su operación logística con precisión.</h1>
            <p>
              Complete los datos de su requerimiento y nuestro equipo preparará
              una propuesta ajustada a su carga, destino, urgencia y tipo de operación.
            </p>
          </div>
        </section>

        <section className={styles.quoteShell}>
          <aside className={styles.steps}>
            <div className={styles.stepActive}>
              <b>01</b>
              <span>Datos de contacto</span>
            </div>
            <div>
              <b>02</b>
              <span>Operación</span>
            </div>
            <div>
              <b>03</b>
              <span>Tipo de carga</span>
            </div>
            <div>
              <b>04</b>
              <span>Requerimientos</span>
            </div>
            <div>
              <b>05</b>
              <span>Confirmación</span>
            </div>
          </aside>

          <form className={styles.formCard}>
            <div className={styles.formHeader}>
              <span>01</span>
              <div>
                <h2>Datos de contacto</h2>
                <p>Información básica para gestionar su solicitud comercial.</p>
              </div>
            </div>

            <div className={styles.grid}>
              <label>
                Nombre*
                <input type="text" placeholder="Nombre completo" />
              </label>

              <label>
                Empresa*
                <input type="text" placeholder="Nombre de la empresa" />
              </label>

              <label>
                Email*
                <input type="email" placeholder="empresa@dominio.com" />
              </label>

              <label>
                Teléfono*
                <input type="tel" placeholder="+34 000 000 000" />
              </label>

              <label>
                País*
                <input type="text" placeholder="País" />
              </label>

              <label>
                Fecha de contrato de servicio*
                <input type="date" min={new Date().toISOString().split("T")[0]} />
              </label>
            </div>

            <div className={styles.divider} />

            <div className={styles.formHeader}>
              <span>02</span>
              <div>
                <h2>Operación</h2>
                <p>Origen, destino, modalidad e Incoterm de la operación.</p>
              </div>
            </div>

            <div className={styles.grid}>
              <label>
                Tipo de operación requerida*
                <select defaultValue="">
                  <option value="" disabled>Seleccione operación</option>
                  <option>Exportación</option>
                  <option>Importación</option>
                  <option>Nacional</option>
                </select>
              </label>

              <label>
                Servicio requerido*
                <select defaultValue="">
                  <option value="" disabled>Seleccione servicio</option>
                  <option>Aéreo</option>
                  <option>Marítimo</option>
                  <option>Terrestre</option>
                  <option>Aduanas</option>
                  <option>Almacén y distribución</option>
                  <option>e-Commerce</option>
                </select>
              </label>

              <label>
                País origen*
                <input type="text" placeholder="Argentina" />
              </label>

              <label>
                Dirección origen*
                <input type="text" placeholder="Dirección de recogida" />
              </label>

              <label>
                Aeropuerto / Puerto origen
                <input type="text" placeholder="EZEIZA / Puerto origen" />
              </label>

              <label>
                País destino*
                <input type="text" placeholder="Colombia" />
              </label>

              <label>
                Dirección destino*
                <input type="text" placeholder="Dirección de entrega" />
              </label>

              <label>
                Aeropuerto / Puerto destino
                <input type="text" placeholder="MINISTRO PISTARINI / Puerto destino" />
              </label>
            </div>

            <div className={styles.block}>
              <h3>Incoterm</h3>
              <p>Seleccione la condición comercial aplicable a la operación.</p>

              <div className={styles.optionGrid}>
                {incoterms.map(([code, text]) => (
                  <label key={code} className={styles.option}>
                    <input type="radio" name="incoterm" />
                    <strong>{code}</strong>
                    <small>{text}</small>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formHeader}>
              <span>03</span>
              <div>
                <h2>Tipo de carga</h2>
                <p>Dimensiones, peso, embalaje y condiciones de manipulación.</p>
              </div>
            </div>

            <div className={styles.optionGridFour}>
              {cargoTypes.map(([title, text]: readonly string[]) => (
                <label key={title} className={styles.option}>
                  <input type="radio" name="cargo" />
                  <strong>{title}</strong>
                  <small>{text}</small>
                </label>
              ))}
            </div>

            <div className={styles.measureBox}>
              <h3>Cajas o bultos</h3>

              <div className={styles.measureGrid}>
                <label>
                  Cant.
                  <input type="number" placeholder="1" />
                </label>

                <label>
                  Largo
                  <input type="number" placeholder="Cm" />
                </label>

                <label>
                  Ancho
                  <input type="number" placeholder="Cm" />
                </label>

                <label>
                  Altura
                  <input type="number" placeholder="Cm" />
                </label>

                <label>
                  Peso
                  <input type="number" placeholder="Kg" />
                </label>
              </div>

              <label>
                Información adicional
                <textarea placeholder="Indique detalles técnicos, referencias, restricciones o instrucciones especiales." />
              </label>
            </div>

            <div className={styles.block}>
              <label>
                Descripción de mercadería a transportar*
                <textarea placeholder="Ej: comida, maquinaria, productos farmacéuticos, repuestos, equipos tecnológicos..." />
              </label>

              <div className={styles.optionGridFour}>
                <label className={styles.option}>
                  <input type="radio" name="stackable" />
                  <strong>Apilable</strong>
                  <small>La carga permite apilamiento.</small>
                </label>

                <label className={styles.option}>
                  <input type="radio" name="stackable" />
                  <strong>No apilable</strong>
                  <small>Requiere manipulación individual.</small>
                </label>

                <label className={styles.option}>
                  <input type="radio" name="handling" />
                  <strong>Carga general</strong>
                  <small>Sin requerimientos especiales.</small>
                </label>

                <label className={styles.option}>
                  <input type="radio" name="handling" />
                  <strong>Manipulación especial</strong>
                  <small>Requiere cuidado operativo.</small>
                </label>
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.formHeader}>
              <span>04</span>
              <div>
                <h2>Requerimientos finales</h2>
                <p>Comentarios, privacidad y autorización de contacto.</p>
              </div>
            </div>

            <label>
              Comentarios o requerimientos adicionales
              <textarea placeholder="Complete cualquier información adicional de la operación." />
            </label>

            <div className={styles.legal}>
              <p>
                ACROSS LOGISTICS, S.L.U. tratará sus datos con la finalidad de
                responder a su consulta o petición. Puede acceder, rectificar y
                suprimir sus datos consultando nuestra Política de Privacidad Web.
              </p>

              <label>
                <input type="checkbox" />
                Acepto política de privacidad
              </label>

              <label>
                <input type="checkbox" />
                Acepto recibir información comercial
              </label>
            </div>

            <button type="submit" className={styles.submit}>
              Solicitar presupuesto
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
