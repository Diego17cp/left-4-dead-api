import { ReferenceResolver } from "@/ingestion/core/contracts/reference-resolver";
import { CampaignAggregate, ResolvedCampaign } from "./campaign.types";

export const campaignResolver: ReferenceResolver<CampaignAggregate, ResolvedCampaign> = {
	resolve(aggregates, cache) {
		return aggregates.map(aggregate => {
			const gameId = cache.get("Game", aggregate.gameSlug);
			const contentSourceId = cache.get("ContentSource", aggregate.contentSourceName);

			return {
				...aggregate,
				gameId,
				contentSourceId,
			};
		});
	},
};
