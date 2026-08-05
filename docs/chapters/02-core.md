# Chapter 02 — Core Module

**Document:** Database Design Specification (DDS)

**Version:** 1.0

---

# Overview

The Core module represents the foundation of the entire Left 4 Dead API.

Every major domain entity ultimately depends on this module.

Current tables:

* games
* content_sources
* campaigns
* maps

---

# Table: games

## Purpose

Represents an official game within the Left 4 Dead franchise.

Examples:

* Left 4 Dead
* Left 4 Dead 2

---

## Columns

| Column       | PostgreSQL Type | Nullable | Default            | Description           |
| ------------ | --------------- | -------- | ------------------ | --------------------- |
| id           | UUID            | No       | uuid_generate_v7() | Primary key           |
| name         | TEXT            | No       | —                  | Official game name    |
| slug         | TEXT            | No       | —                  | Public API identifier |
| description  | TEXT            | Yes      | NULL               | Resource description  |
| release_date | DATE            | Yes      | NULL               | Official release date |

---

## Primary Key

```sql
PRIMARY KEY (id)
```

Constraint:

```text
pk_games
```

---

## Foreign Keys

None.

---

## Unique Constraints

```sql
UNIQUE (slug)
```

Constraint:

```text
uq_games_slug
```

---

## Check Constraints

```sql
name <> ''
```

Constraint:

```text
chk_games_name
```

---

```sql
slug <> ''
```

Constraint:

```text
chk_games_slug
```

---

## Indexes

```text
idx_games_slug
```

Unique Index.

---

## Relationships

```text
games

1:N campaigns

1:N survivors

1:N special_infected

1:N common_infected_variants

1:N weapons
```

---

## Business Rules

A game represents the official origin of every domain resource.

Resources always belong to the game where they first appeared.

Availability in later games is intentionally ignored.

---

## Prisma Notes

```prisma
model Game

@@map("games")
```

---

## Performance Notes

Filtering by slug is expected to be frequent.

Unique index guarantees O(log n) lookups.

---

# Table: content_sources

## Purpose

Represents the official origin of campaign content.

Current values:

* Official
* DLC

Future values may be added without schema changes.

---

## Columns

| Column | PostgreSQL Type | Nullable | Default            |
| ------ | --------------- | -------- | ------------------ |
| id     | UUID            | No       | uuid_generate_v7() |
| name   | TEXT            | No       | —                  |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

Constraint:

```text
pk_content_sources
```

---

## Foreign Keys

None.

---

## Unique Constraints

```sql
UNIQUE(name)
```

Constraint:

```text
uq_content_sources_name
```

---

## Check Constraints

```sql
name <> ''
```

---

## Indexes

Unique index on:

```text
name
```

---

## Relationships

```text
content_sources

1:N campaigns
```

---

## Business Rules

ContentSource replaces boolean flags such as:

```text
is_dlc
```

The project models domain concepts instead of implementation shortcuts.

---

## Prisma Notes

Internal catalog.

No slug required.

---

## Performance Notes

Small lookup table.

Expected rows:

< 20

---

# Table: campaigns

## Purpose

Represents an official campaign introduced in a specific game.

A campaign consists of one or more ordered maps.

---

## Columns

| Column            | PostgreSQL Type | Nullable | Default            |
| ----------------- | --------------- | -------- | ------------------ |
| id                | UUID            | No       | uuid_generate_v7() |
| game_id           | UUID            | No       | —                  |
| content_source_id | UUID            | No       | —                  |
| name              | TEXT            | No       | —                  |
| slug              | TEXT            | No       | —                  |
| description       | TEXT            | Yes      | NULL               |
| release_date      | DATE            | Yes      | NULL               |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

---

## Foreign Keys

```sql
game_id
```

References

```text
games(id)
```

ON UPDATE CASCADE

ON DELETE RESTRICT

Constraint:

```text
fk_campaigns_game
```

---

```sql
content_source_id
```

References

```text
content_sources(id)
```

Constraint:

```text
fk_campaigns_content_source
```

---

## Unique Constraints

```sql
UNIQUE(slug)
```

Constraint:

```text
uq_campaigns_slug
```

---

## Check Constraints

```sql
name <> ''
```

---

```sql
slug <> ''
```

---

## Indexes

```text
idx_campaigns_slug

idx_campaigns_game

idx_campaigns_content_source
```

---

## Relationships

```text
games

1:N campaigns

content_sources

1:N campaigns

campaigns

1:N maps
```

---

## Business Rules

Campaigns belong to the game where they were originally introduced.

Campaign ports are outside project scope.

---

## Prisma Notes

Public resource.

Slug required.

---

## Performance Notes

Indexes optimize:

* campaign lookup
* listing campaigns by game
* listing campaigns by source

---

# Table: chapters

## Purpose

Represents a playable chapter within a campaign.

Maps are ordered by chapter number.

---

## Columns

| Column         | PostgreSQL Type | Nullable | Default            |
| -------------- | --------------- | -------- | ------------------ |
| id             | UUID            | No       | uuid_generate_v7() |
| campaign_id    | UUID            | No       | —                  |
| chapter_number | SMALLINT        | No       | —                  |
| name           | TEXT            | No       | —                  |
| slug           | TEXT            | No       | —                  |
| description    | TEXT            | Yes      | NULL               |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

---

## Foreign Keys

```sql
campaign_id
```

References

```text
campaigns(id)
```

ON UPDATE CASCADE

ON DELETE RESTRICT

Constraint:

```text
fk_maps_campaign
```

---

## Unique Constraints

```sql
UNIQUE(slug)
```

Constraint:

```text
uq_maps_slug
```

---

```sql
UNIQUE(campaign_id, chapter_number)
```

Constraint:

```text
uq_maps_campaign_chapter
```

Ensures chapter numbers are unique inside a campaign.

---

## Check Constraints

```sql
chapter_number > 0
```

Constraint:

```text
chk_maps_chapter_number
```

---

```sql
name <> ''
```

---

```sql
slug <> ''
```

---

## Indexes

```text
idx_maps_campaign

idx_maps_slug

idx_maps_chapter
```

---

## Relationships

```text
campaigns

1:N maps
```

---

## Business Rules

Maps are always ordered by chapter_number.

The API should expose maps using ascending chapter order by default.

---

## Prisma Notes

Public resource.

Slug required.

Default ordering:

```text
chapter_number ASC
```

---

## Performance Notes

Composite unique constraint also acts as an efficient lookup index for chapter retrieval inside a campaign.

---

# Core Module Summary

## Tables

| Table           | Type    |
| --------------- | ------- |
| games           | Domain  |
| content_sources | Catalog |
| campaigns       | Domain  |
| maps            | Domain  |

---

## Relationships

```text
games
    │
    ├──────────────┐
    │              │
    ▼              ▼
campaigns     characters
    │
    ▼
maps
```

---

## Design Notes

The Core module intentionally models ownership rather than availability.

No relationships exist between:

* campaigns ↔ survivors
* campaigns ↔ weapons
* campaigns ↔ items

Those relationships are derivable and therefore excluded from the physical model.

This module serves as the root of the entire database hierarchy.
