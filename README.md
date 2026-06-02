# FitCall QA Regression Suite

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base API URL: https://api.staging.fitcall.me/api/v1

## Overview

This repository contains the QA regression automation setup for the FitCall / Personal Trainer MVP final QA check-in.

It includes:

- Postman API regression collection.
- Chain-focused Postman collection.
- TypeScript Newman runner.
- Focused test commands.
- Report summary generation.
- Consolidated execution summary generation.
- Failure triage generation.
- QA documentation for scope, flows, test cases, traceability, blockers, and coverage.

The goal is to support production-readiness validation around:

- Regression coverage.
- API chaining.
- Automation execution.
- Bug tracking.
- MVP coverage confirmation.
- Traceability between requirements, test cases, execution results, and bugs.

## Source of Truth

The milestone documents are treated as the source of truth for MVP coverage.

The regression scope covers:

- M1: Authentication and trainer supply.
- M2: Trainer discovery and profile.
- M3: Booking and discovery call.
- M4: Session lifecycle and notifications.
- M5: Subscription and payment conversion.

## Repository Structure

```txt
fitcall-qa/
├── docs/
│   ├── automation-scope.md
│   ├── chain-run-plan.md
│   ├── chained-api-tests.md
│   ├── known-blockers.md
│   ├── mvp-flow-map.md
│   ├── regression-coverage-matrix.md
│   ├── route-inventory.md
│   ├── test-cases.md
│   └── traceability-matrix.md
├── postman/
│   ├── Personal-Trainer-Staging.postman_collection.json
│   ├── FitCall-MVP-Chained.postman_collection.json
│   └── staging.postman_environment.json
├── reports/
│   ├── bug-report-log.md
│   ├── mvp-coverage-summary.md
│   └── test-execution-report.md
├── scripts/
│   ├── aggregate-newman-summaries.ts
│   ├── generate-chain-collection.ts
│   ├── run-chain-suite.ts
│   ├── run-newman.ts
│   ├── summarize-newman-report.ts
│   └── triage-newman-failures.ts
├── .env.example
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── README.md
````

## Requirements

Install these before running the project:

- Node.js 20 or later.
    
- pnpm.
    
- Access to the staging API.
    
- Valid staging test credentials where required.
    

Check your Node version:

```bash
node -v
```

Check pnpm:

```bash
pnpm -v
```

## Installation

Install dependencies:

```bash
pnpm install
```

## Environment and Credentials

The Postman environment file is located at:

```txt
postman/staging.postman_environment.json
```

It contains placeholder variables such as:

```txt
base_url
admin_email
admin_password
admin_token
client_email
client_otp
client_token
trainer_token
created_trainer_id
created_booking_id
booking_slot_id
created_client_id
```

Before running full regression, update the Postman environment with valid staging values.

Required values for full execution:

```txt
admin_email
admin_password
client_email
client_otp or client_token
trainer_token
created_trainer_id
created_booking_id
created_session_id, if available
```

Do not commit real credentials.

The following files should remain ignored:

```txt
.env
postman/CREDS.txt
reports/*-newman-report.json
reports/latest-newman-report.json
```

## Postman Collections

This repo uses two Postman collections.

### 1. Source Collection

```txt
postman/Personal-Trainer-Staging.postman_collection.json
```

This is the main staging API collection.

It is organized mostly by endpoint groups, such as:

```txt
Auth
Trainers
Bookings
Sessions
Admin
Notifications
Subscriptions
```

### 2. Chain-Focused Collection

```txt
postman/FitCall-MVP-Chained.postman_collection.json
```

This collection is generated from the source collection and organized around MVP flows.

It includes folders such as:

```txt
00 - Smoke and Public Checks
01 - Admin Trainer Management Chain
02 - Client Onboarding and Trainer Discovery Chain
03 - Discovery Booking Chain
04 - Trainer Availability Chain
05 - Session Lifecycle Chain
06 - Subscription Access Chain
07 - Non-Subscribed Access Restriction Chain
99 - Negative and Security Regression
```

## Regenerate the Chain Collection

If the source Postman collection changes, regenerate the chain-focused collection:

```bash
pnpm build:chain-collection
```

This creates or updates:

```txt
postman/FitCall-MVP-Chained.postman_collection.json
```

## Running Tests

The test runner is written in TypeScript and uses Newman programmatically.

Main runner file:

```txt
scripts/run-newman.ts
```

### Run Full Source Collection

```bash
pnpm test:regression
```

This runs the original source Postman collection.

Report output:

```txt
reports/latest-newman-report.json
```

### Run Full Chain Collection

```bash
pnpm test:chain
```

Report output:

```txt
reports/chain-newman-report.json
```

## Focused Test Commands

Use focused commands when you want to test one area at a time.

### Smoke Checks

```bash
pnpm test:chain:smoke
```

Report output:

```txt
reports/chain-smoke-newman-report.json
```

### Negative and Security Regression

```bash
pnpm test:chain:negative
```

Report output:

```txt
reports/chain-negative-newman-report.json
```

### Auth

```bash
pnpm test:auth
```

Report output:

```txt
reports/auth-newman-report.json
```

### Admin Trainer Chain

```bash
pnpm test:chain:admin-trainer
```

Report output:

```txt
reports/chain-admin-trainer-newman-report.json
```

### Client Discovery Chain

```bash
pnpm test:chain:client-discovery
```

Report output:

```txt
reports/chain-client-discovery-newman-report.json
```

### Discovery Booking Chain

```bash
pnpm test:chain:discovery-booking
```

Report output:

```txt
reports/chain-discovery-booking-newman-report.json
```

### Trainer Availability Chain

```bash
pnpm test:chain:trainer-availability
```

Report output:

```txt
reports/chain-trainer-availability-newman-report.json
```

### Session Lifecycle Chain

```bash
pnpm test:chain:session
```

Report output:

```txt
reports/chain-session-newman-report.json
```

### Subscription Chain

```bash
pnpm test:chain:subscription
```

Report output:

```txt
reports/chain-subscription-newman-report.json
```

### Non-Subscribed Access Restriction Chain

```bash
pnpm test:chain:non-subscribed
```

Report output:

```txt
reports/chain-non-subscribed-newman-report.json
```

## Run All Chain Tests With Summaries

To run all focused chain tests and generate summaries automatically:

```bash
pnpm test:chains:with-summaries
```

This command:

- Runs all focused chain test commands.
    
- Continues execution even if one test fails.
    
- Generates individual markdown summaries.
    
- Generates the consolidated execution summary.
    
- Generates the failure triage report.
    

This is the recommended command for final QA evidence generation.

## Generate Summary For One Report

To summarize a specific Newman JSON report:

```bash
pnpm summarize:report reports/auth-newman-report.json
```

Example output:

```txt
reports/auth-newman-report.summary.md
```

Another example:

```bash
pnpm summarize:report reports/chain-smoke-newman-report.json
```

Output:

```txt
reports/chain-smoke-newman-report.summary.md
```

## Generate Consolidated Execution Summary

To aggregate all Newman JSON reports:

```bash
pnpm aggregate:reports
```

Output:

```txt
reports/newman-execution-summary.md
```

This file contains:

- Report summary.
    
- Request totals.
    
- Assertion totals.
    
- Overall totals.
    
- Failure details.
    

## Generate Failure Triage Report

To classify failure records:

```bash
pnpm triage:reports
```

Output:

```txt
reports/newman-failure-triage.md
```

This file helps separate:

- Credential or token blockers.
    
- Staging rate-limit blockers.
    
- Missing seed data.
    
- Payment or subscription setup blockers.
    
- Possible product bugs.
    
- Assertion mismatches.
    

Do not treat every Newman failure as a product bug. A failure should only be logged as a bug when valid credentials, correct role token, required test data, and expected environment setup were used.

## Recommended Final Execution Flow

For final QA check-in evidence, run:

```bash
pnpm build:chain-collection
pnpm test:chains:with-summaries
```

Then review:

```txt
reports/newman-execution-summary.md
reports/newman-failure-triage.md
```

Use those files to update:

```txt
reports/test-execution-report.md
reports/bug-report-log.md
reports/mvp-coverage-summary.md
docs/traceability-matrix.md
```

## How To Interpret Results

### Passed

Mark a test as Passed when:

- The request executed successfully.
    
- The expected status code was returned.
    
- Required assertions passed.
    
- The response data matches the expected behavior.
    

### Failed

Mark a test as Failed when:

- Valid test data was used.
    
- Required credentials were correct.
    
- The endpoint should work.
    
- The response contradicts the expected requirement.
    
- The issue is reproducible.
    

Every Failed test must have a linked bug ID in:

```txt
reports/bug-report-log.md
```

### Blocked

Mark a test as Blocked when execution depends on missing setup, such as:

- Missing admin credentials.
    
- Missing client token.
    
- Missing trainer token.
    
- Missing OTP.
    
- Missing booking ID.
    
- Missing session ID.
    
- Missing subscription ID.
    
- Missing payment test receipt.
    
- Staging rate limiting.
    

Blocked tests should not be logged as product bugs.

### Partial

Mark a test as Partial when:

- Some API checks can run.
    
- The full MVP flow cannot be completed because a required dependency is missing.
    

Example:

```txt
Subscription plan listing can run, but payment activation is blocked because no test receipt is available.
```

## Important Current Limitations

Full execution may be limited by:

- Missing real staging credentials.
    
- Missing role-specific tokens.
    
- Missing OTP access.
    
- Missing trainer setup token.
    
- Missing valid booking/session records.
    
- Missing subscription/payment test setup.
    
- Staging rate limiting during large runs.
    

These limitations should be documented in:

```txt
docs/known-blockers.md
reports/mvp-coverage-summary.md
reports/test-execution-report.md
```

## Report Files

Generated JSON reports are raw execution artifacts. They may contain request data, headers, or environment values.

They should not be committed unless reviewed and sanitized.

Markdown summaries are safer to commit and review.

Generated report examples:

```txt
reports/auth-newman-report.summary.md
reports/chain-smoke-newman-report.summary.md
reports/newman-execution-summary.md
reports/newman-failure-triage.md
```

Manual QA deliverables:

```txt
reports/test-execution-report.md
reports/bug-report-log.md
reports/mvp-coverage-summary.md
```

## Documentation Files

### docs/mvp-flow-map.md

Defines the MVP user journeys and product flows.

### docs/route-inventory.md

Maps available API routes to milestones, roles, test data, and execution readiness.

### docs/regression-coverage-matrix.md

Defines regression coverage across milestones and feature areas.

### docs/test-cases.md

Contains designed test cases derived from the MVP flow map and coverage matrix.

### docs/automation-scope.md

Defines what is automated, manual, blocked, deferred, or out of scope.

### docs/chained-api-tests.md

Defines the API chains required for final regression validation.

### docs/chain-run-plan.md

Defines the execution order for focused chain runs.

### docs/traceability-matrix.md

Links requirements, milestones, test case IDs, API/UI flows, execution status, and bug IDs.

### docs/known-blockers.md

Tracks known blockers and limitations affecting full MVP validation.

## Final Submission Format

The final QA check-in submission should include:

```txt
Team Name: Personal Trainer / FitCall

Regression Repo Link:
[GitHub repo link]

Postman Collection Link:
[Postman collection link or repo path to postman/FitCall-MVP-Chained.postman_collection.json]

Test Execution Report Link:
[Link to reports/test-execution-report.md or published document]

Bug Report Link:
[Link to reports/bug-report-log.md or ClickUp bug board]

MVP Coverage Summary:
[Link to reports/mvp-coverage-summary.md]
```

## Notes For Reviewers

To run the suite:

```bash
pnpm install
pnpm build:chain-collection
pnpm test:chains:with-summaries
```

Then review:

```txt
reports/newman-execution-summary.md
reports/newman-failure-triage.md
reports/test-execution-report.md
reports/bug-report-log.md
reports/mvp-coverage-summary.md
```

Some tests may be blocked if staging credentials, role tokens, OTPs, seed data, or payment setup are not available.

Blocked tests are documented as blockers, not product defects.
