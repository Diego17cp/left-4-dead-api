import {
	Campaign,
	CampaignMedia,
	Chapter,
	Game,
	Media,
	MediaRole,
} from "@/generated/prisma/client";
import { CampaignDetailInclude } from "../contracts/campaign-includes";
import { CampaignResponseDTO } from "./campaign-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

export type CampaignWithIncludes = Campaign & {
	game: Game;
	chapters: Chapter[];
	campaignMedia?: (CampaignMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class CampaignResponseMapper {
	static toResponse(
		campaign: CampaignWithIncludes,
		includes: CampaignDetailInclude[] = [],
	): CampaignResponseDTO {
		const mediaGrouped = campaign.campaignMedia
			? MediaRelationMapper.groupAndMap(campaign.campaignMedia)
			: undefined;
		return {
			id: campaign.id,
			name: campaign.name,
			slug: campaign.slug,
			description: campaign.description,
			release_date: campaign.releaseDate,
			game: !includes.includes("game")
				? {
						name: campaign.game.name,
						slug: campaign.game.slug,
					}
				: {
						name: campaign.game.name,
						slug: campaign.game.slug,
						description: campaign.game.description,
						release_date: campaign.game.releaseDate,
					},
			chapters: campaign.chapters.map((c) => {
				const base = { name: c.name, slug: c.slug };
				if (!includes.includes("chapters")) return base;
				return {
					...base,
					chapter_number: c.chapterNumber,
					description: c.description,
				};
			}),
			media: mediaGrouped
				? {
						cover: mediaGrouped.cover?.[0]
							? {
									url: mediaGrouped.cover[0].url,
									mimeType: mediaGrouped.cover[0].mimeType,
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
	}
}
