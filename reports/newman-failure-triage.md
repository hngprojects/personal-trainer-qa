# FitCall Newman Failure Triage

Product: FitCall.me
Team: Personal Trainer
Environment: Staging

## Scope

This triage excludes duplicate full-run reports:

- latest-newman-report.json
- chain-newman-report.json

The triage focuses on the targeted folder and chain execution reports.

## Failure Triage Table

| No. | Report | Folder / Parent | Request | Test | Error | Classification | Recommended Action |
|---:|---|---|---|---|---|---|---|
| 1 | auth-newman-report.json | 0 — Auth | SETUP (Step 1) — Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 | Blocked - staging rate limit | Do not log as product bug unless rate limit policy itself is under test. |
| 2 | auth-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 3 | auth-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Email verified | expected 'validation error' to include 'verif' | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 4 | auth-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Has access_token | Target cannot be null or undefined. | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 5 | auth-newman-report.json | 0 — Auth | Refresh token — 200 | Status 401 | expected response to have status code 401 but got 200 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 6 | auth-newman-report.json | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 7 | auth-newman-report.json | 0 — Auth | Logout — missing auth header → 401 | Status 401 | expected response to have status code 401 but got 400 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 8 | chain-admin-trainer-newman-report.json | 01 - Admin Trainer Management Chain | Step 6 - Delete trainer cleanup | Status 204 No Content | expected response to have status code 204 but got 200 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 9 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 1 - Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 | Blocked - staging rate limit | Do not log as product bug unless rate limit policy itself is under test. |
| 10 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 11 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Email verified | expected 'validation error' to include 'verif' | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 12 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Has access_token | Target cannot be null or undefined. | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 13 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Status 200 | expected response to have status code 200 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 14 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has id | Target cannot be null or undefined. | Review | Manual review required. |
| 15 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has email | Target cannot be null or undefined. | Review | Manual review required. |
| 16 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has profile_complete | Target cannot be null or undefined. | Review | Manual review required. |
| 17 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | Status 200 | expected response to have status code 200 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 18 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | data is array | expected undefined to be an array | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 19 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Status 200 | expected response to have status code 200 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 20 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has id | Target cannot be null or undefined. | Review | Manual review required. |
| 21 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has specializations | Target cannot be null or undefined. | Review | Manual review required. |
| 22 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has created_at | Target cannot be null or undefined. | Review | Manual review required. |
| 23 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 1 - Admin creates discovery slot | Status 201 or 200 | expected 401 to be one of [ 200, 201 ] | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 24 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 3 - Client books discovery call | Status 200 or 201 | expected [ 200, 201 ] to include 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 25 | chain-discovery-booking-newman-report.json | N/A | Step 4 - Client views upcoming bookings | N/A | runtime:extensions~request: request url is empty | Review | Manual review required. |
| 26 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 4 - Client views upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 27 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 5 - Admin views discovery bookings | Status 200 | expected response to have status code 200 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 28 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 5 - Admin views discovery bookings | Has data array | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 29 | chain-negative-newman-report.json | 99 - Negative and Security Regression | Subscription missing fields | Status 400 | expected response to have status code 400 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 30 | chain-non-subscribed-newman-report.json | 07 - Non-Subscribed Access Restriction Chain | Step 1 - Fetch active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 31 | chain-non-subscribed-newman-report.json | N/A | Step 3 - Confirm upcoming bookings | N/A | runtime:extensions~request: request url is empty | Review | Manual review required. |
| 32 | chain-non-subscribed-newman-report.json | 07 - Non-Subscribed Access Restriction Chain | Step 3 - Confirm upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 33 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 34 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Has session data | expected { code: 'BAD_REQUEST', …(1) } to have property 'data' | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 35 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 2 - Trainer starts session | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 36 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 3 - Client joins session | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 37 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 4 - Trainer completes session | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 38 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 5 - Trainer adds session notes | Status 200 | expected response to have status code 200 but got 400 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 39 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Health check | Status is success | expected undefined to equal 'success' | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 40 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Root endpoint | Status is success | expected undefined to equal 'success' | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 41 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Waitlist valid email | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 42 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Waitlist duplicate email | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |
| 43 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 2 - Create subscription using Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 44 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 3 - Fetch active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 45 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 4 - Fetch subscription usage | Status 200 or 404 | expected [ 200, 404 ] to include 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 46 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 6 - Cancel subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 47 | chain-trainer-availability-newman-report.json | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Status 200 | expected response to have status code 200 but got 401 | Blocked - credentials or role token needed | Do not log as product bug until valid role credential is provided. |
| 48 | chain-trainer-availability-newman-report.json | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Has availability array | Target cannot be null or undefined. | Review | Manual review required. |
| 49 | chain-trainer-availability-newman-report.json | 04 - Trainer Availability Chain | Step 3 - Fetch trainer availability by ID | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] | Review - possible assertion mismatch or product bug | Check whether test expectation matches current API contract. Log bug only if valid data was used. |

## Classification Summary

| Classification | Count |
|---|---:|
| Blocked - credentials or role token needed | 21 |
| Blocked - staging rate limit | 2 |
| Review - possible assertion mismatch or product bug | 17 |
| Review | 9 |

## Total Failure Records Reviewed

Total: 49