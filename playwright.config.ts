import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [['list']],
    use: {
        baseURL: 'http://localhost:4177/triage-wheel-of-misfortune/',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'mobile-chromium',
            use: { ...devices['Pixel 7'] },
        },
    ],
    webServer: {
        command: 'pnpm dev --port 4177 --strictPort',
        url: 'http://localhost:4177/triage-wheel-of-misfortune/',
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
