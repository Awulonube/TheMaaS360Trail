# Content — edit the site here

Every task card in the expedition site is written in these files. Edit the
Markdown, then ask Claude to **"rebuild the site from content"** (or run the
build command yourself). Nothing else needs touching.

| File | What it holds |
|---|---|
| `essentials.md` | Section 0: Onboarding Essentials — 9 tasks |
| `phase1.md` … `phase8.md` | One file per phase |
| `tools/` | The export/build scripts. You never need to edit these. |

**76 tasks · 164 learn panels · 457 quiz questions**

---

## The one command

```
node content/tools/build.js
```

Run from the project folder. It reads all nine `.md` files and regenerates
`assets/data/*-data.js` plus `phases-map.js`. To validate without writing
anything:

```
node content/tools/build.js --check
```

The build refuses to overwrite a phase that parses to zero tasks, and prints
a warning for anything it didn't understand — so a typo shows up as a message
rather than a silently broken page.

---

## File anatomy

### Phase header (top of file, once)

```markdown
# Phase 1: Basecamp

- id: phase1
- icon: 🏕️
- subtitle: Meet the team, learn the BTS role...
```

`id` must not change — the site's navigation and progress tracking key off it.

### A task card

Tasks are separated by `---`.

```markdown
---

## Team Schedule and Cadences

- id: task-team-schedule
- url: phase1/task-team-schedule.html
- status: done
- description: Learn to check teammates' availability...
```

- **`id`** — must stay stable. Changing it resets that task's saved progress
  for anyone already using the site.
- **`url`** — the matching HTML file. If you add a brand-new task, tell Claude
  so the page file gets created too.
- **`status`** — `needs-review` or `done`. This is a note to yourself only; it
  doesn't change the site. Tasks still carrying auto-generated filler are
  marked `needs-review`.
- **`description`** — the subtitle under the task's heading, and the preview
  text on the phase card grid. One or two sentences.

### Learn panels

Each `####` becomes one expandable panel. The body is HTML, so you can use
`<p>`, `<b>`, `<em>`, `<ul><li>`, and `<a href="...">`. A body may span as many
lines as you like.

```markdown
### Learn

#### What this covers

<p>As a BTS engineer you coordinate constantly...</p>

#### Checking teammates' schedules in Outlook

<p>The core tool is the <b>Scheduling Assistant</b>...</p>
<p>Two habits worth building now...</p>
```

Two to five panels per task works well. Keep each one to something readable
in under a minute.

### Practice steps

A plain bullet list. Each becomes a checkbox the hire ticks off.

```markdown
### Practice

- In Outlook, create a test meeting and open the Scheduling Assistant.
- In Teams, check the presence status of three teammates.
```

Optionally add `- iframe: false` as the first line to hide the embedded-portal
placeholder for that task.

### Quiz

Numbered questions. Multiple choice uses checkboxes with `[x]` marking the
correct answer. Prefix a question with `(text)` to make it a free-response
reflection instead (not auto-graded).

```markdown
### Quiz

1. A Salesloft cadence is…
   - [x] A timed sequence of outreach steps that people are added to
   - [ ] A weekly team meeting
   - [ ] A shared team calendar

2. (text) In your own words: how do Outlook and Salesloft each shape your week?
```

Rules the build enforces:

- Exactly one `[x]` per multiple-choice question. Zero triggers a warning and
  defaults to the first option; more than one uses the first and warns.
- Options can be any number, though four reads best.
- Question numbering is cosmetic — the build renumbers automatically, so you
  can insert a question without renumbering the rest.
- The pass mark is 70% of the auto-graded questions.

### Apply

The closing scenario. `type: guided` is a practice exercise; `type: real`
marks it as real customer work (the site shows a "live" badge).

```markdown
### Apply

- type: guided

An AE tells you a prospect wants a technical deep-dive next week...
```

---

## Common edits

**Reword a quiz question** — find it under `### Quiz`, edit the text, rebuild.

**Add a quiz question** — add it anywhere in the list with any number; the
build renumbers.

**Add a learn panel** — add a new `#### Title` block with an HTML body.

**Reorder tasks in a phase** — move the whole `## Task` block (from its `---`
separator to just before the next one). The phase page follows file order.

**Mark unfinished work** — leave an HTML comment. These render nowhere but
stay visible to you in the file:

```markdown
<!-- PLACEHOLDER: confirm the actual portal URL with mentor -->
```

**Delete a task** — remove its whole block. Also delete the matching HTML file
in the phase folder, or ask Claude to.

---

## Live overrides vs these files

Managers can also edit task content directly on the website (the
"✏️ Edit this task" button on task pages, manager accounts only). Those edits
save to the cloud database and **take precedence** over what's built from
these Markdown files — per task, per section. A task edited in the browser
shows the browser version until a manager clicks "Revert to built-in" on it.

Rule of thumb: text tweaks, learn cards, practice steps, embed links, and
quiz edits (questions, options, correct answers) → do it in the browser.
New tasks, reordering tasks, or bulk edits → do it here and rebuild.

## Cautions

- **Don't change `id` values** unless you intend to reset saved progress.
- **Keep the section headings exactly** as `### Learn`, `### Practice`,
  `### Quiz`, `### Apply`. The parser matches on these names.
- **`assets/data/*-data.js` is generated.** Any hand-edit there is erased on
  the next build. Edit the Markdown instead.
- **Re-running `export.js` overwrites these Markdown files** from the current
  site data. It was used once to seed them; you shouldn't need it again, and
  it refuses to overwrite without `--force`.

---

## Notes for future content

All 76 tasks now carry real content (`status: done`). The depth ladder runs
101 (overview) → 201 (process) → 301 (technical depth: APNs certificate
lifecycle, DEP tokens, zero-touch internals, etc.).

Team-specific details still marked `PLACEHOLDER` in the files (search for the
word). The main open questions needing team/manager input:

- **WPP** (`phase3.md`) — written assuming Windows Provisioning Package;
  confirm what the team means by it
- Whether BTS engineers run their own Salesloft cadences or only support
  AE-owned ones (`phase1.md`, `phase2.md`)
- The team's recurring meetings, required Slack channels, and 1:1 list
- The "M portals" list — environments, URLs, access request paths
- Demo hierarchy structure and shared-environment rules
- Whether the demo account has TeamViewer integration enabled
- Which conditional-access integrations the team actively demos
- Phase 6 expected demo count; Phase 7 session assignment/tracking;
  reverse-shadow call-type list
- Real portal URLs throughout
