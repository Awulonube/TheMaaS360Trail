/* =====================================================================
   profile.js — identity + timeline state for the expedition.
   Separate from progress.js so that "Reset Progress" (which clears the
   expedition_ prefix) can restart the timeline WITHOUT erasing who the
   hire is or their EmailJS config.

   Storage keys:
     exp_profile                      -> identity + EmailJS config (survives reset)
     expedition_timing_{phaseId}      -> per-phase timing/notification state (cleared on reset)

   Timeline model (chosen: "auto-start each phase"):
     - A phase's clock starts the first time it is unlocked (startedAt).
     - Target duration is 7 days (PHASE_DURATION_DAYS).
     - Midweek checkpoint fires MIDWEEK_DAYS (3.5) days after start.
   ===================================================================== */
(function () {
  "use strict";

  var PROFILE_KEY = "exp_profile";
  var TIMING_PREFIX = "expedition_timing_";
  var DAY_MS = 24 * 60 * 60 * 1000;

  var PHASE_DURATION_DAYS = 7;   // ~one week per phase
  var MIDWEEK_DAYS = 3.5;        // midweek checkup

  function freshProfile() {
    return {
      name: "",
      personalEmail: "",
      managerEmail: "",
      createdAt: null
    };
  }

  function getProfile() {
    try {
      var raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return freshProfile();
      var p = JSON.parse(raw);
      var base = freshProfile();
      base.name = p.name || "";
      base.personalEmail = p.personalEmail || "";
      base.managerEmail = p.managerEmail || "";
      base.createdAt = p.createdAt || null;
      return base;
    } catch (e) {
      return freshProfile();
    }
  }

  function saveProfile(patch) {
    var current = getProfile();
    for (var k in patch) {
      if (!Object.prototype.hasOwnProperty.call(patch, k)) continue;
      current[k] = patch[k];
    }
    if (!current.createdAt) current.createdAt = new Date().toISOString();
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(current)); } catch (e) {}
    return current;
  }

  function isConfigured() {
    var p = getProfile();
    return !!(p.name && p.personalEmail && p.managerEmail);
  }

  /* ---------- per-phase timing ---------- */

  function freshTiming() {
    return {
      startedAt: null,        // ISO string; set when phase first unlocked
      completedAt: null,      // ISO string; set when phase hits 100%
      completeNotified: false,
      midweekNotified: false
    };
  }

  function timingKey(phaseId) { return TIMING_PREFIX + phaseId; }

  function getTiming(phaseId) {
    try {
      var raw = localStorage.getItem(timingKey(phaseId));
      if (!raw) return freshTiming();
      var t = JSON.parse(raw);
      var base = freshTiming();
      base.startedAt = t.startedAt || null;
      base.completedAt = t.completedAt || null;
      base.completeNotified = !!t.completeNotified;
      base.midweekNotified = !!t.midweekNotified;
      return base;
    } catch (e) {
      return freshTiming();
    }
  }

  function setTiming(phaseId, patch) {
    var current = getTiming(phaseId);
    for (var k in patch) {
      if (Object.prototype.hasOwnProperty.call(patch, k)) current[k] = patch[k];
    }
    try { localStorage.setItem(timingKey(phaseId), JSON.stringify(current)); } catch (e) {}
    return current;
  }

  // Mark a phase as started if it hasn't been already. Returns timing.
  function ensureStarted(phaseId) {
    var t = getTiming(phaseId);
    if (!t.startedAt) t = setTiming(phaseId, { startedAt: new Date().toISOString() });
    return t;
  }

  // Derived dates for a phase (or nulls if not started).
  function getSchedule(phaseId) {
    var t = getTiming(phaseId);
    if (!t.startedAt) {
      return { started: null, midweek: null, due: null, midweekDue: false, overdue: false, daysLeft: null };
    }
    var start = new Date(t.startedAt).getTime();
    var midweek = start + MIDWEEK_DAYS * DAY_MS;
    var due = start + PHASE_DURATION_DAYS * DAY_MS;
    var now = Date.now();
    return {
      started: new Date(start),
      midweek: new Date(midweek),
      due: new Date(due),
      midweekDue: now >= midweek,
      overdue: now >= due && !t.completedAt,
      daysLeft: Math.ceil((due - now) / DAY_MS)
    };
  }

  window.Profile = {
    PHASE_DURATION_DAYS: PHASE_DURATION_DAYS,
    MIDWEEK_DAYS: MIDWEEK_DAYS,
    getProfile: getProfile,
    saveProfile: saveProfile,
    isConfigured: isConfigured,
    getTiming: getTiming,
    setTiming: setTiming,
    ensureStarted: ensureStarted,
    getSchedule: getSchedule
  };
})();
