import { PrismaClient } from "@/generated/prisma/client";
import { ReferenceCache } from "../reference-cache";

export const loadGames = async (
	cache: ReferenceCache,
	prisma: PrismaClient,
) => {
	const games = await prisma.game.findMany({
		select: { id: true, slug: true },
	});
	for (const game of games) {
		cache.set("Game", game.slug, game.id);
	}
};
