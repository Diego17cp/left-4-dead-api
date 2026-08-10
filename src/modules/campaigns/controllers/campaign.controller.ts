import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import {
	CAMPAIGN_DETAIL_INCLUDES,
	CAMPAIGN_LIST_INCLUDES,
	CampaignDetailInclude,
	CampaignListInclude,
} from "../contracts/campaign-includes";
import { CampaignService } from "../services/campaign.service";

const listQuerySchema = z
	.object({
		include: z.string().optional(),
	})
	.extend({
		page: z.coerce.number().default(1),
		limit: z.coerce.number().default(15),
	});

const detailParamsSchema = z.object({
	slug: z.string(),
});

const detailQuerySchema = z.object({
	include: z.string().optional(),
});

export class CampaignController {
	static async listCampaigns(req: FastifyRequest, reply: FastifyReply) {
		const { include, page, limit } = listQuerySchema.parse(req.query);
		const rawInclude = include ? include.split(",") : [];
		const validIncludes = rawInclude.filter(
			(inc): inc is CampaignListInclude =>
				(CAMPAIGN_LIST_INCLUDES as readonly string[]).includes(inc),
		);
		const { data, total } = await CampaignService.listCampaigns(
			validIncludes,
			page,
			limit,
		);
		return reply.paginated(data, { page, limit, total });
	}
	static async getCampaignBySlug(req: FastifyRequest, reply: FastifyReply) {
		const { include } = detailQuerySchema.parse(req.query);
		const { slug } = detailParamsSchema.parse(req.params);
		const rawInclude = include ? include.split(",") : [];
		const validIncludes = rawInclude.filter(
			(inc): inc is CampaignDetailInclude =>
				(CAMPAIGN_DETAIL_INCLUDES as readonly string[]).includes(inc),
		);
		const campaign = await CampaignService.getCampaignBySlug(
			slug,
			validIncludes,
		);
		return reply.send(campaign);
	}
}
