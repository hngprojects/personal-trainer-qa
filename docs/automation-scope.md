# FitCall Automation Scope

Product: FitCall.me
Team: Personal Trainer
Environment: Staging
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document defines which FitCall regression test cases will be automated, manually verified, blocked, or deferred.

The final QA check-in requires automation execution, API chaining, full MVP coverage, bug reporting, and traceability. This scope keeps automation focused on the flows that can realistically be validated through API regression.

## Automation Decision Rules

| Rule | Decision |
|---|---|
| API endpoint with clear request and response | Automate |
| API chain across auth, trainer, booking, session, or subscription | Automate |
| UI screen behavior | Manual |
| Email, OTP, invite link, or push notification delivery | Manual or blocked unless access is provided |
| Payment success/failure | Blocked unless payment sandbox or test receipt is provided |
| Flow requiring unavailable credentials | Blocked until credentials are provided |
| Flow requiring valid seeded session/subscription data | Partial or blocked |

## Automation Categories

| Category | Meaning |
|---|---|
| Automate Now | Can run immediately or with current Postman collection and public/negative tests. |
| Automate After Credentials | Can run once admin, client, or trainer credentials are provided. |
| Automate After Seed Data | Needs valid trainer, booking, session, or subscription records. |
| Manual Verification | Requires frontend, mobile, admin dashboard, email, or payment UI. |
| Blocked | Cannot be completed until missing system setup is provided. |
| Defer | Useful, but not central to final check-in. |

## Automate Now

These tests can run without real role credentials or can validate unauthenticated/negative behavior.

| Test Case ID | Feature | Reason |
|---|---|---|
| FC-M1-001 | API health check | Public endpoint. |
| FC-M1-003 | Invalid admin login | Negative auth validation. |
| FC-M1-004 | Client registration | Can run with test email if allowed. |
| FC-M1-006 | Invalid email verification | Negative OTP validation. |
| FC-M1-012 | Trainer creation requires auth | No-auth protected route check. |
| FC-M2-002 | Trainer list auth guard | No-auth protected route check. |
| FC-M2-005 | Invalid trainer ID handling | Validates safe error handling. |
| FC-M3-006 | Discovery booking required fields | Can run if auth behavior is expected, but better after client token. |
| FC-M3-007 | Phone callback phone number rule | Better after client token. |
| FC-M5-003 | Subscription missing fields validation | Better after client token. |
| FC-M1-013 | Contact form validation | Public endpoint if included in collection. |
| FC-M1-014 | Waitlist add and duplicate handling | Public endpoint if included in collection. |

## Automate After Credentials

These tests are good API automation candidates, but require real role-specific credentials or tokens.

| Test Case ID | Feature | Required Credential |
|---|---|---|
| FC-M1-002 | Admin login | Admin email and password |
| FC-M1-005 | Client email verification | Client email and OTP |
| FC-M1-007 | Client login | Client credentials |
| FC-M1-008 | Client profile fetch | Client token |
| FC-M1-009 | Client profile update | Client token |
| FC-M1-010 | Admin creates trainer | Admin token |
| FC-M1-011 | Trainer creation validation | Admin token |
| FC-M1-014 | Role-based access control | Admin, client, and trainer tokens |
| FC-M2-001 | Trainer list | Valid token |
| FC-M2-003 | Trainer category filter | Valid token |
| FC-M2-004 | Trainer profile | Valid token and trainer ID |
| FC-M2-006 | Update trainer profile | Admin token and trainer ID |
| FC-M2-007 | Delete trainer profile | Admin token and trainer ID |
| FC-M3-001 | Create discovery slot | Admin token |
| FC-M3-002 | List discovery slots | Valid token |
| FC-M3-003 | Update discovery slot | Admin token and slot ID |
| FC-M3-004 | Delete discovery slot | Admin token and slot ID |
| FC-M3-005 | Book discovery call | Client token and trainer ID |
| FC-M3-008 | Upcoming bookings | Client token |
| FC-M3-015 | Trainer availability | Trainer token |
| FC-M3-016 | Invalid availability timezone | Trainer token |
| FC-M4-006 | Trainer own sessions | Trainer token |
| FC-M4-007 | Trainer own profile | Trainer token |
| FC-M4-008 | Trainer client roster | Trainer token |
| FC-M4-009 | Admin sessions list | Admin token |
| FC-M4-010 | Admin discovery bookings list | Admin token |
| FC-M4-012 | Notifications list | Valid token |
| FC-M4-013 | Register Android device token | Client token |
| FC-M4-014 | Register iOS device token | Client token |
| FC-M4-015 | Invalid notification platform | Client token |
| FC-M5-001 | Subscription plans | Valid token |
| FC-M5-004 | Active subscription lookup | Client token |
| FC-M5-005 | Subscription usage | Client token |
| FC-M5-007 | Paid access restriction | Non-subscribed client token |

## Automate After Seed Data

These tests require successful prior flow data, such as a trainer ID, booking ID, session ID, or subscription ID.

| Test Case ID | Feature | Required Data |
|---|---|---|
| FC-M2-008 | Trainer reviews list | Valid trainer ID |
| FC-M2-009 | Trainer intro video stream | Valid trainer ID |
| FC-M2-010 | Trainer image management | Trainer ID and upload file |
| FC-M3-011 | Reschedule booking | Valid booking ID |
| FC-M3-012 | Cancel booking | Valid booking ID |
| FC-M3-013 | Booking confirmation | Successful booking |
| FC-M3-014 | Admin views discovery booking | Booking data |
| FC-M3-017 | Double-booking prevention | Existing booked slot |
| FC-M4-001 | Fetch session details | Valid session ID |
| FC-M4-002 | Start session | Trainer token and valid session ID |
| FC-M4-003 | Join session | Client token and active session |
| FC-M4-004 | Complete session | Trainer token and active session |
| FC-M4-005 | Session notes | Trainer token and valid session ID |
| FC-M4-011 | Full session lifecycle chain | Client token, trainer token, booking, and session |
| FC-M5-006 | Cancel subscription | Active subscribed client |
| FC-M5-008 | Subscribed paid booking access | Subscribed client or valid subscription ID |

## Manual Verification

These cannot be fully proven through API automation alone.

| Manual Test ID | Area | Reason |
|---|---|---|
| FC-MANUAL-001 | Landing/public pages | Requires frontend page verification. |
| FC-MANUAL-002 | Mobile trainer list | Requires mobile app screen verification. |
| FC-MANUAL-003 | Mobile trainer profile | Requires mobile app screen and media verification. |
| FC-MANUAL-004 | Discovery booking UI | Requires mobile booking screen verification. |
| FC-MANUAL-005 | Session start/end UI | Requires mobile session screen verification. |
| FC-MANUAL-006 | Trainer dashboard | Requires trainer portal verification. |
| FC-MANUAL-007 | Admin dashboard | Requires admin dashboard verification. |
| FC-MANUAL-008 | Subscription/payment UI | Requires Google Pay or payment sandbox. |

## Blocked Automation

These are blocked because the required setup is not available yet.

| Test Case ID | Feature | Blocker |
|---|---|---|
| FC-M1-013 | Trainer setup invitation | Trainer setup token or email access is unavailable. |
| FC-M3-009 | Paid training booking | Subscription is not set up yet. |
| FC-M4-011 | Full session lifecycle chain | Valid booking/session data is unavailable. |
| FC-M5-002 | Create subscription | Payment setup or test receipt is unavailable. |
| FC-M5-006 | Cancel subscription | Subscribed client is unavailable. |
| FC-M5-008 | Subscribed paid booking access | Subscribed client or subscription ID is unavailable. |
| FC-M5-009 | Google Pay success/failure handling | Payment sandbox or test receipt is unavailable. |
| FC-M5-010 | Subscription prompt after completed session | Completed session data is unavailable. |

## Chained API Automation Scope

These are the main chains that should be represented in the final automation.

| Chain Test ID | Chain Name | Automation Status | Required Data |
|---|---|---|---|
| FC-CHAIN-001 | Admin trainer management | Automate after admin credentials | Admin credentials |
| FC-CHAIN-002 | Client onboarding and discovery | Automate after OTP/client token | Client email, OTP, client token |
| FC-CHAIN-003 | Discovery booking | Automate after admin and client tokens | Admin token, client token, trainer ID |
| FC-CHAIN-004 | Trainer availability | Automate after trainer token | Trainer token and trainer ID |
| FC-CHAIN-005 | Session lifecycle | Partial | Valid booking and session ID |
| FC-CHAIN-006 | Subscription access | Blocked | Payment setup or subscription test data |
| FC-CHAIN-007 | Non-subscribed access restriction | Automate after non-subscribed client token | Non-subscribed client token |

## Automation Tooling Decision

The primary automation tool for this final QA check-in is Postman executed through Newman.

Reason:

- The existing Postman collection already covers most API areas.
- Newman provides CLI execution.
- Newman generates visible pass/fail output.
- The collection can be stored in the QA regression repo.
- The final command can be run through npm.

Command:

```bash
npm run test:regression
```
## Out of Scope For Final Automation

The following are not excluded from QA, but they are not practical for API automation in this final deliverable:

Full Google Pay sandbox validation without test receipt.
Push notification delivery without device/service verification.
Email delivery confirmation without inbox or email logs.
Frontend/mobile visual regression.
Admin dashboard UI filtering unless dashboard access is provided.
Trainer portal UI verification unless portal access is provided.

## Final Automation Position

The final regression automation will focus on:

API availability.
Authentication and access control.
Trainer management.
Trainer discovery.
Discovery slots.
Discovery booking.
Booking validation.
Session endpoints where valid session data exists.
Admin monitoring endpoints.
Notification endpoints.
Subscription plan and access-control validation.

The final report must clearly mark unavailable payment, subscription, session, and credential-dependent flows as Blocked, not Passed.