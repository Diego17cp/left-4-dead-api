import { MediaAggregate } from "@/ingestion/shared/media/media-persistence";

export interface CampaignManifestMedia {
	role: string;
	file: string;
	type: string;
}

export interface CampaignManifest {
	game: string;
	contentSource: string;
	name: string;
	slug: string;
	description?: string;
	releaseDate?: string;
	media?: CampaignManifestMedia[];
}

export interface CampaignAggregate {
	gameSlug: string;
	contentSourceName: string;
	name: string;
	slug: string;
	description: string | null;
	releaseDate: Date | null;
	media: MediaAggregate[];
}

export interface ResolvedCampaign extends CampaignAggregate {
	gameId: string;
	contentSourceId: string;
}
