# MVP Coverage Summary

The FitCall MVP regression suite was structured around the milestone documents as the source of truth.

The covered MVP areas are:

Authentication and accounts
Trainer management
Client profile management
Trainer discovery
Discovery call booking
Booking and session management
Admin dashboard and monitoring
Notifications
Subscription and payment validation where available

Milestone coverage:

Milestone	Scope	Coverage Status	Notes
M1	Authentication and trainer supply	Partial	Auth and trainer provisioning tests are defined. Full execution depends on valid staging credentials.
M2	Trainer discovery and profile	Partial	Trainer list, profile, filters, media, and admin trainer management are mapped. Full execution depends on valid tokens and trainer data.
M3	Booking and discovery call	Partial	Discovery slots, booking, reschedule, cancel, and confirmation flows are mapped. Full execution depends on client token and booking data.
M4	Session lifecycle and notifications	Partial	Session start, join, complete, notes, trainer sessions, admin monitoring, and notifications are mapped. Full execution depends on valid session data.
M5	Subscription and payment conversion	Blocked / Partial	Subscription plan, validation, and access-control checks are mapped. Payment activation is blocked because payment setup or test receipt is not available.
Automation Execution Summary

Automation was executed using the TypeScript Newman runner.

Primary command:

pnpm test:chains:with-summaries

This command:

Runs all focused chained regression tests.
Continues execution even if one chain fails.
Generates individual Newman summary files.
Generates a consolidated execution summary.
Generates a failure triage report.

Execution totals:

Metric	Count
Requests Total	279
Requests Failed	10
Assertions Total	414
Assertions Failed	114
Failure Records	126

Failure triage summary:

Classification	Count
Blocked - credentials or role token needed	21
Blocked - staging rate limit	2
Review - possible assertion mismatch or product bug	17
Review	9
Important Execution Interpretation

The regression suite and automation runner are working.

The failed assertions are not all product defects. Several are caused by missing staging credentials, missing role-specific tokens, missing OTP access, missing seeded booking/session data, unavailable payment setup, or staging rate limiting.

A failure is only treated as a product bug if:

Valid credentials were used.
The correct role token was used.
Required seed data was available.
The environment setup was correct.
The API still behaved incorrectly.
Chained API Coverage

The chain-focused Postman collection covers these MVP flows:

Chain ID	Chain Name	Status
CHAIN-001	Admin trainer management	Partial / blocked until valid admin credentials are available
CHAIN-002	Client onboarding and trainer discovery	Partial / blocked until client OTP or client token is available
CHAIN-003	Discovery booking	Partial / blocked until admin and client tokens are available
CHAIN-004	Trainer availability	Partial / blocked until trainer token is available
CHAIN-005	Session lifecycle	Partial / blocked until valid booking and session data are available
CHAIN-006	Subscription access	Blocked until payment setup, test receipt, or subscribed client data is available
CHAIN-007	Non-subscribed access restriction	Partial / blocked until non-subscribed client token is available
Current Known Blockers
Blocker ID	Area	Impact	Required Resolution	Status
BLK-001	Credentials	Full role-based regression cannot run.	Provide real staging admin, client, and trainer credentials or tokens.	Open
BLK-002	Client OTP	Client verification flow cannot be completed automatically.	Provide OTP access or test email inbox.	Open
BLK-003	Trainer setup	Trainer first-time login and trainer-only endpoints cannot be fully validated.	Provide trainer account or setup token.	Open
BLK-004	Booking/session data	Full session lifecycle cannot be validated.	Provide or create valid booking/session records.	Open
BLK-005	Subscription/payment	M5 happy-path payment activation cannot be validated.	Provide payment test setup, test receipt, or seeded subscribed client.	Open
BLK-006	Mobile app access	UI flows cannot be manually confirmed.	Provide app build, emulator access, or demo walkthrough.	Open
BLK-007	Staging rate limiting	Some full or repeated runs return 429.	Use focused chain runs, request delay, or confirm staging rate-limit policy.	Open
