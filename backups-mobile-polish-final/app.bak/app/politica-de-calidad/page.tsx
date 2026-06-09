import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/app/_legal/LegalPage.module.css";

const html = `<h1>Política de Calidad y Desempeño Ambiental</h1>
            </section>
        </section>
        <section>
            <section>
                <h2>Nuestro objetivo es superar la satisfacción del cliente y contribuir activamente a la protección del entorno</h2>
                <p>La <strong>política de calidad de ACROSS LOGISTICS</strong> se basa en satisfacer las expectativas de nuestros clientes, garantizando al mismo tiempo un firme compromiso con la protección del medio ambiente y la prevención de la contaminación. Para ello, nos apoyamos en los siguientes principios:</p>
                <ul>
                    <li><p>Asegurar que los servicios prestados a nuestros clientes se realizan en condiciones óptimas y dentro de los plazos previamente establecidos.</p></li>
                    <li><p>Cumplir con los requisitos legales aplicables, tanto en el ámbito de nuestra actividad como en materia medioambiental.</p></li>
                    <li><p>Contar con personal competente para el desarrollo de nuestra actividad, promoviendo su concienciación sobre la importancia de su labor para alcanzar nuestros objetivos comunes.</p></li>
                    <li><p>Planificar y revisar anualmente objetivos que impulsen la mejora continua de nuestro sistema de gestión de calidad, controlando riesgos, reduciendo costes y mejorando aquellos aspectos menos valorados por nuestros clientes.</p></li>
                </ul>
                <p>En línea con nuestro compromiso ambiental, estamos en proceso de certificación del sistema de Gestión Ambiental conforme a la norma UNE-EN ISO 14001. A través de controles operacionales, analizamos el cumplimiento de la normativa aplicable y gestionamos los impactos que nuestra actividad pueda generar sobre el entorno.</p>
                <p>Cada año evaluamos nuestros principales aspectos ambientales y definimos metas orientadas a mejorar nuestro comportamiento ecológico. Para medir esta evolución, disponemos de indicadores que revisamos de manera periódica, asegurando así un progreso constante en esta materia.</p>
                <p>Los resultados obtenidos están a disposición de todas las partes interesadas. Para más información sobre nuestro desempeño ambiental, puede contactarnos a través del siguiente correo electrónico: <a href='mailto:arnau@acrosslogistics.com'>arnau@acrosslogistics.com</a></p>
                <p>Desde la Dirección de <strong>ACROSS LOGISTICS</strong> nos comprometemos a la revisión, comunicación y comprensión adecuada de esta política, así como a proporcionar los medios necesarios para alcanzar los principios que la sustentan.</p>
                <p>Barcelona, a 3 de Octubre de 2025.</p>
                <p>Firmado:</p>
                
                <p><strong>Vicente Castellano Montoro.</strong></p>
                <p><strong>General Manager</strong></p>
            </section>
        </section>

        <section>
            <section>            
                <a href="/documents/AL_politica-de-calidad.pdf" download="politicas-de-calidad" type="button">Descargar Política de Calidad </a>
            </section>
        </section>
    </section>
</section>


        
<section>
    <section>
        <section>`;

export default function Page() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <span className={styles.kicker}>LEGAL</span>
        <h1>Política de Calidad</h1>

        <article
          className={styles.article}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <Footer />
    </div>
  );
}
