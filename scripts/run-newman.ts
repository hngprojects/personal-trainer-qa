import newman from "newman";
import path from "node:path";
import process from "node:process";

type RunMode = "full" | "folder";
type CollectionType = "source" | "chain";

interface CliArgs {
  mode: RunMode;
  folderName?: string;
  reportName: string;
  collectionType: CollectionType;
}

interface NewmanStatsBlock {
  total: number;
  failed: number;
}

interface NewmanRunStats {
  requests: NewmanStatsBlock;
  assertions: NewmanStatsBlock;
}

const collections: Record<CollectionType, string> = {
  source: "postman/Personal-Trainer-Staging.postman_collection.json",
  chain: "postman/FitCall-MVP-Chained.postman_collection.json"
};

function parseCollectionType(value: string | undefined): CollectionType {
  if (!value) return "source";

  if (value === "source" || value === "chain") {
    return value;
  }

  console.error(`Unknown collection type: ${value}`);
  console.error("Allowed collection types: source, chain");
  process.exit(1);
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const modeArg = args[0] as RunMode | undefined;

  if (!modeArg || modeArg === "full") {
    return {
      mode: "full",
      reportName: args[1] || "latest-newman-report",
      collectionType: parseCollectionType(args[2])
    };
  }

  if (modeArg === "folder") {
    const folderName = args[1];
    const reportName = args[2];
    const collectionType = parseCollectionType(args[3]);

    if (!folderName) {
      console.error('Missing folder name. Example: pnpm test:folder -- "00 - Smoke and Public Checks" smoke-newman-report chain');
      process.exit(1);
    }

    return {
      mode: "folder",
      folderName,
      reportName: reportName || "folder-newman-report",
      collectionType
    };
  }

  console.error(`Unknown mode: ${modeArg}`);
  console.error("Allowed modes: full, folder");
  process.exit(1);
}

function runNewman(args: CliArgs): void {
  const collection = path.resolve(collections[args.collectionType]);
  const environment = path.resolve("postman/staging.postman_environment.json");
  const reportPath = path.resolve("reports", `${args.reportName}.json`);

  const options: newman.NewmanRunOptions = {
    collection,
    environment,
    delayRequest: 1000,
    reporters: ["cli", "json"],
    reporter: {
      json: {
        export: reportPath
      }
    }
  };

  if (args.mode === "folder" && args.folderName) {
    options.folder = args.folderName;
  }

  console.log("Starting FitCall Newman regression run...");
  console.log(`Mode: ${args.mode}`);
  console.log(`Collection type: ${args.collectionType}`);
  console.log(`Collection: ${collection}`);
  console.log(`Environment: ${environment}`);
  console.log(`Folder: ${args.folderName || "Full collection"}`);
  console.log(`Report: ${reportPath}`);

  newman.run(options, (error, summary) => {
    if (error) {
      console.error("Newman runner failed:");
      console.error(error);
      process.exit(1);
    }

    const stats = summary.run.stats as NewmanRunStats;

    console.log("");
    console.log("Regression run completed.");
    console.log(`Requests total: ${stats.requests.total}`);
    console.log(`Requests failed: ${stats.requests.failed}`);
    console.log(`Assertions total: ${stats.assertions.total}`);
    console.log(`Assertions failed: ${stats.assertions.failed}`);
    console.log(`Report saved: ${reportPath}`);

    if (stats.requests.failed > 0 || stats.assertions.failed > 0) {
      process.exit(1);
    }

    process.exit(0);
  });
}

const args = parseArgs();
runNewman(args);