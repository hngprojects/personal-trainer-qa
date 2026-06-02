# Known Blockers and Limitations

| ID | Area | Limitation / Blocker | Impact | Required Resolution | Status |
|---|---|---|---|---|---|
| BLK-001 | Credentials | Real admin, client, and trainer staging accounts are not yet available. | Full role-based regression cannot be executed. | Provide registered staging credentials or valid tokens. | Open |
| BLK-002 | Subscription/Payment | Payment/subscription happy path is not fully set up on staging. | M5 payment activation cannot be fully validated. | Provide test payment setup, test receipt, or seeded subscribed client. | Open |
| BLK-003 | Client Flows | Client-only endpoints require a valid client token. | Booking, profile, subscriptions, and notifications may fail with 401. | Provide client token or working client login flow. | Open |
| BLK-004 | Trainer Flows | Trainer endpoints require a valid trainer token. | Availability, trainer sessions, and trainer profile tests may fail with 401. | Provide trainer account or trainer setup token. | Open |
| BLK-005 | Session Lifecycle | Session start, join, complete, and notes require a valid booking/session ID. | M4 lifecycle cannot be fully tested without seeded session data. | Create valid booking/session data in staging. | Open |