import { ResourceMapper } from "@/ingestion/core/contracts/resource-mapper";
import { GameAggregate, GameManifest } from "./game.types";

export const gameMapper: ResourceMapper<GameManifest, GameAggregate> = {
	map(resource) {
		return {
			slug: resource.slug,
			name: resource.name,
			description: resource.description ?? null,
			releaseDate: resource.releaseDate
				? new Date(resource.releaseDate)
					: null,
			media: resource.media.map((media) => ({
				role: media.role,
				file: media.file,
				mimeType: media.type,
			})),
		};
	},
};
