import { ReferenceResolver } from "@/ingestion/core/contracts";
import { ResolvedSurvivor, SurvivorAggregate } from "./survivor.types";

export const survivorResolver: ReferenceResolver<SurvivorAggregate, ResolvedSurvivor> = {
  resolve(aggregates, cache) {
    return aggregates.map(aggregate => {
      const gameId = cache.get("Game", aggregate.gameSlug);
      return {
        ...aggregate,
        gameId
      }
    })
  },
}