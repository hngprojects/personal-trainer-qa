# FitCall QA Regression Suite

This repository contains the final QA regression automation and supporting QA deliverables for the FitCall / Personal Trainer MVP.

## Scope

The regression suite covers:

- Authentication & Accounts
- Trainer Management
- Client/Profile Management
- Booking & Sessions
- Admin Dashboard
- Notifications
- Subscription/Payment validation where available

## Source of Truth

The milestone documents are treated as the source of truth for MVP coverage.

## Setup

```bash
npm install
```

## Known Limitations

- Full subscription/payment happy-path testing is currently blocked because staging payment setup or a test payment receipt is not available yet.
- Some client-only and trainer-only flows require real role-specific staging tokens.
- Session lifecycle tests require a valid booking/session record before start, join, complete, and notes flows can be fully validated.
- The current Postman environment contains credential variables, but real registered staging accounts must be provided before full execution.