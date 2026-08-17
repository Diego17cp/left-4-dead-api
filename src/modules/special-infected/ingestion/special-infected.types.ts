import { MediaAggregate } from "@/ingestion/shared/media/media-persistence";

export interface SpecialInfectedManifestMedia {
  role: string;
  file: string;
  type: string;
  displayOrder?: number;
}
export interface SpecialInfectedManifest {
  game: string;
  name: string;
  slug: string;
  description?: string;
  media?: SpecialInfectedManifestMedia[];
}
export interface SpecialInfectedAggregate {
  gameSlug: string;
  name: string;
  slug: string;
  description: string | null;
  media: MediaAggregate[];
}
export interface ResolvedSpecialInfected extends SpecialInfectedAggregate {
  gameId: string;
}