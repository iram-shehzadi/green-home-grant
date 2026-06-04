import { defineConfig, devices } from '@playwright/test';

// The dev server runs behind the lab reverse-proxy base path (/proxy/<port>/),
// and the router basename matches it — so the app only mounts when the browser
// URL sits under that prefix. baseURL therefore includes the full prefix, and
// tests navigate with page.goto('./').
const PORT = Number(process.env.VITE_PORT) || 5002;
const BASE_URL = `http://localhost:${PORT}/proxy/${PORT}/`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Reuse the already-running dev server if present; otherwise start one.
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
