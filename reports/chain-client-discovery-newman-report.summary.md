# Newman Report Summary

Report file: reports\chain-client-discovery-newman-report.json

## Summary

| Metric | Total | Failed |
|---|---:|---:|
| Requests | 6 | 0 |
| Assertions | 16 | 14 |
| Test Scripts | 6 | 0 |
| Prerequest Scripts | 0 | 0 |

## Failures

| No. | Folder / Parent | Request | Test | Error |
|---:|---|---|---|---|
| 1 | 02 - Client Onboarding and Trainer Discovery Chain | Step 1 - Register client account | Status 200 or 201 | expected [ 200, 201 ] to include 429 |
| 2 | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Status 200 | expected response to have status code 200 but got 400 |
| 3 | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Email verified | expected 'validation error' to include 'verif' |
| 4 | 02 - Client Onboarding and Trainer Discovery Chain | Step 2 - Verify client email | Has access_token | Target cannot be null or undefined. |
| 5 | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Status 200 | expected response to have status code 200 but got 401 |
| 6 | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has id | Target cannot be null or undefined. |
| 7 | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has email | Target cannot be null or undefined. |
| 8 | 02 - Client Onboarding and Trainer Discovery Chain | Step 3 - Fetch client profile | Has profile_complete | Target cannot be null or undefined. |
| 9 | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | Status 200 | expected response to have status code 200 but got 401 |
| 10 | 02 - Client Onboarding and Trainer Discovery Chain | Step 5 - List trainers | data is array | expected undefined to be an array |
| 11 | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Status 200 | expected response to have status code 200 but got 401 |
| 12 | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has id | Target cannot be null or undefined. |
| 13 | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has specializations | Target cannot be null or undefined. |
| 14 | 02 - Client Onboarding and Trainer Discovery Chain | Step 6 - Fetch trainer profile | Has created_at | Target cannot be null or undefined. |
