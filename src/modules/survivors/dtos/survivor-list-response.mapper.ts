import {
	Game,
	Media,
	MediaRole,
	Survivor,
	SurvivorMedia,
} from "@/generated/prisma/client";
import { SurvivorListResponseDTO } from "./survivor-list-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

type SurvivorListWithRelations = Survivor & {
	game?: Game;
	survivorMedia?: (SurvivorMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class SurvivorListResponseMapper {
	static toResponse(
		data: SurvivorListWithRelations[],
	): SurvivorListResponseDTO[] {
		return data.map((survivor) => {
			const mediaGrouped = survivor.survivorMedia
				? MediaRelationMapper.groupAndMap(survivor.survivorMedia)
				: undefined;

			return {
				id: survivor.id,
				name: survivor.name,
				slug: survivor.slug,
				description: survivor.description,
				biography: survivor.biography,
				gender: survivor.gender,
				age: survivor.age,
				occupation: survivor.occupation,
				game: survivor.game
					? {
							name: survivor.game.name,
							slug: survivor.game.slug,
						}
					: undefined,
				media: mediaGrouped
					? {
							portraits: mediaGrouped.portrait
								? mediaGrouped.portrait.map((item) => ({
										url: item.url,
										mimeType: item.mimeType,
										display_order: item.display_order,
									}))
								: undefined,
							renders: mediaGrouped.render
								? mediaGrouped.render.map((item) => ({
										url: item.url,
										mimeType: item.mimeType,
										display_order: item.display_order,
									}))
								: undefined,
						}
					: undefined,
			};
		});
	}
}
