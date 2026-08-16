import { expect, test } from '@playwright/test';

test.describe('app shell', () => {
    test('renders header, guide and empty state', async ({ page }) => {
        await page.goto('/');
        await expect(
            page.getByRole('heading', { name: 'Triage Wheel of Misfortune' })
        ).toBeVisible();
        await expect(page.getByText('How to use it?')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Add participants' })).toBeVisible();
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
        await page.getByRole('button', { name: 'Add members' }).click();
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
