Below is the brief etc of a hackathon I am taking part in with 3 colleagues. WE don't have much experience with hackathons but we want to win. Please help us devise a plan of work in Plan mode. Give us some options for how we can divide the work and proceed each of us independently and collaboratively. I would like a HTML file as your output so that we can properly engage with the content. Make sure the file produces deterministic JSON output that we can then feed back to you. Make the file beuatiful.

Brief
Your team works for a government department that needs to determine whether citizens qualify
for a “Green Home Grant” – a fictional scheme offering funding toward home insulation and heat
pump installation. Currently, citizens must phone a call centre and wait an average of 35 minutes
to find out whether they are eligible. Your job is to build a digital service that replaces that phone
call.
The service asks citizens a series of questions (property type, ownership status, household
income band, existing insulation, current heating system) and tells them whether they qualify,
what they qualify for, and what to do next. The service must follow GOV.UK design patterns, meet
WCAG 2.2 AA accessibility requirements, and work on both mobile and desktop browsers.
You will use Claude CLI as your primary AI assistant throughout the build. For every piece of
AI-generated code you ship, you must record what you prompted, what the AI produced, and what
you changed before committing.

Requirements
1. A start page following the GOV.UK start page pattern (title, description, “Start now” button)
2. A multi-step question flow using the one-thing-per-page pattern (minimum 5 questions)
3. A “Check your answers” summary page where users can review and change their responses
4. An eligibility result page showing a clear outcome (eligible / not eligible / partial eligibility)
5. WCAG 2.2 AA compliance: all form inputs labelled, keyboard-navigable, colour contrast 4.5:1
minimum, visible focus indicators. The 2.2 additive criteria (focus-not-obscured, dragging
movements, consistent help, redundant entry) are covered by default when using GOV.UK
Frontend components correctly.
6. GOV.UK typography and spacing: correct font stack, heading sizes, spacing scale
7. Responsive layout that works at 320px viewport width without horizontal scrolling
8. Client-side form validation with error messages following the GOV.UK error pattern (error
summary at top, inline errors per field)
9. At least 5 unit tests covering the eligibility logic
10. An AI_LOG.md file documenting AI-assisted development. Document 3+ entries in your AI_LOG
covering 3-5 distinct patterns from this list – planning, multi-agent critique, plan-mode
scaffolding, refactor, test generation. Aim for variety: an entry that just says “asked Claude to
write X” three times doesn’t demonstrate AI as a real engineering tool. Use the seeded
template at labs/hackathon/starter/AI_LOG.md; complete four fields for each entry: Date, Task,
What AI Generated, What You Changed + Why.

Minimum Viable Submission – Read First
These six items define the floor. Every team must ship all six before pursuing stretch goals or
polish.
1. Multi-page question flow (Requirement 1-2) – start page through to at least 5 question pages
using one-thing-per-page
2. Check-your-answers summary (Requirement 3) – summary list with Change links for every
answer
3. Confirmation page (Requirement 4) – clear eligibility outcome (eligible / not eligible / partial)
4. GOV.UK Design System components (Requirement 6) – correct typography, spacing, heading
hierarchy using the provided CSS variables
5. WCAG 2.2 AA compliance (Requirement 5) – labelled inputs, keyboard navigation, 4.5:1 contrast,
visible focus indicators
6. AI usage log (Requirement 10) – seeded AI_LOG.md with four completed fields per instance,
minimum 3 instances
If you ship these six items cleanly, you have met the bar. Build outward from this floor.

When Teams Get Stuck
Problem Facilitator Response
Team cannot agree on
architecture
Suggest starting with the GOV.UK start page and building one question at a time.
Ship a working page before debating the overall design. The starter scaffold
already has the routes – follow them.
Form state is lost between
pages
Direct the team to lift state into the App component. All form data lives in one
useState object at the top level, passed down via props. Point them to the
architecture hint in the lab README.
Team is spending too long
on styling
Remind them that the starter CSS already provides GOV.UK variables and class
names. They should use govuk-heading-xl, govuk-body, govuk-button, etc. Custom
CSS is almost never needed for this brief.
Eligibility logic is tangled
into components
Tell them to extract it into a pure function in its own file
(src/utils/eligibility.js). The function takes the form data object and returns
a result string. This also makes it testable without rendering any components.
Team has finished early
and wants to add features
Direct them to the stretch goals list. Prioritise in this order: save-and-return
with localStorage, a second eligibility pathway, Playwright end-to-end tests.
Discourage cosmetic additions that do not demonstrate new capability

Make sure you review the following links to understand the GOV.UK design and pick the right pages for us to get started (note we want to create a React app). You will very very likely need to explore links within these pages to find the right content.

https://frontend.design-system.service.gov.uk/
https://design-system.service.gov.uk/