# Test Execution Report

> Auto-generated from `reports/latest-newman-report.json` by `scripts/generate-report.js`.
> Re-run `pnpm test:env` (or `pnpm report`) to refresh. Do not edit by hand.

## Latest run

| Field | Value |
| --- | --- |
| Result | **❌ FAIL** |
| Completed | 2026-06-02T11:17:34.212Z |
| Collection | Personal Trainer — Staging |
| Environment | Personal Trainer — Staging |
| Total duration | 102.4s |
| Avg response time | 143ms (min 127ms, max 646ms) |

## Results

| Metric | Total | Failed | Passed |
| --- | --- | --- | --- |
| Iterations | 1 | 0 | 1 |
| Requests | 157 | 0 | 157 |
| Test scripts | 154 | 0 | 154 |
| Assertions | 211 | 33 | 178 |

## Per-folder breakdown

| Folder | Requests | Assertions | Passed | Failed |
| --- | --- | --- | --- | --- |
| 0 — Auth ❌ | 16 | 21 | 19 | 2 |
| 1 — GET /trainers ❌ | 4 | 14 | 11 | 3 |
| 2 — POST /trainers (Create Trainer) | 9 | 15 | 15 | 0 |
| 3 — GET /trainers/:id | 5 | 10 | 10 | 0 |
| 4 — PATCH /trainers/:id | 3 | 4 | 4 | 0 |
| 5 — DELETE /trainers/:id ❌ | 3 | 3 | 2 | 1 |
| 6 — Trainer Availability ❌ | 9 | 10 | 6 | 4 |
| 7 — Users (Profile) | 6 | 10 | 10 | 0 |
| 8 — Bookings | 10 | 11 | 11 | 0 |
| 9 — Booking Slots ❌ | 7 | 9 | 5 | 4 |
| 10 — Sessions | 7 | 7 | 7 | 0 |
| 11 — Reviews | 5 | 7 | 7 | 0 |
| 12 — Admin | 9 | 11 | 11 | 0 |
| 13 — Waitlist ❌ | 6 | 9 | 7 | 2 |
| 14 — Contact | 3 | 4 | 4 | 0 |
| 15 — Health & Root | 2 | 5 | 5 | 0 |
| 16 — Trainer Sessions ❌ | 4 | 5 | 2 | 3 |
| 17 — Trainer Images | 5 | 5 | 5 | 0 |
| 18 — Trainer Intro Video ❌ | 4 | 4 | 2 | 2 |
| 19 — Discovery Slots ❌ | 8 | 9 | 4 | 5 |
| 20 — Notifications | 6 | 7 | 7 | 0 |
| 21 — Media (Organisation) ❌ | 7 | 8 | 7 | 1 |
| 22 — Subscriptions ❌ | 7 | 8 | 7 | 1 |
| 23 — Trainer (New Endpoints) ❌ | 8 | 10 | 6 | 4 |
| 24 — Admin (New Endpoints) ❌ | 4 | 5 | 4 | 1 |

## Failures (33)

| # | Folder | Request | Assertion | Detail |
| --- | --- | --- | --- | --- |
| 1 | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 2 | 0 — Auth | Logout — missing auth header → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 3 | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing availability (milestone 4) | expected { average_rating: null, …(16) } to have property 'availability' |
| 4 | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing sessions (milestone 4) | expected { average_rating: null, …(16) } to have property 'sessions' |
| 5 | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing earnings (milestone 5) | expected { average_rating: null, …(16) } to have property 'earnings' |
| 6 | 5 — DELETE /trainers/:id | Delete trainer — valid (cleanup) → 204 | Status 204 No Content | expected response to have status code 204 but got 200 |
| 7 | 6 — Trainer Availability | Set availability — invalid timezone → 400 | Status 400 or 401 | expected 404 to be one of [ 400, 401 ] |
| 8 | 6 — Trainer Availability | GET trainer own availability (me) | Status 200 | expected response to have status code 200 but got 404 |
| 9 | 6 — Trainer Availability | GET trainer own availability (me) | Has availability array | Target cannot be null or undefined. |
| 10 | 6 — Trainer Availability | GET trainer own availability — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 11 | 9 — Booking Slots | Get all booking slots — public (no auth) | Status 200 | expected response to have status code 200 but got 404 |
| 12 | 9 — Booking Slots | Get all booking slots — public (no auth) | data is array or object | Target cannot be null or undefined. |
| 13 | 9 — Booking Slots | Create booking slot — valid (admin) | Status 201 or 403 | expected 404 to be one of [ 201, 403 ] |
| 14 | 9 — Booking Slots | Create booking slot — missing required fields → 400 | Status 400 or 403 | expected 404 to be one of [ 400, 403 ] |
| 15 | 13 — Waitlist | Add to waitlist — valid email → 201 | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 16 | 13 — Waitlist | Add to waitlist — duplicate email → 200 | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 |
| 17 | 16 — Trainer Sessions | GET trainer own sessions (me) | Status 200 | expected response to have status code 200 but got 404 |
| 18 | 16 — Trainer Sessions | GET trainer own sessions (me) | Has data | expected { code: 'NOT_FOUND', …(1) } to have property 'data' |
| 19 | 16 — Trainer Sessions | GET trainer sessions — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 20 | 18 — Trainer Intro Video | POST upload trainer intro video | Status 202 or 404 or 503 | expected 400 to be one of [ 200, 202, 404, 503 ] |
| 21 | 18 — Trainer Intro Video | GET stream trainer intro video — not found → 404 | Status 404 | expected response to have status code 404 but got 429 |
| 22 | 19 — Discovery Slots | GET discovery slots | Status 200 | expected response to have status code 200 but got 429 |
| 23 | 19 — Discovery Slots | GET discovery slots | Has slots | expected { code: 'TOO_MANY_REQUESTS', …(1) } to have property 'data' |
| 24 | 19 — Discovery Slots | POST create discovery slot (admin) | Status 201 or 200 | expected 429 to be one of [ 200, 201 ] |
| 25 | 19 — Discovery Slots | POST create discovery slot — invalid time format → 400 | Status 400 | expected response to have status code 400 but got 429 |
| 26 | 19 — Discovery Slots | POST create discovery slot — no auth → 401 | Status 401 | expected response to have status code 401 but got 429 |
| 27 | 21 — Media (Organisation) | POST /media/videos — upload org video (admin) | Status 202 | expected response to have status code 202 but got 400 |
| 28 | 22 — Subscriptions | POST /subscriptions — create via Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 400 |
| 29 | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Status 200 | expected response to have status code 200 but got 404 |
| 30 | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Has id | Target cannot be null or undefined. |
| 31 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Status 200 | expected response to have status code 200 but got 404 |
| 32 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Has data array | expected undefined to be an array |
| 33 | 24 — Admin (New Endpoints) | GET /admin/clients/:id — single client | Has id | expected [ { …(7) }, { …(7) }, { …(7) }, …(7) ] to have property 'id' |

## Failure triage

> Distinct failing requests classified by cause. Only **backend** rows are defects for the API team; the rest are known gaps, environment noise, or test-data/harness limits. See `reports/bug-report-log.md`.

| Category | Distinct requests | Backend action? |
| --- | --- | --- |
| BACKEND (contract) | 3 | ✅ yes |
| BACKEND BUG | 5 | ✅ yes |
| BACKEND/DATA | 7 | ✅ yes |
| ENV (rate limit) | 4 | — |
| KNOWN GAP | 1 | — |
| TEST DATA | 2 | — |
| TEST HARNESS | 3 | — |

### 🔧 Backend defects to fix (15)

| Bug ID | Category | Request | Issue |
| --- | --- | --- | --- |
| FC-BUG-001 | BACKEND BUG | Create booking slot — missing required fields → 400 | /booking-slots GET & POST return 404 page-not-found (route unmounted) |
| FC-BUG-001 | BACKEND BUG | Create booking slot — valid (admin) | /booking-slots GET & POST return 404 page-not-found (route unmounted) |
| FC-BUG-001 | BACKEND BUG | Get all booking slots — public (no auth) | /booking-slots GET & POST return 404 page-not-found (route unmounted) |
| FC-BUG-002 | BACKEND/DATA | GET /trainers/me — own profile | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-002 | BACKEND/DATA | GET /trainers/me/clients — client roster | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-002 | BACKEND/DATA | GET trainer own availability — no auth → 401 | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-002 | BACKEND/DATA | GET trainer own availability (me) | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-002 | BACKEND/DATA | GET trainer own sessions (me) | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-002 | BACKEND/DATA | GET trainer sessions — no auth → 401 | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-002 | BACKEND/DATA | Set availability — invalid timezone → 400 | seeded trainer has no trainer profile → 404 on every /trainers/me* endpoint |
| FC-BUG-003 | BACKEND BUG | Logout — missing auth header → 401 | logout with no auth header returns 400, not 401 |
| FC-BUG-004 | BACKEND BUG | Refresh token — missing access_token body → 400 | refresh with missing token body returns 401, not 400 |
| FC-BUG-006 | BACKEND (contract) | Delete trainer — valid (cleanup) → 204 | soft-delete returns 200+body, test expects 204 |
| FC-BUG-007 | BACKEND (contract) | Add to waitlist — duplicate email → 200 | duplicate waitlist email returns 409, not idempotent 200 |
| FC-BUG-007 | BACKEND (contract) | Add to waitlist — valid email → 201 | duplicate waitlist email returns 409, not idempotent 200 |

### Non-backend failures (no API change needed)

| Category | Request | Reason |
| --- | --- | --- |
| KNOWN GAP | List trainers — valid auth → 200 | asserts M4/M5 fields (availability/sessions/earnings) not yet built — by design |
| TEST HARNESS | POST upload trainer intro video | multipart video upload needs an ffprobe-valid file; none available in run env |
| TEST HARNESS | GET stream trainer intro video — not found → 404 | multipart video upload needs an ffprobe-valid file; none available in run env |
| ENV (rate limit) | GET discovery slots | 429 throttling during the rapid run — raise DELAY_REQUEST or re-run |
| ENV (rate limit) | POST create discovery slot (admin) | 429 throttling during the rapid run — raise DELAY_REQUEST or re-run |
| ENV (rate limit) | POST create discovery slot — invalid time format → 400 | 429 throttling during the rapid run — raise DELAY_REQUEST or re-run |
| ENV (rate limit) | POST create discovery slot — no auth → 401 | 429 throttling during the rapid run — raise DELAY_REQUEST or re-run |
| TEST HARNESS | POST /media/videos — upload org video (admin) | multipart video upload needs an ffprobe-valid file; none available in run env |
| TEST DATA | POST /subscriptions — create via Google IAP | needs a real purchase_token (Google IAP receipt) |
| TEST DATA | GET /admin/clients/:id — single client | needs a real created_client_id UUID |

