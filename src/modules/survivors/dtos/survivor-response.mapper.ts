import {
	Game,
	Media,
	MediaRole,
	Survivor,
	SurvivorMedia,
} from "@/generated/prisma/client";
import { SurvivorResponseDTO } from "./survivor-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";
import { SurvivorDetailInclude } from "../contracts/survivor-includes";

export type SurvivorWithRelations = Survivor & {
	game: Game;
	survivorMedia?: (SurvivorMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class SurvivorResponseMapper {
	static toResponse(
		data: SurvivorWithRelations,
		includes: SurvivorDetailInclude[] = [],
	): SurvivorResponseDTO {
		const mediaGrouped = data.survivorMedia
			? MediaRelationMapper.groupAndMap(data.survivorMedia)
			: undefined;

		return {
			id: data.id,
			name: data.name,
			slug: data.slug,
			description: data.description,
			biography: data.biography,
			gender: data.gender,
			age: data.age,
			occupation: data.occupation,
			game: !includes.includes("game")
				? {
						name: data.game.name,
						slug: data.game.slug,
					}
				: {
						name: data.game.name,
						slug: data.game.slug,
						description: data.game.description,
						release_date: data.game.releaseDate,
					},
			media: mediaGrouped
				? {
						portraits: mediaGrouped.portrait
							? mediaGrouped.portrait.map((item) => ({
									url: item.url,
									mimeType: item.mimeType,
								}))
							: undefined,
						renders: mediaGrouped.render
							? mediaGrouped.render.map((item) => ({
									url: item.url,
									mimeType: item.mimeType,
								}))
							: undefined,
					}
				: undefined,
		};
	}
}
