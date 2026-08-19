import { ReferenceResolver } from "@/ingestion/core/contracts";
import { ItemAggregate, ResolvedItem } from "./item.types";

export const itemResolver: ReferenceResolver<ItemAggregate, ResolvedItem> = {
	resolve(aggregates, cache) {
		return aggregates.map((agg) => {
			const gameId = cache.get("Game", agg.gameSlug);
			const itemCategoryId = cache.get(
				"ItemCategory",
				agg.itemCategoryName,
			);

			return {
				...agg,
				gameId,
				itemCategoryId,
			};
		});
	},
};
