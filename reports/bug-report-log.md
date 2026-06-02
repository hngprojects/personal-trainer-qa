# FitCall Bug Report Log

Product: FitCall.me  
Team: Personal Trainer  
Environment: Staging  
Base URL: https://api.staging.fitcall.me/api/v1

## Purpose

This document tracks all defects found during regression execution.

Every failed test must have a linked bug report.

A failed test without a linked bug ID should not be left unresolved in the final QA submission.

## Severity Guide

| Severity | Meaning |
|---|---|
| Critical | Blocks a core MVP flow or prevents users from using the product |
| High | Breaks an important feature but has a possible workaround |
| Medium | Feature works partially, but behavior is incorrect or incomplete |
| Low | Minor issue, copy issue, UI inconsistency, or non-blocking behavior |

## Bug Status Guide

| Status | Meaning |
|---|---|
| Open | Bug has been logged and is unresolved |
| In Progress | Engineering is working on the issue |
| Resolved | Fix has been implemented |
| Retest Passed | QA has confirmed the fix |
| Retest Failed | QA retested and the bug still exists |
| Deferred | Bug is accepted as not fixable before final submission |

## Bug Report Table

| Bug ID | Linked Test Case ID | Milestone | Feature | Severity | Bug Title | Description | Steps to Reproduce | Expected Result | Actual Result | Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| FC-BUG-001 | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | Open |

## Bug Report Entry Format

Use this format when adding a new bug:

### FC-BUG-001: Bug title here

| Field | Details |
|---|---|
| Linked Test Case ID | FC-MX-XXX |
| Requirement ID | REQ-MX-XXX |
| Milestone | M1 / M2 / M3 / M4 / M5 |
| Feature | Feature name |
| Severity | Critical / High / Medium / Low |
| Status | Open |
| Environment | Staging |
| API / Screen | Endpoint or UI screen |
| Description | Short explanation of the issue |
| Steps to Reproduce | 1. Step one. 2. Step two. 3. Step three. |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Evidence | Screenshot, log, API response, Newman output, or video link |
| Notes | Any extra context |

## Current Known Bugs From Postman Collection Review

The following issues were already referenced inside the Postman collection and should be confirmed during execution before final logging.

| Potential Bug ID | Related Area | Related Test / Endpoint | Issue Summary | Current Status |
|---|---|---|---|---|
| FC-BUG-PENDING-001 | Auth | POST /auth/refresh | Refresh token flow appears to be non-functional based on collection notes. Needs execution confirmation. | Pending Confirmation |
| FC-BUG-PENDING-002 | Trainer Profile | GET /trainers/not-a-uuid | Invalid trainer ID may expose raw backend error instead of clean user-facing error. Needs execution confirmation. | Pending Confirmation |
| FC-BUG-PENDING-003 | Trainer Creation | POST /trainers | SMTP failure may create trainer in DB but fail to send credentials, blocking retry because email already exists. Needs execution confirmation. | Pending Confirmation |