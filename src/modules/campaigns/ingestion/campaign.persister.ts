import { DatabaseConnection } from "@/config";
import { Persister } from "@/ingestion/core/contracts/persister";
import { ResolvedCampaign } from "./campaign.types";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const campaignPersister: Persister<ResolvedCampaign> = {
	async persist(campaigns) {
		const db = DatabaseConnection.getInstance().getPrismaClient();

		for (const campaign of campaigns) {
			await db.$transaction(async (tx) => {
				const campaignRecord = await tx.campaign.upsert({
					where: { slug: campaign.slug },
					update: {
						name: campaign.name,
						description: campaign.description,
						releaseDate: campaign.releaseDate,
						gameId: campaign.gameId,
						contentSourceId: campaign.contentSourceId,
					},
					create: {
						name: campaign.name,
						slug: campaign.slug,
						description: campaign.description,
						releaseDate: campaign.releaseDate,
						gameId: campaign.gameId,
						contentSourceId: campaign.contentSourceId,
					},
				});

				if (campaign.media && campaign.media.length > 0) {
					const basePath = `campaigns/${campaign.slug}/media`;
					const persistedMedia = await persistMediaRecords(tx, campaign.media, basePath);

					await tx.campaignMedia.deleteMany({
						where: { campaignId: campaignRecord.id },
					});

					await tx.campaignMedia.createMany({
						data: persistedMedia.map((m) => ({
							campaignId: campaignRecord.id,
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
