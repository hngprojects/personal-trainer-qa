# Newman Report Summary

Report file: reports\chain-non-subscribed-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 3 | 1 |
| Assertions | 4 | 2 |
| Test Scripts | 3 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 07 - Non-Subscribed Access Restriction Chain | Step 1 - Fetch active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 2 | N/A | Step 3 - Confirm upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 3 | 07 - Non-Subscribed Access Restriction Chain | Step 3 - Confirm upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
