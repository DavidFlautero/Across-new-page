import { NextResponse } from "next/server";

const HUBSPOT_URL =
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
    const country = value(body.country);
    const message = value(body.message);

    if (!name || !company || !email || !phone || !country || !message || !body.privacyAccepted) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [firstname, ...lastnameParts] = name.split(" ");
    const lastname = lastnameParts.join(" ") || "-";
    const website = value(body.website || process.env.NEXT_PUBLIC_SITE_URL || "https://acrosslogistics.com");

    const payload = {
      fields: [
        { name: "firstname", value: firstname },
        { name: "lastname", value: lastname },
        { name: "company", value: company },
        { name: "email", value: email },
        { name: "phone", value: phone },
        { name: "country", value: country },
        { name: "website", value: website },
        { name: "message", value: message },
        { name: "privacy_accepted", value: body.privacyAccepted ? "true" : "false" },
        { name: "marketing_accepted", value: body.marketingAccepted ? "true" : "false" },
      ],
      context: {
        pageUri: process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/contacto`
          : "https://acrosslogistics.com/contacto",
        pageName: "Contacto",
      },
    };

    const response = await fetch(HUBSPOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "manual",
    });

    const responseText = await response.text();

    if (response.status >= 400) {
      return NextResponse.json(
        { ok: false, status: response.status, error: responseText },
        { status: response.status }
      );
    }

    // HubSpot puede tener páginas de gracias configuradas por idioma.
    // La web no redirige allí: siempre responde JSON para mostrar éxito local.
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
