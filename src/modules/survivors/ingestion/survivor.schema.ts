import { z } from "zod";

export const survivorManifestMediaSchema = z.object({
	role: z.string(),
	file: z.string(),
	type: z.string(),
	displayOrder: z.number(),
});

export const survivorManifestSchema = z.object({
	game: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().optional(),
	biography: z.string().optional(),
	gender: z.string().optional(),
	age: z.number().optional(),
	occupation: z.string().optional(),
	media: z.array(survivorManifestMediaSchema).optional(),
});
