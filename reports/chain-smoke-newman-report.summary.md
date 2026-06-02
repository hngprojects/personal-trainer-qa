# Newman Report Summary

Report file: reports\chain-smoke-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 7 | 0 |
| Assertions | 13 | 4 |
| Test Scripts | 7 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 00 - Smoke and Public Checks | Health check | Status is success | expected undefined to equal 'success' |
| 2 | 00 - Smoke and Public Checks | Root endpoint | Status is success | expected undefined to equal 'success' |
| 3 | 00 - Smoke and Public Checks | Waitlist valid email | Status 201 or 200 | expected 409 to be one of [ 200, 201 ] |
| 4 | 00 - Smoke and Public Checks | Waitlist duplicate email | Status 200 (already on waitlist) | expected response to have status code 200 but got 409 |
