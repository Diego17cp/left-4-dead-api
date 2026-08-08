import { Prisma } from "@/generated/prisma/client";

export interface MediaAggregate {
	role: string;
	file: string;
	mimeType: string;
}

export interface PersistedMediaResult {
	mediaId: string;
	mediaRoleId: string;
	displayOrder: number;
}

export const persistMediaRecords = async (
	tx: Prisma.TransactionClient,
	media: MediaAggregate[],
	baseStoragePath: string,
): Promise<PersistedMediaResult[]> => {
	const [mediaRoles, mediaTypes] = await Promise.all([
		tx.mediaRole.findMany(),
		tx.mediaType.findMany(),
	]);
	const roleMap = new Map(mediaRoles.map((role) => [role.name, role.id]));
	const typeMap = new Map(mediaTypes.map((type) => [type.mimePrefix, type.id]));

	const results: PersistedMediaResult[] = [];

	for (const [index, file] of media.entries()) {
		const mimePrefix = file.mimeType.split("/")[0];

		const mediaRoleId = roleMap.get(file.role);
		const mediaTypeId = typeMap.get(mimePrefix);

		if (!mediaRoleId) throw new Error(`Unknown media role '${file.role}'.`);
		if (!mediaTypeId) throw new Error(`Unknown media type ${mimePrefix}`);

		const storagePath = `${baseStoragePath}/${file.file}`;
		
		const mediaRecord = await tx.media.upsert({
			where: { storagePath },
			update: { filename: file.file, mimeType: file.mimeType, mediaTypeId },
			create: { storagePath, filename: file.file, mimeType: file.mimeType, mediaTypeId },
		});

		results.push({
			mediaId: mediaRecord.id,
			mediaRoleId,
			displayOrder: index,
		});
	}

	return results;
};
