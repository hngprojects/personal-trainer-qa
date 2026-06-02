import fs from "node:fs";
import path from "node:path";
import process from "node:process";

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
      testScripts?: {
        total?: number;
        failed?: number;
      };
      prerequestScripts?: {
        total?: number;
        failed?: number;
      };
    };
    failures?: NewmanFailure[];
  };
};

function readJson(filePath: string): NewmanReport {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Report file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as NewmanReport;
}

function safe(value: unknown): string {
  if (value === undefined || value === null || value === "") return "N/A";
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function main(): void {
  const reportArg = process.argv[2];

  if (!reportArg) {
    console.error("Usage: pnpm summarize:report reports/report-name.json");
    process.exit(1);
  }

  const reportPath = path.resolve(reportArg);
  const report = readJson(reportPath);

  const stats = report.run?.stats;
  const failures = report.run?.failures || [];

  const outputPath = reportPath.replace(/\.json$/i, ".summary.md");

  const lines: string[] = [];

  lines.push(`# Newman Report Summary`);
  lines.push("");
  lines.push(`Report file: ${path.relative(process.cwd(), reportPath)}`);
  lines.push("");

  lines.push("## Summary");
  lines.push("");
  lines.push("| Metric | Total | Failed |");
  lines.push("|---|---:|---:|");
  lines.push(`| Requests | ${stats?.requests?.total ?? 0} | ${stats?.requests?.failed ?? 0} |`);
  lines.push(`| Assertions | ${stats?.assertions?.total ?? 0} | ${stats?.assertions?.failed ?? 0} |`);
  lines.push(`| Test Scripts | ${stats?.testScripts?.total ?? 0} | ${stats?.testScripts?.failed ?? 0} |`);
  lines.push(`| Prerequest Scripts | ${stats?.prerequestScripts?.total ?? 0} | ${stats?.prerequestScripts?.failed ?? 0} |`);
  lines.push("");

  lines.push("## Failures");
  lines.push("");

  if (failures.length === 0) {
    lines.push("No failures recorded.");
  } else {
    lines.push("| No. | Folder / Parent | Request | Test | Error |");
    lines.push("|---:|---|---|---|---|");

    failures.forEach((failure, index) => {
      lines.push(
        `| ${index + 1} | ${safe(failure.parent?.name)} | ${safe(failure.source?.name)} | ${safe(failure.error?.test)} | ${safe(failure.error?.message)} |`
      );
    });
  }

  lines.push("");

  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");

  console.log("Summary generated.");
  console.log(`Input: ${path.relative(process.cwd(), reportPath)}`);
  console.log(`Output: ${path.relative(process.cwd(), outputPath)}`);
  console.log(`Failures: ${failures.length}`);
}

main();