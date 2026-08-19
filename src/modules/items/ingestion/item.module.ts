import { IngestionModule } from "@/ingestion/core/contracts";
import { ItemAggregate, ItemManifest, ResolvedItem } from "./item.types";
import { itemManifestSchema } from "./item.schema";
import { itemMapper } from "./item.mapper";
import { itemResolver } from "./item.resolver";
import { itemPersister } from "./item.persister";

export const itemIngestionModule: IngestionModule<ItemManifest, ItemAggregate, ResolvedItem> = {
  id: "item",
  name: "items",
  resource: "items",
  schema: itemManifestSchema,
  mapper: itemMapper,
  resolver: itemResolver,
  persister: itemPersister
}