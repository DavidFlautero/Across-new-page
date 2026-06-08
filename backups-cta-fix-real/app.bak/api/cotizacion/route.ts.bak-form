import { NextResponse } from "next/server";

const HUBSPOT_URL =
  "https://api-eu1.hsforms.com/submissions/v3/integration/submit/143534810/42649111-7518-40b8-ab3d-764b390763d5";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.company || !body.email || !body.phone) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [firstname, ...lastnameParts] = String(body.name).trim().split(" ");
    const lastname = lastnameParts.join(" ");

    const message = [
      body.message ? `Mensaje: ${body.message}` : "",
      body.origin ? `Origen: ${body.origin}` : "",
      body.destination ? `Destino: ${body.destination}` : "",
      body.service ? `Servicio: ${body.service}` : "",
      body.cargo ? `Carga: ${body.cargo}` : "",
      body.volume ? `Volumen/Peso: ${body.volume}` : "",
      body.timeline ? `Urgencia/Fecha: ${body.timeline}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "company", value: String(body.company) },
        { name: "email", value: String(body.email) },
        { name: "phone", value: String(body.phone) },
        { name: "servicio_interes", value: String(body.service || "") },
        { name: "country__listado_", value: String(body.country || "") },
        { name: "website", value: String(body.website || "https://acrosslogistics.com") },
        { name: "message", value: message || String(body.message || "Solicitud de cotización desde la web.") },
        {
          name: "LEGAL_CONSENT.subscription_type_263522634",
          value: body.privacyAccepted ? "true" : "false",
        },
        {
          name: "LEGAL_CONSENT.subscription_type_263522635",
          value: body.marketingAccepted ? "true" : "false",
        },
      ],
      context: {
        pageUri: "https://acrosslogistics.com/cotizacion",
        pageName: "Cotización Express",
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: Boolean(body.privacyAccepted),
          text: "Acepto que Across Logistics almacene y trate mis datos personales.",
          communications: [
            {
              value: Boolean(body.privacyAccepted),
              subscriptionTypeId: 263522634,
              text: "He leído y acepto la política de privacidad y los términos y condiciones",
            },
            {
              value: Boolean(body.marketingAccepted),
              subscriptionTypeId: 263522635,
              text: "Acepto recibir comunicaciones comerciales de Across Logistics",
            },
          ],
        },
      },
    };

    const response = await fetch(HUBSPOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, status: response.status, error: text },
        { status: response.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
