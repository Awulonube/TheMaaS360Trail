/* =====================================================================
   nav.js — injects the sidebar, draws the global progress bar, marks the
   active link, applies phase lock icons. Depends on window.Progress.
   API:
     Nav.init({ activePage, allPhasesMap, base })   base = "" (root) or "../" (task pages)
     Nav.updateProgressBar(allPhasesMap)
   ===================================================================== */
(function () {
  "use strict";

  var PHASE_ORDER = ["essentials", "phase1", "phase2", "phase3", "phase4", "phase5", "phase6", "phase7", "phase8"];

  var LINKS = [
    { id: "home",        label: "Home",        icon: "🏔️", href: "index.html" },
    { id: "setup",       label: "My Timeline", icon: "⚙️", href: "setup.html" },
    { id: "gear-room",   label: "Gear Room",   icon: "🎒", href: "gear-room.html" },
    { id: "essentials",  label: "Essentials",  icon: "⛺", href: "essentials.html" },
    { id: "phase1",      label: "Phase 1 · Basecamp",      icon: "①", href: "phase1.html" },
    { id: "phase2",      label: "Phase 2 · Acclimation",   icon: "②", href: "phase2.html" },
    { id: "phase3",      label: "Phase 3 · Ascent",        icon: "③", href: "phase3.html" },
    { id: "phase4",      label: "Phase 4 · High Camp",     icon: "④", href: "phase4.html" },
    { id: "phase5",      label: "Phase 5 · Summit Push",   icon: "⑤", href: "phase5.html" },
    { id: "phase6",      label: "Phase 6 · Summit",        icon: "⑥", href: "phase6.html" },
    { id: "phase7",      label: "Phase 7 · Expedition Lead", icon: "⑦", href: "phase7.html" },
    { id: "phase8",      label: "Phase 8 · Peak Certified", icon: "⑧", href: "phase8.html" }
  ];

  var _allPhasesMap = null;

  // A phase is locked when the PRECEDING phase in PHASE_ORDER is < 100%.
  // essentials and phase1 are never locked.
  function isPhaseLocked(phaseId, allPhasesMap) {
    if (phaseId === "essentials" || phaseId === "phase1") return false;
    // A manager can open any phase early; that override wins over the
    // normal "finish the previous phase" rule.
    if (window.Profile && Profile.getTiming) {
      try { if (Profile.getTiming(phaseId).forceUnlocked) return false; } catch (e) {}
    }
    var idx = PHASE_ORDER.indexOf(phaseId);
    if (idx <= 0) return false;
    var prev = PHASE_ORDER[idx - 1];
    if (!allPhasesMap[prev]) return false;
    return Progress.getPhaseProgress(prev, allPhasesMap[prev]).percent < 100;
  }

  function buildSidebar(activePage, allPhasesMap, base) {
    var g = Progress.getGlobalProgress(allPhasesMap);

    var html = "";
    html += '<div class="sb-brand"><span class="sb-logo">🏔️</span><div>' +
            '<div class="sb-title">MaaS360 Expedition</div>' +
            '<div class="sb-sub">New-hire onboarding</div></div>' +
            '<button class="sb-toggle" id="sb-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button></div>';

    html += '<div class="sb-progress">' +
            '<div class="sb-progress-label"><span>Expedition Progress</span><span id="sb-global-pct">' + g.percent + '%</span></div>' +
            '<div class="progress-track"><div class="progress-fill" id="sb-global-fill"></div></div>' +
            '</div>';

    html += '<ul class="sb-nav">';
    LINKS.forEach(function (link) {
      var cls = "sb-link";
      if (link.id === activePage) cls += " active";

      var locked = false, pct = null;
      if (link.id.indexOf("phase") === 0 || link.id === "essentials") {
        if (allPhasesMap[link.id]) pct = Progress.getPhaseProgress(link.id, allPhasesMap[link.id]).percent;
        locked = isPhaseLocked(link.id, allPhasesMap);
        if (locked) cls += " locked";
      }

      var right = "";
      if (locked) right = '<span class="lock">🔒</span>';
      else if (pct !== null) right = '<span class="pct">' + pct + '%</span>';

      // Locked phases render as a non-link <span> so they can't be clicked,
      // tabbed to, opened in a new tab, or copied as a URL.
      var inner = '<span class="sb-ic">' + link.icon + '</span><span>' + link.label + '</span>' + right;
      if (locked) {
        html += '<li><span class="' + cls + '" role="link" aria-disabled="true" ' +
                'title="Finish the previous phase to unlock this one">' + inner + '</span></li>';
      } else {
        html += '<li><a class="' + cls + '" href="' + base + link.href + '">' + inner + '</a></li>';
      }
    });
    html += '</ul>';

    html += '<div class="sb-foot"><a class="sb-reset" href="' + base + 'gear-room.html">↺ Reset Progress</a></div>';
    return html;
  }

  function init(opts) {
    opts = opts || {};
    var activePage = opts.activePage || "";
    _allPhasesMap = opts.allPhasesMap || {};
    var base = opts.base || "";

    var el = document.getElementById("sidebar");
    if (!el) return;
    el.innerHTML = buildSidebar(activePage, _allPhasesMap, base);

    // Narrow-viewport hamburger: expands/collapses the nav when the
    // sidebar is rendered as a top bar (see @media in styles.css).
    var toggle = document.getElementById("sb-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var open = el.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    // animate the global bar after layout settles
    requestAnimationFrame(function () {
      updateProgressBar(_allPhasesMap);
    });
  }

  function updateProgressBar(allPhasesMap) {
    var map = allPhasesMap || _allPhasesMap;
    if (!map) return;
    var g = Progress.getGlobalProgress(map);
    var fill = document.getElementById("sb-global-fill");
    var pct = document.getElementById("sb-global-pct");
    if (fill) fill.style.width = g.percent + "%";
    if (pct) pct.textContent = g.percent + "%";
  }

  /* ---------------------------------------------------------------
     guardPhase — blocks a locked phase even when reached directly by
     URL, bookmark, browser history, or a stale link. Called by every
     phase and task page (see phase-engine / task-engine).
     Shows a friendly "locked" panel instead of the content.
     --------------------------------------------------------------- */
  function guardPhase(phaseId, allPhasesMap, base) {
    var map = allPhasesMap || _allPhasesMap || {};
    if (!isPhaseLocked(phaseId, map)) return false;   // not locked: carry on

    base = base || "";
    var idx = PHASE_ORDER.indexOf(phaseId);
    var prev = idx > 0 ? PHASE_ORDER[idx - 1] : null;
    var prevLink = LINKS.filter(function (l) { return l.id === prev; })[0];
    var prevLabel = prevLink ? prevLink.label : "the previous phase";
    var prevHref = prevLink ? (base + prevLink.href) : (base + "index.html");
    var pct = (prev && map[prev]) ? Progress.getPhaseProgress(prev, map[prev]).percent : 0;

    var main = document.getElementById("main-content");
    if (!main) return true;
    main.innerHTML =
      '<div class="wrap"><a class="breadcrumb" href="' + base + 'index.html">← Back to Trailhead</a>' +
      '<div class="locked-gate">' +
        '<div class="lg-ic">🔒</div>' +
        '<h1 class="page-title">This phase is still locked</h1>' +
        '<p class="page-sub">The expedition unlocks one phase at a time. Finish <b>' +
          prevLabel + '</b> first — it\'s currently at ' + pct + '%.</p>' +
        '<div class="btn-row"><a class="btn-primary" style="text-decoration:none;display:inline-block" href="' +
          prevHref + '">Go to ' + prevLabel + '</a></div>' +
      '</div></div>';
    return true;   // caller should stop rendering
  }

  window.Nav = {
    init: init,
    updateProgressBar: updateProgressBar,
    isPhaseLocked: isPhaseLocked,
    guardPhase: guardPhase,
    PHASE_ORDER: PHASE_ORDER
  };
})();
