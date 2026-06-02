# FitCall Test Execution Report

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This report records the execution status of the FitCall MVP regression test cases.

Each test case must be marked as one of:

- Passed
- Failed
- Blocked
- Not Run

For every failed test, a linked bug ID must be added in the Bug ID column.

For every blocked test, the blocker must be explained clearly in the Notes column.

## Execution Summary

| Status | Count |
|---|---:|
| Passed | 0 |
| Failed | 0 |
| Blocked | 0 |
| Not Run | 0 |

## Test Execution Table

| Test Case ID | Milestone | Feature | API / Flow | Expected Result | Actual Result | Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|---|
| FC-M1-001 | M1 | API Health | GET /health, GET / | API is reachable and returns successful response | Pending execution | Not Run | N/A | Public endpoint |
| FC-M1-002 | M1 | Admin Login | POST /auth/admin/log-in | Admin logs in and receives access token | Pending execution | Blocked | N/A | Needs real admin credentials |
| FC-M1-003 | M1 | Invalid Admin Login | POST /auth/admin/log-in | Wrong password is rejected | Pending execution | Not Run | N/A | Negative auth validation |
| FC-M1-004 | M1 | Client Registration | POST /auth/register | Client registration request succeeds | Pending execution | Not Run | N/A | Needs test email |
| FC-M1-005 | M1 | Email Verification | POST /auth/verify-email | Client email is verified using OTP | Pending execution | Blocked | N/A | Needs OTP from email |
| FC-M1-006 | M1 | Client Login | POST /auth/login | Client logs in successfully | Pending execution | Blocked | N/A | Needs registered client account |
| FC-M1-007 | M1 | Token Refresh | POST /auth/refresh | Refresh token returns valid session response | Pending execution | Blocked | N/A | Needs valid refresh token |
| FC-M1-008 | M1 | Logout | POST /auth/logout | User logs out successfully | Pending execution | Blocked | N/A | Needs valid token |
| FC-M1-009 | M1 | Create Trainer | POST /trainers | Admin creates trainer profile | Pending execution | Blocked | N/A | Needs admin token |
| FC-M1-010 | M1 | Trainer Setup | Trainer invite/setup flow | Trainer receives setup access | Pending execution | Blocked | N/A | Needs trainer setup token or email access |
| FC-M1-011 | M1 | Role Access | Protected endpoints | Admin, client, and trainer permissions are enforced | Pending execution | Blocked | N/A | Needs separate role tokens |
| FC-M2-001 | M2 | Trainer List | GET /trainers | Trainer list is returned | Pending execution | Blocked | N/A | Needs valid token |
| FC-M2-002 | M2 | Trainer List Auth Guard | GET /trainers without auth | Request is rejected with 401 | Pending execution | Not Run | N/A | Negative auth test |
| FC-M2-003 | M2 | Trainer Filter | GET /trainers?category=strength | Filtered trainer list is returned | Pending execution | Blocked | N/A | Needs valid token |
| FC-M2-004 | M2 | Trainer Profile | GET /trainers/:id | Trainer profile is returned | Pending execution | Blocked | N/A | Needs valid trainer ID |
| FC-M2-005 | M2 | Invalid Trainer ID | GET /trainers/not-a-uuid | Invalid ID is handled safely | Pending execution | Not Run | N/A | Error response should not expose raw backend error |
| FC-M2-006 | M2 | Update Trainer | PATCH /trainers/:id | Trainer profile is updated | Pending execution | Blocked | N/A | Needs admin token and trainer ID |
| FC-M2-007 | M2 | Delete Trainer | DELETE /trainers/:id | Trainer profile is deleted | Pending execution | Blocked | N/A | Needs admin token and trainer ID |
| FC-M2-008 | M2 | Trainer Images | /trainers/:id/images | Trainer images can be managed | Pending execution | Blocked | N/A | Needs admin token, trainer ID, and image file |
| FC-M2-009 | M2 | Trainer Intro Video | /trainers/:id/intro-video | Trainer intro video can be uploaded or streamed | Pending execution | Blocked | N/A | Needs admin token, trainer ID, and video file |
| FC-M3-001 | M3 | Discovery Slots | GET /discovery-slots | Discovery slots are returned | Pending execution | Blocked | N/A | Needs valid token |
| FC-M3-002 | M3 | Create Discovery Slot | POST /discovery-slots | Admin creates discovery slot | Pending execution | Blocked | N/A | Needs admin token |
| FC-M3-003 | M3 | Update Discovery Slot | PUT /discovery-slots/:id | Admin updates discovery slot | Pending execution | Blocked | N/A | Needs slot ID |
| FC-M3-004 | M3 | Delete Discovery Slot | DELETE /discovery-slots/:id | Admin deletes discovery slot | Pending execution | Blocked | N/A | Needs slot ID |
| FC-M3-005 | M3 | Book Discovery Call | POST /bookings/discovery | Client books discovery call | Pending execution | Blocked | N/A | Needs client token, trainer ID, and date/time |
| FC-M3-006 | M3 | Discovery Booking Validation | POST /bookings/discovery | Missing required fields are rejected | Pending execution | Blocked | N/A | Needs client token |
| FC-M3-007 | M3 | Phone Callback Validation | POST /bookings/discovery | Phone callback without phone number is rejected | Pending execution | Blocked | N/A | Needs client token |
| FC-M3-008 | M3 | Upcoming Bookings | GET /bookings/upcoming | Client upcoming bookings are returned | Pending execution | Blocked | N/A | Needs client token |
| FC-M3-009 | M3 | Training Booking | POST /bookings | Client books paid training session | Pending execution | Blocked | N/A | Subscription is not set up yet |
| FC-M3-010 | M3 | Reschedule Booking | PUT /bookings/:id/reschedule | Booking is rescheduled | Pending execution | Blocked | N/A | Needs valid booking ID |
| FC-M3-011 | M3 | Cancel Booking | PUT /bookings/:id/cancel | Booking is cancelled | Pending execution | Blocked | N/A | Needs valid booking ID |
| FC-M3-012 | M3 | Double Booking Prevention | Booking API | Duplicate booking is prevented | Pending execution | Blocked | N/A | Needs seeded booked slot |
| FC-M3-013 | M3 | Booking Confirmation | Booking API / Email | Booking confirmation includes meeting link | Pending execution | Blocked | N/A | Needs successful booking |
| FC-M4-001 | M4 | Session Details | GET /sessions/:id | Session details are returned | Pending execution | Blocked | N/A | Needs valid session ID |
| FC-M4-002 | M4 | Start Session | PUT /sessions/:id/start | Trainer starts session | Pending execution | Blocked | N/A | Needs trainer token and session ID |
| FC-M4-003 | M4 | Join Session | PUT /sessions/:id/join | Client joins active session | Pending execution | Blocked | N/A | Needs client token and active session |
| FC-M4-004 | M4 | Complete Session | PUT /sessions/:id/complete | Trainer completes session | Pending execution | Blocked | N/A | Needs trainer token and active session |
| FC-M4-005 | M4 | Session Notes | PUT /sessions/:id/notes | Trainer submits session notes | Pending execution | Blocked | N/A | Needs trainer token and session ID |
| FC-M4-006 | M4 | Trainer Sessions | GET /trainers/me/sessions | Trainer sees own sessions | Pending execution | Blocked | N/A | Needs trainer token |
| FC-M4-007 | M4 | Admin Sessions | GET /admin/sessions | Admin sees all sessions | Pending execution | Blocked | N/A | Needs admin token |
| FC-M4-008 | M4 | Admin Discovery Bookings | GET /admin/discovery-bookings | Admin sees discovery bookings | Pending execution | Blocked | N/A | Needs admin token |
| FC-M4-009 | M4 | Notifications | GET /notifications | User notifications are returned | Pending execution | Blocked | N/A | Needs valid token |
| FC-M4-010 | M4 | Register Device | POST /register/device | Device token is registered | Pending execution | Blocked | N/A | Needs client token |
| FC-M4-011 | M4 | Session Lifecycle | Booking to session completion | Session moves from booked to active to completed | Pending execution | Blocked | N/A | Needs valid booking and session |
| FC-M5-001 | M5 | Subscription Plans | GET /subscriptions/plans | Subscription plans are returned | Pending execution | Blocked | N/A | Needs valid token |
| FC-M5-002 | M5 | Create Subscription | POST /subscriptions | Subscription activates after payment validation | Pending execution | Blocked | N/A | Payment setup or test receipt unavailable |
| FC-M5-003 | M5 | Subscription Validation | POST /subscriptions | Missing fields are rejected | Pending execution | Blocked | N/A | Needs client token |
| FC-M5-004 | M5 | Active Subscription | GET /subscriptions/me | Client subscription status is returned | Pending execution | Blocked | N/A | Needs client token |
| FC-M5-005 | M5 | Subscription Usage | GET /subscriptions/me/usage | Subscription usage is returned | Pending execution | Blocked | N/A | Needs client token |
| FC-M5-006 | M5 | Cancel Subscription | POST /client/cancel/subscription | Active subscription is cancelled | Pending execution | Blocked | N/A | Needs subscribed client |
| FC-M5-007 | M5 | Non-subscribed Paid Booking Restriction | POST /bookings | Non-subscribed client is blocked from paid booking | Pending execution | Blocked | N/A | Needs non-subscribed client token |
| FC-M5-008 | M5 | Subscribed Paid Booking | POST /bookings | Subscribed client can book paid session | Pending execution | Blocked | N/A | Needs subscribed client or valid subscription ID |