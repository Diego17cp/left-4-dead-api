import {
	Campaign,
	Game,
	Item,
	Survivor,
	Weapon,
	SpecialInfected,
	CommonInfectedVariant,
	Media,
	MediaRole,
	GameMedia,
} from "@/generated/prisma/client";
import { GameResponseDTO } from "./game-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

type GameWithIncludes = Game & {
	campaigns?: Campaign[];
	weapons?: Weapon[];
	items?: Item[];
	survivors?: Survivor[];
	specialInfected?: SpecialInfected[];
	commonInfectedVariants?: CommonInfectedVariant[];
	gameMedia?: (GameMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class GameResponseMapper {
	static toResponse(game: GameWithIncludes): GameResponseDTO {
		const mediaGrouped = game.gameMedia
			? MediaRelationMapper.groupAndMap(game.gameMedia)
			: undefined;
		return {
			id: game.id,
			name: game.name,
			slug: game.slug,
			description: game.description,
			release_date: game.releaseDate,
			campaigns: game.campaigns?.map((c) => ({
				name: c.name,
				slug: c.slug,
			})),
			weapons: game.weapons?.map((w) => ({ name: w.name, slug: w.slug })),
			items: game.items?.map((i) => ({ name: i.name, slug: i.slug })),
			survivors: game.survivors?.map((s) => ({
				name: s.name,
				slug: s.slug,
			})),
			special_infected: game.specialInfected?.map((s) => ({
				name: s.name,
				slug: s.slug,
			})),
			common_infected_variants: game.commonInfectedVariants?.map((c) => ({
				name: c.name,
				slug: c.slug,
			})),
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
