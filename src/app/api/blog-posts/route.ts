import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

type Locale = "es" | "en" | "zh";

function clean(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function getLocale(request: NextRequest): Locale {
  const locale = request.nextUrl.searchParams.get("locale");

  if (locale === "es" || locale === "en" || locale === "zh") {
    return locale;
  }

  return "es";
}

async function readUrlsFile(filename: string) {
  const txt = await readFile(filename, "utf8");

  return txt
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function getUrls(locale: Locale) {
  if (locale === "en") {
    return readUrlsFile("blog-urls-en.txt");
  }

  if (locale === "zh") {
    try {
      return await readUrlsFile("blog-urls-zh.txt");
    } catch {
      return readUrlsFile("blog-urls-en.txt");
    }
  }

  return readUrlsFile("blog-urls-es.txt");
}

function getSlugFromUrl(url: string) {
  return url
    .replace("https://acrosslogistics.com/blog/en/", "")
    .replace("https://acrosslogistics.com/en/blog/", "")
    .replace("https://acrosslogistics.com/blog/", "")
    .replace(/\/$/, "");
}

function normalizeCategory(category: string) {
  const value = clean(category).toLowerCase();

  if (value.includes("air") || value.includes("aéreo") || value.includes("aereo")) return "Transporte Aéreo";
  if (value.includes("custom") || value.includes("aduana")) return "Aduanas";
  if (value.includes("warehouse") || value.includes("almac")) return "Almacén";
  if (value.includes("sustain") || value.includes("sosten")) return "Sostenibilidad";
  if (value.includes("maritime") || value.includes("ocean") || value.includes("marítimo") || value.includes("maritimo")) return "Transporte Marítimo";
  if (value.includes("ground") || value.includes("road") || value.includes("terrestre")) return "Transporte terrestre";
  if (value.includes("transport") || value.includes("logística") || value.includes("logistics")) return "Logística de Transporte";
  if (value.includes("news") || value.includes("actualidad")) return "Actualidad";

  return category || "Actualidad";
}

async function getPost(url: string) {
  const html = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0" },
    next: { revalidate: 3600 },
  }).then((r) => r.text());

  const category =
    clean(html.match(/article:section" content="([^"]+)"/i)?.[1]) ||
    clean(html.match(/<meta name="article:section" content="([^"]+)"/i)?.[1]) ||
    "Actualidad";

  return {
    slug: getSlugFromUrl(url),
    url,
    title:
      clean(html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1]) ||
      clean(html.match(/<title>(.*?)<\/title>/i)?.[1]),
    description:
      clean(html.match(/<meta property="og:description" content="([^"]+)"/i)?.[1]) ||
      clean(html.match(/<meta name="description" content="([^"]+)"/i)?.[1]),
    image: html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1] || "",
    publishedAt: html.match(/article:published_time" content="([^"]+)"/i)?.[1] || "",
    category: normalizeCategory(category),
  };
}

export async function GET(request: NextRequest) {
  try {
    const locale = getLocale(request);

    const limitParam = Number(request.nextUrl.searchParams.get("limit") || "24");
    const limit = Number.isFinite(limitParam)
      ? Math.min(Math.max(limitParam, 4), 48)
      : 24;

    const urls = (await getUrls(locale)).slice(0, limit);

    const posts = await Promise.all(
      urls.map((url) => getPost(url).catch(() => null))
    );

    return NextResponse.json({
      ok: true,
      locale,
      limit,
      source: locale === "en" ? "blog-urls-en.txt" : locale === "zh" ? "blog-urls-zh-fallback-en" : "blog-urls-es.txt",
      total: posts.filter(Boolean).length,
      posts: posts.filter(Boolean),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Error cargando blog.",
        posts: [],
      },
      { status: 500 }
    );
  }
}
