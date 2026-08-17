import { z } from "zod";

export const specialInfectedManifestMediaSchema = z.object({
  role: z.string(),
  file: z.string(),
  type: z.string(),
  displayOrder: z.number().optional(),
})
export const specialInfectedManifestSchema = z.object({
  game: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  media: z.array(specialInfectedManifestMediaSchema).optional(),
})