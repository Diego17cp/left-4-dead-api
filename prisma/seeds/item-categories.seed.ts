import { PrismaClient } from "@prisma/client/extension";

export const seedItemCategories = async (prisma: PrismaClient) => {
	const itemCategories = [
		{ name: "Healing" },
		{ name: "Upgrade" },
		{ name: "Carryable" },
		{ name: "Special" },
	];

	for (const itemCategory of itemCategories) {
		await prisma.itemCategory.upsert({
			where: {
				name: itemCategory.name,
			},
			update: itemCategory,
			create: itemCategory,
		});
	}
};
