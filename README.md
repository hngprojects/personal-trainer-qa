# Personal Trainer — QA Suite

API regression QA for the Personal Trainer (FitCall) **staging** environment.
Tests are authored in Postman and executed headlessly with [Newman](https://github.com/postmanlabs/newman).

## Prerequisites

- Node.js (LTS)
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
cp .env.example .env   # then fill in staging credentials / base URL
```

## Running the regression suite

```bash
# Run with CLI output only
pnpm test

# Run and export a JSON report to reports/latest-newman-report.json
pnpm test:report

# Run the full regression script
pnpm regression
```

## Project structure

```
personal-trainer-qa/
├── postman/      # Postman collection + environment files
├── reports/      # Test execution reports, bug logs, coverage summaries
├── docs/         # Route inventory, coverage & traceability matrices
└── scripts/      # Automation scripts (Newman regression runner)
```

## Reports & docs

| File | Purpose |
| --- | --- |
| `reports/test-execution-report.md` | Human-readable run results |
| `reports/bug-report-log.md` | Defects found during testing |
| `reports/mvp-coverage-summary.md` | MVP feature coverage overview |
| `docs/route-inventory.md` | Catalog of API routes under test |
| `docs/regression-coverage-matrix.md` | Routes vs. regression test cases |
| `docs/traceability-matrix.md` | Requirements ↔ test case mapping |
| `docs/known-blockers.md` | Open blockers preventing full coverage |
