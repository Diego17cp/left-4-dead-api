# Chapter 01 — General Conventions

**Document:** Database Design Specification (DDS)

**Version:** 1.0

---

# 1. Purpose

This document defines the physical database design conventions adopted by the Left 4 Dead API project.

Its objective is to establish a single source of truth for every database-related decision before implementation begins.

Every table, column, index, constraint and relationship defined in subsequent chapters must follow the conventions described here.

---

# 2. Scope

This specification covers:

* PostgreSQL physical database design
* Naming conventions
* Primary and foreign key strategies
* Data types
* Constraints
* Indexes
* Catalog tables
* Prisma ORM mapping conventions

This document does **not** cover:

* REST endpoints
* OpenAPI documentation
* Business logic
* Seed implementation
* Supabase configuration

---

# 3. Database Engine

The project uses:

* PostgreSQL 17+
* Supabase PostgreSQL

The database is considered the source of truth for every domain entity.

No business rules should rely exclusively on application code when they can be enforced by database constraints.

---

# 4. PostgreSQL Extensions

The following extensions are expected to be enabled.

| Extension | Purpose                                        |
| --------- | ---------------------------------------------- |
| pg_uuidv7 | UUID Version 7 generation                      |
| pg_trgm   | Future fuzzy search                            |
| unaccent  | Accent-insensitive search                      |
| pgcrypto  | Cryptographic utilities (fallback if required) |

Additional extensions may be added in future versions if justified.

---

# 5. Naming Convention

## Tables

Tables use:

* snake_case
* plural names

Examples:

```text
games
campaigns
maps
weapons
weapon_categories
```

---

## Columns

Columns use:

* snake_case
* descriptive names

Examples:

```text
game_id
weapon_class_id
chapter_number
display_order
release_date
```

---

## Constraints

Constraint prefixes:

| Prefix | Meaning           |
| ------ | ----------------- |
| pk_    | Primary Key       |
| fk_    | Foreign Key       |
| uq_    | Unique Constraint |
| chk_   | Check Constraint  |

Example:

```text
pk_games

fk_campaigns_game

uq_games_slug

chk_maps_chapter_number
```

---

## Indexes

Index prefix:

```text
idx_
```

Examples:

```text
idx_weapons_slug

idx_campaigns_game

idx_media_type
```

---

# 6. Primary Key Strategy

Every table uses:

```sql
UUID Version 7
```

Reasons:

* globally unique
* sortable
* API friendly
* no sequential identifier exposure
* scalable

Primary key column name is always:

```text
id
```

---

# 7. Foreign Key Strategy

Foreign keys always:

* reference UUID primary keys
* use snake_case
* end with "_id"

Example:

```text
game_id

campaign_id

weapon_class_id
```

---

## ON UPDATE

Every foreign key uses:

```sql
ON UPDATE CASCADE
```

---

## ON DELETE

General rule:

Reference tables must not be deleted while dependent records exist.

Default action:

```sql
ON DELETE RESTRICT
```

Exceptions may exist for bridge tables.

---

# 8. Data Type Standards

## UUID

Used for:

* Primary Keys
* Foreign Keys

---

## TEXT

Default string type.

VARCHAR(n) is intentionally avoided.

Reasons:

* PostgreSQL stores both efficiently
* avoids arbitrary limits
* simpler migrations

---

## SMALLINT

Used for:

* chapter_number
* display_order
* weapon tiers
* small numeric values

---

## INTEGER

Used only when SMALLINT becomes insufficient.

---

## NUMERIC

Used only for decimal values requiring precision.

Example:

* reload time
* fire rate

---

## BOOLEAN

Used only for true binary concepts.

Booleans must **not** replace domain entities.

Correct:

```text
is_hidden
```

Incorrect:

```text
is_dlc
```

---

## DATE

Used for calendar dates only.

Example:

```text
release_date
```

---

# 9. NULL Policy

The project minimizes nullable columns.

Rules:

Nullable:

* optional descriptions
* optional biographies
* optional media dimensions

Avoid nullable foreign keys whenever possible.

Instead, represent absence using explicit catalog values.

Example:

AmmoType

* Small
* Shotgun
* None

instead of

```text
ammo_type_id NULL
```

---

# 10. Catalog Tables

A catalog table represents a stable domain concept.

Examples:

* weapon_categories
* weapon_classes
* weapon_tiers
* ammo_types
* media_roles
* media_types
* item_categories
* content_sources

Catalogs use UUID primary keys for consistency.

PostgreSQL ENUM types are intentionally avoided.

Reasons:

* easier migrations
* Prisma compatibility
* extensibility
* seed friendly

---

# 11. Slug Convention

Public resources expose immutable slugs.

Slug rules:

* lowercase
* kebab-case
* ASCII only
* unique
* immutable after publication

Examples:

```text
left-4-dead

left-4-dead-2

dead-center

the-sacrifice

ak-47

first-aid-kit
```

Internal catalog tables do not require slugs.

---

# 12. Timestamp Policy

Static domain tables do **not** contain:

```text
created_at

updated_at

deleted_at
```

Reasons:

* data originates from controlled seeds
* users never modify domain data
* unnecessary storage
* simpler models

Audit timestamps may exist in future operational tables.

---

# 13. Soft Delete Policy

Soft delete is intentionally unsupported.

Records are removed only through controlled migrations or seed updates.

No table contains:

```text
deleted_at
```

---

# 14. Description Policy

Every public resource should provide:

```text
description
```

Descriptions are nullable during early development.

Future versions should progressively complete them.

Catalog tables generally omit descriptions unless necessary.

---

# 15. Relationship Philosophy

Relationships represent domain ownership.

Derived relationships must not be modeled.

Examples:

Correct:

Game

↓

Campaign

↓

Map

Incorrect:

Campaign

↓

Weapon

Campaign

↓

Survivor

Those relationships can already be inferred.

---

# 16. Media Philosophy

The database stores metadata only.

Binary files are stored inside Supabase Storage.

Media stores:

* storage path
* metadata
* dimensions
* MIME type

Media does not store:

* binary data
* public URLs
* signed URLs

URLs are generated dynamically.

---

# 17. Statistics Philosophy

Weapons own their identity.

Statistics belong to specialized tables.

Examples:

* ranged_weapon_stats
* melee_weapon_stats
* throwable_weapon_stats

This avoids nullable columns while preserving strong typing.

---

# 18. Prisma Mapping Convention

Prisma models use singular names.

Examples:

```prisma
model Weapon
model Campaign
model Game
```

Physical tables remain plural using:

```prisma
@@map()
```

Example:

```prisma
model Weapon {
  @@map("weapons")
}
```

---

# 19. Future Internationalization

Version 1 stores text directly inside domain tables.

Translation tables are intentionally omitted.

Future versions may introduce:

```text
weapon_translations

campaign_translations

item_translations
```

without changing domain identifiers.

---

# 20. Design Principles Summary

The database follows these principles:

* Domain-first modeling
* Strong normalization (3NF)
* Explicit relationships
* Minimal nullable fields
* UUID primary keys
* Immutable public slugs
* Catalog tables instead of ENUMs
* No derived relationships
* Metadata instead of file storage
* Simplicity over speculative extensibility

These principles are mandatory for every chapter that follows.
