import { Prisma } from "@/generated/prisma/client";
import { GameMediaAggregate } from "@/modules/games/ingestion/game.types";

export const persistGameMedia = async (
	tx: Prisma.TransactionClient,
	gameId: string,
	media: GameMediaAggregate[],
	gameSlug: string,
): Promise<void> => {
	const [mediaRoles, mediaTypes] = await Promise.all([
		tx.mediaRole.findMany(),
		tx.mediaType.findMany(),
	]);
	const roleMap = new Map(mediaRoles.map((role) => [role.name, role.id]));
	const typeMap = new Map(mediaTypes.map((type) => [type.mimePrefix, type.id]));
	for (const [index, file] of media.entries()) {
		const mimePrefix = file.mimeType.split("/")[0];

		const mediaRoleId = roleMap.get(file.role);
		const mediaTypeId = typeMap.get(mimePrefix);

		if (!mediaRoleId) throw new Error(`Unknown media role '${file.role}'.`);
		if (!mediaTypeId) throw new Error(`Unknown media type ${mimePrefix}`);

		const storagePath = `games/${gameSlug}/media/${file.file}`;
		const mediaRecord = await tx.media.upsert({
			where: {
				storagePath,
			},
			update: {
				filename: file.file,
				mimeType: file.mimeType,
				mediaTypeId,
			},
			create: {
				storagePath,
				filename: file.file,
				mimeType: file.mimeType,
				mediaTypeId,
			},
		});
		await tx.gameMedia.upsert({
			where: {
				gameId_mediaId_mediaRoleId: {
					gameId,
					mediaId: mediaRecord.id,
					mediaRoleId,
				},
			},
			update: {
				displayOrder: index,
			},
			create: {
				gameId,
				mediaId: mediaRecord.id,
				mediaRoleId,
				displayOrder: index,
			},
		});
	}
};
