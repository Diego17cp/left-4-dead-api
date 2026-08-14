import { Gender } from "@/generated/prisma/enums";
import { SurvivorMediaResponseDTO } from "./survivor-list-response.dto";

export interface GameSummaryDTO {
  name: string;
  slug: string;
}

export interface GameDetailDTO extends GameSummaryDTO {
  description: string | null;
  release_date: Date | null;
}

export interface SurvivorResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  biography: string | null;
  gender: Gender | null;
  age: number | null;
  occupation: string | null;
  game?: GameSummaryDTO | GameDetailDTO;
  media?: SurvivorMediaResponseDTO;
}