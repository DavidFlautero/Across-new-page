import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const MAX_PAGES = Number(process.env.MAX_PAGES || "160");
const OUT_DIR = path.join("audits", `responsive-${Date.now()}`);

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 1366 },
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const startPages = [
  "/",
  "/tracking",
  "/contacto",
  "/cotizacion",
  "/blog",
  "/recursos",
  "/aviso-legal",
  "/politica-de-cookies",
  "/politica-de-privacidad-web",
  "/empresa/quienes-somos",
  "/empresa/oficinas",
  "/empresa/sostenibilidad",
  "/servicios/transporte-aereo",
  "/servicios/transporte-maritimo",
  "/servicios/cargas-especiales",
  "/servicios/temperatura-controlada",
  "/servicios/almacen-distribucion",
  "/servicios/aduanas",
  "/servicios/e-commerce",
  "/sectores/alimentacion-bebidas",
  "/sectores/energias-renovables",
  "/sectores/automocion",
  "/sectores/tecnologico",
  "/sectores/farmaceutico-sanitario",
  "/sectores/consumo-distribucion",
  "/sectores/quimico",
];

const visited = new Set();
const toVisit = startPages.map((route) => new URL(route, BASE_URL).toString());
const pages = [];
const issues = [];

function isInternal(url) {
  return new URL(url).origin === new URL(BASE_URL).origin;
}

function shouldSkip(url) {
  const parsed = new URL(url);
  const p = parsed.pathname;

  return (
    p.startsWith("/api/") ||
    p.startsWith("/_next/") ||
    p.includes(".") ||
    parsed.protocol !== "http:" && parsed.protocol !== "https:"
  );
}

function safeName(url) {
  const parsed = new URL(url);
  return parsed.pathname.replace(/^\/$/, "home").replace(/[^\w-]+/g, "_").replace(/^_/, "");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function collectLinks(page, pageUrl) {
  const hrefs = await page.$$eval("a[href]", (anchors) =>
    anchors.map((a) => a.getAttribute("href")).filter(Boolean)
  );

  for (const href of hrefs) {
    let url;

    try {
      url = new URL(href, pageUrl).toString();
    } catch {
      continue;
    }

    url = url.split("#")[0];

    if (!isInternal(url) || shouldSkip(url)) continue;
    if (!visited.has(url) && !toVisit.includes(url) && toVisit.length + visited.size < MAX_PAGES) {
      toVisit.push(url);
    }
  }
}

async function inspectViewport(page, url, viewport) {
  const pageName = safeName(url);
  const screenshotDir = path.join(OUT_DIR, viewport.name);
  await ensureDir(screenshotDir);

  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  const response = await page.goto(url, {
    waitUntil: "networkidle",
    timeout: 45000,
  }).catch((error) => {
    issues.push({
      type: "NAVIGATION_ERROR",
      viewport: viewport.name,
      url,
      detail: error.message,
    });
    return null;
  });

  if (!response) return;

  const status = response.status();

  if (status >= 400) {
    issues.push({
      type: "HTTP_ERROR",
      viewport: viewport.name,
      url,
      detail: String(status),
    });
  }

  await page.waitForTimeout(900);

  const data = await page.evaluate(() => {
    const root = document.documentElement;
    const body = document.body;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scrollWidth = Math.max(
      root.scrollWidth,
      body ? body.scrollWidth : 0
    );

    const overflowX = scrollWidth > width + 2;

    const offenders = [];

    const isVisible = (el) => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) !== 0 &&
        rect.width > 1 &&
        rect.height > 1
      );
    };

    for (const el of Array.from(document.querySelectorAll("body *"))) {
      if (!isVisible(el)) continue;

      const rect = el.getBoundingClientRect();

      const tooWide =
        rect.left < -4 ||
        rect.right > width + 4 ||
        rect.width > width + 4;

      if (tooWide) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          className: typeof el.className === "string" ? el.className : "",
          id: el.id || "",
          text: (el.textContent || "").trim().slice(0, 80),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        });
      }

      if (offenders.length >= 12) break;
    }

    return {
      title: document.title,
      width,
      height,
      scrollWidth,
      overflowX,
      offenders,
    };
  });

  await page.screenshot({
    path: path.join(screenshotDir, `${pageName}.png`),
    fullPage: true,
  });

  if (data.overflowX) {
    issues.push({
      type: "HORIZONTAL_OVERFLOW",
      viewport: viewport.name,
      url,
      detail: `viewport=${data.width}, scrollWidth=${data.scrollWidth}`,
      offenders: data.offenders,
    });
  }

  if (consoleErrors.length) {
    issues.push({
      type: "CONSOLE_ERRORS",
      viewport: viewport.name,
      url,
      detail: consoleErrors.slice(0, 5),
    });
  }

  if (pageErrors.length) {
    issues.push({
      type: "PAGE_ERRORS",
      viewport: viewport.name,
      url,
      detail: pageErrors.slice(0, 5),
    });
  }

  if (viewport.width <= 1024) {
    const menuButton = await page.$('button[aria-label*="menú"], button[aria-label*="menu"], button:has-text("☰")');

    if (menuButton) {
      await menuButton.click().catch(() => {});
      await page.waitForTimeout(500);

      await page.screenshot({
        path: path.join(screenshotDir, `${pageName}__menu-open.png`),
        fullPage: true,
      });

      const menuData = await page.evaluate(() => {
        const width = window.innerWidth;
        const panel =
          document.querySelector('[class*="mobilePanel"]') ||
          document.querySelector("aside");

        if (!panel) return null;

        const rect = panel.getBoundingClientRect();

        return {
          panelLeft: Math.round(rect.left),
          panelRight: Math.round(rect.right),
          panelWidth: Math.round(rect.width),
          viewportWidth: width,
          leavesGap: rect.right < width - 4,
          exceedsViewport: rect.right > width + 4 || rect.left < -4,
        };
      });

      if (menuData && (menuData.leavesGap || menuData.exceedsViewport)) {
        issues.push({
          type: "MOBILE_MENU_WIDTH",
          viewport: viewport.name,
          url,
          detail: menuData,
        });
      }
    }
  }

  pages.push({
    url,
    viewport: viewport.name,
    status,
    title: data.title,
    overflowX: data.overflowX,
  });
}

async function crawlInitialPages(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });

  const page = await context.newPage();

  while (toVisit.length && visited.size < MAX_PAGES) {
    const url = toVisit.shift();

    if (!url || visited.has(url)) continue;
    visited.add(url);

    console.log(`Crawling: ${url}`);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
      await collectLinks(page, url);
    } catch (error) {
      issues.push({
        type: "CRAWL_ERROR",
        viewport: "crawler",
        url,
        detail: error.message,
      });
    }
  }

  await context.close();
}

async function main() {
  await ensureDir(OUT_DIR);

  const browser = await chromium.launch({
    headless: true,
  });

  await crawlInitialPages(browser);

  const urls = [...visited];

  console.log(`\nPages found: ${urls.length}`);
  console.log(`Screenshots: ${OUT_DIR}\n`);

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    });

    for (const url of urls) {
      console.log(`Testing ${viewport.name}: ${url}`);
      const page = await context.newPage();
      await inspectViewport(page, url, viewport);
      await page.close();
    }

    await context.close();
  }

  await browser.close();

  await fs.writeFile(
    path.join(OUT_DIR, "report.json"),
    JSON.stringify({ baseUrl: BASE_URL, pages, issues }, null, 2),
    "utf8"
  );

  const summary = [
    "# Responsive Audit",
    "",
    `Base URL: ${BASE_URL}`,
    `Pages tested: ${urls.length}`,
    `Viewports: ${viewports.map((v) => v.name).join(", ")}`,
    `Issues: ${issues.length}`,
    "",
    "## Issues",
    "",
    issues.length
      ? issues
          .map((issue) => {
            const offenders = issue.offenders
              ? `\n\nOffenders:\n${issue.offenders
                  .map((o) => `- ${o.tag}.${o.className} ${o.text} [${o.left}-${o.right}]`)
                  .join("\n")}`
              : "";

            return `### ${issue.type}\n- Viewport: ${issue.viewport}\n- URL: ${issue.url}\n- Detail: ${JSON.stringify(issue.detail, null, 2)}${offenders}`;
          })
          .join("\n\n")
      : "No responsive issues detected.",
    "",
  ].join("\n");

  await fs.writeFile(path.join(OUT_DIR, "report.md"), summary, "utf8");

  console.log("\n==============================");
  console.log("RESPONSIVE AUDIT RESULT");
  console.log("==============================");
  console.log(`Report: ${path.join(OUT_DIR, "report.md")}`);
  console.log(`Screenshots: ${OUT_DIR}`);
  console.log(`Issues: ${issues.length}`);

  if (issues.length) {
    console.log("\nFirst issues:");
    for (const issue of issues.slice(0, 20)) {
      console.log(`- ${issue.type} | ${issue.viewport} | ${issue.url}`);
    }
    process.exit(1);
  }

  console.log("\n✅ No responsive issues detected.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
