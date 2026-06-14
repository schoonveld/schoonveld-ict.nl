import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

async function scrollThrough(target = page) {
	const height = await target.evaluate(() => document.body.scrollHeight);
	for (let y = 0; y <= height; y += 600) {
		await target.evaluate((yy) => window.scrollTo({ top: yy, behavior: "instant" }), y);
		await target.waitForTimeout(100);
	}
	await target.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
	await target.waitForTimeout(900);
}

// Home — light
await page.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await scrollThrough();
await page.screenshot({ path: "/tmp/home-light.png", fullPage: true });

// Home — dark (via theme toggle in nav)
await page.click('[data-slot="theme-toggle"]');
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/home-dark.png", fullPage: true });

// Form submit state
await page.fill("#name", "Test Person");
await page.fill("#email", "test@example.com");
await page.fill("#message", "Hello!");
await page.click('#contact-form button[type="submit"]');
await page.waitForTimeout(400);
await page.locator("#contact").scrollIntoViewIfNeeded();
await page.screenshot({ path: "/tmp/form-submitted.png" });

// Resume — dark (localStorage persisted)
await page.goto("http://localhost:4321/resume", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await scrollThrough();
await page.screenshot({ path: "/tmp/resume-dark.png", fullPage: true });

// Resume — light
await page.click('[data-slot="theme-toggle"]');
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/resume-light.png", fullPage: true });

// Mobile home — light
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await mobile.waitForTimeout(1200);
await scrollThrough(mobile);
await mobile.screenshot({ path: "/tmp/home-mobile.png", fullPage: true });

await browser.close();
console.log("done");
