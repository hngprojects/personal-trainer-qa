# Newman Report Summary

Report file: reports\chain-discovery-booking-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 5 | 1 |
| Assertions | 7 | 5 |
| Test Scripts | 5 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 03 - Discovery Booking Chain | Step 1 - Admin creates discovery slot | Status 201 or 200 | expected 401 to be one of [ 200, 201 ] |
| 2 | 03 - Discovery Booking Chain | Step 3 - Client books discovery call | Status 200 or 201 | expected [ 200, 201 ] to include 401 |
| 3 | N/A | Step 4 - Client views upcoming bookings | N/A | runtime:extensions~request: request url is empty |
| 4 | 03 - Discovery Booking Chain | Step 4 - Client views upcoming bookings | Status 200 or 401 | expected undefined to be one of [ 200, 401 ] |
| 5 | 03 - Discovery Booking Chain | Step 5 - Admin views discovery bookings | Status 200 | expected response to have status code 200 but got 401 |
| 6 | 03 - Discovery Booking Chain | Step 5 - Admin views discovery bookings | Has data array | expected { code: 'UNAUTHORIZED', …(1) } to have property 'data' |
