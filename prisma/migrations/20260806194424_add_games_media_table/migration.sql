-- CreateTable
CREATE TABLE "game_media" (
    "game_id" TEXT NOT NULL,
    "media_id" TEXT NOT NULL,
    "media_role_id" TEXT NOT NULL,

    CONSTRAINT "game_media_pkey" PRIMARY KEY ("game_id","media_id","media_role_id")
);

-- AddForeignKey
ALTER TABLE "game_media" ADD CONSTRAINT "game_media_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_media" ADD CONSTRAINT "game_media_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "game_media" ADD CONSTRAINT "game_media_media_role_id_fkey" FOREIGN KEY ("media_role_id") REFERENCES "media_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
