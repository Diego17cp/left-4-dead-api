import { Campaign, Chapter, ChapterMedia, Media, MediaRole } from "@/generated/prisma/client";
import { ChapterListResponseDTO } from "./chapter-list-response.dto";
import { MediaRelationMapper } from "@/shared/media/media-relation.mapper";

type ChapterWithRelations = Chapter & {
  campaign?: Campaign;
  chapterMedia?: (ChapterMedia & {
    media: Media;
    mediaRole: MediaRole;
  })[];
}

export class ChapterListResponseMapper {
  static toResponse(data: ChapterWithRelations[]): ChapterListResponseDTO[] {
    return data.map(chapter => {
      const mediaGrouped = chapter.chapterMedia
        ? MediaRelationMapper.groupAndMap(chapter.chapterMedia)
        : undefined;
      
      return {
        id: chapter.id,
        name: chapter.name,
        slug: chapter.slug,
        description: chapter.description,
        chapter_number: chapter.chapterNumber,
        campaign: chapter.campaign
          ? {
              name: chapter.campaign.name,
              slug: chapter.campaign.slug,
            }
          : undefined,
        media: mediaGrouped
          ? {
              thumbnail: mediaGrouped.thumbnail?.[0]
                ? {
                    url: mediaGrouped.thumbnail[0].url,
                    mimeType: mediaGrouped.thumbnail[0].mimeType,
                  }
                : undefined,
              gallery: mediaGrouped.gallery
                ? mediaGrouped.gallery.map((item) => ({
                    url: item.url,
                    mimeType: item.mimeType,
                  }))
                :   undefined,
            }
          : undefined,
      };
    });
  }
}