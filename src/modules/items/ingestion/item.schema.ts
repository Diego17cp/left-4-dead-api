import z from "zod";

export const itemManifestMediaSchema = z.object({
	role: z.string(),
	file: z.string(),
	type: z.string(),
	displayOrder: z.number().optional(),
});

export const itemManifestSchema = z.object({
	game: z.string(),
	itemCategory: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().optional(),
	media: z.array(itemManifestMediaSchema).optional(),
});
