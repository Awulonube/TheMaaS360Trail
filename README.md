<p align="center">
  <img src="assets/img/banner.svg" alt="MaaS360 Expedition — a gamified onboarding trail for MaaS360 Brand Technical Specialists" width="100%">
</p>

<p align="center">
  <a href="https://awulonube.github.io/TheMaaS360Trail/"><img alt="Live site" src="https://img.shields.io/badge/live-GitHub%20Pages-2c5fb8?style=flat-square"></a>
  <img alt="Phases" src="https://img.shields.io/badge/phases-9-fbbf24?style=flat-square">
  <img alt="Tasks" src="https://img.shields.io/badge/tasks-76-34d399?style=flat-square">
  <img alt="Build" src="https://img.shields.io/badge/build-none%20required-6aa0ff?style=flat-square">
  <img alt="Dependencies" src="https://img.shields.io/badge/npm%20dependencies-0-9aa6d4?style=flat-square">
</p>

<p align="center"><b><a href="https://awulonube.github.io/TheMaaS360Trail/">Open the site →</a></b></p>

---

New hires climb a mountain instead of working through a checklist. Nine phases,
76 task cards, each one structured as **Learn → Practice → Assess → Apply**.
Phases unlock in order, progress follows the person across devices, and managers
steer the whole thing — schedules, reminders, even the training content itself —
from the browser, without touching code.

## Highlights

|  | |
|---|---|
| 🏔️ **A trail, not a checklist** | Nine phases from Basecamp to Peak Certified, each gated behind the last, with an illustrated poster and progress markers. |
| 📖 **Four-part tasks** | Every card teaches, then asks you to do it, then quizzes you (70% to pass, unlimited retakes), then applies it to a real scenario. |
| ☁️ **Progress that follows you** | Sign in once; task state, phase timings and completions live in the cloud, not in one browser. |
| 📊 **Manager dashboard** | Team progress at a glance, per-person schedules with real date pickers, per-phase unlocking, and an audit log of every email sent. |
| ✏️ **Edit without code** | Managers rewrite text, add Learn cards, change quiz answers and paste video links straight from the task page. Changes go live for everyone instantly. |
| ⏰ **Reminders that actually fire** | A cloud scheduler sends midweek nudges, overdue alerts and completion notices on a configurable schedule — whether or not anyone has the site open. |

## How it fits together

```
   GitHub repo ──push──► GitHub Pages ──serves──► Browsers
   (source of truth)      (static site)               │
                                                      │ sign-in · progress · edits
                                                      ▼
                                              Supabase (cloud)
                                              ├── Auth
                                              ├── Postgres
                                              └── alert-scheduler ──► SMTP ──► inboxes
                                                  (runs every 5 min)
```

Two halves, deliberately independent. The site is **plain HTML, CSS and
JavaScript** — no framework, no build step, no npm install. Everything that
changes lives in one Supabase project. Either half can be replaced without
touching the other.

## Quick start

**Run it locally** — double-click `Start Website.command` (macOS), or:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

**Publish a change:**

```bash
git add -A && git commit -m "what changed"
git push                        # GitHub Pages redeploys in ~1 minute
```

**Connect the cloud** — paste your Supabase URL and anon key into
`assets/js/cloud-config.js`, then follow [`supabase/SETUP-GUIDE.md`](supabase/SETUP-GUIDE.md).
Without it the site still runs; progress just stays in the browser.

## Editing the content

Three doors, sized to who's walking through them:

| Layer | Who | What | Where |
|---|---|---|---|
| **1. Browser** | Managers | Text, Learn cards, practice steps, quizzes, embed links | **✏️ Edit this task** on any task page |
| **2. Markdown** | Maintainer | New tasks, reordering, bulk edits | `content/*.md` → `node content/tools/build.js` |
| **3. Code** | Maintainer | Behaviour: engines, sync, dashboard | `assets/js/*.js` |

Layer 1 overrides layer 2 per task, and **Revert to built-in** undoes it.
Full format reference: [`content/README.md`](content/README.md).

## Documentation

| Document | For |
|---|---|
| [`MaaS360-Expedition-Guide-Employees.pdf`](MaaS360-Expedition-Guide-Employees.pdf) | Hand to a new hire on day one |
| [`MaaS360-Expedition-Guide-Managers.pdf`](MaaS360-Expedition-Guide-Managers.pdf) | Hand to a manager |
| [`MAINTENANCE.md`](MAINTENANCE.md) | Whoever runs the site — architecture, operations, troubleshooting |
| [`MAINTENANCE-DIAGRAMS.pdf`](MAINTENANCE-DIAGRAMS.pdf) | The same, on five diagrams |
| [`content/README.md`](content/README.md) | The content authoring format |
| [`supabase/SETUP-GUIDE.md`](supabase/SETUP-GUIDE.md) | Standing up the cloud half from scratch |

## Repository layout

```
index.html  login.html  manager.html  setup.html  gear-room.html
phase1–8.html · essentials.html          Phase overview pages
phaseN/ · essentials/                    76 task pages
assets/
  css/styles.css                         All styling, CSS variables at the top
  js/                                    Engines, cloud sync, editor, navigation
  data/*-data.js                         GENERATED — edit content/, not these
  img/poster-*.svg                       Phase posters
content/
  *.md                                   Source of truth for all task content
  tools/                                 Build, export and PDF generators
supabase/
  schema.sql · content-overrides.sql     Database setup (re-run-safe)
  migrate-unlock.sql                     One-off migration
  functions/alert-scheduler/             The email scheduler
```

## Design notes

- **No build step, on purpose.** Any text editor, any static host, and nothing
  to re-learn in three years. HTML from 2010 still renders; a 2026 framework
  might not.
- **Generated files are marked as such.** `assets/data/*-data.js` is compiled
  from `content/*.md`; the build refuses to write a phase that parses to zero
  tasks and prints a warning for anything it didn't understand.
- **Security lives in the database.** The anon key in `cloud-config.js` is meant
  to be public — row-level security decides who sees what. Employees read only
  their own rows; managers see everyone.
- **One external dependency**, the Supabase JS client from a CDN. It can be
  vendored into the repo if a network policy ever blocks it.

---

<p align="center"><sub>Built for the IBM MaaS360 BTS team · content sourced from
<a href="https://www.ibm.com/docs/en/maas360">IBM MaaS360 documentation</a></sub></p>
