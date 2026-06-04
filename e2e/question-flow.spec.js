import { test, expect } from '@playwright/test';
import { gotoStart, answerQuestion, completeJourney } from './helpers.js';

test.describe('Question flow', () => {
  test('completes the full journey and lands on the result page', async ({ page }) => {
    test.setTimeout(60_000);
    await completeJourney(page);

    // Check-answers summary reflects the choices made.
    await expect(
      page.getByRole('heading', { level: 1, name: 'Check your answers' })
    ).toBeVisible();
    await expect(page.getByText('House', { exact: true })).toBeVisible();
    await expect(page.getByText('Gas boiler', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Accept and continue' }).click();
    await expect(page).toHaveURL(/\/result$/);

    // Result page shows the correct outcome heading (updated result page — no panel).
    await expect(
      page.getByRole('heading', { level: 1, name: 'You may be eligible for a Green Home Grant' })
    ).toBeVisible();
  });

  test('the Back link returns to the previous page', async ({ page }) => {
    await gotoStart(page);
    await page.getByRole('button', { name: 'Start now' }).click();
    await answerQuestion(page, 'House'); // now on /ownership

    await expect(page).toHaveURL(/\/ownership$/);
    const backLink = page.locator('.govuk-back-link');
    // Back link href carries the proxy base path (router basename).
    await expect(backLink).toHaveAttribute('href', /\/proxy\/\d+\/property-type$/);

    await backLink.click();
    await expect(page).toHaveURL(/\/property-type$/);
  });

  test('answers persist when navigating back and forward', async ({ page }) => {
    await gotoStart(page);
    await page.getByRole('button', { name: 'Start now' }).click();
    await answerQuestion(page, 'House'); // -> /ownership

    await page.locator('.govuk-back-link').click();
    await expect(page).toHaveURL(/\/property-type$/);

    // The previously chosen answer is still selected (single source of truth).
    await expect(page.getByRole('radio', { name: 'House' })).toBeChecked();
  });

  test('a Change link from check-answers preserves the stored answer', async ({ page }) => {
    await completeJourney(page);

    await page
      .getByRole('link', { name: /Change property type/ })
      .click();

    await expect(page).toHaveURL(/\/property-type$/);
    await expect(page.getByRole('radio', { name: 'House' })).toBeChecked();
  });

  test('the insulation page offers an "or / I do not know" option', async ({ page }) => {
    await gotoStart(page);
    await page.getByRole('button', { name: 'Start now' }).click();
    await answerQuestion(page, 'House');
    await answerQuestion(page, 'Own it (with or without a mortgage)');
    await answerQuestion(page, 'Less than £31,000');

    await expect(page).toHaveURL(/\/insulation$/);
    await expect(page.getByText('or', { exact: true })).toBeVisible();
    await expect(page.getByRole('radio', { name: 'I do not know' })).toBeVisible();
  });
});
