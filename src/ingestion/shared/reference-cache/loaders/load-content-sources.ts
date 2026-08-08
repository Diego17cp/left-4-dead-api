import { PrismaClient } from "@/generated/prisma/client";
import { ReferenceCache } from "../reference-cache";

export const loadContentSources = async (
	cache: ReferenceCache,
	prisma: PrismaClient,
): Promise<void> => {
	const rows = await prisma.contentSource.findMany({
		select: {
			id: true,
			name: true,
		},
	});

	for (const row of rows) {
		cache.set("ContentSource", row.name, row.id);
	}
};
