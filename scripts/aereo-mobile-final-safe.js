const fs = require("fs");

const pagePath = "src/app/servicios/transporte-aereo/page.tsx";
let page = fs.readFileSync(pagePath, "utf8");

function localeBounds(text, locale) {
  const re = /\n\s*"?(es|en|zh)"?\s*:\s*\{/g;
  const matches = [...text.matchAll(re)];
  const idx = matches.findIndex((m) => m[1] === locale);

  if (idx === -1) return null;

  const start = matches[idx].index + 1;
  const end =
    idx + 1 < matches.length
      ? matches[idx + 1].index + 1
      : text.indexOf("} satisfies", start);

  return end === -1 ? null : { start, end };
}

function setString(block, key, value) {
  const patterns = [
    new RegExp(`(${key}:\\s*)"[^"]*"`, "m"),
    new RegExp(`("${key}":\\s*)"[^"]*"`, "m"),
  ];

  for (const re of patterns) {
    if (re.test(block)) return block.replace(re, `$1${JSON.stringify(value)}`);
  }

  return block;
}

function removeString(block, key) {
  block = block.replace(new RegExp(`\\n\\s*${key}:\\s*"[^"]*",`, "g"), "");
  block = block.replace(new RegExp(`\\n\\s*"${key}":\\s*"[^"]*",`, "g"), "");
  return block;
}

function removeGroupBefore(block, startKey, endKey) {
  const idx = block.indexOf(`    ${startKey}:`);
  const idxQuoted = block.indexOf(`    "${startKey}":`);
  const start = idx !== -1 ? idx : idxQuoted;
  if (start === -1) return block;

  const endA = block.indexOf(`    ${endKey}:`, start);
  const endB = block.indexOf(`    "${endKey}":`, start);
  const end = endA !== -1 ? endA : endB;

  if (end === -1) return block;

  return block.slice(0, start) + block.slice(end);
}

function replaceProcessData(block, locale) {
  const data = {
    es: {
      eyebrow: "OPERACIÓN AÉREA ESPECIALIZADA",
      title: "Modalidades aéreas críticas.",
      items: [
        [
          "Próximo vuelo disponible (NFO)",
          "Salida en el próximo vuelo viable.",
          "Cuando la carga no puede esperar una programación normal y cada hora afecta producción, ventas o compromisos con clientes.",
          "Revisamos origen, destino, peso, volumen, documentación y disponibilidad aérea para ubicar la salida más inmediata.",
          "Evita días perdidos, rutas lentas, falta de espacio y decisiones improvisadas bajo presión.",
        ],
        [
          "Courier a bordo (OBC)",
          "Acompañamiento para documentos, muestras, repuestos o mercancía crítica.",
          "Cuando la carga necesita control directo y no puede viajar sin supervisión durante el trayecto.",
          "Un courier acompaña la mercancía y mantiene control sobre los puntos críticos del movimiento.",
          "Evita pérdida de visibilidad, desconexión entre etapas y falta de control sobre carga sensible.",
        ],
        [
          "Operación directa / back-to-back",
          "Menor manipulación y control más cerrado entre origen y destino.",
          "Cuando la carga debe pasar por menos manos, menos conexiones y menos puntos de fricción operativa.",
          "Coordinamos una operación más directa, alineando origen, aerolínea, documentación y destino.",
          "Evita manipulación innecesaria, errores de transferencia y pérdida de trazabilidad.",
        ],
        [
          "Carga regulada",
          "Mercancía con requisitos de aerolínea, seguridad, aduana o manejo especial.",
          "Cuando un requisito mal validado puede generar rechazo, retención, costos adicionales o bloqueo de salida.",
          "Revisamos condiciones de aceptación, documentos, restricciones y requisitos antes de coordinar la reserva.",
          "Evita rechazos de aerolínea, demoras documentales, reprocesos y sobrecostos.",
        ],
      ],
    },
    en: {
      eyebrow: "SPECIALIZED AIR OPERATION",
      title: "Critical air modalities.",
      items: [
        ["Next Flight Out", "Departure on the next viable flight.", "When cargo cannot wait for a standard schedule and every hour affects production, sales or client commitments.", "We review origin, destination, weight, volume, documentation and air availability to locate the fastest viable departure.", "Avoids lost days, slow routes, lack of space and improvised decisions under pressure."],
        ["On Board Courier", "Accompaniment for documents, samples, spare parts or critical cargo.", "When cargo requires direct control and cannot travel without supervision during the journey.", "A courier accompanies the goods and maintains control over critical movement points.", "Avoids loss of visibility, disconnected stages and lack of control over sensitive cargo."],
        ["Back-to-back / direct", "Less handling and tighter control between origin and destination.", "When cargo must move through fewer hands, fewer connections and fewer operational friction points.", "We coordinate a more direct operation, aligning origin, airline, documentation and destination.", "Avoids unnecessary handling, transfer errors and loss of traceability."],
        ["Regulated cargo", "Cargo with airline, security, customs or special handling requirements.", "When a poorly validated requirement can cause rejection, retention, extra costs or departure blockage.", "We review acceptance conditions, documents, restrictions and requirements before coordinating the booking.", "Avoids airline rejections, documentation delays, rework and extra costs."],
      ],
    },
    zh: {
      eyebrow: "专业空运操作",
      title: "关键空运模式。",
      items: [
        ["下一个可行航班", "安排下一个可行航班出运。", "当货物无法等待标准排期，并且每小时都可能影响生产、销售或客户承诺时。", "我们会审核始发地、目的地、重量、体积、文件和舱位，寻找最快可行出运方案。", "避免时间损失、路线过慢、舱位不足和临时决策风险。"],
        ["随货专人服务", "适用于文件、样品、备件或关键货物的随货服务。", "当货物需要直接管控，不能在运输过程中缺少监督时。", "由专人陪同货物运输，并控制运输过程中的关键节点。", "避免可视性不足、环节断裂和敏感货物失控。"],
        ["直达 / back-to-back 操作", "减少操作环节，加强始发地与目的地之间的管控。", "当货物需要减少经手、连接和操作摩擦点时。", "我们协调更直接的操作，衔接始发地、航空公司、文件和目的地。", "避免不必要的操作、转运错误和追踪中断。"],
        ["受监管货物", "具有航空公司、安全、海关或特殊操作要求的货物。", "当要求未提前确认可能导致拒收、滞留、额外成本或无法出运时。", "我们在订舱前审核接收条件、文件、限制和要求。", "避免航空公司拒收、文件延误、返工和额外成本。"],
      ],
    },
  }[locale];

  const processArray = data.items
    .map((item) => `      [\n        ${item.map(JSON.stringify).join(",\n        ")}\n      ]`)
    .join(",\n");

  block = setString(block, "processEyebrow", data.eyebrow);
  block = setString(block, "processTitle", data.title);

  const start = block.indexOf("    process:");
  if (start === -1) return block;

  const end = block.indexOf("    bandTitle:", start);
  if (end === -1) return block;

  const replacement = `    process: [\n${processArray},\n    ],\n\n`;
  return block.slice(0, start) + replacement + block.slice(end);
}

function upsertWhiteClose(block, locale) {
  const data = {
    es: {
      eyebrow: "ANTES DE COTIZAR",
      title: "La ruta aérea se define por carga, urgencia y documentación.",
      text: "Antes de coordinar, revisamos qué se mueve, desde dónde sale, cuándo debe llegar y qué requisitos documentales tiene. Con eso definimos si conviene urgente, consolidado, courier, directo o chárter.",
      cta: "Cotizar carga aérea",
      points: [
        ["Carga", "Tipo de mercancía, valor, sensibilidad y cuidado requerido."],
        ["Ruta", "Origen, destino, disponibilidad aérea y fecha límite."],
        ["Control", "Documentos, restricciones y seguimiento operativo."],
      ],
    },
    en: {
      eyebrow: "BEFORE QUOTING",
      title: "The air route is defined by cargo, urgency and documentation.",
      text: "Before coordinating, we review what moves, where it departs from, when it must arrive and which documents are required. With that, we define whether urgent, consolidated, courier, direct or charter is more viable.",
      cta: "Quote air cargo",
      points: [
        ["Cargo", "Type of goods, value, sensitivity and required care."],
        ["Route", "Origin, destination, air availability and deadline."],
        ["Control", "Documents, restrictions and operational tracking."],
      ],
    },
    zh: {
      eyebrow: "报价前",
      title: "空运路线取决于货物、紧急程度和文件要求。",
      text: "协调前，我们会确认货物类型、始发地、到达时限以及所需文件。根据这些 信息判断紧急空运、拼货、专人携带、直达或包机是否更合适。",
      cta: "获取空运报价",
      points: [
        ["货物", "货物类型、价值、敏感性和所需照护。"],
        ["路线", "始发地、目的地、舱位可用性和截止时间。"],
        ["管控", "文件、限制要求和运营跟踪。"],
      ],
    },
  }[locale];

  block = removeGroupBefore(block, "whiteCloseEyebrow", "pillars");
  block = removeGroupBefore(block, "preQuoteEyebrow", "pillars");

  const points = data.points
    .map(([title, text]) => `[${JSON.stringify(title)}, ${JSON.stringify(text)}]`)
    .join(",\n      ");

  const insert = `    whiteCloseEyebrow: ${JSON.stringify(data.eyebrow)},
    whiteCloseTitle: ${JSON.stringify(data.title)},
    whiteCloseText: ${JSON.stringify(data.text)},
    whiteCloseCta: ${JSON.stringify(data.cta)},
    whiteClosePoints: [
      ${points},
    ],

`;

  return block.replace(/(\s*"?pillars"?\s*:)/, insert + "$1");
}

function upsertSticky(block, locale) {
  const data = {
    es: {
      stickyPrimary: "Iniciar operación",
      stickySecondary: "Contacto",
      stickySecondaryHref: "/contacto?servicio=transporte-aereo",
    },
    en: {
      stickyPrimary: "Start operation",
      stickySecondary: "Contact",
      stickySecondaryHref: "/contacto?servicio=transporte-aereo",
    },
    zh: {
      stickyPrimary: "启动操作",
      stickySecondary: "联系",
      stickySecondaryHref: "/contacto?servicio=transporte-aereo",
    },
  }[locale];

  for (const key of ["stickyPrimary", "stickySecondary", "stickySecondaryHref"]) {
    block = removeString(block, key);
  }

  const insert = `
    stickyPrimary: ${JSON.stringify(data.stickyPrimary)},
    stickySecondary: ${JSON.stringify(data.stickySecondary)},
    stickySecondaryHref: ${JSON.stringify(data.stickySecondaryHref)},
`;

  return block.replace(/(\n\s*"?secondaryCta"?\s*:\s*"[^"]*",)/, `$1${insert}`);
}

function updateLocale(locale) {
  const bounds = localeBounds(page, locale);
  if (!bounds) return;

  let block = page.slice(bounds.start, bounds.end);

  const byLocale = {
    es: {
      heroEyebrow: "TRANSPORTE AÉREO INTERNACIONAL",
      heroTitle: "Movemos su carga aérea con rapidez, control y trazabilidad.",
      heroText: "Coordinamos envíos aéreos internacionales con control documental, seguimiento operativo y soluciones adaptadas a cargas críticas, sensibles o de alto valor.",
      primaryCta: "Iniciar operación aérea",
      secondaryCta: "Hablar con un especialista",
      overviewEyebrow: "CARGA AÉREA BAJO CONTROL",
      overviewTitle: "Monitoreo, cuidado y puntualidad para su carga aérea.",
      overviewText: "La velocidad importa, pero no alcanza. En Across Logistics damos seguimiento a la operación aérea, cuidamos mercancía sensible y coordinamos cada etapa para reducir demoras, errores documentales y riesgos durante el transporte.",
      overviewButton: "Rastrear carga aérea",
      finalTitle: "Coordinemos su próxima operación aérea internacional.",
      finalText: "Hable con un especialista y reciba una solución logística adaptada a su carga, destino y urgencia.",
      finalPrimary: "Hablar con un especialista",
      finalSecondary: "Cotizar carga aérea",
    },
    en: {
      heroEyebrow: "INTERNATIONAL AIR FREIGHT",
      heroTitle: "We move your air cargo with speed, control and traceability.",
      heroText: "We coordinate international air shipments with document control, operational tracking and solutions adapted to sensitive, urgent or high-value cargo.",
      primaryCta: "Start air operation",
      secondaryCta: "Talk to a specialist",
      overviewEyebrow: "AIR CARGO UNDER CONTROL",
      overviewTitle: "Monitoring, care and punctuality for your air cargo.",
      overviewText: "Speed matters, but it is not enough. At Across Logistics, we monitor air operations, protect sensitive cargo and coordinate each stage to reduce delays, documentation errors and transport risks.",
      overviewButton: "Track air cargo",
      finalTitle: "Let’s coordinate your next international air operation.",
      finalText: "Talk to a specialist and receive a logistics solution adapted to your cargo, destination and urgency.",
      finalPrimary: "Talk to a specialist",
      finalSecondary: "Quote air cargo",
    },
    zh: {
      heroEyebrow: "国际空运",
      heroTitle: "快速、管控、全程可追踪地运输您的空运货物。",
      heroText: "我们协调国际空运业务，提供文件控制、运营跟踪以及适用于敏感、紧 急或高价值货物的定制方案。",
      primaryCta: "启动空运操作",
      secondaryCta: "联系专家",
      overviewEyebrow: "空运货物全程管控",
      overviewTitle: "为您的空运货物提供监控、照护与准点管理。",
      overviewText: "速度很重要，但还不够。Across Logistics 跟踪空运操作，照护敏感货物，并协调每个环节，以减少延误、文件错误和运输风险。",
      overviewButton: "追踪空运货物",
      finalTitle: "协调您的下一次国际空运操作。",
      finalText: "联系专家，根据您的货物、目的地和紧急程度获得合适的物流方案。",
      finalPrimary: "联系专家",
      finalSecondary: "获取空运报价",
    },
  }[locale];

  for (const [key, value] of Object.entries(byLocale)) {
    block = setString(block, key, value);
  }

  block = upsertSticky(block, locale);
  block = upsertWhiteClose(block, locale);
  block = replaceProcessData(block, locale);

  page = page.slice(0, bounds.start) + block + page.slice(bounds.end);
}

for (const locale of ["es", "en", "zh"]) updateLocale(locale);

/* Limpiar bloques duplicados que no van */
page = page.replace(
  /\n\s*<section className=\{styles\.(?:contactHero|servicePreQuote|airActionMobile|airDecisionMobile|airQuoteMobile|airBridgeMobile|airWhiteCloseMobile)\}[\s\S]*?\n\s*<\/section>\s*/g,
  "\n"
);

/* Overview button hacia tracking */
page = page.replace(
  /<Link href="\/cotizacion">\{t\.overviewButton\}<\/Link>/g,
  '<Link href="/tracking?servicio=transporte-aereo">{t.overviewButton}</Link>'
);
page = page.replace(
  /<Link href="\/contacto">\{t\.overviewButton\}<\/Link>/g,
  '<Link href="/tracking?servicio=transporte-aereo">{t.overviewButton}</Link>'
);

/* Reemplazar sección process por acordeón */
const processSection = `
        <section className={styles.process}>
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>{t.processEyebrow}</span>
            <h2>{t.processTitle}</h2>
          </div>

          <div className={styles.processGrid} data-process-accordion="true">
            {t.process.map(([title, summary, when, operation, avoids]: string[], index: number) => {
              const icons: IconName[] = ["plane", "headset", "route", "document"];
              const ctas = {
                es: ["Iniciar operación NFO", "Coordinar courier a bordo", "Planificar operación directa", "Revisar carga regulada"],
                en: ["Start NFO operation", "Coordinate onboard courier", "Plan direct operation", "Review regulated cargo"],
                zh: ["启动下一航班操作", "协调随货专人", "规划直达操作", "审核受监管货物"],
              }[locale];

              return (
                <details key={title} className={styles.processAccordionItem}>
                  <summary>
                    <strong>{index + 1}</strong>
                    <i aria-hidden="true">{renderIcon(icons[index])}</i>
                    <div className={styles.processAccordionText}>
                      <h3>{title}</h3>
                      <p>{summary}</p>
                    </div>
                    <span className={styles.processAccordionPlus} aria-hidden="true" />
                  </summary>

                  <div className={styles.processAccordionBody}>
                    <div>
                      <b>{locale === "es" ? "Cuándo aplica" : locale === "en" ? "When it applies" : "适用场景"}</b>
                      <p>{when}</p>
                    </div>
                    <div>
                      <b>{locale === "es" ? "Cómo se opera" : locale === "en" ? "How it works" : "操作方式"}</b>
                      <p>{operation}</p>
                    </div>
                    <div>
                      <b>{locale === "es" ? "Qué evita" : locale === "en" ? "What it avoids" : "避免风险"}</b>
                      <p>{avoids}</p>
                    </div>

                    <Link href={\`/cotizacion?servicio=transporte-aereo&modalidad=\${encodeURIComponent(title)}\`}>
                      {ctas[index]}
                    </Link>
                  </div>
                </details>
              );
            })}
          </div>
        </section>

`;

page = page.replace(
  /\n\s*<section className=\{styles\.process\}[\s\S]*?\n\s*<\/section>\s*/g,
  "\n" + processSection
);

/* Insertar bloque blanco antes del final CTA */
const whiteSection = `
        <section className={styles.airWhiteCloseMobile} aria-labelledby="air-white-close-title">
          <span className={styles.eyebrow}>{t.whiteCloseEyebrow}</span>
          <h2 id="air-white-close-title">{t.whiteCloseTitle}</h2>
          <p>{t.whiteCloseText}</p>

          <div className={styles.airWhiteClosePoints}>
            {t.whiteClosePoints.map(([title, text]: string[]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>

          <Link href="/cotizacion?servicio=transporte-aereo">
            {t.whiteCloseCta}
          </Link>
        </section>

`;

page = page.replace(
  /(\s*<section className=\{styles\.finalCta\})/,
  whiteSection + "$1"
);

/* Final CTA = sección contacto existente, sin bloque extra */
page = page.replace(
  /<div className=\{styles\.finalActions\}>[\s\S]*?<\/div>/g,
  `<div className={styles.finalActions}>
              <Link href="/contacto?servicio=transporte-aereo">{t.finalPrimary}</Link>
            </div>`
);

/* Sticky mobile: iniciar operación + contacto */
page = page.replace(
  /\n\s*<div className=\{styles\.mobileStickyCta\}[\s\S]*?\n\s*<\/div>\s*(?=\n\s*<Footer \/>)/g,
  "\n"
);

const sticky = `
      <div className={styles.mobileStickyCta} aria-label="Acciones rápidas de transporte aéreo">
        <Link href="/cotizacion?servicio=transporte-aereo">
          {t.stickyPrimary}
        </Link>

        <Link href={t.stickySecondaryHref}>
          {t.stickySecondary}
        </Link>
      </div>

`;

page = page.replace("      <Footer />", sticky + "      <Footer />");

fs.writeFileSync(pagePath, page);
console.log("OK: aéreo mobile aplicado sin duplicar contactHero ni tocar otras páginas.");
