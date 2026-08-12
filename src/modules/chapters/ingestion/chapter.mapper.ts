import { ResourceMapper } from "@/ingestion/core/contracts";
import { ChapterAggregate, ChapterManifest } from "./chapter.types";

export const chapterMapper: ResourceMapper<ChapterManifest, ChapterAggregate> = {
  async map(manifest) {
    return {
      campaignSlug: manifest.campaign,
      name: manifest.name,
      slug: manifest.slug,
      description: manifest.description ?? null,
      chapterNumber: manifest.chapterNumber,
      media: manifest.media?.map(m => ({
        role: m.role,
        file: m.file,
        mimeType: m.type
      })) ?? []
    }
  }
}