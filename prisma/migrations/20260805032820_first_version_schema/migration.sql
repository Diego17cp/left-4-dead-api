-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "release_date" TIMESTAMP(3),

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_sources" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "content_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "content_source_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "release_date" TIMESTAMP(3),

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "chapter_number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "survivors" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "biography" TEXT,
    "gender" "Gender",
    "age" SMALLINT,
    "occupation" TEXT,

    CONSTRAINT "survivors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_infected" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "special_infected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "common_infected_variants" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "special_trait" TEXT NOT NULL,

    CONSTRAINT "common_infected_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "weapon_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon_classes" (
    "id" TEXT NOT NULL,
    "weapon_category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "weapon_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon_tiers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order_value" SMALLINT NOT NULL,

    CONSTRAINT "weapon_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ammo_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ammo_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapons" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "weapon_class_id" TEXT NOT NULL,
    "weapon_tier_id" TEXT NOT NULL,
    "ammo_type_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranged_weapon_stats" (
    "weapon_id" TEXT NOT NULL,
    "damage" DOUBLE PRECISION NOT NULL,
    "clip_size" SMALLINT,
    "reserve_ammo" SMALLINT,
    "reload_time" DOUBLE PRECISION,
    "fire_rate" DOUBLE PRECISION,
    "accuracy" DOUBLE PRECISION,
    "spread" DOUBLE PRECISION,
    "range" DOUBLE PRECISION,

    CONSTRAINT "ranged_weapon_stats_pkey" PRIMARY KEY ("weapon_id")
);

-- CreateTable
CREATE TABLE "melee_weapon_stats" (
    "weapon_id" TEXT NOT NULL,
    "damage" DOUBLE PRECISION NOT NULL,
    "swing_speed" DOUBLE PRECISION,
    "stumble_power" DOUBLE PRECISION,

    CONSTRAINT "melee_weapon_stats_pkey" PRIMARY KEY ("weapon_id")
);

-- CreateTable
CREATE TABLE "throwable_weapon_stats" (
    "weapon_id" TEXT NOT NULL,
    "damage" DOUBLE PRECISION,
    "blast_radius" DOUBLE PRECISION,
    "fuse_time" DOUBLE PRECISION,

    CONSTRAINT "throwable_weapon_stats_pkey" PRIMARY KEY ("weapon_id")
);

-- CreateTable
CREATE TABLE "item_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "item_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "item_category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mime_prefix" TEXT NOT NULL,

    CONSTRAINT "media_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "media_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" TEXT NOT NULL,
    "media_type_id" TEXT NOT NULL,
    "storage_path" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "file_size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "duration" DOUBLE PRECISION,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weapon_media" (
    "weapon_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "weapon_media_pkey" PRIMARY KEY ("weapon_id","media_id","media_role_id")
);

-- CreateTable
CREATE TABLE "campaign_media" (
    "campaign_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "campaign_media_pkey" PRIMARY KEY ("campaign_id","media_id","media_role_id")
);

-- CreateTable
CREATE TABLE "chapter_media" (
    "chapter_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "chapter_media_pkey" PRIMARY KEY ("chapter_id","media_id","media_role_id")
);

-- CreateTable
CREATE TABLE "survivor_media" (
    "survivor_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "survivor_media_pkey" PRIMARY KEY ("survivor_id","media_id","media_role_id")
);

-- CreateTable
CREATE TABLE "special_infected_media" (
    "special_infected_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "special_infected_media_pkey" PRIMARY KEY ("special_infected_id","media_id","media_role_id")
);

-- CreateTable
CREATE TABLE "common_infected_variant_media" (
    "common_infected_variant_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "common_infected_variant_media_pkey" PRIMARY KEY ("common_infected_variant_id","media_id","media_role_id")
);

-- CreateTable
CREATE TABLE "item_media" (
    "item_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,
    "display_order" INTEGER NOT NULL,

    CONSTRAINT "item_media_pkey" PRIMARY KEY ("item_id","media_id","media_role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_slug_key" ON "games"("slug");

-- CreateIndex
CREATE INDEX "games_slug_idx" ON "games"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "content_sources_name_key" ON "content_sources"("name");

-- CreateIndex
CREATE INDEX "content_sources_name_idx" ON "content_sources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "campaigns_slug_key" ON "campaigns"("slug");

-- CreateIndex
CREATE INDEX "campaigns_slug_idx" ON "campaigns"("slug");

-- CreateIndex
CREATE INDEX "campaigns_game_id_idx" ON "campaigns"("game_id");

-- CreateIndex
CREATE INDEX "campaigns_content_source_id_idx" ON "campaigns"("content_source_id");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_slug_key" ON "chapters"("slug");

-- CreateIndex
CREATE INDEX "chapters_slug_idx" ON "chapters"("slug");

-- CreateIndex
CREATE INDEX "chapters_campaign_id_idx" ON "chapters"("campaign_id");

-- CreateIndex
CREATE INDEX "chapters_chapter_number_idx" ON "chapters"("chapter_number");

-- CreateIndex
CREATE UNIQUE INDEX "chapters_campaign_id_chapter_number_key" ON "chapters"("campaign_id", "chapter_number");

-- CreateIndex
CREATE UNIQUE INDEX "survivors_slug_key" ON "survivors"("slug");

-- CreateIndex
CREATE INDEX "survivors_slug_idx" ON "survivors"("slug");

-- CreateIndex
CREATE INDEX "survivors_game_id_idx" ON "survivors"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "special_infected_slug_key" ON "special_infected"("slug");

-- CreateIndex
CREATE INDEX "special_infected_slug_idx" ON "special_infected"("slug");

-- CreateIndex
CREATE INDEX "special_infected_game_id_idx" ON "special_infected"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "common_infected_variants_slug_key" ON "common_infected_variants"("slug");

-- CreateIndex
CREATE INDEX "common_infected_variants_slug_idx" ON "common_infected_variants"("slug");

-- CreateIndex
CREATE INDEX "common_infected_variants_game_id_idx" ON "common_infected_variants"("game_id");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_categories_name_key" ON "weapon_categories"("name");

-- CreateIndex
CREATE INDEX "weapon_categories_name_idx" ON "weapon_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_classes_name_key" ON "weapon_classes"("name");

-- CreateIndex
CREATE INDEX "weapon_classes_name_idx" ON "weapon_classes"("name");

-- CreateIndex
CREATE INDEX "weapon_classes_weapon_category_id_idx" ON "weapon_classes"("weapon_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_classes_weapon_category_id_name_key" ON "weapon_classes"("weapon_category_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_tiers_name_key" ON "weapon_tiers"("name");

-- CreateIndex
CREATE INDEX "weapon_tiers_order_value_idx" ON "weapon_tiers"("order_value");

-- CreateIndex
CREATE UNIQUE INDEX "ammo_types_name_key" ON "ammo_types"("name");

-- CreateIndex
CREATE INDEX "ammo_types_name_idx" ON "ammo_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "weapons_slug_key" ON "weapons"("slug");

-- CreateIndex
CREATE INDEX "weapons_game_id_idx" ON "weapons"("game_id");

-- CreateIndex
CREATE INDEX "weapons_slug_idx" ON "weapons"("slug");

-- CreateIndex
CREATE INDEX "weapons_weapon_class_id_idx" ON "weapons"("weapon_class_id");

-- CreateIndex
CREATE INDEX "weapons_weapon_tier_id_idx" ON "weapons"("weapon_tier_id");

-- CreateIndex
CREATE INDEX "weapons_ammo_type_id_idx" ON "weapons"("ammo_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_categories_name_key" ON "item_categories"("name");

-- CreateIndex
CREATE INDEX "item_categories_name_idx" ON "item_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "items_slug_key" ON "items"("slug");

-- CreateIndex
CREATE INDEX "items_game_id_idx" ON "items"("game_id");

-- CreateIndex
CREATE INDEX "items_item_category_id_idx" ON "items"("item_category_id");

-- CreateIndex
CREATE INDEX "items_slug_idx" ON "items"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "media_types_name_key" ON "media_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "media_types_mime_prefix_key" ON "media_types"("mime_prefix");

-- CreateIndex
CREATE UNIQUE INDEX "media_roles_name_key" ON "media_roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "media_storage_path_key" ON "media"("storage_path");

-- CreateIndex
CREATE INDEX "media_media_type_id_idx" ON "media"("media_type_id");

-- CreateIndex
CREATE INDEX "media_storage_path_idx" ON "media"("storage_path");

-- CreateIndex
CREATE INDEX "weapon_media_weapon_id_idx" ON "weapon_media"("weapon_id");

-- CreateIndex
CREATE INDEX "weapon_media_media_id_idx" ON "weapon_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "weapon_media_weapon_id_media_role_id_display_order_key" ON "weapon_media"("weapon_id", "media_role_id", "display_order");

-- CreateIndex
CREATE INDEX "campaign_media_campaign_id_idx" ON "campaign_media"("campaign_id");

-- CreateIndex
CREATE INDEX "campaign_media_media_id_idx" ON "campaign_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_media_campaign_id_media_role_id_display_order_key" ON "campaign_media"("campaign_id", "media_role_id", "display_order");

-- CreateIndex
CREATE INDEX "chapter_media_chapter_id_idx" ON "chapter_media"("chapter_id");

-- CreateIndex
CREATE INDEX "chapter_media_media_id_idx" ON "chapter_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "chapter_media_chapter_id_media_role_id_display_order_key" ON "chapter_media"("chapter_id", "media_role_id", "display_order");

-- CreateIndex
CREATE INDEX "survivor_media_survivor_id_idx" ON "survivor_media"("survivor_id");

-- CreateIndex
CREATE INDEX "survivor_media_media_id_idx" ON "survivor_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "survivor_media_survivor_id_media_role_id_display_order_key" ON "survivor_media"("survivor_id", "media_role_id", "display_order");

-- CreateIndex
CREATE INDEX "special_infected_media_special_infected_id_idx" ON "special_infected_media"("special_infected_id");

-- CreateIndex
CREATE INDEX "special_infected_media_media_id_idx" ON "special_infected_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "special_infected_media_special_infected_id_media_role_id_di_key" ON "special_infected_media"("special_infected_id", "media_role_id", "display_order");

-- CreateIndex
CREATE INDEX "common_infected_variant_media_common_infected_variant_id_idx" ON "common_infected_variant_media"("common_infected_variant_id");

-- CreateIndex
CREATE INDEX "common_infected_variant_media_media_id_idx" ON "common_infected_variant_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "common_infected_variant_media_common_infected_variant_id_me_key" ON "common_infected_variant_media"("common_infected_variant_id", "media_role_id", "display_order");

-- CreateIndex
CREATE INDEX "item_media_item_id_idx" ON "item_media"("item_id");

-- CreateIndex
CREATE INDEX "item_media_media_id_idx" ON "item_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_media_item_id_media_role_id_display_order_key" ON "item_media"("item_id", "media_role_id", "display_order");

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_content_source_id_fkey" FOREIGN KEY ("content_source_id") REFERENCES "content_sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survivors" ADD CONSTRAINT "survivors_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_infected" ADD CONSTRAINT "special_infected_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_infected_variants" ADD CONSTRAINT "common_infected_variants_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_classes" ADD CONSTRAINT "weapon_classes_weapon_category_id_fkey" FOREIGN KEY ("weapon_category_id") REFERENCES "weapon_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_weapon_class_id_fkey" FOREIGN KEY ("weapon_class_id") REFERENCES "weapon_classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_weapon_tier_id_fkey" FOREIGN KEY ("weapon_tier_id") REFERENCES "weapon_tiers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_ammo_type_id_fkey" FOREIGN KEY ("ammo_type_id") REFERENCES "ammo_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapons" ADD CONSTRAINT "weapons_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranged_weapon_stats" ADD CONSTRAINT "ranged_weapon_stats_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "melee_weapon_stats" ADD CONSTRAINT "melee_weapon_stats_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "throwable_weapon_stats" ADD CONSTRAINT "throwable_weapon_stats_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_item_category_id_fkey" FOREIGN KEY ("item_category_id") REFERENCES "item_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_media_type_id_fkey" FOREIGN KEY ("media_type_id") REFERENCES "media_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_media" ADD CONSTRAINT "weapon_media_weapon_id_fkey" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_media" ADD CONSTRAINT "weapon_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weapon_media" ADD CONSTRAINT "weapon_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_media" ADD CONSTRAINT "campaign_media_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_media" ADD CONSTRAINT "campaign_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_media" ADD CONSTRAINT "campaign_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_media" ADD CONSTRAINT "chapter_media_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_media" ADD CONSTRAINT "chapter_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_media" ADD CONSTRAINT "chapter_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survivor_media" ADD CONSTRAINT "survivor_media_survivor_id_fkey" FOREIGN KEY ("survivor_id") REFERENCES "survivors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survivor_media" ADD CONSTRAINT "survivor_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "survivor_media" ADD CONSTRAINT "survivor_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_infected_media" ADD CONSTRAINT "special_infected_media_special_infected_id_fkey" FOREIGN KEY ("special_infected_id") REFERENCES "special_infected"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_infected_media" ADD CONSTRAINT "special_infected_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_infected_media" ADD CONSTRAINT "special_infected_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_infected_variant_media" ADD CONSTRAINT "common_infected_variant_media_common_infected_variant_id_fkey" FOREIGN KEY ("common_infected_variant_id") REFERENCES "common_infected_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_infected_variant_media" ADD CONSTRAINT "common_infected_variant_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "common_infected_variant_media" ADD CONSTRAINT "common_infected_variant_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_media" ADD CONSTRAINT "item_media_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_media" ADD CONSTRAINT "item_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_media" ADD CONSTRAINT "item_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
