import { ZodSchema } from "zod";

export const validateResource = <T>(schema: ZodSchema<T>, data: unknown): T =>
  schema.parse(data);
