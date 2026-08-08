import { IngestionModule } from "@/ingestion/core/contracts/ingestion-module";
import { CampaignAggregate, CampaignManifest, ResolvedCampaign } from "./campaign.types";
import { campaignManifestSchema } from "./campaign.schema";
import { campaignMapper } from "./campaign.mapper";
import { campaignResolver } from "./campaign.resolver";
import { campaignPersister } from "./campaign.persister";

export const campaignIngestionModule: IngestionModule<CampaignManifest, CampaignAggregate, ResolvedCampaign> = {
	id: "campaign",
	name: "campaigns",
	resource: "campaigns",
	schema: campaignManifestSchema,
	mapper: campaignMapper,
	resolver: campaignResolver,
	persister: campaignPersister,
};
