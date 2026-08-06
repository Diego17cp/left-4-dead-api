import z from "zod";

export const gameManifestSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  releaseDate: z.string().optional(),
  media: z.array(
    z.object({
      role: z.string(),
      file: z.string(),
      type: z.string(),
    })
  )
});