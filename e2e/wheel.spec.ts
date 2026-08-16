import { expect, test } from '@playwright/test';
import { addMembers, switchDrawerTab, toggleCheckbox } from './helpers';
import type { Page } from '@playwright/test';

const seedAndSelect = async (page: Page, names: string) => {
    await page.goto('/');
    await addMembers(page, names);

    for (const name of names.split('\n')) {
        await toggleCheckbox(page, `Select ${name}`).click();
    }
    await page.getByRole('button', { name: 'Close' }).first().click();
};

test.describe('wheel', () => {
    test('renders the wheel for selected participants', async ({ page }) => {
        await seedAndSelect(page, 'John Doe\nJane Roe');
        await expect(page.locator('svg[aria-label="Wheel of misfortune"]')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Give it a spin' })).toBeEnabled();
    });

    test('spins the wheel and shows the winner dialog', async ({ page }) => {
        await seedAndSelect(page, 'John Doe\nJane Roe');
        await page.getByRole('button', { name: 'Give it a spin' }).click();

        await expect(page.getByText('The lucky winner is')).toBeVisible({ timeout: 20000 });
        const winner = await page.locator('.winner-name').innerText();
        expect(['John Doe', 'Jane Roe']).toContain(winner);

        await page.getByRole('button', { name: 'Spin again' }).click();
        await expect(page.getByText('The lucky winner is')).toBeHidden();
        await expect(page.getByRole('button', { name: 'Give it a spin' })).toBeEnabled();
    });

    test('shows every selected participant on the wheel', async ({ page }) => {
        await seedAndSelect(page, 'John Doe\nJane Roe\nAnna Nowak');
        const wheel = page.locator('svg[aria-label="Wheel of misfortune"]');
        await expect(wheel).toBeVisible();
        for (const first of ['John', 'Jane', 'Anna']) {
            await expect(wheel.getByText(first)).toBeVisible();
        }
    });

    test('fits the viewport on mobile', async ({ page }) => {
        await seedAndSelect(page, 'John Doe\nJane Roe\nAnna Nowak');
        const svg = page.locator('svg[aria-label="Wheel of misfortune"]');
        await expect(svg).toBeVisible();
        const box = await svg.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(page.viewportSize()?.width ?? 0);
    });
});

test.describe('drawer on mobile', () => {
    test('drawer spans the full viewport width', async ({ page }, testInfo) => {
        test.skip(testInfo.project.name !== 'mobile-chromium', 'mobile-only check');
        await page.goto('/');
        await page.getByRole('button', { name: 'Open participants menu' }).click();
        const drawer = page.locator('aside[role="dialog"]');
        await expect(drawer).toBeVisible();
        const box = await drawer.boundingBox();
        expect(box).not.toBeNull();
        expect(Math.round(box!.width)).toBe(Math.round(page.viewportSize()?.width ?? 0));
        await switchDrawerTab(page, 'Members');
        await expect(page.getByRole('button', { name: 'Add members', exact: true })).toBeVisible();
    });
});
