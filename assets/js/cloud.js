/* =====================================================================
   cloud.js — bridges Supabase (auth + database) to the site's existing
   localStorage keys, so every other module keeps working unchanged.

   Behavior:
   - No config or not signed in  -> pure local mode (site works as before).
   - Signed in                   -> on load, server state is pulled into
     localStorage (server wins); every local change is pushed up async.
   - Phase timeline rows sync both ways; manager edits win on next load.

   Depends on: cloud-config.js, the Supabase JS CDN bundle, progress.js.
   Load order: supabase-js CDN -> cloud-config -> progress -> cloud -> rest.
   ===================================================================== */
(function () {
  "use strict";

  var cfg = window.CLOUD_CONFIG || {};
  var enabled = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  var client = null, user = null, profile = null;

  window.Cloud = {
    enabled: enabled, ready: false, user: null, profile: null,
    isManager: function () { return !!(profile && profile.role === "manager"); },
    signOut: signOut, client: function () { return client; }
  };

  if (!enabled) { document.dispatchEvent(new Event("cloud-ready")); return; }

  client = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

  /* ---------- pull server state into localStorage ---------- */
  function applyServerState(rows, timelines) {
    (rows || []).forEach(function (r) {
      try {
        localStorage.setItem("expedition_task_" + r.phase_id + "_" + r.task_id, JSON.stringify(r.state));
      } catch (e) {}
    });
    (timelines || []).forEach(function (t) {
      try {
        localStorage.setItem("expedition_timing_" + t.phase_id, JSON.stringify({
          startedAt: t.started_at, completedAt: t.completed_at,
          completeNotified: !!t.complete_notified,
          midweekNotified: !!t.midweek_notified_at
        }));
      } catch (e) {}
    });
  }

  /* ---------- push hooks: wrap Progress.setTaskState & Profile.setTiming ---------- */
  function installHooks() {
    if (window.Progress && Progress.setTaskState && !Progress.__cloudWrapped) {
      var origSet = Progress.setTaskState;
      Progress.setTaskState = function (phaseId, taskId, patch) {
        var state = origSet(phaseId, taskId, patch);
        if (user) {
          client.from("task_progress").upsert({
            user_id: user.id, phase_id: phaseId, task_id: taskId,
            state: state, updated_at: new Date().toISOString()
          }).then(function () {}, function () {});
        }
        return state;
      };
      Progress.__cloudWrapped = true;
    }
    if (window.Profile && Profile.setTiming && !Profile.__cloudWrapped) {
      var origTiming = Profile.setTiming;
      Profile.setTiming = function (phaseId, patch) {
        var t = origTiming(phaseId, patch);
        if (user) {
          client.from("phase_timeline").upsert({
            user_id: user.id, phase_id: phaseId,
            started_at: t.startedAt, completed_at: t.completedAt,
            complete_notified: !!t.completeNotified,
            updated_at: new Date().toISOString()
          }).then(function () {}, function () {});
        }
        return t;
      };
      Profile.__cloudWrapped = true;
    }
  }

  /* ---------- session bootstrap ---------- */
  function boot() {
    client.auth.getSession().then(function (res) {
      var session = res.data ? res.data.session : null;
      if (!session) { finish(); return; }
      user = session.user;
      window.Cloud.user = user;
      Promise.all([
        client.from("profiles").select("*").eq("id", user.id).single(),
        client.from("task_progress").select("*").eq("user_id", user.id),
        client.from("phase_timeline").select("*").eq("user_id", user.id)
      ]).then(function (out) {
        profile = out[0].data || null;
        window.Cloud.profile = profile;
        applyServerState(out[1].data, out[2].data);
        finish();
      }, finish);
    }, finish);
  }

  function finish() {
    installHooks();
    window.Cloud.ready = true;
    document.dispatchEvent(new Event("cloud-ready"));
    updateChrome();
  }

  function signOut() {
    client.auth.signOut().then(function () { location.href = relBase() + "login.html"; });
  }

  function relBase() {
    return /\/phase\d\//.test(location.pathname) || /\/essentials\//.test(location.pathname) ? "../" : "";
  }

  /* ---------- sidebar chrome: who am I / login link / dashboard link ---------- */
  function updateChrome() {
    var foot = document.querySelector(".sb-foot");
    if (!foot) return;
    var base = relBase();
    var div = document.createElement("div");
    div.className = "sb-cloud";
    if (user) {
      var name = (profile && profile.full_name) || user.email;
      var dash = (profile && profile.role === "manager")
        ? '<a class="sb-reset" href="' + base + 'manager.html">📊 Manager Dashboard</a><br>' : "";
      div.innerHTML = '<span class="sb-user">👤 ' + name.replace(/</g, "&lt;") + '</span><br>' + dash +
        '<a class="sb-reset" href="#" id="sb-signout">Sign out</a>';
      foot.appendChild(div);
      var so = div.querySelector("#sb-signout");
      if (so) so.addEventListener("click", function (e) { e.preventDefault(); signOut(); });
    } else {
      div.innerHTML = '<a class="sb-reset" href="' + base + 'login.html">🔑 Sign in</a>';
      foot.appendChild(div);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
