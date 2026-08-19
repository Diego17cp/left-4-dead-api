import { ResourceMapper } from "@/ingestion/core/contracts";
import { ItemAggregate, ItemManifest } from "./item.types";

export const itemMapper: ResourceMapper<ItemManifest, ItemAggregate> = {
	async map(manifest) {
		return {
			gameSlug: manifest.game,
			itemCategoryName: manifest.itemCategory,
			slug: manifest.slug,
			name: manifest.name,
			description: manifest.description ?? null,
			media:
				manifest.media?.map((m, idx) => ({
					role: m.role,
					file: m.file,
					mimeType: m.type,
					displayOrder: m.displayOrder ?? idx,
				})) ?? [],
		};
	},
};
