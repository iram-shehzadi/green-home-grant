# Green Home Grant — Team Plan (4 people)

A non-overlapping task split so we can all open PRs in parallel without merge clashes.

## Where the project stands

**Done:** Start page, all 5 question pages, `QuestionPage` component, header, footer, routing.

**Missing / stubbed (the real work left):**

- [ ] `src/utils/eligibility.js` — **doesn't exist** (Requirement 4 + the whole result depends on it)
- [ ] **Zero tests** — vitest isn't even installed (Requirement 9 needs 5+)
- [ ] `CheckAnswersPage.jsx` — stub with TODOs, and gets no `formData` (Requirement 3)
- [ ] `ResultPage.jsx` — stub with TODOs, gets no `formData` (Requirement 4)
- [ ] `PhaseBanner` not mounted (TODO in `App.jsx`)
- [ ] `AI_LOG.md` — only 1 placeholder instance; needs 3+ real ones (Requirement 10)

## The one clash hotspot: `App.jsx`

Right now `CheckAnswersPage` and `ResultPage` are routed **without** `formData`/`updateField`,
and `PhaseBanner` needs mounting. Three of the four tasks below would otherwise all edit
`App.jsx` and collide.

**Fix: land one tiny "wiring" commit to `main` first** (one person, ~2 mins), so `App.jsx`
is finished before parallel work starts. After that, nobody else touches it — they just
consume props.

The wiring commit =
- pass `formData`/`updateField` to the `/check-answers` and `/result` routes
- mount `<PhaseBanner>` below the header

**Suggested order:** land the wiring commit → A / B / C / D all go in parallel.

## The 4-way split (isolated files, no clashes after wiring)

| Person | Task | Files they own | Touches `App.jsx`? |
|--------|------|----------------|--------------------|
| **A** | **Eligibility engine + tests + vitest setup** | `src/utils/eligibility.js`, `src/utils/eligibility.test.js`, `package.json`, `vite.config.js` | No |
| **B** | **Check-your-answers page** (summary list, Change links, Accept & continue) | `src/pages/CheckAnswersPage.jsx` | No (reads props) |
| **C** | **Result page** (panel, outcome, next steps — consumes A's function) | `src/pages/ResultPage.jsx` | No (reads props) |
| **D** | **A11y + responsive + chrome + AI_LOG** (320px audit, focus, PhaseBanner content, accessibility statement, AI_LOG entries) | `src/pages/AccessibilityStatementPage.jsx`, `AI_LOG.md`, additive `App.css` | Only if D does the wiring commit |

### Task A — Eligibility engine + tests
- Create `src/utils/eligibility.js` as a **pure function** (no React) — see contract below.
- Add `vitest` to `devDependencies`, add `"test": "vitest"` script, configure `vite.config.js`.
- Write `src/utils/eligibility.test.js` with **5+ cases** (eligible / partial / not-eligible
  plus edge cases). Assert against the contract shape below.
- Uses the exact answer vocabulary from `CLAUDE.md`.

### Task B — Check-your-answers page
- Implement `CheckAnswersPage.jsx`: `govuk-summary-list` with one row per answer.
- Each row has a **Change** link (with visually-hidden text naming the field) back to that page.
- Final button: **"Accept and continue"** → navigates to `/result`.
- Reads answers from the `formData` prop (wired in `App.jsx` already).

### Task C — Result page
- Implement `ResultPage.jsx`: call A's `checkEligibility(formData)`.
- Eligible → green `govuk-panel`; partial / not-eligible stated plainly with reason.
- **Never colour alone** — always include text. Show next steps below the panel.
- Reads answers from the `formData` prop.

### Task D — A11y, responsive, chrome, AI_LOG
- Fill in `PhaseBanner` content + accessibility statement page.
- Audit at **320px** (no horizontal scroll, tap targets >= 44px), check visible focus indicators
  and 4.5:1 contrast across pages.
- Own `AI_LOG.md`: collect everyone's entries (3+ instances, four fields each).

## The one dependency to lock down up front: A ↔ C

C's Result page imports A's function, so **agree the contract before coding** so neither
blocks the other. Proposed shape:

```js
// src/utils/eligibility.js
export function checkEligibility(formData) {
  return {
    outcome: 'eligible' | 'partial' | 'not-eligible',
    schemes: ['insulation', 'heat-pump'],   // what they qualify for
    reason: 'Plain-English why',
    nextSteps: ['...'],
  };
}
```

C can stub this shape locally until A merges; A's tests assert against the same shape.
No collision because they're in different files.

### Answer vocabulary (from CLAUDE.md — A and C both depend on these exact strings)

- `propertyType`: `house` | `bungalow` | `flat` | `maisonette` | `other`
- `ownership`: `own` | `private-rent` | `housing-association` | `council`
- `income`: `under-31000` | `31000-50000` | `over-50000`
- `insulation`: `both` | `wall` | `loft` | `none` | `dont-know`
- `heating`: `gas` | `oil` | `electric` | `heat-pump` | `other`

## Why this split avoids clashes

- **A, B, C work in entirely separate files.** Only A touches `package.json` / `vite.config.js`,
  which nobody else needs.
- **`App.css` edits are additive** (new `govuk-*` classes) — merge-friendly even if two people
  add to it.
- **`App.jsx`** — the only shared-state file — is frozen after the wiring commit.
- **`AI_LOG.md`** has one owner (D). Even safer: each person drafts their AI_LOG entry in their
  PR description and D transcribes — no two people append to the file at once.

## Working agreements

- Branch per task: `feature/eligibility`, `feature/check-answers`, `feature/result`, `feature/a11y`.
- `npm run build` must pass before you push.
- Keep PRs small and reviewed by one other person.
- Follow the GOV.UK Design System exactly — reuse `govuk-*` classes already in `App.css`.
