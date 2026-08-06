/* =====================================================================
   export.js — one-way dump of the CURRENT assets/data/*-data.js into
   editable Markdown at content/<phase>.md.

   Run:  node content/tools/export.js            (writes all phases)
         node content/tools/export.js phase1     (single phase)

   This OVERWRITES content/*.md, so it is normally run once to seed the
   files. After that, edit the Markdown and use build.js to go the other
   way. Pass --force to overwrite existing files.
   ===================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const { serializePhase } = require("./format.js");

const ROOT = path.resolve(__dirname, "..", "..");
const DATA_DIR = path.join(ROOT, "assets", "data");
const OUT_DIR = path.join(ROOT, "content");

const PHASES = ["essentials", "phase1", "phase2", "phase3", "phase4", "phase5", "phase6", "phase7", "phase8"];

function varNameFor(phase) {
  return (phase === "essentials" ? "ESSENTIALS" : phase.toUpperCase()) + "_DATA";
}

function loadPhaseData(phase) {
  const file = path.join(DATA_DIR, phase + "-data.js");
  const src = fs.readFileSync(file, "utf8");
  const sandbox = { window: {} };
  // The data files assign to window.X_DATA; eval in a tiny scope.
  const fn = new Function("window", src + "\nreturn window;");
  const w = fn(sandbox.window);
  const data = w[varNameFor(phase)];
  if (!data) throw new Error("Could not find " + varNameFor(phase) + " in " + file);
  return data;
}

function main() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const only = args.filter(a => !a.startsWith("--"));
  const list = only.length ? only : PHASES;

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  let written = 0, skipped = 0;
  for (const phase of list) {
    const outFile = path.join(OUT_DIR, phase + ".md");
    if (fs.existsSync(outFile) && !force) {
      console.log("SKIP   " + phase + ".md already exists (use --force to overwrite)");
      skipped++;
      continue;
    }
    const data = loadPhaseData(phase);
    fs.writeFileSync(outFile, serializePhase(data), "utf8");
    console.log("WRITE  content/" + phase + ".md  (" + data.tasks.length + " tasks)");
    written++;
  }
  console.log("\nDone. " + written + " written, " + skipped + " skipped.");
}

main();
