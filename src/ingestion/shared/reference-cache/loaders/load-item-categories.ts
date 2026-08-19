import { PrismaClient } from "@/generated/prisma/client";
import { ReferenceCache } from "../reference-cache";

export const loadItemCategories = async (
	cache: ReferenceCache,
	prisma: PrismaClient,
): Promise<void> => {
	const itemCategories = await prisma.itemCategory.findMany({
		select: {
			id: true,
			name: true,
		},
	});
	for (const category of itemCategories) {
		cache.set("ItemCategory", category.name, category.id);
	}
};
