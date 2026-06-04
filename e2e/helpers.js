import { expect } from '@playwright/test';

// A complete set of answers for the happy path, in journey order. The labels
// match what each QuestionPage renders; the routes match CLAUDE.md's route order.
export const JOURNEY = [
  { route: '/property-type', heading: 'What type of property do you live in?', answer: 'House' },
  { route: '/ownership', heading: 'Do you own or rent your property?', answer: 'Own it (with or without a mortgage)' },
  { route: '/income', heading: 'What is your annual household income?', answer: 'Less than £31,000' },
  { route: '/insulation', heading: 'Does your property have wall or loft insulation?', answer: 'No insulation' },
  { route: '/heating', heading: 'What is your main heating system?', answer: 'Gas boiler' },
];

// Load the start page (baseURL already carries the /proxy/<port>/ prefix).
export async function gotoStart(page) {
  await page.goto('./');
  await expect(
    page.getByRole('heading', { name: 'Check if you can get a Green Home Grant' })
  ).toBeVisible();
}

// Select a radio by its visible label and press Continue.
export async function answerQuestion(page, label) {
  await page.getByRole('radio', { name: label }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
}

// Walk Start -> all five questions, answering each, leaving us on /check-answers.
export async function completeJourney(page) {
  await gotoStart(page);
  await page.getByRole('button', { name: 'Start now' }).click();
  for (const step of JOURNEY) {
    await expect(page).toHaveURL(new RegExp(`${step.route}$`));
    await answerQuestion(page, step.answer);
  }
  await expect(page).toHaveURL(/\/check-answers$/);
}

// Walk Start -> all five questions with custom answers -> /result.
// answers: array of five visible radio labels in journey order
// (propertyType, ownership, income, insulation, heating).
export async function completeJourneyWith(page, answers) {
  await gotoStart(page);
  await page.getByRole('button', { name: 'Start now' }).click();
  for (let i = 0; i < JOURNEY.length; i++) {
    await expect(page).toHaveURL(new RegExp(`${JOURNEY[i].route}$`));
    await answerQuestion(page, answers[i]);
  }
  await expect(page).toHaveURL(/\/check-answers$/);
  await page.getByRole('button', { name: 'Accept and continue' }).click();
  await expect(page).toHaveURL(/\/result$/);
}
