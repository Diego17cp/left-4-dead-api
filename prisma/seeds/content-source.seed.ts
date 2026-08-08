import { PrismaClient } from "@prisma/client/extension";

export const seedContentSources = async (prisma: PrismaClient) => {
	const contentSources = [
		{
			name: "Official",
		},
		{
			name: "DLC",
		},
		{
			name: "Workshop",
		},
	];

	for (const contentSource of contentSources) {
		await prisma.contentSource.upsert({
			where: {
				name: contentSource.name,
			},
			update: contentSource,
			create: contentSource,
		});
	}
};
