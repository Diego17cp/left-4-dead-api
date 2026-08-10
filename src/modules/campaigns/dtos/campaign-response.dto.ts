import { MediaItemResponseDTO } from "@/shared/media/media.types";
import { CampaignMediaResponseDTO } from "./campaign-list-response.dto";

export interface ChapterSummaryDTO {
  name: string;
  slug: string;
}
export interface ChapterDetailDTO extends ChapterSummaryDTO {
  chapter_number: number;
  description: string | null;
}

export interface GameSummaryDTO {
  name: string;
  slug: string;
}

export interface GameDetailDTO extends GameSummaryDTO {
  description: string | null;
  release_date: Date | null;
}

export interface CampaignResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  release_date: Date | null;
  game: GameSummaryDTO | GameDetailDTO;
  chapters: ChapterSummaryDTO[] | ChapterDetailDTO[];
  media?: CampaignMediaResponseDTO;
}