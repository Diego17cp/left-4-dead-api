import { parseIncludes } from "@/shared/http/query";
import { paginationSchema } from "@/shared/http/schemas";
import z from "zod";
import { COMMON_INFECTED_INCLUDES } from "../contracts/common-infected-includes";

export const commonInfectedListQuerySchema = paginationSchema.extend({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, COMMON_INFECTED_INCLUDES)),
});
