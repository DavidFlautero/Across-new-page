import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 86400;

const AIRPORTS_CSV =
  "https://davidmegginson.github.io/ourairports-data/airports.csv";

const COUNTRIES_CSV =
  "https://davidmegginson.github.io/ourairports-data/countries.csv";

type CsvRow = Record<string, string>;

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let insideQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && insideQuotes && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") index += 1;

      row.push(value);
      value = "";

      if (row.some(Boolean)) rows.push(row);
      row = [];
      continue;
    }

    value += char;
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  const [headers = [], ...data] = rows;

  return data.map((items) =>
    headers.reduce<CsvRow>((acc, header, index) => {
      acc[header] = items[index] || "";
      return acc;
    }, {})
  );
}

async function fetchCsv(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 86400 },
    headers: {
      "user-agent": "Across Logistics Website",
    },
  });

  if (!response.ok) {
    throw new Error(`Cannot load ${url}: ${response.status}`);
  }

  return parseCsv(await response.text());
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function airportLabel(row: CsvRow) {
  const codes = [row.iata_code, row.ident].filter(Boolean).join(" / ");
  const city = row.municipality ? `${row.municipality} - ` : "";

  return `${city}${row.name}${codes ? ` (${codes})` : ""}`;
}

function airportRank(type: string) {
  if (type === "large_airport") return 1;
  if (type === "medium_airport") return 2;
  if (type === "small_airport") return 3;
  if (type === "seaplane_base") return 4;
  return 9;
}

export async function GET(request: NextRequest) {
  try {
    const country = request.nextUrl.searchParams.get("country") || "";
    const q = request.nextUrl.searchParams.get("q") || "";

    const countriesRows = await fetchCsv(COUNTRIES_CSV);

    const countries = countriesRows
      .map((row) => ({
        code: row.code,
        name: row.name,
        wikipedia_link: row.wikipedia_link,
      }))
      .filter((country) => country.code && country.name)
      .sort((a, b) => a.name.localeCompare(b.name));

    if (!country) {
      return NextResponse.json({
        ok: true,
        source: "ourairports",
        updated: "daily-cache",
        countries,
      });
    }

    const countryMatch = countries.find(
      (item) =>
        normalize(item.code) === normalize(country) ||
        normalize(item.name) === normalize(country)
    );

    if (!countryMatch) {
      return NextResponse.json({
        ok: true,
        source: "ourairports",
        country,
        airports: [],
      });
    }

    const airportsRows = await fetchCsv(AIRPORTS_CSV);

    const allowedTypes = new Set([
      "large_airport",
      "medium_airport",
      "small_airport",
      "seaplane_base",
    ]);

    const query = normalize(q);

    const airports = airportsRows
      .filter((row) => row.iso_country === countryMatch.code)
      .filter((row) => allowedTypes.has(row.type))
      .filter((row) => row.name && row.type !== "closed")
      .map((row) => ({
        ident: row.ident,
        type: row.type,
        name: row.name,
        municipality: row.municipality,
        iata: row.iata_code,
        icao: row.gps_code || row.ident,
        country: row.iso_country,
        scheduled_service: row.scheduled_service,
        label: airportLabel(row),
      }))
      .filter((airport) => {
        if (!query) return true;

        return normalize(
          [
            airport.name,
            airport.municipality,
            airport.iata,
            airport.icao,
            airport.ident,
            airport.label,
          ]
            .filter(Boolean)
            .join(" ")
        ).includes(query);
      })
      .sort((a, b) => {
        const rank = airportRank(a.type) - airportRank(b.type);
        if (rank !== 0) return rank;

        if (a.scheduled_service === "yes" && b.scheduled_service !== "yes") return -1;
        if (a.scheduled_service !== "yes" && b.scheduled_service === "yes") return 1;

        return a.label.localeCompare(b.label);
      });

    return NextResponse.json({
      ok: true,
      source: "ourairports",
      country: countryMatch,
      total: airports.length,
      airports,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error loading airports.",
        countries: [],
        airports: [],
      },
      { status: 500 }
    );
  }
}
