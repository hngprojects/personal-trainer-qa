# FitCall MVP Flow Map

Product: FitCall.me
Team: Personal Trainer
Environment: Staging
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document defines the core MVP flows that must be validated during final regression.

It is used to convert product requirements and milestones into test cases, API chains, manual verification points, and blocked items.

The milestones are treated as the source of truth.

## Flow Status Legend

| Status | Meaning |
|---|---|
| Ready | Flow can be tested once required credentials or test data are available. |
| Partial | Some parts of the flow can be tested, but the full journey has a dependency. |
| Blocked | Flow cannot be completed because a required setup, credential, or feature is missing. |
| Manual | Flow requires UI, mobile app, email, dashboard, or payment verification. |

## Actors

| Actor | Description |
|---|---|
| Public visitor | A user who has not signed in. |
| Client | A fitness user who signs up, discovers trainers, books calls/sessions, and subscribes. |
| Trainer | A trainer who manages availability and sessions. |
| Admin | A web admin who creates trainers and monitors platform activity. |

## Required Test Data

| Data | Needed For | Current Status |
|---|---|---|
| Admin credentials | Admin login, trainer creation, admin monitoring | Pending |
| Client credentials or client token | Client profile, booking, notifications, subscriptions | Pending |
| Trainer credentials or trainer token | Availability, trainer sessions, session lifecycle | Pending |
| Trainer ID | Trainer profile, booking, media, reviews | Pending or generated during test |
| Booking ID | Reschedule, cancel, session lifecycle | Pending or generated during test |
| Session ID | Start, join, complete, notes | Pending or generated during test |
| Subscription ID or subscribed client | Paid session booking and access control | Blocked |
| Payment test receipt | Google Pay or subscription activation | Blocked |
| Test email inbox or OTP access | Client verification and trainer setup | Pending |

## MVP Flow Summary

| Flow ID | Flow Name | Main Actor | Milestones | Status |
|---|---|---|---|---|
| FLOW-001 | Public visitor checks product and discovery entry points | Public visitor | M1, M2 | Partial |
| FLOW-002 | Admin creates and manages trainer | Admin | M1, M2 | Ready after admin credentials |
| FLOW-003 | Client signs up and views trainers | Client | M1, M2 | Ready after client OTP/token |
| FLOW-004 | Client views trainer profile and intro content | Client | M2 | Ready after trainer data |
| FLOW-005 | Admin creates discovery slots | Admin | M3 | Ready after admin credentials |
| FLOW-006 | Client books discovery call | Client | M3 | Ready after client token and trainer data |
| FLOW-007 | Admin monitors discovery booking | Admin | M3, M4 | Ready after admin credentials and booking data |
| FLOW-008 | Trainer sets availability | Trainer | M3 | Ready after trainer token |
| FLOW-009 | Client books paid training session | Client | M3, M5 | Blocked by subscription/payment setup |
| FLOW-010 | Client reschedules or cancels booking | Client | M3 | Partial, needs booking ID |
| FLOW-011 | Session lifecycle is completed | Client, Trainer | M4 | Partial, needs valid session data |
| FLOW-012 | Trainer views sessions and manages session actions | Trainer | M4 | Ready after trainer token and session data |
| FLOW-013 | Notifications are listed and device token is registered | Client or Trainer | M4 | Ready after valid token |
| FLOW-014 | Client views subscription plans | Client | M5 | Ready after valid token |
| FLOW-015 | Client subscribes and gains paid access | Client | M5 | Blocked by payment setup |
| FLOW-016 | Non-subscribed client is blocked from paid booking | Client | M5 | Ready after non-subscribed client token |
| FLOW-017 | Admin monitors clients, sessions, and platform activity | Admin | M2, M4 | Ready after admin credentials |

## Detailed MVP Flows

### FLOW-001: Public visitor checks product and discovery entry points

| Field | Details |
|---|---|
| Actor | Public visitor |
| Milestone | M1, M2 |
| Goal | Confirm the platform is reachable and public entry points work. |
| Preconditions | API is deployed on staging. |
| API Dependencies | GET /health, GET /, POST /waitlist, POST /contact-us |
| UI Dependencies | Landing page, About page, FAQ page, Contact page, Waitlist page |
| Expected End State | Public visitor can access public pages and submit contact or waitlist interest. |
| Automation Status | Partial |
| Manual Status | Required for public pages |
| Test Case IDs To Create | FC-M1-001, FC-M1-012, FC-M1-013 |

Validation points:

- API health endpoint returns successful response.
- Contact form accepts valid payload.
- Contact form rejects missing required fields.
- Waitlist accepts valid email.
- Waitlist handles duplicate email gracefully.
- Public pages load without broken navigation.

### FLOW-002: Admin creates and manages trainer

| Field | Details |
|---|---|
| Actor | Admin |
| Milestone | M1, M2 |
| Goal | Confirm admin can provision and manage trainer records. |
| Preconditions | Admin account exists in staging. |
| API Dependencies | POST /auth/admin/log-in, POST /trainers, GET /trainers, GET /trainers/:id, PATCH /trainers/:id, DELETE /trainers/:id |
| UI Dependencies | Admin login, admin trainer management dashboard |
| Expected End State | Trainer is created, visible, updateable, and manageable by admin. |
| Automation Status | Ready after admin credentials |
| Manual Status | Required for admin dashboard |
| Test Case IDs To Create | FC-M1-002, FC-M1-009, FC-M2-001, FC-M2-004, FC-M2-006, FC-M2-007 |

Validation points:

- Admin login succeeds with valid credentials.
- Admin login rejects invalid credentials.
- Admin can create trainer with valid name, email, and specialization.
- Trainer ID is stored for later chained tests.
- Trainer appears in trainer list.
- Trainer profile can be fetched by ID.
- Trainer profile can be updated.
- Trainer creation rejects missing or invalid fields.
- Trainer can be deleted or deactivated, depending on supported behavior.
- Role-based access prevents unauthenticated trainer creation.

### FLOW-003: Client signs up and views trainers

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M1, M2 |
| Goal | Confirm client onboarding and trainer discovery work. |
| Preconditions | Client email and OTP access are available. |
| API Dependencies | POST /auth/register, POST /auth/verify-email, POST /auth/login, GET /users/me/profile, PATCH /users/me/profile, GET /trainers |
| UI Dependencies | Mobile signup/login, profile, trainer list |
| Expected End State | Client account exists, profile is accessible, and trainers can be viewed. |
| Automation Status | Ready after client OTP/token |
| Manual Status | Required for mobile UI |
| Test Case IDs To Create | FC-M1-004, FC-M1-005, FC-M1-006, FC-M2-001, FC-M2-010 |

Validation points:

- Client registration accepts valid email.
- Verification requires correct OTP.
- Invalid OTP is rejected.
- Client token is stored after verification/login.
- Client profile endpoint returns user details.
- Client profile can be updated with valid values.
- Trainer list is visible to authenticated client.
- Trainer list rejects unauthenticated access.

### FLOW-004: Client views trainer profile and intro content

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M2 |
| Goal | Confirm client can inspect trainer details before booking. |
| Preconditions | Valid client token and trainer ID exist. |
| API Dependencies | GET /trainers, GET /trainers/:id, GET /trainers/:id/intro-video/stream, GET /trainers/:id/reviews |
| UI Dependencies | Mobile trainer profile screen |
| Expected End State | Client can view trainer details, specialization, bio, media, and available profile content. |
| Automation Status | Ready after client token and trainer ID |
| Manual Status | Required for intro video/profile UI |
| Test Case IDs To Create | FC-M2-003, FC-M2-004, FC-M2-009, FC-M2-011 |

Validation points:

- Trainer profile returns expected fields.
- Invalid trainer ID returns safe error response.
- Trainer reviews endpoint handles valid and missing trainer IDs.
- Intro video stream endpoint returns valid response or expected not found state.
- Mobile profile screen displays trainer information correctly.

### FLOW-005: Admin creates discovery slots

| Field | Details |
|---|---|
| Actor | Admin |
| Milestone | M3 |
| Goal | Confirm discovery call availability can be configured. |
| Preconditions | Admin token exists. |
| API Dependencies | POST /discovery-slots, GET /discovery-slots, PUT /discovery-slots/:id, DELETE /discovery-slots/:id |
| UI Dependencies | Admin scheduling interface, if available |
| Expected End State | Discovery slot is created, listed, updateable, and removable. |
| Automation Status | Ready after admin credentials |
| Manual Status | Optional/admin UI check |
| Test Case IDs To Create | FC-M3-001, FC-M3-002, FC-M3-003, FC-M3-004 |

Validation points:

- Admin can create valid discovery slot.
- Slot ID is stored for chained update/delete tests.
- Invalid time format is rejected.
- No-auth create request is rejected.
- Created slot appears in slot list.
- Admin can update slot.
- Admin can delete slot.

### FLOW-006: Client books discovery call

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M3 |
| Goal | Confirm client can book a free discovery call. |
| Preconditions | Client token, trainer ID, and valid discovery datetime exist. |
| API Dependencies | GET /discovery-slots, POST /bookings/discovery, GET /bookings/upcoming |
| UI Dependencies | Mobile discovery booking screen |
| Expected End State | Discovery call is created and appears in upcoming bookings. |
| Automation Status | Ready after client token and trainer data |
| Manual Status | Required for mobile booking confirmation |
| Test Case IDs To Create | FC-M3-005, FC-M3-006, FC-M3-007, FC-M3-008, FC-M3-013, FC-M3-014 |

Validation points:

- Client can view available discovery slots.
- Client can submit valid discovery booking.
- Booking ID is stored if returned.
- Missing required fields are rejected.
- Phone callback mode requires phone number.
- Booking appears in upcoming bookings.
- Confirmation includes meeting link or callback confirmation.
- Mobile confirmation screen displays booking status.

### FLOW-007: Admin monitors discovery booking

| Field | Details |
|---|---|
| Actor | Admin |
| Milestone | M3, M4 |
| Goal | Confirm admin can monitor discovery bookings. |
| Preconditions | Admin token and at least one discovery booking exist. |
| API Dependencies | GET /admin/discovery-bookings, GET /admin/sessions |
| UI Dependencies | Admin dashboard |
| Expected End State | Admin can see bookings and session-related records. |
| Automation Status | Ready after admin credentials and booking data |
| Manual Status | Required for admin dashboard |
| Test Case IDs To Create | FC-M4-007, FC-M4-008 |

Validation points:

- Admin can list discovery bookings.
- Admin can list sessions.
- No-auth admin access is rejected.
- Admin dashboard displays bookings correctly.
- Filters/search are manually verified if implemented.

### FLOW-008: Trainer sets availability

| Field | Details |
|---|---|
| Actor | Trainer |
| Milestone | M3 |
| Goal | Confirm trainer can define availability for booking. |
| Preconditions | Trainer account and trainer token exist. |
| API Dependencies | PUT /trainers/me/availability, GET /trainers/me/availability, GET /trainers/:id/availability |
| UI Dependencies | Trainer portal availability screen |
| Expected End State | Trainer availability is saved and visible. |
| Automation Status | Ready after trainer token |
| Manual Status | Required for trainer portal |
| Test Case IDs To Create | FC-M2-010, FC-M3-015 |

Validation points:

- Trainer can save valid weekly availability.
- Invalid timezone is rejected.
- Empty availability clears availability if supported.
- Client/admin can view trainer availability by trainer ID.
- Non-trainer token cannot access trainer-only availability endpoint.

### FLOW-009: Client books paid training session

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M3, M5 |
| Goal | Confirm subscribed client can book paid training session. |
| Preconditions | Client token, trainer ID, valid slot, and active subscription exist. |
| API Dependencies | POST /bookings, GET /bookings/upcoming, GET /subscriptions/me |
| UI Dependencies | Mobile paid booking screen |
| Expected End State | Paid training booking is created and appears in upcoming bookings. |
| Automation Status | Blocked by subscription/payment setup |
| Manual Status | Blocked unless subscription flow is available |
| Test Case IDs To Create | FC-M3-009, FC-M5-008 |

Validation points:

- Subscribed client can book paid session.
- Non-subscribed client is blocked.
- Booking requires valid trainer ID.
- Booking requires valid schedule.
- Booking requires active subscription or valid subscription ID.
- Booking appears in upcoming bookings after creation.

Current blocker:

- Subscription/payment setup is not available yet.
- No valid subscription ID or subscribed client has been provided.

### FLOW-010: Client reschedules or cancels booking

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M3 |
| Goal | Confirm client can manage existing bookings. |
| Preconditions | Client token and valid booking ID exist. |
| API Dependencies | PUT /bookings/:id/reschedule, PUT /bookings/:id/cancel |
| UI Dependencies | Mobile booking management screen |
| Expected End State | Booking is rescheduled or cancelled according to policy. |
| Automation Status | Partial |
| Manual Status | Required for booking management UI |
| Test Case IDs To Create | FC-M3-010, FC-M3-011, FC-M3-012 |

Validation points:

- Client can reschedule valid booking.
- Reschedule rejects invalid booking ID.
- Reschedule requires new datetime and timezone.
- Client can cancel valid booking.
- Cancel requires reason if backend enforces it.
- Cancellation/reschedule policy is visible in UI.
- Double booking is prevented.

### FLOW-011: Session lifecycle is completed

| Field | Details |
|---|---|
| Actor | Client and Trainer |
| Milestone | M4 |
| Goal | Confirm booked session can move through lifecycle states. |
| Preconditions | Valid booking creates valid session ID. Trainer and client tokens exist. |
| API Dependencies | GET /sessions/:id, PUT /sessions/:id/start, PUT /sessions/:id/join, PUT /sessions/:id/complete, PUT /sessions/:id/notes |
| UI Dependencies | Session start page, session end page, trainer session dashboard |
| Expected End State | Session moves from booked to active to completed and is logged. |
| Automation Status | Partial |
| Manual Status | Required |
| Test Case IDs To Create | FC-M4-001, FC-M4-002, FC-M4-003, FC-M4-004, FC-M4-005, FC-M4-011, FC-M4-012 |

Validation points:

- Session details can be fetched.
- Trainer starts session.
- Client joins active session.
- Trainer completes session.
- Completed session status is persisted.
- Session duration is logged.
- Trainer can add session notes.
- Invalid session IDs are rejected.
- Session start/end screens show correct state and meeting link.

Current blocker:

- Valid booking/session data is required.

### FLOW-012: Trainer views sessions and manages session actions

| Field | Details |
|---|---|
| Actor | Trainer |
| Milestone | M4 |
| Goal | Confirm trainer can view and manage assigned sessions. |
| Preconditions | Trainer token exists and trainer has bookings/sessions. |
| API Dependencies | GET /trainers/me, GET /trainers/me/sessions, GET /trainers/me/clients |
| UI Dependencies | Trainer dashboard |
| Expected End State | Trainer sees upcoming/completed sessions and related clients. |
| Automation Status | Ready after trainer token |
| Manual Status | Required |
| Test Case IDs To Create | FC-M4-006, FC-M4-014 |

Validation points:

- Trainer can fetch own profile.
- Trainer can fetch own sessions.
- Trainer can fetch assigned clients.
- Admin or client token cannot access trainer-only data.
- Trainer dashboard displays relevant sessions.

### FLOW-013: Notifications are listed and device token is registered

| Field | Details |
|---|---|
| Actor | Client or Trainer |
| Milestone | M4 |
| Goal | Confirm notification endpoints support user notifications and device registration. |
| Preconditions | Valid client or trainer token exists. |
| API Dependencies | GET /notifications, POST /register/device |
| UI Dependencies | Mobile notification system |
| Expected End State | User can list notifications and register device token. |
| Automation Status | Ready after valid token |
| Manual Status | Required for actual push/email behavior |
| Test Case IDs To Create | FC-M4-009, FC-M4-010, FC-M4-013 |

Validation points:

- Authenticated user can fetch notifications.
- Invalid token is rejected.
- Android device token can be registered.
- iOS device token can be registered.
- Invalid platform is rejected.
- Missing device token is rejected.
- Actual push/email delivery requires manual or service-level verification.

### FLOW-014: Client views subscription plans

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M5 |
| Goal | Confirm subscription plans are available. |
| Preconditions | Valid token exists. |
| API Dependencies | GET /subscriptions/plans |
| UI Dependencies | Mobile subscription screen |
| Expected End State | User can view available subscription plans. |
| Automation Status | Ready after valid token |
| Manual Status | Required for mobile plan display |
| Test Case IDs To Create | FC-M5-001 |

Validation points:

- Plans endpoint returns available plans.
- Response includes expected plan data.
- Mobile UI displays pricing and session count correctly.

### FLOW-015: Client subscribes and gains paid access

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M5 |
| Goal | Confirm successful payment activates subscription access. |
| Preconditions | Payment test setup, valid receipt, client token, and trainer ID exist. |
| API Dependencies | POST /subscriptions, GET /subscriptions/me, GET /subscriptions/me/usage |
| UI Dependencies | Google Pay flow, subscription success/failure screen |
| Expected End State | Subscription is active and paid session access is enabled. |
| Automation Status | Blocked |
| Manual Status | Blocked |
| Test Case IDs To Create | FC-M5-002, FC-M5-004, FC-M5-005, FC-M5-009 |

Validation points:

- Payment success activates subscription.
- Payment failure does not activate subscription.
- Used receipt is rejected.
- Active subscription can be fetched.
- Subscription usage can be fetched.
- Paid booking access becomes available after activation.

Current blocker:

- Payment/subscription setup is not available yet.
- No valid test receipt or seeded subscribed client is available.

### FLOW-016: Non-subscribed client is blocked from paid booking

| Field | Details |
|---|---|
| Actor | Client |
| Milestone | M5 |
| Goal | Confirm paid session access restriction works. |
| Preconditions | Non-subscribed client token exists. |
| API Dependencies | POST /bookings, GET /subscriptions/me |
| UI Dependencies | Mobile paid booking access restriction |
| Expected End State | Non-subscribed client cannot book paid training session. |
| Automation Status | Ready after non-subscribed client token |
| Manual Status | Required for mobile UI |
| Test Case IDs To Create | FC-M5-007 |

Validation points:

- Non-subscribed client has no active subscription.
- Non-subscribed client cannot book paid session.
- API returns clear rejection message.
- Mobile UI prompts user to subscribe.

### FLOW-017: Admin monitors clients, sessions, and platform activity

| Field | Details |
|---|---|
| Actor | Admin |
| Milestone | M2, M4 |
| Goal | Confirm admin can monitor operational activity. |
| Preconditions | Admin token exists. |
| API Dependencies | GET /admin/clients, GET /admin/clients/:id, GET /admin/sessions, GET /admin/discovery-bookings, GET /admin/user/trainer/count |
| UI Dependencies | Admin dashboard |
| Expected End State | Admin can view users, trainers, sessions, discovery bookings, and counts. |
| Automation Status | Ready after admin credentials |
| Manual Status | Required for dashboard UI |
| Test Case IDs To Create | FC-M4-007, FC-M4-008, FC-M4-015 |

Validation points:

- Admin can list clients.
- Admin can view client details.
- Admin can list sessions.
- Admin can list discovery bookings.
- Admin can view user/trainer counts.
- Unauthenticated access is rejected.
- Admin dashboard displays the same information correctly.

## Flow Execution Priority

| Priority | Flow IDs | Reason |
|---|---|---|
| P0 | FLOW-002, FLOW-003, FLOW-006, FLOW-011, FLOW-015, FLOW-016 | These represent the core product path and check-in focus. |
| P1 | FLOW-004, FLOW-005, FLOW-007, FLOW-008, FLOW-012, FLOW-017 | These support the main MVP and admin/trainer operations. |
| P2 | FLOW-001, FLOW-010, FLOW-013, FLOW-014 | Important but less central than the main booking/session/subscription flow. |

## Chained API Flows To Build

| Chain ID | Chain Name | API Sequence | Current Status |
|---|---|---|---|
| CHAIN-001 | Admin trainer management chain | Admin login, create trainer, fetch trainer, update trainer, delete trainer | Ready after admin credentials |
| CHAIN-002 | Client onboarding and discovery chain | Register client, verify email, login/profile, list trainers, view trainer profile | Ready after client OTP/token |
| CHAIN-003 | Discovery booking chain | Admin creates discovery slot, client views slots, client books discovery call, client views upcoming bookings, admin views discovery bookings | Ready after admin and client tokens |
| CHAIN-004 | Trainer availability chain | Trainer logs in, sets availability, gets own availability, client/admin views trainer availability | Ready after trainer token |
| CHAIN-005 | Session lifecycle chain | Booking exists, fetch session, start session, join session, complete session, add notes | Partial, needs valid session |
| CHAIN-006 | Subscription access chain | View plans, attempt subscription, check subscription status, attempt paid booking | Blocked by payment/subscription setup |
| CHAIN-007 | Non-subscribed access restriction chain | Check no active subscription, attempt paid booking, confirm rejection | Ready after non-subscribed client token |

## Notes For Test Case Creation

Test cases should now be written from the flow map, not just from isolated endpoints.

Each test case must include:

- Test Case ID
- Milestone
- Flow ID
- Feature
- Preconditions
- API route or UI screen
- Test steps
- Expected result
- Automation status
- Execution status
- Bug ID if failed

Every failed test must be linked to a bug report.