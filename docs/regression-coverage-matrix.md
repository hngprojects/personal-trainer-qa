# FitCall Regression Coverage Matrix

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document defines the regression coverage required for the final QA check-in.

It maps each MVP milestone and major product flow to the required validation method:

- Automated API regression
- Postman/Newman execution
- Manual verification
- Blocked validation
- Partial validation

The milestone documents are treated as the source of truth.

---

## Coverage Status Legend

| Status | Meaning |
|---|---|
| Ready | Can be tested once credentials/environment variables are available |
| Automated | Covered by Postman/Newman regression |
| Manual | Requires UI/mobile/admin dashboard verification |
| Partial | Some parts can be tested, but full flow needs missing data/setup |
| Blocked | Cannot be fully tested until dependency is provided |
| Not in MVP | Outside current final regression scope |

---

## Milestone 1: Authentication & Trainer Supply

| Coverage ID | Feature / Flow | API / UI Area | Test Type | Automation Status | Required Data | Final Status |
|---|---|---|---|---|---|---|
| FC-M1-001 | API health check | GET /health, GET / | Automated API | Ready | None | Pending Execution |
| FC-M1-002 | Admin login | POST /auth/admin/log-in | Automated API | Ready | Admin email/password | Needs Credentials |
| FC-M1-003 | Admin invalid login | POST /auth/admin/log-in | Automated API | Ready | Admin email | Pending Execution |
| FC-M1-004 | Client registration | POST /auth/register | Automated API | Ready | Client email | Pending Execution |
| FC-M1-005 | Client email verification | POST /auth/verify-email | Automated API | Partial | OTP from email | Needs OTP |
| FC-M1-006 | Client login | POST /auth/login | Automated API | Partial | Registered client credentials | Needs Client Account |
| FC-M1-007 | Token refresh | POST /auth/refresh | Automated API | Partial | Valid refresh token | Needs Token |
| FC-M1-008 | Logout | POST /auth/logout | Automated API | Partial | Valid token | Needs Token |
| FC-M1-009 | Admin creates trainer profile | POST /trainers | Automated API | Ready | Admin token, trainer data | Needs Admin Credentials |
| FC-M1-010 | Trainer invite/setup email | Email / trainer setup flow | Manual / Partial API | Partial | Trainer invite token | Needs Email Access |
| FC-M1-011 | Role-based access control | Protected endpoints | Automated API | Ready | Admin/client/trainer tokens | Needs Role Tokens |

---

## Milestone 2: Trainer Discovery & Profile

| Coverage ID | Feature / Flow | API / UI Area | Test Type | Automation Status | Required Data | Final Status |
|---|---|---|---|---|---|---|
| FC-M2-001 | List trainers | GET /trainers | Automated API | Ready | Valid token | Needs Token |
| FC-M2-002 | Trainer list rejects no auth | GET /trainers | Automated API | Ready | None | Pending Execution |
| FC-M2-003 | Filter trainers by category | GET /trainers?category=strength | Automated API | Ready | Valid token | Needs Token |
| FC-M2-004 | View trainer profile | GET /trainers/:id | Automated API | Ready | Valid trainer ID | Needs Trainer ID |
| FC-M2-005 | Invalid trainer ID handling | GET /trainers/not-a-uuid | Automated API | Ready | None | Pending Execution |
| FC-M2-006 | Update trainer profile | PATCH /trainers/:id | Automated API | Ready | Admin token, trainer ID | Needs Admin Credentials |
| FC-M2-007 | Delete trainer profile | DELETE /trainers/:id | Automated API | Ready | Admin token, trainer ID | Needs Admin Credentials |
| FC-M2-008 | Trainer images | /trainers/:id/images | Automated API / Manual | Partial | Admin token, image file | Partial |
| FC-M2-009 | Trainer intro video | /trainers/:id/intro-video | Automated API / Manual | Partial | Admin token, video file | Partial |
| FC-M2-010 | Mobile trainer list screen | Mobile UI | Manual | Manual | Mobile app access | Pending Manual Verification |
| FC-M2-011 | Mobile trainer profile screen | Mobile UI | Manual | Manual | Mobile app access | Pending Manual Verification |

---

## Milestone 3: Booking & Discovery Call

| Coverage ID | Feature / Flow | API / UI Area | Test Type | Automation Status | Required Data | Final Status |
|---|---|---|---|---|---|---|
| FC-M3-001 | View discovery slots | GET /discovery-slots | Automated API | Ready | Client/admin token | Needs Token |
| FC-M3-002 | Admin creates discovery slot | POST /discovery-slots | Automated API | Ready | Admin token | Needs Admin Credentials |
| FC-M3-003 | Update discovery slot | PUT /discovery-slots/:id | Automated API | Ready | Admin token, slot ID | Needs Slot ID |
| FC-M3-004 | Delete discovery slot | DELETE /discovery-slots/:id | Automated API | Ready | Admin token, slot ID | Needs Slot ID |
| FC-M3-005 | Book discovery call | POST /bookings/discovery | Automated API | Ready | Client token, trainer ID, datetime | Needs Client Token |
| FC-M3-006 | Discovery booking validation | POST /bookings/discovery | Automated API | Ready | Client token | Needs Client Token |
| FC-M3-007 | Phone callback requires phone number | POST /bookings/discovery | Automated API | Ready | Client token | Needs Client Token |
| FC-M3-008 | View upcoming bookings | GET /bookings/upcoming | Automated API | Ready | Client token | Needs Client Token |
| FC-M3-009 | Create training session booking | POST /bookings | Automated API | Partial | Client token, trainer ID, subscription ID | Blocked by Subscription |
| FC-M3-010 | Reschedule booking | PUT /bookings/:id/reschedule | Automated API | Partial | Valid booking ID | Needs Booking ID |
| FC-M3-011 | Cancel booking | PUT /bookings/:id/cancel | Automated API | Partial | Valid booking ID | Needs Booking ID |
| FC-M3-012 | Double-booking prevention | Booking API | Automated API / Manual | Partial | Existing booked slot | Needs Seeded Data |
| FC-M3-013 | Booking confirmation with meeting link | Booking API / Email | Manual / API | Partial | Successful booking | Needs Valid Booking |
| FC-M3-014 | Mobile discovery booking flow | Mobile UI | Manual | Manual | Mobile app access | Pending Manual Verification |

---

## Milestone 4: Session Lifecycle & Notifications

| Coverage ID | Feature / Flow | API / UI Area | Test Type | Automation Status | Required Data | Final Status |
|---|---|---|---|---|---|---|
| FC-M4-001 | Get session by ID | GET /sessions/:id | Automated API | Partial | Valid session ID | Needs Session ID |
| FC-M4-002 | Start session | PUT /sessions/:id/start | Automated API | Partial | Trainer token, valid session | Needs Session ID |
| FC-M4-003 | Join session | PUT /sessions/:id/join | Automated API | Partial | Client token, active session | Needs Active Session |
| FC-M4-004 | Complete session | PUT /sessions/:id/complete | Automated API | Partial | Trainer token, active session | Needs Active Session |
| FC-M4-005 | Submit session notes | PUT /sessions/:id/notes | Automated API | Partial | Trainer token, valid session | Needs Session ID |
| FC-M4-006 | Trainer views own sessions | GET /trainers/me/sessions | Automated API | Ready | Trainer token | Needs Trainer Token |
| FC-M4-007 | Admin views all sessions | GET /admin/sessions | Automated API | Ready | Admin token | Needs Admin Credentials |
| FC-M4-008 | Admin views discovery bookings | GET /admin/discovery-bookings | Automated API | Ready | Admin token | Needs Admin Credentials |
| FC-M4-009 | Notifications list | GET /notifications | Automated API | Ready | Valid token | Needs Token |
| FC-M4-010 | Register device token | POST /register/device | Automated API | Ready | Client token | Needs Client Token |
| FC-M4-011 | Session status flow: Booked -> Active -> Completed | Full API chain | Automated API / Manual | Partial | Booking/session data | Needs Seeded Flow |
| FC-M4-012 | Session start/end screen | Mobile UI | Manual | Manual | Mobile app access | Pending Manual Verification |
| FC-M4-013 | Reminder notifications | Notification system | Manual / Partial | Partial | Scheduled session | Needs Scheduled Session |

---

## Milestone 5: Subscription & Payment Conversion

| Coverage ID | Feature / Flow | API / UI Area | Test Type | Automation Status | Required Data | Final Status |
|---|---|---|---|---|---|---|
| FC-M5-001 | View subscription plans | GET /subscriptions/plans | Automated API | Ready | Valid token | Needs Token |
| FC-M5-002 | Create subscription | POST /subscriptions | Automated API | Blocked | Valid Google IAP test receipt | Blocked |
| FC-M5-003 | Subscription missing fields validation | POST /subscriptions | Automated API | Ready | Client token | Needs Client Token |
| FC-M5-004 | View active subscription | GET /subscriptions/me | Automated API | Partial | Client token | Needs Client Token |
| FC-M5-005 | View subscription usage | GET /subscriptions/me/usage | Automated API | Partial | Client token | Needs Client Token |
| FC-M5-006 | Cancel subscription | POST /client/cancel/subscription | Automated API | Partial | Client token with active subscription | Blocked Unless Subscribed User Exists |
| FC-M5-007 | Non-subscribed user blocked from paid booking | POST /bookings | Automated API | Partial | Non-subscribed client token | Needs Client Token |
| FC-M5-008 | Subscribed user can book paid session | POST /bookings | Automated API | Blocked | Subscribed client or valid subscription ID | Blocked |
| FC-M5-009 | Google Pay payment success/failure | Mobile / Payment | Manual | Blocked | Payment test setup | Blocked |
| FC-M5-010 | Subscription prompt after completed discovery call | Mobile UI | Manual | Partial | Completed discovery call | Needs Completed Session |

---

## Cross-Module Regression Flows

These are the flows most relevant to the final QA check-in because they prove API chaining and MVP readiness.

| Flow ID | Cross-Module Flow | Milestones Covered | Required Roles | Automation Status | Current Status |
|---|---|---|---|---|---|
| FLOW-001 | Admin login -> create trainer -> fetch trainer -> update trainer -> delete trainer | M1, M2 | Admin | Automated API | Needs Admin Credentials |
| FLOW-002 | Client register -> verify email -> login/profile -> view trainers -> view trainer profile | M1, M2 | Client | Automated API | Needs OTP / Client Credentials |
| FLOW-003 | Admin creates discovery slot -> client views slot -> client books discovery call -> admin views discovery booking | M2, M3 | Admin, Client | Automated API | Needs Admin + Client Tokens |
| FLOW-004 | Client books discovery call -> booking appears in upcoming bookings -> admin monitors booking | M3 | Client, Admin | Automated API | Needs Valid Booking |
| FLOW-005 | Trainer sets availability -> client views trainer slots -> client books session | M3 | Trainer, Client | Automated API | Partial / Needs Subscription |
| FLOW-006 | Booking created -> session fetched -> trainer starts session -> client joins session -> trainer completes session | M3, M4 | Client, Trainer | Automated API | Needs Valid Session |
| FLOW-007 | Completed discovery/session -> subscription prompt -> subscription plan viewed -> payment attempted -> subscription status checked | M4, M5 | Client | Partial API / Manual | Payment Blocked |
| FLOW-008 | Non-subscribed client attempts paid booking -> access denied | M5 | Client | Automated API | Needs Non-Subscribed Client |
| FLOW-009 | Admin views sessions -> filters/monitors lifecycle -> confirms completed session | M4 | Admin | Automated API / Manual | Needs Session Data |
| FLOW-010 | Notification list -> device registration -> notification validation | M4 | Client/Trainer | Automated API / Manual | Needs Valid Token |

---

## Automation Priority

| Priority | Coverage Area | Reason |
|---|---|---|
| P0 | Auth, trainer creation, trainer discovery, discovery booking, sessions, subscriptions access control | Core MVP and check-in focus |
| P1 | Admin monitoring, trainer availability, booking slots, notifications | Important cross-module support |
| P2 | Media uploads, reviews, waitlist, contact | Useful but less central to MVP regression |
| Blocked | Payment happy path, full paid booking, full session lifecycle without seeded data | Requires unavailable staging setup/data |

---

## Current Regression Position

The current automation can be prepared and executed through Newman, but full pass/fail validation depends on real staging credentials and seeded data.

Expected current state before credentials:

| Area | Expected State |
|---|---|
| Public routes | Executable |
| Negative auth tests | Executable |
| Admin flows | Blocked until admin credentials are added |
| Client flows | Blocked until client token/account is available |
| Trainer flows | Blocked until trainer token/account is available |
| Booking/session chain | Partial until valid booking/session data exists |
| Subscription/payment happy path | Blocked until payment setup or test receipt is available |