import { IngestionModule } from "@/ingestion/core/contracts";
import { ResolvedSurvivor, SurvivorAggregate, SurvivorManifest } from "./survivor.types";
import { survivorMapper } from "./survivor.mapper";
import { survivorResolver } from "./survivor.resolver";
import { survivorPersister } from "./survivor.persister";
import { survivorManifestSchema } from "./survivor.schema";

export const survivorModule: IngestionModule<SurvivorManifest, SurvivorAggregate, ResolvedSurvivor> = {
  id: "survivor",
  name: "survivors",
  resource: "survivors",
  mapper: survivorMapper,
  resolver: survivorResolver,
  persister: survivorPersister,
  schema: survivorManifestSchema
}