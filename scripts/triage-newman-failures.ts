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
    failures?: NewmanFailure[];
  };
};

const reportsDir = path.resolve("reports");

const excludedReports = new Set([
  "latest-newman-report.json",
  "chain-newman-report.json"
]);

const reportFiles = fs
  .readdirSync(reportsDir)
  .filter((file) => file.endsWith("-newman-report.json"))
  .filter((file) => !excludedReports.has(file))
  .sort();

function safe(value: unknown): string {
  if (value === undefined || value === null || value === "") return "N/A";
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function classifyFailure(input: string): {
  classification: string;
  action: string;
} {
  const text = input.toLowerCase();

  if (text.includes("401") || text.includes("unauthorized") || text.includes("token")) {
    return {
      classification: "Blocked - credentials or role token needed",
      action: "Do not log as product bug until valid role credential is provided."
    };
  }

  if (text.includes("429") || text.includes("too many requests")) {
    return {
      classification: "Blocked - staging rate limit",
      action: "Do not log as product bug unless rate limit policy itself is under test."
    };
  }

  if (text.includes("404") && (text.includes("session") || text.includes("booking") || text.includes("subscription"))) {
    return {
      classification: "Blocked - seed data needed",
      action: "Needs valid booking, session, subscription, or seeded record."
    };
  }

  if (text.includes("payment") || text.includes("receipt") || text.includes("iap") || text.includes("subscription")) {
    return {
      classification: "Blocked - payment/subscription setup needed",
      action: "Do not log as product bug until payment setup or test receipt is available."
    };
  }

  if (text.includes("expected response to have status code") || text.includes("expected") || text.includes("assertionerror")) {
    return {
      classification: "Review - possible assertion mismatch or product bug",
      action: "Check whether test expectation matches current API contract. Log bug only if valid data was used."
    };
  }

  return {
    classification: "Review",
    action: "Manual review required."
  };
}

const lines: string[] = [];

lines.push("# FitCall Newman Failure Triage");
lines.push("");
lines.push("Product: FitCall.me");
lines.push("Team: Personal Trainer");
lines.push("Environment: Staging");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("This triage excludes duplicate full-run reports:");
lines.push("");
lines.push("- latest-newman-report.json");
lines.push("- chain-newman-report.json");
lines.push("");
lines.push("The triage focuses on the targeted folder and chain execution reports.");
lines.push("");

lines.push("## Failure Triage Table");
lines.push("");
lines.push("| No. | Report | Folder / Parent | Request | Test | Error | Classification | Recommended Action |");
lines.push("|---:|---|---|---|---|---|---|---|");

let count = 0;

const classificationCounts = new Map<string, number>();

for (const file of reportFiles) {
  const filePath = path.join(reportsDir, file);
  const report = JSON.parse(fs.readFileSync(filePath, "utf8")) as NewmanReport;
  const failures = report.run?.failures || [];

  for (const failure of failures) {
    count += 1;

    const combined = [
      failure.parent?.name,
      failure.source?.name,
      failure.error?.test,
      failure.error?.message
    ]
      .filter(Boolean)
      .join(" ");

    const triage = classifyFailure(combined);

    classificationCounts.set(
      triage.classification,
      (classificationCounts.get(triage.classification) || 0) + 1
    );

    lines.push(
      `| ${count} | ${safe(file)} | ${safe(failure.parent?.name)} | ${safe(failure.source?.name)} | ${safe(failure.error?.test)} | ${safe(failure.error?.message)} | ${safe(triage.classification)} | ${safe(triage.action)} |`
    );
  }
}

lines.push("");
lines.push("## Classification Summary");
lines.push("");
lines.push("| Classification | Count |");
lines.push("|---|---:|");

for (const [classification, value] of [...classificationCounts.entries()].sort()) {
  lines.push(`| ${classification} | ${value} |`);
}

lines.push("");
lines.push("## Total Failure Records Reviewed");
lines.push("");
lines.push(`Total: ${count}`);

const outputPath = path.join(reportsDir, "newman-failure-triage.md");
fs.writeFileSync(outputPath, lines.join("\n"), "utf8");

console.log("Failure triage generated.");
console.log(`Reports processed: ${reportFiles.length}`);
console.log(`Failure records reviewed: ${count}`);
console.log("Output: reports/newman-failure-triage.md");