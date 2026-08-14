import { parseIncludes } from "@/shared/http/query";
import z from "zod";
import { SURVIVOR_DETAIL_INCLUDES } from "../contracts/survivor-includes";

export const survivorDetailParamsSchema = z.object({
	slug: z.string(),
});

export const survivorDetailQuerySchema = z.object({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, SURVIVOR_DETAIL_INCLUDES)),
});
