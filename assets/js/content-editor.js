/* =====================================================================
   content-editor.js — live content overrides + the manager edit drawer.

   1. On every page load (all users): fetches content_overrides from
      Supabase and merges them into the built-in phase data, then
      re-renders. Everyone sees manager edits instantly — no rebuild.
   2. For signed-in managers on task pages: shows an "✏️ Edit this task"
      button opening a drawer of plain text boxes — title, description,
      learn cards (add / remove / reorder), practice steps, and a
      checkbox for the practice embed section.

   Depends on: cloud.js (Cloud), the page's PHASE*_DATA globals, and
   TaskEngine/PhaseEngine rerender hooks. No-ops in local-only mode.
   ===================================================================== */
(function () {
  "use strict";

  var DATA_VARS = ["ESSENTIALS_DATA","PHASE1_DATA","PHASE2_DATA","PHASE3_DATA","PHASE4_DATA","PHASE5_DATA","PHASE6_DATA","PHASE7_DATA","PHASE8_DATA"];
  var pristine = {};   // "phase/task" -> deep copy of built-in task
  var overrides = {};  // "phase/task" -> patch object

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function key(p, t) { return p + "/" + t; }

  function eachTask(fn) {
    DATA_VARS.forEach(function (v) {
      var d = window[v];
      if (d && d.tasks) d.tasks.forEach(function (t) { fn(t, d); });
    });
  }

  /* ---------- merge ---------- */
  function applyPatch(task, patch) {
    if (!patch) return;
    if (patch.title != null) task.title = patch.title;
    if (patch.description != null) task.description = patch.description;
    if (patch.learn) task.learn = clone(patch.learn);
    if (patch.practice) {
      if (patch.practice.iframePlaceholder != null) task.practice.iframePlaceholder = patch.practice.iframePlaceholder;
      if (patch.practice.steps) task.practice.steps = clone(patch.practice.steps);
      if (patch.practice.embedUrl != null) task.practice.embedUrl = patch.practice.embedUrl;
    }
    if (patch.apply) {
      if (patch.apply.scenario != null) task.apply.scenario = patch.apply.scenario;
      if (patch.apply.isRealScenario != null) task.apply.isRealScenario = patch.apply.isRealScenario;
    }
  }

  function mergeAll() {
    eachTask(function (t) {
      var k = key(t.phaseId, t.id);
      if (!pristine[k]) pristine[k] = clone(t);
      else { // restore pristine before re-applying (handles revert)
        var p = clone(pristine[k]);
        t.title = p.title; t.description = p.description;
        t.learn = p.learn; t.practice = p.practice; t.apply = p.apply;
      }
      if (overrides[k]) applyPatch(t, overrides[k]);
    });
    if (window.TaskEngine && TaskEngine.rerender) TaskEngine.rerender();
    if (window.PhaseEngine && PhaseEngine.rerender) PhaseEngine.rerender();
  }

  /* ---------- fetch ---------- */
  function fetchOverrides() {
    return Cloud.client().from("content_overrides").select("phase_id,task_id,patch")
      .then(function (r) {
        overrides = {};
        (r.data || []).forEach(function (row) { overrides[key(row.phase_id, row.task_id)] = row.patch || {}; });
        mergeAll();
      }, function () {});
  }

  /* ---------- editor drawer (managers, task pages only) ---------- */
  var wm = null; // working model while drawer is open

  function currentTask() {
    return (window.TaskEngine && TaskEngine.current) ? TaskEngine.current() : null;
  }

  function openDrawer() {
    var t = currentTask();
    if (!t) return;
    wm = clone({ title: t.title, description: t.description, learn: t.learn,
                 practice: { iframePlaceholder: t.practice.iframePlaceholder !== false,
                             steps: t.practice.steps, embedUrl: t.practice.embedUrl || "" },
                 apply: { scenario: t.apply.scenario } });
    drawDrawer();
  }

  function drawDrawer() {
    closeDrawer();
    var d = document.createElement("div");
    d.className = "ce-drawer";
    d.id = "ce-drawer";
    var cards = wm.learn.map(function (p, i) {
      return '<div class="ce-card">' +
        '<div class="ce-card-head">' +
          '<input class="ce-in" data-card-title="'+i+'" value="'+esc(p.title)+'" placeholder="Card title">' +
          '<span class="ce-card-btns">' +
            '<button class="ce-mini" data-up="'+i+'" title="Move up">↑</button>' +
            '<button class="ce-mini" data-down="'+i+'" title="Move down">↓</button>' +
            '<button class="ce-mini ce-del" data-del="'+i+'" title="Delete card">✕</button>' +
          '</span>' +
        '</div>' +
        '<textarea class="ce-ta" rows="5" data-card-body="'+i+'" placeholder="Card content (plain text or HTML)">'+esc(p.body)+'</textarea>' +
        '</div>';
    }).join("");

    d.innerHTML =
      '<div class="ce-head"><b>✏️ Edit this task</b><button class="ce-mini" id="ce-close">✕</button></div>' +
      '<div class="ce-body">' +
      '<label class="ce-lbl">Task title</label>' +
      '<input class="ce-in" id="ce-title" value="'+esc(wm.title)+'">' +
      '<label class="ce-lbl">Description (shown under the title and on the phase card)</label>' +
      '<textarea class="ce-ta" rows="3" id="ce-desc">'+esc(wm.description)+'</textarea>' +
      '<label class="ce-lbl">📖 Learn cards</label>' +
      '<div id="ce-cards">'+cards+'</div>' +
      '<button class="ce-add" id="ce-add-card">＋ Add learn card</button>' +
      '<label class="ce-lbl">🛠️ Practice steps (one per line)</label>' +
      '<textarea class="ce-ta" rows="6" id="ce-steps">'+esc(wm.practice.steps.join("\n"))+'</textarea>' +
      '<label class="ce-lbl">🔗 Practice embed link (optional)</label>' +
      '<input class="ce-in" id="ce-embed" value="'+esc(wm.practice.embedUrl)+'" placeholder="https://… (hosted video, walkthrough, or doc)">' +
      '<p class="hint" style="font-size:11.5px;margin:6px 0 0">Paste any hosted link — YouTube/Vimeo embed links, a Box/SharePoint doc, or an internal portal page. It displays inside the Practice tab. Tip: for YouTube use the <i>embed</i> form (youtube.com/embed/VIDEOID).</p>' +
      '<label class="ce-check"><input type="checkbox" id="ce-iframe"'+(wm.practice.iframePlaceholder?" checked":"")+'> Show the embed/placeholder section in Practice</label>' +
      '<label class="ce-lbl">🚀 Apply scenario</label>' +
      '<textarea class="ce-ta" rows="4" id="ce-apply">'+esc(wm.apply.scenario)+'</textarea>' +
      '<div class="ce-actions">' +
        '<button class="btn-primary" id="ce-save">Save for everyone</button>' +
        '<button class="ce-revert" id="ce-revert">Revert to built-in</button>' +
      '</div>' +
      '<p class="save-status" id="ce-status"></p>' +
      '<p class="hint" style="font-size:12px">Changes save to the cloud and appear for every user on their next page load. Quiz editing still lives in the content files — ask Claude for edits there.</p>' +
      '</div>';
    document.body.appendChild(d);
    wireDrawer(d);
  }

  function closeDrawer() {
    var old = document.getElementById("ce-drawer");
    if (old) old.remove();
  }

  function syncScalars() {
    wm.title = document.getElementById("ce-title").value;
    wm.description = document.getElementById("ce-desc").value;
    wm.practice.steps = document.getElementById("ce-steps").value.split("\n")
      .map(function (s) { return s.trim(); }).filter(Boolean);
    wm.practice.iframePlaceholder = document.getElementById("ce-iframe").checked;
    wm.practice.embedUrl = document.getElementById("ce-embed").value.trim();
    wm.apply.scenario = document.getElementById("ce-apply").value;
    var i;
    for (i = 0; i < wm.learn.length; i++) {
      var ti = document.querySelector('[data-card-title="'+i+'"]');
      var bo = document.querySelector('[data-card-body="'+i+'"]');
      if (ti) wm.learn[i].title = ti.value;
      if (bo) wm.learn[i].body = bo.value;
    }
  }

  // plain text typed by a manager becomes paragraphs; HTML passes through
  function htmlize(body) {
    if (/[<>]/.test(body)) return body;
    return body.split(/\n\s*\n/).map(function (p) {
      return "<p>" + p.replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function wireDrawer(d) {
    d.querySelector("#ce-close").addEventListener("click", closeDrawer);
    d.querySelector("#ce-add-card").addEventListener("click", function () {
      syncScalars();
      wm.learn.push({ id: "p" + (wm.learn.length + 1), title: "New card", body: "" });
      drawDrawer();
    });
    d.querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () {
        syncScalars();
        wm.learn.splice(parseInt(b.getAttribute("data-del"), 10), 1);
        drawDrawer();
      });
    });
    d.querySelectorAll("[data-up]").forEach(function (b) {
      b.addEventListener("click", function () {
        syncScalars();
        var i = parseInt(b.getAttribute("data-up"), 10);
        if (i > 0) { var x = wm.learn[i-1]; wm.learn[i-1] = wm.learn[i]; wm.learn[i] = x; }
        drawDrawer();
      });
    });
    d.querySelectorAll("[data-down]").forEach(function (b) {
      b.addEventListener("click", function () {
        syncScalars();
        var i = parseInt(b.getAttribute("data-down"), 10);
        if (i < wm.learn.length - 1) { var x = wm.learn[i+1]; wm.learn[i+1] = wm.learn[i]; wm.learn[i] = x; }
        drawDrawer();
      });
    });

    var status = d.querySelector("#ce-status");
    function say(t, ok) { status.textContent = t; status.className = "save-status " + (ok ? "ok" : "no"); }

    d.querySelector("#ce-save").addEventListener("click", function () {
      syncScalars();
      var t = currentTask();
      if (!t) return;
      if (!wm.title.trim()) return say("Title can't be empty.", false);
      if (!wm.learn.length) return say("Keep at least one learn card.", false);
      var patch = {
        title: wm.title.trim(),
        description: wm.description.trim(),
        learn: wm.learn.map(function (p, i) {
          return { id: "p" + (i + 1), title: p.title.trim() || ("Card " + (i + 1)), body: htmlize(p.body) };
        }),
        practice: { iframePlaceholder: wm.practice.iframePlaceholder, steps: wm.practice.steps, embedUrl: wm.practice.embedUrl },
        apply: { scenario: wm.apply.scenario }
      };
      say("Saving…", true);
      Cloud.client().from("content_overrides").upsert({
        phase_id: t.phaseId, task_id: t.id, patch: patch,
        updated_at: new Date().toISOString(), updated_by: Cloud.user.id
      }).then(function (r) {
        if (r.error) return say("Error: " + r.error.message, false);
        overrides[key(t.phaseId, t.id)] = patch;
        mergeAll();
        addEditButton(); // re-render wiped the button host? button is on body, keep
        say("Saved ✓ — live for everyone.", true);
      });
    });

    d.querySelector("#ce-revert").addEventListener("click", function () {
      var t = currentTask();
      if (!t) return;
      if (!confirm("Remove all custom edits for this task and restore the built-in content?")) return;
      Cloud.client().from("content_overrides").delete()
        .eq("phase_id", t.phaseId).eq("task_id", t.id)
        .then(function (r) {
          if (r.error) return say("Error: " + r.error.message, false);
          delete overrides[key(t.phaseId, t.id)];
          mergeAll();
          say("Reverted to built-in content.", true);
          setTimeout(function () { closeDrawer(); }, 600);
        });
    });
  }

  function addEditButton() {
    if (!currentTask()) return;
    if (document.getElementById("ce-fab")) return;
    var b = document.createElement("button");
    b.id = "ce-fab";
    b.className = "ce-fab";
    b.textContent = "✏️ Edit this task";
    b.addEventListener("click", openDrawer);
    document.body.appendChild(b);
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!window.Cloud || !Cloud.enabled) return;
    fetchOverrides().then(function () {
      if (Cloud.isManager()) addEditButton();
    });
  }

  if (window.Cloud && Cloud.ready) boot();
  else document.addEventListener("cloud-ready", boot);

  window.ContentEditor = { mergeAll: mergeAll, _applyPatch: applyPatch, _htmlize: htmlize };
})();
