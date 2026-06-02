# Newman Report Summary

Report file: reports\chain-session-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 5 | 0 |
| Assertions | 6 | 6 |
| Test Scripts | 5 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Status 200 | expected response to have status code 200 but got 400 |
| 2 | 05 - Session Lifecycle Chain | Step 1 - Fetch session details | Has session data | expected { code: 'BAD_REQUEST', …(1) } to have property 'data' |
| 3 | 05 - Session Lifecycle Chain | Step 2 - Trainer starts session | Status 200 | expected response to have status code 200 but got 400 |
| 4 | 05 - Session Lifecycle Chain | Step 3 - Client joins session | Status 200 | expected response to have status code 200 but got 400 |
| 5 | 05 - Session Lifecycle Chain | Step 4 - Trainer completes session | Status 200 | expected response to have status code 200 but got 400 |
| 6 | 05 - Session Lifecycle Chain | Step 5 - Trainer adds session notes | Status 200 | expected response to have status code 200 but got 400 |
