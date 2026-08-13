import { MediaItemResponseDTO } from "@/shared/media/media.types";

export interface ChapterListCampaignDTO {
	name: string;
	slug: string;
}

export type ChapterMediaResponseDTO = Record<
	string,
	MediaItemResponseDTO | MediaItemResponseDTO[] | undefined
>;

export interface ChapterListResponseDTO {
	id: string;
	name: string;
	slug: string;
	description: string | null;
	chapter_number: number;
	campaign?: ChapterListCampaignDTO;
	media?: ChapterMediaResponseDTO;
}
