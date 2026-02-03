import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { disableAnimations } from './helpers';

const disallowedImpacts = new Set(['critical', 'serious']);

test.describe('accessibility', () => {
  // Axe + multi-page crawling can be heavy in dev-server mode.
  // Run serially to avoid flakiness/timeouts from overloading the web server.
  test.describe.configure({ mode: 'serial' });

  for (const path of ['/', '/about/', '/services/', '/contact/', '/404/']) {
    test(`no serious/critical axe violations on ${path}`, async ({ page }) => {
      test.setTimeout(90_000);

      await page.goto(path, { waitUntil: 'domcontentloaded' });
      // Best-effort settle; don't fail the test if the page stays chatty.
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => undefined);
      await disableAnimations(page);

      // Type assertion needed due to Playwright/axe-core version mismatch
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const results = await new AxeBuilder({ page: page as any }).analyze();
      const bad = results.violations.filter((v) => v.impact && disallowedImpacts.has(v.impact));

      // Keep output readable when it fails.
      expect(
        bad.map((v) => ({ id: v.id, impact: v.impact, description: v.description })),
        JSON.stringify(results.violations, null, 2)
      ).toEqual([]);
    });
  }
});
