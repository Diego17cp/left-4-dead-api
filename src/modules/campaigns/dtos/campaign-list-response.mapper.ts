import {
	Campaign,
	CampaignMedia,
	Game,
	Media,
	MediaRole,
} from "@/generated/prisma/client";
import { CampaignListResponseDTO } from "./campaign-list-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

type CampaignWithRelations = Campaign & {
	game?: Game;
	campaignMedia?: (CampaignMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class CampaignListResponseMapper {
	static toResponse(
		data: CampaignWithRelations[],
	): CampaignListResponseDTO[] {
		return data.map((campaign) => {
			const mediaGrouped = campaign.campaignMedia
				? MediaRelationMapper.groupAndMap(campaign.campaignMedia)
				: undefined;
			return {
				id: campaign.id,
				name: campaign.name,
				slug: campaign.slug,
				description: campaign.description,
				release_date: campaign.releaseDate,
				game: campaign.game
					? {
							name: campaign.game.name,
							slug: campaign.game.slug,
						}
					: undefined,
				media: mediaGrouped
					? {
							cover: mediaGrouped.cover?.[0]
								? {
										url: mediaGrouped.cover[0].url,
										mimeType:
											mediaGrouped.cover[0].mimeType,
									}
								: undefined,
							logo: mediaGrouped.logo?.[0]
								? {
										url: mediaGrouped.logo[0].url,
										mimeType: mediaGrouped.logo[0].mimeType,
									}
								: undefined,
							gallery: mediaGrouped.gallery
								? mediaGrouped.gallery.map((item) => ({
										url: item.url,
										mimeType: item.mimeType,
									}))
								: undefined,
						}
					: undefined,
			};
		});
	}
}
