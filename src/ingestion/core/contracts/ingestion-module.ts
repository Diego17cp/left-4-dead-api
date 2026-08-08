import type { ZodSchema } from "zod";
import type { ResourceMapper } from "./resource-mapper";
import type { Persister } from "./persister";
import type { ReferenceResolver } from "./reference-resolver";

export interface BaseIngestionModule<TResource, TAggregate> {
	id: string;
	name: string;
	resource: string;
	schema: ZodSchema<TResource>;
	mapper: ResourceMapper<TResource, TAggregate>;
}
export interface IngestionModuleWithoutResolver<TResource, TAggregate> extends BaseIngestionModule<TResource, TAggregate> {
	resolver?: never;
	persister: Persister<TAggregate>;
}
export interface IngestionModuleWithResolver<TResource, TAggregate, TResolved> extends BaseIngestionModule<TResource, TAggregate> {
	resolver: ReferenceResolver<TAggregate, TResolved>;
	persister: Persister<TResolved>;
}

export type IngestionModule<TResource, TAggregate, TResolved = TAggregate> =
	| IngestionModuleWithoutResolver<TResource, TAggregate>
	| IngestionModuleWithResolver<TResource, TAggregate, TResolved>;
