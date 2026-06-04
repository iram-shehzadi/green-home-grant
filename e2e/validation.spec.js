import { test, expect } from '@playwright/test';
import { gotoStart } from './helpers.js';

test.describe('Validation (GOV.UK error pattern)', () => {
  test.beforeEach(async ({ page }) => {
    await gotoStart(page);
    await page.getByRole('button', { name: 'Start now' }).click();
    await expect(page).toHaveURL(/\/property-type$/);
  });

  test('Continue with no answer shows a focused error summary', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue' }).click();

    // Stays on the same page — no navigation.
    await expect(page).toHaveURL(/\/property-type$/);

    const summary = page.getByRole('alert');
    await expect(summary.getByText('There is a problem')).toBeVisible();
    await expect(
      summary.getByText('Select the type of property you live in')
    ).toBeVisible();

    // The summary receives focus for keyboard / screen-reader users.
    await expect(page.locator('#error-summary')).toBeFocused();
  });

  test('an inline error message and an "Error:" page title appear', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('.govuk-error-message')).toContainText(
      'Select the type of property you live in'
    );
    await expect(page).toHaveTitle(/^Error:/);
  });

  test('selecting an answer then continuing clears the error and advances', async ({ page }) => {
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toBeVisible();

    await page.getByRole('radio', { name: 'House' }).check();
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(/\/ownership$/);
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
});
