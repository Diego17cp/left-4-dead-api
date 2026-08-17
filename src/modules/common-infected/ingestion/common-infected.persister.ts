import { Persister } from "@/ingestion/core/contracts";
import { ResolvedCommonInfected } from "./common-infected.types";
import { DatabaseConnection } from "@/config";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const commonInfectedPersister: Persister<ResolvedCommonInfected> = {
	async persist(commons) {
		const db = DatabaseConnection.getInstance().getPrismaClient();

		for (const common of commons) {
			await db.$transaction(async (tx) => {
				const commonRecord = await tx.commonInfectedVariant.upsert({
					where: { slug: common.slug },
					update: {
						gameId: common.gameId,
						name: common.name,
						description: common.description,
						specialTrait: common.specialTrait,
					},
					create: {
						name: common.name,
						slug: common.slug,
						description: common.description,
						specialTrait: common.specialTrait,
						gameId: common.gameId,
					},
				});

				if (common.media && common.media.length > 0) {
					const basePath = `common-infecteds/${common.slug}/media`;
					const persistedMedia = await persistMediaRecords(
						tx,
						common.media,
						basePath,
					);

					await tx.commonInfectedVariantMedia.deleteMany({
						where: { commonInfectedVariantId: commonRecord.id },
					});

					await tx.commonInfectedVariantMedia.createMany({
						data: persistedMedia.map((m) => ({
							commonInfectedVariantId: commonRecord.id,
							mediaId: m.mediaId,
							mediaRoleId: m.mediaRoleId,
							displayOrder: m.displayOrder,
						})),
					});
				}
			});
		}
	},
};
