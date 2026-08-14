import { Gender } from "@/generated/prisma/enums";
import { MediaItemResponseDTO } from "@/shared/media/media.types";

export interface SurvivorListGameDTO {
  name: string;
  slug: string;
}

export type SurvivorMediaResponseDTO = Record<
  string,
  MediaItemResponseDTO | MediaItemResponseDTO[] | undefined
>

export interface SurvivorListResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  biography: string | null;
  gender: Gender | null;
  age: number | null;
  occupation: string | null;
  game?: SurvivorListGameDTO;
  media?: SurvivorMediaResponseDTO;
}