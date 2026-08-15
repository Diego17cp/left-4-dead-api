import { z } from "zod";

export const commonInfectedManifestMediaSchema = z.object({
  role: z.string(),
  file: z.string(),
  type: z.string(),
});
export const commonInfectedManifestSchema = z.object({
  game: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  specialTrait: z.string(),
  media: z.array(commonInfectedManifestMediaSchema).optional(),
});