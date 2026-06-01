#!/usr/bin/env bash
#
# Run the Personal Trainer staging regression suite with Newman.
# Outputs CLI results and exports a JSON report to reports/latest-newman-report.json.
#
# Usage:
#   ./scripts/run-postman-regression.sh
#
set -euo pipefail

# Resolve repo root (script lives in <root>/scripts)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$ROOT_DIR"

COLLECTION="postman/Personal Trainer — Staging.postman_collection.json"
ENVIRONMENT="postman/staging.postman_environment.json"
REPORT="reports/latest-newman-report.json"

echo "▶ Running regression suite against staging..."
echo "  collection:  $COLLECTION"
echo "  environment: $ENVIRONMENT"

# Prefer the locally installed newman via pnpm/npx; fall back to global.
if command -v pnpm >/dev/null 2>&1; then
  RUNNER="pnpm exec newman"
elif command -v npx >/dev/null 2>&1; then
  RUNNER="npx newman"
else
  RUNNER="newman"
fi

$RUNNER run "$COLLECTION" \
  -e "$ENVIRONMENT" \
  --reporters cli,json \
  --reporter-json-export "$REPORT"

echo "✔ Regression run complete. JSON report: $REPORT"
