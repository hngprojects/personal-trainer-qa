# Newman Report Summary

Report file: reports\auth-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 18 | 0 |
| Assertions | 26 | 7 |
| Test Scripts | 18 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 0 — Auth | SETUP (Step 1) — Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 |
| 2 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Status 200 | expected response to have status code 200 but got 400 |
| 3 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Email verified | expected 'validation error' to include 'verif' |
| 4 | 0 — Auth | SETUP (Step 2) — Verify client email (OTP) | Has access_token | Target cannot be null or undefined. |
| 5 | 0 — Auth | Refresh token — 200 | Status 401 | expected response to have status code 401 but got 200 |
| 6 | 0 — Auth | Refresh token — missing access_token body → 400 | Status 400 | expected response to have status code 400 but got 401 |
| 7 | 0 — Auth | Logout — missing auth header → 401 | Status 401 | expected response to have status code 401 but got 400 |
