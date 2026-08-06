# MaaS360 Expedition — Maintainer's Guide

The one document to read before touching anything. Written for whoever runs
this site — today or three years from now with zero context.

---

## What this is

A gamified onboarding site for MaaS360 BTS new hires: 9 phases, 76 task
cards, each with Learn → Practice → Assess → Apply sections. Employees sign
in, their progress syncs to the cloud, managers watch and steer from a
dashboard, and email reminders fire on schedules — with or without anyone
having the site open.

## The architecture in one picture

```
  GitHub repo (source of truth, version history)
      │  git push
      ▼
  GitHub Pages  ──serves──►  Browsers (employees + managers)
      static HTML/JS/CSS          │
                                  │ sign-in, progress, edits
                                  ▼
                          Supabase (cloud)
                          ├─ Auth (accounts, passwords)
                          ├─ Postgres tables (see below)
                          └─ Edge Function "alert-scheduler"
                             runs every 5 min → SMTP → email
```

Two halves, deliberately separate:
- **The site** is pure static files. No build server, no framework, no
  npm dependencies. Any static host can serve it; any text editor can edit it.
- **The cloud** is one Supabase project holding accounts, progress,
  timelines, alert rules, content overrides, and the email scheduler.

Either half can be replaced without touching the other.

## The three editing layers (know which one you're in)

| Layer | Who uses it | What it's for | Where |
|---|---|---|---|
| **1. Browser editing** | Managers | Everyday content changes: reword text, add/remove Learn cards, practice steps, paste embed links | "✏️ Edit this task" on any task page |
| **2. Content files** | Maintainer (or Claude) | Structural work: quizzes, new tasks, bulk edits | `content/*.md` → `node content/tools/build.js` |
| **3. Code** | Maintainer (or Claude) | Behavior: engines, cloud sync, dashboard | `assets/js/*.js`, page HTML |

**Precedence:** browser edits (layer 1) are stored in the database and
override the built files (layer 2) per task. "Revert to built-in" in the
edit drawer removes the override. If a task looks different from its
`content/*.md` source, an override is why.

## File map

```
index.html                 Home ("Trailhead")
login.html                 Sign in / create account
manager.html               Manager dashboard (self-contained page)
setup.html                 "My Timeline" (per-user account + schedule)
gear-room.html             Links + reset progress
phase1..8.html, essentials.html      Phase overview pages
phaseN/*.html, essentials/*.html     Task pages (thin shells; content injected)
Start Website.command      Double-click local server (macOS)

assets/css/styles.css      ALL styling (one file, CSS variables at top)
assets/js/
  progress.js              Task/phase completion state (localStorage)
  profile.js               Local identity + phase timing state
  cloud-config.js          ← Supabase URL + anon key (the only config file)
  cloud.js                 Auth session + syncs local state ↔ database
  nav.js                   Sidebar, phase locking, hamburger
  phase-engine.js          Renders phase pages from data
  task-engine.js           Renders task pages (4-section experience)
  tracker.js               Phase clocks + in-app reminder banner
  content-editor.js        Override fetch/merge + manager edit drawer
assets/data/*-data.js      GENERATED — never hand-edit (build overwrites)
assets/img/poster-*.svg    Phase posters (generated; ask Claude to restyle)

content/*.md               Source of truth for task content (layer 2)
content/tools/             format.js (parser) · build.js · export.js
content/README.md          Content-format documentation

supabase/schema.sql            Main database schema (re-run-safe)
supabase/content-overrides.sql Content-override table (re-run-safe)
supabase/functions/alert-scheduler/index.ts   The email scheduler
supabase/SETUP-GUIDE.md        Cloud setup walk-through
```

## Routine operations

**Publish a change** (after editing files locally):
```bash
cd "MaaS360 Trail"
git add -A && git commit -m "describe the change"
git push
```
GitHub Pages redeploys automatically within a minute or two.

**Edit content properly:** edit `content/<phase>.md`, then
`node content/tools/build.js`, check it reports 0 warnings, then publish.

**See who changed what:** `git log --oneline` or the repo's History tab on
GitHub. Every published version is recoverable.

**Add a manager:** Manager Dashboard → People tab → set role to manager.
(First-ever manager: the SQL one-liner in supabase/SETUP-GUIDE.md Step 4.)

**Change alert timing/recipients/wording:** Dashboard → Alerts tab. No code.

**Adjust someone's schedule:** Dashboard → Team tab → Timeline.

## Annual / occasional maintenance

- **Supabase free-tier pause:** free projects pause after ~1 week of zero
  activity. Normal team usage prevents this; after a long quiet period,
  un-pause from the Supabase dashboard.
- **SMTP password rotation:** update the secret in Supabase → Edge
  Functions → Secrets. Nothing else changes.
- **Backups:** Supabase dashboard → Database → Backups (daily on free tier).
  For belt-and-braces, occasionally export tables to CSV from the Table
  Editor. The site content itself is fully safe in git.
- **The one CDN dependency:** pages load `supabase-js` from jsdelivr. If a
  future network policy blocks that CDN, download the file once into
  `assets/js/vendor/` and update the script tags — ask Claude.

## Troubleshooting quick table

| Symptom | Likely cause | Fix |
|---|---|---|
| "Could not find table … in schema cache" | A .sql file wasn't run | Run it in Supabase SQL Editor (both are re-run-safe) |
| Sign-in works but no ✏️ button | Role isn't manager, or not on a task page | People tab → role; button is task-pages-only |
| Emails stopped | Scheduler/cron/SMTP | Dashboard → Email log for errors; Supabase → Edge Functions → Logs |
| Site changes not visible | Browser cache or unpublished | Hard refresh (Cmd+Shift+R); did you `git push`? |
| A task ignores content/*.md edits | Browser override exists | Edit drawer → "Revert to built-in" |
| Weird behavior on `file://` URLs | Opened by double-clicking HTML | Use Start Website.command / the hosted URL |

## Handing this site to a successor

Give them: (1) this file, (2) access to the GitHub repo, (3) an owner/admin
invite to the Supabase project, and (4) the SMTP account credentials or a
replacement. Have them read `content/README.md` and
`supabase/SETUP-GUIDE.md` next. That's the entire bus factor.

A capable AI assistant (Claude) with this folder open can perform every
operation in this document — the codebase is deliberately plain JavaScript
with no build chain, and every generated artifact is reproducible from the
files in git.
