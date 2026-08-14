import { parseIncludes } from "@/shared/http/query";
import { paginationSchema } from "@/shared/http/schemas";
import z from "zod";
import { SURVIVOR_LIST_INCLUDES } from "../contracts/survivor-includes";

export const survivorListQuerySchema = paginationSchema.extend({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, SURVIVOR_LIST_INCLUDES)),
});
