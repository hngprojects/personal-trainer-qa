# FitCall Chained API Tests

Product: FitCall.me
Team: Personal Trainer
Environment: Staging
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document defines the chained API tests required for the final QA check-in.

The check-in specifically requires real request chaining, not isolated endpoint checks. Each chain below must pass data from one request to another where possible.

Examples of chained data:

- access_token
- refresh_token
- trainer_id
- booking_slot_id
- discovery_slot_id
- booking_id
- session_id
- subscription_id

## Current Chaining Constraint

The current Postman collection already contains many API requests and variables, including admin_token, client_token, trainer_token, created_trainer_id, created_booking_id, booking_slot_id, and client_otp.

However, full chaining depends on real staging credentials and role-specific tokens.

The collection currently has a setup request that may store the admin token as admin_token, client_token, and trainer_token. This can help requests run, but it is not proper role-based QA. Final validation should use separate admin, client, and trainer tokens where available.

## Chain Status Legend

| Status | Meaning |
|---|---|
| Ready | Chain can run once required values are provided. |
| Partial | Some requests in the chain can run, but full chain requires missing data. |
| Blocked | Chain cannot be completed because required setup is unavailable. |

## CHAIN-001: Admin Trainer Management Chain

| Field | Details |
|---|---|
| Milestones | M1, M2 |
| Main actor | Admin |
| Purpose | Confirm admin can create, fetch, update, and clean up trainer records. |
| Status | Ready after admin credentials |
| Required data | admin_email, admin_password |
| Generated data | admin_token, created_trainer_id |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | Admin login | POST /auth/admin/log-in | admin_email, admin_password | admin_token | Admin login succeeds and token is returned. |
| 2 | Create trainer | POST /trainers | admin_token, trainer payload | created_trainer_id | Trainer is created. |
| 3 | Fetch trainer | GET /trainers/:id | created_trainer_id | None | Created trainer is returned. |
| 4 | Update trainer | PATCH /trainers/:id | created_trainer_id | None | Trainer profile is updated. |
| 5 | Fetch trainer again | GET /trainers/:id | created_trainer_id | None | Updated trainer data is returned. |
| 6 | Delete trainer cleanup | DELETE /trainers/:id | created_trainer_id | None | Trainer is deleted or cleanup is confirmed. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M1-002 | Admin login |
| FC-M1-010 | Admin creates trainer |
| FC-M2-004 | Trainer profile |
| FC-M2-006 | Update trainer |
| FC-M2-007 | Delete trainer |

## CHAIN-002: Client Onboarding and Trainer Discovery Chain

| Field | Details |
|---|---|
| Milestones | M1, M2 |
| Main actor | Client |
| Purpose | Confirm client can register, verify, access profile, and discover trainers. |
| Status | Ready after OTP/client token |
| Required data | client_email, client_otp, trainer_id |
| Generated data | client_token |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | Register client | POST /auth/register | client_email | None | Verification flow is triggered. |
| 2 | Verify email | POST /auth/verify-email | client_email, client_otp | client_token, refresh_token | Email is verified and token is returned. |
| 3 | Fetch client profile | GET /users/me/profile | client_token | None | Client profile is returned. |
| 4 | Update client profile | PATCH /users/me/profile | client_token, profile payload | None | Profile is updated. |
| 5 | List trainers | GET /trainers | client_token | created_trainer_id if returned | Trainer list is returned. |
| 6 | Fetch trainer profile | GET /trainers/:id | created_trainer_id | None | Trainer profile is returned. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M1-004 | Client registration |
| FC-M1-005 | Email verification |
| FC-M1-008 | Client profile fetch |
| FC-M1-009 | Client profile update |
| FC-M2-001 | Trainer list |
| FC-M2-004 | Trainer profile |

## CHAIN-003: Discovery Booking Chain

| Field | Details |
|---|---|
| Milestones | M3, M4 |
| Main actors | Admin, Client |
| Purpose | Confirm admin can create discovery availability and client can book a discovery call. |
| Status | Ready after admin and client credentials |
| Required data | admin_token, client_token, trainer_id |
| Generated data | booking_slot_id or discovery_slot_id, created_booking_id |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | Admin creates discovery slot | POST /discovery-slots | admin_token, slot payload | booking_slot_id | Discovery slot is created. |
| 2 | Client lists discovery slots | GET /discovery-slots | client_token | None | Available slots are returned. |
| 3 | Client books discovery call | POST /bookings/discovery | client_token, trainer_id, selected_datetime | created_booking_id | Discovery call booking succeeds. |
| 4 | Client views upcoming bookings | GET /bookings/upcoming | client_token | None | New booking appears in upcoming bookings. |
| 5 | Admin views discovery bookings | GET /admin/discovery-bookings | admin_token | None | Admin can see discovery booking. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M3-001 | Create discovery slot |
| FC-M3-002 | List discovery slots |
| FC-M3-005 | Book discovery call |
| FC-M3-008 | Upcoming bookings |
| FC-M3-014 | Admin views discovery booking |

## CHAIN-004: Trainer Availability Chain

| Field | Details |
|---|---|
| Milestones | M3 |
| Main actors | Trainer, Client/Admin |
| Purpose | Confirm trainer can set availability and others can view it. |
| Status | Ready after trainer token |
| Required data | trainer_token, created_trainer_id |
| Generated data | None |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | Trainer sets availability | PUT /trainers/me/availability | trainer_token, availability payload | None | Availability is saved. |
| 2 | Trainer fetches own availability | GET /trainers/me/availability | trainer_token | None | Saved availability is returned. |
| 3 | Client/admin fetches trainer availability | GET /trainers/:id/availability | created_trainer_id | None | Trainer availability is visible. |
| 4 | Invalid timezone validation | PUT /trainers/me/availability | trainer_token, invalid timezone | None | Invalid timezone is rejected. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M3-015 | Trainer availability |
| FC-M3-016 | Invalid availability timezone |

## CHAIN-005: Session Lifecycle Chain

| Field | Details |
|---|---|
| Milestones | M4 |
| Main actors | Trainer, Client |
| Purpose | Confirm a valid session can move through lifecycle states. |
| Status | Partial |
| Required data | client_token, trainer_token, valid session_id |
| Generated data | None unless booking creates session_id |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | Fetch session | GET /sessions/:id | session_id | None | Session details are returned. |
| 2 | Trainer starts session | PUT /sessions/:id/start | trainer_token, session_id | None | Session becomes active. |
| 3 | Client joins session | PUT /sessions/:id/join | client_token, session_id | None | Client joins active session. |
| 4 | Trainer completes session | PUT /sessions/:id/complete | trainer_token, session_id | None | Session becomes completed. |
| 5 | Trainer adds notes | PUT /sessions/:id/notes | trainer_token, session_id, note | None | Session note is saved. |
| 6 | Fetch completed session | GET /sessions/:id | session_id | None | Completed session status is returned. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M4-001 | Fetch session |
| FC-M4-002 | Start session |
| FC-M4-003 | Join session |
| FC-M4-004 | Complete session |
| FC-M4-005 | Session notes |
| FC-M4-011 | Full lifecycle chain |

### Current Blocker

A valid session_id is required. The current suite can test not-found and auth behavior, but cannot prove full lifecycle until valid booking/session data is available.

## CHAIN-006: Subscription Access Chain

| Field | Details |
|---|---|
| Milestones | M5 |
| Main actor | Client |
| Purpose | Confirm subscription plans, payment activation, subscription status, and paid access behavior. |
| Status | Blocked / Partial |
| Required data | client_token, trainer_id, valid payment receipt or subscribed client |
| Generated data | subscription_id |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | View plans | GET /subscriptions/plans | client_token | None | Subscription plans are returned. |
| 2 | Create subscription | POST /subscriptions | client_token, trainer_id, valid receipt | subscription_id | Subscription is activated. |
| 3 | Fetch active subscription | GET /subscriptions/me | client_token | None | Active subscription is returned. |
| 4 | Fetch subscription usage | GET /subscriptions/me/usage | client_token | None | Usage details are returned. |
| 5 | Book paid training session | POST /bookings | client_token, trainer_id, subscription_id | created_booking_id | Paid booking succeeds. |
| 6 | Cancel subscription | POST /client/cancel/subscription | client_token | None | Subscription is cancelled. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M5-001 | Subscription plans |
| FC-M5-002 | Create subscription |
| FC-M5-004 | Active subscription |
| FC-M5-005 | Subscription usage |
| FC-M5-006 | Cancel subscription |
| FC-M5-008 | Subscribed paid booking |

### Current Blocker

Payment/subscription setup is not available. Full subscription activation cannot be validated without a test receipt, payment sandbox, seeded active subscription, or subscribed client account.

## CHAIN-007: Non-Subscribed Access Restriction Chain

| Field | Details |
|---|---|
| Milestones | M5 |
| Main actor | Client |
| Purpose | Confirm non-subscribed clients cannot book paid training sessions. |
| Status | Ready after non-subscribed client token |
| Required data | non_subscribed_client_token, trainer_id |
| Generated data | None |

### Request Sequence

| Step | Request | Method / Route | Input | Output To Store | Expected Result |
|---|---|---|---|---|---|
| 1 | Fetch subscription status | GET /subscriptions/me | client_token | None | No active subscription is found or 404 is returned. |
| 2 | Attempt paid booking | POST /bookings | client_token, trainer_id, paid session payload | None | Booking is rejected because user is not subscribed. |
| 3 | Confirm upcoming bookings | GET /bookings/upcoming | client_token | None | No unauthorized paid booking appears. |

### Test Case Mapping

| Test Case ID | Requirement |
|---|---|
| FC-M5-004 | Active subscription lookup |
| FC-M5-007 | Non-subscribed paid booking restriction |
| FC-M3-008 | Upcoming bookings |

## Implementation Decision

The final Postman automation should be organized around these chain folders:

- 00 - Smoke and Public Checks
- 01 - Admin Trainer Management Chain
- 02 - Client Onboarding and Trainer Discovery Chain
- 03 - Discovery Booking Chain
- 04 - Trainer Availability Chain
- 05 - Session Lifecycle Chain
- 06 - Subscription Access Chain
- 07 - Non-Subscribed Access Restriction Chain
- 99 - Negative and Security Regression

## Execution Notes

If full role credentials are unavailable, the final report should mark affected chains as Blocked.

If a chain partially runs but fails because of missing test data, the execution report should mark the specific test as Blocked, not Failed.

If a request fails despite having correct credentials and test data, it should be marked Failed and logged in the bug report.