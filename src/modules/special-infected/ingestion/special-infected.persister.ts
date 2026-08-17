import { Persister } from "@/ingestion/core/contracts";
import { ResolvedSpecialInfected } from "./special-infected.types";
import { DatabaseConnection } from "@/config";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const specialInfectedPersister: Persister<ResolvedSpecialInfected> = {
	async persist(specials) {
		const db = DatabaseConnection.getInstance().getPrismaClient();

		for (const special of specials) {
			await db.$transaction(async (tx) => {
				const specialRecord = await tx.specialInfected.upsert({
					where: {
						slug: special.slug,
					},
					update: {
						name: special.name,
						description: special.description,
						gameId: special.gameId,
					},
					create: {
						name: special.name,
						slug: special.slug,
						description: special.description,
						gameId: special.gameId,
					},
				});
				if (special.media && special.media.length > 0) {
					const basePath = `special-infected/${special.slug}/media`;
					const persistedMedia = await persistMediaRecords(
						tx,
						special.media,
						basePath,
					);
					await tx.specialInfectedMedia.deleteMany({
						where: {
							specialInfectedId: specialRecord.id,
						},
					});
					await tx.specialInfectedMedia.createMany({
						data: persistedMedia.map((m) => ({
							specialInfectedId: specialRecord.id,
							mediaId: m.mediaId,
							mediaRoleId: m.mediaRoleId,
							displayOrder: m.displayOrder,
						})),
					});
				}
			}, {
        maxWait: 5000,
        timeout: 20000
      });
		}
	},
};
