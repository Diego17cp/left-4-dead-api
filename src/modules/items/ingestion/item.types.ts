import { MediaAggregate } from "@/ingestion/shared/media/media-persistence";

export interface ItemManifestMedia {
	role: string;
	file: string;
	type: string;
  displayOrder?: number;
}
export interface ItemManifest {
	game: string;
	itemCategory: string;
	name: string;
	slug: string;
	description?: string;
	media?: ItemManifestMedia[];
}

export interface ItemAggregate {
	gameSlug: string;
	itemCategoryName: string;
	name: string;
	slug: string;
	description: string | null;
	media: MediaAggregate[];
}

export interface ResolvedItem extends ItemAggregate {
	gameId: string;
	itemCategoryId: string;
}
