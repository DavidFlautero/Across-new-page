import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 86400;

const COUNTRIES_CSV =
  "https://davidmegginson.github.io/ourairports-data/countries.csv";

const UN_LOCODE_CSV =
  "https://raw.githubusercontent.com/datasets/un-locode/main/data/code-list.csv";

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
    headers: { "user-agent": "Across Logistics Website" },
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

function hasPortFunction(functions = "") {
  // UN/LOCODE function 1 = Port.
  return functions.includes("1");
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
      }))
      .filter((item) => item.code && item.name)
      .sort((a, b) => a.name.localeCompare(b.name));

    if (!country) {
      return NextResponse.json({
        ok: true,
        source: "un-locode",
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
        source: "un-locode",
        country,
        ports: [],
      });
    }

    const rows = await fetchCsv(UN_LOCODE_CSV);
    const query = normalize(q);

    const ports = rows
      .filter((row) => row.Country === countryMatch.code)
      .filter((row) => hasPortFunction(row.Function))
      .filter((row) => row.Name && row.Location)
      .map((row) => {
        const locode = `${row.Country}${row.Location}`;
        const subdivision = row.Subdivision ? ` · ${row.Subdivision}` : "";

        return {
          code: locode,
          country: row.Country,
          location: row.Location,
          name: row.Name,
          subdivision: row.Subdivision,
          functions: row.Function,
          status: row.Status,
          label: `${row.Name}${subdivision} (${locode})`,
        };
      })
      .filter((port) => {
        if (!query) return true;

        return normalize(
          [port.name, port.code, port.location, port.subdivision, port.label]
            .filter(Boolean)
            .join(" ")
        ).includes(query);
      })
      .sort((a, b) => a.label.localeCompare(b.label));

    return NextResponse.json({
      ok: true,
      source: "un-locode",
      country: countryMatch,
      total: ports.length,
      ports,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error loading ports.",
        countries: [],
        ports: [],
      },
      { status: 500 }
    );
  }
}
