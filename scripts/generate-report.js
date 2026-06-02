#!/usr/bin/env node
/**
 * Generate reports/test-execution-report.md from reports/latest-newman-report.json.
 *
 * Called automatically by scripts/run.js after each run (pass or fail), and can
 * be run standalone to regenerate from the last JSON:
 *
 *   node scripts/generate-report.js
 *   pnpm report
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'reports', 'latest-newman-report.json');
const OUT_PATH = path.join(ROOT, 'reports', 'test-execution-report.md');

function fmtMs(ms) {
  if (ms == null || isNaN(ms)) return 'n/a';
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function firstLine(s) {
  return String(s == null ? '' : s).split('\n')[0].trim();
}

/** Walk the collection tree, mapping each request item id -> its top-level folder name. */
function buildFolderMap(items, topName, map) {
  for (const it of items || []) {
    if (Array.isArray(it.item)) {
      buildFolderMap(it.item, topName || it.name, map);
    } else if (it.id) {
      map[it.id] = topName || '(root)';
    }
  }
}

function generateReport() {
  if (!fs.existsSync(JSON_PATH)) {
    console.error(`✖ No Newman JSON at ${path.relative(ROOT, JSON_PATH)} — run the suite first.`);
    return false;
  }

  let report;
  try {
    report = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  } catch (e) {
    console.error(`✖ Could not parse ${path.relative(ROOT, JSON_PATH)}: ${e.message}`);
    return false;
  }

  const run = report.run;
  if (!run || !run.stats) {
    console.error('✖ JSON has no run data yet (empty report?). Run the suite first.');
    return false;
  }

  const stats = run.stats;
  const timings = run.timings || {};
  const collectionName = (report.collection && report.collection.info && report.collection.info.name) ||
    (report.collection && report.collection.name) || 'Unknown collection';
  const envName = (report.environment && report.environment.name) || 'No environment';

  const completed = timings.completed ? new Date(timings.completed) : null;
  const duration = (timings.started && timings.completed) ? timings.completed - timings.started : null;

  // Per-folder rollup of assertions.
  const folderMap = {};
  buildFolderMap((report.collection && report.collection.item) || [], null, folderMap);

  const folders = {}; // name -> { requests, aTotal, aFailed }
  let erroredRequests = 0;
  for (const ex of run.executions || []) {
    const folder = folderMap[ex.item && ex.item.id] || '(ungrouped)';
    if (!folders[folder]) folders[folder] = { requests: 0, aTotal: 0, aFailed: 0 };
    folders[folder].requests += 1;
    if (!ex.response) erroredRequests += 1;
    for (const a of ex.assertions || []) {
      folders[folder].aTotal += 1;
      if (a.error) folders[folder].aFailed += 1;
    }
  }

  const a = stats.assertions || { total: 0, failed: 0, pending: 0 };
  const aPassed = a.total - a.failed - (a.pending || 0);
  const overallStatus = a.failed > 0 ? '❌ FAIL' : '✅ PASS';

  // ---- Build markdown ----
  const L = [];
  L.push('# Test Execution Report');
  L.push('');
  L.push('> Auto-generated from `reports/latest-newman-report.json` by `scripts/generate-report.js`.');
  L.push('> Re-run `pnpm test:env` (or `pnpm report`) to refresh. Do not edit by hand.');
  L.push('');

  L.push('## Latest run');
  L.push('');
  L.push('| Field | Value |');
  L.push('| --- | --- |');
  L.push(`| Result | **${overallStatus}** |`);
  L.push(`| Completed | ${completed ? completed.toISOString() : 'n/a'} |`);
  L.push(`| Collection | ${collectionName} |`);
  L.push(`| Environment | ${envName} |`);
  L.push(`| Total duration | ${fmtMs(duration)} |`);
  L.push(`| Avg response time | ${fmtMs(timings.responseAverage)} (min ${fmtMs(timings.responseMin)}, max ${fmtMs(timings.responseMax)}) |`);
  L.push('');

  L.push('## Results');
  L.push('');
  L.push('| Metric | Total | Failed | Passed |');
  L.push('| --- | --- | --- | --- |');
  L.push(`| Iterations | ${stats.iterations.total} | ${stats.iterations.failed} | ${stats.iterations.total - stats.iterations.failed} |`);
  L.push(`| Requests | ${stats.requests.total} | ${stats.requests.failed} | ${stats.requests.total - stats.requests.failed} |`);
  L.push(`| Test scripts | ${stats.testScripts.total} | ${stats.testScripts.failed} | ${stats.testScripts.total - stats.testScripts.failed} |`);
  L.push(`| Assertions | ${a.total} | ${a.failed} | ${aPassed} |`);
  L.push('');
  if (erroredRequests > 0) {
    L.push(`> ⚠️ ${erroredRequests} request(s) errored before sending (e.g. empty URL from an unset variable).`);
    L.push('');
  }

  // Per-folder table
  L.push('## Per-folder breakdown');
  L.push('');
  L.push('| Folder | Requests | Assertions | Passed | Failed |');
  L.push('| --- | --- | --- | --- | --- |');
  for (const name of Object.keys(folders)) {
    const f = folders[name];
    const mark = f.aFailed > 0 ? ' ❌' : '';
    L.push(`| ${name}${mark} | ${f.requests} | ${f.aTotal} | ${f.aTotal - f.aFailed} | ${f.aFailed} |`);
  }
  L.push('');

  // Failures
  const failures = run.failures || [];
  L.push(`## Failures (${failures.length})`);
  L.push('');
  if (failures.length === 0) {
    L.push('🎉 No failures.');
  } else {
    L.push('| # | Folder | Request | Assertion | Detail |');
    L.push('| --- | --- | --- | --- | --- |');
    failures.forEach((f, i) => {
      const folder = (f.parent && f.parent.name) || '(root)';
      const request = (f.source && f.source.name) || '(unknown)';
      const test = (f.error && (f.error.test || f.error.name)) || '';
      const detail = firstLine(f.error && f.error.message).replace(/\|/g, '\\|');
      L.push(`| ${i + 1} | ${folder} | ${request} | ${test.replace(/\|/g, '\\|')} | ${detail} |`);
    });
  }
  L.push('');

  fs.writeFileSync(OUT_PATH, L.join('\n') + '\n', 'utf8');
  console.log(`✔ Wrote ${path.relative(ROOT, OUT_PATH)} — ${overallStatus} (${a.failed}/${a.total} assertions failed)`);
  return true;
}

// Run as CLI when invoked directly.
if (require.main === module) {
  const ok = generateReport();
  process.exit(ok ? 0 : 1);
}

module.exports = { generateReport };
