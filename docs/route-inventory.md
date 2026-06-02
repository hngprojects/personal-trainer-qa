# FitCall API Route Inventory

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document maps the available API routes to MVP milestones, user roles, test data requirements, and current execution readiness.

It is used to decide what can be automated, what can be manually verified, and what must be marked as blocked.

---

## Route Inventory Summary

| ID | Milestone | Feature Area | API / Flow | Key Routes | Role Needed | Test Data Needed | Current Status |
|---|---|---|---|---|---|---|---|
| RI-001 | M1 | Health / Root | API availability check | GET /health, GET / | Public | None | Ready |
| RI-002 | M1 | Admin Auth | Admin login | POST /auth/admin/log-in | Admin | Registered admin email/password | Needs credentials |
| RI-003 | M1 | Client Auth | Client registration and verification | POST /auth/register, POST /auth/verify-email, POST /auth/login | Client | Client email, OTP, password if applicable | Needs test client / OTP |
| RI-004 | M1 | Auth Security | Invalid login, missing fields, forgot/reset password | POST /auth/forgot-password, POST /auth/reset-password | Public / User | Test email | Ready / Partial |
| RI-005 | M1 | Token Session | Refresh token and logout | POST /auth/refresh, POST /auth/logout | User | Valid access and refresh token | Needs valid token |
| RI-006 | M1 | Admin Trainer Provisioning | Admin creates trainer | POST /trainers | Admin | Admin token, trainer email/name/specialization | Needs admin credentials |
| RI-007 | M1/M2 | Trainer Discovery | List trainers | GET /trainers | Authenticated user | Valid token | Needs token |
| RI-008 | M2 | Trainer Profile | View trainer profile | GET /trainers/:id | Authenticated user | Valid trainer ID | Needs seeded trainer |
| RI-009 | M2 | Trainer Profile Management | Update/delete trainer profile | PATCH /trainers/:id, DELETE /trainers/:id | Admin | Admin token, trainer ID | Needs admin credentials |
| RI-010 | M2/M3 | Trainer Availability | Set and view trainer availability | PUT /trainers/me/availability, GET /trainers/me/availability, GET /trainers/:id/availability | Trainer/Admin | Trainer token, trainer ID | Needs trainer token |
| RI-011 | M3 | Booking Slots | Create/view/update/delete booking slots | GET /booking-slots, POST /booking-slots, PUT /booking-slots/:id, DELETE /booking-slots/:id | Public/Admin | Admin token, booking slot ID | Partial |
| RI-012 | M3 | Discovery Slots | Manage discovery call slots | GET /discovery-slots, POST /discovery-slots, PUT /discovery-slots/:id, DELETE /discovery-slots/:id | Client/Admin | Client/admin token, slot ID | Partial |
| RI-013 | M3 | Discovery Call Booking | Book discovery call | POST /bookings/discovery | Client | Client token, trainer ID, selected date/time | Needs client token |
| RI-014 | M3 | Booking Management | Create and view bookings | POST /bookings, GET /bookings/upcoming | Client | Client token, trainer ID, subscription ID if training session | Partial / blocked by subscription |
| RI-015 | M3 | Booking Modification | Reschedule/cancel booking | PUT /bookings/:id/reschedule, PUT /bookings/:id/cancel | Client | Client token, valid booking ID | Needs valid booking |
| RI-016 | M4 | Session Lifecycle | View/start/join/complete session | GET /sessions/:id, PUT /sessions/:id/start, PUT /sessions/:id/join, PUT /sessions/:id/complete | Client/Trainer | Client token, trainer token, valid session ID | Needs valid session |
| RI-017 | M4 | Session Notes | Submit session note | PUT /sessions/:id/notes | Trainer | Trainer token, valid session ID | Needs trainer token/session |
| RI-018 | M4 | Trainer Sessions | Trainer views own sessions | GET /trainers/me/sessions | Trainer | Trainer token | Needs trainer token |
| RI-019 | M4 | Admin Session Monitoring | Admin views sessions and discovery bookings | GET /admin/sessions, GET /admin/discovery-bookings | Admin | Admin token | Needs admin credentials |
| RI-020 | M4 | Notifications | List notifications and register device | GET /notifications, POST /register/device | Client/Trainer | Valid token, device token placeholder | Needs token |
| RI-021 | M5 | Subscription Plans | View subscription plans | GET /subscriptions/plans | Authenticated user | Valid token | Ready if token exists |
| RI-022 | M5 | Subscription Activation | Create subscription via Google IAP | POST /subscriptions | Client | Client token, trainer ID, product ID, valid test receipt | Blocked: payment setup/test receipt needed |
| RI-023 | M5 | Subscription Status | View active subscription and usage | GET /subscriptions/me, GET /subscriptions/me/usage | Client | Client token, subscribed or non-subscribed user | Needs client token |
| RI-024 | M5 | Subscription Cancellation | Cancel subscription | POST /client/cancel/subscription | Client | Client token with active subscription | Blocked unless subscribed client exists |
| RI-025 | M2/M4 | Reviews | Create and view trainer reviews | POST /reviews, GET /trainers/:id/reviews | Client/Public | Client token, completed booking ID | Partial / needs booking |
| RI-026 | M1/M2 | User Profile | View and update profile | GET /users/me/profile, PATCH /users/me/profile | Client | Client token | Needs client token |
| RI-027 | M1/M2 | User Profile Media | Upload profile picture | POST /users/me/profile/picture | Client | Client token, image file | Partial |
| RI-028 | M2 | Trainer Media | Upload/list/delete trainer images | GET /trainers/:id/images, POST /trainers/:id/images, DELETE /trainers/:id/images/:imageId | Admin | Admin token, trainer ID, image file | Partial |
| RI-029 | M2 | Trainer Intro Video | Upload/stream trainer intro video | POST /trainers/:id/intro-video, GET /trainers/:id/intro-video/stream | Admin/Client | Admin token, trainer ID, video file | Partial |
| RI-030 | M1/M2 | Admin Clients | View clients | GET /admin/clients, GET /admin/clients/:id | Admin | Admin token, client ID | Needs admin credentials |
| RI-031 | M1/M2 | Waitlist | Add/view waitlist | POST /waitlist, GET /waitlist | Public/Admin | Admin token for list | Partial |
| RI-032 | M1/M2 | Contact | Contact form submission | POST /contact-us | Public | Contact payload | Ready |
| RI-033 | M2/M4 | Organisation Media | Manage media | GET /media, POST /media/images, POST /media/videos, GET /media/:id, DELETE /media/:id | Public/Admin | Admin token, media file | Partial |

---

## Immediate Execution Categories

### Ready Without Credentials

These can run without real role accounts:

| Area | Routes |
|---|---|
| Health | GET /health, GET / |
| Contact | POST /contact-us |
| Waitlist add | POST /waitlist |
| Public trainer reviews | GET /trainers/:id/reviews, if trainer ID exists |
| Booking slots list | GET /booking-slots |
| Negative unauthenticated checks | No-auth 401 tests across protected endpoints |

### Needs Admin Credentials

| Area | Routes |
|---|---|
| Admin login | POST /auth/admin/log-in |
| Trainer creation | POST /trainers |
| Trainer update/delete | PATCH /trainers/:id, DELETE /trainers/:id |
| Admin sessions | GET /admin/sessions |
| Discovery bookings | GET /admin/discovery-bookings |
| Client admin view | GET /admin/clients |
| Media management | POST /media/images, POST /media/videos |

### Needs Client Token

| Area | Routes |
|---|---|
| Client profile | GET /users/me/profile, PATCH /users/me/profile |
| Discovery booking | POST /bookings/discovery |
| Upcoming bookings | GET /bookings/upcoming |
| Reviews | POST /reviews |
| Notifications | GET /notifications |
| Subscription status | GET /subscriptions/me |

### Needs Trainer Token

| Area | Routes |
|---|---|
| Trainer availability | PUT /trainers/me/availability |
| Trainer profile | GET /trainers/me |
| Trainer sessions | GET /trainers/me/sessions |
| Trainer clients | GET /trainers/me/clients |
| Session lifecycle | PUT /sessions/:id/start, PUT /sessions/:id/complete |

### Blocked or Partial

| Area | Reason |
|---|---|
| Subscription activation | Payment setup/test receipt not available |
| Paid training session booking | Requires active subscription or valid subscription ID |
| Full session lifecycle | Requires valid booking/session ID |
| Trainer first-time setup | Requires invite/setup token from email |