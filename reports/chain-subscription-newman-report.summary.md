# Newman Report Summary

Report file: reports\chain-subscription-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 6 | 0 |
| Assertions | 7 | 4 |
| Test Scripts | 6 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 06 - Subscription Access Chain | Step 2 - Create subscription using Google IAP | Status 201 or 409 | expected [ 201, 409 ] to include 401 |
| 2 | 06 - Subscription Access Chain | Step 3 - Fetch active subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 3 | 06 - Subscription Access Chain | Step 4 - Fetch subscription usage | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
| 4 | 06 - Subscription Access Chain | Step 6 - Cancel subscription | Status 200 or 404 | expected [ 200, 404 ] to include 401 |
