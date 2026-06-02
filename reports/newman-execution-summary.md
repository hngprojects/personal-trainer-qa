# FitCall Newman Execution Summary

Product: FitCall.me
Team: Personal Trainer
Environment: Staging

## Report Summary

| Report | Requests Total | Requests Failed | Assertions Total | Assertions Failed | Status |
|---|---:|---:|---:|---:|---|
| auth-newman-report.json | 18 | 0 | 26 | 7 | Failed / Review Needed |
| chain-admin-trainer-newman-report.json | 6 | 0 | 16 | 1 | Failed / Review Needed |
| chain-client-discovery-newman-report.json | 6 | 0 | 16 | 14 | Failed / Review Needed |
| chain-discovery-booking-newman-report.json | 5 | 1 | 7 | 5 | Failed / Review Needed |
| chain-negative-newman-report.json | 9 | 0 | 11 | 1 | Failed / Review Needed |
| chain-newman-report.json | 51 | 2 | 93 | 26 | Failed / Review Needed |
| chain-non-subscribed-newman-report.json | 3 | 1 | 4 | 2 | Failed / Review Needed |
| chain-session-newman-report.json | 5 | 0 | 6 | 6 | Failed / Review Needed |
| chain-smoke-newman-report.json | 7 | 0 | 13 | 4 | Failed / Review Needed |
| chain-subscription-newman-report.json | 6 | 0 | 7 | 4 | Failed / Review Needed |
| chain-trainer-availability-newman-report.json | 4 | 0 | 5 | 3 | Failed / Review Needed |
| latest-newman-report.json | 159 | 6 | 210 | 42 | Failed / Review Needed |

## Overall Totals

| Metric | Count |
|---|---:|
| Requests Total | 279 |
| Requests Failed | 10 |
| Assertions Total | 414 |
| Assertions Failed | 115 |
| Failure Records | 127 |

## Failure Details

| No. | Report | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|---|
| 1 | auth-newman-report.json | 0 — Auth | SETUP (Step 1) — Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 |
| 2 | auth-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Status 200 | expected response to have status code 200 but got 400 |
| 3 | auth-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Email verified | expected 'validation error' to include 'verif' |
| 4 | auth-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Has access_token | Target cannot be null or undefined. |
| 5 | auth-newman-report.json | 0 — Auth | Refresh token — 200 | Status 401 | expected response to have status code 401 but got 200 |
| 6 | auth-newman-report.json | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 7 | auth-newman-report.json | 0 — Auth | Logout — missing auth header → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 8 | chain-admin-trainer-newman-report.json | 01 - Admin Trainer Management Chain | Step 6 - Delete trainer cleanup | Status 204 No Content | expected response to have status code 204 but got 200 |
| 9 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 1 - Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 |
| 10 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Status 200 | expected response to have status code 200 but got 400 |
| 11 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Email verified | expected 'validation error' to include 'verif' |
| 12 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Has access_token | Target cannot be null or undefined. |
| 13 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Status 200 | expected response to have status code 200 but got 401 |
| 14 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has id | Target cannot be null or undefined. |
| 15 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has email | Target cannot be null or undefined. |
| 16 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has profile_complete | Target cannot be null or undefined. |
| 17 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | Status 200 | expected response to have status code 200 but got 401 |
| 18 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | data is array | expected undefined to be an array |
| 19 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Status 200 | expected response to have status code 200 but got 401 |
| 20 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has id | Target cannot be null or undefined. |
| 21 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has specializations | Target cannot be null or undefined. |
| 22 | chain-client-discovery-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has created_at | Target cannot be null or undefined. |
| 23 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 1 - Admin creates discovery slot | Status 201 or 200 | expected 401 to be one of [ 200, 201 ] |
| 24 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 3 - Client books discovery call | Status 200 or 201 | expected [ 200, 201 ] to include 401 |
| 25 | chain-discovery-booking-newman-report.json | N/A | Step 4 - Client views upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 26 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 4 - Client views upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 27 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 5 - Admin views discovery bookings | Status 200 | expected response to have status code 200 but got 401 |
| 28 | chain-discovery-booking-newman-report.json | 03 - Discovery Booking Chain | Step 5 - Admin views discovery bookings | Has data array | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
| 29 | chain-negative-newman-report.json | 99 - Negative and Security Regression | Subscription missing fields | Status 400 | expected response to have status code 400 but got 401 |
| 30 | chain-newman-report.json | 00 - Smoke and Public Checks | Health check | Status is success | expected undefined to equal 'success' |
| 31 | chain-newman-report.json | 00 - Smoke and Public Checks | Root endpoint | Status is success | expected undefined to equal 'success' |
| 32 | chain-newman-report.json | 00 - Smoke and Public Checks | Waitlist valid email | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 33 | chain-newman-report.json | 00 - Smoke and Public Checks | Waitlist duplicate email | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 |
| 34 | chain-newman-report.json | 01 - Admin Trainer Management Chain | Step 6 - Delete trainer cleanup | Status 204 No Content | expected response to have status code 204 but got 200 |
| 35 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 1 - Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 |
| 36 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Status 200 | expected response to have status code 200 but got 400 |
| 37 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Email verified | expected 'validation error' to include 'verif' |
| 38 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Has access_token | Target cannot be null or undefined. |
| 39 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | KNOWN GAP — missing availability (milestone 4) | expected { average_rating: null, …(16) } to have property 'availability' |
| 40 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | KNOWN GAP — missing sessions (milestone 4) | expected { average_rating: null, …(16) } to have property 'sessions' |
| 41 | chain-newman-report.json | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | KNOWN GAP — missing earnings (milestone 5) | expected { average_rating: null, …(16) } to have property 'earnings' |
| 42 | chain-newman-report.json | 03 - Discovery Booking Chain | Step 3 - Client books discovery call | Status 200 or 201 | expected [ 200, 201 ] to include 400 |
| 43 | chain-newman-report.json | N/A | Step 4 - Client views upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 44 | chain-newman-report.json | 03 - Discovery Booking Chain | Step 4 - Client views upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 45 | chain-newman-report.json | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Status 200 | expected response to have status code 200 but got 404 |
| 46 | chain-newman-report.json | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Has availability array | Target cannot be null or undefined. |
| 47 | chain-newman-report.json | 04 - Trainer Availability Chain | Step 4 - Invalid timezone is rejected | Status 400 or 401 | expected 404 to be one of [ 400, 401 ] |
| 48 | chain-newman-report.json | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Status 200 | expected response to have status code 200 but got 400 |
| 49 | chain-newman-report.json | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Has session data | expected { code: 'BAD_REQUEST', …(1) } to have property 'data' |
| 50 | chain-newman-report.json | 05 - Session Lifecycle Chain | Step 2 - Trainer starts session | Status 200 | expected response to have status code 200 but got 400 |
| 51 | chain-newman-report.json | 05 - Session Lifecycle Chain | Step 3 - Client joins session | Status 200 | expected response to have status code 200 but got 400 |
| 52 | chain-newman-report.json | 05 - Session Lifecycle Chain | Step 4 - Trainer completes session | Status 200 | expected response to have status code 200 but got 400 |
| 53 | chain-newman-report.json | 05 - Session Lifecycle Chain | Step 5 - Trainer adds session notes | Status 200 | expected response to have status code 200 but got 400 |
| 54 | chain-newman-report.json | 06 - Subscription Access Chain | Step 2 - Create subscription using Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 400 |
| 55 | chain-newman-report.json | 07 - Non-Subscribed Access Restriction Chain | Step 2 - Attempt paid booking without subscription | Status is 400, 401, 403 or 404 | expected [ 400, 401, 403, 404 ] to include 200 |
| 56 | chain-newman-report.json | N/A | Step 3 - Confirm upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 57 | chain-newman-report.json | 07 - Non-Subscribed Access Restriction Chain | Step 3 - Confirm upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 58 | chain-non-subscribed-newman-report.json | 07 - Non-Subscribed Access Restriction Chain | Step 1 - Fetch active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 59 | chain-non-subscribed-newman-report.json | N/A | Step 3 - Confirm upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 60 | chain-non-subscribed-newman-report.json | 07 - Non-Subscribed Access Restriction Chain | Step 3 - Confirm upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 61 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Status 200 | expected response to have status code 200 but got 400 |
| 62 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Has session data | expected { code: 'BAD_REQUEST', …(1) } to have property 'data' |
| 63 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 2 - Trainer starts session | Status 200 | expected response to have status code 200 but got 400 |
| 64 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 3 - Client joins session | Status 200 | expected response to have status code 200 but got 400 |
| 65 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 4 - Trainer completes session | Status 200 | expected response to have status code 200 but got 400 |
| 66 | chain-session-newman-report.json | 05 - Session Lifecycle Chain | Step 5 - Trainer adds session notes | Status 200 | expected response to have status code 200 but got 400 |
| 67 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Health check | Status is success | expected undefined to equal 'success' |
| 68 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Root endpoint | Status is success | expected undefined to equal 'success' |
| 69 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Waitlist valid email | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 70 | chain-smoke-newman-report.json | 00 - Smoke and Public Checks | Waitlist duplicate email | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 |
| 71 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 2 - Create subscription using Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 401 |
| 72 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 3 - Fetch active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 73 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 4 - Fetch subscription usage | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 74 | chain-subscription-newman-report.json | 06 - Subscription Access Chain | Step 6 - Cancel subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 75 | chain-trainer-availability-newman-report.json | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Status 200 | expected response to have status code 200 but got 401 |
| 76 | chain-trainer-availability-newman-report.json | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Has availability array | Target cannot be null or undefined. |
| 77 | chain-trainer-availability-newman-report.json | 04 - Trainer Availability Chain | Step 3 - Fetch trainer availability by ID | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
| 78 | latest-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Status 200 | expected response to have status code 200 but got 400 |
| 79 | latest-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Email verified | expected 'validation error' to include 'verif' |
| 80 | latest-newman-report.json | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Has access_token | Target cannot be null or undefined. |
| 81 | latest-newman-report.json | 0 — Auth | Refresh token — 200 | Status 401 | expected response to have status code 401 but got 200 |
| 82 | latest-newman-report.json | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 83 | latest-newman-report.json | 0 — Auth | Logout — missing auth header → 401 | Status 401 | expected response to have status code 401 but got 400 |
| 84 | latest-newman-report.json | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing availability (milestone 4) | expected { average_rating: null, …(16) } to have property 'availability' |
| 85 | latest-newman-report.json | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing sessions (milestone 4) | expected { average_rating: null, …(16) } to have property 'sessions' |
| 86 | latest-newman-report.json | 1 — GET /trainers | List trainers — valid auth → 200 | KNOWN GAP — missing earnings (milestone 5) | expected { average_rating: null, …(16) } to have property 'earnings' |
| 87 | latest-newman-report.json | N/A | List trainers — filter by category (strength) | N/A | runtime:extensions~request: request url is empty |
| 88 | latest-newman-report.json | 1 — GET /trainers | List trainers — filter by category (strength) | Status 200 | expected PostmanResponse{ …(5) } to have property 'code' |
| 89 | latest-newman-report.json | 1 — GET /trainers | List trainers — filter by category (strength) | N/A | "undefined" is not valid JSON |
| 90 | latest-newman-report.json | 5 — DELETE /trainers/:id | Delete trainer — valid (cleanup) → 204 | Status 204 No Content | expected response to have status code 204 but got 200 |
| 91 | latest-newman-report.json | 6 — Trainer Availability | Set availability — invalid timezone → 400 | Status 400 or 401 | expected 404 to be one of [ 400, 401 ] |
| 92 | latest-newman-report.json | 6 — Trainer Availability | GET trainer own availability (me) | Status 200 | expected response to have status code 200 but got 404 |
| 93 | latest-newman-report.json | 6 — Trainer Availability | GET trainer own availability (me) | Has availability array | Target cannot be null or undefined. |
| 94 | latest-newman-report.json | 6 — Trainer Availability | GET trainer own availability — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 95 | latest-newman-report.json | N/A | Get upcoming bookings — valid auth → 200 | N/A | runtime:extensions~request: request url is empty |
| 96 | latest-newman-report.json | 8 — Bookings | Get upcoming bookings — valid auth → 200 | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 97 | latest-newman-report.json | N/A | Get all booking slots — public (no auth) | N/A | runtime:extensions~request: request url is empty |
| 98 | latest-newman-report.json | 9 — Booking Slots | Get all booking slots — public (no auth) | Status 200 | expected PostmanResponse{ …(5) } to have property 'code' |
| 99 | latest-newman-report.json | 9 — Booking Slots | Get all booking slots — public (no auth) | N/A | "undefined" is not valid JSON |
| 100 | latest-newman-report.json | 9 — Booking Slots | Get trainer booking slots — valid | data is array | expected { data: [] } to be an array |
| 101 | latest-newman-report.json | 11 — Reviews | Create review — booking not found → 404 | Status 404 or 401 or 422 | expected 403 to be one of [ 404, 401, 422 ] |
| 102 | latest-newman-report.json | N/A | Get trainer reviews — public (no auth) → 200 or 404 | N/A | runtime:extensions~request: request url is empty |
| 103 | latest-newman-report.json | 11 — Reviews | Get trainer reviews — public (no auth) → 200 or 404 | Status 200 or 404 | expected undefined to be one of [ 200, 404 ] |
| 104 | latest-newman-report.json | N/A | Get trainer reviews — invalid pagination → 422 | N/A | runtime:extensions~request: request url is empty |
| 105 | latest-newman-report.json | 11 — Reviews | Get trainer reviews — invalid pagination → 422 | Status 422 or 400 | expected undefined to be one of [ 422, 400 ] |
| 106 | latest-newman-report.json | 13 — Waitlist | Add to waitlist — valid email → 201 | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 107 | latest-newman-report.json | N/A | Get waitlist — filter by email | N/A | runtime:extensions~request: request url is empty |
| 108 | latest-newman-report.json | 13 — Waitlist | Get waitlist — filter by email | Status 200 or 404 | expected undefined to be one of [ 200, 404 ] |
| 109 | latest-newman-report.json | 15 — Health & Root | Root endpoint → 200 | Status is success | expected undefined to equal 'success' |
| 110 | latest-newman-report.json | 16 — Trainer Sessions | GET trainer own sessions (me) | Status 200 | expected response to have status code 200 but got 404 |
| 111 | latest-newman-report.json | 16 — Trainer Sessions | GET trainer own sessions (me) | Has data | expected { code: 'NOT_FOUND', …(1) } to have property 'data' |
| 112 | latest-newman-report.json | 16 — Trainer Sessions | GET trainer sessions — no auth → 401 | Status 401 | expected response to have status code 401 but got 404 |
| 113 | latest-newman-report.json | 17 — Trainer Images | POST upload trainer images | Status 202 or 404 | expected 400 to be one of [ 202, 404, 503 ] |
| 114 | latest-newman-report.json | 18 — Trainer Intro Video | POST upload trainer intro video | Status 202 or 404 or 503 | expected 400 to be one of [ 200, 202, 404, 503 ] |
| 115 | latest-newman-report.json | 19 — Discovery Slots | POST create discovery slot — no auth → 401 | Status 401 | expected response to have status code 401 but got 201 |
| 116 | latest-newman-report.json | 21 — Media (Organisation) | POST /media/images — upload org image (admin) | Status 202 | expected response to have status code 202 but got 400 |
| 117 | latest-newman-report.json | 21 — Media (Organisation) | POST /media/videos — upload org video (admin) | Status 202 | expected response to have status code 202 but got 400 |
| 118 | latest-newman-report.json | 21 — Media (Organisation) | GET /media/:id — get by ID | Status 200 | expected response to have status code 200 but got 400 |
| 119 | latest-newman-report.json | 21 — Media (Organisation) | GET /media/:id — get by ID | Has id | Target cannot be null or undefined. |
| 120 | latest-newman-report.json | 21 — Media (Organisation) | DELETE /media/:id — remove (admin) | Status 200 or 204 | expected [ 200, 204 ] to include 400 |
| 121 | latest-newman-report.json | 22 — Subscriptions | POST /subscriptions — create via Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 400 |
| 122 | latest-newman-report.json | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Status 200 | expected response to have status code 200 but got 404 |
| 123 | latest-newman-report.json | 23 — Trainer (New Endpoints) | GET /trainers/me — own profile | Has id | Target cannot be null or undefined. |
| 124 | latest-newman-report.json | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Status 200 | expected response to have status code 200 but got 404 |
| 125 | latest-newman-report.json | 23 — Trainer (New Endpoints) | GET /trainers/me/clients — client roster | Has data array | expected undefined to be an array |
| 126 | latest-newman-report.json | 24 — Admin (New Endpoints) | GET /admin/clients/:id — single client | Has id | expected [ { …(7) }, { …(7) }, { …(7) }, …(7) ] to have property 'id' |
| 127 | latest-newman-report.json | 24 — Admin (New Endpoints) | GET /admin/clients/:id — not found → 404 | Status 404 | expected response to have status code 404 but got 403 |