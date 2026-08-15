import { IngestionModule } from "@/ingestion/core/contracts";
import {
	CommonInfectedAggregate,
	CommonInfectedManifest,
	ResolvedCommonInfected,
} from "./common-infected.types";
import { commonInfectedmapper } from "./common-infected.mapper";
import { commonInfectedResolver } from "./common-infected.resolver";
import { commonInfectedPersister } from "./common-infected.persister";
import { commonInfectedManifestSchema } from "./common-infected.schema";

export const commonInfectedModule: IngestionModule<
	CommonInfectedManifest,
	CommonInfectedAggregate,
	ResolvedCommonInfected
> = {
	id: "commonInfected",
	name: "common-infecteds",
	resource: "common-infecteds",
	mapper: commonInfectedmapper,
	resolver: commonInfectedResolver,
	persister: commonInfectedPersister,
	schema: commonInfectedManifestSchema,
};
