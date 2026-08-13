import {
	Chapter,
	Campaign,
	ChapterMedia,
	Media,
	MediaRole,
} from "@/generated/prisma/client";
import { ChapterResponseDTO } from "./chapter-response.dto";
import { ChapterDetailInclude } from "../contracts/chapter-includes";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

export type ChapterWithIncludes = Chapter & {
	campaign: Campaign;
	chapterMedia?: (ChapterMedia & {
		media: Media;
		mediaRole: MediaRole;
	})[];
};

export class ChapterResponseMapper {
	static toResponse(
		chapter: ChapterWithIncludes,
		includes: ChapterDetailInclude[] = [],
	): ChapterResponseDTO {
		const mediaGrouped = chapter.chapterMedia
			? MediaRelationMapper.groupAndMap(chapter.chapterMedia)
			: undefined;

		return {
			id: chapter.id,
			name: chapter.name,
			slug: chapter.slug,
			description: chapter.description,
			chapter_number: chapter.chapterNumber,
			campaign: !includes.includes("campaign")
				? {
						name: chapter.campaign.name,
						slug: chapter.campaign.slug,
					}
				: {
						name: chapter.campaign.name,
						slug: chapter.campaign.slug,
						description: chapter.campaign.description,
						release_date: chapter.campaign.releaseDate,
					},
			media: mediaGrouped
				? {
						thumbnail: mediaGrouped.thumbnail?.[0]
							? {
									url: mediaGrouped.thumbnail[0].url,
									mimeType:
										mediaGrouped.thumbnail[0].mimeType,
								}
							: undefined,
						gallery: mediaGrouped.gallery?.length
							? mediaGrouped.gallery.map((item) => ({
									url: item.url,
									mimeType: item.mimeType,
								}))
							: undefined,
						video: mediaGrouped.video?.length
							? mediaGrouped.video.map((item) => ({
									url: item.url,
									mimeType: item.mimeType,
								}))
							: undefined,
					}
				: undefined,
		};
	}
}
