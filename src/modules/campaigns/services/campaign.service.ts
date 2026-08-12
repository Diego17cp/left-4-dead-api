import { NotFoundError } from "@/core/errors";
import {
	CampaignDetailInclude,
	CampaignListInclude,
} from "../contracts/campaign-includes";
import { CampaignListResponseDTO } from "../dtos/campaign-list-response.dto";
import { CampaignListResponseMapper } from "../dtos/campaign-list-response.mapper";
import { CampaignResponseDTO } from "../dtos/campaign-response.dto";
import { CampaignRepository } from "../repositories/campaign.repository";
import {
	CampaignResponseMapper,
	CampaignWithIncludes,
} from "../dtos/campaign-response.mapper";
import { CampaignListFilters } from "../contracts/campaign-filters";

export class CampaignService {
	private static repo = new CampaignRepository();

	static async listCampaigns(
		includes: CampaignListInclude[],
		page: number,
		limit: number,
		filters: CampaignListFilters,
	): Promise<{
		data: CampaignListResponseDTO[];
		total: number;
	}> {
		const { data, total } = await this.repo.findList(includes, page, limit, filters);
		return {
			data: CampaignListResponseMapper.toResponse(data),
			total,
		};
	}

	static async getCampaignBySlug(
		slug: string,
		includes: CampaignDetailInclude[],
	): Promise<CampaignResponseDTO> {
		const campaign = await this.repo.findBySlug(slug, includes);
		if (!campaign) throw new NotFoundError("Campaign not found");
		return CampaignResponseMapper.toResponse(
			campaign as unknown as CampaignWithIncludes,
			includes,
		);
	}
}
