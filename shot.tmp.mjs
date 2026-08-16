import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://localhost:4177/triage-wheel-of-misfortune/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: '/tmp/opencode/shot-main-dark.png' });

await page.getByRole('button', { name: 'Toggle theme' }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/opencode/shot-main-light.png' });

await page.getByRole('button', { name: 'Open participants menu' }).click();
await page.getByRole('tab', { name: 'Members' }).click();
await page.getByRole('button', { name: 'Add members' }).click();
await page.getByLabel('Member names').fill('John Doe\nJane Roe\nAnna Nowak\nPiotr Zielinski');
await page.getByRole('button', { name: 'Add 4 members' }).click();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/opencode/shot-drawer.png' });

await page.getByRole('checkbox', { name: 'Select John Doe' }).locator('..').locator('[data-slot="checkbox-control"]').click();
await page.getByRole('checkbox', { name: 'Select Jane Roe' }).locator('..').locator('[data-slot="checkbox-control"]').click();
await page.getByRole('button', { name: 'Close' }).first().click();
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/opencode/shot-wheel.png' });

await page.getByRole('button', { name: 'Give it a spin' }).click();
await page.waitForTimeout(1500);
await page.getByRole('button', { name: 'Toggle theme' }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/opencode/shot-spinning.png' });
await browser.close();
