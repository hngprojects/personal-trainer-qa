# Test Execution Report

> Auto-generated from `reports/latest-newman-report.json` by `scripts/generate-report.js`.
> Re-run `pnpm test:env` (or `pnpm report`) to refresh. Do not edit by hand.

## Latest run

| Field | Value |
| --- | --- |
| Result | **❌ FAIL** |
| Completed | 2026-06-02T09:23:33.578Z |
| Collection | Personal Trainer — Staging |
| Environment | Personal Trainer — Staging |
| Total duration | 104.6s |
| Avg response time | 143ms (min 126ms, max 568ms) |

## Results

| Metric | Total | Failed | Passed |
| --- | --- | --- | --- |
| Iterations | 1 | 0 | 1 |
| Requests | 160 | 0 | 160 |
| Test scripts | 160 | 0 | 160 |
| Assertions | 211 | 106 | 105 |

## Per-folder breakdown

| Folder | Requests | Assertions | Passed | Failed |
| --- | --- | --- | --- | --- |
| 0 — Auth ❌ | 19 | 28 | 23 | 5 |
| 1 — GET /trainers ❌ | 4 | 7 | 3 | 4 |
| 2 — POST /trainers (Create Trainer) ❌ | 9 | 13 | 3 | 10 |
| 3 — GET /trainers/:id ❌ | 5 | 9 | 3 | 6 |
| 4 — PATCH /trainers/:id ❌ | 3 | 4 | 0 | 4 |
| 5 — DELETE /trainers/:id ❌ | 3 | 3 | 0 | 3 |
| 6 — Trainer Availability ❌ | 9 | 10 | 5 | 5 |
| 7 — Users (Profile) ❌ | 6 | 9 | 5 | 4 |
| 8 — Bookings | 10 | 10 | 10 | 0 |
| 9 — Booking Slots ❌ | 7 | 8 | 4 | 4 |
| 10 — Sessions | 7 | 7 | 7 | 0 |
| 11 — Reviews ❌ | 5 | 5 | 4 | 1 |
| 12 — Admin ❌ | 9 | 11 | 3 | 8 |
| 13 — Waitlist ❌ | 6 | 9 | 5 | 4 |
| 14 — Contact | 3 | 4 | 4 | 0 |
| 15 — Health & Root ❌ | 2 | 5 | 3 | 2 |
| 16 — Trainer Sessions ❌ | 4 | 5 | 3 | 2 |
| 17 — Trainer Images ❌ | 5 | 5 | 1 | 4 |
| 18 — Trainer Intro Video ❌ | 4 | 4 | 0 | 4 |
| 19 — Discovery Slots ❌ | 8 | 9 | 5 | 4 |
| 20 — Notifications ❌ | 6 | 7 | 1 | 6 |
| 21 — Media (Organisation) ❌ | 7 | 11 | 4 | 7 |
| 22 — Subscriptions ❌ | 7 | 8 | 3 | 5 |
| 23 — Trainer (New Endpoints) ❌ | 8 | 13 | 4 | 9 |
| 24 — Admin (New Endpoints) ❌ | 4 | 7 | 2 | 5 |

## Failures (106)

| # | Folder | Request | Assertion | Detail |
| --- | --- | --- | --- | --- |
| 1 | 0 — Auth | SETUP (Step 1) — Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 400 |
| 2 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Status 200 | expected response to have status code 200 but got 400 |
| 3 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Email verified | expected 'invalid request body' to include 'verif' |
| 4 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Has access_token | Target cannot be null or undefined. |
| 5 | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 6 | 1 — GET /trainers | List trainers — valid auth → 200 | Status 200 | expected response to have status code 200 but got 401 |
| 7 | 1 — GET /trainers | List trainers — valid auth → 200 | data is array | expected undefined to be an array |
| 8 | 1 — GET /trainers | List trainers — filter by category (strength) | Status 200 | expected response to have status code 200 but got 401 |
| 9 | 1 — GET /trainers | List trainers — filter by category (strength) | data is array | expected undefined to be an array |
| 10 | 2 — POST /trainers (Create Trainer) | Create trainer — missing required fields → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 11 | 2 — POST /trainers (Create Trainer) | Create trainer — missing email → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 12 | 2 — POST /trainers (Create Trainer) | Create trainer — invalid email format → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 13 | 2 — POST /trainers (Create Trainer) | Create trainer — invalid specialization → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 14 | 2 — POST /trainers (Create Trainer) | Create trainer — invalid specialization → 400 | Error mentions specialization | expected 'invalid token format' to include 'specializ' |
| 15 | 2 — POST /trainers (Create Trainer) | Create trainer — too many training_styles (5, max 4) → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 16 | 2 — POST /trainers (Create Trainer) | Create trainer — bio over 2000 chars → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 17 | 2 — POST /trainers (Create Trainer) | Create trainer — happy path (201 or 500 SMTP) | Unexpected status: 401 | expected false to be true |
| 18 | 2 — POST /trainers (Create Trainer) | Create trainer — duplicate email → 409 | Status 409 Conflict | expected response to have status code 409 but got 401 |
| 19 | 2 — POST /trainers (Create Trainer) | Create trainer — duplicate email → 409 | Error mentions already exists | expected 'invalid token format' to include 'already exists' |
| 20 | 3 — GET /trainers/:id | Get trainer by ID — valid | Status 200 | expected response to have status code 200 but got 401 |
| 21 | 3 — GET /trainers/:id | Get trainer by ID — valid | Has id | Target cannot be null or undefined. |
| 22 | 3 — GET /trainers/:id | Get trainer by ID — valid | Has specializations | Target cannot be null or undefined. |
| 23 | 3 — GET /trainers/:id | Get trainer by ID — valid | Has created_at | Target cannot be null or undefined. |
| 24 | 3 — GET /trainers/:id | Get trainer by ID — non-existent → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 25 | 3 — GET /trainers/:id | Get trainer reviews — valid | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
| 26 | 4 — PATCH /trainers/:id | Update trainer — valid fields | Status 200 | expected response to have status code 200 but got 404 |
| 27 | 4 — PATCH /trainers/:id | Update trainer — valid fields | Bio updated | Cannot read properties of null (reading 'data') |
| 28 | 4 — PATCH /trainers/:id | Update trainer — invalid specialization → 400 | Status 400 | expected response to have status code 400 but got 404 |
| 29 | 4 — PATCH /trainers/:id | Update trainer — non-existent → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 30 | 5 — DELETE /trainers/:id | Delete trainer — non-existent → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 31 | 5 — DELETE /trainers/:id | Delete trainer — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 32 | 5 — DELETE /trainers/:id | Delete trainer — valid (cleanup) → 204 | Status 204 No Content | expected response to have status code 204 but got 404 |
| 33 | 6 — Trainer Availability | GET trainer own availability (me) | Status 200 | expected response to have status code 200 but got 401 |
| 34 | 6 — Trainer Availability | GET trainer own availability (me) | Has availability array | Target cannot be null or undefined. |
| 35 | 6 — Trainer Availability | GET trainer availability by ID | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
| 36 | 6 — Trainer Availability | GET trainer availability — not found → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 37 | 6 — Trainer Availability | PUT trainer availability by ID (admin) | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
| 38 | 7 — Users (Profile) | Get user profile — valid auth → 200 | Status 200 | expected response to have status code 200 but got 401 |
| 39 | 7 — Users (Profile) | Get user profile — valid auth → 200 | Has id | Target cannot be null or undefined. |
| 40 | 7 — Users (Profile) | Get user profile — valid auth → 200 | Has email | Target cannot be null or undefined. |
| 41 | 7 — Users (Profile) | Get user profile — valid auth → 200 | Has profile_complete | Target cannot be null or undefined. |
| 42 | 9 — Booking Slots | Get all booking slots — public (no auth) | Status 200 | expected response to have status code 200 but got 404 |
| 43 | 9 — Booking Slots | Get all booking slots — public (no auth) | data is array or object | Target cannot be null or undefined. |
| 44 | 9 — Booking Slots | Create booking slot — valid (admin) | Status 201 or 403 | expected 404 to be one of [ 201, 403 ] |
| 45 | 9 — Booking Slots | Create booking slot — missing required fields → 400 | Status 400 or 403 | expected 404 to be one of [ 400, 403 ] |
| 46 | 11 — Reviews | Get trainer reviews — public (no auth) → 200 or 404 | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
| 47 | 12 — Admin | Create admin — admin token (not super_admin) → 403 | Status 403 or 201 | expected 401 to be one of [ 403, 201 ] |
| 48 | 12 — Admin | Approve trainer — no auth → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 49 | 12 — Admin | Approve trainer — trainer not found → 404 | Status 404 or 403 | expected 401 to be one of [ 404, 403 ] |
| 50 | 12 — Admin | GET admin sessions — paginated | Status 200 | expected response to have status code 200 but got 401 |
| 51 | 12 — Admin | GET admin sessions — paginated | Has data array | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
| 52 | 12 — Admin | GET admin discovery bookings — paginated | Status 200 | expected response to have status code 200 but got 401 |
| 53 | 12 — Admin | GET admin discovery bookings — paginated | Has data array | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
| 54 | 12 — Admin | GET admin user/trainer count | Status 200 | expected response to have status code 200 but got 401 |
| 55 | 13 — Waitlist | Add to waitlist — duplicate email → 200 | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 |
| 56 | 13 — Waitlist | Get waitlist — valid auth → 200 | Status 200 | expected response to have status code 200 but got 401 |
| 57 | 13 — Waitlist | Get waitlist — valid auth → 200 | Has data | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
| 58 | 13 — Waitlist | Get waitlist — filter by email | Status 200 or 404 | expected 401 to be one of [ 200, 404 ] |
| 59 | 15 — Health & Root | Health check → 200 | Status is success | expected undefined to equal 'success' |
| 60 | 15 — Health & Root | Root endpoint → 200 | Status is success | expected undefined to equal 'success' |
| 61 | 16 — Trainer Sessions | GET trainer own sessions (me) | Status 200 | expected response to have status code 200 but got 401 |
| 62 | 16 — Trainer Sessions | GET trainer own sessions (me) | Has data | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
| 63 | 17 — Trainer Images | GET trainer images | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
| 64 | 17 — Trainer Images | POST upload trainer images | Status 200 or 404 | expected 400 to be one of [ 200, 404, 503 ] |
| 65 | 17 — Trainer Images | POST upload trainer images — no auth → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 66 | 17 — Trainer Images | DELETE trainer image — not found → 404 | Status 404 | expected response to have status code 404 but got 400 |
| 67 | 18 — Trainer Intro Video | POST upload trainer intro video | Status 202 or 404 or 503 | expected 400 to be one of [ 200, 202, 404, 503 ] |
| 68 | 18 — Trainer Intro Video | POST upload trainer intro video — no auth → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 69 | 18 — Trainer Intro Video | GET stream trainer intro video | Status 200 or 302 or 404 | expected 400 to be one of [ 200, 302, 404 ] |
| 70 | 18 — Trainer Intro Video | GET stream trainer intro video — not found → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 71 | 19 — Discovery Slots | POST create discovery slot (admin) | Status 201 or 200 | expected 401 to be one of [ 200, 201 ] |
| 72 | 19 — Discovery Slots | POST create discovery slot — invalid time format → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 73 | 19 — Discovery Slots | PUT update discovery slot — not found → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 74 | 19 — Discovery Slots | DELETE discovery slot — not found → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 75 | 20 — Notifications | GET /notifications — list (authenticated) | Status 200 | expected response to have status code 200 but got 401 |
| 76 | 20 — Notifications | GET /notifications — list (authenticated) | Has data | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
| 77 | 20 — Notifications | POST /register/device — android | Status 200 | expected response to have status code 200 but got 401 |
| 78 | 20 — Notifications | POST /register/device — iOS | Status 200 | expected response to have status code 200 but got 429 |
| 79 | 20 — Notifications | POST /register/device — invalid platform → 400 | Status 400 | expected response to have status code 400 but got 429 |
| 80 | 20 — Notifications | POST /register/device — missing token → 400 | Status 400 | expected response to have status code 400 but got 429 |
| 81 | 21 — Media (Organisation) | GET /media — list all (public) | Status 200 | expected response to have status code 200 but got 429 |
| 82 | 21 — Media (Organisation) | GET /media — list all (public) | Has data array | expected undefined to be an array |
| 83 | 21 — Media (Organisation) | GET /media — paginated | Status 200 | expected response to have status code 200 but got 429 |
| 84 | 21 — Media (Organisation) | POST /media/images — upload org image (admin) | Status 202 | expected response to have status code 202 but got 401 |
| 85 | 21 — Media (Organisation) | POST /media/videos — upload org video (admin) | Status 202 | expected response to have status code 202 but got 401 |
| 86 | 21 — Media (Organisation) | GET /media/:id — get by ID | Has id | expected [ Array(6) ] to have property 'id' |
| 87 | 21 — Media (Organisation) | DELETE /media/:id — remove (admin) | Status 200 or 204 | expected [ 200, 204 ] to include 404 |
| 88 | 22 — Subscriptions | POST /subscriptions — create via Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 401 |
| 89 | 22 — Subscriptions | POST /subscriptions — missing fields → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 90 | 22 — Subscriptions | GET /subscriptions/me — my active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 91 | 22 — Subscriptions | GET /subscriptions/me/usage — sessions used and remaining | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 92 | 22 — Subscriptions | POST /client/cancel/subscription — cancel | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 93 | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Status 200 | expected response to have status code 200 but got 401 |
| 94 | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Has id | Target cannot be null or undefined. |
| 95 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Status 200 | expected response to have status code 200 but got 401 |
| 96 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Has data array | expected undefined to be an array |
| 97 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — paginated | Status 200 | expected response to have status code 200 but got 401 |
| 98 | 23 — Trainer (New Endpoints) | POST /trainers/resend-setup — resend invite (admin) | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 99 | 23 — Trainer (New Endpoints) | POST /trainers/resend-setup — unknown email → 404 | Status 404 | expected response to have status code 404 but got 401 |
| 100 | 23 — Trainer (New Endpoints) | PATCH /trainers/:id — invalid onboarding_status → 400 (fix #228) | Status 400 (was 500 before fix #228) | expected response to have status code 400 but got 404 |
| 101 | 23 — Trainer (New Endpoints) | PATCH /trainers/:id — invalid onboarding_status → 400 (fix #228) | Error mentions onboarding_status | Cannot read properties of null (reading 'message') |
| 102 | 24 — Admin (New Endpoints) | GET /admin/clients — list all clients | Status 200 | expected response to have status code 200 but got 401 |
| 103 | 24 — Admin (New Endpoints) | GET /admin/clients — list all clients | Has data array | expected undefined to be an array |
| 104 | 24 — Admin (New Endpoints) | GET /admin/clients — paginated | Status 200 | expected response to have status code 200 but got 401 |
| 105 | 24 — Admin (New Endpoints) | GET /admin/clients/:id — single client | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 106 | 24 — Admin (New Endpoints) | GET /admin/clients/:id — not found → 404 | Status 404 | expected response to have status code 404 but got 401 |

