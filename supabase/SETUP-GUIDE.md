# Cloud Setup Guide — logins, synced progress, scheduled emails

This walks you from the current site to the full system: individual logins,
progress stored in a real database, a manager dashboard, and email alerts
that fire on schedules you control — even when nobody has the site open.

**Time required: about 30–40 minutes.** Nothing here needs a credit card;
Supabase's free tier covers a team this size comfortably.

---

## How the pieces fit

```
 Browser (each user)                    Supabase (cloud)
 ┌──────────────────┐    login/sync    ┌─────────────────────────┐
 │  Expedition site │ ←──────────────→ │ Auth (accounts)         │
 │  login.html      │                  │ Postgres database:      │
 │  manager.html    │                  │  profiles, progress,    │
 └──────────────────┘                  │  timelines, alert rules │
                                       │ Edge Function (cron):   │
                                       │  alert-scheduler ───────┼──→ SMTP → email
                                       └─────────────────────────┘
```

- **Progress**: each signed-in user's task state syncs to the database.
  The browser still keeps a local copy, so pages stay fast and the site
  still works logged-out (local-only mode).
- **Timelines**: each employee has per-phase start dates, durations, and
  midweek points — editable by managers in the dashboard.
- **Alerts**: a scheduler runs every 5 minutes on Supabase's servers, reads
  your alert rules, and sends email via your SMTP account. Because it runs
  server-side, alerts are **schedule-driven, not visit-driven**.

---

## Step 1 — Create the Supabase project (5 min)

1. Go to [supabase.com](https://supabase.com) → Sign up (GitHub or email).
2. **New project** → name it `maas360-expedition`, choose a region near you,
   set a strong database password (save it in 1Password).
3. Wait ~2 minutes for provisioning.

## Step 2 — Run the database schema (5 min)

1. In the project: **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this folder, paste the whole file, **Run**.
3. You should see "Success. No rows returned". This created the five tables,
   security policies, and four starter alert rules (midweek Wednesday 9am,
   weekday overdue checks, completion notices, Monday 8:30 digest).

## Step 3 — Connect the website (3 min)

1. In Supabase: **Project Settings → API**. Copy two values:
   - Project URL (like `https://abcdxyz.supabase.co`)
   - `anon` `public` key (the long one)
2. Open `assets/js/cloud-config.js` in this project and paste them in.
3. Done. The site now shows **🔑 Sign in** at the bottom of the sidebar.

## Step 4 — Create your account and make it manager (3 min)

1. Open the site → Sign in → **Create account** tab → sign up with your email.
   (If Supabase email confirmation is on, check your inbox first.)
2. Back in the Supabase **SQL Editor**, run (with your email):

```sql
update public.profiles set role = 'manager' where email = 'ebunolowola@gmail.com';
```

3. Reload the site — the sidebar now shows **📊 Manager Dashboard**.

New hires just use the Create account tab; they appear in your dashboard
automatically as employees.

## Step 5 — SMTP settings for outgoing email (5 min)

The scheduler needs an email account to send from. Any SMTP works:

| Provider | Host | Port | Notes |
|---|---|---|---|
| Gmail | smtp.gmail.com | 465 | Needs an [App Password](https://myaccount.google.com/apppasswords) (2FA required) |
| Outlook/M365 | smtp.office365.com | 587 | Use your full email as username |
| Corporate SMTP | (ask IT) | 465/587 | Best option for IBM deployment |

In Supabase: **Edge Functions → Secrets** (or Project Settings → Edge Functions),
add:

```
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 465
SMTP_USER = you@gmail.com
SMTP_PASS = your-app-password
SMTP_FROM = MaaS360 Expedition <you@gmail.com>
```

Tip: add `DRY_RUN = true` at first — the scheduler will log what it *would*
send (visible in the dashboard's Recent emails panel) without sending.
Remove it when the log looks right.

## Step 6 — Deploy the scheduler function (10 min)

This needs the Supabase CLI once, on any machine:

```bash
# install CLI (macOS)
brew install supabase/tap/supabase

# log in and link to your project (project ref is in Project Settings → General)
supabase login
cd "MaaS360 Trail"
supabase link --project-ref YOUR_PROJECT_REF

# deploy
supabase functions deploy alert-scheduler
```

## Step 7 — Schedule it (3 min)

In Supabase: **Database → Extensions**: enable **pg_cron** and **pg_net**.
Then in SQL Editor, run (replace both placeholders — the service role key is
in Project Settings → API):

```sql
select cron.schedule(
  'expedition-alerts', '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/alert-scheduler',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
  );
  $$
);
```

The scheduler now runs every 5 minutes, forever, server-side.

## Step 8 — Verify (5 min)

1. Dashboard → enable a **custom** rule scheduled a few minutes from now,
   recipients `custom`, your email in extra emails. Wait for the tick.
2. Check **Recent emails** in the dashboard (and your inbox if DRY_RUN is off).
3. Have a test employee account complete a task; watch their bar move in
   the dashboard.

---

## Using the system day to day

**Employees** sign in once per browser; everything else is automatic. Their
progress follows them across devices.

**Managers** get, in the dashboard:

- **Team progress** — per-phase bars for every employee at a glance.
- **Timeline control** — expand any employee → set phase start dates, change
  the days allotted per phase (default 7), move the midweek point. This is
  what drives midweek/overdue emails per person.
- **Alert rules** — the schedule engine. Each rule has: on/off, days of week,
  time + timezone, recipients (managers / employees / both / custom emails),
  subject and body templates with `{{name}}`, `{{phase}}`, `{{percent}}`,
  `{{due}}`, `{{days_left}}`, and a repeat policy (once per phase vs every
  scheduled match). Add as many rules as you like — e.g. a Friday 4pm
  "week wrap" digest plus a Monday 9am overdue sweep.
- **Recent emails** — audit log of everything sent, with errors surfaced.

## Troubleshooting

- **No emails at all**: check Edge Function logs (Supabase → Edge Functions →
  alert-scheduler → Logs). SMTP auth errors appear there and in Recent emails.
- **Gmail rejects**: you need an App Password, not your normal password.
- **Corporate network blocks Supabase**: this is the known risk of the hosted
  choice — confirm `*.supabase.co` is reachable from work machines. If not,
  the same site code can be pointed at a self-hosted Supabase instance later.
- **Someone can't see the dashboard**: their profile role is `employee` —
  promote via the People & roles panel or SQL.
- **Old local progress**: a user's pre-login localStorage progress stays on
  that browser but doesn't auto-import. If someone needs theirs migrated,
  ask Claude — it's a small one-off script.

## Security notes

- The `anon` key in cloud-config.js is designed to be public; row-level
  security in the database is what protects data. Employees can only read
  and write their own rows; only managers can see everyone or touch alert
  rules. The service role key (Step 7) is the powerful one — it lives only
  in the cron job and Edge Function secrets, never in website code.
- Passwords are handled entirely by Supabase Auth (bcrypt, never visible
  to the site code).
