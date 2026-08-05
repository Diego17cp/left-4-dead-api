# Chapter 03 — Characters Module

**Document:** Database Design Specification (DDS)

**Version:** 1.0

---

# Overview

The Characters module models every named character exposed by the API.

Version 1 includes three independent domain entities:

* survivors
* special_infected
* common_infected_variants

These entities intentionally remain separated because they represent different concepts within the Left 4 Dead universe and have different metadata.

No inheritance strategy is used.

No generic `characters` table exists.

---

# Table: survivors

## Purpose

Represents a playable survivor.

Examples:

* Bill
* Zoey
* Francis
* Louis
* Nick
* Ellis
* Coach
* Rochelle

---

## Columns

| Column      | PostgreSQL Type | Nullable | Default            | Description                     |
| ----------- | --------------- | -------- | ------------------ | ------------------------------- |
| id          | UUID            | No       | uuid_generate_v7() | Primary Key                     |
| game_id     | UUID            | No       | —                  | Game where the survivor debuted |
| name        | TEXT            | No       | —                  | Display name                    |
| slug        | TEXT            | No       | —                  | Public identifier               |
| description | TEXT            | Yes      | NULL               | General description             |
| biography   | TEXT            | Yes      | NULL               | Character biography             |
| gender      | TEXT            | Yes      | NULL               | Character gender                |
| age         | SMALLINT        | Yes      | NULL               | Approximate age                 |
| occupation  | TEXT            | Yes      | NULL               | Previous occupation             |

---

## Primary Key

```sql
PRIMARY KEY (id)
```

Constraint

```text
pk_survivors
```

---

## Foreign Keys

### game_id

References

```text
games(id)
```

Actions

```sql
ON UPDATE CASCADE
ON DELETE RESTRICT
```

Constraint

```text
fk_survivors_game
```

---

## Unique Constraints

```sql
UNIQUE(slug)
```

Constraint

```text
uq_survivors_slug
```

---

## Check Constraints

```sql
name <> ''
```

```sql
slug <> ''
```

```sql
age > 0
```

Age is optional.

If provided, it must be positive.

---

## Indexes

```text
idx_survivors_slug

idx_survivors_game
```

---

## Relationships

```text
games

1:N survivors
```

---

## Business Rules

A survivor always belongs to the game where they officially debuted.

Guest appearances do not modify ownership.

---

## Prisma Notes

Public resource.

Slug required.

---

## Performance Notes

Most queries are expected to filter by:

* slug
* game

---

# Table: special_infected

## Purpose

Represents a named Special Infected.

Examples

* Smoker
* Hunter
* Boomer
* Tank
* Witch
* Charger
* Spitter
* Jockey

---

## Columns

| Column      | PostgreSQL Type | Nullable | Default            |
| ----------- | --------------- | -------- | ------------------ |
| id          | UUID            | No       | uuid_generate_v7() |
| game_id     | UUID            | No       | —                  |
| name        | TEXT            | No       | —                  |
| slug        | TEXT            | No       | —                  |
| description | TEXT            | Yes      | NULL               |
| abilities   | TEXT            | Yes      | NULL               |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

Constraint

```text
pk_special_infected
```

---

## Foreign Keys

### game_id

References

```text
games(id)
```

Constraint

```text
fk_special_infected_game
```

Actions

```sql
ON UPDATE CASCADE
ON DELETE RESTRICT
```

---

## Unique Constraints

```sql
UNIQUE(slug)
```

Constraint

```text
uq_special_infected_slug
```

---

## Check Constraints

```sql
name <> ''
```

```sql
slug <> ''
```

---

## Indexes

```text
idx_special_infected_slug

idx_special_infected_game
```

---

## Relationships

```text
games

1:N special_infected
```

---

## Business Rules

Every Special Infected belongs to the game where it first appeared.

Abilities are descriptive metadata only.

Gameplay mechanics are outside this table.

---

## Prisma Notes

Public resource.

Slug required.

---

## Performance Notes

Lookups are expected to be primarily slug-based.

---

# Table: common_infected_variants

## Purpose

Represents a variant of the generic Common Infected.

Examples

* Riot Infected
* CEDA Worker
* Mud Man
* Clown
* Fallen Survivor
* Jimmy Gibbs Jr.

This entity does not represent the default Common Infected.

---

## Columns

| Column        | PostgreSQL Type | Nullable | Default            |
| ------------- | --------------- | -------- | ------------------ |
| id            | UUID            | No       | uuid_generate_v7() |
| game_id       | UUID            | No       | —                  |
| name          | TEXT            | No       | —                  |
| slug          | TEXT            | No       | —                  |
| description   | TEXT            | Yes      | NULL               |
| special_trait | TEXT            | Yes      | NULL               |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

Constraint

```text
pk_common_infected_variants
```

---

## Foreign Keys

### game_id

References

```text
games(id)
```

Constraint

```text
fk_common_infected_variants_game
```

Actions

```sql
ON UPDATE CASCADE
ON DELETE RESTRICT
```

---

## Unique Constraints

```sql
UNIQUE(slug)
```

Constraint

```text
uq_common_infected_variants_slug
```

---

## Check Constraints

```sql
name <> ''
```

```sql
slug <> ''
```

---

## Indexes

```text
idx_common_infected_variants_slug

idx_common_infected_variants_game
```

---

## Relationships

```text
games

1:N common_infected_variants
```

---

## Business Rules

Each record represents a unique infected variant with distinct gameplay or visual characteristics.

The generic Common Infected is intentionally excluded because it is not an individual variant.

---

## Prisma Notes

Public resource.

Slug required.

---

## Performance Notes

Expected dataset size is small (< 30 rows).

---

# Character Attribute Philosophy

Character tables intentionally avoid storing gameplay statistics.

The API models encyclopedic information rather than gameplay mechanics.

Examples of acceptable attributes:

* biography
* occupation
* abilities
* special_trait

Examples intentionally excluded:

* health
* movement_speed
* damage
* AI behavior
* spawn probability

Those concepts belong to gameplay systems rather than domain identity.

---

# Character Module Summary

## Tables

| Table                    | Type   |
| ------------------------ | ------ |
| survivors                | Domain |
| special_infected         | Domain |
| common_infected_variants | Domain |

---

## Relationships

```text
games
├── survivors
├── special_infected
└── common_infected_variants
```

---

# Design Decisions

The project intentionally avoids a generic `characters` table.

Reasons:

* Survivors and infected do not share meaningful business attributes.
* A generic table would introduce nullable columns and unnecessary complexity.
* Separate entities produce a simpler and more expressive API.

Future character types may be introduced as new independent tables without affecting the existing model.

---

# Future Considerations (Out of Scope)

The following concepts may appear in future versions but are intentionally excluded from Version 1:

* NPCs
* Voice actors
* Voice lines
* Character relationships
* Character appearances by campaign
* AI-controlled survivor behavior
* Unlockable content
* Achievements related to characters

These concepts should only be introduced when they provide independent domain value.
