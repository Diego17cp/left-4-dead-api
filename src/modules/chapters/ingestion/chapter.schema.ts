import { z } from "zod";

export const chapterManifestMediaSchema = z.object({
  role: z.string(),
  file: z.string(),
  type: z.string(),
});

export const chapterManifestSchema = z.object({
  campaign: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  chapterNumber: z.number(),
  media: z.array(chapterManifestMediaSchema).optional(),
});