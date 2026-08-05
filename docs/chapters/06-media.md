# Chapter 06 — Media Module

**Document:** Database Design Specification (DDS)

**Version:** 1.0

---

# Overview

The Media module manages multimedia assets used throughout the API.

Media is considered independent domain data.

Binary files are stored externally using Supabase Storage.

The database stores only metadata and relationships.

---

# Media Architecture

The architecture follows:

```text
Entity

    |

    N:M

    |

Media
```

Relationships are represented through bridge tables.

Examples:

```text
weapon_media

campaign_media

survivor_media
```

---

# Storage Philosophy

The database does not store:

* binary files
* public URLs
* signed URLs

The database stores:

* storage path
* file metadata
* media classification

Public URLs are generated dynamically.

---

# Table: media_types

## Purpose

Represents the type of a media asset.

Examples:

* Image
* Video
* Audio
* GIF

---

## Columns

| Column      | PostgreSQL Type | Nullable | Default            |
| ----------- | --------------- | -------- | ------------------ |
| id          | UUID            | No       | uuid_generate_v7() |
| name        | TEXT            | No       | —                  |
| mime_prefix | TEXT            | No       | —                  |

---

## Primary Key

```sql id="u4x2ef"
PRIMARY KEY(id)
```

Constraint:

```text id="7m1v3p"
pk_media_types
```

---

## Unique Constraints

```sql id="q8h2xm"
UNIQUE(name)
```

Constraint:

```text id="4t9pqs"
uq_media_types_name
```

---

```sql id="z5x0md"
UNIQUE(mime_prefix)
```

---

## Check Constraints

```sql id="4jd5pw"
name <> ''
```

---

```sql id="0mk7yw"
mime_prefix <> ''
```

---

## Relationships

```text id="9v2n8a"
media_types

1:N media
```

---

# Table: media_roles

## Purpose

Represents the purpose of a media asset inside a relationship.

Examples:

* Icon
* Thumbnail
* Artwork
* Screenshot
* Banner
* Portrait

---

## Columns

| Column | PostgreSQL Type | Nullable | Default            |
| ------ | --------------- | -------- | ------------------ |
| id     | UUID            | No       | uuid_generate_v7() |
| name   | TEXT            | No       | —                  |

---

## Primary Key

```sql id="8t2wq3"
PRIMARY KEY(id)
```

---

## Unique Constraints

```sql id="0j6p6r"
UNIQUE(name)
```

---

## Check Constraints

```sql id="9x3mkl"
name <> ''
```

---

## Business Rules

Media roles belong to the relationship.

They do not belong to the file.

The same file may have different roles depending on context.

---

# Table: media

## Purpose

Represents metadata of a stored multimedia asset.

---

## Columns

| Column        | PostgreSQL Type | Nullable | Default            |
| ------------- | --------------- | -------- | ------------------ |
| id            | UUID            | No       | uuid_generate_v7() |
| media_type_id | UUID            | No       | —                  |
| storage_path  | TEXT            | No       | —                  |
| filename      | TEXT            | No       | —                  |
| mime_type     | TEXT            | No       | —                  |
| file_size     | INTEGER         | Yes      | NULL               |
| width         | INTEGER         | Yes      | NULL               |
| height        | INTEGER         | Yes      | NULL               |
| duration      | NUMERIC         | Yes      | NULL               |

---

# Primary Key

```sql id="q1c5sm"
PRIMARY KEY(id)
```

---

# Foreign Keys

## media_type_id

References:

```text id="9j7w0c"
media_types(id)
```

Actions:

```sql id="g7k9zt"
ON UPDATE CASCADE
ON DELETE RESTRICT
```

Constraint:

```text id="x7m1ea"
fk_media_type
```

---

# Unique Constraints

```sql id="y8x4dv"
UNIQUE(storage_path)
```

Constraint:

```text id="6qz3mz"
uq_media_storage_path
```

---

# Check Constraints

```sql id="3c2z8j"
file_size >= 0
```

---

```sql id="2a0q7h"
width >= 0
```

---

```sql id="1k9mv8"
height >= 0
```

---

```sql id="4b7nqx"
duration >= 0
```

---

# Indexes

```text id="3w0n9q"
idx_media_type

idx_media_storage_path
```

---

# Relationships

```text id="7k3mca"
media_types

1:N media
```

---

# Business Rules

Each stored file has exactly one storage location.

The same physical file should not be duplicated unnecessarily.

---

# Bridge Table Convention

All entity-media relations follow:

```text
entity_media
```

Structure:

```text
entity_id

media_id

media_role_id

display_order
```

---

# Table: weapon_media

## Purpose

Associates media assets with weapons.

---

## Columns

| Column        | Type     | Nullable |
| ------------- | -------- | -------- |
| weapon_id     | UUID     | No       |
| media_id      | UUID     | No       |
| media_role_id | UUID     | No       |
| display_order | SMALLINT | No       |

---

## Primary Key

```sql id="8q1f7m"
PRIMARY KEY(
weapon_id,
media_id,
media_role_id
)
```

---

## Foreign Keys

```text id="a5m9x0"
weapon_id → weapons(id)

media_id → media(id)

media_role_id → media_roles(id)
```

All:

```sql id="0p8d1w"
ON UPDATE CASCADE

ON DELETE CASCADE
```

---

## Indexes

```text id="j7n8v4"
idx_weapon_media_weapon

idx_weapon_media_media
```

---

## Unique Constraints

```sql id="3v5xq0"
UNIQUE(
weapon_id,
media_role_id,
display_order
)
```

---

# Campaign Media

## Table

```text id="8h0n5p"
campaign_media
```

---

## Purpose

Associates campaigns with media assets.

---

## Structure

Same bridge pattern:

```text id="0x5j8s"
campaign_id

media_id

media_role_id

display_order
```

---

# Chapter Media

## Table

```text id="5n2m8v"
chapter_media
```

Structure:

```text
chapter_id

media_id

media_role_id

display_order
```

---

# Survivor Media

## Table

```text id="8c7w3d"
survivor_media
```

Structure:

```text
survivor_id

media_id

media_role_id

display_order
```

---

# Special Infected Media

## Table

```text id="4q1m7c"
special_infected_media
```

Structure:

```text
special_infected_id

media_id

media_role_id

display_order
```

---

# Common Infected Variant Media

## Table

```text id="9p4x6a"
common_infected_variant_media
```

Structure:

```text
common_infected_variant_id

media_id

media_role_id

display_order
```

---

# Item Media

## Table

```text id="6y8m1b"
item_media
```

Structure:

```text
item_id

media_id

media_role_id

display_order
```

---

# Bridge Table Common Rules

All bridge tables must:

* use composite primary keys
* cascade deletion
* index entity_id
* index media_id
* include display_order

---

# Media Module Summary

## Tables

| Table                         | Type    |
| ----------------------------- | ------- |
| media_types                   | Catalog |
| media_roles                   | Catalog |
| media                         | Domain  |
| weapon_media                  | Bridge  |
| campaign_media                | Bridge  |
| chapter_media                 | Bridge  |
| survivor_media                | Bridge  |
| special_infected_media        | Bridge  |
| common_infected_variant_media | Bridge  |
| item_media                    | Bridge  |

---

# Final Relationship Graph

```text
                 media_types
                      |
                      |
                    media
                      |
        ┌─────────────┼─────────────┐
        |             |             |
    weapons      campaigns      survivors
        |             |            |
    weapon_media  chapter_media  survivor_media
        |
   media_roles
```

---

# Design Decisions

The Media module intentionally avoids:

* polymorphic foreign keys
* storing URLs directly
* entity-specific media columns
* duplicated storage references

This design allows adding new media consumers without changing the media system.

Example future additions:

* achievements
* maps screenshots
* voice lines
* community content
* mods

can introduce new bridge tables without modifying existing media structures.
