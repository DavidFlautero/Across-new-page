import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const sizes = [
  { name: "mobile-375x667", width: 375, height: 667 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-430x932", width: 430, height: 932 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "tablet-800x1280", width: 800, height: 1280 },
  { name: "desktop-1200x1600", width: 1200, height: 1600 },
];

const browser = await chromium.launch({ headless: true });

for (const size of sizes) {
  const page = await browser.newPage({
    viewport: { width: size.width, height: size.height },
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(800);

  const data = await page.evaluate(() => {
    const pick = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;

      const rect = el.getBoundingClientRect();
      const cs = window.getComputedStyle(el);

      return {
        selector,
        rect: {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          bottom: Math.round(rect.bottom),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        position: cs.position,
        display: cs.display,
        gridTemplateColumns: cs.gridTemplateColumns,
        transform: cs.transform,
        justifyContent: cs.justifyContent,
        paddingRight: cs.paddingRight,
        zIndex: cs.zIndex,
        overflow: cs.overflow,
      };
    };

    return {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      hero: pick('[class*="Hero_hero"]'),
      content: pick('[class*="Hero_content"]'),
      title: pick('[class*="Hero_title"]'),
      subtitle: pick('[class*="Hero_subtitle"]'),
      actions: pick('[class*="Hero_actions"]'),
      commandBar: pick('[class*="Hero_commandBar"]'),
      firstCommandItem: pick('[class*="Hero_commandItem"]'),
      floating: pick('[class*="FloatingCallButton_floating"]'),
      chatBubble: pick('[class*="FloatingCallButton_chatBubble"]'),
      callPill: pick('[class*="FloatingCallButton_callPill"]'),
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 2,
      scrollWidth: document.documentElement.scrollWidth,
    };
  });

  console.log("\n==========", size.name, "==========");
  console.log(JSON.stringify(data, null, 2));

  await page.close();
}

await browser.close();
