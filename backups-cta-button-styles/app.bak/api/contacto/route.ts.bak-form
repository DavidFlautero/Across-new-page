import { NextResponse } from "next/server";

const HUBSPOT_URL =
  "https://api-eu1.hsforms.com/submissions/v3/integration/submit/143534810/42649111-7518-40b8-ab3d-764b390763d5";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.company || !body.email || !body.phone || !body.country || !body.message || !body.privacyAccepted) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      fields: [
        { name: "firstname", value: String(body.name) },
        { name: "company", value: String(body.company) },
        { name: "email", value: String(body.email) },
        { name: "phone", value: String(body.phone) },
        { name: "country", value: String(body.country) },
        { name: "message", value: String(body.message) },
        { name: "privacy_accepted", value: body.privacyAccepted ? "true" : "false" },
        { name: "marketing_accepted", value: body.marketingAccepted ? "true" : "false" },
      ],
      context: {
        pageUri: "https://acrosslogistics.com/contacto",
        pageName: "Contacto",
      },
    };

    const response = await fetch(HUBSPOT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json({ ok: false, status: response.status, error: text }, { status: response.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  }
}
