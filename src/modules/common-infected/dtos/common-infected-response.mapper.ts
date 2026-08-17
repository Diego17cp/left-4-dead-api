import {
	CommonInfectedVariant,
	CommonInfectedVariantMedia,
	Media,
	MediaRole,
} from "@/generated/prisma/client";
import { CommonInfectedResponseDTO } from "./common-infected-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

export type CommonInfectedWithIncludes = CommonInfectedVariant & {
	commonInfectedVariantMedia?: (CommonInfectedVariantMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class CommonInfectedResponseMapper {
	static toResponse(
		commonInfected: CommonInfectedWithIncludes,
	): CommonInfectedResponseDTO {
		const mediaGrouped = commonInfected.commonInfectedVariantMedia
			? MediaRelationMapper.groupAndMap(
					commonInfected.commonInfectedVariantMedia,
				)
			: undefined;

		return {
			id: commonInfected.id,
			name: commonInfected.name,
			slug: commonInfected.slug,
			description: commonInfected.description,
			special_trait: commonInfected.specialTrait,
			media: mediaGrouped
				? {
						render: mediaGrouped.render?.[0]
							? {
									url: mediaGrouped.render[0].url,
									mimeType:
										mediaGrouped.render[0].mimeType,
								}
							: undefined,
						gallery: mediaGrouped.gallery?.length
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
