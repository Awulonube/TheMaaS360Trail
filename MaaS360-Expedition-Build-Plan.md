# MaaS360 Expedition — Onboarding Website Build Plan

> **Build-ready spec v2.** This document is the single source of truth for an AI agent or developer
> building the site end-to-end. Where two earlier statements conflicted (page counts, task counts,
> gating thresholds, phase numbering), this version resolves them. Canonical numbers, schemas, and
> path rules live in the **Reference** sections and must not be contradicted elsewhere.

---

## 0. Build Agent Brief (read first)

**Role.** You are building a static, framework-free training website. No backend, no build step.
Every page must open correctly both (a) by double-clicking the file (`file://`) and (b) when served
from a static host.

**Hard constraints.**
- Plain HTML + CSS + vanilla JS only. No npm, no bundler, no transpiler.
- All shared behaviour lives in 4 JS files; never duplicate logic into a page.
- All content lives in 9 data files; never hardcode task content into a page.
- All state lives in `localStorage` via `progress.js` only — no other file touches `localStorage`.
- Every interactive element must be reachable with keyboard and have a visible focus state.

**Definition of done.** All checks in **Sub-Task 11** pass, with zero console errors on every page.

**Open decisions that must be confirmed before building** (see §12): the Tailwind dependency, and the
Assess pass-threshold vs. question count. Defaults are given so the build can proceed without blocking.

---

## 1. What This Project Is

A gamified onboarding website for new hires joining the IBM MaaS360 team. MaaS360 is IBM's Mobile
Device Management (MDM) / Unified Endpoint Management (UEM) platform. New hires use the site to learn
the product, tools, and role expectations in a structured, progressive way.

The site is themed as a mountain-climbing expedition. A new hire starts at the trailhead, clears the
**Onboarding Essentials** basecamp, then climbs **8 numbered phases**. Completing the final phase
(Phase 8) confers **Peak Certified** status — Phase 8 *is* the summit, not a step beyond it.

There are therefore **9 navigable phase-level units**: Essentials (Section 0) plus Phases 1–8. The
home page presents these as **9 trail-marker cards**.

---

## 2. Canonical Counts (single source of truth)

| Item | Count |
|---|---|
| Phase-level units (Essentials + Phase 1–8) | 9 |
| Phase HTML pages | 9 (`essentials.html`, `phase1.html` … `phase8.html`) |
| Task pages | **76** |
| Supporting pages | 2 (`index.html`, `gear-room.html`) |
| **Total HTML files** | **87** |
| Shared CSS files | 1 |
| Shared JS files | 4 |
| Data files | 9 |

**Task counts per phase** (derived from the task lists in §9; these lists are authoritative):

| Phase | Tasks |
|---|---|
| Essentials | 9 |
| Phase 1 | 8 |
| Phase 2 | 13 |
| Phase 3 | 10 |
| Phase 4 | 11 |
| Phase 5 | 11 |
| Phase 6 | 6 |
| Phase 7 | 5 |
| Phase 8 | 3 |
| **Total** | **76** |

> If you add or remove a task, update §9 (the list), the per-phase count above, the totals, and the
> matching Sub-Task 6/8 numbers in the same commit. These four places must always agree.

---

## 3. Site Structure

Three page types plus two supporting pages.

1. **Home (`index.html`)** — A visual mountain-path dashboard showing all 9 phase-level units as
   interactive trail-marker cards. Clicking a card opens that phase page.
2. **Phase pages (`essentials.html`, `phase1.html` … `phase8.html`)** — One per phase-level unit.
   Shows the phase title, an "Elevation Objective" summary, a phase progress bar, and a grid of task
   cards. Clicking a task card opens its task page.
3. **Task pages (e.g. `phase1/task-understand-brand.html`)** — One per task. Four gated sections that
   unlock in order: **Learn → Practice → Assess → Apply**.

Supporting pages:
- **Gear Room (`gear-room.html`)** — Reference hub linking to IBM Docs, portals, and tools (real links
  where known, styled placeholders otherwise). Also hosts the "Reset All Progress" button.
- **Essentials (`essentials.html`)** — Section 0 admin onboarding (laptop enrollment, 1Password, etc.).
  It is a normal phase page driven by the same engine; only its content is admin-flavoured.

---

## 4. Folder Structure

```
/
├── index.html                  ← Home / Trailhead (mountain path dashboard)
├── gear-room.html              ← Gear Room (resources + Reset All Progress)
├── essentials.html             ← Section 0: Onboarding Essentials (phase page)
├── phase1.html                 ← Phase 1: Basecamp
├── phase2.html                 ← Phase 2: Acclimation
├── phase3.html                 ← Phase 3: Ascent
├── phase4.html                 ← Phase 4: High Camp
├── phase5.html                 ← Phase 5: Summit Push
├── phase6.html                 ← Phase 6: Summit
├── phase7.html                 ← Phase 7: Expedition Lead
├── phase8.html                 ← Phase 8: Peak Certified
│
├── assets/
│   ├── css/
│   │   └── styles.css          ← All shared styles (variables, layout, components, animations)
│   ├── js/
│   │   ├── progress.js         ← localStorage read/write + progress math (load FIRST)
│   │   ├── nav.js              ← Sidebar injection, active link, progress bar, lock icons
│   │   ├── phase-engine.js     ← Renders the task-card grid on a phase page
│   │   └── task-engine.js      ← Renders the four-section gated task page
│   └── data/
│       ├── essentials-data.js  ← window.ESSENTIALS_DATA
│       ├── phase1-data.js      ← window.PHASE1_DATA
│       ├── phase2-data.js      ← window.PHASE2_DATA
│       ├── phase3-data.js
│       ├── phase4-data.js
│       ├── phase5-data.js
│       ├── phase6-data.js
│       ├── phase7-data.js
│       └── phase8-data.js
│
├── essentials/                 ← 9 task pages
│   ├── task-meet-the-team.html
│   ├── task-enroll-laptop.html
│   └── …
│
├── phase1/                     ← 8 task pages
│   ├── task-understand-brand.html
│   └── …
│
└── phase2/ … phase8/           ← one folder per phase, one file per task
```

> **Script load order on every page that uses the sidebar:** `progress.js` → data file(s) → `nav.js`
> → (`phase-engine.js` or `task-engine.js`). `nav.js` and both engines assume `window.Progress`
> already exists.

---

## 5. Reference: Identifiers, Paths & Naming

These rules remove the ambiguity in the original plan and guarantee link integrity across 87 files.

**Phase IDs** (used as `localStorage` keys, `allPhasesMap` keys, and `Nav.init` `activePage`):
`essentials`, `phase1`, `phase2`, `phase3`, `phase4`, `phase5`, `phase6`, `phase7`, `phase8`.
Supporting pages use `activePage` values `home` and `gear-room`.

**Task IDs.** Lowercase kebab-case slug derived from the task title, prefixed by `task-`. Must be
**unique within its phase** (across phases the same slug may recur — it is namespaced by `phaseId`).
Examples: `task-understand-brand`, `task-enroll-laptop`, `task-access-kme`.

**Task page filenames.** `<phaseId>/<taskId>.html` — e.g. `phase2/task-access-kme.html`. A task's
`url` field in the data file **must equal this exact relative-from-root path**.

**Asset paths by page depth:**

| Page location | CSS/JS/data prefix | Home link | Back-to-phase link |
|---|---|---|---|
| Root (`index.html`, `phase1.html`, `gear-room.html`) | `assets/…` | `index.html` | n/a |
| Task page (`phase1/…`) | `../assets/…` | `../index.html` | `../phase1.html` |

**Active-link mechanism.** Use the `activePage` parameter passed to `Nav.init()` as the **single**
source of truth for highlighting. Do **not** also rely on a `data-page` body attribute (the original
plan mentioned both — pick one to avoid drift). `data-phase` on `<body>` is allowed only for optional
CSS theming, never for active-link logic.

---

## 6. Reference: Data Schemas (authoritative)

All data files assign one global. Engines consume these shapes exactly; do not invent extra required
fields without updating this section.

### 6.1 Phase data object

```js
// assets/data/phase1-data.js
window.PHASE1_DATA = {
  id: "phase1",                 // must match a Phase ID in §5
  title: "Phase 1: Basecamp",
  subtitle: "Get oriented...",  // the "Elevation Objective" line
  icon: "⛺",                    // emoji or inline SVG string
  tasks: [ /* Task objects, see 6.2 */ ]
};
```

### 6.2 Task data object

```js
{
  id: "task-understand-brand",        // unique within phase (§5)
  phaseId: "phase1",                  // must match the owning phase
  title: "Understand the MaaS360 Team / Brand",
  description: "MaaS360 is IBM's unified endpoint management (UEM) solution that…",
  url: "phase1/task-understand-brand.html",  // exact path, relative to root (§5)

  learn: [                            // 2–4 panels
    { id: "p1", title: "The big picture", body: "Plain-English prose…" },
    { id: "p2", title: "How it works",    body: "…" }
  ],

  practice: {
    iframePlaceholder: true,          // renders the grey [PLACEHOLDER] walkthrough box
    steps: [                          // 3–5 self-confirm steps
      "Open the MaaS360 portal.",
      "Locate the device list.",
      "Note your assigned tenant."
    ]
  },

  assess: {
    questions: [                      // see §7 for the count/threshold rule
      { type: "mc", question: "What is UEM?", options: ["A","B","C","D"], correct: 2 },
      { type: "mc", question: "…",            options: ["A","B","C","D"], correct: 0 },
      { type: "mc", question: "…",            options: ["A","B","C","D"], correct: 1 },
      { type: "mc", question: "…",            options: ["A","B","C","D"], correct: 3 },
      { type: "mc", question: "…",            options: ["A","B","C","D"], correct: 0 },
      { type: "text", question: "In your own words, why does IBM bundle device management into one portal?" }
    ]
  },

  apply: {
    isRealScenario: false,            // true for ALL Phase 6–8 tasks (shows LIVE SCENARIO badge)
    scenario: "A guided scenario describing what to do and what 'done' looks like."
  }
}
```

**Field rules**
- `learn[].id` must be unique within the task (used as the `learnPanelsOpened` key).
- `assess.questions[].correct` is the **zero-based index** of the correct option.
- Exactly **five** `type: "mc"` questions and **one** `type: "text"` reflection question per task.
- `apply.isRealScenario` is `true` for every task in Phases 6, 7, 8; otherwise `false`.

### 6.3 `allPhasesMap`

A plain map of phaseId → array of that phase's task IDs, used for global progress and lock logic.
Defined once per page (see §5 for where). It must list **all 9 phases and all 76 task IDs**.

```js
const allPhasesMap = {
  essentials: ["task-meet-the-team", "task-enroll-laptop", /* …9 total */],
  phase1:     ["task-understand-brand", /* …8 total */],
  // … through phase8
};
```

> Recommended: export `allPhasesMap` from a tiny shared file (`assets/data/phases-map.js`) and include
> it on every page, rather than re-declaring it in 87 inline scripts. This is the lowest-risk way to
> keep the global progress total correct. (The original plan duplicated it per page — allowed, but
> error-prone.)

---

## 7. Reference: State & Gating Logic (authoritative)

**Storage key (one per task):** `expedition_task_{phaseId}_{taskId}`
e.g. `expedition_task_phase1_task-understand-brand`.

**State object shape (and defaults):**

```js
{
  learnPanelsOpened: [],   // array of learn[].id strings
  practiceSteps:     [],   // array of checked step indices (numbers)
  assessScore:       null, // FRACTION 0–1 (not a percent). null until quiz submitted.
  reflectionMarked:  false,
  sectionsComplete:  []    // subset of ["learn","practice","assess","apply"]
}
```

> **Resolved inconsistency:** `assessScore` is stored as a **fraction in [0,1]**. The pass threshold
> is `0.7`. Anywhere the UI shows a percentage, multiply by 100 for display only.

**Gate table — a section's tab unlocks when the named condition is met:**

| Section | Unlocks when |
|---|---|
| Learn | Always (entry point) |
| Practice | `"learn"` ∈ `sectionsComplete` (i.e. all Learn panels opened, then "Mark Learn Complete") |
| Assess | `"practice"` ∈ `sectionsComplete` |
| Apply | `"assess"` ∈ `sectionsComplete` |

**Section-completion conditions (what lets you click "Mark … Complete"):**

| Section | Completion condition |
|---|---|
| Learn | `learnPanelsOpened.length === learn.length` |
| Practice | `practiceSteps.length === practice.steps.length` |
| Assess | `assessScore >= 0.7` **AND** `reflectionMarked === true` (4 of 5 MC correct passes) |
| Apply | User clicks "I've Applied This" (judgment-based, no quiz) |

> **Resolved inconsistency (Assess):** the original plan said both "all MC answered correctly" and
> "score ≥ 70%". With only 2 MC questions, 70% already forces 2/2, so the two rules collapse and the
> threshold is meaningless. **Decision (confirmed):** **5 MC questions per task** with the `>= 0.7`
> threshold — 4 of 5 correct passes; retries allowed. The schema in §6.2 reflects this.

**Derived status:**
- Task **Complete** when `sectionsComplete` contains all four section names.
- Task **In Progress** when `sectionsComplete` contains at least one but not all.
- Task **Not Started** when `sectionsComplete` is empty.
- Phase progress % = complete tasks in phase ÷ total tasks in phase × 100.
- Global progress % = all complete tasks ÷ 76 × 100.

**Phase lock chain (sidebar + home cards):** Essentials and Phase 1 are always accessible. Phase *N*
(2–8) is "locked" when Phase *N−1* is < 100% complete. Locked = visually dimmed with a lock icon, but
still navigable (advisory, not enforced). Essentials does not gate Phase 1.

---

## 8. Shared Logic — Module Contracts

Each engine's public API is fixed here so pages and engines can be built in parallel.

**`progress.js` → `window.Progress`** (no dependencies):
- `getTaskState(phaseId, taskId) → stateObject` (fresh default if absent)
- `setTaskState(phaseId, taskId, patch) → stateObject` (shallow-merges patch, persists, returns new state)
- `getPhaseProgress(phaseId, taskIds) → { completed, total, percent }`
- `getGlobalProgress(allPhasesMap) → { completed, total, percent }`
- `getCardStatus(stateObject) → "not-started" | "in-progress" | "complete"`
- `resetAllProgress()` — removes every `localStorage` key starting with `expedition_`

**`nav.js` → `window.Nav`** (depends on `Progress`):
- `Nav.init({ activePage, allPhasesMap })` — injects the sidebar into `#sidebar`, draws the global
  progress bar, marks the active link, applies lock icons per §7.
- `Nav.updateProgressBar(allPhasesMap)` — recomputes and re-animates just the global bar; called by
  `task-engine.js` after a task completes so the sidebar stays current without a full re-init.

> **Resolved gap:** `Nav.updateProgressBar` was used by the task engine but never declared in the
> original nav.js spec. It is part of the public API.

**`phase-engine.js` → `window.PhaseEngine`** (depends on `Progress`):
- `PhaseEngine.render(phaseData)` — injects header + task-card grid into `#main-content`.

**`task-engine.js` → `window.TaskEngine`** (depends on `Progress` and `Nav`):
- `TaskEngine.render(taskData)` — injects the full four-section gated experience into `#main-content`.

**Page DOM contract.** Every page body contains exactly: `<div id="sidebar"></div>` and
`<main id="main-content"></main>`. Engines inject into `#main-content`; `nav.js` injects into `#sidebar`.

---

## 9. Sections, Phases, and All Tasks (authoritative list)

> This list defines the task set. Task IDs are the kebab-case slug of each title, `task-`-prefixed.

**Section 0: Onboarding Essentials** (9) — Meet the Team, Enroll Laptop, Setup 1Password, Setup Verify,
Access Outlook, Access Slack, Building Tour, Setup Passkey, i9 Forms.

**Phase 1: Basecamp** (8) — Understand the MaaS360 Team/Brand, BTS Role and Expectations, Team Schedule
and Cadences, Join Required Slack Channels, Schedule 15-min 1:1s, Explain BTS Role, Role Play,
Phase 1 Readiness Check.

**Phase 2: Acclimation** (13) — Access to KME, Access to ABM, Apple 101, Android 101, MaaS360 101,
Access to "M" Portals, Access to Demo Hierarchy, Sales Cloud Access, Support vs BTS, Salesloft Setup,
Explain UEM/MDM, Explain BYOD vs Corporate, Phase 2 Readiness Check.

**Phase 3: Ascent** (10) — Identity 100, Explain Supervised vs Unsupervised, Apple 200, Android 200,
Windows 100, User and Device Groups, WPP, Portal Scavenger Hunt, Compare Android Enrollment Types,
Phase 3 Readiness Check.

**Phase 4: High Camp** (11) — MTD 100, Teamviewer, Apple 300, Android 300, Practice Demos,
Troubleshooting 100, Shadow Demos, How to Run a POC, Identity 200, Mock Onboarding,
Phase 4 Readiness Check.

**Phase 5: Summit Push** (11) — API Awareness, Pipeline/Renewal Awareness, RFP Responses, Pre-checks,
Weekly Call, Role Play Demo, Practice Device Actions, Mock Onboarding, Mock POC 1, Lead Demo,
Phase 5 Readiness Check.

**Phase 6: Summit** (6) — *all Apply sections are LIVE SCENARIOS* — Role Play Demo, Mock Onboarding,
Mock POC 2, Lead Demo, Lead 2 Onboarding, Phase 6 Check.

**Phase 7: Expedition Lead** (5) — *LIVE SCENARIOS* — Mock POC 3, Complete 10 Onboarding Sessions Solo,
Sync with Sellers, Reverse Shadow All Calls, Phase 7 Check.

**Phase 8: Peak Certified** (3) — *LIVE SCENARIOS* — Review + Q&A, Reverse Shadow All Calls,
Go Live Readiness Check.

> Note: a few titles recur across phases (e.g. "Mock Onboarding", "Reverse Shadow All Calls"). That is
> fine — IDs are namespaced by `phaseId`, so `phase4/task-mock-onboarding.html` and
> `phase5/task-mock-onboarding.html` are distinct files.

---

## 10. Content Authoring Spec (per task)

Body text is written in plain, readable English — **not** raw IBM Docs copy. Each Learn panel teaches
one concept. All educational content must be traceable to <https://www.ibm.com/docs/en/maas360>;
include the source link as a comment in the data file beside the panel it informs.

**Provided descriptions — use verbatim** (these `description` strings must appear exactly as written):
- **Enroll Laptop:** "Enroll your corporate device into the MaaS360 portal to receive security policies and apps."
- **Setup Verify:** "Configure IBM Verify for multi-factor authentication to securely access corporate instances."
- **Understand the MaaS360 Team/Brand:** "MaaS360 is IBM's unified endpoint management (UEM) solution that helps organizations manage and secure smartphones, tablets, laptops, and IoT devices from a single portal."
- **Access to KME:** "KME stands for Knox Mobile Enrollment. It is Samsung's zero-touch enrollment solution for bulk-deploying corporate-owned Android devices."
- **Access to ABM:** "Apple Business Manager (ABM) is a portal for IT teams to automate device deployment, purchase apps, and distribute content. It integrates directly with MaaS360."
- **Identity 100:** "Learn how MaaS360 integrates with corporate directories like Active Directory and Azure AD to manage user authentication and access."
- **Explain Supervised vs Unsupervised:** "'Supervision' on iOS gives the organization deeper control over the device, preventing users from removing the MDM profile. Unsupervised is typically for BYOD."
- **MTD 100:** "Mobile Threat Defense (MTD) secures devices against network, device, app, and phishing attacks natively within the MaaS360 app."
- **API Awareness:** "Explore MaaS360 Web Services APIs to pull device data, trigger remote actions, and integrate with third-party tools like ServiceNow."

All other tasks get professional descriptions in the same voice.

**Per-task minimum content:** 2–4 Learn panels, 3–5 Practice steps, **5 MC questions + 1 reflection**
(per §7), 1 Apply scenario. Phases 1–5 use guided scenarios; Phases 6–8 use real-work scenarios with
`isRealScenario: true`.

**Learn-panel writing templates** (also reproduced as a comment block at the foot of each data file):
1. **Metaphor:** "Rewrite this IBM Docs paragraph as a 3-sentence analogy using everyday objects. Avoid all jargon. The reader is a new employee with no MDM experience."
2. **Bullet summary:** "Summarise this IBM Docs page in 5 bullet points a non-technical new hire can understand in under 90 seconds. Each bullet must start with a verb."
3. **Narrative walkthrough:** "Turn this IBM Docs step list into a second-person narrative ('You click…', 'You will see…'). Keep it under 150 words."
4. **Concept explainer:** "Explain [concept] as if to someone who has never used enterprise software. Use a relatable everyday analogy."
5. **Comparison table:** "Create a simple 2-column comparison table contrasting [A] vs [B] from this IBM Docs content. Use plain language."

---

## 11. Placeholder Policy

Anywhere real content is not yet available, render a `.placeholder-block` (grey background, yellow
dashed border, bold centred text). Use these exact label patterns:
- Video: `[PLACEHOLDER: Insert 'Apple 101' tutorial video here]`
- Portal link: `[PLACEHOLDER: Portal link — KME Console]`
- Walkthrough: `[PLACEHOLDER: Live portal walkthrough goes here]`
- Image/diagram: `[PLACEHOLDER: Insert diagram — BYOD vs Corporate flow]`

---

## 12. Visual Design

**Colour palette (CSS custom properties):**

**Theme: "Mountains & Stars"** — a deep night sky with a twinkling star field over snow-capped
mountain silhouettes, applied site-wide through `styles.css`.

| Variable | Value | Use |
|---|---|---|
| `--color-bg` | `#0a1130` | Page background (deep night sky) |
| `--color-bg-2` | `#060a1f` | Lower-sky gradient stop |
| `--color-sidebar` | `#0c1334` | Sidebar (navy, translucent) |
| `--color-accent-blue` | `#6aa0ff` | Interactive elements |
| `--color-trail-green` | `#34d399` | Progress / success |
| `--color-summit-gold` | `#fbbf24` | Completion badges + stars |
| `--star` | `#ffffff` | Star field |
| `--color-placeholder-bg` | `#1a2148` | Placeholder fill |
| `--color-placeholder-border` | `#facc15` (dashed) | Placeholder border |

**Background:** a fixed, two-layer CSS star field (twinkling) sits behind every page via `body::before`
and `body::after`. The home page adds a detailed SVG hero — gradient night sky, soft horizon glow,
a crescent moon, ~94 animated stars, and two snow-capped mountain ridges. Phase and task pages share
the same starry sky for a consistent feel without the heavy hero.

**Typography:** system sans-serif stack; headers slightly heavier; placeholder text visually distinct
(grey, dashed border, bold, centred).

**Animations (keyframes in `styles.css`):** `fadeInUp` (staggered card entrance), `popIn` (complete-button
activation), `unlockBounce` (tab unlocking), `particleBurst` (Apply celebration), `twinkle` (CSS star
field), and SVG `<animate>` opacity twinkles on the hero stars. All animation use must respect
`@media (prefers-reduced-motion: reduce)` and degrade to no motion.

**Sidebar (every page):** logo/title; "Expedition Progress" global bar; nav links (Home, Gear Room,
Essentials, Phase 1–8); lock icon on phase links per §7; highlighted active link; a "Reset Progress"
link pointing to `gear-room.html`.

**Tailwind decision (must confirm — see §0).** The original plan both forbade frameworks and loaded the
Tailwind Play CDN on every page. The Play CDN is a runtime dependency that fails offline, which breaks
the `file://` open-locally requirement. **Default for this build: do NOT use Tailwind.** `styles.css`
already defines every component class, so Tailwind is redundant. If the team wants Tailwind utilities,
vendor a prebuilt stylesheet locally rather than using the CDN.

---

## 13. Sub-Tasks

Ordered so each builds on the previous. Each carries explicit acceptance criteria.

---

### Sub-Task 1 — `styles.css` + HTML layout template

**Intent.** Create the shared stylesheet and a documented reference layout every page follows.

**Build.**
1. Create `assets/css/styles.css`.
2. Define CSS custom properties for the full §12 palette.
3. Base layout: `body` (flex row), `#sidebar` (fixed left, full height), `#main-content` (fills
   remaining width, scrollable).
4. Sidebar styles: logo block, nav list, link hover/active states, progress bar.
5. Card styles: `.task-card`, `.phase-card`, `.card-status-chip` (not-started / in-progress / complete).
6. Tab bar: `.tab-bar`, `.tab` (locked / active / complete states).
7. `.placeholder-block` (grey bg, yellow dashed border, bold centred text).
8. Buttons: `.btn-primary`, `.btn-complete` (disabled + active), `.btn-live-scenario`.
9. Accordion: `.accordion-panel`, `.accordion-body` (collapsed/expanded transition).
10. Keyframes: `fadeInUp`, `popIn`, `unlockBounce`, `particleBurst`; wrap in `prefers-reduced-motion`.
11. Top-of-file comment block showing the canonical `<head>` includes and `<body>` structure
    (`#sidebar` + `#main-content`) every page must follow.

**Acceptance.** No page-specific selectors. Focus-visible styles exist for all interactive classes.
A scratch HTML file using only these classes renders the intended sidebar/main layout with no JS.

**Status** — [ ] pending

---

### Sub-Task 2 — `progress.js` (state management)

**Intent.** The only module that touches `localStorage`.

**Build.** Implement the full `window.Progress` API in §8, the state shape and key in §7, including
`getCardStatus` and `resetAllProgress`. `getTaskState` returns a fresh default (deep copy, not a shared
reference) when nothing is stored. `setTaskState` shallow-merges and returns the new state.

**Acceptance.** Round-trip test in console: set, get, compute phase/global progress, reset to zero.
No other file reads or writes `localStorage` directly.

**Status** — [ ] pending

---

### Sub-Task 3 — `nav.js` (sidebar + progress bar + locks)

**Intent.** Inject an identical sidebar everywhere; keep progress and locks current.

**Build.** Implement `Nav.init({ activePage, allPhasesMap })` and `Nav.updateProgressBar(allPhasesMap)`
per §8. Active link from `activePage` only (§5). Lock icons via §7's chain (Essentials + Phase 1 never
locked). Animate the global bar to the correct percentage on load.

**Acceptance.** Given a stubbed `allPhasesMap`, the sidebar injects into `#sidebar`, the correct link is
active on each page type, and locks reflect prior-phase completion. Calling `updateProgressBar` after a
state change moves the bar without re-injecting the sidebar.

**Status** — [ ] pending

---

### Sub-Task 4 — `phase-engine.js` (phase page renderer)

**Intent.** Render any phase page from its data object.

**Build.** Implement `PhaseEngine.render(phaseData)` injecting into `#main-content`: breadcrumb
("← Back to Trailhead" → `index.html`), phase title, subtitle (elevation objective), phase progress bar
(`Progress.getPhaseProgress`), and a CSS grid of task cards. Each card shows title, a ≤120-char excerpt
of `description`, and a status chip from `Progress.getCardStatus`. Cards link to `task.url`. Staggered
`fadeInUp` via per-index `animation-delay`.

**Acceptance.** Rendering `PHASE1_DATA` produces 8 cards with correct statuses and working links; the
phase bar matches stored completion.

**Status** — [ ] pending

---

### Sub-Task 5 — `task-engine.js` (task renderer + gate logic)

**Intent.** The full four-section gated experience. Most complex file.

**Build.** Implement `TaskEngine.render(taskData)` into `#main-content`: breadcrumb (→ `../<phaseId>.html`),
task title, a four-tab bar reflecting lock/complete state from `localStorage`, and the four section views.

- `renderLearn` — accordion from `taskData.learn`; opening a panel adds its `id` to `learnPanelsOpened`;
  when all opened, "Mark Learn Complete" activates (`popIn`); completing adds `"learn"` to
  `sectionsComplete` and unlocks Practice (`unlockBounce`).
- `renderPractice` — `[PLACEHOLDER]` walkthrough box + numbered checklist from `practice.steps`; each
  check stores its index; all checked → "Mark Practice Complete"; completing unlocks Assess.
- `renderAssess` — render `type:"mc"` questions (4 radios each) with per-question "Submit Answer"
  feedback (green correct / red with correct answer shown; retries allowed). After all MC answered,
  compute `assessScore` (fraction over the 5 MC) and store it; show the `type:"text"` reflection textarea and an
  "I understood this" checkbox (`reflectionMarked`). When `assessScore >= 0.7` AND `reflectionMarked`,
  "Mark Assess Complete" activates; completing unlocks Apply.
- `renderApply` — scenario text; if `apply.isRealScenario`, show a red "🔴 LIVE SCENARIO" badge above it;
  render any `[PLACEHOLDER]` items as placeholder blocks; "I've Applied This" triggers `particleBurst`,
  adds `"apply"` to `sectionsComplete`, persists final state, then calls `Nav.updateProgressBar`.
- `switchTab`, per-event handlers (`handleLearnPanelOpen`, `handlePracticeStepCheck`, `handleAssessSubmit`,
  `handleApplyComplete`) that update state and re-render only the affected component.
- `triggerParticleBurst` builds and cleans up temporary confetti DOM nodes.

All listeners attached via `addEventListener` (no inline `onclick`). Tabs and panels keyboard-operable.

**Acceptance.** A full run on one task: open all panels → complete Learn → check all steps → complete
Practice → pass quiz (≥0.7) + mark reflection → complete Assess → Apply → task shows Complete and the
sidebar global bar advances. State survives reload.

**Status** — [ ] pending

---

### Sub-Task 6 — Data files (9)

**Intent.** All content, one global per file (§6).

**Build.** Create `essentials-data.js` (9 tasks), `phase1-data.js` (8), `phase2-data.js` (13),
`phase3-data.js` (10), `phase4-data.js` (11), `phase5-data.js` (11), `phase6-data.js` (6),
`phase7-data.js` (5), `phase8-data.js` (3). Each task: title, verbatim/voice description, exact `url`
(§5), 2–4 Learn panels, 3–5 Practice steps, **5 MC + 1 reflection**, 1 Apply scenario. Phases 6–8 set
`isRealScenario: true` on every task. Add IBM Docs source-link comments and the §10 template comment block.

**Acceptance.** Each file's task count matches §2; every `id` is unique within its phase; every `url`
matches the planned filename; verbatim descriptions in §10 appear exactly.

**Status** — [ ] pending

---

### Sub-Task 7 — Phase pages (9 HTML files)

**Intent.** Thin shells driven by `phase-engine.js`.

**Build.** Create `essentials.html` and `phase1.html`–`phase8.html`. Each includes `styles.css`,
`progress.js`, its data file, `nav.js`, `phase-engine.js` (in that order — §4), a `#sidebar` and
`#main-content`, and an inline script calling `Nav.init({ activePage: "<phaseId>", allPhasesMap })`
then `PhaseEngine.render(<PHASE_DATA>)`.

**Acceptance.** All 9 open with the correct task grid, correct active nav link, and a phase bar that
matches stored state; root-level asset paths resolve.

**Status** — [ ] pending

---

### Sub-Task 8 — Task pages (76 HTML files)

**Intent.** Thin shells driven by `task-engine.js`.

**Build.** Create `essentials/` (9 files) and `phase1/`–`phase8/` (8/13/10/11/11/6/5/3 files). Each
includes `../assets/css/styles.css`, `../assets/js/progress.js`, the matching `../assets/data/<phase>-data.js`,
`../assets/js/nav.js`, `../assets/js/task-engine.js`; has `#sidebar` + `#main-content`; and an inline
script that selects its task via `<PHASE_DATA>.tasks.find(t => t.id === "<taskId>")`, calls
`Nav.init({ activePage: "<phaseId>", allPhasesMap })`, then `TaskEngine.render(task)`.

**Acceptance.** All 76 open and render four working sections; `../assets/` paths resolve; each file's
path equals the `url` in its data entry.

**Status** — [ ] pending

---

### Sub-Task 9 — Home page `index.html`

**Intent.** The mountain-path dashboard (with the standard sidebar).

**Build.** Include `styles.css`, `progress.js`, `nav.js`; `#sidebar` + `#main-content`. In
`#main-content`: a layered CSS/SVG mountain background and 9 trail-marker cards along a winding path
from lower-left (Essentials) to upper-right (Phase 8). Each card shows phase icon, title, short
subtitle, and completion %; complete phases show a gold star/checkmark; locked phases dim with a lock
(§7). Staggered `fadeInUp`. Cards link to the phase pages. Call `Nav.init({ activePage: "home", allPhasesMap })`.

**Acceptance.** Background and 9 cards render; percentages and locks reflect `localStorage`; each card
navigates to the right phase page.

**Status** — [ ] pending

---

### Sub-Task 10 — `gear-room.html`

**Intent.** Resource hub + reset control.

**Build.** Standard includes + sidebar. A card grid grouped into IBM Documentation, Portals & Access,
Productivity Tools, Training Resources. Real links open in a new tab; unknown ones use `.placeholder-block`.
A "Reset All Progress" button with a `confirm()` guard that calls `Progress.resetAllProgress()` then
reloads. Call `Nav.init({ activePage: "gear-room", allPhasesMap })`.

**Resource list** (`*` = placeholder): IBM MaaS360 Docs → <https://www.ibm.com/docs/en/maas360>;
KME Portal *; ABM Portal *; 1Password *; Slack Workspace *; Outlook *; Demo Hierarchy Portal *;
Sales Cloud *; Salesloft *; MaaS360 "M" Portals *.

**Acceptance.** Real link opens in a new tab; placeholders styled consistently; reset clears all
`expedition_*` keys after confirmation and the home page then shows every card at 0%.

**Status** — [ ] pending

---

### Sub-Task 11 — Final QA & cross-page verification

**Intent.** Systematic check pass, not a feature build. With 87 files, link integrity and asset paths
are the top failure modes.

**Checks.**
1. Open `index.html`; mountain background + 9 cards render; zero console errors.
2. Open each of the 9 phase pages; correct task grid and counts (§2); zero console errors.
3. Open at least one task per phase; all four tabs render; gates behave per §7.
4. Complete one full task; phase and global progress update; sidebar bar moves.
5. Reload; state persists from `localStorage`.
6. Bring a phase to 100%; confirm the next phase's lock clears in sidebar and on home.
7. "Reset All Progress" clears state; home shows all cards at 0%.
8. Every sidebar link works from each page type (home, phase, task, gear-room) — verify `../` depth.
9. All `.placeholder-block` items render consistently.
10. No broken CSS/JS/data includes anywhere (check the Network tab for 404s on a served copy).
11. Keyboard-only pass on one task page (tabs, accordion, quiz, buttons) and reduced-motion check.

**Suggested automation.** A small Node/script (or the browser console) can crawl every `url` in the 9
data files and assert the file exists and matches `<phaseId>/<taskId>.html`, catching path drift before
manual QA.

**Status** — [ ] pending

---

## 14. Key Decisions Summary

| Decision | Choice | Reason |
|---|---|---|
| File structure | One HTML file per page (87 files) | Avoids single-file complexity; easy to extend |
| Content storage | Per-phase data JS files | Section owners can edit independently |
| Shared logic | 4 JS files (progress, nav, phase-engine, task-engine) | One change updates all pages |
| Section navigation | Linear gating (§7) | Enforces learning sequence |
| Learn unlock | All accordion panels opened | Encourages reading, not scrolling |
| Practice unlock | All checklist steps confirmed | Self-paced honour system |
| Assess unlock | `assessScore ≥ 0.7` (5 MC, 4/5 to pass) + reflection marked | Real threshold + reflective component |
| Apply unlock | Self-declared "I've Applied This" | Judgment-based for real-world tasks |
| `assessScore` units | Fraction 0–1 (display ×100) | Removes percent/fraction ambiguity |
| Progress persistence | `localStorage` only | No backend for the prototype |
| Practice UI | Iframe placeholder + checklist | Works now; real embeds replace later |
| Phases 6–8 Apply | `isRealScenario: true` (LIVE SCENARIO) | Signals shift from simulation to real work |
| Tailwind | Not used (confirmed) | Conflicts with "no framework" + offline open; `styles.css` suffices |
| Deployment | Static files, no build step | Drop on any host or open locally |

---

## 15. Change Log vs. Original Plan

- **Reconciled page/task counts:** 76 task pages and **87** total HTML files (was "~55 task pages /
  ~65 total", which did not match the task lists).
- **Resolved Assess gating:** standardised on 5 MC questions + `≥ 0.7` threshold (4/5 to pass); removed
  the contradictory "all correct" vs "70% with 2 questions" pairing.
- **Defined `assessScore` units** as a fraction in [0,1].
- **Added `Nav.updateProgressBar` to the nav.js contract** (was used but never declared).
- **Single active-link mechanism** (`activePage`), dropping the duplicate `data-page` approach.
- **Added canonical schemas, ID/path rules, and module contracts** so the 87 files link correctly.
- **Clarified "Peak Certified"** as Phase 8 completion, and "9 phase-level units" vs "8 numbered phases".
- **Flagged the Tailwind/offline conflict** with a default decision and an alternative.
- **Added accessibility + reduced-motion requirements** and a data-file link-integrity check.
