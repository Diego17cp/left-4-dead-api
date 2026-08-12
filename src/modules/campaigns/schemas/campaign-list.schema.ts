import { parseIncludes } from "@/shared/http/query";
import { paginationSchema } from "@/shared/http/schemas";
import z from "zod";
import { CAMPAIGN_LIST_INCLUDES } from "../contracts/campaign-includes";

export const campaignListQuerySchema = paginationSchema.extend({
  include: z
    .string()
    .optional()
    .transform((value) => parseIncludes(value, CAMPAIGN_LIST_INCLUDES)),
});