import {
	Media,
	MediaRole,
	SpecialInfected,
	SpecialInfectedMedia,
} from "@/generated/prisma/client";
import { SpecialInfectedResponseDTO } from "./special-infected-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

export type SpecialInfectedWithIncludes = SpecialInfected & {
	specialInfectedMedia?: (SpecialInfectedMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class SpecialInfectedResponseMapper {
	static toResponse(
		specialInfected: SpecialInfectedWithIncludes,
	): SpecialInfectedResponseDTO {
		const mediaGrouped = specialInfected.specialInfectedMedia
			? MediaRelationMapper.groupAndMap(
					specialInfected.specialInfectedMedia,
				)
			: undefined;

		return {
			id: specialInfected.id,
			name: specialInfected.name,
			slug: specialInfected.slug,
			description: specialInfected.description,
			media: mediaGrouped
				? {
						render: mediaGrouped.render
							? mediaGrouped.render.map((item) => ({
									url: item.url,
									mimeType: item.mimeType,
									display_order: item.display_order,
								}))
							: undefined,
						portrait: mediaGrouped.portrait?.[0]
							? {
									url: mediaGrouped.portrait[0].url,
									mimeType: mediaGrouped.portrait[0].mimeType,
								}
							: undefined,
						icon: mediaGrouped.icon?.[0]
							? {
									url: mediaGrouped.icon[0].url,
									mimeType: mediaGrouped.icon[0].mimeType,
								}
							: undefined,
					}
				: undefined,
		};
	}
}
