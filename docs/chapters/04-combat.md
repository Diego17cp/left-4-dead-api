# Chapter 04 — Combat Module

**Document:** Database Design Specification (DDS)

**Version:** 1.0

---

# Overview

The Combat module represents all offensive equipment available in Left 4 Dead.

This module is composed of:

## Catalog tables

* weapon_categories
* weapon_classes
* weapon_tiers
* ammo_types

## Domain tables

* weapons

## Specialized statistics tables

* ranged_weapon_stats
* melee_weapon_stats
* throwable_weapon_stats

---

# Combat Design Philosophy

A weapon represents the identity of an item.

Statistics are separated according to weapon behavior.

The following relationship applies:

```
Weapon
 |
 ├── RangedWeaponStats
 |
 ├── MeleeWeaponStats
 |
 └── ThrowableWeaponStats
```

A weapon should never contain statistics that do not apply to its behavior.

---

# Table: weapon_categories

## Purpose

Represents the highest-level weapon classification.

Examples:

* Primary
* Secondary
* Melee
* Throwable

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
pk_weapon_categories
```

---

## Unique Constraints

```sql
UNIQUE(name)
```

Constraint:

```text
uq_weapon_categories_name
```

---

## Check Constraints

```sql
name <> ''
```

Constraint:

```text
chk_weapon_categories_name
```

---

## Indexes

```text
idx_weapon_categories_name
```

---

## Relationships

```
weapon_categories

1:N weapon_classes
```

---

## Business Rules

Categories define the broadest weapon grouping.

They should remain stable and small.

---

# Table: weapon_classes

## Purpose

Represents functional classification inside a weapon category.

Examples:

* Assault Rifle
* SMG
* Shotgun
* Sniper Rifle
* Blade
* Blunt
* Explosive

---

## Columns

| Column             | PostgreSQL Type | Nullable | Default            |
| ------------------ | --------------- | -------- | ------------------ |
| id                 | UUID            | No       | uuid_generate_v7() |
| weapon_category_id | UUID            | No       | —                  |
| name               | TEXT            | No       | —                  |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

Constraint:

```text
pk_weapon_classes
```

---

## Foreign Keys

### weapon_category_id

References:

```
weapon_categories(id)
```

Actions:

```sql
ON UPDATE CASCADE
ON DELETE RESTRICT
```

Constraint:

```text
fk_weapon_classes_category
```

---

## Unique Constraints

```sql
UNIQUE(weapon_category_id, name)
```

Constraint:

```text
uq_weapon_classes_category_name
```

---

## Check Constraints

```sql
name <> ''
```

---

## Indexes

```
idx_weapon_classes_category
```

---

## Relationships

```
weapon_categories

1:N weapon_classes


weapon_classes

1:N weapons
```

---

# Table: weapon_tiers

## Purpose

Represents the community classification of weapon progression.

Values:

* Tier 1
* Tier 2
* Tier 3
* None

This is not an official Source Engine mechanic.

---

## Columns

| Column      | PostgreSQL Type | Nullable | Default            |
| ----------- | --------------- | -------- | ------------------ |
| id          | UUID            | No       | uuid_generate_v7() |
| name        | TEXT            | No       | —                  |
| order_value | SMALLINT        | No       | —                  |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

---

## Unique Constraints

```sql
UNIQUE(name)
```

---

## Check Constraints

```sql
order_value >= 0
```

---

## Indexes

```
idx_weapon_tiers_order
```

---

## Business Rules

The `None` tier is a valid domain value.

It represents weapons without progression classification.

---

# Table: ammo_types

## Purpose

Represents ammunition consumed by a weapon.

Examples:

* Small caliber
* Shotgun shells
* Rifle rounds
* Grenades
* None

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

---

## Unique Constraints

```sql
UNIQUE(name)
```

---

## Check Constraints

```sql
name <> ''
```

---

## Relationships

```
ammo_types

1:N weapons
```

---

# Table: weapons

## Purpose

Represents a usable weapon in the Left 4 Dead universe.

Examples:

* AK-47
* M16
* Magnum
* Katana
* Pipe Bomb

---

## Columns

| Column          | PostgreSQL Type | Nullable | Default            |
| --------------- | --------------- | -------- | ------------------ |
| id              | UUID            | No       | uuid_generate_v7() |
| game_id         | UUID            | No       | —                  |
| weapon_class_id | UUID            | No       | —                  |
| weapon_tier_id  | UUID            | No       | —                  |
| ammo_type_id    | UUID            | No       | —                  |
| name            | TEXT            | No       | —                  |
| slug            | TEXT            | No       | —                  |
| description     | TEXT            | Yes      | NULL               |

---

## Primary Key

```sql
PRIMARY KEY(id)
```

---

## Foreign Keys

### game_id

References:

```
games(id)
```

Constraint:

```
fk_weapons_game
```

---

### weapon_class_id

References:

```
weapon_classes(id)
```

Constraint:

```
fk_weapons_class
```

---

### weapon_tier_id

References:

```
weapon_tiers(id)
```

Constraint:

```
fk_weapons_tier
```

---

### ammo_type_id

References:

```
ammo_types(id)
```

Constraint:

```
fk_weapons_ammo_type
```

---

All use:

```sql
ON UPDATE CASCADE
ON DELETE RESTRICT
```

---

## Unique Constraints

```sql
UNIQUE(slug)
```

Constraint:

```
uq_weapons_slug
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

```
idx_weapons_slug

idx_weapons_game

idx_weapons_class

idx_weapons_tier

idx_weapons_ammo_type
```

---

## Relationships

```
games

1:N weapons


weapon_classes

1:N weapons


weapon_tiers

1:N weapons


ammo_types

1:N weapons
```

---

# Table: ranged_weapon_stats

## Purpose

Stores statistics exclusive to ranged weapons.

Examples:

* rifles
* SMGs
* shotguns
* snipers
* pistols

---

## Columns

| Column       | PostgreSQL Type | Nullable |
| ------------ | --------------- | -------- |
| weapon_id    | UUID            | No       |
| damage       | NUMERIC         | No       |
| clip_size    | SMALLINT        | Yes      |
| reserve_ammo | SMALLINT        | Yes      |
| reload_time  | NUMERIC         | Yes      |
| fire_rate    | NUMERIC         | Yes      |
| accuracy     | NUMERIC         | Yes      |
| spread       | NUMERIC         | Yes      |
| range        | NUMERIC         | Yes      |

---

## Primary Key

```sql
PRIMARY KEY(weapon_id)
```

The weapon relationship is one-to-one.

---

## Foreign Key

```
weapon_id → weapons(id)
```

Cascade:

```
ON DELETE CASCADE
```

---

## Check Constraints

```sql
damage >= 0
```

```sql
clip_size >= 0
```

```sql
reload_time >= 0
```

---

## Relationships

```
weapons

1:1 ranged_weapon_stats
```

---

# Table: melee_weapon_stats

## Purpose

Stores statistics exclusive to melee weapons.

---

## Columns

| Column        | Type    | Nullable |
| ------------- | ------- | -------- |
| weapon_id     | UUID    | No       |
| damage        | NUMERIC | No       |
| swing_speed   | NUMERIC | Yes      |
| stumble_power | NUMERIC | Yes      |

---

## Primary Key

```
PRIMARY KEY(weapon_id)
```

---

## Foreign Key

```
weapon_id → weapons(id)
```

ON DELETE CASCADE

---

# Table: throwable_weapon_stats

## Purpose

Stores statistics exclusive to throwable weapons.

Examples:

* Pipe Bomb
* Molotov
* Bile Jar

---

## Columns

| Column       | Type    | Nullable |
| ------------ | ------- | -------- |
| weapon_id    | UUID    | No       |
| damage       | NUMERIC | Yes      |
| blast_radius | NUMERIC | Yes      |
| fuse_time    | NUMERIC | Yes      |

---

## Primary Key

```
PRIMARY KEY(weapon_id)
```

---

## Foreign Key

```
weapon_id → weapons(id)
```

ON DELETE CASCADE

---

# Combat Module Summary

## Tables

| Table                  | Type        |
| ---------------------- | ----------- |
| weapon_categories      | Catalog     |
| weapon_classes         | Catalog     |
| weapon_tiers           | Catalog     |
| ammo_types             | Catalog     |
| weapons                | Domain      |
| ranged_weapon_stats    | Specialized |
| melee_weapon_stats     | Specialized |
| throwable_weapon_stats | Specialized |

---

# Final Relationship Graph

```
games
 |
 └── weapons
       |
       ├── weapon_classes
       |
       ├── weapon_tiers
       |
       ├── ammo_types
       |
       ├── ranged_weapon_stats
       |
       ├── melee_weapon_stats
       |
       └── throwable_weapon_stats
```

---

# Design Decisions

The Combat module avoids:

* nullable statistic columns
* EAV models
* PostgreSQL inheritance
* duplicated weapon tables

The result is a normalized relational model that remains flexible for future weapon types.
