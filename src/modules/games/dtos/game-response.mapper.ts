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
import { GameDetailInclude } from "../contracts/game-includes";

export type GameWithIncludes = Game & {
	campaigns: Campaign[];
	survivors: Survivor[];
	specialInfected: SpecialInfected[];
	commonInfectedVariants: CommonInfectedVariant[];
	weapons?: Weapon[];
	items?: Item[];
	gameMedia?: (GameMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class GameResponseMapper {
	static toResponse(game: GameWithIncludes, includes: GameDetailInclude[] = []): GameResponseDTO {
		const mediaGrouped = game.gameMedia
			? MediaRelationMapper.groupAndMap(game.gameMedia)
			: undefined;
		return {
			id: game.id,
			name: game.name,
			slug: game.slug,
			description: game.description,
			release_date: game.releaseDate,
			campaigns: game.campaigns.map((c) => {
				const base = { name: c.name, slug: c.slug };
				if (!includes.includes("campaigns")) return base;
				return {
					...base,
					description: c.description,
					release_date: c.releaseDate,
				};
			}),
			survivors: game.survivors.map((s) => {
				const base = { name: s.name, slug: s.slug };
				if (!includes.includes("survivors")) return base;
				return {
					...base,
					biography: s.biography,
					gender: s.gender,
					age: s.age,
					occupation: s.occupation,
				};
			}),
			special_infected: game.specialInfected.map((s) => {
				const base = { name: s.name, slug: s.slug };
				if (!includes.includes("specialInfected")) return base;
				return {
					...base,
					description: s.description,
				};
			}),
			common_infected_variants: game.commonInfectedVariants.map((c) => {
				const base = { name: c.name, slug: c.slug };
				if (!includes.includes("commonInfectedVariants")) return base;
				return {
					...base,
					specialTrait: c.specialTrait,
				};
			}),
			weapons: game.weapons?.map((w) => ({ name: w.name, slug: w.slug })),
			items: game.items?.map((i) => ({ name: i.name, slug: i.slug })),
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
