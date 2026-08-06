/*
  Warnings:

  - A unique constraint covering the columns `[game_id,media_role_id,display_order]` on the table `game_media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `display_order` to the `game_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game_media" ADD COLUMN     "display_order" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "game_media_game_id_idx" ON "game_media"("game_id");

-- CreateIndex
CREATE INDEX "game_media_media_id_idx" ON "game_media"("media_id");

-- CreateIndex
CREATE UNIQUE INDEX "game_media_game_id_media_role_id_display_order_key" ON "game_media"("game_id", "media_role_id", "display_order");
