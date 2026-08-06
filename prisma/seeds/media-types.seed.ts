import { PrismaClient } from "@prisma/client/extension";

export const seedMediaTypes = async (prisma: PrismaClient) => {
	const mediaTypes = [
		{
			name: "Image",
			mimePrefix: "image",
		},
		{
			name: "Video",
			mimePrefix: "video",
		},
		{
			name: "Audio",
			mimePrefix: "audio",
		},
		{
			name: "Application",
			mimePrefix: "application",
		},
		{
			name: "Text",
			mimePrefix: "text",
		},
	];

	for (const mediaType of mediaTypes) {
		await prisma.mediaType.upsert({
			where: {
				mimePrefix: mediaType.mimePrefix,
			},
			update: mediaType,
			create: mediaType,
		});
	}
};
