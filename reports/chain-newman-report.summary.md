# Newman Report Summary

Report file: reports\chain-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 51 | 2 |
| Assertions | 93 | 26 |
| Test Scripts | 51 | 0 |
| Prerequest Scripts | 1 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 00 - Smoke and Public Checks | Health check | Status is success | expected undefined to equal 'success' |
| 2 | 00 - Smoke and Public Checks | Root endpoint | Status is success | expected undefined to equal 'success' |
| 3 | 00 - Smoke and Public Checks | Waitlist valid email | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 4 | 00 - Smoke and Public Checks | Waitlist duplicate email | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 |
| 5 | 01 - Admin Trainer Management Chain | Step 6 - Delete trainer cleanup | Status 204 No Content | expected response to have status code 204 but got 200 |
| 6 | 02 - Client Onboarding and Trainer Discovery Chain | Step 1 - Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 |
| 7 | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Status 200 | expected response to have status code 200 but got 400 |
| 8 | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Email verified | expected 'validation error' to include 'verif' |
| 9 | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Has access_token | Target cannot be null or undefined. |
| 10 | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | KNOWN GAP — missing availability (milestone 4) | expected { average_rating: null, …(16) } to have property 'availability' |
| 11 | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | KNOWN GAP — missing sessions (milestone 4) | expected { average_rating: null, …(16) } to have property 'sessions' |
| 12 | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | KNOWN GAP — missing earnings (milestone 5) | expected { average_rating: null, …(16) } to have property 'earnings' |
| 13 | 03 - Discovery Booking Chain | Step 3 - Client books discovery call | Status 200 or 201 | expected [ 200, 201 ] to include 400 |
| 14 | N/A | Step 4 - Client views upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 15 | 03 - Discovery Booking Chain | Step 4 - Client views upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 16 | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Status 200 | expected response to have status code 200 but got 404 |
| 17 | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Has availability array | Target cannot be null or undefined. |
| 18 | 04 - Trainer Availability Chain | Step 4 - Invalid timezone is rejected | Status 400 or 401 | expected 404 to be one of [ 400, 401 ] |
| 19 | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Status 200 | expected response to have status code 200 but got 400 |
| 20 | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Has session data | expected { code: 'BAD_REQUEST', …(1) } to have property 'data' |
| 21 | 05 - Session Lifecycle Chain | Step 2 - Trainer starts session | Status 200 | expected response to have status code 200 but got 400 |
| 22 | 05 - Session Lifecycle Chain | Step 3 - Client joins session | Status 200 | expected response to have status code 200 but got 400 |
| 23 | 05 - Session Lifecycle Chain | Step 4 - Trainer completes session | Status 200 | expected response to have status code 200 but got 400 |
| 24 | 05 - Session Lifecycle Chain | Step 5 - Trainer adds session notes | Status 200 | expected response to have status code 200 but got 400 |
| 25 | 06 - Subscription Access Chain | Step 2 - Create subscription using Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 400 |
| 26 | 07 - Non-Subscribed Access Restriction Chain | Step 2 - Attempt paid booking without subscription | Status is 400, 401, 403 or 404 | expected [ 400, 401, 403, 404 ] to include 200 |
| 27 | N/A | Step 3 - Confirm upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 28 | 07 - Non-Subscribed Access Restriction Chain | Step 3 - Confirm upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
