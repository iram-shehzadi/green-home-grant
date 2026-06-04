import { test, expect } from '@playwright/test';
import { completeJourneyWith } from './helpers.js';

// Shorthand answer sets in journey order: propertyType, ownership, income, insulation, heating.
const ELIGIBLE = [
  'House',
  'Own it (with or without a mortgage)',
  'Less than £31,000',
  'No insulation',
  'Gas boiler',
];

const PARTIAL_RENTER = [
  'House',
  'Rent from a private landlord',
  'Less than £31,000',
  'No insulation',
  'Gas boiler',
];

const PARTIAL_INCOME = [
  'House',
  'Own it (with or without a mortgage)',
  '£31,000 to £50,000',
  'No insulation',
  'Gas boiler',
];

const NOT_ELIGIBLE_COUNCIL = [
  'House',
  'Rent from the council',
  'Less than £31,000',
  'No insulation',
  'Gas boiler',
];

const NOT_ELIGIBLE_INCOME = [
  'House',
  'Own it (with or without a mortgage)',
  '£50,000 or more',
  'No insulation',
  'Gas boiler',
];

test.describe('Result page', () => {
  test('eligible: shows full-grant heading and funded schemes', async ({ page }) => {
    await completeJourneyWith(page, ELIGIBLE);

    await expect(
      page.getByRole('heading', { level: 1, name: 'You may be eligible for a Green Home Grant' })
    ).toBeVisible();

    await expect(page.getByText('You meet all the criteria for full funding.')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'What you could get funding for' })).toBeVisible();
    await expect(page.getByText('Home insulation')).toBeVisible();
    await expect(page.getByText('A heat pump')).toBeVisible();

    await expect(page.getByRole('heading', { name: 'What you need to do next' })).toBeVisible();
    await expect(page.getByText('Apply online through the Green Home Grant service.')).toBeVisible();
  });

  test('partial (private renter): shows partial heading and landlord next step', async ({ page }) => {
    await completeJourneyWith(page, PARTIAL_RENTER);

    await expect(
      page.getByRole('heading', { level: 1, name: 'You may be eligible for partial funding' })
    ).toBeVisible();

    await expect(page.getByText(/Private renters need landlord permission/)).toBeVisible();
    await expect(page.getByText('Get written permission from your landlord before work begins.')).toBeVisible();
  });

  test('partial (middle income): shows partial heading and part-funding reason', async ({ page }) => {
    await completeJourneyWith(page, PARTIAL_INCOME);

    await expect(
      page.getByRole('heading', { level: 1, name: 'You may be eligible for partial funding' })
    ).toBeVisible();

    await expect(page.getByText(/middle income band receives/)).toBeVisible();
  });

  test('not eligible (council tenant): explains landlord responsibility', async ({ page }) => {
    await completeJourneyWith(page, NOT_ELIGIBLE_COUNCIL);

    await expect(
      page.getByRole('heading', { level: 1, name: 'You are not eligible for a Green Home Grant' })
    ).toBeVisible();

    await expect(page.getByText(/your landlord is responsible for these improvements/)).toBeVisible();
    await expect(page.getByText('Contact your landlord or housing provider about energy efficiency improvements.')).toBeVisible();
  });

  test('not eligible (high income): explains income threshold', async ({ page }) => {
    await completeJourneyWith(page, NOT_ELIGIBLE_INCOME);

    await expect(
      page.getByRole('heading', { level: 1, name: 'You are not eligible for a Green Home Grant' })
    ).toBeVisible();

    await expect(page.getByText(/above £50,000/)).toBeVisible();
  });

  test('shows the fictional-scheme disclaimer on every outcome', async ({ page }) => {
    await completeJourneyWith(page, ELIGIBLE);

    await expect(
      page.getByText('These eligibility rules are fictional and for demonstration purposes only.')
    ).toBeVisible();
  });
});
