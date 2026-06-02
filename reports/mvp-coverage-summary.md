# FitCall MVP Coverage Summary

Product: FitCall.me
Team: Personal Trainer
Environment: Staging
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document summarizes MVP regression coverage for the final QA check-in.

It confirms which milestones, features, API flows, and user journeys are covered by the regression suite, and which areas are blocked by unavailable credentials, setup, or test data.

## MVP Coverage Position

The FitCall MVP regression suite is structured around the milestone documents as the source of truth.

The main MVP areas covered are:

- Authentication and accounts
- Trainer management
- Client profile management
- Trainer discovery
- Discovery call booking
- Booking and session management
- Admin dashboard and monitoring
- Notifications
- Subscription and payment validation where available

## Milestone Coverage Summary

| Milestone | Scope | Coverage Status | Notes |
|---|---|---|---|
| M1 | Authentication and trainer supply | Partial | API routes and tests are defined. Full execution needs admin, client, and trainer credentials. |
| M2 | Trainer discovery and profile | Partial | Trainer list, profile, filters, media, and admin trainer management are mapped. Full execution needs valid token and trainer data. |
| M3 | Booking and discovery call | Partial | Booking, discovery slots, booking slots, reschedule, cancel, and confirmation checks are mapped. Full execution needs client token and valid booking data. |
| M4 | Session lifecycle and notifications | Partial | Session start, join, complete, notes, admin monitoring, trainer sessions, and notifications are mapped. Full execution needs valid booking and session data. |
| M5 | Subscription and payment conversion | Blocked / Partial | Plan listing, validation, and access-control checks are mapped. Full payment activation is blocked because subscription/payment setup is not available yet. |

## Major MVP Flow Coverage

| Flow ID | MVP Flow | Coverage Status | Automation Method | Notes |
|---|---|---|---|---|
| FLOW-001 | Admin login, create trainer, fetch trainer, update trainer, delete trainer | Partial | Postman/Newman | Needs admin credentials. |
| FLOW-002 | Client register, verify email, login/profile, view trainers, view trainer profile | Partial | Postman/Newman | Needs client account and OTP. |
| FLOW-003 | Admin creates discovery slot, client views slot, client books discovery call, admin views booking | Partial | Postman/Newman | Needs admin and client tokens. |
| FLOW-004 | Client books discovery call, booking appears in upcoming bookings, admin monitors booking | Partial | Postman/Newman | Needs valid booking data. |
| FLOW-005 | Trainer sets availability, client views slots, client books session | Blocked / Partial | Postman/Newman | Needs trainer token and subscription setup. |
| FLOW-006 | Booking created, session fetched, trainer starts session, client joins, trainer completes session | Blocked / Partial | Postman/Newman | Needs valid session record. |
| FLOW-007 | Completed session, subscription prompt, plan viewed, payment attempted, subscription checked | Blocked / Partial | Postman/Newman and manual verification | Payment setup is not available yet. |
| FLOW-008 | Non-subscribed client attempts paid booking and is denied | Partial | Postman/Newman | Needs non-subscribed client token. |
| FLOW-009 | Admin views sessions and monitors lifecycle status | Partial | Postman/Newman | Needs admin token and session data. |
| FLOW-010 | User views notifications and registers device token | Partial | Postman/Newman | Needs valid role token. |

## API Coverage Summary

| Area | Coverage Status | Notes |
|---|---|---|
| Health and root | Ready | Public API availability checks can run without credentials. |
| Auth | Partial | Negative auth tests can run. Full role auth needs valid credentials. |
| Trainers | Partial | Trainer CRUD and discovery tests are defined. Admin token and trainer ID are required. |
| Users/Profile | Partial | Client profile tests require valid client token. |
| Booking slots | Partial | Public list can run. Admin create/update/delete requires admin token. |
| Discovery slots | Partial | Requires client/admin token depending on endpoint. |
| Bookings | Partial | Discovery booking requires client token. Paid booking requires subscription data. |
| Sessions | Blocked / Partial | Session lifecycle requires valid session ID and role tokens. |
| Admin | Partial | Requires admin token. |
| Notifications | Partial | Requires valid token. |
| Media | Partial | Some tests require files and admin token. |
| Reviews | Partial | Requires valid booking for create review. Public trainer reviews can be tested if trainer ID exists. |
| Subscriptions | Blocked / Partial | Plan listing and validations can be tested. Payment activation is blocked. |
| Contact | Ready | Public contact endpoint can be tested. |
| Waitlist | Partial | Public waitlist add can run. Admin waitlist list requires admin token. |

## Manual Verification Coverage

Some MVP areas require manual verification because they involve frontend, mobile, email, notifications, or third-party integrations.

| Area | Manual Verification Needed | Reason |
|---|---|---|
| Mobile trainer list screen | Yes | API tests prove data, but mobile UI must confirm display and navigation. |
| Mobile trainer profile screen | Yes | API tests prove data, but mobile UI must confirm profile details and video behavior. |
| Discovery booking UI | Yes | API can validate booking request, but UI flow must confirm date/time selection and confirmation screen. |
| Session start and end screens | Yes | API can validate lifecycle endpoints, but UI must confirm screen behavior and meeting link visibility. |
| Trainer dashboard | Yes | API can validate trainer sessions, but portal UI must confirm visibility and actions. |
| Admin dashboard | Yes | API can validate admin session endpoints, but UI must confirm dashboard display and filtering. |
| Email confirmations | Yes | Requires access to test inbox or email logs. |
| Notifications | Yes | Push/email behavior needs device or notification service verification. |
| Google Pay/payment flow | Yes | Requires test payment setup or sandbox receipt. |

## Blockers Affecting Full MVP Validation

| Blocker ID | Area | Impact | Required Resolution | Status |
|---|---|---|---|---|
| BLK-001 | Credentials | Full role-based regression cannot run. | Provide real staging admin, client, and trainer credentials or tokens. | Open |
| BLK-002 | Client OTP | Client registration flow cannot be completed automatically. | Provide OTP access or test email inbox. | Open |
| BLK-003 | Trainer setup | Trainer first-time login and trainer-only endpoints cannot be fully validated. | Provide trainer account or setup token. | Open |
| BLK-004 | Booking/session data | Full session lifecycle cannot be validated. | Provide or create valid booking/session records. | Open |
| BLK-005 | Subscription/payment | M5 happy-path payment activation cannot be validated. | Provide payment test setup, test receipt, or seeded subscribed client. | Open |
| BLK-006 | Mobile app access | UI flows cannot be manually confirmed. | Provide app build, emulator access, or demo walkthrough. | Open |

## Coverage Conclusion

The FitCall QA regression suite is structured to cover the full MVP across M1 to M5.

Current coverage is strongest at the documentation, API mapping, and automation structure level.

Full execution is currently limited by missing staging credentials, role-specific tokens, seeded booking/session data, and unavailable subscription/payment setup.

The final submission should therefore present:

- Automated API regression through Postman/Newman.
- A complete route inventory.
- A regression coverage matrix.
- A traceability matrix.
- A test execution report.
- A bug report log.
- This MVP coverage summary.
- A clear blocker section for anything that cannot be executed before submission.