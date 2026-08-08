import { createReferenceCache } from "../shared/reference-cache";
import { IngestionModule } from "./contracts/ingestion-module";
import { loadResources } from "./loader/resource-loader";
import { validateResource } from "./validation/validate-resource";

export const runIngestion = async <M extends IngestionModule<any, any, any>>(
	module: M
)  => {
	type TResource = M extends IngestionModule<infer R, any, any> ? R : never;
	type TAggregate = M extends IngestionModule<any, infer A, any> ? A : never;
	
	const cache = await createReferenceCache();

	const resources = await loadResources<TResource>(module.resource);
	const aggregates: TAggregate[] = [];
	for (const resource of resources) {
		const manifest = validateResource(module.schema, resource.manifest);
		const aggregate = await module.mapper.map(manifest);
		aggregates.push(aggregate);
	}
	if (module.resolver) {
		const resolved = await module.resolver.resolve(aggregates, cache);
		await module.persister.persist(resolved);
	} else {
		await module.persister.persist(aggregates);
	}
	await cache.refresh(module.id);
};
