import { FastifyReply, FastifyRequest } from "fastify";
import { CampaignService } from "../services/campaign.service";
import { campaignListQuerySchema } from "../schemas/campaign-list.schema";
import { detailParamsSchema, detailQuerySchema } from "../schemas/campaign-detail.schema";
import { parseFilters } from "@/shared/http/query";
import { CAMPAIGN_LIST_FILTERS } from "../contracts/campaign-filters";

export class CampaignController {
	static async listCampaigns(req: FastifyRequest, reply: FastifyReply) {
		const { include, page, limit } = campaignListQuerySchema.parse(req.query);
		const filters = parseFilters(req.query as Record<string, unknown>, CAMPAIGN_LIST_FILTERS);
		const { data, total } = await CampaignService.listCampaigns(
			include,
			page,
			limit,
			filters,
		);
		return reply.paginated(data, { page, limit, total });
	}
	static async getCampaignBySlug(req: FastifyRequest, reply: FastifyReply) {
		const { include } = detailQuerySchema.parse(req.query);
		const { slug } = detailParamsSchema.parse(req.params);
		const campaign = await CampaignService.getCampaignBySlug(
			slug,
			include,
		);
		return reply.send(campaign);
	}
}
