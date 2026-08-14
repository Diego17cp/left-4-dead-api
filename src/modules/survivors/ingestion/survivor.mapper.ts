import { ResourceMapper } from "@/ingestion/core/contracts";
import { SurvivorAggregate, SurvivorManifest } from "./survivor.types";
import { Gender } from "@/generated/prisma/client";

export const survivorMapper: ResourceMapper<SurvivorManifest, SurvivorAggregate> = {
  async map(manifest) {
    return {
      gameSlug: manifest.game,
      name: manifest.name,
      slug: manifest.slug,
      description: manifest.description ?? null,
      biography: manifest.biography ?? null,
      gender: manifest.gender ? (manifest.gender.toUpperCase() as Gender) : null,
      age: manifest.age ?? null,
      occupation: manifest.occupation ?? null,
      media: manifest.media?.map(m => ({
        role: m.role,
        file: m.file,
        mimeType: m.type,
        displayOrder: m.displayOrder,
      })) ?? [],
    }
  }
}