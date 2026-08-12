import { ReferenceResolver } from "@/ingestion/core/contracts";
import { ChapterAggregate, ResolvedChapter } from "./chapter.types";

export const chapterResolver: ReferenceResolver<ChapterAggregate, ResolvedChapter> = {
  resolve(aggregates, cache) {
    return aggregates.map(aggregate => {
      const campaignId = cache.get("Campaign", aggregate.campaignSlug);
      return {
        ...aggregate,
        campaignId
      }
    })
  }
}