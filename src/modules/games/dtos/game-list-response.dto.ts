import { GameMediaResponseDTO } from "./game-response.dto";

export interface GameListCampaignDTO {
  name: string;
  slug: string;
}

export interface GameListResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  release_date: Date | null;
  campaigns?: GameListCampaignDTO[];
  media?: GameMediaResponseDTO;
}