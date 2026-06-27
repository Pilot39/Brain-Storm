# Data Privacy & GDPR Policy

## Overview

Brain-Storm collects and processes personal data to provide its blockchain education services. This document describes the data retention policies, soft-delete behaviour, and GDPR-mandated workflows.

---

## Soft-Delete & Retention Window

All user records are **soft-deleted** (field `deletedAt` is set) rather than immediately purged. This provides a 30-day recovery window.

| Phase | Timeline | Behaviour |
|---|---|---|
| Active | N/A | Normal access |
| Soft-deleted | Day 0 | `deletedAt` set; record hidden from queries but recoverable |
| Recovery window | Days 1–30 | Admin can restore via `POST /gdpr/recover/:id` |
| Hard purge | Day 31+ | Nightly job anonymises then removes the record |

The purge job runs at **midnight UTC** via `@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)`.

---

## GDPR Endpoints

| Method | Path | Description | Auth |
|---|---|---|---|
| `GET` | `/gdpr/export` | Export all personal data (Article 20) | JWT (own user) |
| `DELETE` | `/gdpr/delete` | Request account deletion (Article 17) | JWT (own user) |
| `POST` | `/gdpr/recover/:id` | Recover a soft-deleted account | JWT (admin) |
| `POST` | `/gdpr/purge` | Manually trigger the purge job | JWT (admin) |

### Data Export

The export endpoint returns all stored personal data for the authenticated user, excluding security-sensitive fields (`passwordHash`, `verificationToken`).

### Deletion SLA

Deletion requests are processed immediately (soft-delete). Hard purge occurs within **31 days**, satisfying the GDPR Article 17 erasure obligation.

---

## Anonymisation on Purge

When the retention window expires, the following anonymisation is applied before record removal:

- `email` → `purged-<uuid>@deleted.invalid`
- `username`, `avatar`, `bio`, `stellarPublicKey` → `null`
- `passwordHash` → empty string
- `verificationToken` → `null`

---

## Soft-Delete Query Scopes

All user queries in `UsersService` include `WHERE deletedAt IS NULL` to exclude soft-deleted records from normal operations.

---

## Data Stored

| Category | Fields | Retention |
|---|---|---|
| Identity | `email`, `username`, `avatar` | Until deletion + 30d |
| Auth | `passwordHash`, `verificationToken` | Until deletion + 30d |
| Blockchain | `stellarPublicKey` | Until deletion + 30d |
| Activity | `createdAt`, `role`, `isVerified` | Until deletion + 30d |

---

## Contact

For data subject requests or privacy queries, contact the platform administrator.
