# Chapter 05 — Items Module

**Document:** Database Design Specification (DDS)

**Version:** 1.0

---

# Overview

The Items module represents collectible objects that are not classified as weapons.

Items may include:

* Healing supplies
* Carryable objects
* Upgrade packs
* Special objects

Current tables:

* item_categories
* items

---

# Item Design Philosophy

Items represent objects with utility or interaction purposes.

They intentionally exclude combat weapons.

Examples:

Included:

* First Aid Kit
* Pain Pills
* Adrenaline
* Defibrillator
* Gas Can
* Explosive Ammo Pack
* Incendiary Ammo Pack
* Gnome

Excluded:

* Pistols
* Rifles
* Melee weapons
* Throwables used as weapons

Those belong to the Combat module.

---

# Table: item_categories

## Purpose

Represents the classification of items.

Examples:

* Healing
* Upgrade
* Carryable
* Special

---

## Columns

| Column | PostgreSQL Type | Nullable | Default            | Description   |
| ------ | --------------- | -------- | ------------------ | ------------- |
| id     | UUID            | No       | uuid_generate_v7() | Primary key   |
| name   | TEXT            | No       | —                  | Category name |

---

## Primary Key

```sql id="4fw92p"
PRIMARY KEY(id)
```

Constraint:

```text id="k1v8z7"
pk_item_categories
```

---

## Foreign Keys

None.

---

## Unique Constraints

```sql id="6xczj4"
UNIQUE(name)
```

Constraint:

```text id="xw4f1m"
uq_item_categories_name
```

---

## Check Constraints

```sql id="5j7s3e"
name <> ''
```

Constraint:

```text id="3bx8dp"
chk_item_categories_name
```

---

## Indexes

```text id="3f6v7q"
idx_item_categories_name
```

---

## Relationships

```text id="2mt0ad"
item_categories

1:N items
```

---

## Business Rules

Categories exist only for organization and filtering.

They do not represent gameplay behavior.

---

## Prisma Notes

Internal catalog.

No slug required.

---

## Performance Notes

Expected dataset size is very small.

---

# Table: items

## Purpose

Represents a collectible object that is not a weapon.

Examples:

* First Aid Kit
* Pain Pills
* Adrenaline
* Gas Can
* Gnome

---

## Columns

| Column           | PostgreSQL Type | Nullable | Default            | Description             |
| ---------------- | --------------- | -------- | ------------------ | ----------------------- |
| id               | UUID            | No       | uuid_generate_v7() | Primary key             |
| item_category_id | UUID            | No       | —                  | Item category           |
| game_id          | UUID            | No       | —                  | Game where item debuted |
| name             | TEXT            | No       | —                  | Display name            |
| slug             | TEXT            | No       | —                  | Public identifier       |
| description      | TEXT            | Yes      | NULL               | General description     |

---

# Primary Key

```sql id="d8k0se"
PRIMARY KEY(id)
```

Constraint:

```text id="8z8mq2"
pk_items
```

---

# Foreign Keys

## item_category_id

References:

```text id="9kxy0s"
item_categories(id)
```

Actions:

```sql id="t5qv8h"
ON UPDATE CASCADE
ON DELETE RESTRICT
```

Constraint:

```text id="q3a4jx"
fk_items_category
```

---

## game_id

References:

```text id="v5v4t9"
games(id)
```

Actions:

```sql id="yp7jjq"
ON UPDATE CASCADE
ON DELETE RESTRICT
```

Constraint:

```text id="q8s5f2"
fk_items_game
```

---

# Unique Constraints

```sql id="7mf2ks"
UNIQUE(slug)
```

Constraint:

```text id="5z0w8c"
uq_items_slug
```

---

# Check Constraints

```sql id="x4p1vn"
name <> ''
```

Constraint:

```text id="j5mz0v"
chk_items_name
```

---

```sql id="sk8r7d"
slug <> ''
```

Constraint:

```text id="1t4j3n"
chk_items_slug
```

---

# Indexes

```text id="v8d2qp"
idx_items_slug

idx_items_game

idx_items_category
```

---

# Relationships

```text id="8d9kzx"
games

1:N items


item_categories

1:N items
```

---

# Business Rules

An item belongs to the game where it was originally introduced.

Availability in other games is not modeled.

Examples:

Correct:

```text id="z2k9dp"
Defibrillator

Game:

Left 4 Dead 2
```

Even if it appears in later versions.

---

# Prisma Notes

Public resource.

Slug required.

---

# Performance Notes

Expected query patterns:

```http id="x0e2np"
GET /items/:slug

GET /items?category=healing

GET /items?game=left-4-dead-2
```

Indexes support all expected filters.

---

# Item Module Summary

## Tables

| Table           | Type    |
| --------------- | ------- |
| item_categories | Catalog |
| items           | Domain  |

---

# Final Relationship Graph

```text id="k0x4eg"
games
 |
 └── items
       |
       └── item_categories
```

---

# Design Decisions

The Items module intentionally avoids:

* Weapon inheritance
* Shared object superclass
* Generic collectible tables
* Nullable behavior fields

Items are modeled independently because their domain meaning differs from weapons.

Future item-specific behavior may be added through specialized tables if required.
