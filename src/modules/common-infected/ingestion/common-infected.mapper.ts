import { ResourceMapper } from "@/ingestion/core/contracts";
import {
	CommonInfectedAggregate,
	CommonInfectedManifest,
} from "./common-infected.types";

export const commonInfectedmapper: ResourceMapper<
	CommonInfectedManifest,
	CommonInfectedAggregate
> = {
	async map(manifest) {
		return {
			gameSlug: manifest.game,
			name: manifest.name,
			slug: manifest.slug,
			description: manifest.description ?? null,
			specialTrait: manifest.specialTrait,
			media:
				manifest.media?.map((m) => ({
					role: m.role,
					file: m.file,
					mimeType: m.type,
				})) ?? [],
		};
	},
};
