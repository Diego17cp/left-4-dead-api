import { parseIncludes } from "@/shared/http/query";
import { paginationSchema } from "@/shared/http/schemas";
import z from "zod";
import { CHAPTER_LIST_INCLUDES } from "../contracts/chapter-includes";

export const chapterListQuerySchema = paginationSchema.extend({
  include: z
    .string()
    .optional()
    .transform((value) => parseIncludes(value, CHAPTER_LIST_INCLUDES))
})