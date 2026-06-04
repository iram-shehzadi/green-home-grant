# AI Assistance Log

Record every instance where you use AI to generate, refactor, or debug code. Four fields per entry: what you asked for, what the AI produced, what you changed, and why you changed it.

Document **3+ entries** in your AI_LOG covering **3-5 distinct patterns** from this list -- planning, multi-agent critique, plan-mode scaffolding, refactor, test generation. Aim for variety: an entry that just says "asked Claude to write X" three times doesn't demonstrate AI as a real engineering tool.

## Instance 1: Eligibility logic for married couple's allowance edge case

| Field | Detail |
|-------|--------|
| **Date** | YYYY-MM-DD |
| **Task** | Scaffolded eligibility check for married couple's allowance |
| **What AI Generated** | if/else chain covering 5 scenarios: single owner, joint owner, private renter, housing association renter, and council tenant. Used hardcoded age threshold of 65 for pension-credit eligibility. Did not include civil-partnership status. Error message on ineligible path was generic ("You are not eligible"). |
| **What You Changed + Why** | Removed hardcoded age threshold (was 65, should be state-pension-age variable) -- hardcoded age breaks if policy changes. Added missing civil-partnership case alongside married status -- civil partnership is a legal requirement since 2004. Changed error message from generic to specific ("You are not eligible because your household income exceeds the threshold") -- generic errors do not help users correct their input. |

## Instance 2: Planning the build (interactive HTML plan / mission-control hub)

| Field | Detail |
|-------|--------|
| **Date** | 2026-06-03 |
| **Task** | Use Claude's plan mode to scope the whole hackathon build and produce a shared plan we could all engage with. We asked for a single HTML file we could open in a browser, make decisions in, and export as deterministic JSON to feed back to Claude. |
| **What AI Generated** | Claude explored the starter repo and the GOV.UK Design System, then produced a self-contained, interactive HTML "mission-control" page: the six MVP floor items, a GOV.UK pattern reference, a concrete (fictional) eligibility ruleset with worked test cases, a work-division strategy chooser, a task board with owner dropdowns, stretch goals, an AI_LOG plan, and a "Generate JSON" button that emitted all our choices deterministically. After we answered a few scoping questions (timebox, scope, ruleset) it updated the plan and re-rendered the HTML. |
| **What You Changed + Why** | The plan was genuinely engaging to look at and it made us home in on key decisions fast — we chose a work-division strategy and a first page to build, and Claude re-rendered the HTML to match. But two problems led us to drop most of it. **(1) Forward dependencies.** Many sections asked for input whose meaning depended on answers we hadn't given yet. Example: Section 3 asked which page to build first, but the CLAUDE.md starter in Section 4 directly below had already hard-coded "Property type", so it was unclear whether our choice mattered; likewise the task board's suggested owners depended on a strategy chosen in another section, and the AI_LOG plan asked us to assign five patterns across four developers before we'd even entered our names. **(2) Wrong order — cart before the horse.** More fundamentally, the plan front-loaded design and content decisions (the eligibility rules, GOV.UK patterns, which page to build first) when what we actually needed *first* was to agree a way of working as a team and the order in which to tackle the work ahead. That process decision mattered more than the design decisions, but it was buried among them. As an inexperienced team without a strong structure of our own, being shown every decision at once was overwhelming; we needed to take things one step at a time and weren't set up to impose that sequence ourselves — so we dropped most of the plan and worked from the chat. **Future improvement:** sequence the plan — settle *how we work and in what order* before surfacing any design/content decisions — and make it branch interactively, revealing only the next relevant decision based on earlier answers, so each step shows just the information needed to make that one choice. |

## Instance 3

| Field | Detail |
|-------|--------|
| **Date** | |
| **Task** | |
| **What AI Generated** | |
| **What You Changed + Why** | |
