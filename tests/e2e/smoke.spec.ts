import { expect, test } from '@playwright/test';
import { disableAnimations } from './helpers';

test('navigation links work (header)', async ({ page }) => {
  await page.goto('/');
  await disableAnimations(page);

  await page.getByRole('link', { name: 'Services' }).click();
  await expect(page).toHaveURL(/\/services\/$/);

  await page.getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact\/$/);
});

test('FAQ accordion behaves like a dropdown (only one open)', async ({ page }) => {
  await page.goto('/');
  await disableAnimations(page);

  const items = page.locator('[data-faq-item]');
  const count = await items.count();
  expect(count).toBeGreaterThan(1);

  const first = items.nth(0);
  const second = items.nth(1);

  await first.locator('summary').click();
  await expect(first).toHaveJSProperty('open', true);

  await second.locator('summary').click();
  await expect(second).toHaveJSProperty('open', true);
  await expect(first).toHaveJSProperty('open', false);
});

test('contact form is present and validates required fields', async ({ page }) => {
  await page.goto('/contact/');
  await disableAnimations(page);

  const form = page.locator('form[data-contact-form]');
  await expect(form).toBeVisible();

  // Intentionally submit without selecting a service to trigger the custom validation message.
  await form.locator('button[data-contact-submit]').click();
  await expect(form.locator('[data-services-error]')).toBeVisible();

  await form.locator('input[name="companyName"]').fill('Example Co');
  await form.locator('input[name="name"]').fill('Ada Lovelace');
  await form.locator('input[name="email"]').fill('ada@example.com');
  await form.locator('input[name="location"]').fill('San Francisco, 94103');
  await form.locator('select[name="industry"]').selectOption({ index: 1 });
  await form.locator('select[name="frequency"]').selectOption('Weekly');

  // Select one service.
  await form.locator('input[name="servicesNeeded"]').first().check();
  await form
    .locator('textarea[name="message"]')
    .fill('~2,500 sq ft office; weekly after 6pm; focus on restrooms + kitchen.');
  await form.locator('input[name="consent"]').check();

  const isValid = await form.evaluate((el) => (el as HTMLFormElement).checkValidity());
  expect(isValid).toBe(true);
});
