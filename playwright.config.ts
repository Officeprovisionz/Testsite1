import { defineConfig, devices } from '@playwright/test';

const port = Number(process.env.PW_PORT ?? 4321);
const baseURL = process.env.PW_BASE_URL ?? `http://localhost:${port}/`;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: 2 } : {}),
  reporter: isCI ? [['list'], ['html', { open: 'never' }]] : [['list'], ['html']],
  webServer: {
    // Start the Astro dev server for E2E runs.
    // `pnpm dev -- --port <port>` forwards args to `astro dev`.
    command: `pnpm dev -- --port ${port}`,
    port,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
