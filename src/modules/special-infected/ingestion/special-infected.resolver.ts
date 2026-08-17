import { ReferenceResolver } from "@/ingestion/core/contracts";
import {
	ResolvedSpecialInfected,
	SpecialInfectedAggregate,
} from "./special-infected.types";

export const specialInfectedResolver: ReferenceResolver<
	SpecialInfectedAggregate,
	ResolvedSpecialInfected
> = {
	resolve(aggregates, cache) {
		return aggregates.map((agg) => {
			const gameId = cache.get("Game", agg.gameSlug);
			return {
				...agg,
				gameId,
			};
		});
	},
};
