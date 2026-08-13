import { ChapterMediaResponseDTO } from "./chapter-list-response.dto";

export interface CampaignSummaryDTO {
  name: string;
  slug: string;
}

export interface CampaignDetailDTO extends CampaignSummaryDTO {
  description: string | null;
  release_date: Date | null;
}

export interface ChapterResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  chapter_number: number;
  campaign?: CampaignDetailDTO | CampaignSummaryDTO;
  media?: ChapterMediaResponseDTO;
}