import z from "zod";
import { parseIncludes } from "@/shared/http/query";
import { COMMON_INFECTED_INCLUDES } from "../contracts/common-infected-includes";

export const commonInfectedDetailParamsSchema = z.object({
	slug: z.string(),
});

export const commonInfectedDetailQuerySchema = z.object({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, COMMON_INFECTED_INCLUDES)),
});
