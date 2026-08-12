import z from "zod";
import { CAMPAIGN_DETAIL_INCLUDES } from "../contracts/campaign-includes";
import { parseIncludes } from "@/shared/http/query";

export const detailParamsSchema = z.object({
	slug: z.string(),
});

export const detailQuerySchema = z.object({
	include: z
		.string()
		.optional()
		.transform((value) => parseIncludes(value, CAMPAIGN_DETAIL_INCLUDES)),
});
