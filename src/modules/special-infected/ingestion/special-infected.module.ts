import { IngestionModule } from "@/ingestion/core/contracts";
import {
	ResolvedSpecialInfected,
	SpecialInfectedAggregate,
	SpecialInfectedManifest,
} from "./special-infected.types";
import { specialInfectedMapper } from "./special-infected.mapper";
import { specialInfectedResolver } from "./special-infected.resolver";
import { specialInfectedPersister } from "./special-infected.persister";
import { specialInfectedManifestSchema } from "./special-infected.schema";

export const specialInfectedModule: IngestionModule<
	SpecialInfectedManifest,
	SpecialInfectedAggregate,
	ResolvedSpecialInfected
> = {
	id: "special-infected",
	name: "special-infecteds",
	resource: "special-infecteds",
	mapper: specialInfectedMapper,
	resolver: specialInfectedResolver,
	persister: specialInfectedPersister,
	schema: specialInfectedManifestSchema,
};
