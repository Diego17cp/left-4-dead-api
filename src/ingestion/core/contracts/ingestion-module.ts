import type { ZodSchema } from "zod";
import type { ResourceMapper } from "./resource-mapper";
import type { Persister } from "./persister";

export interface IngestionModule<TResource, TAggregate> {
	name: string;
	resource: string;
	schema: ZodSchema<TResource>;
	mapper: ResourceMapper<TResource, TAggregate>;
	persister: Persister<TAggregate>;
	dependencies?: readonly string[];
}
