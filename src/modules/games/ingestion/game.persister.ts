import { DatabaseConnection } from "@/config";
import { Persister } from "@/ingestion/core/contracts/persister";
import { GameAggregate } from "./game.types";
import { persistMediaRecords } from "@/ingestion/shared/media/media-persistence";

export const gamePersister: Persister<GameAggregate> = {
	async persist(games) {
		const db = DatabaseConnection.getInstance().getPrismaClient();

		for (const game of games) {
			await db.$transaction(async (tx) => {
				const gameRecord = await tx.game.upsert({
					where: { slug: game.slug },
					update: {
						name: game.name,
						description: game.description,
						releaseDate: game.releaseDate,
					},
					create: {
						name: game.name,
						slug: game.slug,
						description: game.description,
						releaseDate: game.releaseDate,
					},
				});

				if (game.media && game.media.length > 0) {
					const basePath = `games/${game.slug}/media`;
					const persistedMedia = await persistMediaRecords(tx, game.media, basePath);

					for (const m of persistedMedia) {
						await tx.gameMedia.upsert({
							where: {
								gameId_mediaId_mediaRoleId: {
									gameId: gameRecord.id,
									mediaId: m.mediaId,
									mediaRoleId: m.mediaRoleId,
								},
							},
							update: { displayOrder: m.displayOrder },
							create: {
								gameId: gameRecord.id,
								mediaId: m.mediaId,
								mediaRoleId: m.mediaRoleId,
								displayOrder: m.displayOrder,
							},
						});
					}
				}
			});
		}
	},
};
