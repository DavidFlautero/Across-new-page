const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const CHECK_EXTERNAL = process.env.CHECK_EXTERNAL === "1";

const visitedPages = new Set();
const checkedUrls = new Map();
const broken = [];
const internalToVisit = [new URL("/", BASE_URL).toString()];

const SKIP_PROTOCOLS = ["mailto:", "tel:", "sms:", "whatsapp:", "javascript:"];
const SKIP_EXTENSIONS = [
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".ico",
  ".mp4", ".webm", ".pdf", ".zip", ".woff", ".woff2"
];

function normalizeUrl(rawUrl, pageUrl) {
  if (!rawUrl) return null;

  const clean = rawUrl.trim();

  if (
    !clean ||
    clean.startsWith("#") ||
    clean.startsWith("data:") ||
    clean.startsWith("blob:")
  ) {
    return null;
  }

  if (SKIP_PROTOCOLS.some((protocol) => clean.toLowerCase().startsWith(protocol))) {
    return null;
  }

  try {
    const url = new URL(clean, pageUrl);
    url.hash = "";

    return url.toString();
  } catch {
    return null;
  }
}

function isInternal(url) {
  return new URL(url).origin === new URL(BASE_URL).origin;
}

function shouldSkipAsset(url) {
  const pathname = new URL(url).pathname.toLowerCase();
  return SKIP_EXTENSIONS.some((ext) => pathname.endsWith(ext));
}

function extractLinks(html, pageUrl) {
  const links = new Set();

  const patterns = [
    /\shref=["']([^"']+)["']/gi,
    /\ssrc=["']([^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    let match;

    while ((match = pattern.exec(html))) {
      const url = normalizeUrl(match[1], pageUrl);

      if (url && !shouldSkipAsset(url)) {
        links.add(url);
      }
    }
  }

  return [...links];
}

async function checkUrl(url, sourcePage) {
  if (checkedUrls.has(url)) return checkedUrls.get(url);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  let result;

  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "AcrossLinkChecker/1.0"
      }
    });

    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "user-agent": "AcrossLinkChecker/1.0"
        }
      });
    }

    result = {
      ok: response.status >= 200 && response.status < 400,
      status: response.status,
      url,
      sourcePage,
    };
  } catch (error) {
    result = {
      ok: false,
      status: "ERROR",
      url,
      sourcePage,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }

  checkedUrls.set(url, result);

  if (!result.ok) {
    broken.push(result);
  }

  return result;
}

async function crawlPage(pageUrl) {
  if (visitedPages.has(pageUrl)) return;
  visitedPages.add(pageUrl);

  console.log(`\n🔎 Revisando página: ${pageUrl}`);

  let response;
  let html;

  try {
    response = await fetch(pageUrl, {
      redirect: "follow",
      headers: {
        "user-agent": "AcrossLinkChecker/1.0"
      }
    });

    if (response.status < 200 || response.status >= 400) {
      broken.push({
        ok: false,
        status: response.status,
        url: pageUrl,
        sourcePage: "crawler-entry",
      });
      return;
    }

    html = await response.text();
  } catch (error) {
    broken.push({
      ok: false,
      status: "ERROR",
      url: pageUrl,
      sourcePage: "crawler-entry",
      error: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  const links = extractLinks(html, pageUrl);

  for (const link of links) {
    const internal = isInternal(link);

    if (!internal && !CHECK_EXTERNAL) continue;

    const result = await checkUrl(link, pageUrl);

    const pathname = new URL(link).pathname;

    if (
      internal &&
      result.ok &&
      !visitedPages.has(link) &&
      !pathname.startsWith("/api/")
    ) {
      internalToVisit.push(link);
    }
  }
}

while (internalToVisit.length) {
  const page = internalToVisit.shift();
  await crawlPage(page);
}

console.log("\n==============================");
console.log("RESULTADO LINK CHECK");
console.log("==============================");
console.log(`Base URL: ${BASE_URL}`);
console.log(`Páginas internas visitadas: ${visitedPages.size}`);
console.log(`URLs revisadas: ${checkedUrls.size}`);
console.log(`Externos revisados: ${CHECK_EXTERNAL ? "sí" : "no"}`);

if (!broken.length) {
  console.log("\n✅ No se encontraron links rotos.");
  process.exit(0);
}

console.log(`\n❌ Links rotos encontrados: ${broken.length}\n`);

for (const item of broken) {
  console.log(`- [${item.status}] ${item.url}`);
  console.log(`  Encontrado en: ${item.sourcePage}`);
  if (item.error) console.log(`  Error: ${item.error}`);
  console.log("");
}

process.exit(1);
