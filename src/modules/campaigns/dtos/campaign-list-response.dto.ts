import { MediaItemResponseDTO } from "@/shared/media/media.types";

export interface GameListGameDTO {
  name: string;
  slug: string;
}

export type CampaignMediaResponseDTO = Record<
	string,
	MediaItemResponseDTO | MediaItemResponseDTO[] | undefined
>;

export interface CampaignListResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  release_date: Date | null;
  game?: GameListGameDTO;
  media?: CampaignMediaResponseDTO;
}