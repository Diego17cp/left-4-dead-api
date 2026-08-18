import { parseIncludes } from "@/shared/http/query";
import z from "zod";
import { SPECIAL_INFECTED_INCLUDES } from "../contracts/special-infected-includes";

export const specialInfectedDetailParamsSchema = z.object({
	slug: z.string(),
});

export const specialInfectedDetailQuerySchema = z.object({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, SPECIAL_INFECTED_INCLUDES)),
});
