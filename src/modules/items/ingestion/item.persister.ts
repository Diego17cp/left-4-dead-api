import { Persister } from "@/ingestion/core/contracts";
import { ResolvedItem } from "./item.types";
import { DatabaseConnection } from "@/config";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const itemPersister: Persister<ResolvedItem> = {
	async persist(items) {
		const db = DatabaseConnection.getInstance().getPrismaClient();

		for (const item of items) {
			await db.$transaction(async (tx) => {
				const itemRecord = await tx.item.upsert({
					where: { slug: item.slug },
					update: {
						name: item.name,
						description: item.description,
						gameId: item.gameId,
						itemCategoryId: item.itemCategoryId,
					},
					create: {
						name: item.name,
						slug: item.slug,
						description: item.description,
						gameId: item.gameId,
						itemCategoryId: item.itemCategoryId,
					},
				});
				if (item.media && item.media.length > 0) {
					const basePath = `items/${item.slug}/media`;
					const persistedMedia = await persistMediaRecords(
						tx,
						item.media,
						basePath,
					);

					await tx.itemMedia.deleteMany({
						where: {
							itemId: itemRecord.id,
						},
					});

					await tx.itemMedia.createMany({
						data: persistedMedia.map((media) => ({
							mediaId: media.mediaId,
							itemId: itemRecord.id,
							mediaRoleId: media.mediaRoleId,
							displayOrder: media.displayOrder,
						})),
					});
				}
			});
		}
	},
};
