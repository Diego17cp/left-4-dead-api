import { Persister } from "@/ingestion/core/contracts";
import { ResolvedSurvivor } from "./survivor.types";
import { DatabaseConnection } from "@/config";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const survivorPersister: Persister<ResolvedSurvivor> = {
  async persist(survivors) {
    const db = DatabaseConnection.getInstance().getPrismaClient()

    for (const survivor of survivors) {
      await db.$transaction(async (tx) => {
        const survivorRecord = await tx.survivor.upsert({
          where: { slug: survivor.slug },
          update: {
            name: survivor.name,
            description: survivor.description,
            biography: survivor.biography,
            gender: survivor.gender,
            age: survivor.age,
            occupation: survivor.occupation,
            gameId: survivor.gameId
          },
          create: {
            name: survivor.name,
            slug: survivor.slug,
            description: survivor.description,
            biography: survivor.biography,
            gender: survivor.gender,
            age: survivor.age,
            occupation: survivor.occupation,
            gameId: survivor.gameId
          }
        })

        if (survivor.media && survivor.media.length > 0) {
          const basePath = `survivors/${survivor.slug}/media`;
          const persistedMedia = await persistMediaRecords(tx, survivor.media, basePath);

          await tx.survivorMedia.deleteMany({
            where: { survivorId: survivorRecord.id }
          });

          await tx.survivorMedia.createMany({
            data: persistedMedia.map(m => ({
              survivorId: survivorRecord.id,
              mediaId: m.mediaId,
              mediaRoleId: m.mediaRoleId,
              displayOrder: m.displayOrder
            }))
          });
        }
      });
    }
  }
}