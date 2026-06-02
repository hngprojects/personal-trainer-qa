# FitCall Traceability Matrix

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This traceability matrix links FitCall MVP requirements to milestones, API routes, test cases, execution status, and bug reports.

It supports the final QA check-in requirement that every executed test must be traceable to:

- Requirement / Feature
- Milestone
- API flow or UI flow
- Test Case ID
- Execution result
- Bug ID, where applicable

The FitCall MVP milestones are treated as the source of truth for regression coverage.

---

## Status Legend

| Status | Meaning |
|---|---|
| Pending Execution | Test is defined but has not been executed yet |
| Passed | Test executed successfully |
| Failed | Test executed and failed |
| Blocked | Test cannot be executed because of missing credential, setup, data, or dependency |
| Partial | Test can be partly executed, but the full flow cannot be completed |
| Manual | Requires manual UI/mobile/admin dashboard verification |

---

## Traceability Matrix

| Requirement ID | Milestone | Requirement / Feature | API / UI Flow | Test Case ID | Automation Source | Execution Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|---|
| REQ-M1-001 | M1 | API should be available on staging | GET /health, GET / | FC-M1-001 | Postman/Newman | Pending Execution | N/A | Public endpoint |
| REQ-M1-002 | M1 | Admin can log in securely | POST /auth/admin/log-in | FC-M1-002 | Postman/Newman | Blocked | N/A | Needs real admin credentials |
| REQ-M1-003 | M1 | Admin login rejects invalid credentials | POST /auth/admin/log-in | FC-M1-003 | Postman/Newman | Pending Execution | N/A | Negative auth validation |
| REQ-M1-004 | M1 | Client can register | POST /auth/register | FC-M1-004 | Postman/Newman | Pending Execution | N/A | Requires test email |
| REQ-M1-005 | M1 | Client can verify email | POST /auth/verify-email | FC-M1-005 | Postman/Newman | Blocked | N/A | Needs OTP |
| REQ-M1-006 | M1 | Client can log in | POST /auth/login | FC-M1-006 | Postman/Newman | Blocked | N/A | Needs registered client account |
| REQ-M1-007 | M1 | Token refresh/session persistence works | POST /auth/refresh | FC-M1-007 | Postman/Newman | Blocked | N/A | Needs valid refresh token |
| REQ-M1-008 | M1 | User can log out | POST /auth/logout | FC-M1-008 | Postman/Newman | Blocked | N/A | Needs valid token |
| REQ-M1-009 | M1 | Admin can create trainer profile | POST /trainers | FC-M1-009 | Postman/Newman | Blocked | N/A | Needs admin token |
| REQ-M1-010 | M1 | Trainer invite/setup email is sent | Trainer invite email / setup token | FC-M1-010 | Manual / Postman | Blocked | N/A | Needs email/setup token access |
| REQ-M1-011 | M1 | Role-based access is enforced | Protected endpoints | FC-M1-011 | Postman/Newman | Blocked | N/A | Needs separate admin/client/trainer tokens |

---

## Milestone 2: Trainer Discovery and Profile

| Requirement ID | Milestone | Requirement / Feature | API / UI Flow | Test Case ID | Automation Source | Execution Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|---|
| REQ-M2-001 | M2 | User can view trainer list | GET /trainers | FC-M2-001 | Postman/Newman | Blocked | N/A | Needs valid token |
| REQ-M2-002 | M2 | Trainer list rejects unauthenticated request | GET /trainers without auth | FC-M2-002 | Postman/Newman | Pending Execution | N/A | Negative auth test |
| REQ-M2-003 | M2 | User can filter trainers by category | GET /trainers?category=strength | FC-M2-003 | Postman/Newman | Blocked | N/A | Needs valid token |
| REQ-M2-004 | M2 | User can view trainer profile | GET /trainers/:id | FC-M2-004 | Postman/Newman | Blocked | N/A | Needs valid trainer ID |
| REQ-M2-005 | M2 | Invalid trainer ID is handled safely | GET /trainers/not-a-uuid | FC-M2-005 | Postman/Newman | Pending Execution | N/A | Existing collection notes possible raw error issue |
| REQ-M2-006 | M2 | Admin can update trainer profile | PATCH /trainers/:id | FC-M2-006 | Postman/Newman | Blocked | N/A | Needs admin token and trainer ID |
| REQ-M2-007 | M2 | Admin can delete trainer profile | DELETE /trainers/:id | FC-M2-007 | Postman/Newman | Blocked | N/A | Needs admin token and trainer ID |
| REQ-M2-008 | M2 | Trainer images can be managed | /trainers/:id/images | FC-M2-008 | Postman/Newman / Manual | Partial | N/A | Requires upload file and trainer ID |
| REQ-M2-009 | M2 | Trainer intro video can be managed | /trainers/:id/intro-video | FC-M2-009 | Postman/Newman / Manual | Partial | N/A | Requires video file and trainer ID |
| REQ-M2-010 | M2 | Mobile app displays trainer list | Mobile trainer list screen | FC-M2-010 | Manual | Pending Execution | N/A | Requires mobile app access |
| REQ-M2-011 | M2 | Mobile app displays trainer profile | Mobile trainer profile screen | FC-M2-011 | Manual | Pending Execution | N/A | Requires mobile app access |

---

## Milestone 3: Booking and Discovery Call

| Requirement ID | Milestone | Requirement / Feature | API / UI Flow | Test Case ID | Automation Source | Execution Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|---|
| REQ-M3-001 | M3 | User/admin can view discovery slots | GET /discovery-slots | FC-M3-001 | Postman/Newman | Blocked | N/A | Needs token |
| REQ-M3-002 | M3 | Admin can create discovery slot | POST /discovery-slots | FC-M3-002 | Postman/Newman | Blocked | N/A | Needs admin token |
| REQ-M3-003 | M3 | Admin can update discovery slot | PUT /discovery-slots/:id | FC-M3-003 | Postman/Newman | Blocked | N/A | Needs admin token and slot ID |
| REQ-M3-004 | M3 | Admin can delete discovery slot | DELETE /discovery-slots/:id | FC-M3-004 | Postman/Newman | Blocked | N/A | Needs admin token and slot ID |
| REQ-M3-005 | M3 | Client can book discovery call | POST /bookings/discovery | FC-M3-005 | Postman/Newman | Blocked | N/A | Needs client token and trainer ID |
| REQ-M3-006 | M3 | Discovery booking validates required fields | POST /bookings/discovery | FC-M3-006 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M3-007 | M3 | Phone callback requires phone number | POST /bookings/discovery | FC-M3-007 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M3-008 | M3 | Client can view upcoming bookings | GET /bookings/upcoming | FC-M3-008 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M3-009 | M3 | Client can book paid training session | POST /bookings | FC-M3-009 | Postman/Newman | Blocked | N/A | Requires subscription ID |
| REQ-M3-010 | M3 | Client can reschedule booking | PUT /bookings/:id/reschedule | FC-M3-010 | Postman/Newman | Blocked | N/A | Needs valid booking ID |
| REQ-M3-011 | M3 | Client can cancel booking | PUT /bookings/:id/cancel | FC-M3-011 | Postman/Newman | Blocked | N/A | Needs valid booking ID |
| REQ-M3-012 | M3 | System prevents double booking | Booking API | FC-M3-012 | Postman/Newman / Manual | Blocked | N/A | Needs seeded booked slot |
| REQ-M3-013 | M3 | Booking confirmation includes meeting link | Booking API / Email | FC-M3-013 | Manual / API | Blocked | N/A | Needs successful booking |
| REQ-M3-014 | M3 | Mobile app supports discovery booking flow | Mobile booking screen | FC-M3-014 | Manual | Pending Execution | N/A | Requires mobile app access |

---

## Milestone 4: Session Lifecycle and Notifications

| Requirement ID | Milestone | Requirement / Feature | API / UI Flow | Test Case ID | Automation Source | Execution Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|---|
| REQ-M4-001 | M4 | User/trainer can fetch session details | GET /sessions/:id | FC-M4-001 | Postman/Newman | Blocked | N/A | Needs valid session ID |
| REQ-M4-002 | M4 | Trainer can start session | PUT /sessions/:id/start | FC-M4-002 | Postman/Newman | Blocked | N/A | Needs trainer token and session ID |
| REQ-M4-003 | M4 | Client can join session | PUT /sessions/:id/join | FC-M4-003 | Postman/Newman | Blocked | N/A | Needs client token and active session |
| REQ-M4-004 | M4 | Trainer can complete session | PUT /sessions/:id/complete | FC-M4-004 | Postman/Newman | Blocked | N/A | Needs trainer token and active session |
| REQ-M4-005 | M4 | Trainer can submit session notes | PUT /sessions/:id/notes | FC-M4-005 | Postman/Newman | Blocked | N/A | Needs trainer token and valid session |
| REQ-M4-006 | M4 | Trainer can view own sessions | GET /trainers/me/sessions | FC-M4-006 | Postman/Newman | Blocked | N/A | Needs trainer token |
| REQ-M4-007 | M4 | Admin can view all sessions | GET /admin/sessions | FC-M4-007 | Postman/Newman | Blocked | N/A | Needs admin token |
| REQ-M4-008 | M4 | Admin can view discovery bookings | GET /admin/discovery-bookings | FC-M4-008 | Postman/Newman | Blocked | N/A | Needs admin token |
| REQ-M4-009 | M4 | User can view notifications | GET /notifications | FC-M4-009 | Postman/Newman | Blocked | N/A | Needs valid token |
| REQ-M4-010 | M4 | User can register device for notifications | POST /register/device | FC-M4-010 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M4-011 | M4 | Session follows Booked -> Active -> Completed | Full session API chain | FC-M4-011 | Postman/Newman / Manual | Blocked | N/A | Needs seeded valid booking/session |
| REQ-M4-012 | M4 | Session start/end screens work on mobile | Mobile UI | FC-M4-012 | Manual | Pending Execution | N/A | Requires mobile app access |
| REQ-M4-013 | M4 | Reminder notifications are sent | Notification system | FC-M4-013 | Manual / Partial | Blocked | N/A | Needs scheduled session |

---

## Milestone 5: Subscription and Payment Conversion

| Requirement ID | Milestone | Requirement / Feature | API / UI Flow | Test Case ID | Automation Source | Execution Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|---|
| REQ-M5-001 | M5 | User can view subscription plans | GET /subscriptions/plans | FC-M5-001 | Postman/Newman | Blocked | N/A | Needs valid token |
| REQ-M5-002 | M5 | User can create subscription | POST /subscriptions | FC-M5-002 | Postman/Newman | Blocked | N/A | Payment setup/test receipt unavailable |
| REQ-M5-003 | M5 | Subscription creation validates missing fields | POST /subscriptions | FC-M5-003 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M5-004 | M5 | User can view active subscription | GET /subscriptions/me | FC-M5-004 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M5-005 | M5 | User can view subscription usage | GET /subscriptions/me/usage | FC-M5-005 | Postman/Newman | Blocked | N/A | Needs client token |
| REQ-M5-006 | M5 | User can cancel subscription | POST /client/cancel/subscription | FC-M5-006 | Postman/Newman | Blocked | N/A | Needs active subscribed client |
| REQ-M5-007 | M5 | Non-subscribed user cannot book paid session | POST /bookings | FC-M5-007 | Postman/Newman | Blocked | N/A | Needs non-subscribed client token |
| REQ-M5-008 | M5 | Subscribed user can book paid session | POST /bookings | FC-M5-008 | Postman/Newman | Blocked | N/A | Needs subscribed client/subscription ID |
| REQ-M5-009 | M5 | Google Pay success/failure is handled | Mobile payment flow | FC-M5-009 | Manual | Blocked | N/A | Payment setup unavailable |
| REQ-M5-010 | M5 | Subscription prompt appears after completed discovery call | Mobile UI / Session completion | FC-M5-010 | Manual | Blocked | N/A | Needs completed discovery/session |

---

## Cross-Module Flow Traceability

| Flow ID | Milestones | Flow | Related Test Case IDs | Automation Source | Execution Status | Bug ID | Notes |
|---|---|---|---|---|---|---|---|
| FLOW-001 | M1, M2 | Admin login -> create trainer -> fetch trainer -> update trainer -> delete trainer | FC-M1-002, FC-M1-009, FC-M2-004, FC-M2-006, FC-M2-007 | Postman/Newman | Blocked | N/A | Needs admin credentials |
| FLOW-002 | M1, M2 | Client register -> verify email -> login/profile -> view trainers -> view trainer profile | FC-M1-004, FC-M1-005, FC-M1-006, FC-M2-001, FC-M2-004 | Postman/Newman | Blocked | N/A | Needs OTP/client account |
| FLOW-003 | M2, M3 | Admin creates discovery slot -> client views slot -> client books discovery call -> admin views discovery booking | FC-M3-001, FC-M3-002, FC-M3-005, FC-M4-008 | Postman/Newman | Blocked | N/A | Needs admin/client tokens |
| FLOW-004 | M3 | Client books discovery call -> booking appears in upcoming bookings -> admin monitors booking | FC-M3-005, FC-M3-008, FC-M4-008 | Postman/Newman | Blocked | N/A | Needs valid booking |
| FLOW-005 | M3 | Trainer sets availability -> client views slots -> client books session | FC-M2-010, FC-M3-008, FC-M3-009 | Postman/Newman | Blocked | N/A | Needs trainer token and subscription |
| FLOW-006 | M3, M4 | Booking created -> session fetched -> trainer starts session -> client joins -> trainer completes session | FC-M3-009, FC-M4-001, FC-M4-002, FC-M4-003, FC-M4-004 | Postman/Newman | Blocked | N/A | Needs valid session |
| FLOW-007 | M4, M5 | Completed discovery/session -> subscription prompt -> plan viewed -> payment attempted -> subscription checked | FC-M4-004, FC-M5-001, FC-M5-002, FC-M5-004 | Partial API / Manual | Blocked | N/A | Payment setup unavailable |
| FLOW-008 | M5 | Non-subscribed client attempts paid booking -> access denied | FC-M5-007 | Postman/Newman | Blocked | N/A | Needs non-subscribed client |
| FLOW-009 | M4 | Admin views sessions -> monitors lifecycle -> confirms completed session | FC-M4-007, FC-M4-011 | Postman/Newman / Manual | Blocked | N/A | Needs session data |
| FLOW-010 | M4 | Notification list -> device registration -> notification validation | FC-M4-009, FC-M4-010 | Postman/Newman / Manual | Blocked | N/A | Needs valid token |

---

## Traceability Rule

Every failed test must be logged in the bug report using this mapping:

Test Case ID -> Requirement ID -> Milestone -> Bug ID

Example:

| Failed Test Case | Requirement | Milestone | Bug ID |
|---|---|---|---|
| FC-M3-005 | REQ-M3-005 | M3 | FC-BUG-001 |

No failed test should remain without a linked bug report.