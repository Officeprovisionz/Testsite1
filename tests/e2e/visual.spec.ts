import { expect, test } from '@playwright/test';
import { disableAnimations } from './helpers';

test.describe('visual regression', () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test('home page', async ({ page }) => {
    await page.goto('/');
    await disableAnimations(page);
    await expect(page).toHaveScreenshot('index.png', { fullPage: true });
  });

  test('services page', async ({ page }) => {
    await page.goto('/services/');
    await disableAnimations(page);
    await expect(page).toHaveScreenshot('services.png', { fullPage: true });
  });

  test('industries page', async ({ page }) => {
    await page.goto('/industries/');
    await disableAnimations(page);
    await expect(page).toHaveScreenshot('industries.png', { fullPage: true });
  });
});
