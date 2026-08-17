import { ResourceMapper } from "@/ingestion/core/contracts";
import { SpecialInfectedAggregate, SpecialInfectedManifest } from "./special-infected.types";

export const specialInfectedMapper: ResourceMapper<SpecialInfectedManifest, SpecialInfectedAggregate> = {
  async map(manifest) {
    return {
      gameSlug: manifest.game,
      name: manifest.name,
      slug: manifest.slug,
      description: manifest.description ?? null,
      media: manifest.media?.map((m) => ({
        role: m.role,
        file: m.file,
        mimeType: m.type,
        displayOrder: m.displayOrder,
      })) ?? []
    }
  }
}