/* =====================================================================
   phase-engine.js — renders a phase page from its data object into
   #main-content. Phase pages live at root level, so task links use
   task.url as-is (e.g. "phase1/task-x.html") and the breadcrumb points
   to "index.html". Depends on window.Progress.
   API: PhaseEngine.render(phaseData)
   ===================================================================== */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function excerpt(text, n) {
    text = String(text || "");
    if (text.length <= n) return text;
    return text.slice(0, n).replace(/\s+\S*$/, "") + "…";
  }

  var STATUS_LABEL = { "not-started": "Not started", "in-progress": "In progress", "complete": "Complete" };
  var _last = null;

  function render(phaseData) {
    var main = document.getElementById("main-content");
    if (!main || !phaseData) return;
    // Locked phases show the gate instead of their tasks (covers direct URLs).
    if (window.Nav && Nav.guardPhase && Nav.guardPhase(phaseData.id, window.ALL_PHASES_MAP, "")) return;
    _last = phaseData;

    var taskIds = phaseData.tasks.map(function (t) { return t.id; });
    var prog = Progress.getPhaseProgress(phaseData.id, taskIds);

    var html = '<div class="wrap">';
    html += '<a class="breadcrumb" href="index.html">← Back to Trailhead</a>';
    html += '<h1 class="page-title">' + (phaseData.icon ? phaseData.icon + " " : "") + esc(phaseData.title) + '</h1>';
    html += '<p class="page-sub">' + esc(phaseData.subtitle || "") + '</p>';
    html += '<img class="phase-poster" src="assets/img/poster-' + esc(phaseData.id) + '.svg" alt="' + esc(phaseData.title) + ' summary poster">';

    html += '<div class="phase-prog">' +
            '<span class="lbl">Elevation</span>' +
            '<div class="progress-track"><div class="progress-fill" id="phase-fill"></div></div>' +
            '<span class="lbl">' + prog.completed + ' / ' + prog.total + ' tasks</span>' +
            '</div>';

    html += '<div class="card-grid">';
    phaseData.tasks.forEach(function (t, i) {
      var status = Progress.getCardStatus(Progress.getTaskState(phaseData.id, t.id));
      html += '<a class="task-card" href="' + esc(t.url) + '" style="animation-delay:' + (i * 60) + 'ms">' +
              '<span class="card-status-chip status-' + status + '">' + STATUS_LABEL[status] + '</span>' +
              '<div class="card-title">' + esc(t.title) + '</div>' +
              '<p class="card-desc">' + esc(excerpt(t.description, 120)) + '</p>' +
              '</a>';
    });
    html += '</div></div>';

    main.innerHTML = html;

    requestAnimationFrame(function () {
      var fill = document.getElementById("phase-fill");
      if (fill) fill.style.width = prog.percent + "%";
    });
  }

  window.PhaseEngine = {
    render: render,
    rerender: function () { if (_last) render(_last); }
  };
})();
