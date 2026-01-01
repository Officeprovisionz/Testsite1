import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { disableAnimations } from './helpers';

const disallowedImpacts = new Set(['critical', 'serious']);

test.describe('accessibility', () => {
  for (const path of ['/', '/services/', '/contact/']) {
    test(`no serious/critical axe violations on ${path}`, async ({ page }) => {
      await page.goto(path);
      await disableAnimations(page);

      const results = await new AxeBuilder({ page }).analyze();
      const bad = results.violations.filter((v) => v.impact && disallowedImpacts.has(v.impact));

      // Keep output readable when it fails.
      expect(
        bad.map((v) => ({ id: v.id, impact: v.impact, description: v.description })),
        JSON.stringify(results.violations, null, 2)
      ).toEqual([]);
    });
  }
});
