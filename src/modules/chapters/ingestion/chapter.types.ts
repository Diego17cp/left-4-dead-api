import { MediaAggregate } from "@/ingestion/shared/media/media-persistence";

export interface ChapterManifestMedia {
  role: string;
  file: string;
  type: string;
}

export interface ChapterManifest {
  campaign: string;
  name: string;
  slug: string;
  description?: string;
  chapterNumber: number;
  media?: ChapterManifestMedia[];
}

export interface ChapterAggregate {
  campaignSlug: string;
  name: string;
  slug: string;
  description: string | null;
  chapterNumber: number;
  media: MediaAggregate[];
}

export interface ResolvedChapter extends ChapterAggregate {
  campaignId: string;
}