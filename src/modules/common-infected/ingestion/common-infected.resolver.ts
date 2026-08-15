import { ReferenceResolver } from "@/ingestion/core/contracts";
import {
	CommonInfectedAggregate,
	ResolvedCommonInfected,
} from "./common-infected.types";

export const commonInfectedResolver: ReferenceResolver<
	CommonInfectedAggregate,
	ResolvedCommonInfected
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
