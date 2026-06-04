# Green Home Grant — Eligibility Checker

A GOV.UK-styled React service that replaces a 35-minute eligibility phone call.
Citizens answer 5 questions (one per page) and get an instant eligibility result.

**Always follow the GOV.UK Design System: https://frontend.design-system.service.gov.uk/**
When building or changing any page, match the official component/pattern markup,
spacing, and behaviour. If a component isn't in `App.css` yet, copy the design
system's class names and add the minimal matching CSS — never invent bespoke styles.

## Commands
- `npm run dev`   — Vite dev server
- `npm run build` — production build (run this before you push; it must pass)
- `npm test`      — unit tests (vitest)

## Architecture — do not deviate without telling the team
- **One source of truth.** All answers live in a single `formData` object held in
  `useState` at the top of `src/App.jsx`. Never store an answer in a page's own state.
  ```js
  const [formData, setFormData] = useState({
    propertyType: '', ownership: '', income: '', insulation: '', heating: ''
  });
  const updateField = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  ```
- Every page receives `formData` and `updateField` as props from `App.jsx` via its route.
- **Question pages are config, not markup.** Build every question page by rendering
  the shared `src/components/QuestionPage.jsx` and passing props. Do not hand-write
  fieldset/radio markup per page. See the reference page `src/pages/PropertyTypePage.jsx`.
- Eligibility logic is a **pure function** in `src/utils/eligibility.js` — no React inside.

## The QuestionPage component (use it for every question)
It owns the GOV.UK markup, validation, and back/Continue navigation. You supply config:
```jsx
<QuestionPage
  question="What type of property do you live in?"  // becomes the page <h1> in the legend
  fieldName="propertyType"                           // a formData key
  options={[{ value: 'house', label: 'House' }, ...]}// optional per-option: hint, divider:'or'
  value={formData.propertyType}
  onChange={(v) => updateField('propertyType', v)}
  backPath="/" nextPath="/ownership"
  errorMessage="Select the type of property you live in"
  hint="Optional hint under the question"            // optional
/>
```
The component already implements the validation/error pattern below — don't re-implement it.

## Answer vocabulary — use these EXACT string values (eligibility.js depends on them)
- propertyType: `house` | `bungalow` | `flat` | `maisonette` | `other`
- ownership:    `own` | `private-rent` | `housing-association` | `council`
- income:       `under-31000` | `31000-50000` | `over-50000`
- insulation:   `both` | `wall` | `loft` | `none` | `dont-know`
- heating:      `gas` | `oil` | `electric` | `heat-pump` | `other`

## Route order
`/` (Start) → `/property-type` → `/ownership` → `/income` → `/insulation` → `/heating`
→ `/check-answers` → `/result`

## GOV.UK patterns we follow
- **Start page** (`start-using-a-service`): title, short description, who it's for, green
  `govuk-button--start` "Start now". No questions on the start page.
- **One thing per page** (`question-pages`): the question is the page `<h1>`, rendered
  inside the `<legend>` using `govuk-fieldset__heading` + `govuk-fieldset__legend--l`.
  Back link at top; left-aligned "Continue" button.
- **Radios** (`components/radios`): container is `govuk-radios` with `data-module="govuk-radios"`.
- **Check answers** (`check-answers`): `govuk-summary-list` with a "Change" link per row
  (visually-hidden text naming the field); final button "Accept and continue".
- **Result** (`check-a-service-is-suitable`): show every outcome (eligible / partial /
  not-eligible) as a plain page `<h1>` (`govuk-heading-xl`) + body, with the reason and what
  to do next. Do NOT use the confirmation `govuk-panel` — it is only for completed
  transactions, and GOV.UK Frontend has no negative/grey panel variant. Never colour alone.

## Validation & error pattern (already in QuestionPage)
On a missing answer: prefix `<title>` with `Error: `, show the **error summary**
(`role="alert"`, "There is a problem", give it focus) linking to the field, plus an
**inline `govuk-error-message`** with the same wording. Chain ids in `aria-describedby`
(hint id, then error id).

## Styling rules (lessons learned — keep the app coherent)
- **Reuse the classes already in `src/App.css`** (`govuk-*`). Match the GOV.UK Design
  System exactly; if a class is missing, add it under its official name with minimal CSS.
- Don't write page-specific bespoke styles. Scope any genuinely page-only spacing under a
  single wrapper class (e.g. `.start-page`) rather than overriding shared `govuk-*` rules.
- Radios are the **custom-drawn** GOV.UK control (the circle/dot are drawn on the label;
  the native input is invisible but is the real focus/click target). Keep the focus halo;
  we deliberately removed the hover halo.
- Use the spacing scale only: `var(--govuk-spacing-1..9)`. No magic-number margins.
- Back link: chevron has `margin-right` so the arrow and text are spaced.

## Accessibility (WCAG 2.2 AA — non-negotiable)
Every page: labelled inputs, full keyboard nav, visible focus, 4.5:1 contrast. Test at
320px width (no horizontal scroll, tap targets ≥ 44px).

## Mount the chrome
`GovukHeader`, `PhaseBanner`, and `GovukFooter` exist in `src/components/`. Make sure they
are mounted in `App.jsx`'s layout.

## Testing
Vitest. Eligibility tests in `src/utils/eligibility.test.js` — minimum 5 cases.

## AI_LOG (do this AS YOU GO)
For every AI-assisted change add an entry to `AI_LOG.md`:
`Date | Task | What AI Generated | What You Changed + Why`. The "what you changed + why"
is where the judgement shows — don't just paste.
