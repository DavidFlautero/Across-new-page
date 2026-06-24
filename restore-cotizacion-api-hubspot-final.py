from pathlib import Path
import shutil

api_path = Path("src/app/api/cotizacion/route.ts")

if not api_path.exists():
    raise SystemExit("❌ No existe src/app/api/cotizacion/route.ts")

backup = api_path.with_suffix(api_path.suffix + ".bak-before-restore-hubspot-final")
if not backup.exists():
    shutil.copy2(api_path, backup)

code = r'''import { NextResponse } from "next/server";

const HUBSPOT_URL =
  process.env.HUBSPOT_QUOTE_FORM_URL ||
  process.env.HUBSPOT_CONTACT_FORM_URL ||
  "https://api-eu1.hsforms.com/submissions/v3/integration/submit/143534810/42649111-7518-40b8-ab3d-764b390763d5";

function value(input: unknown) {
  return String(input || "").trim();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = value(body.name);
    const company = value(body.company);
    const email = value(body.email);
    const phone = value(body.phone);

    if (!name || !company || !email || !phone || !body.privacyAccepted) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [firstnameRaw, ...lastnameParts] = name.split(/\s+/);
    const firstname = firstnameRaw || name;
    const lastname = lastnameParts.join(" ").trim() || "-";

    const cargoName =
      value(body.cargoType) ||
      value(body.cargo) ||
      "Carga no especificada";

    const unitType =
      body.units === "imperial" ? "Lb/Inch" : "Kg/Cm";

    const message = [
      "Solicitud de cotización desde la web.",
      "",
      "DATOS DE CONTACTO",
      `Nombre: ${name}`,
      `Empresa: ${company}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      body.country ? `País: ${body.country}` : "",
      body.website ? `Web: ${body.website}` : "",
      body.contractDate ? `Fecha contrato servicio: ${body.contractDate}` : "",
      "",
      "OPERACIÓN",
      body.operation ? `Tipo de operación: ${body.operation}` : "",
      body.service ? `Servicio requerido: ${body.service}` : "",
      body.incoterm ? `Incoterm: ${body.incoterm}` : "",
      "",
      "ORIGEN",
      body.originCountry ? `País de origen: ${body.originCountry}` : "",
      body.originAddress ? `Dirección de recogida: ${body.originAddress}` : "",
      body.originAirport ? `Aeropuerto de origen: ${body.originAirport}` : "",
      body.originAirportOther ? `Otro aeropuerto origen: ${body.originAirportOther}` : "",
      body.originPort ? `Puerto de origen: ${body.originPort}` : "",
      "",
      "DESTINO",
      body.destinationCountry ? `País de destino: ${body.destinationCountry}` : "",
      body.destinationAddress ? `Dirección de entrega: ${body.destinationAddress}` : "",
      body.destinationAirport ? `Aeropuerto de destino: ${body.destinationAirport}` : "",
      body.destinationAirportOther ? `Otro aeropuerto destino: ${body.destinationAirportOther}` : "",
      body.destinationPort ? `Puerto de destino: ${body.destinationPort}` : "",
      "",
      "CARGA",
      `Tipo de carga: ${cargoName}`,
      body.cargoQty ? `Cantidad: ${body.cargoQty}` : "",
      `Sistema unidades: ${unitType}`,
      body.cargoLength ? `Largo: ${body.cargoLength}` : "",
      body.cargoWidth ? `Ancho: ${body.cargoWidth}` : "",
      body.cargoHeight ? `Altura: ${body.cargoHeight}` : "",
      body.cargoWeight ? `Peso: ${body.cargoWeight}` : "",
      body.cargoInfo ? `Información adicional carga: ${body.cargoInfo}` : "",
      body.merchandise ? `Mercadería: ${body.merchandise}` : "",
      "",
      "REQUERIMIENTOS",
      body.stackable ? `Apilable: ${body.stackable}` : "",
      body.handling ? `Manipulación: ${body.handling}` : "",
      body.condition ? `Condición especial: ${body.condition}` : "",
      body.comments ? `Comentarios finales: ${body.comments}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "company", value: company },
        { name: "email", value: email },
        { name: "phone", value: phone },
        { name: "servicio_interes", value: value(body.service) },
        { name: "country__listado_", value: value(body.country) },
        { name: "website", value: value(body.website || "https://acrosslogistics.com") },
        { name: "message", value: message },
      ],
      context: {
        pageUri: process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/cotizacion`
          : "https://acrosslogistics.com/cotizacion",
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
'''

api_path.write_text(code, encoding="utf-8")

print("✅ API restaurada a HubSpot")
print("✅ lastname corregido")
print("✅ medidas de carga incluidas en message")
print("✅ Backup:", backup)
