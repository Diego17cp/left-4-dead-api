import { IngestionModule } from "./contracts/ingestion-module";
import { loadResources } from "./loader/resource-loader";
import { validateResource } from "./validation/validate-resource";

export const runIngestion = async <TResource, TAggregate>(
	module: IngestionModule<TResource, TAggregate>,
) => {
	const resources = await loadResources<TResource>(module.resource);
	const aggregates: TAggregate[] = [];
	for (const resource of resources) {
		const manifest = validateResource(module.schema, resource.manifest);
		const aggregate = await module.mapper.map(manifest);
		aggregates.push(aggregate);
	}
	await module.persister.persist(aggregates);
};
