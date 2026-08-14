import { MediaAggregate } from "@/ingestion/shared/media/media-persistence";
import { Gender } from "@/generated/prisma/client";

export interface SurvivorManifestMedia {
	role: string;
	file: string;
	type: string;
	displayOrder: number;
}
export interface SurvivorManifest {
	game: string;
	name: string;
	slug: string;
	description?: string;
	biography?: string;
	gender?: string;
	age?: number;
	occupation?: string;
	media?: SurvivorManifestMedia[];
}
export interface SurvivorAggregate {
	gameSlug: string;
	name: string;
	slug: string;
	description: string | null;
	biography: string | null;
	gender: Gender | null;
	age: number | null;
	occupation: string | null;
	media: MediaAggregate[];
}
export interface ResolvedSurvivor extends SurvivorAggregate {
	gameId: string;
}
