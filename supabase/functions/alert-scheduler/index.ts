// =====================================================================
// alert-scheduler — Supabase Edge Function (Deno)
// Runs on a cron schedule (every 5 minutes; see SETUP-GUIDE.md) and sends
// whatever the alert_rules table says is due. Fully server-side: emails go
// out whether or not anyone has the website open.
//
// Required secrets (Project Settings → Edge Functions → Secrets):
//   SMTP_HOST, SMTP_PORT (465 or 587), SMTP_USER, SMTP_PASS, SMTP_FROM
//   (SB_URL and SB_SERVICE_ROLE_KEY are provided automatically as
//    SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)
// Optional: DRY_RUN=true  -> log emails instead of sending.
// =====================================================================
import { createClient } from "npm:@supabase/supabase-js@2";
import { SMTPClient } from "npm:emailjs@4"; // lightweight SMTP client for Deno/npm

type Rule = {
  id: string; name: string; enabled: boolean; rule_type: string;
  schedule: { days?: number[]; hour?: number; minute?: number; tz?: string };
  recipients: string; extra_emails: string;
  subject_template: string; body_template: string;
  repeat_policy: string; last_run_at: string | null;
};

const PHASE_TITLES: Record<string, string> = {
  essentials: "Section 0: Onboarding Essentials", phase1: "Phase 1: Basecamp",
  phase2: "Phase 2: Acclimation", phase3: "Phase 3: Ascent", phase4: "Phase 4: High Camp",
  phase5: "Phase 5: Summit Push", phase6: "Phase 6: Summit",
  phase7: "Phase 7: Expedition Lead", phase8: "Phase 8: Peak Certified",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const DRY_RUN = (Deno.env.get("DRY_RUN") || "").toLowerCase() === "true";

function smtp(): SMTPClient {
  const port = Number(Deno.env.get("SMTP_PORT") || "465");
  return new SMTPClient({
    host: Deno.env.get("SMTP_HOST")!,
    port,
    user: Deno.env.get("SMTP_USER")!,
    password: Deno.env.get("SMTP_PASS")!,
    ssl: port === 465,
    tls: port !== 465,
  });
}

function render(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
}

// Is this schedule due in the current 5-minute tick (in the rule's timezone)?
function isDue(rule: Rule, now: Date): boolean {
  if (rule.rule_type === "phase_complete") return true; // event-style: checked every run
  const s = rule.schedule || {};
  const tz = s.tz || "UTC";
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, weekday: "short", hour: "numeric", minute: "numeric", hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(now).map(p => [p.type, p.value]));
  const dayIdx = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(parts.weekday);
  const hour = Number(parts.hour === "24" ? "0" : parts.hour);
  const minute = Number(parts.minute);
  const days = s.days && s.days.length ? s.days : [0,1,2,3,4,5,6];
  if (!days.includes(dayIdx)) return false;
  if (hour !== (s.hour ?? 9)) return false;
  if (Math.abs(minute - (s.minute ?? 0)) >= 5) return false; // 5-min tick window
  // De-dupe within the day
  if (rule.last_run_at) {
    const last = new Date(rule.last_run_at);
    if (now.getTime() - last.getTime() < 10 * 60 * 1000) return false;
  }
  return true;
}

async function send(to: string, subject: string, body: string, rule: Rule) {
  let status = "sent", error = "";
  if (DRY_RUN) {
    status = "dry-run";
  } else {
    try {
      await smtp().sendAsync({
        from: Deno.env.get("SMTP_FROM")!, to, subject, text: body,
      });
    } catch (e) {
      status = "error"; error = String(e).slice(0, 500);
    }
  }
  await supabase.from("email_log").insert({
    rule_id: rule.id, rule_name: rule.name, recipient: to, subject, status, error,
  });
  return status === "sent" || status === "dry-run";
}

function pct(state: Record<string, unknown> | null): boolean {
  const s = (state || {}) as { sectionsComplete?: string[] };
  return (s.sectionsComplete || []).length === 4;
}

Deno.serve(async (_req) => {
  const now = new Date();
  const results: string[] = [];

  const { data: rules, error: rulesErr } = await supabase
    .from("alert_rules").select("*").eq("enabled", true);
  if (rulesErr) return new Response("rules error: " + rulesErr.message, { status: 500 });

  const { data: profiles } = await supabase.from("profiles").select("*");
  const { data: timelines } = await supabase.from("phase_timeline").select("*");
  const { data: progress } = await supabase.from("task_progress").select("user_id,phase_id,task_id,state");

  const managers = (profiles || []).filter(p => p.role === "manager");
  const employees = (profiles || []).filter(p => p.role === "employee");

  // per-user per-phase completion counts
  const phaseDone: Record<string, Record<string, number>> = {};
  const phaseTotal: Record<string, Record<string, number>> = {};
  for (const row of progress || []) {
    phaseTotal[row.user_id] ??= {}; phaseDone[row.user_id] ??= {};
    phaseTotal[row.user_id][row.phase_id] = (phaseTotal[row.user_id][row.phase_id] || 0) + 1;
    if (pct(row.state)) phaseDone[row.user_id][row.phase_id] = (phaseDone[row.user_id][row.phase_id] || 0) + 1;
  }

  function recipientsFor(rule: Rule, emp: { email: string; manager_email: string } | null): string[] {
    const out = new Set<string>();
    const mgrs = () => {
      if (emp?.manager_email) out.add(emp.manager_email);
      else managers.forEach(m => out.add(m.email));
    };
    if (rule.recipients === "managers") mgrs();
    if (rule.recipients === "employees" && emp) out.add(emp.email);
    if (rule.recipients === "both") { if (emp) out.add(emp.email); mgrs(); }
    (rule.extra_emails || "").split(",").map(s => s.trim()).filter(Boolean).forEach(e => out.add(e));
    return [...out];
  }

  for (const rule of (rules || []) as Rule[]) {
    if (!isDue(rule, now)) continue;

    if (rule.rule_type === "phase_complete") {
      // any timeline rows completed but not notified
      for (const t of (timelines || []).filter(t => t.completed_at && !t.complete_notified)) {
        const emp = (profiles || []).find(p => p.id === t.user_id);
        if (!emp) continue;
        const vars = { name: emp.full_name || emp.email, phase: PHASE_TITLES[t.phase_id] || t.phase_id, percent: "100", due: "", days_left: "0" };
        for (const to of recipientsFor(rule, emp)) {
          await send(to, render(rule.subject_template, vars), render(rule.body_template, vars), rule);
        }
        await supabase.from("phase_timeline")
          .update({ complete_notified: true })
          .eq("user_id", t.user_id).eq("phase_id", t.phase_id);
        results.push(`complete:${emp.email}:${t.phase_id}`);
      }
    }

    if (rule.rule_type === "midway" || rule.rule_type === "overdue") {
      for (const t of (timelines || []).filter(t => t.started_at && !t.completed_at)) {
        const emp = (profiles || []).find(p => p.id === t.user_id);
        if (!emp) continue;
        const started = new Date(t.started_at).getTime();
        const dueAt = started + t.duration_days * 86400000;
        const midAt = started + t.midway_days * 86400000;
        const inWindow = rule.rule_type === "midway"
          ? (now.getTime() >= midAt && now.getTime() < dueAt)
          : (now.getTime() >= dueAt);
        if (!inWindow) continue;
        const stampField = rule.rule_type === "midway" ? "midway_notified_at" : "overdue_notified_at";
        if (rule.repeat_policy === "once_per_phase" && t[stampField]) continue;
        const done = phaseDone[t.user_id]?.[t.phase_id] || 0;
        const total = phaseTotal[t.user_id]?.[t.phase_id] || 0;
        const percent = total ? Math.round((done / total) * 100) : 0;
        const daysLeft = Math.max(0, Math.ceil((dueAt - now.getTime()) / 86400000));
        const vars = {
          name: emp.full_name || emp.email, phase: PHASE_TITLES[t.phase_id] || t.phase_id,
          percent: String(percent), due: new Date(dueAt).toDateString(), days_left: String(daysLeft),
        };
        for (const to of recipientsFor(rule, emp)) {
          await send(to, render(rule.subject_template, vars), render(rule.body_template, vars), rule);
        }
        await supabase.from("phase_timeline")
          .update({ [stampField]: now.toISOString() })
          .eq("user_id", t.user_id).eq("phase_id", t.phase_id);
        results.push(`${rule.rule_type}:${emp.email}:${t.phase_id}`);
      }
    }

    if (rule.rule_type === "digest") {
      const lines: string[] = ["MaaS360 Expedition — progress digest", ""];
      for (const emp of employees) {
        const parts: string[] = [];
        for (const pid of Object.keys(PHASE_TITLES)) {
          const total = phaseTotal[emp.id]?.[pid] || 0;
          if (!total) continue;
          const done = phaseDone[emp.id]?.[pid] || 0;
          parts.push(`${pid}: ${Math.round((done / total) * 100)}%`);
        }
        const t = (timelines || []).find(x => x.user_id === emp.id && x.started_at && !x.completed_at);
        const current = t ? ` | current: ${PHASE_TITLES[t.phase_id] || t.phase_id}` : "";
        lines.push(`• ${emp.full_name || emp.email}${current}${parts.length ? " | " + parts.join(", ") : " | no progress yet"}`);
      }
      if (employees.length === 0) lines.push("(no employees registered yet)");
      const subject = rule.subject_template || "Expedition progress digest";
      for (const to of recipientsFor(rule, null)) {
        await send(to, subject, lines.join("\n"), rule);
      }
      results.push("digest");
    }

    if (rule.rule_type === "custom") {
      const vars = { name: "", phase: "", percent: "", due: "", days_left: "" };
      for (const to of recipientsFor(rule, null)) {
        await send(to, render(rule.subject_template, vars), render(rule.body_template, vars), rule);
      }
      results.push("custom:" + rule.name);
    }

    await supabase.from("alert_rules").update({ last_run_at: now.toISOString() }).eq("id", rule.id);
  }

  return new Response(JSON.stringify({ ok: true, ran: results }), {
    headers: { "content-type": "application/json" },
  });
});
