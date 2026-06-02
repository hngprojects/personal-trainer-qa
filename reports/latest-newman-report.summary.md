# Newman Report Summary

Report file: reports\latest-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 159 | 6 |
| Assertions | 210 | 42 |
| Test Scripts | 156 | 2 |
| Prerequest Scripts | 2 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Status 200 | expected response to have status code 200 but got 400 |
| 2 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Email verified | expected 'validation error' to include 'verif' |
| 3 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Has access_token | Target cannot be null or undefined. |
| 4 | 0 — Auth | Refresh token — 200 | Status 401 | expected response to have status code 401 but got 200 |
| 5 | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 6 | 0 — Auth | Logout — missing auth header → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 7 | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing availability (milestone 4) | expected { average_rating: null, …(16) } to have property 'availability' |
| 8 | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing sessions (milestone 4) | expected { average_rating: null, …(16) } to have property 'sessions' |
| 9 | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing earnings (milestone 5) | expected { average_rating: null, …(16) } to have property 'earnings' |
| 10 | N/A | List trainers — filter by category (strength) | N/A | runtime:extensions~request: request url is empty |
| 11 | 1 — GET /trainers | List trainers — filter by category (strength) | Status 200 | expected PostmanResponse{ …(5) } to have property 'code' |
| 12 | 1 — GET /trainers | List trainers — filter by category (strength) | N/A | "undefined" is not valid JSON |
| 13 | 5 — DELETE /trainers/:id | Delete trainer — valid (cleanup) → 204 | Status 204 No Content | expected response to have status code 204 but got 200 |
| 14 | 6 — Trainer Availability | Set availability — invalid timezone → 400 | Status 400 or 401 | expected 404 to be one of [ 400, 401 ] |
| 15 | 6 — Trainer Availability | GET trainer own availability (me) | Status 200 | expected response to have status code 200 but got 404 |
| 16 | 6 — Trainer Availability | GET trainer own availability (me) | Has availability array | Target cannot be null or undefined. |
| 17 | 6 — Trainer Availability | GET trainer own availability — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 18 | N/A | Get upcoming bookings — valid auth → 200 | N/A | runtime:extensions~request: request url is empty |
| 19 | 8 — Bookings | Get upcoming bookings — valid auth → 200 | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 20 | N/A | Get all booking slots — public (no auth) | N/A | runtime:extensions~request: request url is empty |
| 21 | 9 — Booking Slots | Get all booking slots — public (no auth) | Status 200 | expected PostmanResponse{ …(5) } to have property 'code' |
| 22 | 9 — Booking Slots | Get all booking slots — public (no auth) | N/A | "undefined" is not valid JSON |
| 23 | 9 — Booking Slots | Get trainer booking slots — valid | data is array | expected { data: [] } to be an array |
| 24 | 11 — Reviews | Create review — booking not found → 404 | Status 404 or 401 or 422 | expected 403 to be one of [ 404, 401, 422 ] |
| 25 | N/A | Get trainer reviews — public (no auth) → 200 or 404 | N/A | runtime:extensions~request: request url is empty |
| 26 | 11 — Reviews | Get trainer reviews — public (no auth) → 200 or 404 | Status 200 or 404 | expected undefined to be one of [ 200, 404 ] |
| 27 | N/A | Get trainer reviews — invalid pagination → 422 | N/A | runtime:extensions~request: request url is empty |
| 28 | 11 — Reviews | Get trainer reviews — invalid pagination → 422 | Status 422 or 400 | expected undefined to be one of [ 422, 400 ] |
| 29 | 13 — Waitlist | Add to waitlist — valid email → 201 | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 30 | N/A | Get waitlist — filter by email | N/A | runtime:extensions~request: request url is empty |
| 31 | 13 — Waitlist | Get waitlist — filter by email | Status 200 or 404 | expected undefined to be one of [ 200, 404 ] |
| 32 | 15 — Health & Root | Root endpoint → 200 | Status is success | expected undefined to equal 'success' |
| 33 | 16 — Trainer Sessions | GET trainer own sessions (me) | Status 200 | expected response to have status code 200 but got 404 |
| 34 | 16 — Trainer Sessions | GET trainer own sessions (me) | Has data | expected { code: 'NOT_FOUND', …(1) } to have property 'data' |
| 35 | 16 — Trainer Sessions | GET trainer sessions — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 36 | 17 — Trainer Images | POST upload trainer images | Status 202 or 404 | expected 400 to be one of [ 202, 404, 503 ] |
| 37 | 18 — Trainer Intro Video | POST upload trainer intro video | Status 202 or 404 or 503 | expected 400 to be one of [ 200, 202, 404, 503 ] |
| 38 | 19 — Discovery Slots | POST create discovery slot — no auth → 401 | Status 401 | expected response to have status code 401 but got 201 |
| 39 | 21 — Media (Organisation) | POST /media/images — upload org image (admin) | Status 202 | expected response to have status code 202 but got 400 |
| 40 | 21 — Media (Organisation) | POST /media/videos — upload org video (admin) | Status 202 | expected response to have status code 202 but got 400 |
| 41 | 21 — Media (Organisation) | GET /media/:id — get by ID | Status 200 | expected response to have status code 200 but got 400 |
| 42 | 21 — Media (Organisation) | GET /media/:id — get by ID | Has id | Target cannot be null or undefined. |
| 43 | 21 — Media (Organisation) | DELETE /media/:id — remove (admin) | Status 200 or 204 | expected [ 200, 204 ] to include 400 |
| 44 | 22 — Subscriptions | POST /subscriptions — create via Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 400 |
| 45 | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Status 200 | expected response to have status code 200 but got 404 |
| 46 | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Has id | Target cannot be null or undefined. |
| 47 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Status 200 | expected response to have status code 200 but got 404 |
| 48 | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Has data array | expected undefined to be an array |
| 49 | 24 — Admin (New Endpoints) | GET /admin/clients/:id — single client | Has id | expected [ { …(7) }, { …(7) }, { …(7) }, …(7) ] to have property 'id' |
| 50 | 24 — Admin (New Endpoints) | GET /admin/clients/:id — not found → 404 | Status 404 | expected response to have status code 404 but got 403 |
