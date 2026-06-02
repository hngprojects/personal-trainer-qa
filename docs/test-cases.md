# FitCall Test Cases

Product: FitCall.me
Team: Personal Trainer
Environment: Staging
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document defines the regression test cases for the FitCall MVP.

The test cases are derived from:

- MVP flow map
- Regression coverage matrix
- Route inventory
- FitCall milestone structure
- Existing Postman collection

Each test case must be traceable to:

- Milestone
- Flow ID
- Requirement
- API route or UI screen
- Execution result
- Bug ID, where applicable

## Status Legend

| Status | Meaning |
|---|---|
| Ready | Test can run once required data is available. |
| Partial | Test can partly run, but full validation needs another dependency. |
| Blocked | Test cannot run because required data, credentials, or setup is missing. |
| Manual | Test requires UI, mobile, admin dashboard, email, or payment verification. |

## Priority Legend

| Priority | Meaning |
|---|---|
| P0 | Critical MVP regression case. |
| P1 | Important supporting regression case. |
| P2 | Useful but not central to final MVP proof. |

## Test Cases

### M1: Authentication and Trainer Supply

| Test Case ID | Priority | Flow ID | Feature | Test Type | Preconditions | Steps | Expected Result | Automation Status |
|---|---|---|---|---|---|---|---|---|
| FC-M1-001 | P0 | FLOW-001 | API health check | Automated API | Staging API is deployed | 1. Send GET /health. 2. Send GET /. | API responds successfully and confirms service availability. | Ready |
| FC-M1-002 | P0 | FLOW-002 | Admin login | Automated API | Registered admin credentials exist | 1. Send POST /auth/admin/log-in with valid admin email and password. 2. Inspect response body. | Response returns success status and access token. | Ready after admin credentials |
| FC-M1-003 | P0 | FLOW-002 | Invalid admin login | Automated API | Admin email exists | 1. Send POST /auth/admin/log-in with wrong password. | Request is rejected with 401 or equivalent auth failure. | Ready |
| FC-M1-004 | P0 | FLOW-003 | Client registration | Automated API | Test email is available | 1. Send POST /auth/register with client email. | Registration request succeeds and verification flow is triggered. | Ready |
| FC-M1-005 | P0 | FLOW-003 | Client email verification | Automated API | Client registration has been initiated and OTP is available | 1. Send POST /auth/verify-email with email and OTP. 2. Store client token if returned. | Email is verified and client token is available. | Ready after OTP |
| FC-M1-006 | P0 | FLOW-003 | Invalid email verification | Automated API | Test client email is available | 1. Send POST /auth/verify-email with invalid OTP. | Request is rejected and email is not verified. | Ready |
| FC-M1-007 | P0 | FLOW-003 | Client login | Automated API | Registered client account exists | 1. Send POST /auth/login with client credentials. | Client logs in and receives token. | Ready after client credentials |
| FC-M1-008 | P1 | FLOW-003 | Client profile fetch | Automated API | Valid client token exists | 1. Send GET /users/me/profile with client token. | Client profile is returned. | Ready after client token |
| FC-M1-009 | P1 | FLOW-003 | Client profile update | Automated API | Valid client token exists | 1. Send PATCH /users/me/profile with valid profile data. 2. Fetch profile again. | Profile update succeeds and returned data reflects update. | Ready after client token |
| FC-M1-010 | P0 | FLOW-002 | Admin creates trainer | Automated API | Valid admin token exists | 1. Send POST /trainers with valid trainer data. 2. Store trainer ID. | Trainer is created or accepted, and trainer ID is available. | Ready after admin token |
| FC-M1-011 | P0 | FLOW-002 | Trainer creation validation | Automated API | Valid admin token exists | 1. Send POST /trainers with missing email. 2. Send POST /trainers with invalid email. 3. Send POST /trainers with invalid specialization. | Invalid trainer payloads are rejected with clear error responses. | Ready after admin token |
| FC-M1-012 | P0 | FLOW-002 | Trainer creation requires auth | Automated API | None | 1. Send POST /trainers without auth token. | Request is rejected with 401. | Ready |
| FC-M1-013 | P1 | FLOW-002 | Trainer setup invitation | Manual / API | Trainer is created and email/setup token is available | 1. Create trainer. 2. Check invite email or setup token. 3. Complete trainer set-password flow. | Trainer can complete first-time setup. | Blocked until setup token/email access |
| FC-M1-014 | P0 | FLOW-002 | Role-based access control | Automated API | Admin, client, and trainer tokens exist | 1. Call admin endpoints with non-admin token. 2. Call trainer endpoints with non-trainer token. 3. Call client endpoints with invalid token. | Protected routes reject unauthorized roles. | Ready after role tokens |

### M2: Trainer Discovery and Profile

| Test Case ID | Priority | Flow ID | Feature | Test Type | Preconditions | Steps | Expected Result | Automation Status |
|---|---|---|---|---|---|---|---|---|
| FC-M2-001 | P0 | FLOW-003 | Trainer list | Automated API | Valid client or admin token exists | 1. Send GET /trainers. | Response returns trainer list. | Ready after token |
| FC-M2-002 | P0 | FLOW-003 | Trainer list auth guard | Automated API | None | 1. Send GET /trainers without auth. | Request is rejected with 401. | Ready |
| FC-M2-003 | P1 | FLOW-004 | Trainer category filter | Automated API | Valid token exists | 1. Send GET /trainers?category=strength. | Filtered list returns valid response. | Ready after token |
| FC-M2-004 | P0 | FLOW-004 | Trainer profile | Automated API | Valid token and trainer ID exist | 1. Send GET /trainers/:id. | Trainer profile returns expected details. | Ready after trainer ID |
| FC-M2-005 | P0 | FLOW-004 | Invalid trainer ID handling | Automated API | Valid token exists | 1. Send GET /trainers/not-a-uuid. | API returns safe error response and does not expose raw backend error. | Ready after token |
| FC-M2-006 | P1 | FLOW-002 | Update trainer profile | Automated API | Valid admin token and trainer ID exist | 1. Send PATCH /trainers/:id with valid update payload. 2. Fetch trainer profile. | Trainer profile is updated. | Ready after admin token |
| FC-M2-007 | P1 | FLOW-002 | Delete trainer profile | Automated API | Valid admin token and trainer ID exist | 1. Send DELETE /trainers/:id. 2. Fetch same trainer. | Trainer is deleted or no longer available according to supported behavior. | Ready after admin token |
| FC-M2-008 | P1 | FLOW-004 | Trainer reviews list | Automated API | Valid trainer ID exists | 1. Send GET /trainers/:id/reviews. | Response returns reviews list or empty list. | Ready after trainer ID |
| FC-M2-009 | P1 | FLOW-004 | Trainer intro video stream | Automated API / Manual | Valid trainer ID exists | 1. Send GET /trainers/:id/intro-video/stream. 2. Verify mobile profile video manually if available. | API returns video stream/redirect or expected not found state. UI handles it correctly. | Partial |
| FC-M2-010 | P1 | FLOW-004 | Trainer image management | Automated API / Manual | Valid admin token, trainer ID, and image file exist | 1. Upload trainer image. 2. List images. 3. Delete image. | Image upload/list/delete works or unsupported storage state is documented. | Partial |
| FC-M2-011 | P1 | FLOW-004 | Mobile trainer list screen | Manual | Mobile app access exists | 1. Open app. 2. Navigate to trainer list. 3. Inspect displayed trainer data. | Trainer list is visible and matches expected data. | Manual |
| FC-M2-012 | P1 | FLOW-004 | Mobile trainer profile screen | Manual | Mobile app access and trainer data exist | 1. Open trainer profile. 2. Verify name, specialization, bio, video, and booking CTAs. | Trainer profile is complete and usable. | Manual |

### M3: Booking and Discovery Call

| Test Case ID | Priority | Flow ID | Feature | Test Type | Preconditions | Steps | Expected Result | Automation Status |
|---|---|---|---|---|---|---|---|---|
| FC-M3-001 | P0 | FLOW-005 | Create discovery slot | Automated API | Valid admin token exists | 1. Send POST /discovery-slots with valid slot payload. 2. Store slot ID. | Discovery slot is created successfully. | Ready after admin token |
| FC-M3-002 | P0 | FLOW-005 | List discovery slots | Automated API | Valid token exists | 1. Send GET /discovery-slots. | Discovery slots are returned. | Ready after token |
| FC-M3-003 | P1 | FLOW-005 | Update discovery slot | Automated API | Valid admin token and slot ID exist | 1. Send PUT /discovery-slots/:id with updated time. | Discovery slot is updated. | Ready after slot ID |
| FC-M3-004 | P1 | FLOW-005 | Delete discovery slot | Automated API | Valid admin token and slot ID exist | 1. Send DELETE /discovery-slots/:id. | Discovery slot is deleted or no longer available. | Ready after slot ID |
| FC-M3-005 | P0 | FLOW-006 | Book discovery call | Automated API | Valid client token, trainer ID, and datetime exist | 1. Send POST /bookings/discovery with valid payload. 2. Store booking ID if returned. | Discovery call booking succeeds. | Ready after client token |
| FC-M3-006 | P0 | FLOW-006 | Discovery booking required fields | Automated API | Valid client token exists | 1. Send POST /bookings/discovery with missing required fields. | API rejects request with validation error. | Ready after client token |
| FC-M3-007 | P0 | FLOW-006 | Phone callback phone number rule | Automated API | Valid client token exists | 1. Send POST /bookings/discovery using phone_callback without phone_number. | API rejects request and requires phone number. | Ready after client token |
| FC-M3-008 | P0 | FLOW-006 | Upcoming bookings | Automated API | Valid client token exists | 1. Send GET /bookings/upcoming. | Client upcoming bookings are returned. | Ready after client token |
| FC-M3-009 | P0 | FLOW-009 | Paid training booking | Automated API | Client token, trainer ID, and active subscription or subscription ID exist | 1. Send POST /bookings with paid session payload. | Booking succeeds only for subscribed client. | Blocked by subscription setup |
| FC-M3-010 | P0 | FLOW-016 | Non-subscribed paid booking restriction | Automated API | Non-subscribed client token exists | 1. Send POST /bookings for paid session without active subscription. | API rejects booking and requires active subscription. | Ready after non-subscribed client token |
| FC-M3-011 | P1 | FLOW-010 | Reschedule booking | Automated API | Valid client token and booking ID exist | 1. Send PUT /bookings/:id/reschedule with new datetime and timezone. | Booking is rescheduled according to policy. | Ready after booking ID |
| FC-M3-012 | P1 | FLOW-010 | Cancel booking | Automated API | Valid client token and booking ID exist | 1. Send PUT /bookings/:id/cancel with reason. | Booking is cancelled according to policy. | Ready after booking ID |
| FC-M3-013 | P0 | FLOW-006 | Booking confirmation | Manual / API | Successful discovery booking exists | 1. Complete discovery booking. 2. Check response, email, or dashboard confirmation. | Booking confirmation includes meeting link or callback confirmation. | Partial |
| FC-M3-014 | P0 | FLOW-006 | Admin views discovery booking | Automated API / Manual | Admin token and booking exist | 1. Send GET /admin/discovery-bookings. 2. Verify dashboard manually if available. | Admin can see discovery booking. | Ready after admin token and booking |
| FC-M3-015 | P1 | FLOW-008 | Trainer availability | Automated API | Trainer token exists | 1. Send PUT /trainers/me/availability. 2. Send GET /trainers/me/availability. | Trainer availability is saved and returned. | Ready after trainer token |
| FC-M3-016 | P1 | FLOW-008 | Invalid availability timezone | Automated API | Trainer token exists | 1. Send PUT /trainers/me/availability with invalid timezone. | API rejects invalid timezone. | Ready after trainer token |
| FC-M3-017 | P1 | FLOW-010 | Double-booking prevention | Automated API / Manual | Existing booking exists for a slot | 1. Attempt to book same trainer and time slot twice. | Second booking attempt is rejected. | Needs seeded data |

### M4: Session Lifecycle and Notifications

| Test Case ID | Priority | Flow ID | Feature | Test Type | Preconditions | Steps | Expected Result | Automation Status |
|---|---|---|---|---|---|---|---|---|
| FC-M4-001 | P0 | FLOW-011 | Fetch session details | Automated API | Valid token and session ID exist | 1. Send GET /sessions/:id. | Session details are returned. | Ready after session ID |
| FC-M4-002 | P0 | FLOW-011 | Start session | Automated API | Trainer token and valid session ID exist | 1. Send PUT /sessions/:id/start. | Session status changes to active. | Ready after session ID |
| FC-M4-003 | P0 | FLOW-011 | Join session | Automated API | Client token and active session ID exist | 1. Send PUT /sessions/:id/join. | Client joins active session successfully. | Ready after active session |
| FC-M4-004 | P0 | FLOW-011 | Complete session | Automated API | Trainer token and active session ID exist | 1. Send PUT /sessions/:id/complete. | Session status changes to completed. | Ready after active session |
| FC-M4-005 | P1 | FLOW-011 | Session notes | Automated API | Trainer token and valid session ID exist | 1. Send PUT /sessions/:id/notes with note. | Session note is saved. | Ready after session ID |
| FC-M4-006 | P0 | FLOW-012 | Trainer own sessions | Automated API | Trainer token exists | 1. Send GET /trainers/me/sessions. | Trainer sessions are returned. | Ready after trainer token |
| FC-M4-007 | P1 | FLOW-012 | Trainer own profile | Automated API | Trainer token exists | 1. Send GET /trainers/me. | Trainer profile is returned. | Ready after trainer token |
| FC-M4-008 | P1 | FLOW-012 | Trainer client roster | Automated API | Trainer token exists | 1. Send GET /trainers/me/clients. | Trainer clients are returned. | Ready after trainer token |
| FC-M4-009 | P0 | FLOW-017 | Admin sessions list | Automated API | Admin token exists | 1. Send GET /admin/sessions. | Admin session list is returned. | Ready after admin token |
| FC-M4-010 | P0 | FLOW-017 | Admin discovery bookings list | Automated API | Admin token exists | 1. Send GET /admin/discovery-bookings. | Admin discovery booking list is returned. | Ready after admin token |
| FC-M4-011 | P0 | FLOW-011 | Full session lifecycle chain | Automated API / Manual | Valid client token, trainer token, booking, and session exist | 1. Fetch session. 2. Start session. 3. Join session. 4. Complete session. 5. Fetch session again. | Session moves through expected lifecycle and persists completed status. | Partial |
| FC-M4-012 | P1 | FLOW-013 | Notifications list | Automated API | Valid token exists | 1. Send GET /notifications. | Notifications are returned. | Ready after token |
| FC-M4-013 | P1 | FLOW-013 | Register Android device token | Automated API | Valid client token exists | 1. Send POST /register/device with android platform and device token. | Device registration succeeds. | Ready after client token |
| FC-M4-014 | P1 | FLOW-013 | Register iOS device token | Automated API | Valid client token exists | 1. Send POST /register/device with ios platform and device token. | Device registration succeeds. | Ready after client token |
| FC-M4-015 | P1 | FLOW-013 | Invalid notification platform | Automated API | Valid client token exists | 1. Send POST /register/device with invalid platform. | API rejects invalid platform. | Ready after client token |
| FC-M4-016 | P0 | FLOW-011 | Mobile session start/end screens | Manual | Mobile app access and valid session exist | 1. Open session start screen. 2. Verify meeting link. 3. Complete session. 4. Verify end screen. | Session screens display correct state and meeting link. | Manual |

### M5: Subscription and Payment Conversion

| Test Case ID | Priority | Flow ID | Feature | Test Type | Preconditions | Steps | Expected Result | Automation Status |
|---|---|---|---|---|---|---|---|---|
| FC-M5-001 | P0 | FLOW-014 | Subscription plans | Automated API | Valid token exists | 1. Send GET /subscriptions/plans. | Subscription plans are returned. | Ready after token |
| FC-M5-002 | P0 | FLOW-015 | Create subscription | Automated API | Client token, trainer ID, product ID, and valid payment receipt exist | 1. Send POST /subscriptions with valid receipt. | Subscription is created and activated. | Blocked by payment setup |
| FC-M5-003 | P0 | FLOW-015 | Subscription missing fields validation | Automated API | Client token exists | 1. Send POST /subscriptions with missing required fields. | API rejects request with validation error. | Ready after client token |
| FC-M5-004 | P0 | FLOW-015 | Active subscription lookup | Automated API | Client token exists | 1. Send GET /subscriptions/me. | Active subscription is returned, or clear not-found response for non-subscribed user. | Ready after client token |
| FC-M5-005 | P1 | FLOW-015 | Subscription usage | Automated API | Client token exists | 1. Send GET /subscriptions/me/usage. | Usage data is returned, or clear not-found response for non-subscribed user. | Ready after client token |
| FC-M5-006 | P1 | FLOW-015 | Cancel subscription | Automated API | Client token with active subscription exists | 1. Send POST /client/cancel/subscription. | Active subscription is cancelled. | Blocked unless subscribed client exists |
| FC-M5-007 | P0 | FLOW-016 | Paid access restriction | Automated API | Non-subscribed client token exists | 1. Confirm no active subscription. 2. Attempt paid booking. | Paid booking is rejected for non-subscribed client. | Ready after non-subscribed client token |
| FC-M5-008 | P0 | FLOW-015 | Subscribed paid booking access | Automated API | Subscribed client token or valid subscription ID exists | 1. Confirm active subscription. 2. Attempt paid booking. | Paid booking succeeds for subscribed client. | Blocked by subscription setup |
| FC-M5-009 | P0 | FLOW-015 | Google Pay success/failure handling | Manual | Payment sandbox or test receipt exists | 1. Attempt successful payment. 2. Attempt failed payment. 3. Check subscription status. | Success activates subscription. Failure does not activate subscription. | Blocked by payment setup |
| FC-M5-010 | P1 | FLOW-015 | Subscription prompt after completed session | Manual | Completed discovery call or session exists | 1. Complete discovery/session. 2. Open mobile app. 3. Verify subscription prompt. | Subscription prompt appears after completion. | Needs completed session |

## Cross-Module Chained Test Cases

| Chain Test ID | Priority | Chain | Test Type | Preconditions | Steps | Expected Result | Automation Status |
|---|---|---|---|---|---|---|---|
| FC-CHAIN-001 | P0 | Admin trainer management | Automated API | Admin credentials exist | 1. Login as admin. 2. Create trainer. 3. Fetch trainer. 4. Update trainer. 5. Fetch trainer again. 6. Delete trainer or cleanup. | Trainer management chain completes successfully. | Ready after admin credentials |
| FC-CHAIN-002 | P0 | Client onboarding and discovery | Automated API | Test client email and OTP access exist | 1. Register client. 2. Verify email. 3. Fetch profile. 4. Update profile. 5. List trainers. 6. View trainer profile. | Client can onboard and discover trainer. | Ready after OTP/client token |
| FC-CHAIN-003 | P0 | Discovery booking | Automated API | Admin token, client token, and trainer ID exist | 1. Admin creates discovery slot. 2. Client lists slots. 3. Client books discovery call. 4. Client views upcoming bookings. 5. Admin views discovery bookings. | Discovery booking chain completes successfully. | Ready after role tokens |
| FC-CHAIN-004 | P1 | Trainer availability | Automated API | Trainer token and trainer ID exist | 1. Trainer sets availability. 2. Trainer fetches own availability. 3. Client/admin fetches trainer availability by ID. | Trainer availability is saved and visible. | Ready after trainer token |
| FC-CHAIN-005 | P0 | Session lifecycle | Automated API / Manual | Client token, trainer token, valid booking, and session ID exist | 1. Fetch session. 2. Trainer starts session. 3. Client joins session. 4. Trainer completes session. 5. Fetch completed session. | Session lifecycle completes and persists status. | Partial |
| FC-CHAIN-006 | P0 | Subscription access | Automated API / Manual | Client token, trainer ID, and payment setup exist | 1. View plans. 2. Attempt subscription. 3. Check subscription status. 4. Attempt paid booking. | Subscription activates paid access. | Blocked |
| FC-CHAIN-007 | P0 | Non-subscribed access restriction | Automated API | Non-subscribed client token exists | 1. Check subscription status. 2. Attempt paid booking. | API blocks paid booking for non-subscribed client. | Ready after token |

## Manual Test Cases

| Manual Test ID | Priority | Milestone | UI Area | Preconditions | Steps | Expected Result | Status |
|---|---|---|---|---|---|---|---|
| FC-MANUAL-001 | P1 | M1 | Landing/public pages | Frontend URL is available | Open landing, about, FAQ, contact, waitlist pages. | Pages load and navigation works. | Not Run |
| FC-MANUAL-002 | P1 | M2 | Mobile trainer list | Mobile app build is available | Open trainer list screen. | Trainer cards display correctly. | Not Run |
| FC-MANUAL-003 | P1 | M2 | Mobile trainer profile | Mobile app build and trainer data exist | Open trainer profile. | Profile data and intro content display correctly. | Not Run |
| FC-MANUAL-004 | P0 | M3 | Discovery booking UI | Mobile app and valid client exist | Book discovery call from app. | Booking confirmation is shown. | Not Run |
| FC-MANUAL-005 | P0 | M4 | Session start/end UI | Mobile app and valid session exist | Open start page, join meeting, complete session. | Start and end screens show correct state. | Not Run |
| FC-MANUAL-006 | P1 | M4 | Trainer dashboard | Trainer portal access exists | Login as trainer and view sessions. | Trainer sees relevant sessions and actions. | Not Run |
| FC-MANUAL-007 | P1 | M4 | Admin dashboard | Admin dashboard access exists | Login as admin and view trainers, sessions, clients. | Dashboard displays expected records. | Not Run |
| FC-MANUAL-008 | P0 | M5 | Subscription/payment UI | Payment sandbox exists | Attempt payment success and failure. | Subscription behavior matches payment result. | Blocked |