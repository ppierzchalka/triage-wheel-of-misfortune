import type { Locator, Page } from '@playwright/test';

export const toggleCheckbox = (page: Page, label: string): Locator => {
    return page.locator(
        `[data-slot="checkbox-content"]:has(input[aria-label="${label}"]) [data-slot="checkbox-control"]`
    );
};

export const switchDrawerTab = async (page: Page, tab: 'Teams' | 'Members') => {
    await page.getByRole('button', { name: tab, exact: true }).click();
};

export const addMembers = async (page: Page, names: string) => {
    await page.getByRole('button', { name: 'Open participants menu' }).click();
    await switchDrawerTab(page, 'Members');
    await page.getByRole('button', { name: 'Add members', exact: true }).click();
    await page.getByLabel('Member names').fill(names);
    await page.getByRole('button', { name: /Add \d+ member/ }).click();
};
