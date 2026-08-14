import { PrismaClient } from "@prisma/client/extension";

export async function seedMediaRoles(prisma: PrismaClient) {
	const mediaRoles = [
		{ name: "cover" },
		{ name: "banner" },
		{ name: "logo" },
		{ name: "icon" },
		{ name: "thumbnail" },
		{ name: "screenshot" },
		{ name: "render" },
		{ name: "portrait" }
	];

	for (const mediaRole of mediaRoles) {
		await prisma.mediaRole.upsert({
			where: {
				name: mediaRole.name,
			},
			update: mediaRole,
			create: mediaRole,
		});
	}
}
