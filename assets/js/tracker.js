/* =====================================================================
   tracker.js — the heartbeat. Runs on every page load (included site-wide).
   Responsibilities:
     1. Auto-start each phase's week the first time it becomes unlocked.
     2. Detect when a phase reaches 100% -> email the manager (once).
     3. Detect when a phase's midweek checkpoint is due -> email hire +
        manager (once), and surface an in-app reminder.
     4. Render a dismissible reminder banner for anything currently due.

   Emails are sent by the cloud scheduler (supabase/functions/alert-scheduler);
   this module only maintains local timing state and the in-app banner.
   Depends on: Progress, Nav, Profile, ALL_PHASES_MAP, optionally Cloud.
   ===================================================================== */
(function () {
  "use strict";

  var PHASE_TITLES = {
    essentials: "Section 0: Onboarding Essentials",
    phase1: "Phase 1: Basecamp",
    phase2: "Phase 2: Acclimation",
    phase3: "Phase 3: Ascent",
    phase4: "Phase 4: High Camp",
    phase5: "Phase 5: Summit Push",
    phase6: "Phase 6: Summit",
    phase7: "Phase 7: Expedition Lead",
    phase8: "Phase 8: Peak Certified"
  };

  function titleOf(id) { return PHASE_TITLES[id] || id; }

  function phasePercent(id, map) {
    var ids = map[id] || [];
    return Progress.getPhaseProgress(id, ids).percent;
  }

  // Returns list of reminder objects currently active (for banner + dashboard).
  function computeReminders(map) {
    var out = [];
    var order = Nav.PHASE_ORDER;
    for (var i = 0; i < order.length; i++) {
      var id = order[i];
      if (!map[id]) continue;
      var pct = phasePercent(id, map);
      var t = Profile.getTiming(id);
      if (!t.startedAt || pct === 100) continue; // not started, or already done
      var s = Profile.getSchedule(id);
      if (s.overdue) {
        out.push({ phaseId: id, type: "overdue", title: titleOf(id),
          text: titleOf(id) + " is past its 1-week target and still at " + pct + "%." });
      } else if (s.midweekDue) {
        out.push({ phaseId: id, type: "midweek", title: titleOf(id),
          text: "Midweek check-in for " + titleOf(id) + " — " + pct + "% done, " +
                (s.daysLeft > 0 ? s.daysLeft + " day" + (s.daysLeft === 1 ? "" : "s") + " left." : "week wrapping up.") });
      }
    }
    return out;
  }

  // The core pass: start phases, fire notifications. Safe to call repeatedly.
  function run(map) {
    map = map || window.ALL_PHASES_MAP || {};
    if (!window.Progress || !window.Nav || !window.Profile) return;

    // Signed-in users are always "configured" (identity comes from the account);
    // local-only mode still uses the Setup page's saved name/email.
    var configured = Profile.isConfigured() || !!(window.Cloud && Cloud.user);
    var order = Nav.PHASE_ORDER;

    for (var i = 0; i < order.length; i++) {
      var id = order[i];
      if (!map[id]) continue;

      // 1. Auto-start when unlocked (only once identity is set, so the
      //    clock reflects a real start rather than a stale first visit).
      var unlocked = !Nav.isPhaseLocked(id, map);
      var t = Profile.getTiming(id);
      if (configured && unlocked && !t.startedAt) {
        t = Profile.ensureStarted(id);
      }
      if (!t.startedAt) continue;

      var pct = phasePercent(id, map);

      // 2. Phase complete -> stamp completion (cloud scheduler emails the manager).
      if (pct === 100) {
        if (!t.completedAt) Profile.setTiming(id, { completedAt: new Date().toISOString() });
        continue; // done phases don't need midweek nudges
      }
    }
  }

  function dismissedKey() {
    // dismissals are per-day so a reminder re-appears the next day if still open
    return "exp_banner_dismissed_" + new Date().toISOString().slice(0, 10);
  }
  function isDismissed() {
    try { return localStorage.getItem(dismissedKey()) === "1"; } catch (e) { return false; }
  }
  function setDismissed() {
    try { localStorage.setItem(dismissedKey(), "1"); } catch (e) {}
  }

  function renderBanner(map) {
    if (isDismissed()) return;
    var reminders = computeReminders(map);
    if (!reminders.length) return;

    var wrap = document.createElement("div");
    wrap.className = "reminder-banner";
    var hasOverdue = reminders.some(function (r) { return r.type === "overdue"; });
    if (hasOverdue) wrap.classList.add("is-overdue");

    var items = reminders.map(function (r) {
      return '<li><span class="rb-dot ' + r.type + '"></span>' + r.text + '</li>';
    }).join("");

    wrap.innerHTML =
      '<div class="rb-inner">' +
      '<span class="rb-ic">' + (hasOverdue ? "⏰" : "🧭") + '</span>' +
      '<ul class="rb-list">' + items + '</ul>' +
      '<a class="rb-link" href="' + basePrefix() + 'setup.html">Open dashboard →</a>' +
      '<button class="rb-close" aria-label="Dismiss">✕</button>' +
      '</div>';
    // Prepend inside <main> (body is a flex row on desktop; a direct body
    // child would render as a squeezed column next to the sidebar).
    var host = document.getElementById("main-content") || document.body;
    host.insertBefore(wrap, host.firstChild);
    var btn = wrap.querySelector(".rb-close");
    if (btn) btn.addEventListener("click", function () { setDismissed(); wrap.remove(); });
  }

  // Task pages live one folder deep; root pages at top level. Detect via body data-phase? simpler: check location.
  function basePrefix() {
    // Task pages (phaseN/ or essentials/) are one folder deep.
    return /\/(phase\d|essentials)\//.test(location.pathname) ? "../" : "";
  }

  function boot() {
    var map = window.ALL_PHASES_MAP || {};
    run(map);
    if (document.body) renderBanner(map);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  window.Tracker = { run: run, computeReminders: computeReminders, titleOf: titleOf };
})();
