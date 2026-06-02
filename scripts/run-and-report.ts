import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

/**
 * Orchestrates a full QA run: executes the configured suites, summarizes each
 * report, then aggregates everything into reports/newman-execution-summary.md.
 *
 * Runs each TS script with the current `node` binary (Node >= 23.6 strips types
 * natively), so it does not depend on tsx/esbuild. Per-suite failures do NOT
 * abort the run — the runner exits non-zero when assertions fail, and we want
 * the summarize + aggregate steps to run regardless so a report is always produced.
 *
 * Usage:
 *   node scripts/run-and-report.ts            # source + chain (default)
 *   node scripts/run-and-report.ts chain      # chain only
 *   node scripts/run-and-report.ts source     # source only
 */
const ROOT = path.resolve(import.meta.dirname, "..");
const RUNNER = path.join("scripts", "run-newman.ts");
const SUMMARIZE = path.join("scripts", "summarize-newman-report.ts");
const AGGREGATE = path.join("scripts", "aggregate-newman-summaries.ts");

// suite key -> [runner args..., reportName]
const SUITES: Record<string, { args: string[]; report: string }> = {
  source: { args: ["full", "latest-newman-report", "source"], report: "latest-newman-report" },
  chain: { args: ["full", "chain-newman-report", "chain"], report: "chain-newman-report" }
};

function run(label: string, args: string[]): number {
  console.log(`\n=== ${label} ===`);
  const result = spawnSync(process.execPath, args, { stdio: "inherit", cwd: ROOT });
  return result.status ?? 0;
}

const selected = process.argv[2];
const suiteKeys = selected && SUITES[selected] ? [selected] : Object.keys(SUITES);

let anyFailed = false;
for (const key of suiteKeys) {
  const code = run(`Running ${key} suite`, [RUNNER, ...SUITES[key].args]);
  if (code !== 0) anyFailed = true;
}

for (const key of suiteKeys) {
  run(`Summarizing ${key}`, [SUMMARIZE, path.join("reports", `${SUITES[key].report}.json`)]);
}

run("Aggregating reports", [AGGREGATE]);

console.log("\nDone. Aggregated report: reports/newman-execution-summary.md");
console.log(anyFailed ? "(some assertions failed — see the summaries)" : "(all suites passed)");
