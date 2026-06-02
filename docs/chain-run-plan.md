# FitCall Chain Run Plan

Product: FitCall.me
Team: Personal Trainer
Environment: Staging
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document defines the order in which the regression suite should be executed.

The goal is to avoid treating the Postman collection as a loose endpoint dump. The final QA check-in expects chained API validation, so execution must follow product flows.

## General Rule

Run tests in this order:

1. Smoke tests
2. Auth tests
3. Admin trainer management tests
4. Client discovery tests
5. Booking tests
6. Session tests
7. Subscription tests
8. Admin monitoring tests
9. Notifications tests

## Execution Commands

| Run Area | Command | Report Output | Current Status |
|---|---|---|---|
| Smoke / API health | pnpm test:smoke | reports/smoke-newman-report.json | Runs |
| Auth | pnpm test:auth | reports/auth-newman-report.json | Runs |
| Trainer list | pnpm test:trainers | reports/trainers-newman-report.json | Pending |
| Create trainer | pnpm test:create-trainer | reports/create-trainer-newman-report.json | Pending |
| Trainer profile | pnpm test:trainer-profile | reports/trainer-profile-newman-report.json | Pending |
| Bookings | pnpm test:bookings | reports/bookings-newman-report.json | Pending |
| Booking slots | pnpm test:booking-slots | reports/booking-slots-newman-report.json | Pending |
| Sessions | pnpm test:sessions | reports/sessions-newman-report.json | Pending |
| Admin | pnpm test:admin | reports/admin-newman-report.json | Pending |
| Trainer sessions | pnpm test:trainer-sessions | reports/trainer-sessions-newman-report.json | Pending |
| Discovery slots | pnpm test:discovery-slots | reports/discovery-slots-newman-report.json | Pending |
| Notifications | pnpm test:notifications | reports/notifications-newman-report.json | Pending |
| Subscriptions | pnpm test:subscriptions | reports/subscriptions-newman-report.json | Pending |
| Full regression | pnpm test:regression | reports/latest-newman-report.json | Runs but may hit rate limit |

## Chain Execution Mapping

| Chain ID | Chain Name | Commands To Run | Required Data | Expected Current Result |
|---|---|---|---|---|
| CHAIN-001 | Admin trainer management | pnpm test:auth, pnpm test:create-trainer, pnpm test:trainer-profile | Admin credentials | Blocked or failed until admin credentials are valid |
| CHAIN-002 | Client onboarding and discovery | pnpm test:auth, pnpm test:trainers, pnpm test:trainer-profile | Client token, trainer ID | Partial until client token and trainer ID exist |
| CHAIN-003 | Discovery booking | pnpm test:discovery-slots, pnpm test:bookings, pnpm test:admin | Admin token, client token, trainer ID | Partial until role tokens exist |
| CHAIN-004 | Trainer availability | Existing trainer availability folder or trainer endpoints | Trainer token, trainer ID | Partial until trainer token exists |
| CHAIN-005 | Session lifecycle | pnpm test:sessions, pnpm test:trainer-sessions | Client token, trainer token, session ID | Blocked until valid session exists |
| CHAIN-006 | Subscription access | pnpm test:subscriptions, pnpm test:bookings | Client token, payment setup or subscription ID | Blocked until subscription/payment setup exists |
| CHAIN-007 | Non-subscribed restriction | pnpm test:subscriptions, pnpm test:bookings | Non-subscribed client token | Partial until non-subscribed client token exists |

## How To Interpret Results

| Result Type | How To Record It |
|---|---|
| Request passes with correct data | Mark Passed in test execution report |
| Request fails because credentials are missing | Mark Blocked, not Failed |
| Request fails because required seed data is missing | Mark Blocked, not Failed |
| Request fails with valid data and clear product defect | Mark Failed and create bug report |
| Request returns 429 | Mark Blocked or Partial due to staging rate limiting, unless rate limit itself is being tested |
| Payment setup is unavailable | Mark Blocked |
| Subscription happy path cannot run | Mark Blocked |
| Role token is wrong or reused incorrectly | Mark Blocked until correct role token is provided |

## Current Execution Note

Smoke and Auth focused runs now work from the TypeScript Newman runner.

Auth generated:

reports/auth-newman-report.json

This confirms the runner works, but auth results still need to be interpreted against available credentials and expected blockers.