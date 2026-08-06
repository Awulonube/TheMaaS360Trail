/* =====================================================================
   task-engine.js — renders the four-section gated task experience into
   #main-content and manages all gating + persistence.
   Sections: Learn -> Practice -> Assess -> Apply.
   Depends on window.Progress and window.Nav.
   Task pages are one level deep, so links use "../".
   API: TaskEngine.render(taskData)
   ===================================================================== */
(function () {
  "use strict";

  var PASS = 0.7; // assess pass threshold (fraction)
  var PHASE_LABELS = {
    essentials: "Essentials", phase1: "Phase 1", phase2: "Phase 2", phase3: "Phase 3",
    phase4: "Phase 4", phase5: "Phase 5", phase6: "Phase 6", phase7: "Phase 7", phase8: "Phase 8"
  };
  var SECTION_META = [
    { key: "learn", label: "Learn", icon: "📖" },
    { key: "practice", label: "Practice", icon: "🛠️" },
    { key: "assess", label: "Assess", icon: "✅" },
    { key: "apply", label: "Apply", icon: "🚀" }
  ];

  var data = null;       // current taskData
  var state = null;      // current persisted state
  var current = "learn"; // active section
  var mcResults = [];    // transient per-question correctness (true/false/undefined)

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function save(patch) { state = Progress.setTaskState(data.phaseId, data.id, patch); }
  function addSection(name) {
    if (state.sectionsComplete.indexOf(name) === -1) {
      var arr = state.sectionsComplete.slice(); arr.push(name); save({ sectionsComplete: arr });
    }
  }
  function unlocked(key) {
    if (key === "learn") return true;
    if (key === "practice") return state.sectionsComplete.indexOf("learn") !== -1;
    if (key === "assess") return state.sectionsComplete.indexOf("practice") !== -1;
    if (key === "apply") return state.sectionsComplete.indexOf("assess") !== -1;
    return false;
  }

  /* ---------- top-level render ---------- */
  function render(taskData) {
    data = taskData;
    state = Progress.getTaskState(data.phaseId, data.id);
    mcResults = [];
    var main = document.getElementById("main-content");
    if (!main) return;
    // Task pages sit one folder deep, hence the "../" base.
    if (window.Nav && Nav.guardPhase && Nav.guardPhase(data.phaseId, window.ALL_PHASES_MAP, "../")) return;

    // start on the furthest-unlocked, not-yet-complete section
    current = "learn";
    ["learn", "practice", "assess", "apply"].forEach(function (k) {
      if (unlocked(k)) current = k;
    });

    var html = '<div class="wrap">';
    html += '<a class="breadcrumb" href="../' + data.phaseId + '.html">← Back to ' + esc(PHASE_LABELS[data.phaseId] || "phase") + '</a>';
    html += '<h1 class="page-title">' + esc(data.title) + '</h1>';
    html += '<p class="page-sub">' + esc(data.description || "") + '</p>';
    html += '<div class="tab-bar" id="tab-bar"></div>';
    html += '<div id="section-learn" class="section-view"></div>';
    html += '<div id="section-practice" class="section-view"></div>';
    html += '<div id="section-assess" class="section-view"></div>';
    html += '<div id="section-apply" class="section-view"></div>';
    html += '</div>';
    main.innerHTML = html;

    renderTabBar();
    renderLearn();
    renderPractice();
    renderAssess();
    renderApply();
    showSection(current);
  }

  function renderTabBar() {
    var bar = document.getElementById("tab-bar");
    var html = "";
    SECTION_META.forEach(function (s) {
      var cls = "tab";
      var isUnlocked = unlocked(s.key);
      var isComplete = state.sectionsComplete.indexOf(s.key) !== -1;
      if (!isUnlocked) cls += " locked";
      if (isComplete) cls += " complete";
      if (s.key === current) cls += " active";
      var lock = (!isUnlocked) ? " 🔒" : "";
      html += '<button class="' + cls + '" data-tab="' + s.key + '"' + (isUnlocked ? "" : " aria-disabled=\"true\"") + '>' +
              '<span class="tab-ic">' + s.icon + " " + s.label + '</span>' + lock + '</button>';
    });
    bar.innerHTML = html;
    Array.prototype.forEach.call(bar.querySelectorAll(".tab"), function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-tab");
        if (!unlocked(key)) return;
        showSection(key);
      });
    });
  }

  function showSection(key) {
    current = key;
    ["learn", "practice", "assess", "apply"].forEach(function (k) {
      var el = document.getElementById("section-" + k);
      if (el) el.classList.toggle("active", k === key);
    });
    renderTabBar();
  }

  function bounceTab(key) {
    var btn = document.querySelector('.tab[data-tab="' + key + '"]');
    if (btn) { btn.classList.add("just-unlocked"); setTimeout(function () { btn.classList.remove("just-unlocked"); }, 650); }
  }

  /* ---------- LEARN ---------- */
  function renderLearn() {
    var el = document.getElementById("section-learn");
    var panels = data.learn || [];
    var html = '<p class="section-head">Learn · open every panel to continue</p>';
    panels.forEach(function (p) {
      var seen = state.learnPanelsOpened.indexOf(p.id) !== -1;
      html += '<div class="accordion-panel' + (seen ? " opened-once" : "") + '" data-panel="' + p.id + '">' +
              '<button class="accordion-head"><span>' + esc(p.title) + '</span>' +
              '<span><span class="seen">' + (seen ? "✓ " : "") + '</span><span class="chev">▸</span></span></button>' +
              '<div class="accordion-body"><div class="inner">' + (p.body || "") + '</div></div></div>';
    });
    html += '<div class="btn-row"><button class="btn-complete" id="learn-complete" disabled>Mark Learn Complete</button>' +
            '<p class="hint" id="learn-hint"></p></div>';
    el.innerHTML = html;

    Array.prototype.forEach.call(el.querySelectorAll(".accordion-panel"), function (panel) {
      panel.querySelector(".accordion-head").addEventListener("click", function () {
        panel.classList.toggle("open");
        if (panel.classList.contains("open")) onPanelOpen(panel.getAttribute("data-panel"), panel);
      });
    });
    document.getElementById("learn-complete").addEventListener("click", onLearnComplete);
    refreshLearnButton();
  }
  function onPanelOpen(panelId, panelEl) {
    if (state.learnPanelsOpened.indexOf(panelId) === -1) {
      var arr = state.learnPanelsOpened.slice(); arr.push(panelId); save({ learnPanelsOpened: arr });
      panelEl.classList.add("opened-once");
      var seen = panelEl.querySelector(".seen"); if (seen) seen.textContent = "✓ ";
    }
    refreshLearnButton();
  }
  function refreshLearnButton() {
    var btn = document.getElementById("learn-complete");
    var hint = document.getElementById("learn-hint");
    var total = (data.learn || []).length;
    var opened = state.learnPanelsOpened.length;
    var done = state.sectionsComplete.indexOf("learn") !== -1;
    if (done) { btn.disabled = true; btn.textContent = "✓ Learn Complete"; hint.textContent = ""; return; }
    btn.disabled = opened < total;
    hint.textContent = opened < total ? (opened + " / " + total + " panels opened") : "All panels read — you can continue.";
  }
  function onLearnComplete() {
    addSection("learn");
    var btn = document.getElementById("learn-complete");
    btn.classList.add("activated"); btn.disabled = true; btn.textContent = "✓ Learn Complete";
    renderPractice(); renderTabBar(); bounceTab("practice");
    document.getElementById("learn-hint").textContent = "Practice unlocked → open the Practice tab.";
  }

  /* ---------- PRACTICE ---------- */
  function renderPractice() {
    var el = document.getElementById("section-practice");
    var steps = (data.practice && data.practice.steps) || [];
    var html = '<p class="section-head">Practice · follow the walkthrough, then confirm each step</p>';
    // Embed section: the checkbox (iframePlaceholder) shows/hides it entirely;
    // when shown, a manager-provided embedUrl renders, else the placeholder.
    if (!data.practice || data.practice.iframePlaceholder !== false) {
      if (data.practice && data.practice.embedUrl) {
        html += '<div class="practice-embed"><iframe src="' + esc(data.practice.embedUrl) + '" ' +
                'allowfullscreen loading="lazy" referrerpolicy="no-referrer"></iframe>' +
                '<a class="embed-open" href="' + esc(data.practice.embedUrl) + '" target="_blank" rel="noopener">open in new tab ↗</a></div>';
      } else {
        html += '<div class="placeholder-block">[PLACEHOLDER: Live portal walkthrough goes here]</div>';
      }
    }
    html += '<ol class="checklist">';
    steps.forEach(function (s, i) {
      var checked = state.practiceSteps.indexOf(i) !== -1;
      html += '<li class="' + (checked ? "checked" : "") + '">' +
              '<input type="checkbox" id="ps-' + i + '" ' + (checked ? "checked" : "") + '>' +
              '<label for="ps-' + i + '">' + esc(s) + '</label></li>';
    });
    html += '</ol>';
    html += '<div class="btn-row"><button class="btn-complete" id="practice-complete" disabled>Mark Practice Complete</button>' +
            '<p class="hint" id="practice-hint"></p></div>';
    el.innerHTML = html;

    steps.forEach(function (s, i) {
      document.getElementById("ps-" + i).addEventListener("change", function (e) {
        onStepToggle(i, e.target.checked, e.target.closest("li"));
      });
    });
    document.getElementById("practice-complete").addEventListener("click", onPracticeComplete);
    refreshPracticeButton();
  }
  function onStepToggle(i, checked, li) {
    var arr = state.practiceSteps.slice();
    var at = arr.indexOf(i);
    if (checked && at === -1) arr.push(i);
    if (!checked && at !== -1) arr.splice(at, 1);
    save({ practiceSteps: arr });
    if (li) li.classList.toggle("checked", checked);
    refreshPracticeButton();
  }
  function refreshPracticeButton() {
    var btn = document.getElementById("practice-complete");
    var hint = document.getElementById("practice-hint");
    var total = ((data.practice && data.practice.steps) || []).length;
    var done = state.sectionsComplete.indexOf("practice") !== -1;
    if (done) { btn.disabled = true; btn.textContent = "✓ Practice Complete"; hint.textContent = ""; return; }
    btn.disabled = state.practiceSteps.length < total;
    hint.textContent = state.practiceSteps.length < total ? (state.practiceSteps.length + " / " + total + " steps done") : "All steps confirmed — you can continue.";
  }
  function onPracticeComplete() {
    addSection("practice");
    var btn = document.getElementById("practice-complete");
    btn.classList.add("activated"); btn.disabled = true; btn.textContent = "✓ Practice Complete";
    renderAssess(); renderTabBar(); bounceTab("assess");
    document.getElementById("practice-hint").textContent = "Assess unlocked → open the Assess tab.";
  }

  /* ---------- ASSESS ---------- */
  function renderAssess() {
    var el = document.getElementById("section-assess");
    var qs = (data.assess && data.assess.questions) || [];
    var mc = qs.filter(function (q) { return q.type === "mc"; });
    var text = qs.filter(function (q) { return q.type === "text"; })[0];
    mcResults = new Array(mc.length);

    var html = '<p class="section-head">Assess · answer the questions (' + Math.ceil(mc.length * PASS) + ' of ' + mc.length + ' to pass) and reflect</p>';
    mc.forEach(function (q, qi) {
      html += '<div class="quiz-q" data-qi="' + qi + '"><div class="q-text">' + (qi + 1) + '. ' + esc(q.question) + '</div>';
      q.options.forEach(function (opt, oi) {
        html += '<label class="quiz-opt"><input type="radio" name="q' + qi + '" value="' + oi + '"> <span>' + esc(opt) + '</span></label>';
      });
      html += '<div class="btn-row"><button class="btn-primary btn-submit" data-qi="' + qi + '">Submit Answer</button></div>';
      html += '<div class="q-feedback" id="fb-' + qi + '"></div></div>';
    });
    html += '<div class="quiz-score" id="quiz-score"></div>';

    html += '<div class="reflection" id="reflection" style="display:none">' +
            '<p class="section-head">Reflection</p>' +
            '<p>' + esc(text ? text.question : "What is one thing you will do differently after this task?") + '</p>' +
            '<textarea id="reflection-text" placeholder="Write a sentence or two…"></textarea>' +
            '<label class="mark"><input type="checkbox" id="reflection-mark"' + (state.reflectionMarked ? " checked" : "") + '> I understood this</label>' +
            '</div>';

    html += '<div class="btn-row"><button class="btn-complete" id="assess-complete" disabled>Mark Assess Complete</button>' +
            '<p class="hint" id="assess-hint"></p></div>';
    el.innerHTML = html;

    Array.prototype.forEach.call(el.querySelectorAll(".btn-submit"), function (btn) {
      btn.addEventListener("click", function () { onSubmitQuestion(parseInt(btn.getAttribute("data-qi"), 10), mc); });
    });
    var markBox = document.getElementById("reflection-mark");
    markBox.addEventListener("change", function (e) { save({ reflectionMarked: e.target.checked }); refreshAssessButton(); });
    document.getElementById("assess-complete").addEventListener("click", onAssessComplete);

    // restore prior pass: if assessScore already stored, reveal reflection
    if (typeof state.assessScore === "number") {
      document.getElementById("reflection").style.display = "block";
      document.getElementById("quiz-score").textContent = "Previous score: " + Math.round(state.assessScore * 100) + "%";
    }
    refreshAssessButton();
  }
  function onSubmitQuestion(qi, mc) {
    var q = mc[qi];
    var picked = document.querySelector('input[name="q' + qi + '"]:checked');
    var fb = document.getElementById("fb-" + qi);
    var box = document.querySelector('.quiz-q[data-qi="' + qi + '"]');
    if (!picked) { fb.textContent = "Pick an answer first."; fb.className = "q-feedback no"; return; }
    var chosen = parseInt(picked.value, 10);
    var correct = chosen === q.correct;
    mcResults[qi] = correct;

    // clear previous highlight, then mark
    Array.prototype.forEach.call(box.querySelectorAll(".quiz-opt"), function (opt, oi) {
      opt.classList.remove("correct", "incorrect");
      if (oi === q.correct) opt.classList.add("correct");
      else if (oi === chosen && !correct) opt.classList.add("incorrect");
    });
    box.classList.add("answered");
    fb.textContent = correct ? "Correct." : "Not quite — the highlighted option is correct. You can change your answer and resubmit.";
    fb.className = "q-feedback " + (correct ? "ok" : "no");

    // if all answered, compute + store score
    var answered = mcResults.filter(function (v) { return typeof v === "boolean"; }).length;
    if (answered === mc.length) {
      var right = mcResults.filter(function (v) { return v === true; }).length;
      var score = right / mc.length;
      save({ assessScore: score });
      document.getElementById("quiz-score").textContent = "Score: " + right + " / " + mc.length + " (" + Math.round(score * 100) + "%)";
      document.getElementById("reflection").style.display = "block";
    }
    refreshAssessButton();
  }
  function refreshAssessButton() {
    var btn = document.getElementById("assess-complete");
    var hint = document.getElementById("assess-hint");
    var done = state.sectionsComplete.indexOf("assess") !== -1;
    if (done) { btn.disabled = true; btn.textContent = "✓ Assess Complete"; hint.textContent = ""; return; }
    var passed = typeof state.assessScore === "number" && state.assessScore >= PASS;
    var ready = passed && state.reflectionMarked;
    btn.disabled = !ready;
    if (!passed) hint.textContent = "Answer all questions and reach " + Math.round(PASS * 100) + "% to continue.";
    else if (!state.reflectionMarked) hint.textContent = "Passed — now write your reflection and tick the box.";
    else hint.textContent = "Ready — you can continue.";
  }
  function onAssessComplete() {
    addSection("assess");
    var btn = document.getElementById("assess-complete");
    btn.classList.add("activated"); btn.disabled = true; btn.textContent = "✓ Assess Complete";
    renderApply(); renderTabBar(); bounceTab("apply");
    document.getElementById("assess-hint").textContent = "Apply unlocked → open the Apply tab.";
  }

  /* ---------- APPLY ---------- */
  function renderApply() {
    var el = document.getElementById("section-apply");
    var apply = data.apply || {};
    var done = state.sectionsComplete.indexOf("apply") !== -1;
    var html = '<p class="section-head">Apply · put it into practice, then declare completion</p>';
    html += '<div class="scenario">';
    if (apply.isRealScenario) html += '<div class="live-badge">🔴 LIVE SCENARIO</div>';
    html += '<p>' + esc(apply.scenario || "") + '</p></div>';
    html += '<div class="btn-row"><button class="' + (apply.isRealScenario ? "btn-live-scenario" : "btn-complete") + '" id="apply-btn"' + (done ? " disabled" : "") + '>' +
            (done ? "✓ Task Complete" : "I've Applied This") + '</button>' +
            '<p class="hint" id="apply-hint"></p></div>';
    el.innerHTML = html;
    if (!done) document.getElementById("apply-btn").addEventListener("click", onApplyComplete);
  }
  function onApplyComplete() {
    addSection("apply");
    var btn = document.getElementById("apply-btn");
    btn.disabled = true; btn.textContent = "✓ Task Complete";
    document.getElementById("apply-hint").textContent = "Nice work — this task is now complete.";
    triggerParticleBurst();
    renderTabBar();
    if (window.Nav && Nav.updateProgressBar) Nav.updateProgressBar();
  }

  /* ---------- celebration ---------- */
  function triggerParticleBurst() {
    var colors = ["#22c55e", "#f59e0b", "#3b82f6", "#ffffff"];
    var cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    for (var i = 0; i < 36; i++) {
      var p = document.createElement("div");
      p.className = "particle";
      p.style.left = cx + "px"; p.style.top = cy + "px";
      p.style.background = colors[i % colors.length];
      var ang = Math.random() * Math.PI * 2, dist = 120 + Math.random() * 220;
      p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      p.style.setProperty("--dy", Math.sin(ang) * dist + "px");
      p.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
      p.style.animation = "particleBurst " + (700 + Math.random() * 500) + "ms ease-out forwards";
      document.body.appendChild(p);
      (function (node) { setTimeout(function () { node.remove(); }, 1300); })(p);
    }
  }

  window.TaskEngine = {
    render: render,
    rerender: function () { if (data) render(data); },
    current: function () { return data; }
  };
})();
