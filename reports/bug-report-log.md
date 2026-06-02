# FitCall Bug Report Log

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document tracks all defects found during regression execution.

Every failed test must have a linked bug report.

A failed test without a linked bug ID should not be left unresolved in the final QA submission.

## Severity Guide

| Severity | Meaning |
|---|---|
| Critical | Blocks a core MVP flow or prevents users from using the product |
| High | Breaks an important feature but has a possible workaround |
| Medium | Feature works partially, but behavior is incorrect or incomplete |
| Low | Minor issue, copy issue, UI inconsistency, or non-blocking behavior |

## Bug Status Guide

| Status | Meaning |
|---|---|
| Open | Bug has been logged and is unresolved |
| In Progress | Engineering is working on the issue |
| Resolved | Fix has been implemented |
| Retest Passed | QA has confirmed the fix |
| Retest Failed | QA retested and the bug still exists |
| Deferred | Bug is accepted as not fixable before final submission |

## Bug Report Table

| Bug ID | Linked Test Case ID | Milestone | Feature | Severity | Bug Title | Expected Result | Actual Result | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| FC-BUG-001 | TBD | TBD | Booking Slots | High | `GET/POST /booking-slots` returns 404 page-not-found | 200 (list) / 201 (create) | `404 page not found` (plain text, not JSON) | Newman run 2026-06-02, folder "9 — Booking Slots" | Open |
| FC-BUG-002 | TBD | TBD | Trainer (me) | High | `GET /trainers/me*` 404 for a logged-in trainer account | 200 with trainer profile | `404 {"code":"NOT_FOUND","message":"trainer profile for this user not found"}` | Newman run 2026-06-02, folders 16 & 23 | Open |
| FC-BUG-003 | TBD | TBD | Auth | Low | Logout with no auth header returns 400, not 401 | `401 Unauthorized` | `400 {"code":"BAD_REQUEST","message":"refresh token is required"}` | Newman run 2026-06-02, folder "0 — Auth" | Open |
| FC-BUG-004 | TBD | TBD | Auth | Low | Refresh with missing token body returns 401, not 400 | `400 Bad Request` (validation) | `401 {"code":"UNAUTHORIZED","message":"invalid token format"}` | Newman run 2026-06-02, folder "0 — Auth" | Open |
| FC-BUG-005 | TBD | TBD | Booking Slots | Low | `GET /booking-slots/:trainerId` double-nests the array | `data` is an array | `data` is `{ "data": [] }` (array nested one level too deep) | Newman run 2026-06-02, "Get trainer booking slots — valid" | Open |
| FC-BUG-006 | TBD | TBD | Trainer | Low | `DELETE /trainers/:id` returns 200, not 204 | `204 No Content` | `200 {"message":"trainer deactivated successfully"}` | Newman run 2026-06-02, folder "5 — DELETE /trainers/:id" | Open |
| FC-BUG-007 | TBD | TBD | Waitlist | Low | Re-adding a waitlisted email returns 409, not an idempotent 200 | 200 (already on waitlist) | `409 {"code":"CONFLICT","message":"You're already on the waitlist"}` | Newman run 2026-06-02, folder "13 — Waitlist" | Open |

## Bug Report Entry Format

Use this format when adding a new bug:

### FC-BUG-001: Bug title here

| Field | Details |
|---|---|
| Linked Test Case ID | FC-MX-XXX |
| Requirement ID | REQ-MX-XXX |
| Milestone | M1 / M2 / M3 / M4 / M5 |
| Feature | Feature name |
| Severity | Critical / High / Medium / Low |
| Status | Open |
| Environment | Staging |
| API / Screen | Endpoint or UI screen |
| Description | Short explanation of the issue |
| Steps to Reproduce | 1. Step one. 2. Step two. 3. Step three. |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Evidence | Screenshot, log, API response, Newman output, or video link |
| Notes | Any extra context |

## Logged Defects (from regression execution 2026-06-02)

### FC-BUG-001: `GET/POST /booking-slots` returns 404 page-not-found

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Booking Slots |
| Severity | High |
| Status | Open |
| Environment | Staging |
| API / Screen | `GET /booking-slots`, `POST /booking-slots` |
| Description | The public booking-slots list and the admin create endpoint both return a plain-text `404 page not found` — the route appears unmounted on staging, while the per-trainer `GET /booking-slots/:trainerId` does resolve. |
| Steps to Reproduce | 1. `GET {{base_url}}/booking-slots?timezone=Africa/Lagos`. 2. Observe `404`. 3. `POST {{base_url}}/booking-slots` as admin with a valid body. 4. Observe `404`. |
| Expected Result | `200` with a list (GET); `201`/`403` (POST). |
| Actual Result | `404 page not found` (plain text, not the JSON error envelope). |
| Evidence | Newman run 2026-06-02, folder "9 — Booking Slots". |
| Notes | Plain-text body (not JSON) is itself a secondary issue — error responses elsewhere use `{code,message}`. |

### FC-BUG-002: `GET /trainers/me*` 404 for a logged-in trainer account

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Trainer (me) |
| Severity | High |
| Status | Open |
| Environment | Staging |
| API / Screen | `GET /trainers/me`, `/trainers/me/availability`, `/trainers/me/sessions`, `/trainers/me/clients` |
| Description | After a successful trainer login (SETUP Step 3, `200` + token), every `/trainers/me*` endpoint returns `404 "trainer profile for this user not found"`. The seeded trainer **user** exists but has no linked **trainer profile** row. |
| Steps to Reproduce | 1. Log in as the seeded trainer. 2. Call `GET {{base_url}}/trainers/me`. 3. Observe `404`. |
| Expected Result | `200` with the trainer's own profile. |
| Actual Result | `404 {"code":"NOT_FOUND","message":"trainer profile for this user not found"}` |
| Evidence | Newman run 2026-06-02, folders 16 & 23. |
| Notes | Likely test-data: the staging trainer account needs a provisioned trainer profile (or the suite must use a trainer created via `POST /trainers`). Blocks coverage of all trainer self-service endpoints. |

### FC-BUG-003: Logout with no auth header returns 400 instead of 401

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Auth |
| Severity | Low |
| Status | Open |
| Environment | Staging |
| API / Screen | `POST /auth/logout` |
| Description | Calling logout with no Authorization header returns `400 "refresh token is required"` rather than `401 Unauthorized`. Inconsistent with other protected endpoints. |
| Steps to Reproduce | 1. `POST {{base_url}}/auth/logout` with no auth header. 2. Observe status. |
| Expected Result | `401 Unauthorized`. |
| Actual Result | `400 {"code":"BAD_REQUEST","message":"refresh token is required"}` |
| Evidence | Newman run 2026-06-02, folder "0 — Auth". |

### FC-BUG-004: Refresh with missing token body returns 401 instead of 400

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Auth |
| Severity | Low |
| Status | Open |
| Environment | Staging |
| API / Screen | `POST /auth/refresh` |
| Description | Posting to refresh with a missing/empty access_token in the body returns `401 "invalid token format"` instead of a `400` validation error. The happy-path refresh itself works (`200` + new access_token). |
| Steps to Reproduce | 1. `POST {{base_url}}/auth/refresh` with an empty/missing token body. 2. Observe status. |
| Expected Result | `400 Bad Request` (validation). |
| Actual Result | `401 {"code":"UNAUTHORIZED","message":"invalid token format"}` |
| Evidence | Newman run 2026-06-02, folder "0 — Auth". |

### FC-BUG-005: `GET /booking-slots/:trainerId` double-nests the array

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Booking Slots |
| Severity | Low |
| Status | Open |
| Environment | Staging |
| API / Screen | `GET /booking-slots/:trainerId` |
| Description | The response wraps the slot array one level too deep: `data` is `{ "data": [] }` instead of `data: []`. Inconsistent with the list-shape used elsewhere. |
| Steps to Reproduce | 1. `GET {{base_url}}/booking-slots/{{created_trainer_id}}`. 2. Inspect `data`. |
| Expected Result | `data` is an array. |
| Actual Result | `{"code":"OK","data":{"data":[]},"message":"trainer booking slots retrieved successfully"}` |
| Evidence | Newman run 2026-06-02, "Get trainer booking slots — valid". |
| Notes | Test assertion updated to `json.data.data` to pass against current behavior; confirm whether the double-nesting is intended. |

### FC-BUG-006: `DELETE /trainers/:id` returns 200 instead of 204

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Trainer |
| Severity | Low |
| Status | Open |
| Environment | Staging |
| API / Screen | `DELETE /trainers/:id` |
| Description | Soft-delete (deactivate) returns `200` with a message body rather than `204 No Content`. Needs a product decision on the intended contract. |
| Steps to Reproduce | 1. `DELETE {{base_url}}/trainers/{{created_trainer_id}}` as admin. 2. Observe status. |
| Expected Result | `204 No Content` (per the test's original expectation). |
| Actual Result | `200 {"message":"trainer deactivated successfully"}` |
| Evidence | Newman run 2026-06-02, folder "5 — DELETE /trainers/:id". |
| Notes | Open question for the team: is `204` or `200`+body the intended contract? Test left asserting `204` pending that decision. |

### FC-BUG-007: Re-adding a waitlisted email returns 409 instead of idempotent 200

| Field | Details |
|---|---|
| Milestone | TBD |
| Feature | Waitlist |
| Severity | Low |
| Status | Open |
| Environment | Staging |
| API / Screen | `POST /waitlist` |
| Description | Submitting an email already on the waitlist returns `409 CONFLICT`. The expected behavior (per the test) is an idempotent `200` acknowledging the existing entry. Needs a product decision on whether duplicate enrolment is a conflict or a no-op. |
| Steps to Reproduce | 1. `POST {{base_url}}/waitlist` with an email already enrolled. 2. Observe status. |
| Expected Result | `200` (already on waitlist). |
| Actual Result | `409 {"code":"CONFLICT","message":"You're already on the waitlist"}` |
| Evidence | Newman run 2026-06-02, folder "13 — Waitlist". |
| Notes | Contract decision: idempotent `200` vs `409`. If `409` is intended, the test should be updated instead. |

## Current Known Bugs From Postman Collection Review

The following issues were already referenced inside the Postman collection and should be confirmed during execution before final logging.

| Potential Bug ID | Related Area | Related Test / Endpoint | Issue Summary | Current Status |
|---|---|---|---|---|
| FC-BUG-PENDING-001 | Auth | POST /auth/refresh | Happy-path refresh **confirmed functional** (2026-06-02): returns `200` + new access_token. Residual issue moved to FC-BUG-004 (missing-body returns 401 not 400). | Resolved / Reclassified |
| FC-BUG-PENDING-002 | Trainer Profile | GET /trainers/not-a-uuid | Invalid trainer ID may expose raw backend error instead of clean user-facing error. Needs execution confirmation. | Pending Confirmation |
| FC-BUG-PENDING-003 | Trainer Creation | POST /trainers | **Not reproduced** (2026-06-02): create returned `201 CREATED`, credentials path did not 500 this run. Keep watching — SMTP outage would still block retry via 409. | Not Reproduced |