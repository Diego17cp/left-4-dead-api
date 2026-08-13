import z from "zod";

import { parseIncludes } from "@/shared/http/query";
import { CHAPTER_DETAIL_INCLUDES } from "../contracts/chapter-includes";

export const chapterDetailParamsSchema = z.object({
	slug: z.string(),
});

export const chapterDetailQuerySchema = z.object({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, CHAPTER_DETAIL_INCLUDES)),
});
