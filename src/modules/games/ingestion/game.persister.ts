import { Persister } from "@/ingestion/core/contracts/persister";
import { GameAggregate } from "./game.types";
import { DatabaseConnection } from "@/config";
import { persistGameMedia } from "@/ingestion/shared/media/media-persistence";

const prisma = DatabaseConnection.getInstance().getPrismaClient();

export const gamePersister: Persister<GameAggregate> = {
	async persist(aggregates) {
		for (const aggregate of aggregates) {
			await prisma.$transaction(async (tx) => {
				const game = await tx.game.upsert({
					where: {
						slug: aggregate.game.slug,
					},
					update: {
						...aggregate.game,
					},
					create: {
						...aggregate.game,
					},
				});
        await persistGameMedia(
          tx,
          game.id,
          aggregate.media,
          aggregate.game.slug
        )
			});
		}
	},
};
