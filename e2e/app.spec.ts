import { expect, test } from '@playwright/test';

test.describe('app shell', () => {
    test('renders header and empty state', async ({ page }) => {
        await page.goto('/');
        await expect(
            page.getByRole('heading', { name: 'Triage Wheel of Misfortune' })
        ).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add participants' })).toBeVisible();
    });

    test('shows the guide panel on desktop', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'chromium', 'desktop-only check');
        await page.goto('/');
        await expect(page.getByRole('heading', { name: 'How to use it?' })).toBeVisible();
        await expect(
            page.getByRole('heading', { name: 'Add participants', exact: true })
        ).toBeVisible();
        await expect(
            page.getByRole('heading', { name: 'Select who plays', exact: true })
        ).toBeVisible();
        await expect(
            page.getByRole('heading', { name: 'Spin the wheel', exact: true })
        ).toBeVisible();
    });

    test('shows the guide in a dialog on mobile', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'mobile-chromium', 'mobile-only check');
        await page.goto('/');
        await page.getByRole('button', { name: 'How to use it?' }).click();
        await expect(page.getByRole('dialog')).toContainText('Add participants');
        await expect(page.getByRole('dialog')).toContainText('Select who plays');
        await expect(page.getByRole('dialog')).toContainText('Spin the wheel');
        await page.getByRole('button', { name: 'Close' }).click();
        await expect(page.getByRole('dialog')).toBeHidden();
    });

    test('toggles between dark and light theme', async ({ page }) => {
        await page.goto('/');
        const html = page.locator('html');
        const initialIsDark = await html.evaluate((el) => el.classList.contains('dark'));

        await page.getByRole('button', { name: 'Toggle theme' }).click();
        await expect
            .poll(() => html.evaluate((el) => el.classList.contains('dark')))
            .toBe(!initialIsDark);

        await page.getByRole('button', { name: 'Toggle theme' }).click();
        await expect
            .poll(() => html.evaluate((el) => el.classList.contains('dark')))
            .toBe(initialIsDark);
    });

    test('persists added members across reloads', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Add participants' }).click();
        await page.getByRole('button', { name: 'Members', exact: true }).click();
        await page.getByRole('button', { name: 'Add members', exact: true }).click();
        await page.getByLabel('Member names').fill('Reload Survivor');
        await page.getByRole('button', { name: 'Add 1 member' }).click();
        await expect(
            page.getByRole('button', { name: 'Reload Survivor', exact: true })
        ).toBeVisible();

        await page.reload();
        await page.getByRole('button', { name: 'Open participants menu' }).click();
        await page.getByRole('button', { name: 'Members', exact: true }).click();
        await expect(
            page.getByRole('button', { name: 'Reload Survivor', exact: true })
        ).toBeVisible();
    });
});
