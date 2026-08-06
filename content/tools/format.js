/* =====================================================================
   format.js — the single source of truth for the authoring Markdown
   format used by content/*.md.

   Exports:
     serializePhase(phaseData)   -> markdown string
     parsePhase(markdown)        -> phase data object (+ .warnings)

   FORMAT (see content/README.md for the human-facing version)
   ---------------------------------------------------------------------
     # <Phase title>
     - id: phase1
     - icon: 🏕️
     - subtitle: ...

     ## <Task title>
     - id: task-x
     - url: phase1/task-x.html
     - status: needs-review | done
     - description: ...

     ### Learn
     #### <Panel title>
     <html body, may span lines>

     ### Practice
     - step one
     - step two

     ### Quiz
     1. <question text>
        - [ ] wrong option
        - [x] correct option
     2. (text) <open-response question>

     ### Apply
     - type: guided | real
     <scenario prose>
   ===================================================================== */
"use strict";

var STATUS_DONE = "done";
var STATUS_REVIEW = "needs-review";

/* ---------------- helpers ---------------- */

// Boilerplate signatures produced by the original generator. Used only to
// pick a default status marker; never alters the content itself.
var BOILERPLATE_PATTERNS = [
  /Learn and practise '.*' as part of/i,
  /is part of Phase \d+ in your MaaS360 onboarding/i,
  /TODO: replace with task-specific summary/i,
  /Open the relevant portal or tool for/i,
  /Guided scenario: a customer situation calls for/i,
  /In the expedition, the '.*' task belongs to which stage\?/i
];

function looksBoilerplate(task) {
  var blob = JSON.stringify(task);
  for (var i = 0; i < BOILERPLATE_PATTERNS.length; i++) {
    if (BOILERPLATE_PATTERNS[i].test(blob)) return true;
  }
  return false;
}

function stripTrailingBlank(lines) {
  while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
  return lines;
}

/* ---------------- serialize (data -> markdown) ---------------- */

function serializePhase(phase) {
  var out = [];
  out.push("# " + phase.title);
  out.push("");
  out.push("- id: " + phase.id);
  out.push("- icon: " + (phase.icon || ""));
  out.push("- subtitle: " + (phase.subtitle || ""));
  out.push("");
  out.push("<!-- Edit freely. Ask Claude to \"rebuild the site from content\" when done. -->");
  out.push("");

  (phase.tasks || []).forEach(function (t) {
    out.push("---");
    out.push("");
    out.push("## " + t.title);
    out.push("");
    out.push("- id: " + t.id);
    out.push("- url: " + t.url);
    out.push("- status: " + (looksBoilerplate(t) ? STATUS_REVIEW : STATUS_DONE));
    out.push("- description: " + (t.description || ""));
    out.push("");

    /* Learn */
    out.push("### Learn");
    out.push("");
    (t.learn || []).forEach(function (p) {
      out.push("#### " + p.title);
      out.push("");
      out.push(p.body || "");
      out.push("");
    });

    /* Practice */
    out.push("### Practice");
    out.push("");
    if (t.practice && t.practice.iframePlaceholder === false) {
      out.push("- iframe: false");
    }
    if (t.practice && t.practice.embedUrl) {
      out.push("- embed: " + t.practice.embedUrl);
    }
    ((t.practice && t.practice.steps) || []).forEach(function (s) {
      out.push("- " + s);
    });
    out.push("");

    /* Quiz */
    out.push("### Quiz");
    out.push("");
    ((t.assess && t.assess.questions) || []).forEach(function (q, i) {
      if (q.type === "text") {
        out.push((i + 1) + ". (text) " + q.question);
        out.push("");
      } else {
        out.push((i + 1) + ". " + q.question);
        (q.options || []).forEach(function (opt, oi) {
          out.push("   - [" + (oi === q.correct ? "x" : " ") + "] " + opt);
        });
        out.push("");
      }
    });

    /* Apply */
    out.push("### Apply");
    out.push("");
    out.push("- type: " + (t.apply && t.apply.isRealScenario ? "real" : "guided"));
    out.push("");
    out.push((t.apply && t.apply.scenario) || "");
    out.push("");
  });

  return stripTrailingBlank(out).join("\n") + "\n";
}

/* ---------------- parse (markdown -> data) ---------------- */

function parsePhase(md) {
  var lines = String(md).replace(/\r\n/g, "\n").split("\n");
  var warnings = [];
  var phase = { id: "", title: "", subtitle: "", icon: "", tasks: [] };

  var task = null;       // current task being built
  var section = null;    // learn | practice | quiz | apply
  var panel = null;      // current learn panel
  var buf = [];          // prose buffer (learn body / apply scenario)
  var q = null;          // current quiz question
  var lineNo = 0;

  function flushPanel() {
    if (panel) {
      panel.body = stripTrailingBlank(buf.slice()).join("\n").trim();
      task.learn.push(panel);
      panel = null;
    }
    buf = [];
  }
  function flushQuestion() {
    if (q) {
      if (q.type === "mc") {
        if (!q.options.length) warnings.push("Question with no options: \"" + q.question + "\"");
        if (q.correct == null) {
          warnings.push("No option marked [x] for: \"" + q.question + "\" — defaulting to the first option.");
          q.correct = 0;
        }
      }
      task.assess.questions.push(q);
      q = null;
    }
  }
  function flushApply() {
    if (task && section === "apply") {
      task.apply.scenario = stripTrailingBlank(buf.slice()).join("\n").trim();
    }
    buf = [];
  }
  function flushSection() {
    if (section === "learn") flushPanel();
    if (section === "quiz") flushQuestion();
    if (section === "apply") flushApply();
    buf = [];
  }
  function flushTask() {
    flushSection();
    if (task) {
      if (!task.id) warnings.push("Task \"" + task.title + "\" has no id — it will be skipped.");
      else phase.tasks.push(task);
      task = null;
    }
  }

  // key/value bullet, e.g. "- id: phase1"
  function kv(line) {
    var m = /^-\s+([a-zA-Z][\w-]*)\s*:\s*(.*)$/.exec(line.trim());
    return m ? { key: m[1].toLowerCase(), val: m[2].trim() } : null;
  }

  for (var i = 0; i < lines.length; i++) {
    var raw = lines[i];
    lineNo = i + 1;
    var line = raw.trim();

    if (/^<!--/.test(line) && /-->$/.test(line)) {
      // standalone comment line: keep it if we're inside prose, else skip
      if (section === "learn" && panel) { buf.push(raw); }
      else if (section === "apply") { buf.push(raw); }
      continue;
    }
    if (line === "---" && section !== "learn" && section !== "apply") continue; // task separator
    if (line === "---" && (section === "learn" || section === "apply")) {
      // a --- inside prose still means separator in our format
      continue;
    }

    /* headings */
    var h1 = /^#\s+(.*)$/.exec(raw);
    var h2 = /^##\s+(.*)$/.exec(raw);
    var h3 = /^###\s+(.*)$/.exec(raw);
    var h4 = /^####\s+(.*)$/.exec(raw);

    if (h4) {
      if (section !== "learn") { warnings.push("Line " + lineNo + ": '#### " + h4[1] + "' outside a ### Learn section — treating as a Learn panel."); section = "learn"; }
      flushPanel();
      panel = { id: "p" + (task.learn.length + 1), title: h4[1].trim(), body: "" };
      buf = [];
      continue;
    }
    if (h3) {
      flushSection();
      var name = h3[1].trim().toLowerCase();
      if (name.indexOf("learn") === 0) section = "learn";
      else if (name.indexOf("practice") === 0) section = "practice";
      else if (name.indexOf("quiz") === 0 || name.indexOf("assess") === 0) section = "quiz";
      else if (name.indexOf("apply") === 0) section = "apply";
      else { warnings.push("Line " + lineNo + ": unknown section '" + h3[1] + "' — ignored."); section = null; }
      continue;
    }
    if (h2) {
      flushTask();
      task = {
        id: "", phaseId: phase.id, title: h2[1].trim(), description: "", url: "",
        learn: [], practice: { iframePlaceholder: true, steps: [] },
        assess: { questions: [] }, apply: { isRealScenario: false, scenario: "" }
      };
      section = null;
      continue;
    }
    if (h1) { phase.title = h1[1].trim(); continue; }

    /* key/value metadata (only when not inside prose) */
    if (!task && kv(line)) {
      var p = kv(line);
      if (p.key === "id") phase.id = p.val;
      else if (p.key === "icon") phase.icon = p.val;
      else if (p.key === "subtitle") phase.subtitle = p.val;
      continue;
    }
    if (task && section === null && kv(line)) {
      var tp = kv(line);
      if (tp.key === "id") { task.id = tp.val; task.phaseId = phase.id; }
      else if (tp.key === "url") task.url = tp.val;
      else if (tp.key === "description") task.description = tp.val;
      else if (tp.key === "status") task.__status = tp.val;
      else warnings.push("Line " + lineNo + ": unknown task field '" + tp.key + "' — ignored.");
      continue;
    }

    /* section bodies */
    if (section === "practice") {
      var pk = kv(line);
      if (pk && pk.key === "iframe") {
        task.practice.iframePlaceholder = !/^false$/i.test(pk.val);
        continue;
      }
      if (pk && pk.key === "embed") {
        task.practice.embedUrl = pk.val;
        continue;
      }
      var sm = /^-\s+(.*)$/.exec(line);
      if (sm) { task.practice.steps.push(sm[1].trim()); continue; }
      if (line === "") continue;
      warnings.push("Line " + lineNo + ": Practice content must be a '- ' bullet — ignored: " + line.slice(0, 60));
      continue;
    }

    if (section === "quiz") {
      var qm = /^(\d+)\.\s+(.*)$/.exec(line);
      if (qm) {
        flushQuestion();
        var body = qm[2].trim();
        var tm = /^\(text\)\s*(.*)$/i.exec(body);
        if (tm) q = { type: "text", question: tm[1].trim() };
        else q = { type: "mc", question: body, options: [], correct: null };
        continue;
      }
      var om = /^-\s*\[([ xX])\]\s*(.*)$/.exec(line);
      if (om) {
        if (!q) { warnings.push("Line " + lineNo + ": option before any question — ignored."); continue; }
        if (q.type === "text") { warnings.push("Line " + lineNo + ": options under a (text) question — ignored."); continue; }
        if (/[xX]/.test(om[1])) {
          if (q.correct != null) warnings.push("Line " + lineNo + ": more than one [x] for \"" + q.question + "\" — using the first.");
          else q.correct = q.options.length;
        }
        q.options.push(om[2].trim());
        continue;
      }
      if (line === "") continue;
      warnings.push("Line " + lineNo + ": unrecognised quiz line — ignored: " + line.slice(0, 60));
      continue;
    }

    if (section === "apply") {
      var ap = kv(line);
      if (ap && ap.key === "type") {
        task.apply.isRealScenario = /^real$/i.test(ap.val);
        continue;
      }
      buf.push(raw);
      continue;
    }

    if (section === "learn") { buf.push(raw); continue; }
    // anything else outside a section is ignored (blank lines, stray notes)
  }

  flushTask();

  // normalise learn panel ids sequentially
  phase.tasks.forEach(function (t) {
    t.learn.forEach(function (pn, idx) { pn.id = "p" + (idx + 1); });
    delete t.__status;
  });

  phase.warnings = warnings;
  return phase;
}

module.exports = { serializePhase: serializePhase, parsePhase: parsePhase, looksBoilerplate: looksBoilerplate };
