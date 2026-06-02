import fs from "node:fs";
import path from "node:path";

type NewmanFailure = {
  source?: {
    name?: string;
  };
  error?: {
    name?: string;
    message?: string;
    test?: string;
  };
  parent?: {
    name?: string;
  };
};

type NewmanReport = {
  run?: {
    stats?: {
      requests?: {
        total?: number;
        failed?: number;
      };
      assertions?: {
        total?: number;
        failed?: number;
      };
    };
    failures?: NewmanFailure[];
  };
};

const reportsDir = path.resolve("reports");

const reportFiles = fs
  .readdirSync(reportsDir)
  .filter((file) => file.endsWith("-newman-report.json"))
  .sort();

function safe(value: unknown): string {
  if (value === undefined || value === null || value === "") return "N/A";
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function readReport(file: string): NewmanReport {
  const filePath = path.join(reportsDir, file);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as NewmanReport;
}

const lines: string[] = [];

lines.push("# FitCall Newman Execution Summary");
lines.push("");
lines.push("Product: FitCall.me");
lines.push("Team: Personal Trainer");
lines.push("Environment: Staging");
lines.push("");

lines.push("## Report Summary");
lines.push("");
lines.push("| Report | Requests Total | Requests Failed | Assertions Total | Assertions Failed | Status |");
lines.push("|---|---:|---:|---:|---:|---|");

let totalRequests = 0;
let failedRequests = 0;
let totalAssertions = 0;
let failedAssertions = 0;

const allFailures: Array<{
  report: string;
  parent: string;
  request: string;
  test: string;
  error: string;
}> = [];

for (const file of reportFiles) {
  const report = readReport(file);
  const stats = report.run?.stats;
  const failures = report.run?.failures || [];

  const requestsTotal = stats?.requests?.total || 0;
  const requestsFailed = stats?.requests?.failed || 0;
  const assertionsTotal = stats?.assertions?.total || 0;
  const assertionsFailed = stats?.assertions?.failed || 0;

  totalRequests += requestsTotal;
  failedRequests += requestsFailed;
  totalAssertions += assertionsTotal;
  failedAssertions += assertionsFailed;

  const status = requestsFailed > 0 || assertionsFailed > 0 ? "Failed / Review Needed" : "Passed";

  lines.push(
    `| ${file} | ${requestsTotal} | ${requestsFailed} | ${assertionsTotal} | ${assertionsFailed} | ${status} |`
  );

  for (const failure of failures) {
    allFailures.push({
      report: file,
      parent: safe(failure.parent?.name),
      request: safe(failure.source?.name),
      test: safe(failure.error?.test),
      error: safe(failure.error?.message)
    });
  }
}

lines.push("");
lines.push("## Overall Totals");
lines.push("");
lines.push("| Metric | Count |");
lines.push("|---|---:|");
lines.push(`| Requests Total | ${totalRequests} |`);
lines.push(`| Requests Failed | ${failedRequests} |`);
lines.push(`| Assertions Total | ${totalAssertions} |`);
lines.push(`| Assertions Failed | ${failedAssertions} |`);
lines.push(`| Failure Records | ${allFailures.length} |`);

lines.push("");
lines.push("## Failure Details");
lines.push("");

if (allFailures.length === 0) {
  lines.push("No failures recorded.");
} else {
  lines.push("| No. | Report | Folder / Parent | Request | Test | Error |");
  lines.push("|---:|---|---|---|---|---|");

  allFailures.forEach((failure, index) => {
    lines.push(
      `| ${index + 1} | ${failure.report} | ${failure.parent} | ${failure.request} | ${failure.test} | ${failure.error} |`
    );
  });
}

const outputPath = path.join(reportsDir, "newman-execution-summary.md");
fs.writeFileSync(outputPath, lines.join("\n"), "utf8");

console.log("Aggregate summary generated.");
console.log(`Reports processed: ${reportFiles.length}`);
console.log("Output: reports/newman-execution-summary.md");