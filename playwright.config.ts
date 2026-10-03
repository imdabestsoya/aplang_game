import { defineConfig, devices } from '@playwright/test';

const preview = process.env.E2E_PREVIEW === '1';
const port = Number(process.env.E2E_PORT ?? 4173);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid E2E_PORT');

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}`, trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'narrow-touch', use: { ...devices['Desktop Chrome'], viewport: { width: 360, height: 800 }, hasTouch: true } },
  ],
  webServer: {
    command: `npm run ${preview ? 'preview' : 'dev'} -- --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
  },
});
