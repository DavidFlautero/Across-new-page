import styles from "./TrackingOperationalMap.module.css";

const milestones = [
  {
    label: "Origen",
    value: "Barcelona",
    status: "Confirmado",
  },
  {
    label: "Tránsito",
    value: "Rotterdam",
    status: "En ruta",
  },
  {
    label: "Destino",
    value: "Miami",
    status: "Previsto",
  },
];

export default function TrackingOperationalMap() {
  return (
    <aside className={styles.mapPanel} aria-label="Mapa operativo de tracking internacional">
      <div className={styles.mapHeader}>
        <div>
          <span>Control operativo</span>
          <h2>Seguimiento internacional en tiempo real.</h2>
        </div>

        <div className={styles.liveBadge}>
          <i />
          Activo
        </div>
      </div>

      <div className={styles.mapStage}>
        <svg
          className={styles.worldMap}
          viewBox="0 0 900 520"
          role="img"
          aria-label="Ruta logística internacional"
        >
          <defs>
            <radialGradient id="trackingGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(237, 27, 47, .34)" />
              <stop offset="100%" stopColor="rgba(237, 27, 47, 0)" />
            </radialGradient>

            <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,.18)" />
              <stop offset="45%" stopColor="rgba(237,27,47,.95)" />
              <stop offset="100%" stopColor="rgba(213,168,91,.78)" />
            </linearGradient>
          </defs>

          <path
            className={styles.land}
            d="M95 168c46-38 105-54 168-36 45 13 78 2 118-17 55-26 107-11 142 24 36 36 80 38 130 24 56-16 108 5 135 49 29 47 18 98-23 126-45 31-103 19-145 38-51 23-88 61-151 50-64-11-75-64-129-76-58-13-118 24-168-12-54-38-51-121-77-170Z"
          />

          <path
            className={styles.landSoft}
            d="M185 250c22-35 77-52 121-38 39 12 67 46 111 39 62-10 81-76 146-72 54 3 100 43 106 91 7 54-33 96-89 96-40 0-69-22-108-13-54 13-72 61-128 57-51-3-69-47-103-70-35-23-78-38-56-90Z"
          />

          <path
            className={styles.gridLine}
            d="M80 135h740M70 260h760M95 385h710M230 88v350M450 70v390M670 100v330"
          />

          <path
            className={styles.routeShadow}
            d="M195 302 C315 205, 438 205, 535 258 S705 326, 760 214"
          />

          <path
            className={styles.route}
            d="M195 302 C315 205, 438 205, 535 258 S705 326, 760 214"
          />

          <circle className={styles.glow} cx="195" cy="302" r="70" />
          <circle className={styles.glow} cx="535" cy="258" r="62" />
          <circle className={styles.glowGold} cx="760" cy="214" r="78" />

          <g className={styles.nodeOrigin}>
            <circle cx="195" cy="302" r="9" />
            <circle cx="195" cy="302" r="20" />
          </g>

          <g className={styles.nodeTransit}>
            <circle cx="535" cy="258" r="9" />
            <circle cx="535" cy="258" r="20" />
          </g>

          <g className={styles.nodeDestination}>
            <circle cx="760" cy="214" r="9" />
            <circle cx="760" cy="214" r="20" />
          </g>

          <text className={styles.mapLabel} x="166" y="342">
            BCN
          </text>
          <text className={styles.mapLabel} x="498" y="298">
            RTM
          </text>
          <text className={styles.mapLabel} x="724" y="254">
            MIA
          </text>
        </svg>

        <div className={styles.floatingCard}>
          <span>Shipment ID</span>
          <strong>ACR-7482-INT</strong>
          <p>ETA actualizada · Documentación validada</p>
        </div>
      </div>

      <div className={styles.timeline}>
        {milestones.map((item, index) => (
          <article key={item.label} className={index === 1 ? styles.currentStep : ""}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <small>{item.status}</small>
          </article>
        ))}
      </div>
    </aside>
  );
}
