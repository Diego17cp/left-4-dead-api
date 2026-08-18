import { parseIncludes } from "@/shared/http/query";
import { paginationSchema } from "@/shared/http/schemas";
import z from "zod";
import { SPECIAL_INFECTED_INCLUDES } from "../contracts/special-infected-includes";

export const specialInfectedListQuerySchema = paginationSchema.extend({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, SPECIAL_INFECTED_INCLUDES)),
});
