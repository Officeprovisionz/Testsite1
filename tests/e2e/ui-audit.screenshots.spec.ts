import { test, type Page } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs/promises';

const tag = process.env.UI_AUDIT_TAG ?? 'after';

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function snap(
  page: Page,
  baseURL: string,
  pageName: string,
  viewport: { width: number; height: number },
  urlPath: string
) {
  await test.step(`${pageName} @ ${viewport.width}x${viewport.height}`, async () => {
    await page.setViewportSize(viewport);
    await page.goto(new URL(urlPath, baseURL).toString(), { waitUntil: 'networkidle' });

    // Let client-side view transitions / progress bars settle.
    await page.waitForTimeout(250);

    const outDir = path.join(process.cwd(), 'test-results', 'ui-audit', tag);
    await ensureDir(outDir);

    const safeName = `${pageName}-${viewport.width}x${viewport.height}.png`;
    await page.screenshot({ path: path.join(outDir, safeName), fullPage: true });
  });
}

test.describe('UI audit screenshots', () => {
  test('capture key pages', async ({ page, baseURL }) => {
    // Playwright guarantees baseURL is set by config, but keep a sensible fallback.
    const origin = baseURL ?? 'http://localhost:4321/';

    // Desktop
    await snap(page, origin, 'home', { width: 1440, height: 900 }, '/');
    await snap(page, origin, 'services', { width: 1440, height: 900 }, '/services/');
    await snap(page, origin, 'about', { width: 1440, height: 900 }, '/about/');
    await snap(page, origin, 'contact', { width: 1440, height: 900 }, '/contact/');

    // Mobile
    await snap(page, origin, 'home', { width: 390, height: 844 }, '/');
    await snap(page, origin, 'services', { width: 390, height: 844 }, '/services/');
    await snap(page, origin, 'about', { width: 390, height: 844 }, '/about/');
    await snap(page, origin, 'contact', { width: 390, height: 844 }, '/contact/');
  });
});
