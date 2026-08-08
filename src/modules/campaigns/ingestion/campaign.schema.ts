import { z } from "zod";

export const campaignManifestMediaSchema = z.object({
	role: z.string(),
	file: z.string(),
	type: z.string(),
});

export const campaignManifestSchema = z.object({
	game: z.string(),
	contentSource: z.string(),
	name: z.string(),
	slug: z.string(),
	description: z.string().optional(),
	releaseDate: z.string().optional(),
	media: z.array(campaignManifestMediaSchema).optional(),
});
