import { MediaAggregate } from "@/ingestion/shared/media/media-persistence";

export interface CommonInfectedManifestMedia {
  role: string;
  file: string;
  type: string;
}
export interface CommonInfectedManifest {
  game: string;
  name: string;
  slug: string;
  description?: string;
  specialTrait: string;
  media?: CommonInfectedManifestMedia[];
}
export interface CommonInfectedAggregate {
  gameSlug: string;
  name: string;
  slug: string;
  description: string | null;
  specialTrait: string;
  media: MediaAggregate[];
}
export interface ResolvedCommonInfected extends CommonInfectedAggregate {
  gameId: string;
}