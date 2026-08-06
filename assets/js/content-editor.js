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
    if (patch.assess && patch.assess.questions) {
      task.assess.questions = clone(patch.assess.questions);
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
                 assess: { questions: t.assess.questions },
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
      '<label class="ce-lbl">✅ Quiz (' + wm.assess.questions.length + ' questions, pass mark 70%)</label>' +
      '<div id="ce-quiz">' + wm.assess.questions.map(quizCardHtml).join("") + '</div>' +
      '<div class="ce-qadd-row">' +
        '<button class="ce-add" id="ce-add-mc" style="width:auto;flex:1">＋ Multiple choice</button>' +
        '<button class="ce-add" id="ce-add-text" style="width:auto;flex:1">＋ Written reflection</button>' +
      '</div>' +
      '<label class="ce-lbl">🚀 Apply scenario</label>' +
      '<textarea class="ce-ta" rows="4" id="ce-apply">'+esc(wm.apply.scenario)+'</textarea>' +
      '<div class="ce-actions">' +
        '<button class="btn-primary" id="ce-save">Save for everyone</button>' +
        '<button class="ce-revert" id="ce-revert">Revert to built-in</button>' +
      '</div>' +
      '<p class="save-status" id="ce-status"></p>' +
      '<p class="hint" style="font-size:12px">Changes save to the cloud and appear for every user on their next page load.</p>' +
      '</div>';
    document.body.appendChild(d);
    wireDrawer(d);
  }

  // one quiz question card
  function quizCardHtml(q, i) {
    var head =
      '<div class="ce-card-head">' +
        '<span class="ce-qtag">' + (q.type === "text" ? "✍️ reflection" : "Q" + (i + 1)) + '</span>' +
        '<span class="ce-card-btns">' +
          '<button class="ce-mini" data-qup="' + i + '" title="Move up">↑</button>' +
          '<button class="ce-mini" data-qdown="' + i + '" title="Move down">↓</button>' +
          '<button class="ce-mini ce-del" data-qdel="' + i + '" title="Delete question">✕</button>' +
        '</span>' +
      '</div>' +
      '<textarea class="ce-ta" rows="2" data-q-text="' + i + '" placeholder="Question text">' + esc(q.question) + '</textarea>';
    if (q.type === "text") {
      return '<div class="ce-card">' + head +
        '<p class="hint" style="font-size:11.5px;margin:6px 0 0">Open answer — not auto-graded, the hire reflects in writing.</p></div>';
    }
    var opts = (q.options || []).map(function (opt, j) {
      return '<div class="ce-opt">' +
        '<input type="radio" name="ce-correct-' + i + '" value="' + j + '"' + (q.correct === j ? " checked" : "") + ' title="Mark as the correct answer">' +
        '<input class="ce-in" data-q-opt="' + i + ':' + j + '" value="' + esc(opt) + '" placeholder="Answer option">' +
        '<button class="ce-mini ce-del" data-odel="' + i + ':' + j + '" title="Remove option">✕</button>' +
        '</div>';
    }).join("");
    return '<div class="ce-card">' + head + opts +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">' +
      '<button class="ce-mini" data-oadd="' + i + '">＋ option</button>' +
      '<span class="hint" style="font-size:11px;margin:0">⦿ = correct answer</span></div></div>';
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
    var i, j;
    for (i = 0; i < wm.learn.length; i++) {
      var ti = document.querySelector('[data-card-title="'+i+'"]');
      var bo = document.querySelector('[data-card-body="'+i+'"]');
      if (ti) wm.learn[i].title = ti.value;
      if (bo) wm.learn[i].body = bo.value;
    }
    for (i = 0; i < wm.assess.questions.length; i++) {
      var q = wm.assess.questions[i];
      var qt = document.querySelector('[data-q-text="'+i+'"]');
      if (qt) q.question = qt.value;
      if (q.type === "mc") {
        for (j = 0; j < (q.options || []).length; j++) {
          var oi = document.querySelector('[data-q-opt="'+i+':'+j+'"]');
          if (oi) q.options[j] = oi.value;
        }
        var sel = document.querySelector('input[name="ce-correct-'+i+'"]:checked');
        if (sel) q.correct = parseInt(sel.value, 10);
      }
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

    /* ---- quiz wiring ---- */
    function restructure(fn) { return function () { syncScalars(); fn(); drawDrawer(); }; }
    var addMc = d.querySelector("#ce-add-mc");
    if (addMc) addMc.addEventListener("click", restructure(function () {
      wm.assess.questions.push({ type: "mc", question: "", options: ["", "", "", ""], correct: 0 });
    }));
    var addText = d.querySelector("#ce-add-text");
    if (addText) addText.addEventListener("click", restructure(function () {
      wm.assess.questions.push({ type: "text", question: "" });
    }));
    d.querySelectorAll("[data-qdel]").forEach(function (b) {
      b.addEventListener("click", restructure(function () {
        wm.assess.questions.splice(parseInt(b.getAttribute("data-qdel"), 10), 1);
      }));
    });
    d.querySelectorAll("[data-qup]").forEach(function (b) {
      b.addEventListener("click", restructure(function () {
        var i = parseInt(b.getAttribute("data-qup"), 10);
        if (i > 0) { var x = wm.assess.questions[i-1]; wm.assess.questions[i-1] = wm.assess.questions[i]; wm.assess.questions[i] = x; }
      }));
    });
    d.querySelectorAll("[data-qdown]").forEach(function (b) {
      b.addEventListener("click", restructure(function () {
        var i = parseInt(b.getAttribute("data-qdown"), 10);
        if (i < wm.assess.questions.length - 1) { var x = wm.assess.questions[i+1]; wm.assess.questions[i+1] = wm.assess.questions[i]; wm.assess.questions[i] = x; }
      }));
    });
    d.querySelectorAll("[data-oadd]").forEach(function (b) {
      b.addEventListener("click", restructure(function () {
        wm.assess.questions[parseInt(b.getAttribute("data-oadd"), 10)].options.push("");
      }));
    });
    d.querySelectorAll("[data-odel]").forEach(function (b) {
      b.addEventListener("click", restructure(function () {
        var p = b.getAttribute("data-odel").split(":");
        var q = wm.assess.questions[parseInt(p[0], 10)];
        var j = parseInt(p[1], 10);
        q.options.splice(j, 1);
        if (q.correct >= q.options.length) q.correct = 0;
        else if (q.correct > j) q.correct--;
      }));
    });

    var status = d.querySelector("#ce-status");
    function say(t, ok) { status.textContent = t; status.className = "save-status " + (ok ? "ok" : "no"); }

    d.querySelector("#ce-save").addEventListener("click", function () {
      syncScalars();
      var t = currentTask();
      if (!t) return;
      if (!wm.title.trim()) return say("Title can't be empty.", false);
      if (!wm.learn.length) return say("Keep at least one learn card.", false);
      // quiz validation — catch mistakes before they reach hires
      var qs = wm.assess.questions;
      if (!qs.length) return say("Keep at least one quiz question.", false);
      for (var qi = 0; qi < qs.length; qi++) {
        var qq = qs[qi];
        if (!qq.question.trim()) return say("Question " + (qi + 1) + " has no text.", false);
        if (qq.type === "mc") {
          qq.options = qq.options.map(function (o) { return o.trim(); }).filter(Boolean);
          if (qq.options.length < 2) return say("Question " + (qi + 1) + " needs at least 2 answer options.", false);
          if (qq.correct == null || qq.correct >= qq.options.length) qq.correct = 0;
        }
      }
      if (!qs.some(function (q) { return q.type === "mc"; }))
        return say("Keep at least one multiple-choice question (the pass mark needs something to grade).", false);
      var patch = {
        title: wm.title.trim(),
        description: wm.description.trim(),
        learn: wm.learn.map(function (p, i) {
          return { id: "p" + (i + 1), title: p.title.trim() || ("Card " + (i + 1)), body: htmlize(p.body) };
        }),
        practice: { iframePlaceholder: wm.practice.iframePlaceholder, steps: wm.practice.steps, embedUrl: wm.practice.embedUrl },
        assess: { questions: wm.assess.questions.map(function (q) {
          return q.type === "text"
            ? { type: "text", question: q.question.trim() }
            : { type: "mc", question: q.question.trim(), options: q.options, correct: q.correct };
        }) },
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
