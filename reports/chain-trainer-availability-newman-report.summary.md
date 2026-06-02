# Newman Report Summary

Report file: reports\chain-trainer-availability-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 4 | 0 |
| Assertions | 5 | 3 |
| Test Scripts | 4 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Status 200 | expected response to have status code 200 but got 401 |
| 2 | 04 - Trainer Availability Chain | Step 2 - Trainer fetches own availability | Has availability array | Target cannot be null or undefined. |
| 3 | 04 - Trainer Availability Chain | Step 3 - Fetch trainer availability by ID | Status 200 or 404 | expected 400 to be one of [ 200, 404 ] |
