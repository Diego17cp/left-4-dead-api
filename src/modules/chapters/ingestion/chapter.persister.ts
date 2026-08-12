import { Persister } from "@/ingestion/core/contracts";
import { ResolvedChapter } from "./chapter.types";
import { DatabaseConnection } from "@/config";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const chapterPersister: Persister<ResolvedChapter> = {
  async persist(chapters) {
    const db = DatabaseConnection.getInstance().getPrismaClient();

    for (const chapter of chapters) {
      await db.$transaction(async (tx) => {
        const chapterRecord = await tx.chapter.upsert({
          where: { slug: chapter.slug },
          update: {
            name: chapter.name,
            description: chapter.description,
            chapterNumber: chapter.chapterNumber,
            campaignId: chapter.campaignId
          },
          create: {
            name: chapter.name,
            slug: chapter.slug,
            description: chapter.description,
            chapterNumber: chapter.chapterNumber,
            campaignId: chapter.campaignId
          }
        })

        if (chapter.media && chapter.media.length > 0) {
          const basePath = `chapters/${chapter.slug}/media`;
          const persistedMedia = await persistMediaRecords(tx, chapter.media, basePath);

          await tx.chapterMedia.deleteMany({
            where: { chapterId: chapterRecord.id }
          });

          await tx.chapterMedia.createMany({
            data: persistedMedia.map(m => ({
              chapterId: chapterRecord.id,
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