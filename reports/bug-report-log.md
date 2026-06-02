# Bug report summary

No credential-dependent, setup-dependent, or seed-data-dependent failures should be logged as confirmed product bugs until the required credentials and data are available.

Current confirmed categories:

Credential or role-token blockers
Staging rate-limit blockers
Request contract review items
Possible assertion mismatches
Possible product bugs requiring manual verification

Potential issues requiring review are documented in:

reports/review-failures-to-check.md

Confirmed bugs, once validated, should be logged in:

reports/bug-report-log.md

Each confirmed bug should include:

Bug ID
Linked test case ID
Requirement ID
Milestone
Feature
Severity
Steps to reproduce
Expected result
Actual result
Evidence
Status
How To Run The Regression Suite

Install dependencies:

pnpm install

Regenerate the chain-focused Postman collection:

pnpm build:chain-collection

Run all focused chain tests with summaries:

pnpm test:chains:with-summaries

Generate aggregate execution summary only:

pnpm aggregate:reports

Generate failure triage only:

pnpm triage:reports

Generate review failures list:

pnpm extract:review-failures
Main Evidence Files For Review
File	Purpose
reports/test-execution-report.md	Final test execution status table
reports/bug-report-log.md	Bug report log for confirmed defects
reports/mvp-coverage-summary.md	MVP coverage and blocker summary
reports/newman-execution-summary.md	Consolidated Newman execution result
reports/newman-failure-triage.md	Failure classification and recommended action
reports/review-failures-to-check.md	Review-only failures that may need manual classification
docs/traceability-matrix.md	Requirement to test case to execution to bug mapping
docs/chained-api-tests.md	API chaining design
docs/chain-run-plan.md	Execution order and command plan
Final Notes

The regression framework is implemented and executable.

The suite supports:

CLI execution
Postman/Newman automation
Chain-focused API regression
JSON report generation
Markdown report summaries
Failure triage
MVP coverage documentation
Traceability documentation

Full MVP validation is currently limited by unavailable staging credentials, missing role-specific tokens, missing OTP access, missing seeded booking/session data, and unavailable subscription/payment setup.

Blocked tests are documented as blockers, not product bugs.
