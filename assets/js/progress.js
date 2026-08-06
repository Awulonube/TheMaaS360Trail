/* =====================================================================
   progress.js — the ONLY module that touches localStorage.
   window.Progress public API (see build plan §8).
   State key:  expedition_task_{phaseId}_{taskId}
   State shape: { learnPanelsOpened:[], practiceSteps:[], assessScore:null,
                  reflectionMarked:false, sectionsComplete:[] }
   assessScore is a FRACTION in [0,1].
   ===================================================================== */
(function () {
  "use strict";

  var KEY_PREFIX = "expedition_";
  var SECTIONS = ["learn", "practice", "assess", "apply"];

  function keyFor(phaseId, taskId) {
    return KEY_PREFIX + "task_" + phaseId + "_" + taskId;
  }

  function freshState() {
    return {
      learnPanelsOpened: [],
      practiceSteps: [],
      assessScore: null,
      reflectionMarked: false,
      sectionsComplete: []
    };
  }

  function getTaskState(phaseId, taskId) {
    try {
      var raw = localStorage.getItem(keyFor(phaseId, taskId));
      if (!raw) return freshState();
      var parsed = JSON.parse(raw);
      var base = freshState();
      // merge to guarantee all fields exist
      base.learnPanelsOpened = parsed.learnPanelsOpened || [];
      base.practiceSteps = parsed.practiceSteps || [];
      base.assessScore = (typeof parsed.assessScore === "number") ? parsed.assessScore : null;
      base.reflectionMarked = !!parsed.reflectionMarked;
      base.sectionsComplete = parsed.sectionsComplete || [];
      return base;
    } catch (e) {
      return freshState();
    }
  }

  function setTaskState(phaseId, taskId, patch) {
    var current = getTaskState(phaseId, taskId);
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) current[k] = patch[k];
    }
    try {
      localStorage.setItem(keyFor(phaseId, taskId), JSON.stringify(current));
    } catch (e) { /* storage may be unavailable; degrade silently */ }
    return current;
  }

  function isComplete(state) {
    return state.sectionsComplete.length === SECTIONS.length;
  }

  function getCardStatus(state) {
    if (!state || state.sectionsComplete.length === 0) return "not-started";
    if (isComplete(state)) return "complete";
    return "in-progress";
  }

  function getPhaseProgress(phaseId, taskIds) {
    var total = taskIds.length;
    var completed = 0;
    for (var i = 0; i < taskIds.length; i++) {
      if (isComplete(getTaskState(phaseId, taskIds[i]))) completed++;
    }
    return { completed: completed, total: total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function getGlobalProgress(allPhasesMap) {
    var completed = 0, total = 0;
    for (var phaseId in allPhasesMap) {
      if (!Object.prototype.hasOwnProperty.call(allPhasesMap, phaseId)) continue;
      var ids = allPhasesMap[phaseId];
      total += ids.length;
      for (var i = 0; i < ids.length; i++) {
        if (isComplete(getTaskState(phaseId, ids[i]))) completed++;
      }
    }
    return { completed: completed, total: total, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  function resetAllProgress() {
    var toRemove = [];
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i);
      if (k && k.indexOf(KEY_PREFIX) === 0) toRemove.push(k);
    }
    toRemove.forEach(function (k) { localStorage.removeItem(k); });
  }

  window.Progress = {
    SECTIONS: SECTIONS,
    getTaskState: getTaskState,
    setTaskState: setTaskState,
    getCardStatus: getCardStatus,
    getPhaseProgress: getPhaseProgress,
    getGlobalProgress: getGlobalProgress,
    resetAllProgress: resetAllProgress,
    isComplete: isComplete
  };
})();
