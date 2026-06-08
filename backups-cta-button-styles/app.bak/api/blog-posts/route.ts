import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 1800;

type Locale = "es" | "en" | "zh";

function clean(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getLocale(value: string | null): Locale {
  if (value === "en" || value === "zh") return value;
  return "es";
}

function localeFile(locale: Locale) {
  if (locale === "en") return "blog-urls-en.txt";
  if (locale === "zh") return "blog-urls-en.txt";
  return "blog-urls-es.txt";
}

async function readUrlsFromFile(locale: Locale) {
  const filePath = path.join(process.cwd(), localeFile(locale));
  const txt = await readFile(filePath, "utf8");

  return txt
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function getUrls(locale: Locale) {
  try {
    return await readUrlsFromFile(locale);
  } catch {}

  try {
    const sitemapPath = path.join(process.cwd(), "sitemap.blog.xml");
    const xml = await readFile(sitemapPath, "utf8");

    return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g))
      .map((m) => m[1])
      .filter((url) => {
        if (!url.includes("/blog/")) return false;
        if (locale === "en" || locale === "zh") return url.includes("/blog/en/");
        return !url.includes("/blog/en/");
      });
  } catch {}

  return [];
}

async function getPost(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const html = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 Across Logistics Website",
      },
      cache: "no-store",
    }).then((r) => r.text());

    return {
      slug: url.replace("https://acrosslogistics.com/blog/", "").replace(/\/$/, ""),
      url,
      title:
        clean(html.match(/<meta property="og:title" content="([^"]+)"/i)?.[1]) ||
        clean(html.match(/<title>(.*?)<\/title>/i)?.[1]),
      description:
        clean(html.match(/<meta property="og:description" content="([^"]+)"/i)?.[1]) ||
        clean(html.match(/<meta name="description" content="([^"]+)"/i)?.[1]),
      image: html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1] || "",
      publishedAt: html.match(/article:published_time" content="([^"]+)"/i)?.[1] || "",
      category:
        clean(html.match(/article:section" content="([^"]+)"/i)?.[1]) ||
        clean(html.match(/rel="category tag">([^<]+)<\/a>/i)?.[1]) ||
        "News",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(request: NextRequest) {
  try {
    const locale = getLocale(request.nextUrl.searchParams.get("locale"));
    const limitParam = Number(request.nextUrl.searchParams.get("limit") || "12");
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 4), 24) : 12;

    const urls = (await getUrls(locale)).slice(0, limit);

    if (!urls.length) {
      return NextResponse.json({
        ok: true,
        source: "empty",
        locale,
        total: 0,
        posts: [],
      });
    }

    const posts = await Promise.all(
      urls.map((url) => getPost(url).catch(() => null))
    );

    const validPosts = posts.filter(Boolean);

    return NextResponse.json({
      ok: true,
      source: "across-blog",
      locale,
      total: validPosts.length,
      posts: validPosts,
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
