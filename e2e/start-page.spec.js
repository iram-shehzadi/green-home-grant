import { test, expect } from '@playwright/test';
import { gotoStart } from './helpers.js';

test.describe('Start page', () => {
  test('shows the title, description and a Start now button', async ({ page }) => {
    await gotoStart(page);

    await expect(
      page.getByRole('heading', { level: 1, name: 'Check if you can get a Green Home Grant' })
    ).toBeVisible();

    await expect(page.getByText('Use this service to find out')).toBeVisible();

    const startButton = page.getByRole('button', { name: 'Start now' });
    await expect(startButton).toBeVisible();
  });

  test('Start now begins the journey at the first question', async ({ page }) => {
    await gotoStart(page);
    await page.getByRole('button', { name: 'Start now' }).click();

    await expect(page).toHaveURL(/\/property-type$/);
    await expect(
      page.getByRole('heading', { level: 1, name: 'What type of property do you live in?' })
    ).toBeVisible();
  });
});
