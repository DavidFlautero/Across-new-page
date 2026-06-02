import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

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

async function getUrls() {
  try {
    const txt = await readFile("blog-urls-es.txt", "utf8");
    return txt.split("\n").map((v) => v.trim()).filter(Boolean);
  } catch {}

  try {
    const xml = await readFile("sitemap.blog.xml", "utf8");
    return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g))
      .map((m) => m[1])
      .filter((url) => url.includes("/blog/") && !url.includes("/en/"));
  } catch {}

  return [];
}

async function getPost(url: string) {
  const html = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0" },
    next: { revalidate: 3600 },
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
    category: clean(html.match(/article:section" content="([^"]+)"/i)?.[1]) || "Logística",
  };
}

export async function GET() {
  try {
    const urls = (await getUrls()).slice(0, 167);

    const posts = await Promise.all(
      urls.map((url) => getPost(url).catch(() => null))
    );

    return NextResponse.json({
      ok: true,
      source: "local-blog-urls",
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
