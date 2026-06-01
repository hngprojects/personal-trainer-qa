# Regression Coverage Matrix

> Maps each API route to its regression test cases and case types.

| Route | Happy Path | Validation / 4xx | Auth / 401-403 | Not Found / 404 | Notes |
| --- | --- | --- | --- | --- | --- |
| `GET /health` | ☑ | n/a | n/a | n/a | Smoke check |
| `POST /auth/login` | ☐ | ☐ | ☐ | n/a | |

## Legend

- ☑ Covered  ◐ Partial  ☐ Not started  n/a Not applicable
