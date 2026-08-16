import { expect, test } from '@playwright/test';
import { addMembers, switchDrawerTab, toggleCheckbox } from './helpers';

test.describe('participants drawer', () => {
    test('opens without crashing and switches tabs', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Open participants menu' }).click();

        await expect(page.getByRole('button', { name: 'Members', exact: true })).toBeVisible();
        await switchDrawerTab(page, 'Members');
        await expect(page.getByRole('button', { name: 'Add members', exact: true })).toBeVisible();
        await switchDrawerTab(page, 'Teams');
        await expect(page.getByRole('button', { name: 'Add team' })).toBeVisible();
    });

    test('bulk adds members from a pasted list', async ({ page }) => {
        await page.goto('/');
        await addMembers(page, 'Jan Kowalski\nAnna Nowak\nJan Kowalski\nPiotr Zielinski');

        await expect(page.getByRole('button', { name: 'Jan Kowalski', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Anna Nowak', exact: true })).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Piotr Zielinski', exact: true })
        ).toBeVisible();
        await expect(page.getByRole('button', { name: 'Jan Kowalski', exact: true })).toHaveCount(
            1
        );
    });

    test('creates a team with quick-add member', async ({ page }) => {
        await page.goto('/');
        await addMembers(page, 'John Doe');

        await switchDrawerTab(page, 'Teams');
        await page.getByRole('button', { name: 'Add team' }).click();
        await page.getByLabel('Team name').fill('Frontend');
        await page.getByLabel('Quick add member').fill('Jane Roe');
        await page.getByRole('button', { name: 'Add member' }).click();
        await page.getByRole('button', { name: 'Create team' }).click();

        await expect(page.getByRole('button', { name: 'Frontend', exact: true })).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Remove Jane Roe from Frontend' })
        ).toBeVisible();
    });

    test('edits a team via the edit button', async ({ page }) => {
        await page.goto('/');
        await addMembers(page, 'John Doe\nJane Roe');
        await switchDrawerTab(page, 'Teams');
        await page.getByRole('button', { name: 'Add team' }).click();
        await page.getByLabel('Team name').fill('Frontend');
        await page.getByRole('button', { name: 'Create team' }).click();

        await page.getByRole('button', { name: 'Edit team Frontend' }).click();
        await page.getByLabel('Team name').fill('Backend');
        await page.getByRole('button', { name: 'Save team' }).click();

        await expect(page.getByRole('button', { name: 'Backend', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Frontend', exact: true })).toHaveCount(0);
    });

    test('adds an existing member to a team via the Add chip', async ({ page }) => {
        await page.goto('/');
        await addMembers(page, 'John Doe');
        await switchDrawerTab(page, 'Teams');
        await page.getByRole('button', { name: 'Add team' }).click();
        await page.getByLabel('Team name').fill('Frontend');
        await page.getByRole('button', { name: 'Create team' }).click();

        await page.getByRole('button', { name: 'Add members to Frontend' }).click();
        await page.getByRole('button', { name: 'John Doe', exact: true }).click();
        await page.getByRole('button', { name: 'Save team' }).click();

        await expect(
            page.getByRole('button', { name: 'Remove John Doe from Frontend' })
        ).toBeVisible();
    });

    test('selects members and teams for the lottery', async ({ page }) => {
        await page.goto('/');
        await addMembers(page, 'John Doe\nJane Roe');
        await switchDrawerTab(page, 'Teams');
        await page.getByRole('button', { name: 'Add team' }).click();
        await page.getByLabel('Team name').fill('Frontend');
        await page.getByRole('button', { name: 'Create team' }).click();

        const teamCheckbox = page.getByRole('checkbox', { name: 'Select team Frontend' });
        await toggleCheckbox(page, 'Select team Frontend').click();
        await expect(teamCheckbox).toBeChecked();

        await switchDrawerTab(page, 'Members');
        const memberCheckbox = page.getByRole('checkbox', { name: 'Select John Doe' });
        await toggleCheckbox(page, 'Select John Doe').click();
        await expect(memberCheckbox).toBeChecked();
    });

    test('removes a member from a team via chip', async ({ page }) => {
        await page.goto('/');
        await addMembers(page, 'John Doe');
        await switchDrawerTab(page, 'Teams');
        await page.getByRole('button', { name: 'Add team' }).click();
        await page.getByLabel('Team name').fill('Frontend');
        await page.getByRole('button', { name: 'John Doe', exact: true }).click();
        await page.getByRole('button', { name: 'Create team' }).click();

        const removeButton = page.getByRole('button', {
            name: 'Remove John Doe from Frontend',
        });
        await expect(removeButton).toBeVisible();
        await removeButton.click();
        await expect(page.getByText('No members yet')).toBeVisible();
    });
});
