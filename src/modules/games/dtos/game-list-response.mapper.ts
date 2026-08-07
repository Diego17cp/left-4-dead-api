import {
	Campaign,
	Game,
	GameMedia,
	Media,
	MediaRole,
} from "@/generated/prisma/client";
import { GameListResponseDTO } from "./game-list-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

type GamesWithRelations = Game & {
	campaigns?: Campaign[];
	gameMedia?: (GameMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class GameListResponseMapper {
	static toResponse(data: GamesWithRelations[]): GameListResponseDTO[] {
		return data.map((game) => {
			const mediaGrouped = game.gameMedia
				? MediaRelationMapper.groupAndMap(game.gameMedia)
				: undefined;
			return {
				id: game.id,
				name: game.name,
				slug: game.slug,
				description: game.description,
				release_date: game.releaseDate,
				campaigns: game.campaigns
					? game.campaigns.map((c) => ({
							name: c.name,
							slug: c.slug,
						}))
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
